'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { getProviderByUserId, getReviewsByProvider } from '@/lib/mock-data';
import { formatCurrency, formatRelativeTime, getStatusColor, capitalizeFirst } from '@/lib/utils';
import Sidebar from '@/components/layout/sidebar';
import {
  Inbox, BarChart3, Star, Clock, TrendingUp,
  CheckCircle2, DollarSign, ArrowRight, FileText, Users
} from 'lucide-react';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const { jobs, quotes } = useData();

  if (!user) return null;

  const provider = getProviderByUserId(user.id);
  if (!provider) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 text-center">
          <p className="text-muted-foreground">Provider profile not found. Please complete your registration.</p>
        </div>
      </div>
    );
  }

  const myQuotes = quotes.filter(q => q.providerId === provider.id);
  const myReviews = getReviewsByProvider(provider.id);
  const pendingQuotes = myQuotes.filter(q => q.status === 'submitted');
  const acceptedQuotes = myQuotes.filter(q => q.status === 'accepted');
  const totalRevenue = acceptedQuotes.reduce((sum, q) => sum + q.total, 0);

  // Jobs available for quoting
  const availableJobs = jobs.filter(j =>
    provider.serviceCategories.includes(j.categoryId) &&
    j.status === 'posted' &&
    !myQuotes.some(q => q.jobId === j.id)
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-6xl">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Provider Dashboard 🔧
          </h1>
          <p className="text-muted-foreground">
            {provider.businessName} · {provider.verificationStatus === 'verified' ? '✅ Verified Pro' : '⏳ Verification Pending'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg Rating', value: provider.avgRating.toFixed(1), icon: Star, color: 'text-amber bg-amber-light' },
            { label: 'Response Time', value: `${provider.responseTimeMin}m`, icon: Clock, color: 'text-blue bg-blue-light' },
            { label: 'Active Quotes', value: pendingQuotes.length.toString(), icon: FileText, color: 'text-violet bg-violet-light' },
            { label: 'Est. Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-primary bg-primary-light' },
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

        {/* New Job Requests */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <Inbox className="w-5 h-5 text-primary" />
              New Job Requests
              {availableJobs.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary text-white">
                  {availableJobs.length}
                </span>
              )}
            </h2>
            <Link href="/provider/inbox" className="text-sm text-primary font-medium hover:text-primary-hover flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {availableJobs.length === 0 ? (
            <div className="p-6 rounded-2xl bg-muted text-center">
              <Inbox className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No new requests right now. We&apos;ll notify you when a match comes in.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {availableJobs.slice(0, 4).map(job => {
                const cat = SERVICE_CATEGORIES.find(c => c.id === job.categoryId);
                return (
                  <div key={job.id} className="p-4 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${cat?.color || '#10B981'}15`, color: cat?.color }}
                      >
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{job.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {cat?.name} · ZIP {job.zip} · {formatRelativeTime(job.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/provider/quotes/new/${job.id}`}
                      className="btn-primary text-xs py-2 px-4"
                    >
                      Quote →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Recent Quote Activity
          </h2>
          <div className="space-y-3">
            {myQuotes.slice(0, 5).map(quote => {
              const job = jobs.find(j => j.id === quote.jobId);
              return (
                <div key={quote.id} className="p-4 rounded-xl bg-card border border-border flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{job?.title || 'Job'}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(quote.total)} · {formatRelativeTime(quote.createdAt)}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                    {capitalizeFirst(quote.status)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
