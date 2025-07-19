'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudentProfile, useApplications, useAnnouncements } from '@/hooks/useApi';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StatusBadge from '@/components/ui/StatusBadge';
import { BookOpen, FileText, CreditCard, User, Bell } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: profile, isLoading: profileLoading } = useStudentProfile();
  const { data: applications, isLoading: applicationsLoading } = useApplications();
  const { data: announcements, isLoading: announcementsLoading } = useAnnouncements();

  const isLoading = profileLoading || applicationsLoading || announcementsLoading;

  const handleCompleteProfile = () => {
    router.push('/profile');
  };

  return (
    <ProtectedRoute>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <>
              {/* Profile Completion Card */}
              <div className="bg-white shadow rounded-lg p-6 mt-6">
                <h2 className="text-lg font-medium text-gray-900">Profile Completion</h2>
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          {profile?.profile_completion || 0}% Complete
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${profile?.profile_completion || 0}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                  </div>
                  {(profile?.profile_completion || 0) < 100 && (
                    <button
                      onClick={handleCompleteProfile}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Complete Your Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Link href="/programs" className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Programs</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">Browse Programs</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/applications" className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Applications</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {applications?.length || 0} Applications
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/payments" className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Payments</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">Manage Payments</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/profile" className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Profile</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">Update Profile</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Recent Applications */}
              <div className="mt-8">
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
                    <Link
                      href="/applications"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="border-t border-gray-200">
                    {applications && applications.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {applications.slice(0, 3).map((application) => (
                          <li key={application.id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {application.program.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {application.tracking_id} • {application.session.session}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <StatusBadge status={application.status.code} />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No applications yet</p>
                        <Link
                          href="/programs"
                          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Browse Programs
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="mt-8">
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex items-center">
                    <Bell className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Announcements</h3>
                  </div>
                  <div className="border-t border-gray-200">
                    {announcements && announcements.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {announcements.map((announcement) => (
                          <li key={announcement.id} className="px-4 py-4 sm:px-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{announcement.title}</h4>
                              <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                              <p className="mt-1 text-xs text-gray-500">
                                Posted on {new Date(announcement.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No announcements</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}