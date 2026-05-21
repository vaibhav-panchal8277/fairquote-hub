'use client';

import React, { useState } from 'react';
import { MOCK_PROVIDERS, MOCK_USERS } from '@/lib/mock-data';
import { useData } from '@/context/data-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { formatDate, capitalizeFirst, getStatusColor } from '@/lib/utils';
import Sidebar from '@/components/layout/sidebar';
import {
  ShieldCheck, CheckCircle2, XCircle, Clock,
  BadgeCheck, FileCheck, Shield, Star, ExternalLink
} from 'lucide-react';

export default function VerificationPage() {
  const { updateProviderVerification } = useData();
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'denied'>('all');

  const filtered = providers.filter(p =>
    filter === 'all' ? true : p.verificationStatus === filter
  );

  const handleAction = (providerId: string, action: 'verified' | 'denied') => {
    updateProviderVerification(providerId, action);
    setProviders(prev => prev.map(p =>
      p.id === providerId ? { ...p, verificationStatus: action } : p
    ));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-5xl">
        <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <ShieldCheck className="w-6 h-6 inline mr-2 text-primary" />
          Provider Verification
        </h1>
        <p className="text-muted-foreground mb-6">Review and approve provider applications</p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'verified', 'denied'] as const).map(tab => {
            const count = tab === 'all' ? providers.length : providers.filter(p => p.verificationStatus === tab).length;
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

        {/* Provider cards */}
        <div className="space-y-4">
          {filtered.map(provider => {
            const user = MOCK_USERS.find(u => u.id === provider.userId);
            return (
              <div key={provider.id} className="p-5 rounded-2xl bg-card border border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {provider.businessName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{provider.businessName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(provider.verificationStatus)}`}>
                          {capitalizeFirst(provider.verificationStatus)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{user?.name} · {user?.email}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">License:</span>
                          <span className="font-medium">{provider.licenseNumber || 'None'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">Insured:</span>
                          <span className={`font-medium ${provider.insured ? 'text-primary' : 'text-rose'}`}>
                            {provider.insured ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">Rating:</span>
                          <span className="font-medium">{provider.avgRating > 0 ? provider.avgRating.toFixed(1) : 'New'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">Joined:</span>
                          <span className="font-medium">{formatDate(provider.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {provider.serviceCategories.map(catId => {
                          const cat = SERVICE_CATEGORIES.find(c => c.id === catId);
                          return cat ? (
                            <span key={catId} className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                              {cat.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>

                  {provider.verificationStatus === 'pending' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleAction(provider.id, 'verified')}
                        className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => handleAction(provider.id, 'denied')}
                        className="px-4 py-2 rounded-xl bg-muted text-rose text-sm font-medium hover:bg-rose-light transition-all flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" /> Deny
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
