import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, GraduationCap, Send, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PROGRAMS = [
  'M.S. & Ph.D. in Artificial Intelligence & Quantum Computing',
  'B.S. & M.S. in Robotics, Mechatronics & Autonomous Systems',
  'B.S. & M.S. in Bioengineering & Neural Technology',
  'B.S. & M.S. in Aerospace Engineering & Space Propulsion',
  'B.S. in Cyber-Physical Security & Cryptography',
];

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { token } = useAuth();
  
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [gpa, setGpa] = useState('3.85');
  const [statement, setStatement] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ program, gpa, statement }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit application.');
      }

      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-400/30">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Apex Engineering Admissions
              </span>
              <h2 className="text-xl font-serif font-bold text-white">
                Submit Admission Application
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6">
          {submittedSuccess ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Application Submitted Successfully!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your admission file has been logged into the Apex Admissions System for review by the faculty committee.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Engineering Program
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-950/20 focus:border-indigo-950"
                >
                  {PROGRAMS.map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Cumulative GPA (4.0 Scale)
                </label>
                <input
                  type="text"
                  required
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  placeholder="e.g. 3.85"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-950/20 focus:border-indigo-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Statement of Purpose & Technical Background
                </label>
                <textarea
                  rows={4}
                  required
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="Describe your research interests, projects, and motivation for studying at Apex..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-950/20 focus:border-indigo-950"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-indigo-950 hover:bg-slate-900 text-white font-semibold rounded-xl text-xs shadow-md transition-all flex items-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
