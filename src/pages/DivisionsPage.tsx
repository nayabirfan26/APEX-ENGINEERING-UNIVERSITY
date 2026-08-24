import React, { useState } from 'react';
import { UNIVERSITY_DIVISIONS } from '../data/universityData';
import { EngineeringDivision } from '../types';
import {
  Layers,
  Award,
  Users,
  FlaskConical,
  TrendingUp,
  CheckCircle2,
  Mail,
  ChevronRight,
  BookOpen,
  Briefcase,
  Code,
  GraduationCap
} from 'lucide-react';

interface DivisionsPageProps {
  selectedDivisionId: string;
  setSelectedDivisionId: (id: string) => void;
  openApplyModal: (divisionId?: string) => void;
}

export const DivisionsPage: React.FC<DivisionsPageProps> = ({
  selectedDivisionId,
  setSelectedDivisionId,
  openApplyModal
}) => {
  const currentDivision: EngineeringDivision =
    UNIVERSITY_DIVISIONS.find((d) => d.id === selectedDivisionId) || UNIVERSITY_DIVISIONS[0];

  const [activeLevelFilter, setActiveLevelFilter] = useState<'All' | 'Undergraduate' | 'Postgraduate' | 'PhD'>('All');

  const filteredDegrees = currentDivision.degrees.filter((deg) => {
    if (activeLevelFilter === 'All') return true;
    return deg.level === activeLevelFilter;
  });

  return (
    <div className="space-y-12 pb-16 bg-slate-50">
      
      {/* Top Banner Header (Professional Polish) */}
      <section className="bg-slate-900 border-b border-slate-800 pt-12 pb-12 text-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Academic Divisions & Faculties
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Engineering Divisions & Degree Programs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light border-l-2 border-amber-600 pl-4">
            Explore Apex Engineering University’s 6 specialized divisions. Each school blends fundamental STEM principles with hands-on lab experimentation and industry research fellowships.
          </p>
        </div>
      </section>

      {/* Main Divisions Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Navigation Pills for Divisions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin border-b border-slate-200 mb-8">
          {UNIVERSITY_DIVISIONS.map((div) => {
            const isSelected = div.id === currentDivision.id;
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivisionId(div.id)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="font-mono text-xs opacity-80">{div.code}</span>
                <span>{div.name.replace('School of ', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Division Hero Overview */}
        <div className="bg-white border border-slate-200 shadow-sm space-y-8 p-6 sm:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Division Text Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-900 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  {currentDivision.code}
                </span>
                <span className="text-xs text-amber-700 font-bold uppercase tracking-widest">
                  Official Academic Division
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
                {currentDivision.name}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {currentDivision.description}
              </p>

              {/* Division Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 text-center">
                  <span className="text-lg font-serif font-bold text-slate-900 block">{currentDivision.stats.studentsCount}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Students</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 text-center">
                  <span className="text-lg font-serif font-bold text-amber-700 block">{currentDivision.stats.facultyCount}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Professors</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 text-center">
                  <span className="text-lg font-serif font-bold text-slate-900 block">{currentDivision.stats.labCount}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Dedicated Labs</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 text-center">
                  <span className="text-lg font-serif font-bold text-emerald-700 block">{currentDivision.stats.employmentRate}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Employment</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openApplyModal(currentDivision.id)}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2"
                >
                  <span>Apply to {currentDivision.code}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Division Image & HOD Quote */}
            <div className="space-y-4">
              <div className="relative overflow-hidden h-64 sm:h-72 border border-slate-200 shadow-sm bg-slate-900">
                <img src={currentDivision.heroImage} alt={currentDivision.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/95 text-white border-l-2 border-amber-500 text-xs">
                  <p className="text-slate-200 italic font-serif">"{currentDivision.hodQuote}"</p>
                  <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px] mt-2">— {currentDivision.hodName}, {currentDivision.hodTitle}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Section: Degree Offerings */}
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" /> Degrees & Curriculum
                </h3>
                <p className="text-xs text-slate-500">Undergraduate, Master's, and Doctoral degree pathways.</p>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 border border-slate-200 text-xs font-bold uppercase tracking-wider">
                {(['All', 'Undergraduate', 'Postgraduate', 'PhD'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevelFilter(lvl)}
                    className={`px-3 py-1.5 transition-colors ${
                      activeLevelFilter === lvl
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDegrees.map((deg, index) => (
                <div key={index} className="p-5 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300">
                      {deg.level}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{deg.duration} • {deg.credits} Credits</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-slate-900">{deg.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{deg.description}</p>
                  
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200/80">
                    <span className="text-slate-500 font-mono text-[11px]">Fall 2026 Admissions Open</span>
                    <button
                      onClick={() => openApplyModal(currentDivision.id)}
                      className="text-amber-700 font-bold uppercase text-[11px] tracking-wider hover:underline flex items-center gap-1"
                    >
                      Apply Major <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Associated Core Research Labs */}
          <div className="pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-amber-600" /> Dedicated Division Laboratories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentDivision.coreLabs.map((labName, i) => (
                <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold">{labName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Career Pathways & Student Innovations */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Careers */}
            <div className="space-y-3">
              <h4 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-600" /> High-Demand Career Paths
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {currentDivision.careerPaths.map((career, i) => (
                  <li key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    <span className="font-medium">{career}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notable Projects */}
            <div className="space-y-3">
              <h4 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" /> Featured Student Innovations
              </h4>
              <div className="space-y-3">
                {currentDivision.notableProjects.map((project, i) => (
                  <div key={i} className="p-4 bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <h5 className="font-serif font-bold text-slate-900 text-sm">{project.title}</h5>
                      {project.award && (
                        <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider bg-amber-100 px-2 py-0.5 border border-amber-300">
                          {project.award}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-[11px] font-mono">By: {project.studentNames}</p>
                    <p className="text-slate-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section: Division Faculty Directory */}
          <div className="pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" /> Distinguished Faculty Chairs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentDivision.keyFaculty.map((fac, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 flex items-center gap-4">
                  <img src={fac.image} alt={fac.name} className="w-14 h-14 object-cover border border-slate-300" />
                  <div className="space-y-0.5 text-xs">
                    <h5 className="font-serif font-bold text-slate-900 text-sm">{fac.name}</h5>
                    <p className="text-amber-700 font-bold uppercase text-[10px] tracking-wider">{fac.role}</p>
                    <p className="text-slate-600">{fac.specialization}</p>
                    <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-1 font-mono">
                      <Mail className="w-3 h-3 text-slate-400" /> {fac.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
