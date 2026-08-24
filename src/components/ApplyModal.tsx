import React, { useState, useEffect } from 'react';
import { UNIVERSITY_DIVISIONS } from '../data/universityData';
import { User } from '../types';
import { addApplication } from '../services/storageService';
import {
  X,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Award,
  Upload,
  FileCheck,
  ArrowRight
} from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDivisionId?: string;
  currentUser?: User | null;
  onViewPortal?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  preselectedDivisionId,
  currentUser,
  onViewPortal
}) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const initialDivId = preselectedDivisionId || UNIVERSITY_DIVISIONS[0].id;
  const initialDiv = UNIVERSITY_DIVISIONS.find((d) => d.id === initialDivId) || UNIVERSITY_DIVISIONS[0];

  // Form State
  const [formData, setFormData] = useState({
    fullName: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    phone: currentUser?.phone || '',
    highSchool: '',
    gpa: '3.75',
    satScore: '1440',
    divisionId: initialDivId,
    degreeTitle: initialDiv.degrees[0].title,
    level: 'Undergraduate' as 'Undergraduate' | 'Postgraduate' | 'PhD',
    sopText: '',
    essayUploaded: false
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        email: prev.email || currentUser.email,
        phone: prev.phone || currentUser.phone || ''
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (preselectedDivisionId) {
      const selected = UNIVERSITY_DIVISIONS.find((d) => d.id === preselectedDivisionId);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          divisionId: selected.id,
          degreeTitle: selected.degrees[0].title
        }));
      }
    }
  }, [preselectedDivisionId]);

  if (!isOpen) return null;

  const currentDivision =
    UNIVERSITY_DIVISIONS.find((d) => d.id === formData.divisionId) || UNIVERSITY_DIVISIONS[0];

  // Calculate Scholarship Estimate
  const numericGpa = parseFloat(formData.gpa) || 0;
  const numericSat = parseInt(formData.satScore) || 0;
  let scholarshipPct = 0;
  let scholarshipEstimate = 'Standard Tuition (0% Waiver)';
  let scholarshipTitle = 'Standard Tuition';

  if (numericGpa >= 3.8 || numericSat >= 1450) {
    scholarshipPct = 100;
    scholarshipEstimate = '100% Full Tuition Waiver';
    scholarshipTitle = 'Presidential Full Merit Fellowship (100% Tuition Waiver)';
  } else if (numericGpa >= 3.5 || numericSat >= 1350) {
    scholarshipPct = 75;
    scholarshipEstimate = '75% Merit Scholarship';
    scholarshipTitle = 'Dean’s Honor Merit Award (75% Tuition Waiver)';
  } else if (numericGpa >= 3.2 || numericSat >= 1250) {
    scholarshipPct = 50;
    scholarshipEstimate = '50% Merit Scholarship';
    scholarshipTitle = 'Apex Engineering STEM Grant (50% Tuition Waiver)';
  } else if (numericGpa >= 3.0) {
    scholarshipPct = 25;
    scholarshipEstimate = '25% University Grant';
    scholarshipTitle = 'University STEM Entrance Grant (25% Tuition Waiver)';
  }

  const baseTuition = 25000;
  const calculatedTuition = Math.round(baseTuition * (1 - scholarshipPct / 100));

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'AEU-2026-' + Math.floor(100000 + Math.random() * 900000);
    setAppId(generatedId);

    const uploadedDocs = ['Official_HighSchool_Transcript.pdf'];
    if (formData.essayUploaded) {
      uploadedDocs.push('Statement_and_Certificates.pdf');
    }

    // Save to shared persistent storage so Admin & Student see it instantly!
    addApplication({
      id: generatedId,
      userId: currentUser?.id,
      applicantName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '+1 (555) 019-2834',
      highSchool: formData.highSchool || 'Apex Secondary STEM School',
      gpa: numericGpa,
      satScore: numericSat > 0 ? numericSat : undefined,
      divisionId: currentDivision.id,
      divisionName: currentDivision.name,
      degreeTitle: formData.degreeTitle,
      degreeLevel: formData.level,
      sopText: formData.sopText || 'Committed to rigorous engineering studies and applied research at Apex Engineering University.',
      scholarshipPct,
      scholarshipTitle,
      tuitionEstimate: calculatedTuition,
      documentsUploaded: uploadedDocs
    });

    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  const handleGoToPortal = () => {
    resetAndClose();
    if (onViewPortal) {
      onViewPortal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-300 w-full max-w-2xl shadow-2xl overflow-hidden my-6 text-slate-900">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-xl">
              A
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                Official Admissions Application
              </div>
              <h3 className="font-serif font-bold text-xl text-white">
                Fall 2026 Degree Enrolment
              </h3>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!submitted && (
          <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>1</span>
              <span>Personal</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>2</span>
              <span>Program</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>3</span>
              <span>Academic & Merit</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <div className={`flex items-center gap-2 ${step >= 4 ? 'text-amber-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>4</span>
              <span>Review</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            /* Success View */
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-2xl font-bold font-serif text-slate-900">Application Lodged in University Registry!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-slate-900">{formData.fullName}</span>. Your application for <span className="font-bold text-amber-700">{formData.degreeTitle}</span> is now active in the official Admissions Directorate queue.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 max-w-md mx-auto space-y-2 text-left text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Application Reference ID:</span>
                  <span className="font-mono text-amber-800 font-bold text-sm">{appId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Division:</span>
                  <span className="text-slate-800 font-medium">{currentDivision.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Merit Scholarship Status:</span>
                  <span className="text-emerald-800 font-bold">{scholarshipEstimate}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left">
                <strong>Real-time Registry Sync:</strong> Admissions officers and departmental deans have immediate access to evaluate your transcripts and grant acceptance letters.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleGoToPortal}
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Open Student Portal & Letters</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider"
                >
                  Back to University Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2">
                    Step 1: Personal & Contact Dossier
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Nayab Irfan"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nayab@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        High School / Previous Institute *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.highSchool}
                        onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
                        placeholder="Apex STEM Academy"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Program & Division */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2">
                    Step 2: Select Division & Degree Program
                  </h4>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Academic Division *
                    </label>
                    <select
                      value={formData.divisionId}
                      onChange={(e) => {
                        const divId = e.target.value;
                        const div = UNIVERSITY_DIVISIONS.find((d) => d.id === divId);
                        setFormData({
                          ...formData,
                          divisionId: divId,
                          degreeTitle: div ? div.degrees[0].title : ''
                        });
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                    >
                      {UNIVERSITY_DIVISIONS.map((div) => (
                        <option key={div.id} value={div.id}>
                          {div.name} ({div.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Degree Major *
                    </label>
                    <select
                      value={formData.degreeTitle}
                      onChange={(e) => setFormData({ ...formData, degreeTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                    >
                      {currentDivision.degrees.map((deg, i) => (
                        <option key={i} value={deg.title}>
                          [{deg.level}] {deg.title} ({deg.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 space-y-1 text-xs">
                    <span className="text-amber-800 font-bold uppercase tracking-wider text-[10px]">Division Focus</span>
                    <p className="text-slate-600">{currentDivision.tagline}</p>
                  </div>
                </div>
              )}

              {/* Step 3: Academic Record & Merit Calculator */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2">
                    Step 3: High School GPA & Merit Calculator
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Cumulative GPA (Out of 4.0) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="2.0"
                        max="4.0"
                        required
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        SAT Score (Max 1600)
                      </label>
                      <input
                        type="number"
                        min="800"
                        max="1600"
                        value={formData.satScore}
                        onChange={(e) => setFormData({ ...formData, satScore: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                      />
                    </div>
                  </div>

                  {/* Real-time Scholarship Card */}
                  <div className="p-4 bg-amber-50 border border-amber-300 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <Sparkles className="w-4 h-4 text-amber-700" />
                        <span>Estimated Apex Merit Award</span>
                      </div>
                      <p className="text-xs text-slate-600">Calculated automatically on your GPA & SAT thresholds.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-serif font-bold text-amber-800 block">{scholarshipEstimate}</span>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase flex items-center gap-0.5 justify-end">
                        <Award className="w-3 h-3" /> Auto-Qualified
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Statement & Submit */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-2">
                    Step 4: Personal Statement & Credentials Review
                  </h4>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Statement of Purpose (Why Apex Engineering?)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.sopText}
                      onChange={(e) => setFormData({ ...formData, sopText: e.target.value })}
                      placeholder="Share your passion for engineering, research goals, or career ambitions..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
                    />
                  </div>

                  {/* Mock Upload Box */}
                  <div
                    className="p-3.5 bg-slate-50 border border-dashed border-slate-300 text-center cursor-pointer hover:border-slate-400 transition-colors"
                    onClick={() => setFormData({ ...formData, essayUploaded: !formData.essayUploaded })}
                  >
                    {formData.essayUploaded ? (
                      <div className="flex items-center justify-center gap-2 text-xs text-emerald-800 font-bold">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span>High School Transcript & Dossier Attached!</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                        <Upload className="w-4 h-4 text-amber-700" />
                        <span>Click to attach Academic Transcripts / Certificates (PDF/PNG)</span>
                      </div>
                    )}
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>Applicant Name:</span>
                      <span className="font-bold text-slate-900">{formData.fullName || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Selected Degree:</span>
                      <span className="font-bold text-amber-800">{formData.degreeTitle}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GPA & Merit Entitlement:</span>
                      <span className="font-bold text-emerald-800">{formData.gpa} GPA ({scholarshipEstimate})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>All submitted credentials are protected and verified by University IAM.</span>
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 1 && (!formData.fullName || !formData.email || !formData.phone)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-xs"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Submit to University Registry</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
