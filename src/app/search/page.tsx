'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SERVICE_CATEGORIES, SAMPLE_ZIP_CODES } from '@/lib/constants';
import { searchPrices } from '@/lib/pricing-engine';
import { MOCK_PROVIDERS, MOCK_USERS } from '@/lib/mock-data';
import { formatCurrency, getInitials } from '@/lib/utils';
import { PriceRangeResult, Provider } from '@/lib/types';
import {
  Search, MapPin, Filter, Star, Clock, ShieldCheck,
  AlertTriangle, BadgeCheck, ChevronDown, TrendingUp,
  ArrowRight, Info, Wrench, Zap, Thermometer, Home,
  Paintbrush, TreePine, Sparkles, Bug, LayoutGrid, Settings,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Zap, Thermometer, Home, Paintbrush, TreePine,
  Sparkles, Bug, LayoutGrid, Settings,
};

function SearchContent() {
  const searchParams = useSearchParams();
  const initialZip = searchParams.get('zip') || '';
  const initialCategory = searchParams.get('category') || '';

  const [zip, setZip] = useState(initialZip);
  const [category, setCategory] = useState(initialCategory);
  const [searchedZip, setSearchedZip] = useState(initialZip);
  const [searchedCategory, setSearchedCategory] = useState(initialCategory);
  const [filters, setFilters] = useState({
    verifiedOnly: false,
    minRating: 0,
    maxResponseTime: 0,
    insuredOnly: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const priceResults = useMemo(() => {
    if (!searchedZip) return [];
    return searchPrices(searchedZip, searchedCategory || undefined);
  }, [searchedZip, searchedCategory]);

  const matchingProviders = useMemo(() => {
    let providers = MOCK_PROVIDERS;
    if (searchedCategory) {
      providers = providers.filter(p => p.serviceCategories.includes(searchedCategory));
    }
    if (filters.verifiedOnly) {
      providers = providers.filter(p => p.verificationStatus === 'verified');
    }
    if (filters.minRating > 0) {
      providers = providers.filter(p => p.avgRating >= filters.minRating);
    }
    if (filters.maxResponseTime > 0) {
      providers = providers.filter(p => p.responseTimeMin > 0 && p.responseTimeMin <= filters.maxResponseTime);
    }
    if (filters.insuredOnly) {
      providers = providers.filter(p => p.insured);
    }
    return providers;
  }, [searchedCategory, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedZip(zip);
    setSearchedCategory(category);
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case 'high': return { color: 'bg-primary-light text-primary-dark', label: 'High Confidence' };
      case 'medium': return { color: 'bg-amber-light text-amber', label: 'Medium Confidence' };
      default: return { color: 'bg-muted text-muted-foreground', label: 'Low Confidence' };
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Search Header */}
      <div className="gradient-hero text-white py-10 md:py-14">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Search Fair Prices
          </h1>
          <p className="text-white/60 mb-6">Enter your ZIP code to see verified price ranges</p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-3xl">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40" />
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="ZIP Code (e.g., 10001)"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary"
                maxLength={5}
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="" className="bg-background text-foreground">All Services</option>
              {SERVICE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-background text-foreground">{cat.name}</option>
              ))}
            </select>
            <button type="submit" className="px-8 py-3.5 rounded-xl gradient-primary font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all">
              <Search className="w-4.5 h-4.5" /> Search
            </button>
          </form>

          {/* Quick ZIP buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-white/30">Popular:</span>
            {SAMPLE_ZIP_CODES.map(z => (
              <button
                key={z}
                onClick={() => { setZip(z); setSearchedZip(z); setSearchedCategory(category); }}
                className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 transition-all"
              >
                {z}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {!searchedZip ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">Enter a ZIP Code to Start</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search any US ZIP code to see community-verified price ranges for home services in your area.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Price Range Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Fair Price Ranges — ZIP {searchedZip}
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mb-6 p-5 rounded-2xl bg-card border border-border animate-fade-in-down">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.verifiedOnly}
                        onChange={e => setFilters(f => ({ ...f, verifiedOnly: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm">Verified Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.insuredOnly}
                        onChange={e => setFilters(f => ({ ...f, insuredOnly: e.target.checked }))}
                        className="rounded"
                      />
                      <span className="text-sm">Insured Only</span>
                    </label>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Min Rating</label>
                      <select
                        value={filters.minRating}
                        onChange={e => setFilters(f => ({ ...f, minRating: Number(e.target.value) }))}
                        className="input-field py-2 text-sm"
                      >
                        <option value={0}>Any</option>
                        <option value={3}>3+ Stars</option>
                        <option value={4}>4+ Stars</option>
                        <option value={4.5}>4.5+ Stars</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Response Time</label>
                      <select
                        value={filters.maxResponseTime}
                        onChange={e => setFilters(f => ({ ...f, maxResponseTime: Number(e.target.value) }))}
                        className="input-field py-2 text-sm"
                      >
                        <option value={0}>Any</option>
                        <option value={30}>Under 30 min</option>
                        <option value={60}>Under 1 hour</option>
                        <option value={120}>Under 2 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {priceResults.length === 0 ? (
                <div className="p-8 rounded-2xl bg-muted text-center">
                  <p className="text-muted-foreground">No price data found for this ZIP code. Try one of our popular ZIP codes above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {priceResults.map((result, i) => {
                    const cat = SERVICE_CATEGORIES.find(c => c.name === result.categoryName);
                    const Icon = cat ? (iconMap[cat.icon] || Wrench) : Wrench;
                    const badge = getConfidenceBadge(result.confidence);
                    const medianPercent = ((result.median - result.min) / (result.max - result.min)) * 100;

                    return (
                      <div key={i} className="p-6 rounded-2xl bg-card border border-border card-hover">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${cat?.color || '#10B981'}15`, color: cat?.color || '#10B981' }}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-bold">{result.categoryName}</h3>
                              <p className="text-xs text-muted-foreground">ZIP {result.zipCode}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>

                        {/* Price gauge */}
                        <div className="mb-3">
                          <div className="relative h-3 rounded-full bg-gradient-to-r from-primary via-amber to-rose overflow-hidden">
                            <div
                              className="absolute top-0 w-0.5 h-full bg-white shadow-md"
                              style={{ left: `${Math.min(95, Math.max(5, medianPercent))}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-1.5">
                            <span className="text-sm font-semibold text-primary">{formatCurrency(result.min)}</span>
                            <span className="text-xs text-muted-foreground">
                              Median: <span className="font-semibold text-foreground">{formatCurrency(result.median)}</span>
                            </span>
                            <span className="text-sm font-semibold text-rose">{formatCurrency(result.max)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {result.sampleSize} verified quotes
                          </span>
                          {result.seasonalMultiplier !== 1 && (
                            <span className="flex items-center gap-1 text-amber">
                              <AlertTriangle className="w-3 h-3" />
                              Seasonal +{Math.round((result.seasonalMultiplier - 1) * 100)}%
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Matching Providers */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {searchedCategory
                  ? `${SERVICE_CATEGORIES.find(c => c.id === searchedCategory)?.name || ''} Providers`
                  : 'All Providers'}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({matchingProviders.length} found)
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingProviders.map(provider => {
                  const user = MOCK_USERS.find(u => u.id === provider.userId);
                  const isRedFlag = !provider.insured || !provider.licenseNumber || provider.verificationStatus === 'denied';

                  return (
                    <div
                      key={provider.id}
                      className={`p-5 rounded-2xl border card-hover ${
                        isRedFlag
                          ? 'border-rose/30 bg-rose/5'
                          : 'border-border bg-card'
                      }`}
                    >
                      {isRedFlag && (
                        <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg bg-rose/10 text-rose text-xs font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Red Flag: {!provider.licenseNumber ? 'Unlicensed' : !provider.insured ? 'Uninsured' : 'Denied'}
                        </div>
                      )}

                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {getInitials(provider.businessName)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm truncate">{provider.businessName}</h3>
                            {provider.verificationStatus === 'verified' && (
                              <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{user?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber text-amber" />
                          <span className="font-medium">{provider.avgRating > 0 ? provider.avgRating.toFixed(1) : 'New'}</span>
                          <span className="text-muted-foreground">({provider.totalReviews})</span>
                        </span>
                        {provider.responseTimeMin > 0 && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            {provider.responseTimeMin}m
                          </span>
                        )}
                      </div>

                      {provider.description && (
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {provider.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {provider.serviceCategories.map(catId => {
                          const cat = SERVICE_CATEGORIES.find(c => c.id === catId);
                          return cat ? (
                            <span
                              key={catId}
                              className="px-2 py-0.5 rounded-full text-xs font-medium"
                              style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                            >
                              {cat.name}
                            </span>
                          ) : null;
                        })}
                      </div>

                      <div className="flex items-center gap-2">
                        {provider.insured && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-primary-light text-primary-dark font-medium">
                            Insured
                          </span>
                        )}
                        {provider.licenseNumber && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-blue-light text-blue font-medium">
                            Licensed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-start gap-3">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Prices are community-aggregated from verified invoices and are not guaranteed quotes.
                Actual costs may vary based on job complexity, materials, and other factors.
                Always request a detailed quote from the provider.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading prices...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </React.Suspense>
  );
}
