import React, { useState } from 'react';
import { NavTab, User } from '../types';
import {
  GraduationCap,
  Layers,
  FlaskConical,
  FileText,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  PhoneCall,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Lock,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  openApplyModal: () => void;
  openAiCounselor: () => void;
  currentUser: User | null;
  openAuthModal: (mode?: 'student-login' | 'student-signup' | 'admin-login') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openApplyModal,
  openAiCounselor,
  currentUser,
  openAuthModal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: GraduationCap },
    { id: 'admissions', label: 'Admissions', icon: FileText },
    { id: 'research', label: 'Research & Labs', icon: FlaskConical },
    { id: 'divisions', label: 'Divisions', icon: Layers },
    {
      id: 'portal',
      label: currentUser ? (currentUser.role === 'admin' ? 'Admin Portal' : 'Student Portal') : 'Portal',
      icon: currentUser?.role === 'admin' ? ShieldCheck : Lock
    }
  ];

  const handleTabClick = (id: NavTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-900 shadow-sm">
      
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-white uppercase tracking-widest text-[11px]">Systems Operational</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Fall 2026 Admissions Active — Merit Scholarships up to 100% Tuition</span>
          </div>

          <div className="flex items-center gap-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer text-amber-400"
              onClick={openAiCounselor}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Academic Counselor
            </span>
            <span className="text-slate-700">|</span>
            
            {/* Quick Demo Access Trigger in Top Bar */}
            {!currentUser ? (
              <span
                onClick={() => openAuthModal('student-login')}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-slate-300"
              >
                <Lock className="w-3.5 h-3.5 text-amber-500" /> Demo Portal Sign-In
              </span>
            ) : (
              <span
                onClick={() => handleTabClick('portal')}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-emerald-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active: {currentUser.name.split(' ')[0]} ({currentUser.role})</span>
              </span>
            )}

            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-slate-400" /> +1 (800) 555-APEX
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div
            id="nav-brand-logo"
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-sm text-amber-400 font-serif font-bold text-2xl shadow-sm group-hover:bg-slate-800 transition-colors">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-tight text-slate-900 uppercase">
                  Apex University <span className="text-amber-600">Engineering</span>
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Established 1958</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-widest text-slate-500">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`py-1 transition-colors flex items-center gap-1.5 relative ${
                    isActive
                      ? 'text-slate-900 border-b-2 border-amber-600'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA & User Profile Controls */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Auth / Profile Area */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold leading-tight">{currentUser.name}</div>
                    <div className="text-[9px] text-amber-700 uppercase tracking-wider font-bold">
                      {currentUser.role === 'admin' ? 'Admissions Admin' : 'Student Account'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-white border border-slate-300 shadow-xl py-1 z-50 text-xs animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Signed in as</p>
                      <p className="font-bold text-slate-900 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => handleTabClick('portal')}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 font-bold flex items-center gap-2"
                    >
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>{currentUser.role === 'admin' ? 'Admissions Registry' : 'My Applications'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openApplyModal();
                      }}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 font-bold flex items-center gap-2"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                      <span>New Application</span>
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => openAuthModal('student-login')}
                className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-slate-900 border border-slate-300 hover:border-slate-400 transition-all bg-slate-50"
                title="Student / Admin Portal Access"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Portal Login</span>
              </button>
            )}

            {/* Apply Now CTA */}
            <button
              id="nav-apply-now-btn"
              onClick={openApplyModal}
              className="bg-slate-900 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openAuthModal('student-login')}
              className="p-2 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold"
              title="Portal"
            >
              <Lock className="w-4 h-4 text-amber-600" />
            </button>
            <button
              onClick={openAiCounselor}
              className="p-2 rounded bg-slate-100 text-amber-600 border border-slate-200"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-slate-900 text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          
          {/* Mobile User Profile Header if logged in */}
          {currentUser && (
            <div className="p-3 bg-slate-100 border border-slate-200 mb-2 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-[10px] font-bold text-amber-700 uppercase">{currentUser.role === 'admin' ? 'Admissions Admin' : 'Student'}</div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-xs text-red-600 font-bold uppercase"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 border-l-4 border-amber-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-amber-600" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            {!currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('student-login');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 border border-slate-300"
              >
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Student / Admin Portal Login</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAiCounselor();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Ask AI Academic Counselor</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openApplyModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 shadow-sm"
            >
              <span>Apply Online Now</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
