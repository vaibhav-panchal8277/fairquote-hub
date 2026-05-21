'use client';

import React, { useState } from 'react';
import { useData } from '@/context/data-context';
import { MOCK_USERS, getProviderById, getQuoteById } from '@/lib/mock-data';
import { formatDate, formatRelativeTime, capitalizeFirst, getStatusColor } from '@/lib/utils';
import Sidebar from '@/components/layout/sidebar';
import {
  Flag, AlertTriangle, CheckCircle2, XCircle,
  MessageSquare, Eye, Clock, FileText
} from 'lucide-react';

export default function ModerationPage() {
  const { flags, updateFlag } = useData();
  const [filter, setFilter] = useState<'all' | 'open' | 'investigating' | 'resolved' | 'dismissed'>('all');

  const filtered = flags.filter(f => filter === 'all' ? true : f.status === filter);

  const handleResolve = (flagId: string, resolution: string) => {
    updateFlag(flagId, {
      status: 'resolved',
      resolution,
      resolvedAt: new Date().toISOString(),
    });
  };

  const handleDismiss = (flagId: string) => {
    updateFlag(flagId, {
      status: 'dismissed',
      resolution: 'Reviewed and dismissed — no action needed.',
      resolvedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-5xl">
        <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <Flag className="w-6 h-6 inline mr-2 text-rose" />
          Moderation Queue
        </h1>
        <p className="text-muted-foreground mb-6">Review flagged quotes, reviews, and providers</p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'open', 'investigating', 'resolved', 'dismissed'] as const).map(tab => {
            const count = tab === 'all' ? flags.length : flags.filter(f => f.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === tab ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                {capitalizeFirst(tab)} ({count})
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 rounded-2xl bg-muted text-center">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
            <p className="font-medium mb-1">All Clear!</p>
            <p className="text-sm text-muted-foreground">No flagged items in this category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(flag => {
              const reporter = MOCK_USERS.find(u => u.id === flag.reporterId);
              const typeIcon = flag.targetType === 'quote' ? FileText : flag.targetType === 'review' ? MessageSquare : AlertTriangle;
              const TypeIcon = typeIcon;

              return (
                <div
                  key={flag.id}
                  className={`p-5 rounded-2xl border ${
                    flag.status === 'open'
                      ? 'border-rose/30 bg-rose/5'
                      : flag.status === 'investigating'
                      ? 'border-amber/30 bg-amber/5'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TypeIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs font-medium uppercase text-muted-foreground">
                          {flag.targetType} #{flag.targetId}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(flag.status)}`}>
                          {capitalizeFirst(flag.status)}
                        </span>
                      </div>

                      <p className="font-medium mb-2">{flag.reason}</p>
                      {flag.details && (
                        <p className="text-sm text-muted-foreground mb-2">{flag.details}</p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Reported by: {reporter?.name || 'Unknown'}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formatRelativeTime(flag.createdAt)}
                        </span>
                      </div>

                      {flag.resolution && (
                        <div className="mt-3 p-3 rounded-lg bg-muted text-sm">
                          <p className="font-medium text-xs text-muted-foreground mb-1">Resolution:</p>
                          <p>{flag.resolution}</p>
                        </div>
                      )}
                    </div>

                    {(flag.status === 'open' || flag.status === 'investigating') && (
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleResolve(flag.id, 'Reviewed and action taken. Provider warned.')}
                          className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-all flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Resolve
                        </button>
                        <button
                          onClick={() => handleDismiss(flag.id)}
                          className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-navy-200 transition-all flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" /> Dismiss
                        </button>
                      </div>
                    )}
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
