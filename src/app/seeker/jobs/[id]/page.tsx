'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { getProviderById, MOCK_USERS } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatRelativeTime, getStatusColor, getFairnessColor, getFairnessBgColor, getFairnessLabel, capitalizeFirst, getUrgencyColor } from '@/lib/utils';
import { calculateFairPrice } from '@/lib/pricing-engine';
import Sidebar from '@/components/layout/sidebar';
import {
  ArrowLeft, CheckCircle2, XCircle, Clock, Star,
  BadgeCheck, AlertTriangle, Shield, DollarSign, Calendar,
  FileText, Award, MessageCircle, ExternalLink
} from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { jobs, quotes, updateQuote, updateJob } = useData();

  const jobId = params.id as string;
  const job = jobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 text-center">
          <p className="text-muted-foreground">Job not found.</p>
          <button onClick={() => router.back()} className="btn-primary mt-4">Go Back</button>
        </div>
      </div>
    );
  }

  const cat = SERVICE_CATEGORIES.find(c => c.id === job.categoryId);
  const jobQuotes = quotes.filter(q => q.jobId === jobId);
  const priceRange = calculateFairPrice(job.zip, job.categoryId);
  const statusSteps = ['posted', 'quoted', 'accepted', 'in_progress', 'completed'];
  const currentStepIndex = statusSteps.indexOf(job.status);

  const handleAcceptQuote = (quoteId: string) => {
    updateQuote(quoteId, { status: 'accepted' });
    // Decline other quotes
    jobQuotes.forEach(q => {
      if (q.id !== quoteId) updateQuote(q.id, { status: 'declined' });
    });
    updateJob(jobId, { status: 'accepted' });
  };

  const handleDeclineQuote = (quoteId: string) => {
    updateQuote(quoteId, { status: 'declined' });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-5xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Job Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                  {capitalizeFirst(job.status)}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
                  {capitalizeFirst(job.urgency)}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {job.title}
              </h1>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <span>{cat?.name}</span> · <span>ZIP {job.zip}</span> · <Clock className="w-3 h-3" /> <span>{formatRelativeTime(job.createdAt)}</span>
              </p>
            </div>
            {job.status === 'completed' && (
              <Link
                href={`/seeker/reviews/new/${job.id}`}
                className="btn-primary text-sm"
              >
                <Star className="w-4 h-4" /> Leave Review
              </Link>
            )}
          </div>
        </div>

        {/* Status Tracker */}
        <div className="mb-8 p-5 rounded-2xl bg-card border border-border">
          <h3 className="text-sm font-semibold mb-4">Job Progress</h3>
          <div className="flex items-center gap-0">
            {statusSteps.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center text-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                    i <= currentStepIndex
                      ? 'gradient-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {i < currentStepIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs ${i <= currentStepIndex ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    {capitalizeFirst(step)}
                  </span>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full ${
                    i < currentStepIndex ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-8 p-5 rounded-2xl bg-card border border-border">
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
        </div>

        {/* Fair Price Reference */}
        {priceRange && (
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-primary/5 to-blue/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">Fair Price Reference</h3>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <p className="text-xs text-muted-foreground">Fair Range</p>
                <p className="text-lg font-bold">
                  {formatCurrency(priceRange.min)} – {formatCurrency(priceRange.max)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Median</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(priceRange.median)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Based on</p>
                <p className="text-lg font-bold">{priceRange.sampleSize} quotes</p>
              </div>
            </div>
          </div>
        )}

        {/* Quotes Comparison */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Quotes Received ({jobQuotes.length})
          </h2>

          {jobQuotes.length === 0 ? (
            <div className="p-8 rounded-2xl bg-muted text-center">
              <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium mb-1">Waiting for quotes</p>
              <p className="text-sm text-muted-foreground">Providers have been notified. You&apos;ll receive quotes within 24 hours.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobQuotes.map(quote => {
                const provider = getProviderById(quote.providerId);
                const providerUser = provider ? MOCK_USERS.find(u => u.id === provider.userId) : null;
                const isRedFlag = quote.fairnessScore < 40;

                return (
                  <div
                    key={quote.id}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      quote.status === 'accepted'
                        ? 'border-primary bg-primary/5'
                        : quote.status === 'declined'
                        ? 'border-border opacity-50'
                        : isRedFlag
                        ? 'border-rose/30 bg-rose/5'
                        : 'border-border bg-card hover:border-primary/20 hover:shadow-md'
                    }`}
                  >
                    {/* Provider info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white text-xs font-bold">
                        {provider?.businessName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm">{provider?.businessName}</span>
                          {provider?.verificationStatus === 'verified' && (
                            <BadgeCheck className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 fill-amber text-amber" />
                          {provider?.avgRating.toFixed(1)} ({provider?.totalReviews})
                        </div>
                      </div>
                    </div>

                    {/* Red flag warning */}
                    {isRedFlag && (
                      <div className="mb-3 p-2.5 rounded-lg bg-rose/10 flex items-center gap-2 text-xs text-rose font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Significantly above/below fair range
                      </div>
                    )}

                    {/* Fairness Score */}
                    <div className="mb-4 p-3 rounded-xl bg-muted text-center">
                      <p className="text-xs text-muted-foreground mb-1">Fairness Score</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className={`text-3xl font-extrabold ${getFairnessColor(quote.fairnessScore)}`}>
                          {quote.fairnessScore}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getFairnessBgColor(quote.fairnessScore)}`}>
                          {getFairnessLabel(quote.fairnessScore)}
                        </span>
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Labor</span>
                        <span className="font-medium">{formatCurrency(quote.laborCost)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Parts / Materials</span>
                        <span className="font-medium">{formatCurrency(quote.partsCost)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-lg">{formatCurrency(quote.total)}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted text-center">
                        <Calendar className="w-3.5 h-3.5 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs font-medium">{quote.timelineDays} day{quote.timelineDays > 1 ? 's' : ''}</p>
                        <p className="text-xs text-muted-foreground">Timeline</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted text-center">
                        <Shield className="w-3.5 h-3.5 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs font-medium">{quote.warrantyMonths > 0 ? `${quote.warrantyMonths}mo` : 'None'}</p>
                        <p className="text-xs text-muted-foreground">Warranty</p>
                      </div>
                    </div>

                    {/* Notes */}
                    {quote.notes && (
                      <p className="text-xs text-muted-foreground mb-4 p-2 rounded-lg bg-muted italic">
                        &ldquo;{quote.notes}&rdquo;
                      </p>
                    )}

                    {/* Status badge */}
                    {quote.status === 'accepted' && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-primary-light text-primary-dark text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Accepted
                      </div>
                    )}
                    {quote.status === 'declined' && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted text-muted-foreground text-sm">
                        <XCircle className="w-4 h-4" /> Declined
                      </div>
                    )}

                    {/* Actions */}
                    {quote.status === 'submitted' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAcceptQuote(quote.id)}
                          className="btn-primary flex-1 py-2 text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeclineQuote(quote.id)}
                          className="btn-secondary flex-1 py-2 text-sm"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
