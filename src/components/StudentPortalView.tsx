import React, { useState, useEffect } from 'react';
import { User, AdmissionApplication } from '../types';
import { getStoredApplications, updateApplicationStatus } from '../services/storageService';
import {
  GraduationCap,
  FileText,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Download,
  Upload,
  PlusCircle,
  Building,
  Mail,
  Phone,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface StudentPortalViewProps {
  user: User;
  openApplyModal: (divisionId?: string) => void;
  openAiCounselor: () => void;
  onLogout: () => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  user,
  openApplyModal,
  openAiCounselor,
  onLogout
}) => {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [selectedAppForLetter, setSelectedAppForLetter] = useState<AdmissionApplication | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const loadStudentApps = () => {
    const all = getStoredApplications();
    // Match by userId or by applicant email (case-insensitive)
    const userApps = all.filter(
      (a) =>
        (a.userId && a.userId === user.id) ||
        (a.email && a.email.toLowerCase() === user.email.toLowerCase())
    );
    setApplications(userApps);
  };

  useEffect(() => {
    loadStudentApps();

    const handleAppsChange = () => {
      loadStudentApps();
    };

    window.addEventListener('apex_applications_change', handleAppsChange);
    return () => {
      window.removeEventListener('apex_applications_change', handleAppsChange);
    };
  }, [user.id, user.email]);

  const handleSimulateDocumentUpload = (appId: string) => {
    const docName = `Supplemental_Transcripts_${Date.now().toString().slice(-4)}.pdf`;
    const app = applications.find((a) => a.id === appId);
    if (app) {
      const existingDocs = app.documentsUploaded || [];
      updateApplicationStatus(appId, {
        documentsUploaded: [...existingDocs, docName]
      });
      setUploadSuccessMsg(`Document "${docName}" successfully attached to application ${appId}!`);
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-10 pb-16 bg-slate-50 min-h-screen">
      
      {/* Student Profile Header */}
      <section className="bg-slate-900 border-b border-slate-800 pt-10 pb-10 text-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user.name}
              className="w-16 h-16 rounded-sm object-cover border-2 border-amber-500/50 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                  Verified Student Profile
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {user.studentId || 'APX-ST-2026-042'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> {user.email}
                </span>
                {user.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {user.phone}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> {user.department || 'School of Computer Science & AI'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openApplyModal()}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Apply for New Degree / Major</span>
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors border border-slate-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Main Student Portal Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Upload Alert */}
        {uploadSuccessMsg && (
          <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-900 text-xs font-medium flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{uploadSuccessMsg}</span>
            </div>
            <button onClick={() => setUploadSuccessMsg(null)} className="text-emerald-700 font-bold">
              Dismiss
            </button>
          </div>
        )}

        {/* Status Dashboard Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Active Applications
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-slate-900">{applications.length}</span>
              <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">Fall 2026 Intake</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Merit Grant Status
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-emerald-700">
                {applications.some((a) => a.scholarshipPct > 0)
                  ? `${Math.max(...applications.map((a) => a.scholarshipPct))}% Awarded`
                  : 'Pending'}
              </span>
              <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Guaranteed Waiver</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Counseling Support
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-slate-900">AI Counselor Ready</span>
              <button
                onClick={openAiCounselor}
                className="text-xs font-bold uppercase tracking-wider text-amber-700 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                My Submitted Admission Applications
              </h2>
              <p className="text-xs text-slate-500">
                Real-time tracking of departmental evaluations and official decision letters.
              </p>
            </div>
            <button
              onClick={() => openApplyModal()}
              className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Submit Another Application
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white border border-slate-200 p-12 text-center space-y-4">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  No Applications on Record Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You haven't submitted an official application for Fall 2026 yet. Select an engineering major and compute your guaranteed merit waiver.
                </p>
              </div>
              <button
                onClick={() => openApplyModal()}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <span>Start New Application</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => {
                const isAccepted = app.status === 'Admitted' || app.status === 'Merit Awarded';
                return (
                  <div
                    key={app.id}
                    className="bg-white border border-slate-200 shadow-sm overflow-hidden"
                  >
                    {/* App Header */}
                    <div className="p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                            {app.id}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Submitted: {app.submissionDate}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-white">
                          {app.degreeTitle}
                        </h3>
                        <p className="text-xs text-slate-300">{app.divisionName}</p>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                            isAccepted
                              ? 'bg-emerald-900/60 text-emerald-300 border-emerald-700'
                              : app.status === 'Under Evaluation'
                              ? 'bg-amber-900/60 text-amber-300 border-amber-700'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {isAccepted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                          )}
                          <span>{app.status}</span>
                        </div>

                        <button
                          onClick={() => setSelectedAppForLetter(app)}
                          className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Official Letter</span>
                        </button>
                      </div>
                    </div>

                    {/* App Body Details */}
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Academic & Merit Stats */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                          Evaluated Academic Metrics
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">High School / Prior Institute:</span>
                            <span className="font-bold text-slate-800">{app.highSchool}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Cumulative GPA:</span>
                            <span className="font-mono font-bold text-slate-900">{app.gpa.toFixed(2)} / 4.0</span>
                          </div>
                          {app.satScore && (
                            <div className="flex justify-between">
                              <span className="text-slate-500">SAT / Standardized Score:</span>
                              <span className="font-mono font-bold text-slate-900">{app.satScore} / 1600</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-slate-500">Degree Classification:</span>
                            <span className="font-bold text-slate-800">{app.degreeLevel}</span>
                          </div>
                        </div>
                      </div>

                      {/* Merit Award & Tuition */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                          Scholarship & Tuition Net
                        </h4>
                        <div className="p-3.5 bg-amber-50 border border-amber-200 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                            <Award className="w-4 h-4 text-amber-700 shrink-0" />
                            <span>{app.scholarshipTitle || `${app.scholarshipPct}% Merit Grant`}</span>
                          </div>
                          <div className="text-xs text-slate-700">
                            Tuition Waiver: <strong className="text-amber-800">{app.scholarshipPct}% off base tuition</strong>
                          </div>
                          <div className="pt-2 border-t border-amber-200/80 flex justify-between items-baseline text-xs">
                            <span className="font-bold text-slate-700">Estimated Net Annual Fee:</span>
                            <span className="font-serif font-bold text-slate-900 text-sm">
                              ${app.tuitionEstimate ? app.tuitionEstimate.toLocaleString() : '0'} / yr
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Documents & Admissions Remarks */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2">
                          Attached Dossier & Remarks
                        </h4>
                        
                        {/* Admin Notes */}
                        {app.adminNotes && (
                          <div className="p-3 bg-slate-50 border border-slate-200 text-xs space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                              Admissions Officer Feedback:
                            </span>
                            <p className="text-slate-700 italic font-serif">"{app.adminNotes}"</p>
                          </div>
                        )}

                        {/* Documents List */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Uploaded Documents:
                          </span>
                          <div className="space-y-1">
                            {app.documentsUploaded && app.documentsUploaded.length > 0 ? (
                              app.documentsUploaded.map((doc, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 text-[11px]"
                                >
                                  <span className="flex items-center gap-1.5 text-slate-700 truncate">
                                    <FileCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                    {doc}
                                  </span>
                                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Verified</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-slate-400 italic">No supplementary files attached yet.</p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSimulateDocumentUpload(app.id)}
                            className="mt-2 text-xs font-bold uppercase tracking-wider text-amber-700 hover:text-amber-800 flex items-center gap-1"
                          >
                            <Upload className="w-3.5 h-3.5" /> Upload Additional Transcripts
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* OFFICIAL ADMISSION LETTER MODAL */}
      {selectedAppForLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="bg-white border border-slate-300 w-full max-w-2xl shadow-2xl p-8 sm:p-10 space-y-6 text-slate-900 relative my-8">
            
            {/* Top Seal & Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-900 text-amber-400 font-serif font-bold text-2xl flex items-center justify-center">
                  A
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl uppercase tracking-wider text-slate-900">
                    Apex Engineering University
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Office of Undergraduate & Graduate Admissions • Quad Building
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppForLetter(null)}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 border border-slate-300 px-3 py-1 bg-slate-50"
              >
                Close Letter
              </button>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
              <div className="flex justify-between items-baseline font-sans text-xs border-b border-slate-100 pb-2">
                <span><strong>Date:</strong> {selectedAppForLetter.submissionDate}</span>
                <span><strong>Ref No:</strong> {selectedAppForLetter.id}</span>
              </div>

              <p>
                Dear <strong>{selectedAppForLetter.applicantName}</strong>,
              </p>

              <p>
                On behalf of the Admissions Board and Faculty Directorate of Apex Engineering University, we are delighted to provide this official status dossier regarding your candidate application for admission into the <strong>{selectedAppForLetter.degreeTitle}</strong> within the <strong>{selectedAppForLetter.divisionName}</strong>.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 font-sans space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-bold uppercase tracking-wider">Evaluation Status:</span>
                  <span className="font-bold text-emerald-800 uppercase">{selectedAppForLetter.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-bold uppercase tracking-wider">Merit Scholarship Entitlement:</span>
                  <span className="font-bold text-amber-700">{selectedAppForLetter.scholarshipPct}% Guaranteed Tuition Waiver</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-bold uppercase tracking-wider">Net Annual Tuition:</span>
                  <span className="font-bold text-slate-900">${selectedAppForLetter.tuitionEstimate.toLocaleString()}</span>
                </div>
              </div>

              <p>
                Apex Engineering University admits candidates who demonstrate exemplary rigor in STEM disciplines and commitment to technological innovation. Your verified GPA of {selectedAppForLetter.gpa.toFixed(2)} reflects distinction within your cohort.
              </p>

              {selectedAppForLetter.adminNotes && (
                <p className="border-l-2 border-amber-600 pl-3 italic text-slate-600">
                  "{selectedAppForLetter.adminNotes}"
                </p>
              )}

              <p>
                Please ensure all remaining secondary credentials and housing selections are finalized before the Fall 2026 Orientation Week.
              </p>

              {/* Signatures */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-end font-sans">
                <div>
                  <p className="font-serif italic text-base font-bold text-slate-900">Dr. Eleanor Vance</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dean of Admissions</p>
                  <p className="text-[10px] text-slate-400">Apex Engineering University</p>
                </div>
                <div className="text-right">
                  <div className="inline-block p-2 border border-slate-300 bg-slate-50 text-[10px] font-mono font-bold uppercase text-slate-600">
                    OFFICIAL SEAL • ENROLMENT 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 font-sans">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Print / Save Letter (PDF)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
