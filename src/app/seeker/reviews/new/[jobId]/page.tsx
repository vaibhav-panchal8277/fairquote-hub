'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { REVIEW_TAGS } from '@/lib/constants';
import { getProviderById, MOCK_USERS } from '@/lib/mock-data';
import Sidebar from '@/components/layout/sidebar';
import { ArrowLeft, Star, Upload, Send, CheckCircle2, BadgeCheck } from 'lucide-react';

export default function NewReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { jobs, quotes, addReview } = useData();
  const jobId = params.jobId as string;
  const job = jobs.find(j => j.id === jobId);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [hasInvoice, setHasInvoice] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!job || !user) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 text-center">
          <p className="text-muted-foreground">Job not found.</p>
        </div>
      </div>
    );
  }

  const acceptedQuote = quotes.find(q => q.jobId === jobId && q.status === 'accepted');
  const provider = acceptedQuote ? getProviderById(acceptedQuote.providerId) : null;
  const providerUser = provider ? MOCK_USERS.find(u => u.id === provider.userId) : null;

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || rating === 0) return;

    addReview({
      jobId,
      providerId: provider.id,
      seekerId: user.id,
      rating,
      tags: selectedTags,
      comment,
      invoiceUrl: hasInvoice ? 'mock-invoice.pdf' : undefined,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center max-w-md animate-scale-in">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Review Submitted!
            </h1>
            <p className="text-muted-foreground mb-6">
              {hasInvoice
                ? 'Your verified review will help other homeowners make informed decisions.'
                : 'Upload a receipt next time to make it a verified review!'}
            </p>
            <button onClick={() => router.push('/seeker/dashboard')} className="btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-2xl">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Leave a Review
        </h1>
        <p className="text-muted-foreground mb-8">How was your experience with {provider?.businessName || 'the provider'}?</p>

        {/* Provider card */}
        {provider && (
          <div className="mb-6 p-4 rounded-2xl bg-muted flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">
              {provider.businessName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold">{provider.businessName}</span>
                {provider.verificationStatus === 'verified' && <BadgeCheck className="w-4 h-4 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">for &ldquo;{job.title}&rdquo;</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold mb-3">Overall Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber text-amber'
                        : 'text-navy-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-3">What stood out?</label>
            <div className="flex flex-wrap gap-2">
              {REVIEW_TAGS.map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag.id)
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Your Review</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Share your experience to help other homeowners..."
              className="input-field min-h-[120px] resize-y"
              rows={4}
            />
          </div>

          {/* Invoice Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Invoice / Receipt
              <span className="text-xs text-muted-foreground font-normal ml-2">
                (Makes this a Verified Review ✓)
              </span>
            </label>
            <div
              onClick={() => setHasInvoice(!hasInvoice)}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                hasInvoice
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {hasInvoice ? (
                <div className="flex items-center justify-center gap-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Invoice uploaded (demo)</span>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Click to upload invoice/receipt</p>
                  <p className="text-xs text-muted-foreground">Sensitive data will be auto-blurred</p>
                </>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className="btn-primary w-full py-3.5 text-base disabled:opacity-50"
          >
            Submit Review <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
