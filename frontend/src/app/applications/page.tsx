'use client';

import React from 'react';
import { useApplications } from '@/hooks/useApi';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import StatusBadge from '@/components/ui/StatusBadge';
import { FileText, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
  return (
    <ProtectedRoute>
      <ApplicationsContent />
    </ProtectedRoute>
  );
}

function ApplicationsContent() {
  const { data: applications, isLoading } = useApplications();

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Ensure applications is an array
  const applicationsArray = Array.isArray(applications) ? applications : [];

  if (!applicationsArray || applicationsArray.length === 0) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">My Applications</h1>
          <div className="mt-6">
            <EmptyState
              title="No Applications Yet"
              description="You haven't submitted any applications yet."
              icon={<FileText className="h-12 w-12 text-gray-400" />}
              action={
                <Link
                  href="/programs"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Browse Programs
                </Link>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">My Applications</h1>
          <Link
            href="/programs"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Application
          </Link>
        </div>

        <div className="mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {applicationsArray.map((application) => (
                <li key={application.id}>
                  <Link href={`/applications/${application.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <FileText className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-blue-600 truncate">
                              {application.program.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {application.tracking_id} • {application.session.session}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <StatusBadge status={application.status.code} />
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Applied on {new Date(application.applied_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            Payment: <span className="capitalize">{application.payment_status}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}