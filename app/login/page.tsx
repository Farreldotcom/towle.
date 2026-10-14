'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAdmin, loginWithEmail, loginWithGoogle, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !isLoading) {
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    }
  }, [user, isAdmin, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithEmail(email.trim(), password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setError('Invalid email or password. Please verify your credentials.');
      } else if (msg.includes('operation-not-allowed')) {
        setError('Email/password sign-in is not yet enabled in Firebase Authentication console. You can also sign in with Google below.');
      } else {
        setError('Unable to sign in. Please check your credentials or try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('popup-closed-by-user')) {
        setError('Google sign-in could not be completed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-5 sm:px-8">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/40 p-8 sm:p-12 shadow-[0_16px_40px_-12px_rgba(29,29,26,0.06)] animate-in fade-in duration-300">
          <div className="text-center mb-8">
            <span className="font-label-caps-sm text-label-caps-sm text-secondary tracking-[0.25em] uppercase block mb-2">
              WELCOME BACK
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary font-normal tracking-tight">
              Sign In to TOWLE.
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 font-light">
              Manage your beach day rentals, locker codes, and saved addresses.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container/40 border border-error/30 text-error text-xs font-body-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-3 bg-surface border border-outline-variant/50 text-sm font-body-md text-primary focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider uppercase">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="font-body-sm text-xs text-secondary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 pr-10 bg-surface border border-outline-variant/50 text-sm font-body-md text-primary focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-primary-container text-surface font-label-caps-lg text-label-caps-lg tracking-widest hover:bg-on-surface-variant transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-label-caps-sm">
              <span className="bg-surface-container-lowest px-3 text-on-surface-variant">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full py-3 border border-outline-variant/50 bg-surface text-primary font-label-caps-lg text-label-caps-lg tracking-wider hover:bg-surface-variant transition-colors flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            GOOGLE ACCOUNT
          </button>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <span className="font-body-sm text-xs text-on-surface-variant">
              Don&apos;t have an account yet?{' '}
            </span>
            <Link
              href="/register"
              className="font-body-sm text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              Create Account <ArrowRight className="w-3 h-3 inline" />
            </Link>
          </div>
        </div>
      </main>

      <Footer onRentClick={() => router.push('/products')} onOpenInfoModal={() => {}} />
    </div>
  );
}
