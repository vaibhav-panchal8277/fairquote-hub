'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { getProviderByUserId } from '@/lib/mock-data';
import { formatCurrency, capitalizeFirst, getUrgencyColor } from '@/lib/utils';
import { calculateFairPrice } from '@/lib/pricing-engine';
import Sidebar from '@/components/layout/sidebar';
import {
  ArrowLeft, Send, Shield, DollarSign, Clock,
  Calendar, FileText, Info, Plus, Trash2
} from 'lucide-react';

export default function QuoteComposerPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { jobs, addQuote } = useData();
  const jobId = params.jobId as string;
  const job = jobs.find(j => j.id === jobId);

  const provider = user ? getProviderByUserId(user.id) : null;
  const priceRange = job ? calculateFairPrice(job.zip, job.categoryId) : null;

  const [laborCost, setLaborCost] = useState('');
  const [partsCost, setPartsCost] = useState('');
  const [timelineDays, setTimelineDays] = useState('');
  const [warrantyMonths, setWarrantyMonths] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const total = (parseFloat(laborCost) || 0) + (parseFloat(partsCost) || 0);

  if (!job || !provider) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 text-center">
          <p className="text-muted-foreground">Job not found.</p>
        </div>
      </div>
    );
  }

  const cat = SERVICE_CATEGORIES.find(c => c.id === job.categoryId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    addQuote({
      jobId: job.id,
      providerId: provider.id,
      laborCost: parseFloat(laborCost) || 0,
      partsCost: parseFloat(partsCost) || 0,
      total,
      timelineDays: parseInt(timelineDays) || 1,
      warrantyMonths: parseInt(warrantyMonths) || 0,
      notes,
    });

    setTimeout(() => {
      router.push('/provider/inbox');
    }, 500);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-3xl">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Inbox
        </button>

        <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Submit Quote
        </h1>
        <p className="text-muted-foreground mb-8">Create a competitive quote for this job request</p>

        {/* Job Summary */}
        <div className="mb-6 p-5 rounded-2xl bg-muted">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-muted-foreground">Job Details</h3>
          </div>
          <h2 className="font-bold text-lg mb-1">{job.title}</h2>
          <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${cat?.color}15`, color: cat?.color }}>
              {cat?.name}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
              {capitalizeFirst(job.urgency)} Priority
            </span>
            <span className="text-xs text-muted-foreground">ZIP {job.zip}</span>
          </div>
        </div>

        {/* Fair Price Reference */}
        {priceRange && (
          <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Fair Price Reference</p>
              <p className="text-sm text-muted-foreground">
                Local fair range: <span className="font-semibold text-foreground">{formatCurrency(priceRange.min)} – {formatCurrency(priceRange.max)}</span>
                {' '}(median: {formatCurrency(priceRange.median)}) based on {priceRange.sampleSize} verified quotes
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Cost inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Labor Cost *</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  value={laborCost}
                  onChange={e => setLaborCost(e.target.value)}
                  placeholder="0"
                  className="input-field pl-10"
                  min="0"
                  step="1"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Parts / Materials</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  value={partsCost}
                  onChange={e => setPartsCost(e.target.value)}
                  placeholder="0"
                  className="input-field pl-10"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="p-4 rounded-xl bg-card border-2 border-primary/20">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Quote</span>
              <span className="text-2xl font-extrabold text-primary" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatCurrency(total)}
              </span>
            </div>
            {priceRange && total > 0 && (
              <div className="mt-2 text-xs">
                {total <= priceRange.median ? (
                  <span className="text-primary">✓ Below median — competitive pricing</span>
                ) : total <= priceRange.max ? (
                  <span className="text-amber">⚠ Above median but within fair range</span>
                ) : (
                  <span className="text-rose">⚠ Above fair range — may receive lower fairness score</span>
                )}
              </div>
            )}
          </div>

          {/* Timeline & Warranty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Timeline (days) *</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  value={timelineDays}
                  onChange={e => setTimelineDays(e.target.value)}
                  placeholder="1"
                  className="input-field pl-10"
                  min="1"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Warranty (months)</label>
              <div className="relative">
                <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  value={warrantyMonths}
                  onChange={e => setWarrantyMonths(e.target.value)}
                  placeholder="0"
                  className="input-field pl-10"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Notes & Terms</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Include details about what's included, materials, prep work, exclusions, etc."
              className="input-field min-h-[100px] resize-y"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()} className="btn-secondary flex-1 py-3.5">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!laborCost || !timelineDays || submitting}
              className="btn-primary flex-1 py-3.5 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Quote'}
              {!submitting && <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
