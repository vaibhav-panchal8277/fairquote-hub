'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { formatCurrency, formatRelativeTime, getStatusColor, capitalizeFirst } from '@/lib/utils';
import { getProviderById, MOCK_USERS } from '@/lib/mock-data';
import Sidebar from '@/components/layout/sidebar';
import {
  PlusCircle, Search, FileText, Star, Clock,
  ArrowRight, TrendingUp, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function SeekerDashboard() {
  const { user } = useAuth();
  const { jobs, quotes, reviews } = useData();

  if (!user) return null;

  const myJobs = jobs.filter(j => j.seekerId === user.id);
  const activeJobs = myJobs.filter(j => !['completed', 'cancelled'].includes(j.status));
  const completedJobs = myJobs.filter(j => j.status === 'completed');
  const pendingReviews = completedJobs.filter(j =>
    !reviews.some(r => r.jobId === j.id && r.seekerId === user.id)
  );
  const myQuotes = quotes.filter(q => myJobs.some(j => j.id === q.jobId));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-6xl">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your home service activity
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <Link
            href="/seeker/jobs/new"
            className="p-5 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold">New Job Request</p>
              <p className="text-sm text-muted-foreground">Get quotes from verified pros</p>
            </div>
          </Link>
          <Link
            href="/search"
            className="p-5 rounded-2xl border border-border bg-card hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-blue" />
            </div>
            <div>
              <p className="font-bold">Search Fair Prices</p>
              <p className="text-sm text-muted-foreground">Check prices in your area</p>
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Jobs', value: activeJobs.length, icon: FileText, color: 'text-blue bg-blue-light' },
            { label: 'Quotes Received', value: myQuotes.length, icon: TrendingUp, color: 'text-primary bg-primary-light' },
            { label: 'Completed', value: completedJobs.length, icon: CheckCircle2, color: 'text-violet bg-violet-light' },
            { label: 'Pending Reviews', value: pendingReviews.length, icon: Star, color: 'text-amber bg-amber-light' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card border border-border">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>
                <stat.icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-2xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Jobs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Active Jobs</h2>
            <Link href="/seeker/jobs/new" className="text-sm text-primary font-medium hover:text-primary-hover flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeJobs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-muted text-center">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium mb-1">No active jobs</p>
              <p className="text-sm text-muted-foreground mb-4">Create a job request to start getting quotes</p>
              <Link href="/seeker/jobs/new" className="btn-primary text-sm">
                <PlusCircle className="w-4 h-4" /> New Request
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeJobs.slice(0, 5).map(job => {
                const cat = SERVICE_CATEGORIES.find(c => c.id === job.categoryId);
                const jobQuotes = quotes.filter(q => q.jobId === job.id);

                return (
                  <Link
                    key={job.id}
                    href={`/seeker/jobs/${job.id}`}
                    className="block p-4 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${cat?.color || '#10B981'}15`, color: cat?.color }}
                        >
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{job.title}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{cat?.name}</span>
                            <span>·</span>
                            <Clock className="w-3 h-3" />
                            <span>{formatRelativeTime(job.createdAt)}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {jobQuotes.length > 0 && (
                          <span className="text-xs text-primary font-medium bg-primary-light px-2 py-1 rounded-full">
                            {jobQuotes.length} quote{jobQuotes.length > 1 ? 's' : ''}
                          </span>
                        )}
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {capitalizeFirst(job.status)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Pending Reviews */}
        {pendingReviews.length > 0 && (
          <div className="p-5 rounded-2xl bg-amber-light/50 border border-amber/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber" />
              <h3 className="font-bold text-sm">Leave a Review</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              You have {pendingReviews.length} completed job{pendingReviews.length > 1 ? 's' : ''} waiting for a review.
              Your verified reviews help other homeowners!
            </p>
            <div className="flex flex-wrap gap-2">
              {pendingReviews.slice(0, 3).map(job => (
                <Link
                  key={job.id}
                  href={`/seeker/reviews/new/${job.id}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber/20 text-sm font-medium hover:border-amber transition-all"
                >
                  {job.title} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
