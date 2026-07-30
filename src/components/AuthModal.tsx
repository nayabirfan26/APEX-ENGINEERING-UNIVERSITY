import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { X, GraduationCap, ShieldCheck, User, Mail, Lock, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  initialRole?: Role;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  initialRole = 'student',
}) => {
  const { login, signup } = useAuth();
  
  const [portalRole, setPortalRole] = useState<Role>(initialRole);
  const [isSignUp, setIsSignUp] = useState<boolean>(initialMode === 'signup');
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          throw new Error('Please enter your full legal name.');
        }
        await signup(fullName, email, password, portalRole);
      } else {
        await login(email, password, portalRole);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = (role: Role) => {
    setPortalRole(role);
    setIsSignUp(false);
    setError(null);
    if (role === 'admin') {
      setEmail('admin@apex.edu');
      setPassword('admin123');
    } else {
      setEmail('elena@apex.edu');
      setPassword('student123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-400/30">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Apex Engineering University
              </span>
              <h2 className="text-xl font-serif font-bold text-white">
                {isSignUp ? 'Create Portal Account' : 'Portal Sign In'}
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Access admissions status, academic records, and institutional management.
          </p>
        </div>

        <div className="p-6">
          {/* 1. Portal Role Switcher: Student Portal vs Admin Portal */}
          <div className="mb-5 bg-slate-100 p-1 rounded-xl flex">
            <button
              type="button"
              onClick={() => {
                setPortalRole('student');
                setError(null);
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                portalRole === 'student'
                  ? 'bg-white text-indigo-950 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPortalRole('admin');
                setError(null);
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                portalRole === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* 2. Sign In vs Create Account Toggle */}
          <div className="flex border-b border-slate-200 mb-5">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError(null);
              }}
              className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 mr-6 ${
                !isSignUp
                  ? 'border-indigo-900 text-indigo-950'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError(null);
              }}
              className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                isSignUp
                  ? 'border-indigo-900 text-indigo-950'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Eleanor Vance"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                University Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={portalRole === 'admin' ? 'admin@apex.edu' : 'student@apex.edu'}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 bg-indigo-950 hover:bg-slate-900 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>
                    {isSignUp ? 'Create Account' : `Sign In to ${portalRole === 'admin' ? 'Admin' : 'Student'} Portal`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] font-medium text-slate-400 block mb-2">
              ⚡ Quick Evaluation Demo Login Shortcuts:
            </span>
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={() => handleDemoFill('student')}
                className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 text-indigo-900 rounded-md border border-slate-200 transition-colors"
              >
                Fill Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="px-2.5 py-1 text-[11px] font-medium bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-md border border-amber-200 transition-colors"
              >
                Fill Admin Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
