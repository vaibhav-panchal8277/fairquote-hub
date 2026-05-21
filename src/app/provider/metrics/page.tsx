'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { getProviderByUserId, getReviewsByProvider } from '@/lib/mock-data';
import { useData } from '@/context/data-context';
import Sidebar from '@/components/layout/sidebar';
import { BarChart3, TrendingUp, Clock, Star, DollarSign, Target } from 'lucide-react';

export default function ProviderMetrics() {
  const { user } = useAuth();
  const { quotes } = useData();

  if (!user) return null;
  const provider = getProviderByUserId(user.id);
  if (!provider) return null;

  const myQuotes = quotes.filter(q => q.providerId === provider.id);
  const acceptedQuotes = myQuotes.filter(q => q.status === 'accepted');
  const acceptRate = myQuotes.length > 0 ? Math.round((acceptedQuotes.length / myQuotes.length) * 100) : 0;
  const reviews = getReviewsByProvider(provider.id);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(r => ({
    rating: r,
    count: reviews.filter(rev => rev.rating === r).length,
    percentage: reviews.length > 0 ? Math.round((reviews.filter(rev => rev.rating === r).length / reviews.length) * 100) : 0,
  }));

  const monthlyData = [
    { month: 'Jun', jobs: 3, revenue: 850 },
    { month: 'Jul', jobs: 5, revenue: 1420 },
    { month: 'Aug', jobs: 4, revenue: 1180 },
    { month: 'Sep', jobs: 7, revenue: 2100 },
    { month: 'Oct', jobs: 6, revenue: 1750 },
    { month: 'Nov', jobs: 8, revenue: 2400 },
  ];
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-6xl">
        <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <BarChart3 className="w-6 h-6 inline mr-2 text-primary" />
          Performance Metrics
        </h1>
        <p className="text-muted-foreground mb-8">Track your performance and competitiveness</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg Response Time', value: `${provider.responseTimeMin}m`, icon: Clock, color: 'text-blue bg-blue-light', trend: '↓ 5m vs last month' },
            { label: 'Quote Acceptance', value: `${acceptRate}%`, icon: Target, color: 'text-primary bg-primary-light', trend: '↑ 8% vs last month' },
            { label: 'Avg Rating', value: avgRating, icon: Star, color: 'text-amber bg-amber-light', trend: 'Stable' },
            { label: 'Total Revenue', value: `$${acceptedQuotes.reduce((s, q) => s + q.total, 0).toLocaleString()}`, icon: DollarSign, color: 'text-violet bg-violet-light', trend: '↑ 12% vs last month' },
          ].map((metric, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card border border-border">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{metric.value}</p>
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-xs text-primary font-medium">{metric.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart (CSS bars) */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Revenue
            </h3>
            <div className="flex items-end gap-3 h-40">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-foreground">${(d.revenue / 1000).toFixed(1)}k</span>
                  <div
                    className="w-full rounded-t-lg gradient-primary transition-all hover:opacity-80"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%`, minHeight: '8px' }}
                  />
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber" />
              Rating Distribution
            </h3>
            <div className="space-y-3">
              {ratingDistribution.map(item => (
                <div key={item.rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-6">{item.rating}★</span>
                  <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber transition-all"
                      style={{ width: `${item.percentage}%`, minWidth: item.count > 0 ? '12px' : '0' }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Competitiveness */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Price Competitiveness
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            How your quotes compare to the local average for your service categories
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Below Average', pct: '15%', desc: 'cheaper than avg', color: 'text-primary', bg: 'bg-primary-light' },
              { label: 'Acceptance Rate', pct: `${acceptRate}%`, desc: 'of quotes accepted', color: 'text-blue', bg: 'bg-blue-light' },
              { label: 'Repeat Customers', pct: '34%', desc: 'return for more work', color: 'text-violet', bg: 'bg-violet-light' },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl ${item.bg} text-center`}>
                <p className={`text-3xl font-extrabold ${item.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.pct}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
