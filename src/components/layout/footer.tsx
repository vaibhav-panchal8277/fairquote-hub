import React from 'react';
import Link from 'next/link';
import { Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t border-border mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-foreground font-bold tracking-tight">
                FairQuote Hub
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Transparent pricing for home services. Know the fair price before you call.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="GitHub">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Twitter">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="LinkedIn">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* For Homeowners */}
          <div>
            <h4 className="text-foreground font-semibold text-sm mb-4">For Homeowners</h4>
            <ul className="space-y-2.5">
              <li><Link href="/search" className="text-sm hover:text-foreground transition-colors">Search Fair Prices</Link></li>
              <li><Link href="/register" className="text-sm hover:text-foreground transition-colors">Create Account</Link></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">Trust & Safety</a></li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h4 className="text-foreground font-semibold text-sm mb-4">For Contractors</h4>
            <ul className="space-y-2.5">
              <li><Link href="/register" className="text-sm hover:text-foreground transition-colors">Join as Provider</Link></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">Verification Process</a></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">Provider Dashboard</a></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">Pricing Guide</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-foreground font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} FairQuote Hub. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            Prices are community-aggregated, not guaranteed
          </p>
        </div>
      </div>
    </footer>
  );
}
