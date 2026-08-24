import React from 'react';
import { User } from '../types';
import { StudentPortalView } from '../components/StudentPortalView';
import { AdminPortalView } from '../components/AdminPortalView';
import {
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Lock,
  CheckCircle2,
  Users,
  Layers,
  FileText
} from 'lucide-react';

interface PortalPageProps {
  currentUser: User | null;
  openAuthModal: (mode?: 'student-login' | 'student-signup' | 'admin-login') => void;
  openApplyModal: (divisionId?: string) => void;
  openAiCounselor: () => void;
  onLogout: () => void;
}

export const PortalPage: React.FC<PortalPageProps> = ({
  currentUser,
  openAuthModal,
  openApplyModal,
  openAiCounselor,
  onLogout
}) => {
  // If Logged in as Admin
  if (currentUser && currentUser.role === 'admin') {
    return <AdminPortalView user={currentUser} onLogout={onLogout} />;
  }

  // If Logged in as Student
  if (currentUser && currentUser.role === 'student') {
    return (
      <StudentPortalView
        user={currentUser}
        openApplyModal={openApplyModal}
        openAiCounselor={openAiCounselor}
        onLogout={onLogout}
      />
    );
  }

  // Unauthenticated Portal Gateway Landing
  return (
    <div className="bg-slate-50 min-h-screen space-y-12 pb-16">
      
      {/* Top Banner Header */}
      <section className="bg-slate-900 border-b border-slate-800 pt-14 pb-14 text-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Apex University IAM & Portal Central
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Student & Admissions Admin Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light border-l-2 border-amber-600 pl-4">
            Secure unified authentication gateway for prospective applicants, enrolled engineers, and the Admissions Board Directorate.
          </p>
        </div>
      </section>

      {/* Main Portal Selector Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* STUDENT PORTAL CARD */}
          <div className="bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-1">
                  Applicant & Student Services
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Student Portal Access
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Log into your personalized applicant workspace to monitor departmental evaluations, compute guaranteed merit waivers, view official Dean letters, and upload high school credentials.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Real-time tracking of admission decision status</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Official Dean’s Acceptance letter with University Seal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Single sign-on support for any student registration</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => openAuthModal('student-login')}
                  className="py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider text-center transition-colors shadow-xs"
                >
                  Student Sign In
                </button>
                <button
                  onClick={() => openAuthModal('student-signup')}
                  className="py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider text-center transition-colors shadow-xs"
                >
                  Create Student Account
                </button>
              </div>

              {/* Quick Demo Pill */}
              <button
                onClick={() => openAuthModal('student-login')}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>1-Click Student Demo Profile (Zayn Ahmed)</span>
              </button>
            </div>
          </div>

          {/* ADMIN PORTAL CARD */}
          <div className="bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                  Admissions Directorate & Faculty
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900">
                  Admissions Admin Registry
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Centralized evaluation command center. Review all student submissions in real time, evaluate transcripts and SAT percentiles, approve merit scholarship grants, and dispatch official decisions.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time synchronization with new candidate submissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Adjustable merit waiver percentages & Dean’s remarks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CSV export, filtering by 6 divisions & GPA distributions</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => openAuthModal('admin-login')}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider text-center transition-colors shadow-xs"
              >
                Admissions Officer Login
              </button>

              {/* Quick Demo Pill */}
              <button
                onClick={() => openAuthModal('admin-login')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-slate-700" />
                <span>1-Click Dean Demo (Dr. Eleanor Vance)</span>
              </button>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
