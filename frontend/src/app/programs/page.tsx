'use client';

import React from 'react';
import { usePrograms, useOfferedPrograms } from '@/hooks/useApi';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ProgramsPage() {
  return (
    <ProtectedRoute>
      <ProgramsContent />
    </ProtectedRoute>
  );
}

function ProgramsContent() {
  const { data: programs, isLoading: programsLoading } = usePrograms();
  const { data: offeredPrograms, isLoading: offeredProgramsLoading } = useOfferedPrograms();

  const isLoading = programsLoading || offeredProgramsLoading;

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Make sure programs is an array
  const programsList = Array.isArray(programs) ? programs : [];
  
  if (!programsList.length) {
    return (
      <EmptyState
        title="No Programs Available"
        description="There are currently no programs available for admission."
        icon={<BookOpen className="h-12 w-12 text-gray-400" />}
      />
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Available Programs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse and apply for available academic programs
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programsList.map((program) => {
            // Find if this program is offered in any current session
            const isOffered = offeredPrograms?.some(
              (offered) => offered.program.id === program.id && offered.is_active
            );

            return (
              <div
                key={program.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {program.name}
                      </h3>
                      <p className="text-sm text-gray-500">Code: {program.code}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Courses:</h4>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1">
                      {program.courses.slice(0, 3).map((course) => (
                        <li key={course.id}>{course.name}</li>
                      ))}
                      {program.courses.length > 3 && (
                        <li className="text-blue-600">
                          +{program.courses.length - 3} more courses
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-5">
                    {isOffered ? (
                      <Link
                        href={`/applications/new?programId=${program.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Apply Now
                      </Link>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-100">
                        Not Available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}