'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
}

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Remove confirm_password before sending to API
      const { confirm_password, ...registerData } = data;
      
      await registerUser(registerData);
      router.push('/auth/login?registered=true');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
      {/* Left Panel - Diagonal Green Background */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-900 clip-diagonal z-0"></div>
        <div className="relative z-10 p-12 text-white flex flex-col justify-between w-full">
          <div>
            <h1 className="text-4xl font-bold mb-4">🎓 Join Our Community</h1>
            <p className="text-lg mb-8">Start your academic journey today</p>
            <div className="bg-white/10 backdrop-blur p-3 rounded-xl shadow-md max-w-xs">
              <h2 className="text-base font-semibold mb-2">Application Steps</h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="flex h-4 w-4 rounded-full bg-green-600 text-white items-center justify-center mr-1 shrink-0">1</div>
                  <span>Create account</span>
                </div>
                <div className="flex items-center">
                  <div className="flex h-4 w-4 rounded-full bg-green-600 text-white items-center justify-center mr-1 shrink-0">2</div>
                  <span>Complete profile</span>
                </div>
                <div className="flex items-center">
                  <div className="flex h-4 w-4 rounded-full bg-green-600 text-white items-center justify-center mr-1 shrink-0">3</div>
                  <span>Select program</span>
                </div>
                <div className="flex items-center">
                  <div className="flex h-4 w-4 rounded-full bg-green-600 text-white items-center justify-center mr-1 shrink-0">4</div>
                  <span>Submit application</span>
                </div>
              </div>
            </div>
          </div>
          <Link href="/landing" className="text-sm flex items-center text-green-200 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
      
      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-white z-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-green-700 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      id="first_name"
                      type="text"
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm shadow-sm focus:ring-green-600 focus:outline-none"
                      placeholder="John"
                      {...register('first_name', {
                        required: 'First name is required',
                      })}
                    />
                  </div>
                  {errors.first_name && (
                    <p className="text-xs text-red-600 mt-1">{errors.first_name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      id="last_name"
                      type="text"
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm shadow-sm focus:ring-green-600 focus:outline-none"
                      placeholder="Doe"
                      {...register('last_name', {
                        required: 'Last name is required',
                      })}
                    />
                  </div>
                  {errors.last_name && (
                    <p className="text-xs text-red-600 mt-1">{errors.last_name.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm shadow-sm focus:ring-green-600 focus:outline-none"
                    placeholder="you@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="phone_number"
                    type="tel"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm shadow-sm focus:ring-green-600 focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                    {...register('phone_number', {
                      required: 'Phone number is required',
                    })}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone_number.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm shadow-sm focus:ring-green-600 focus:outline-none"
                    placeholder="••••••••"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    id="confirm_password"
                    type="password"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm shadow-sm focus:ring-green-600 focus:outline-none"
                    placeholder="••••••••"
                    {...register('confirm_password', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match',
                    })}
                  />
                </div>
                {errors.confirm_password && (
                  <p className="text-xs text-red-600 mt-1">{errors.confirm_password.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition duration-200 flex items-center justify-center"
              >
                {isLoading ? <LoadingSpinner size="small" /> : 'Create Account'}
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/landing" className="text-sm text-gray-600 hover:text-green-700">
                <ArrowLeft className="inline h-4 w-4 mr-1" />
                Back to homepage
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Custom CSS for diagonal */}
      <style jsx>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}