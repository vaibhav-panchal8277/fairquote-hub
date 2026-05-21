'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import { getProviderByUserId, getReviewsByProvider, MOCK_USERS } from '@/lib/mock-data';
import Sidebar from '@/components/layout/sidebar';
import {
  BadgeCheck, Star, MapPin, Clock, Shield, Phone, Mail,
  Globe, Edit3, Camera
} from 'lucide-react';

export default function ProviderProfile() {
  const { user } = useAuth();
  if (!user) return null;

  const provider = getProviderByUserId(user.id);
  if (!provider) return null;

  const reviews = getReviewsByProvider(provider.id);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Public Profile
          </h1>
          <button className="btn-secondary text-sm">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden mb-8">
          {/* Cover */}
          <div className="h-32 gradient-hero relative">
            <button className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 -mt-10">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold border-4 border-card shadow-lg">
                {provider.businessName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{provider.businessName}</h2>
                  {provider.verificationStatus === 'verified' && (
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>

            {/* Stats row */}
            <div className="flex items-center gap-6 flex-wrap text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber text-amber" />
                <span className="font-bold">{provider.avgRating.toFixed(1)}</span>
                <span className="text-muted-foreground">({provider.totalReviews} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {provider.responseTimeMin}min avg response
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {provider.serviceRadiusKm}km radius
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contact & Business Info */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4">Business Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{user.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">License: {provider.licenseNumber || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Insured: {provider.insured ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>
          </div>

          {/* Service Categories */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-4">Service Categories</h3>
            <div className="flex flex-wrap gap-2">
              {provider.serviceCategories.map(catId => {
                const cat = SERVICE_CATEGORIES.find(c => c.id === catId);
                return cat ? (
                  <span
                    key={catId}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    {cat.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Recent Reviews ({reviews.length})
          </h3>
          <div className="space-y-3">
            {reviews.slice(0, 5).map(review => {
              const reviewer = MOCK_USERS.find(u => u.id === review.seekerId);
              return (
                <div key={review.id} className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                        {reviewer?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{reviewer?.name}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber text-amber' : 'text-navy-200'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    {review.isVerified && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary-light text-primary-dark font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                  {review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {review.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                          {tag.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
