'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your registered email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email.trim());
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('user-not-found')) {
        setError('No account found with this email address.');
      } else {
        setError('Unable to send reset email. Please verify the address and try again.');
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
              PASSWORD RECOVERY
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary font-normal tracking-tight">
              Reset Password
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 font-light">
              Enter your email and we will send you instructions to reset your account password.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container/40 border border-error/30 text-error text-xs font-body-sm">
              {error}
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-headline-sm text-base text-primary font-medium">
                Reset Link Dispatched
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                If an account exists for <strong className="text-primary">{email}</strong>, a password reset link has been dispatched to your inbox.
              </p>
              <div className="pt-4">
                <Link
                  href="/login"
                  className="w-full py-3 bg-primary-container text-surface font-label-caps-lg text-center tracking-widest block hover:bg-on-surface-variant transition-colors"
                >
                  RETURN TO SIGN IN
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-label-caps-sm text-[11px] text-on-surface-variant tracking-wider uppercase mb-2">
                  Registered Email Address
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-primary-container text-surface font-label-caps-lg text-label-caps-lg tracking-widest hover:bg-on-surface-variant transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'SENDING RESET LINK...' : 'SEND RESET LINK'}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="font-body-sm text-xs text-on-surface-variant hover:text-primary inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer onRentClick={() => router.push('/products')} onOpenInfoModal={() => {}} />
    </div>
  );
}
