import React, { useState } from 'react';
import { User, UserRole } from '../types';
import {
  authenticateUser,
  registerUser,
  DEMO_STUDENT,
  DEMO_ADMIN,
  setCurrentUser
} from '../services/storageService';
import { UNIVERSITY_DIVISIONS } from '../data/universityData';
import {
  X,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'student-login' | 'student-signup' | 'admin-login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'student-login'
}) => {
  const [mode, setMode] = useState<'student-login' | 'student-signup' | 'admin-login'>(initialMode);
  
  // Login Form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register Form fields
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerDepartment, setRegisterDepartment] = useState(UNIVERSITY_DIVISIONS[0].name);

  // Status & errors
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickDemoStudent = () => {
    setCurrentUser(DEMO_STUDENT);
    onLoginSuccess(DEMO_STUDENT);
    onClose();
  };

  const handleQuickDemoAdmin = () => {
    setCurrentUser(DEMO_ADMIN);
    onLoginSuccess(DEMO_ADMIN);
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const requiredRole: UserRole = mode === 'admin-login' ? 'admin' : 'student';
    const result = authenticateUser(loginEmail, loginPassword, requiredRole);

    if (result.success && result.user) {
      setSuccessMsg(`Welcome back, ${result.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(result.user!);
        onClose();
      }, 500);
    } else {
      setErrorMsg(result.error || 'Invalid credentials.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!registerName || !registerEmail) {
      setErrorMsg('Please enter your full legal name and email.');
      return;
    }

    const result = registerUser({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword || 'password123',
      department: registerDepartment,
      role: 'student'
    });

    if (result.success && result.user) {
      setSuccessMsg(`Student account created successfully! Welcome to Apex, ${result.user.name}.`);
      setTimeout(() => {
        onLoginSuccess(result.user!);
        onClose();
      }, 700);
    } else {
      setErrorMsg(result.error || 'Failed to create student account.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-300 w-full max-w-xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center rounded-sm text-amber-400 font-serif font-bold text-xl">
              A
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                Single Sign-On • Identity Service
              </div>
              <h3 className="font-serif font-bold text-xl text-white">
                Apex University Portal
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-CLICK DEMO ACCESS ACCORDION */}
        <div className="bg-slate-100 p-4 border-b border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              1-Click Demo Evaluation Profiles
            </span>
            <span className="text-[10px] text-slate-500 font-normal">Pre-configured accounts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleQuickDemoStudent}
              className="p-2.5 bg-white hover:bg-amber-50 border border-slate-300 hover:border-amber-400 text-left transition-all group flex items-center justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">Student Demo</span>
                </div>
                <div className="text-[11px] text-slate-500">Zayn Ahmed • CS & AI Major</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="p-2.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-800 text-left transition-all group flex items-center justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-slate-800" />
                  <span className="text-xs font-bold text-slate-900">Admin Demo</span>
                </div>
                <div className="text-[11px] text-slate-500">Dr. Eleanor Vance • Dean of Admissions</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              setMode('student-login');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              mode === 'student-login'
                ? 'border-amber-600 text-slate-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('student-signup');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              mode === 'student-signup'
                ? 'border-amber-600 text-slate-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            New Student Register
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('admin-login');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              mode === 'admin-login'
                ? 'border-slate-900 text-slate-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Admissions Admin
          </button>
        </div>

        {/* Notification Alerts */}
        {errorMsg && (
          <div className="m-5 mb-0 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="m-5 mb-0 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Modal Form Bodies */}
        <div className="p-6">
          
          {/* STUDENT LOGIN & ADMIN LOGIN FORM */}
          {(mode === 'student-login' || mode === 'admin-login') && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {mode === 'admin-login' ? 'Faculty / Staff Email Address *' : 'Student Institutional Email *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={mode === 'admin-login' ? 'admin@apex.edu' : 'student@apex.edu or your email'}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Demo pw: <span className="font-mono text-slate-700">{mode === 'admin-login' ? 'admin123' : 'student123'}</span>
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your security password"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors shadow-sm flex items-center justify-center gap-2 ${
                    mode === 'admin-login'
                      ? 'bg-slate-900 hover:bg-slate-800'
                      : 'bg-amber-600 hover:bg-amber-500'
                  }`}
                >
                  <span>{mode === 'admin-login' ? 'Authenticate Dean / Staff' : 'Access Student Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-500">
                {mode === 'student-login' ? (
                  <span>
                    New STEM applicant?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('student-signup')}
                      className="font-bold text-amber-700 hover:underline"
                    >
                      Create Student Profile
                    </button>
                  </span>
                ) : (
                  <span>
                    Student portal login?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('student-login')}
                      className="font-bold text-slate-800 hover:underline"
                    >
                      Switch to Student Login
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}

          {/* NEW STUDENT SIGN UP FORM */}
          {mode === 'student-signup' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="e.g. Nayab Irfan"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Applicant Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="nayab@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Intended Engineering Division *
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={registerDepartment}
                    onChange={(e) => setRegisterDepartment(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  >
                    {UNIVERSITY_DIVISIONS.map((div) => (
                      <option key={div.id} value={div.name}>
                        {div.name} ({div.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Register & Open Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-1 text-xs text-slate-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('student-login')}
                  className="font-bold text-amber-700 hover:underline"
                >
                  Sign In to existing account
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer info banner */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Apex Engineering University Identity & Access Management (IAM) • Encrypted TLS 1.3
        </div>

      </div>
    </div>
  );
};
