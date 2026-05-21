'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { getProviderByUserId } from '@/lib/mock-data';
import { formatRelativeTime, getStatusColor, capitalizeFirst, getUrgencyColor } from '@/lib/utils';
import Sidebar from '@/components/layout/sidebar';
import { Inbox, Filter, FileText, Clock, MapPin, AlertTriangle } from 'lucide-react';

export default function ProviderInbox() {
  const { user } = useAuth();
  const { jobs, quotes } = useData();
  const [filter, setFilter] = useState<'new' | 'quoted' | 'all'>('all');

  if (!user) return null;

  const provider = getProviderByUserId(user.id);
  if (!provider) return null;

  const myQuotes = quotes.filter(q => q.providerId === provider.id);

  // All jobs matching this provider's categories
  const relevantJobs = jobs.filter(j =>
    provider.serviceCategories.includes(j.categoryId)
  );

  const filteredJobs = relevantJobs.filter(j => {
    const hasQuoted = myQuotes.some(q => q.jobId === j.id);
    if (filter === 'new') return j.status === 'posted' && !hasQuoted;
    if (filter === 'quoted') return hasQuoted;
    return true;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-4xl">
        <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <Inbox className="w-6 h-6 inline mr-2 text-primary" />
          Job Requests Inbox
        </h1>
        <p className="text-muted-foreground mb-6">Browse and respond to job requests in your service area</p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {([
            { value: 'all', label: 'All' },
            { value: 'new', label: 'New Requests' },
            { value: 'quoted', label: 'Quoted' },
          ] as const).map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === tab.value
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-12 rounded-2xl bg-muted text-center">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-1">No jobs found</p>
            <p className="text-sm text-muted-foreground">Check back later for new requests in your area.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map(job => {
              const cat = SERVICE_CATEGORIES.find(c => c.id === job.categoryId);
              const hasQuoted = myQuotes.some(q => q.jobId === job.id);
              const myQuote = myQuotes.find(q => q.jobId === job.id);

              return (
                <div
                  key={job.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    hasQuoted ? 'border-border bg-card' : 'border-primary/20 bg-primary/5 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {capitalizeFirst(job.status)}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
                          {capitalizeFirst(job.urgency)}
                        </span>
                        {job.urgency === 'emergency' && (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose" />
                        )}
                      </div>
                      <h3 className="font-bold mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{job.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span style={{ color: cat?.color }}>{cat?.name}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> ZIP {job.zip}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formatRelativeTime(job.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {hasQuoted ? (
                        <div className="text-center">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-medium ${getStatusColor(myQuote?.status || '')}`}>
                            {capitalizeFirst(myQuote?.status || '')}
                          </span>
                        </div>
                      ) : (
                        <Link
                          href={`/provider/quotes/new/${job.id}`}
                          className="btn-primary text-sm py-2.5 px-5"
                        >
                          Submit Quote →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
