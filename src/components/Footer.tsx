import React from 'react';
import { NavTab } from '../types';
import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  openApplyModal: () => void;
  openAiCounselor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openApplyModal,
  openAiCounselor
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-950 flex items-center justify-center rounded-sm text-amber-400 font-serif font-bold text-2xl border border-slate-800 shadow-sm">
                A
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight text-white uppercase">
                  Apex University <span className="text-amber-500">Engineering</span>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Established 1958</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Apex Engineering University (AEU) is an international leader in applied engineering, artificial intelligence research, quantum micro-electronics, and aerospace innovation.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-300 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>ABET Accredited</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>R1 Top Research Tier</span>
              </div>
            </div>
          </div>

          {/* Col 2: Engineering Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Engineering Divisions
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => { setActiveTab('divisions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors">
                  CS & Artificial Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('divisions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors">
                  Electrical & Quantum Eng
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('divisions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors">
                  Mechanical & Mechatronics
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('divisions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors">
                  Civil & Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('divisions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors">
                  Aerospace & Avionics
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('divisions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-amber-400 transition-colors">
                  Bio-Medical Engineering
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Admissions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Admissions & Research
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => { setActiveTab('research'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition-colors">
                  12 Research Labs & Cleanroom
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('admissions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition-colors">
                  Merit Scholarships & Tuition
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('admissions'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition-colors">
                  Fall 2026 Admissions Schedule
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('portal'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition-colors">
                  Student & Admin Portal
                </button>
              </li>
              <li>
                <button onClick={openAiCounselor} className="text-amber-400 font-bold hover:underline flex items-center gap-1 pt-1">
                  <span>Ask AI Academic Counselor</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={openApplyModal} className="text-white font-bold uppercase tracking-wider hover:text-amber-400 flex items-center gap-1 pt-1">
                  <span>Online Application Portal</span>
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Admissions Office
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>100 Innovation Parkway, University City, NY 10027</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+1 (800) 555-APEX / (212) 555-0199</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>admissions@apex.edu</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                <span>https://apex.edu/admissions</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-wider text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Apex Engineering University. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Terms of Admission</a>
            <a href="#accreditation" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">ABET Accreditation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
