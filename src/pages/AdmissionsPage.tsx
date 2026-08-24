import React, { useState } from 'react';
import { ADMISSION_DEADLINES, FEE_STRUCTURES, FAQS } from '../data/universityData';
import {
  FileText,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Download,
  HelpCircle,
  GraduationCap,
  Award,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface AdmissionsPageProps {
  openApplyModal: () => void;
  openAiCounselor: () => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  openApplyModal,
  openAiCounselor
}) => {
  // Calculator state
  const [degreeLevel, setDegreeLevel] = useState<'Undergraduate' | 'Postgraduate' | 'PhD'>('Undergraduate');
  const [gpaInput, setGpaInput] = useState<number>(3.7);
  const [satInput, setSatInput] = useState<number>(1400);
  const [includeHostel, setIncludeHostel] = useState<boolean>(true);

  // FAQ State
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [openFaqIndex, setFaqIndex] = useState<number | null>(0);

  // Fee Calculation Math
  const structure = FEE_STRUCTURES[degreeLevel];
  const grossTuition = structure.tuitionPerCredit * structure.creditsPerYear;
  const labFees = structure.labFeePerSemester * 2;
  const hostelCost = includeHostel ? structure.hostelFeePerYear : 0;

  // Scholarship waiver percentage
  let scholarshipPct = 0;
  if (degreeLevel === 'PhD') {
    scholarshipPct = 100; // Fully funded
  } else if (gpaInput >= 3.8 || satInput >= 1450) {
    scholarshipPct = 100;
  } else if (gpaInput >= 3.5 || satInput >= 1350) {
    scholarshipPct = 75;
  } else if (gpaInput >= 3.2 || satInput >= 1250) {
    scholarshipPct = 50;
  } else if (gpaInput >= 3.0) {
    scholarshipPct = 25;
  }

  const discountAmount = (grossTuition * scholarshipPct) / 100;
  const netTuition = grossTuition - discountAmount;
  const totalNetAnnual = netTuition + labFees + hostelCost + structure.admissionFeeOneTime;

  // Filter FAQs
  const filteredFaqs = FAQS.filter((f) => faqCategory === 'All' || f.category === faqCategory);

  return (
    <div className="space-y-12 pb-16 bg-slate-50">
      
      {/* Top Banner (Professional Polish Editorial Header) */}
      <section className="bg-slate-900 border-b border-slate-800 pt-12 pb-12 text-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Official Admissions Portal • Fall 2026 / Spring 2027
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Admissions, Fees & Guaranteed Merit Grants
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-light border-l-2 border-amber-600 pl-4">
            Apex Engineering University offers holistic admission evaluations and guaranteed merit scholarships for high-achieving STEM applicants. Calculate your net tuition fee below!
          </p>
        </div>
      </section>

      {/* TUITION & SCHOLARSHIP CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Interactive Fee Estimator
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Tuition Fee & Merit Grant Calculator
              </h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              *PhD Fellowships are 100% Fully Funded with Stipend
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Level Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Degree Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Undergraduate', 'Postgraduate', 'PhD'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDegreeLevel(lvl)}
                      className={`py-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                        degreeLevel === lvl
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* GPA & SAT Sliders */}
              {degreeLevel !== 'PhD' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 uppercase tracking-wider">Cumulative GPA (Out of 4.0):</span>
                      <span className="font-mono text-amber-700 font-bold text-sm">{gpaInput.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="2.5"
                      max="4.0"
                      step="0.05"
                      value={gpaInput}
                      onChange={(e) => setGpaInput(parseFloat(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 uppercase tracking-wider">SAT Score (Optional / 1600):</span>
                      <span className="font-mono text-slate-900 font-bold text-sm">{satInput}</span>
                    </div>
                    <input
                      type="range"
                      min="900"
                      max="1600"
                      step="10"
                      value={satInput}
                      onChange={(e) => setSatInput(parseInt(e.target.value))}
                      className="w-full accent-slate-900 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Hostel Toggle */}
              <div className="p-4 bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Apex On-Campus Housing</span>
                  <span className="text-[11px] text-slate-500">Includes AC single room, Wi-Fi & meal plan</span>
                </div>
                <button
                  onClick={() => setIncludeHostel(!includeHostel)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    includeHostel ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {includeHostel ? 'Hostel Included' : 'No Housing'}
                </button>
              </div>

            </div>

            {/* Results Card (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Annual Expense Estimate
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Tuition ({structure.creditsPerYear} Credits):</span>
                    <span className="font-mono text-white">${grossTuition.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-amber-400 font-bold p-2.5 bg-amber-500/10 border border-amber-500/20">
                    <span>Merit Award Waiver ({scholarshipPct}%):</span>
                    <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Lab & Facility Fee:</span>
                    <span className="font-mono text-white">${labFees.toLocaleString()}</span>
                  </div>

                  {includeHostel && (
                    <div className="flex justify-between text-slate-300">
                      <span>On-Campus Hostel & Dining:</span>
                      <span className="font-mono text-white">${hostelCost.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>One-Time Deposit:</span>
                    <span className="font-mono text-white">${structure.admissionFeeOneTime.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Net Total Box */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Net Annual Cost:</span>
                  <span className="text-3xl font-serif font-bold text-amber-400">
                    ${totalNetAnnual.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={openApplyModal}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Apply with this Merit Award</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ADMISSION DEADLINES TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">Intake Schedule</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Key Application Deadlines
            </h2>
          </div>
          <button
            onClick={openAiCounselor}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-600 border border-slate-300 px-3 py-1.5 w-fit bg-white"
          >
            Need Extension? Ask AI Counselor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADMISSION_DEADLINES.map((item) => (
            <div key={item.id} className="p-5 bg-white border border-slate-200 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.level}</span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                    item.status === 'Open'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : item.status === 'Upcoming'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h4 className="font-serif font-bold text-slate-900 text-base">{item.term}</h4>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Opens:</span>
                  <span className="font-mono text-slate-900 font-bold">{item.applicationOpens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deadline:</span>
                  <span className="font-mono text-amber-600 font-bold">{item.deadlineDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Decision:</span>
                  <span className="font-mono text-slate-900">{item.decisionDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADMISSIONS APPLICATION ROADMAP */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Application Roadmap</span>
            <h2 className="text-3xl font-serif font-bold text-white">5 Steps to Enrolment</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { step: '01.', title: 'Eligibility', desc: 'Verify STEM course credits with min 3.0 GPA.' },
              { step: '02.', title: 'Division', desc: 'Select from our 6 Engineering Schools and Majors.' },
              { step: '03.', title: 'Portal', desc: 'Submit personal details, transcripts & statement.' },
              { step: '04.', title: 'Merit Grant', desc: 'Auto-evaluation of merit scholarship coverage.' },
              { step: '05.', title: 'Enrolment', desc: 'Receive offer letter & join Apex Quad.' }
            ].map((st, i) => (
              <div key={i} className="p-5 bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-2xl font-serif italic text-amber-400 block">{st.step}</span>
                <h4 className="font-bold text-white text-sm uppercase tracking-wider">{st.title}</h4>
                <p className="text-xs text-slate-400 leading-normal">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Admissions Desk</span>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        {/* FAQ Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {['All', 'Admissions', 'Scholarships', 'Housing', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFaqCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                faqCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left font-serif font-bold text-slate-900 text-base flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
