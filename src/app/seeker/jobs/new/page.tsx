'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { SERVICE_CATEGORIES, URGENCY_LEVELS } from '@/lib/constants';
import Sidebar from '@/components/layout/sidebar';
import {
  ArrowLeft, Send, Upload, Clock, AlertTriangle,
  Wrench, Zap, Thermometer, Home, Paintbrush, TreePine,
  Sparkles, Bug, LayoutGrid, Settings, ImageIcon
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Zap, Thermometer, Home, Paintbrush, TreePine,
  Sparkles, Bug, LayoutGrid, Settings,
};

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addJob } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'emergency'>('medium');
  const [timeline, setTimeline] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !categoryId || !title) return;
    setSubmitting(true);

    const job = addJob({
      seekerId: user.id,
      categoryId,
      title,
      description,
      urgency,
      zip: user.zip,
      preferredTimeline: timeline,
    });

    setTimeout(() => {
      router.push(`/seeker/jobs/${job.id}`);
    }, 500);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-3xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          New Job Request
        </h1>
        <p className="text-muted-foreground mb-8">
          Describe your project and we&apos;ll match you with up to 3 verified providers
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Category */}
          <div>
            <label className="block text-sm font-semibold mb-3">Service Category *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {SERVICE_CATEGORIES.map(cat => {
                const Icon = iconMap[cat.icon] || Wrench;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryId(cat.id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      categoryId === cat.id
                        ? 'border-2 border-primary bg-primary/5 shadow-sm'
                        : 'border-2 border-border hover:border-primary/30'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg mx-auto mb-1.5 flex items-center justify-center"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-medium">{cat.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Job Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Kitchen faucet replacement"
              className="input-field"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Description *</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the work needed. Include details like brand, model, size, current condition, etc."
              className="input-field min-h-[120px] resize-y"
              rows={5}
              required
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-semibold mb-3">Urgency Level</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {URGENCY_LEVELS.map(level => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setUrgency(level.value as typeof urgency)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    urgency === level.value
                      ? level.value === 'emergency'
                        ? 'border-2 border-rose bg-rose/5'
                        : 'border-2 border-primary bg-primary/5'
                      : 'border-2 border-border hover:border-primary/30'
                  }`}
                >
                  <p className="text-sm font-semibold">{level.label}</p>
                  <p className="text-xs text-muted-foreground">{level.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Preferred Timeline</label>
            <input
              type="text"
              value={timeline}
              onChange={e => setTimeline(e.target.value)}
              placeholder="e.g., Within the next 2 weeks"
              className="input-field"
            />
          </div>

          {/* Photo Upload Placeholder */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">Photos <span className="text-muted-foreground font-normal">(optional)</span></label>
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
              <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium mb-1">Drag & drop photos here</p>
              <p className="text-xs text-muted-foreground">or click to browse (max 5 photos, 5MB each)</p>
            </div>
          </div>

          {/* ZIP Code (auto-filled) */}
          <div className="p-4 rounded-xl bg-muted flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Service Location</p>
              <p className="text-xs text-muted-foreground">ZIP Code: {user?.zip || '—'}</p>
            </div>
            <span className="text-xs text-primary font-medium">Auto-filled from profile</span>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary flex-1 py-3.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!categoryId || !title || !description || submitting}
              className="btn-primary flex-1 py-3.5 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
              {!submitting && <Send className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
