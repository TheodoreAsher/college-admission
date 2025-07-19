'use client';

import React from 'react';
import { useStudentProfile } from '@/hooks/useApi';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { User, MapPin, BookOpen, Activity, Check, X } from 'lucide-react';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { data: profile, isLoading } = useStudentProfile();

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <User className="h-5 w-5" />,
      isComplete: !!profile?.personal_info,
      href: '/profile/personal',
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <MapPin className="h-5 w-5" />,
      isComplete: !!profile?.contact_info,
      href: '/profile/contact',
    },
    {
      id: 'education',
      title: 'Educational Background',
      icon: <BookOpen className="h-5 w-5" />,
      isComplete: profile?.educational_records && profile.educational_records.length > 0,
      href: '/profile/education',
    },
    {
      id: 'medical',
      title: 'Medical Information',
      icon: <Activity className="h-5 w-5" />,
      isComplete: !!profile?.medical_info,
      href: '/profile/medical',
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete your profile to apply for programs
        </p>

        <div className="mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Complete all sections to apply for programs
                </p>
              </div>
              <div>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {profile?.profile_completion || 0}% Complete
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <span className="mr-2">{section.icon}</span>
                      {section.title}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">
                      <div className="flex items-center">
                        {section.isComplete ? (
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span>
                          {section.isComplete ? 'Completed' : 'Not completed'}
                        </span>
                      </div>
                      <Link
                        href={section.href}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {section.isComplete ? 'Update' : 'Complete'}
                      </Link>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}