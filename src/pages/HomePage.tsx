import React, { useState } from 'react';
import { NavTab, EngineeringDivision } from '../types';
import { UNIVERSITY_DIVISIONS, RESEARCH_LABS, UPCOMING_EVENTS, LATEST_NEWS, TESTIMONIALS } from '../data/universityData';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Award,
  FlaskConical,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Globe,
  Building,
  Layers,
  Search,
  Calculator
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: NavTab) => void;
  openApplyModal: (divisionId?: string) => void;
  openAiCounselor: () => void;
  setSelectedDivisionId: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  openApplyModal,
  openAiCounselor,
  setSelectedDivisionId
}) => {
  const [quickGpa, setQuickGpa] = useState<string>('3.8');

  // Calculate quick scholarship discount preview
  const numGpa = parseFloat(quickGpa) || 0;
  let quickDiscount = '25% Tuition Grant';
  if (numGpa >= 3.8) quickDiscount = '100% Full Merit Scholarship';
  else if (numGpa >= 3.5) quickDiscount = '75% Merit Scholarship';
  else if (numGpa >= 3.2) quickDiscount = '50% Merit Scholarship';

  return (
    <div className="space-y-0 pb-16 bg-slate-50">
      
      {/* HERO SECTION (Professional Polish Signature Hero) */}
      <section className="min-h-[500px] lg:h-[540px] bg-slate-900 flex items-center px-6 sm:px-12 relative overflow-hidden shrink-0 border-b border-slate-800">
        
        {/* Decorative Grid Graphic */}
        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full bg-slate-800/40 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="grid grid-cols-4 gap-3">
            <div className="w-16 h-16 border border-amber-500/20"></div>
            <div className="w-16 h-16 bg-amber-500/10"></div>
            <div className="w-16 h-16 border border-amber-500/20"></div>
            <div className="w-16 h-16 border border-amber-500/20"></div>
            <div className="w-16 h-16 border border-amber-500/20"></div>
            <div className="w-16 h-16 border border-amber-500/20"></div>
            <div className="w-16 h-16 bg-amber-500/10"></div>
            <div className="w-16 h-16 border border-amber-500/20"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl py-12">
          <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Established 1958 • Ranked #1 for Applied Research
          </h4>
          
          <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] mb-6">
            Engineering the <span className="italic font-light text-slate-300">Nexus</span> of Human Innovation
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 border-l-2 border-amber-600 pl-6 max-w-2xl font-light">
            A global leader in interdisciplinary research and technical excellence. Ranked top 5 globally for autonomous systems, quantum computing, and sustainable aerospace design.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => openApplyModal()}
              className="bg-amber-600 text-white font-bold py-4 px-8 uppercase text-xs tracking-widest hover:bg-amber-500 transition-colors shadow-md flex items-center gap-2"
            >
              <span>Apply for Fall 2026</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => {
                setActiveTab('admissions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="border border-white/20 text-white font-bold py-4 px-8 uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
            >
              View Scholarship Rates
            </button>

            <button
              onClick={openAiCounselor}
              className="bg-slate-800 text-amber-400 border border-slate-700 font-bold py-4 px-6 uppercase text-xs tracking-widest hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI Counselor</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3-COLUMN PAGE NAVIGATION MODULES (Professional Polish Archetype) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border-b border-slate-200">
        
        {/* Module 01: Admissions Info */}
        <div
          onClick={() => {
            setActiveTab('admissions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
        >
          <div>
            <div className="text-amber-600 font-serif text-3xl mb-3 italic">01.</div>
            <h3 className="text-slate-900 font-serif text-2xl font-bold mb-3">Admissions & Grants</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Explore graduate and undergraduate pathways. View guaranteed merit scholarship criteria, financial aid, and Fall 2026 application deadlines.
            </p>
            <ul className="space-y-2.5 text-xs font-bold uppercase text-slate-500 tracking-wider">
              <li className="flex items-center gap-2 group-hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span> Application Timelines & Intake
              </li>
              <li className="flex items-center gap-2 group-hover:text-slate-900 transition-colors">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span> Merit Tuition Waiver Calculator
              </li>
            </ul>
          </div>
          <span className="text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-slate-900 w-fit pt-6 flex items-center gap-1">
            Admissions Portal &rarr;
          </span>
        </div>

        {/* Module 02: Research & Labs */}
        <div
          onClick={() => {
            setActiveTab('research');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
        >
          <div>
            <div className="text-amber-600 font-serif text-3xl mb-3 italic">02.</div>
            <h3 className="text-slate-900 font-serif text-2xl font-bold mb-3">Research Centers & Labs</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Our 12 specialized centers house $45M+ in active research grants. From Quantum Computing to Bio-mechanical engineering, we drive industrial breakthroughs.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="border-t border-slate-200 pt-2">
                <div className="text-xl font-bold text-slate-900 tracking-tighter">12 Labs</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Core Facilities</div>
              </div>
              <div className="border-t border-slate-200 pt-2">
                <div className="text-xl font-bold text-slate-900 tracking-tighter">$45M+</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Grants</div>
              </div>
            </div>
          </div>
          <span className="text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-slate-900 w-fit pt-6 flex items-center gap-1">
            Explore Labs & Facilities &rarr;
          </span>
        </div>

        {/* Module 03: Engineering Divisions */}
        <div
          onClick={() => {
            setActiveTab('divisions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
        >
          <div>
            <div className="text-amber-600 font-serif text-3xl mb-3 italic">03.</div>
            <h3 className="text-slate-900 font-serif text-2xl font-bold mb-3">Academic Divisions</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Navigate our 6 core faculties. Specialized departments engineered for the next generation of visionary problem solvers.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-700 uppercase tracking-wider">AI & Robotics</span>
              <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-700 uppercase tracking-wider">Quantum Electronics</span>
              <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-700 uppercase tracking-wider">Aerospace</span>
              <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-700 uppercase tracking-wider">Biomedical</span>
            </div>
          </div>
          <span className="text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-slate-900 w-fit pt-6 flex items-center gap-1">
            Division Directory & Curriculum &rarr;
          </span>
        </div>

      </section>

      {/* QUICK MERIT SCHOLARSHIP CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em] block">
              Merit Scholarship Assessor
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900">Check Your Guaranteed Tuition Waiver</h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Apex awards up to 100% merit waivers automatically based on High School STEM GPA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 border border-slate-200 w-full lg:w-auto">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Your STEM GPA:</label>
              <select
                value={quickGpa}
                onChange={(e) => setQuickGpa(e.target.value)}
                className="px-3.5 py-2 bg-white border border-slate-300 text-slate-900 font-bold text-xs focus:outline-none focus:border-amber-600"
              >
                <option value="3.9">3.9 - 4.0 GPA (100% Waiver)</option>
                <option value="3.7">3.5 - 3.8 GPA (75% Waiver)</option>
                <option value="3.3">3.2 - 3.4 GPA (50% Waiver)</option>
                <option value="3.0">3.0 - 3.1 GPA (25% Grant)</option>
              </select>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 text-center min-w-[180px]">
              <span className="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">Est. Award Rate</span>
              <span className="text-xs font-bold text-slate-900">{quickDiscount}</span>
            </div>

            <button
              onClick={() => openApplyModal()}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shrink-0"
            >
              Apply With Award
            </button>
          </div>
        </div>
      </section>

      {/* DIVISIONS PREVIEW DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h4 className="text-amber-600 font-bold uppercase tracking-[0.2em] text-xs mb-1">Academic Faculties</h4>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              6 Engineering Schools & Departments
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('divisions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-600 flex items-center gap-1"
          >
            <span>View Full Faculty Directory</span>
            <ChevronRight className="w-4 h-4 text-amber-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSITY_DIVISIONS.map((division) => (
            <div
              key={division.id}
              onClick={() => {
                setSelectedDivisionId(division.id);
                setActiveTab('divisions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-slate-200 hover:border-slate-400 p-6 flex flex-col justify-between transition-all cursor-pointer group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-amber-700 px-2 py-0.5 bg-amber-50 border border-amber-200">
                    {division.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {division.degrees.length} Degrees
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {division.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {division.tagline}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Hiring Rate: <strong className="text-slate-900">{division.stats.employmentRate}</strong></span>
                <span className="text-slate-900 font-bold uppercase text-[11px] tracking-wider group-hover:text-amber-600 transition-colors flex items-center gap-1">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESEARCH & LABS HIGHLIGHTS */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-2">Technical Excellence</h4>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Flagship Research Facilities
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveTab('research');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Explore All 12 Centers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH_LABS.slice(0, 3).map((lab) => (
              <div key={lab.id} className="bg-slate-950 p-6 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-900 text-amber-400 border border-slate-800">
                    {lab.category}
                  </span>
                  <h3 className="font-serif font-bold text-white text-lg">{lab.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{lab.summary}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 text-xs flex justify-between text-slate-400">
                  <span>Grant Status: <strong className="text-amber-400">{lab.activeGrants}</strong></span>
                  <span>Director: <strong className="text-slate-200">{lab.director}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS & BREAKING NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Events */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                University Events
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fall Schedule</span>
            </div>

            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="p-5 bg-white border border-slate-200 flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-28 text-center bg-slate-900 text-white p-3 shrink-0 flex flex-col justify-center">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Date</span>
                    <span className="text-xs font-bold">{event.date}</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-slate-900 text-base">{event.title}</h4>
                    <p className="text-xs text-slate-600">{event.summary}</p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pt-1">📍 {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                Research Achievements
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Press Releases</span>
            </div>

            <div className="space-y-4">
              {LATEST_NEWS.map((news) => (
                <div key={news.id} className="p-5 bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <span className="text-amber-600">{news.category}</span>
                    <span>{news.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-base">{news.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{news.summary}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <GraduationCap className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Ready to Advance Your Technical Career?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Submit your candidate portal profile for Fall 2026. Evaluation completes in under 10 days with automatic merit waiver consideration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openApplyModal()}
              className="bg-amber-600 text-white font-bold py-4 px-8 uppercase text-xs tracking-widest hover:bg-amber-500 transition-colors shadow-sm"
            >
              Start Admission Application
            </button>
            <button
              onClick={openAiCounselor}
              className="border border-white/20 text-white font-bold py-4 px-8 uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
            >
              Ask AI Counselor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
