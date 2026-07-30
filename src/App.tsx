import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ApplyModal } from './components/ApplyModal';
import { StudentApplicationsModal } from './components/StudentApplicationsModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { CounselorWidget } from './components/CounselorWidget';
import { Role } from './types';
import {
  Cpu,
  Bot as RobotIcon,
  Dna,
  Rocket,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  Microscope,
  FileCheck,
} from 'lucide-react';

function MainContent() {
  const { isAuthenticated, user } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [authModalRole, setAuthModalRole] = useState<Role>('student');

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [studentAppsModalOpen, setStudentAppsModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin', role: Role = 'student') => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const handleHeroApply = () => {
    if (!isAuthenticated) {
      handleOpenAuth('signup', 'student');
    } else if (user?.role === 'admin') {
      setAdminDashboardOpen(true);
    } else {
      setApplyModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={(mode) => handleOpenAuth(mode, 'student')}
        onOpenStudentApps={() => setStudentAppsModalOpen(true)}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
        onOpenApplyModal={() => setApplyModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white overflow-hidden py-20 lg:py-28 border-b border-indigo-900/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fall 2026 Admissions Now Open</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Engineering the Next Epoch of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">Human Technology</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-2xl">
              Apex Engineering University fosters high-impact research across quantum AI systems, autonomous robotics, hypersonic propulsion, and neural interfaces.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleHeroApply}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>{isAuthenticated ? (user?.role === 'admin' ? 'Open Admin Dashboard' : 'Submit Application') : 'Start Student Application'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => handleOpenAuth('signin', 'admin')}
                  className="px-6 py-3.5 bg-indigo-900/60 hover:bg-indigo-800 text-amber-300 font-bold rounded-2xl text-xs sm:text-sm border border-amber-400/30 transition-all flex items-center space-x-2"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Faculty & Admin Portal</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-indigo-900/60 grid grid-cols-3 gap-6">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 block">#1</span>
                <span className="text-xs text-slate-400">Quantum Systems Ranking</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">99.4%</span>
                <span className="text-xs text-slate-400">Placement in R&D Labs</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 block">$120M+</span>
                <span className="text-xs text-slate-400">Annual Research Grants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Divisions */}
      <section id="programs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-900 block mb-2">
              Academic Specializations
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              World-Leading Engineering Divisions
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Our interdisciplinary graduate and undergraduate degree paths combine hands-on lab access with pioneering theoretical physics and computer science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="p-3 bg-indigo-50 text-indigo-950 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                Artificial Intelligence & Quantum Computing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Pioneering fault-tolerant quantum algorithms, neural architecture search, and large-scale AI alignment.
              </p>
              <span className="text-[11px] font-bold text-indigo-900 flex items-center space-x-1">
                <span>Degrees: M.S., Ph.D.</span>
              </span>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="p-3 bg-amber-50 text-amber-800 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <RobotIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                Robotics & Autonomous Systems
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Designing multi-agent autonomous swarms, humanoid biomechanics, and real-time computer vision.
              </p>
              <span className="text-[11px] font-bold text-amber-800 flex items-center space-x-1">
                <span>Degrees: B.S., M.S.</span>
              </span>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Dna className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                Bioengineering & Neural Technology
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Developing brain-computer interfaces, synthetic genomics, and precision cellular medicine devices.
              </p>
              <span className="text-[11px] font-bold text-emerald-800 flex items-center space-x-1">
                <span>Degrees: B.S., M.S., Ph.D.</span>
              </span>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="p-3 bg-sky-50 text-sky-800 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                Aerospace & Space Propulsion
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Building next-generation plasma thrusters, orbital robotics, and lightweight composite structures.
              </p>
              <span className="text-[11px] font-bold text-sky-800 flex items-center space-x-1">
                <span>Degrees: B.S., M.S.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Facilities */}
      <section id="research" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-2">
                State-of-the-Art Infrastructure
              </span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
                Research Labs & Supercomputing Hubs
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Apex Engineering University houses 14 dedicated cleanrooms, a 10,000-core supercomputer cluster, and a sub-kelvin cryogenic quantum laboratory accessible directly to enrolled research students.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Microscope className="w-5 h-5 text-indigo-900 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Vance Cryogenic Quantum Facility</h4>
                    <p className="text-[11px] text-slate-500">Houses 100+ qubit dilution refrigerators for quantum circuit synthesis.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Building2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Apex Autonomous Flight Arena</h4>
                    <p className="text-[11px] text-slate-500">Enclosed 60ft test hangar equipped with sub-millimeter optical tracking.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Counselor Widget Container */}
            <div>
              <CounselorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Criteria & Deadlines */}
      <section id="admissions" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-900 block mb-2">
              Application Timeline
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              Admissions Criteria & Key Dates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-950 text-amber-300 font-serif font-bold rounded-xl flex items-center justify-center mx-auto mb-4 text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Priority Fall Deadline</h3>
              <span className="text-xs font-bold text-amber-600 block mb-2">April 15, 2026</span>
              <p className="text-xs text-slate-500">Full consideration for graduate fellowship grants and research assistantships.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-950 text-amber-300 font-serif font-bold rounded-xl flex items-center justify-center mx-auto mb-4 text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Rolling Admissions</h3>
              <span className="text-xs font-bold text-indigo-900 block mb-2">June 30, 2026</span>
              <p className="text-xs text-slate-500">Final deadline for general student applications based on program capacity.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-950 text-amber-300 font-serif font-bold rounded-xl flex items-center justify-center mx-auto mb-4 text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Decision Notification</h3>
              <span className="text-xs font-bold text-emerald-600 block mb-2">Within 14 Days</span>
              <p className="text-xs text-slate-500">Applicants receive formal portal status updates directly on their dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-indigo-950 text-slate-400 text-xs py-10 border-t border-indigo-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="font-serif font-bold text-white">Apex Engineering University</span>
            <span>© 2026 Admissions Office</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#programs" className="hover:text-amber-300">Divisions</a>
            <a href="#counselor" className="hover:text-amber-300">AI Desk</a>
            <button onClick={() => handleOpenAuth('signin', 'admin')} className="hover:text-amber-300 font-bold">
              Admin Portal
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        initialRole={authModalRole}
      />

      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onSuccess={() => setStudentAppsModalOpen(true)}
      />

      <StudentApplicationsModal
        isOpen={studentAppsModalOpen}
        onClose={() => setStudentAppsModalOpen(false)}
        onOpenApplyModal={() => setApplyModalOpen(true)}
      />

      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
