import React from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, ShieldCheck, FileText, LogOut, User as UserIcon, LogIn } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  onOpenStudentApps: () => void;
  onOpenAdminDashboard: () => void;
  onOpenApplyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenStudentApps,
  onOpenAdminDashboard,
  onOpenApplyModal,
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-indigo-950/95 backdrop-blur-md text-white border-b border-indigo-900/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-md text-slate-950">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-serif font-extrabold tracking-tight text-white block leading-none">
                APEX
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block mt-1">
                Engineering University
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-300">
            <a href="#programs" className="hover:text-amber-300 transition-colors">Engineering Divisions</a>
            <a href="#research" className="hover:text-amber-300 transition-colors">Quantum Labs</a>
            <a href="#admissions" className="hover:text-amber-300 transition-colors">Admissions FAQ</a>
            <a href="#counselor" className="hover:text-amber-300 transition-colors">AI Counselor</a>
          </nav>

          {/* User & Auth Action Controls */}
          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="px-4 py-2 text-xs font-semibold text-white hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  Apply / Register
                </button>
              </div>
            ) : user?.role === 'student' ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onOpenApplyModal}
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                >
                  <span>Submit Application</span>
                </button>

                <button
                  onClick={onOpenStudentApps}
                  className="flex items-center space-x-2 px-3.5 py-2 bg-indigo-900/80 hover:bg-indigo-800 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-semibold transition-all"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>My Application Status</span>
                </button>

                <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-300 border-l border-indigo-900 pl-3">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-white">{user.full_name}</span>
                </div>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Admin Role authenticated
              <div className="flex items-center space-x-3">
                <button
                  onClick={onOpenAdminDashboard}
                  className="flex items-center space-x-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </button>

                <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-300 border-l border-indigo-900 pl-3">
                  <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded text-[10px] font-bold uppercase tracking-wider">
                    ADMIN
                  </span>
                  <span className="font-semibold text-white">{user?.full_name}</span>
                </div>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
