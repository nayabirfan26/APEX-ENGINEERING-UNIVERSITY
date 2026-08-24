import React, { useState } from 'react';
import { RESEARCH_LABS } from '../data/universityData';
import { ResearchLab } from '../types';
import {
  FlaskConical,
  Search,
  Filter,
  Award,
  BookOpen,
  DollarSign,
  UserCheck,
  CheckCircle2,
  Send,
  Building,
  Sparkles,
  X
} from 'lucide-react';

interface ResearchLabsPageProps {
  openAiCounselor: () => void;
}

export const ResearchLabsPage: React.FC<ResearchLabsPageProps> = ({ openAiCounselor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryModalLab, setInquiryModalLab] = useState<ResearchLab | null>(null);
  const [inquirySent, setInquiryModalSent] = useState(false);

  const categories = ['All', 'AI & Robotics', 'Quantum Tech', 'Renewables & Energy', 'Aerospace', 'Biomedical'];

  const filteredLabs = RESEARCH_LABS.filter((lab) => {
    const matchesCategory = selectedCategory === 'All' || lab.category === selectedCategory;
    const matchesSearch =
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.equipmentList.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16 bg-slate-50">
      
      {/* Page Banner (Professional Polish Header) */}
      <section className="bg-slate-900 border-b border-slate-800 pt-12 pb-12 text-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Technical Facilities & Research Centers
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Research Centers & State-of-the-Art Labs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light border-l-2 border-amber-600 pl-4">
            Apex Engineering University hosts 12 specialized research laboratories backed by $45M+ in active grants. Undergraduates and PhD researchers work alongside world-leading faculty on real-world industrial breakthroughs.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment or labs..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-amber-600 font-medium"
            />
          </div>

        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Lab Banner Header */}
                <div className="p-6 bg-slate-900 text-white space-y-2 border-b border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      {lab.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Grant: {lab.activeGrants}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">{lab.name}</h3>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{lab.divisionName}</p>
                </div>

                {/* Lab Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">{lab.fullOverview}</p>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-slate-50 border border-slate-200 text-center text-xs">
                    <div>
                      <span className="text-amber-700 font-bold block">{lab.metrics.researchersCount}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Researchers</span>
                    </div>
                    <div>
                      <span className="text-slate-900 font-bold block">{lab.metrics.patentsFiled}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Patents</span>
                    </div>
                    <div>
                      <span className="text-emerald-700 font-bold block">{lab.metrics.annualFunding}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Annual Funding</span>
                    </div>
                  </div>

                  {/* Equipment List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Specialized Equipment
                    </h4>
                    <ul className="space-y-1.5">
                      {lab.equipmentList.map((eq, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Publication */}
                  <div className="p-3 bg-amber-50 border border-amber-200 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-amber-700" /> Featured Publication:
                    </span>
                    <p className="text-slate-900 font-serif font-bold italic">"{lab.featuredPublication.title}"</p>
                    <p className="text-[10px] text-slate-500">
                      Published in {lab.featuredPublication.journal} ({lab.featuredPublication.year})
                    </p>
                  </div>
                </div>
              </div>

              {/* Lab Footer */}
              <div className="p-6 pt-4 flex items-center justify-between text-xs border-t border-slate-100 bg-slate-50">
                <div className="text-slate-600">
                  <span>Director: </span>
                  <strong className="text-slate-900">{lab.director}</strong>
                </div>
                <button
                  onClick={() => {
                    setInquiryModalLab(lab);
                    setInquiryModalSent(false);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[11px] tracking-wider transition-colors"
                >
                  Inquire Fellowship
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Collaboration Modal */}
      {inquiryModalLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-300 rounded-none w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Research Fellowship Inquiry</h3>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">{inquiryModalLab.name}</p>
              </div>
              <button onClick={() => setInquiryModalLab(null)} className="text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySent ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-serif font-bold text-slate-900">Inquiry Dispatched</h4>
                <p className="text-xs text-slate-600">
                  The Lab Director's office ({inquiryModalLab.director}) will contact you regarding research assistantships.
                </p>
                <button
                  onClick={() => setInquiryModalLab(null)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquiryModalSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. / Student Name"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="researcher@example.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Inquiry Purpose *</label>
                  <select className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none">
                    <option>Undergraduate Research Fellowship (URF)</option>
                    <option>Postgraduate / PhD Thesis Position</option>
                    <option>Industrial Equipment Collaboration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Brief Research Interests</label>
                  <textarea
                    rows={3}
                    placeholder="Mention specific equipment or research topics..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalLab(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest"
                  >
                    Send to Director
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
