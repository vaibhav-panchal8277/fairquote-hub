'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Job, Quote, Review, Flag } from '@/lib/types';
import {
  MOCK_JOBS, MOCK_QUOTES, MOCK_REVIEWS, MOCK_FLAGS,
  MOCK_PROVIDERS, MOCK_USERS
} from '@/lib/mock-data';
import { generateId } from '@/lib/utils';
import { calculateFairnessScore } from '@/lib/pricing-engine';

interface DataContextType {
  jobs: Job[];
  quotes: Quote[];
  reviews: Review[];
  flags: Flag[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Job;
  updateJob: (id: string, updates: Partial<Job>) => void;
  addQuote: (quote: Omit<Quote, 'id' | 'createdAt' | 'status' | 'fairnessScore'>) => Quote;
  updateQuote: (id: string, updates: Partial<Quote>) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'moderationStatus' | 'isVerified'>) => Review;
  addFlag: (flag: Omit<Flag, 'id' | 'createdAt' | 'status'>) => Flag;
  updateFlag: (id: string, updates: Partial<Flag>) => void;
  updateProviderVerification: (providerId: string, status: 'verified' | 'denied') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [flags, setFlags] = useState<Flag[]>(MOCK_FLAGS);

  const addJob = useCallback((jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Job => {
    const newJob: Job = {
      ...jobData,
      id: 'j-' + generateId(),
      status: 'posted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  }, []);

  const updateJob = useCallback((id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(j =>
      j.id === id ? { ...j, ...updates, updatedAt: new Date().toISOString() } : j
    ));
  }, []);

  const addQuote = useCallback((quoteData: Omit<Quote, 'id' | 'createdAt' | 'status' | 'fairnessScore'>): Quote => {
    const job = jobs.find(j => j.id === quoteData.jobId);
    const fairnessScore = job
      ? calculateFairnessScore(quoteData.total, job.zip, job.categoryId)
      : 50;

    const newQuote: Quote = {
      ...quoteData,
      id: 'q-' + generateId(),
      fairnessScore,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    setQuotes(prev => [newQuote, ...prev]);

    // Update job status to 'quoted' if it was 'posted'
    if (job && job.status === 'posted') {
      updateJob(job.id, { status: 'quoted' });
    }

    return newQuote;
  }, [jobs, updateJob]);

  const updateQuote = useCallback((id: string, updates: Partial<Quote>) => {
    setQuotes(prev => prev.map(q =>
      q.id === id ? { ...q, ...updates } : q
    ));
  }, []);

  const addReview = useCallback((reviewData: Omit<Review, 'id' | 'createdAt' | 'moderationStatus' | 'isVerified'>): Review => {
    const newReview: Review = {
      ...reviewData,
      id: 'r-' + generateId(),
      isVerified: !!reviewData.invoiceUrl,
      moderationStatus: 'pending',
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
    return newReview;
  }, []);

  const addFlag = useCallback((flagData: Omit<Flag, 'id' | 'createdAt' | 'status'>): Flag => {
    const newFlag: Flag = {
      ...flagData,
      id: 'f-' + generateId(),
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setFlags(prev => [newFlag, ...prev]);
    return newFlag;
  }, []);

  const updateFlag = useCallback((id: string, updates: Partial<Flag>) => {
    setFlags(prev => prev.map(f =>
      f.id === id ? { ...f, ...updates } : f
    ));
  }, []);

  const updateProviderVerification = useCallback((providerId: string, status: 'verified' | 'denied') => {
    // In mock mode, we'd update the MOCK_PROVIDERS array
    // For now, this is a placeholder that would trigger a re-render
    const provider = MOCK_PROVIDERS.find(p => p.id === providerId);
    if (provider) {
      provider.verificationStatus = status;
    }
  }, []);

  return (
    <DataContext.Provider value={{
      jobs,
      quotes,
      reviews,
      flags,
      addJob,
      updateJob,
      addQuote,
      updateQuote,
      addReview,
      addFlag,
      updateFlag,
      updateProviderVerification,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
