'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      router.push('/seeker/dashboard');
    } else {
      setError('Invalid credentials. Try any email to login as a demo user.');
    }
    setLoading(false);
  };

  const quickLogin = async (email: string) => {
    setLoading(true);
    await login(email, 'demo');
    const user = (await import('@/lib/mock-data')).MOCK_USERS.find(u => u.email === email);
    if (user) {
      router.push(`/${user.role}/dashboard`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left — Illustration side */}
      <div className="hidden lg:flex flex-1 gradient-hero relative items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-white text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome Back
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Access your dashboard, view quotes, and manage your home service projects — all in one place.
          </p>
        </div>
      </div>

      {/* Right — Form side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Sign In
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Quick demo logins */}
          <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <p className="text-xs font-medium text-muted-foreground mb-3">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLogin('sarah.johnson@email.com')}
                className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-medium hover:border-primary hover:text-primary transition-all"
              >
                🏠 Seeker
              </button>
              <button
                onClick={() => quickLogin('joe@aceplumbing.com')}
                className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-medium hover:border-primary hover:text-primary transition-all"
              >
                🔧 Provider
              </button>
              <button
                onClick={() => quickLogin('admin@fairquotehub.com')}
                className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-medium hover:border-primary hover:text-primary transition-all"
              >
                🛡️ Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-light text-rose text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary-hover font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary font-medium hover:text-primary-hover">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
