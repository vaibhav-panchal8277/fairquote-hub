'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/context/data-context';
import { MOCK_USERS, MOCK_PROVIDERS, MOCK_PRICE_INDICES } from '@/lib/mock-data';
import Sidebar from '@/components/layout/sidebar';
import {
  Users, Wrench, FileText, MessageSquare, Star,
  Flag, ShieldCheck, TrendingUp, ArrowRight, AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  const { jobs, quotes, reviews, flags } = useData();

  const totalUsers = MOCK_USERS.filter(u => u.role === 'seeker').length;
  const totalProviders = MOCK_PROVIDERS.length;
  const pendingVerifications = MOCK_PROVIDERS.filter(p => p.verificationStatus === 'pending').length;
  const openFlags = flags.filter(f => f.status === 'open' || f.status === 'investigating').length;

  const stats = [
    { label: 'Total Seekers', value: totalUsers, icon: Users, color: 'text-blue bg-blue-light' },
    { label: 'Total Providers', value: totalProviders, icon: Wrench, color: 'text-primary bg-primary-light' },
    { label: 'Total Jobs', value: jobs.length, icon: FileText, color: 'text-violet bg-violet-light' },
    { label: 'Total Quotes', value: quotes.length, icon: MessageSquare, color: 'text-amber bg-amber-light' },
    { label: 'Total Reviews', value: reviews.length, icon: Star, color: 'text-rose bg-rose-light' },
    { label: 'Open Flags', value: openFlags, icon: Flag, color: openFlags > 0 ? 'text-rose bg-rose-light' : 'text-primary bg-primary-light' },
  ];

  const signupData = [
    { month: 'Jun', users: 12, providers: 4 },
    { month: 'Jul', users: 18, providers: 6 },
    { month: 'Aug', users: 25, providers: 8 },
    { month: 'Sep', users: 34, providers: 11 },
    { month: 'Oct', users: 42, providers: 15 },
    { month: 'Nov', users: 58, providers: 19 },
  ];
  const maxSignups = Math.max(...signupData.map(d => d.users));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Admin Dashboard 🛡️
        </h1>
        <p className="text-muted-foreground mb-8">Platform health and management overview</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card border border-border text-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {pendingVerifications > 0 && (
            <Link
              href="/admin/verification"
              className="p-5 rounded-2xl border-2 border-amber/30 bg-amber/5 hover:border-amber/50 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-light flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-amber" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Pending Verifications</p>
                <p className="text-sm text-muted-foreground">{pendingVerifications} provider{pendingVerifications > 1 ? 's' : ''} awaiting review</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          )}

          {openFlags > 0 && (
            <Link
              href="/admin/moderation"
              className="p-5 rounded-2xl border-2 border-rose/30 bg-rose/5 hover:border-rose/50 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-light flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-rose" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Flagged Content</p>
                <p className="text-sm text-muted-foreground">{openFlags} item{openFlags > 1 ? 's' : ''} need attention</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          )}
        </div>

        {/* Signup Trend Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Signup Trends
            </h3>
            <div className="flex items-end gap-3 h-40">
              {signupData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium">{d.users}</span>
                  <div className="w-full flex flex-col gap-0.5">
                    <div
                      className="w-full rounded-t bg-blue transition-all"
                      style={{ height: `${(d.users / maxSignups) * 100}px`, minHeight: '4px' }}
                    />
                    <div
                      className="w-full rounded-b bg-primary transition-all"
                      style={{ height: `${(d.providers / maxSignups) * 100}px`, minHeight: '4px' }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue inline-block" /> Seekers</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Providers</span>
            </div>
          </div>

          {/* Regional Price Summary */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4">Regional Price Data Coverage</h3>
            <div className="space-y-3">
              {['10001', '90210', '60601', '77001', '33101'].map(zip => {
                const count = MOCK_PRICE_INDICES.filter(p => p.zipCode === zip).length;
                return (
                  <div key={zip} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16">ZIP {zip}</span>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-primary transition-all"
                        style={{ width: `${(count / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-16 text-right">
                      {count}/10 cats
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/admin/verification', label: 'Verification Queue', icon: ShieldCheck },
            { href: '/admin/moderation', label: 'Moderation Queue', icon: Flag },
            { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
            { href: '/search', label: 'Price Search', icon: FileText },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="p-4 rounded-xl bg-card border border-border hover:shadow-md hover:border-primary/20 transition-all text-center"
            >
              <link.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">{link.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
