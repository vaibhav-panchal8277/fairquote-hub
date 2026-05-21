'use client';

import React from 'react';
import { useData } from '@/context/data-context';
import { MOCK_USERS, MOCK_PROVIDERS, MOCK_PRICE_INDICES } from '@/lib/mock-data';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Sidebar from '@/components/layout/sidebar';
import {
  TrendingUp, Users, FileText, DollarSign,
  Download, BarChart3, PieChart, Map
} from 'lucide-react';

export default function AnalyticsPage() {
  const { jobs, quotes, reviews, flags } = useData();

  // Funnel data
  const funnel = [
    { label: 'Visitors', value: 5200, pct: 100 },
    { label: 'Searchers', value: 3100, pct: 60 },
    { label: 'Job Requesters', value: jobs.length * 80, pct: 18 },
    { label: 'Quote Receivers', value: Math.round(jobs.length * 60), pct: 14 },
    { label: 'Accepted Quotes', value: quotes.filter(q => q.status === 'accepted').length * 50, pct: 8 },
    { label: 'Reviews Left', value: reviews.length * 30, pct: 5 },
  ];

  // Category breakdown
  const categoryStats = SERVICE_CATEGORIES.map(cat => {
    const catJobs = jobs.filter(j => j.categoryId === cat.id);
    const catQuotes = quotes.filter(q => catJobs.some(j => j.id === q.jobId));
    const priceData = MOCK_PRICE_INDICES.filter(p => p.categoryId === cat.id);
    const avgMedian = priceData.length > 0
      ? Math.round(priceData.reduce((sum, p) => sum + p.median, 0) / priceData.length)
      : 0;
    return {
      ...cat,
      jobs: catJobs.length,
      quotes: catQuotes.length,
      avgMedian,
    };
  }).sort((a, b) => b.jobs - a.jobs);

  const maxJobs = Math.max(...categoryStats.map(c => c.jobs), 1);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <TrendingUp className="w-6 h-6 inline mr-2 text-primary" />
              Analytics & Reports
            </h1>
            <p className="text-muted-foreground">Platform performance and pricing insights</p>
          </div>
          <button className="btn-secondary text-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Conversion Funnel */}
        <div className="mb-8 p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-primary" />
            Conversion Funnel
          </h3>
          <div className="space-y-3">
            {funnel.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm font-medium w-36 text-right">{step.label}</span>
                <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-primary flex items-center justify-end pr-3 transition-all"
                    style={{ width: `${Math.max(step.pct, 5)}%` }}
                  >
                    <span className="text-xs font-bold text-white">
                      {step.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                  {step.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Performance */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue" />
              Jobs by Category
            </h3>
            <div className="space-y-3">
              {categoryStats.map(cat => (
                <div key={cat.id} className="flex items-center gap-3">
                  <span className="text-sm w-24 truncate" style={{ color: cat.color }}>{cat.name}</span>
                  <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(cat.jobs / maxJobs) * 100}%`,
                        backgroundColor: cat.color,
                        minWidth: cat.jobs > 0 ? '12px' : '0',
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium w-6 text-right">{cat.jobs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avg Prices by Category */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Avg Median Price by Category
            </h3>
            <div className="space-y-3">
              {categoryStats.filter(c => c.avgMedian > 0).map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold">{formatCurrency(cat.avgMedian)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-bold mb-4">Platform Health Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Avg Quotes per Job', value: (quotes.length / Math.max(jobs.length, 1)).toFixed(1), trend: '↑ 0.3' },
              { label: 'Quote Response Rate', value: '78%', trend: '↑ 5%' },
              { label: 'Verified Review Rate', value: '68%', trend: '↑ 3%' },
              { label: 'Fraud Flag Rate', value: `${((flags.length / Math.max(quotes.length, 1)) * 100).toFixed(1)}%`, trend: '↓ 1.2%' },
            ].map((metric, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-muted">
                <p className="text-2xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif' }}>{metric.value}</p>
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-xs text-primary font-medium">{metric.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
