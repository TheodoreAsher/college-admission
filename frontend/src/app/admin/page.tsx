'use client';

import React from 'react';
import { useApplications, useAdmissionStats } from '@/hooks/useApi';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import RoleGuard from '@/components/ui/RoleGuard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StatusBadge from '@/components/ui/StatusBadge';
import { FileText, Users, BookOpen, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin', 'admission_officer', 'reviewer', 'accountant', 'data_entry']}>
        <AdminDashboardContent />
      </RoleGuard>
    </ProtectedRoute>
  );
}

function AdminDashboardContent() {
  const { data: applications, isLoading: applicationsLoading } = useApplications();
  const { data: stats, isLoading: statsLoading } = useAdmissionStats();

  const isLoading = applicationsLoading || statsLoading;

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Count applications by status
  const applicationCounts = {
    total: applications?.length || 0,
    submitted: applications?.filter(app => app.status.code === 'submitted').length || 0,
    under_review: applications?.filter(app => app.status.code === 'under_review').length || 0,
    approved: applications?.filter(app => app.status.code === 'approved').length || 0,
    rejected: applications?.filter(app => app.status.code === 'rejected').length || 0,
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{applicationCounts.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Review</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{applicationCounts.submitted}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{applicationCounts.approved}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Rejected</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{applicationCounts.rejected}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
              <Link
                href="/admin/applications"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
            <div className="border-t border-gray-200">
              {applications && applications.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {applications.slice(0, 5).map((application) => (
                    <li key={application.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {application.student.user.first_name} {application.student.user.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {application.program.name} • {application.tracking_id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-gray-500 mr-4">
                            {new Date(application.applied_at).toLocaleDateString()}
                          </p>
                          <StatusBadge status={application.status.code} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No applications yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}