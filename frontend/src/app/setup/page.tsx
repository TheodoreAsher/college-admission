'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { lookupService } from '@/lib/services';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/ui/ProtectedRoute';

function SetupContent() {
  const [activeTab, setActiveTab] = useState('degrees');
  const queryClient = useQueryClient();
  
  const { data: degrees } = useQuery('degrees', lookupService.getDegrees, {
    select: (data) => data?.results || data || []
  });
  const { data: institutes } = useQuery('institutes', lookupService.getInstitutes, {
    select: (data) => data?.results || data || []
  });

  const addDegreeMutation = useMutation(
    (data: { name: string }) => api.post('/degrees/', data),
    {
      onSuccess: () => {
        toast.success('Degree added!');
        queryClient.invalidateQueries('degrees');
      }
    }
  );

  const addInstituteMutation = useMutation(
    (data: { name: string }) => api.post('/institutes/', data),
    {
      onSuccess: () => {
        toast.success('Institute added!');
        queryClient.invalidateQueries('institutes');
      }
    }
  );

  const { register: registerDegree, handleSubmit: handleDegreeSubmit, reset: resetDegree } = useForm();
  const { register: registerInstitute, handleSubmit: handleInstituteSubmit, reset: resetInstitute } = useForm();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Setup & Data Management</h1>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('degrees')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'degrees' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500'
            }`}
          >
            Degrees ({degrees?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('institutes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'institutes' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500'
            }`}
          >
            Institutes ({institutes?.length || 0})
          </button>
        </nav>
      </div>

      {activeTab === 'degrees' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-medium mb-4">Add New Degree</h3>
            <form onSubmit={handleDegreeSubmit((data) => {
              addDegreeMutation.mutate(data);
              resetDegree();
            })} className="flex space-x-2">
              <input
                {...registerDegree('name', { required: true })}
                className="input-field flex-1"
                placeholder="Degree name (e.g., Bachelor of Science)"
              />
              <button type="submit" disabled={addDegreeMutation.isLoading} className="btn-primary">
                Add
              </button>
            </form>
          </div>
          
          <div className="card">
            <h3 className="font-medium mb-4">Existing Degrees</h3>
            <div className="grid gap-2">
              {Array.isArray(degrees) && degrees.map((degree: any) => (
                <div key={degree.id} className="p-2 bg-gray-50 rounded">
                  {degree.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'institutes' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-medium mb-4">Add New Institute</h3>
            <form onSubmit={handleInstituteSubmit((data) => {
              addInstituteMutation.mutate(data);
              resetInstitute();
            })} className="flex space-x-2">
              <input
                {...registerInstitute('name', { required: true })}
                className="input-field flex-1"
                placeholder="Institute name"
              />
              <button type="submit" disabled={addInstituteMutation.isLoading} className="btn-primary">
                Add
              </button>
            </form>
          </div>
          
          <div className="card">
            <h3 className="font-medium mb-4">Existing Institutes</h3>
            <div className="grid gap-2">
              {Array.isArray(institutes) && institutes.map((institute: any) => (
                <div key={institute.id} className="p-2 bg-gray-50 rounded">
                  {institute.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SetupPage() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'data_entry']}>
      <SetupContent />
    </ProtectedRoute>
  );
}