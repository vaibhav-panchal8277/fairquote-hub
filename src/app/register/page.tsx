'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/lib/types';
import { SERVICE_CATEGORIES } from '@/lib/constants';
import {
  Shield, ArrowRight, ArrowLeft, Home, Wrench, User,
  Mail, Lock, MapPin, Phone, Building2, FileCheck, CheckCircle2
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>('seeker');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', zip: '',
    businessName: '', licenseNumber: '', serviceCategories: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (catId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.includes(catId)
        ? prev.serviceCategories.filter(c => c !== catId)
        : [...prev.serviceCategories, catId],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const success = await register({
      ...formData,
      role,
    });
    if (success) {
      router.push(`/${role}/dashboard`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
              <div
                className="h-full rounded-full gradient-primary transition-all duration-500"
                style={{ width: step >= s ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Step 1: Choose Role */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Join FairQuote Hub
            </h1>
            <p className="text-muted-foreground mb-8">Choose how you want to use the platform</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setRole('seeker')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  role === 'seeker'
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-1">Homeowner</h3>
                <p className="text-sm text-muted-foreground">
                  Search fair prices, request quotes, and find verified contractors
                </p>
              </button>

              <button
                onClick={() => setRole('provider')}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  role === 'provider'
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-blue" />
                </div>
                <h3 className="font-bold mb-1">Service Provider</h3>
                <p className="text-sm text-muted-foreground">
                  Receive job requests, submit quotes, and grow your business
                </p>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full py-3.5 text-base"
            >
              Continue as {role === 'seeker' ? 'Homeowner' : 'Provider'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Your Details
            </h1>
            <p className="text-muted-foreground mb-8">Tell us a bit about yourself</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                  <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="John Doe" className="input-field pl-11" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                  <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="you@example.com" className="input-field pl-11" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                  <input type="password" value={formData.password} onChange={e => updateField('password', e.target.value)} placeholder="Create a password" className="input-field pl-11" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">ZIP Code</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                    <input type="text" value={formData.zip} onChange={e => updateField('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="10001" className="input-field pl-11" maxLength={5} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone <span className="text-muted-foreground">(optional)</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                    <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="555-0100" className="input-field pl-11" />
                  </div>
                </div>
              </div>

              {role === 'provider' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Business Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                      <input type="text" value={formData.businessName} onChange={e => updateField('businessName', e.target.value)} placeholder="Your Business Name" className="input-field pl-11" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">License Number</label>
                    <div className="relative">
                      <FileCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                      <input type="text" value={formData.licenseNumber} onChange={e => updateField('licenseNumber', e.target.value)} placeholder="PLB-2024-12345" className="input-field pl-11" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Service Categories</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICE_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                            formData.serviceCategories.includes(cat.id)
                              ? 'bg-primary/10 border-2 border-primary text-primary'
                              : 'bg-muted border-2 border-transparent text-muted-foreground hover:border-border'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setStep(3)}
              className="btn-primary w-full py-3.5 text-base mt-6"
              disabled={!formData.name || !formData.email || !formData.zip}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="animate-fade-in-up text-center">
            <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Almost There!
            </h1>
            <p className="text-muted-foreground mb-8">Review your details and create your account</p>

            <div className="bg-muted rounded-2xl p-6 text-left mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium capitalize">{role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{formData.name || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{formData.email || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ZIP Code</span>
                <span className="font-medium">{formData.zip || '—'}</span>
              </div>
              {role === 'provider' && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Business</span>
                    <span className="font-medium">{formData.businessName || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Services</span>
                    <span className="font-medium">{formData.serviceCategories.length} selected</span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="mt-4 text-xs text-muted-foreground">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:text-primary-hover">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
