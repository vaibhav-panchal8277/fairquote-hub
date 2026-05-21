'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SERVICE_CATEGORIES, SAMPLE_ZIP_CODES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { MOCK_PRICE_INDICES } from '@/lib/mock-data';
import {
  Shield, Search, ArrowRight, CheckCircle2, Star,
  TrendingUp, Users, FileCheck, Sparkles,
  Wrench, Zap, Thermometer, Home, Paintbrush, TreePine,
  Bug, LayoutGrid, Settings, Clock, DollarSign, Award,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, Zap, Thermometer, Home, Paintbrush, TreePine,
  Sparkles, Bug, LayoutGrid, Settings,
};

export default function LandingPage() {
  const router = useRouter();
  const [zip, setZip] = useState('');
  const [category, setCategory] = useState('');
  const [counters, setCounters] = useState({ providers: 0, quotes: 0, savings: 0 });

  // Animated counters
  useEffect(() => {
    const targets = { providers: 850, quotes: 12400, savings: 23 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCounters({
        providers: Math.round(targets.providers * eased),
        quotes: Math.round(targets.quotes * eased),
        savings: Math.round(targets.savings * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip) {
      router.push(`/search?zip=${zip}${category ? `&category=${category}` : ''}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="py-24 md:py-32 lg:py-40 bg-background border-b border-border">
        <div className="container-custom">
          <div className="max-w-[64rem] mx-auto text-center flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Trusted by 10,000+ homeowners</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-fade-in-up">
              Know the <span className="text-primary">Fair Price</span> Before You Call
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-[42rem] mx-auto animate-fade-in-up delay-200">
              Stop guessing. Get verified price ranges for any home service in your area,
              compare transparent quotes, and hire vetted professionals with confidence.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto animate-fade-in-up delay-300"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Enter ZIP Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-base"
                  maxLength={5}
                  required
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 px-4 rounded-md border border-input bg-background text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-base cursor-pointer"
              >
                <option value="">All Services</option>
                {SERVICE_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="h-12 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                Get Price
              </button>
            </form>

            {/* Quick examples */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-in delay-500">
              <span className="text-sm text-muted-foreground">Try:</span>
              {['10001', '90210', '60601'].map(z => (
                <button
                  key={z}
                  onClick={() => setZip(z)}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  ZIP {z}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRUST STATS ==================== */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, value: counters.providers.toLocaleString() + '+', label: 'Verified Providers' },
              { icon: FileCheck, value: counters.quotes.toLocaleString() + '+', label: 'Quotes Compared' },
              { icon: TrendingUp, value: counters.savings + '%', label: 'Avg. Savings' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2 p-6">
                <div className="p-3 bg-primary/10 rounded-full mb-2">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="max-w-[58rem] mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Three simple steps to fair, transparent home service pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                icon: Search,
                title: 'Search Your Area',
                desc: 'Enter your ZIP code and select a service. Instantly see the fair price range based on verified local data.',
              },
              {
                step: '2',
                icon: FileCheck,
                title: 'Compare Quotes',
                desc: 'Request quotes from up to 3 verified providers. Compare side-by-side with fairness scores and red-flag alerts.',
              },
              {
                step: '3',
                icon: CheckCircle2,
                title: 'Hire with Confidence',
                desc: 'Choose the best provider based on price, ratings, and transparency. Leave a verified review to help others.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 rounded-xl bg-card border shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted mb-6">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container-custom">
          <div className="max-w-[58rem] mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Explore Service Categories
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Fair pricing data across 10+ home service categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Wrench;
              const samplePrice = MOCK_PRICE_INDICES.find(
                p => p.zipCode === '10001' && p.categoryId === cat.id
              );
              return (
                <Link
                  key={cat.id}
                  href={`/search?category=${cat.id}&zip=10001`}
                  className="group flex flex-col items-center justify-center p-6 rounded-xl border bg-card hover:bg-accent hover:text-accent-foreground transition-colors text-center shadow-sm"
                >
                  <Icon className="w-8 h-8 mb-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <h3 className="text-sm font-semibold">{cat.name}</h3>
                  {samplePrice && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(samplePrice.minPrice)} – {formatCurrency(samplePrice.maxPrice)}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== TRUST & VALUE PROPS ==================== */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Why Homeowners Trust Us
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We verify every piece of data to ensure you're getting the most accurate pricing possible.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Verified Providers Only',
                    desc: 'Every contractor is license-verified, insured, and background-checked before earning our Verified Pro badge.',
                  },
                  {
                    icon: DollarSign,
                    title: 'Receipt-Verified Pricing',
                    desc: 'Our fair price ranges are calculated from actual invoices — not estimates. You see what people really paid.',
                  },
                  {
                    icon: Star,
                    title: 'Transparent Reviews',
                    desc: 'Only reviews backed by uploaded receipts earn "Verified" status and impact provider scores.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8">
                <div className="text-center mb-8">
                  <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Sample Fair Price</p>
                  <h3 className="text-2xl font-bold">Plumbing — NYC (10001)</h3>
                </div>

                {/* Price gauge */}
                <div className="relative h-4 rounded-full bg-muted overflow-hidden mb-4 border">
                  <div className="absolute inset-y-0 left-0 bg-primary w-1/3" />
                  <div className="absolute inset-y-0 left-1/3 bg-blue-500 w-1/3" />
                  <div className="absolute inset-y-0 left-2/3 bg-destructive w-1/3" />
                  
                  {/* Marker */}
                  <div className="absolute inset-y-0 w-1 bg-foreground" style={{ left: '45%' }} />
                </div>
                
                <div className="flex justify-between text-sm font-medium mb-8">
                  <span className="text-primary">$150</span>
                  <span className="text-foreground">$275 median</span>
                  <span className="text-destructive">$450</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 rounded-lg bg-muted/50 border">
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-xs text-muted-foreground mt-1">Quotes</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50 border">
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-xs text-muted-foreground mt-1">Rating</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50 border">
                    <p className="text-2xl font-bold">25m</p>
                    <p className="text-xs text-muted-foreground mt-1">Response</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Verified community data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container-custom">
          <div className="max-w-[58rem] mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What People Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah J.',
                role: 'Homeowner, NYC',
                quote: 'FairQuote saved me from overpaying $400 on a plumbing job. The side-by-side comparison made the choice obvious.',
              },
              {
                name: 'Joe P.',
                role: 'Ace Plumbing, Verified Pro',
                quote: 'As a contractor, I love the structured quote system. No more spam calls — just real job requests from serious customers.',
              },
              {
                name: 'Emily D.',
                role: 'Homeowner, Beverly Hills',
                quote: 'The fairness score immediately flagged a suspiciously low quote. Turned out they weren\'t even licensed. Crisis averted!',
              },
            ].map((testimonial, i) => (
              <div key={i} className="flex flex-col justify-between p-6 rounded-xl border bg-card shadow-sm">
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold border">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="rounded-2xl bg-primary px-6 py-16 sm:p-16 text-center shadow-lg">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Get Your Fair Price?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              Join thousands of homeowners who stopped guessing and started saving.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/search"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-md bg-background text-foreground font-medium hover:bg-muted transition-colors shadow-sm"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Fair Prices
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-md border border-primary-foreground/20 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Join as Provider
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
