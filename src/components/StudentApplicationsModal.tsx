import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Application } from '../types';
import { X, FileText, Plus, Clock, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

interface StudentApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApplyModal: () => void;
}

export const StudentApplicationsModal: React.FC<StudentApplicationsModalProps> = ({
  isOpen,
  onClose,
  onOpenApplyModal,
}) => {
  const { token, user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/applications/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch applications.');
      }
      setApplications(data.applications || []);
    } catch (err: any) {
      setError(err.message || 'Error fetching application status.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isOpen) {
      fetchApplications();
    }
  }, [isOpen, fetchApplications]);

  if (!isOpen) return null;

  const renderStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Approved for Admission</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Not Selected</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>Under Review (Pending)</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-indigo-950 p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-400/30">
              <FileText className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Student Admissions Portal
              </span>
              <h2 className="text-xl font-serif font-bold text-white">
                My Application Status
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchApplications}
              className="p-2 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">{user?.full_name}</span>
              <span className="text-[11px] text-slate-500 block">{user?.email}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenApplyModal();
              }}
              className="px-3.5 py-2 bg-indigo-950 hover:bg-slate-900 text-amber-300 font-bold rounded-lg text-xs flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Submit New Application</span>
            </button>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-950" />
              <span>Fetching application history...</span>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-rose-600 text-xs">
              {error}
            </div>
          ) : applications.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl p-6">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-slate-800 mb-1">No Applications Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                You have not submitted an admission application for Fall 2026 yet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenApplyModal();
                }}
                className="px-4 py-2 bg-indigo-950 hover:bg-slate-900 text-amber-300 font-bold rounded-xl text-xs"
              >
                Start Application Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-indigo-900 tracking-wider">
                        Program Choice
                      </span>
                      <h4 className="text-sm font-serif font-bold text-slate-900">
                        {app.program}
                      </h4>
                    </div>
                    {renderStatusBadge(app.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-700">Submitted: </span>
                      {new Date(app.submitted_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    {app.gpa && (
                      <div>
                        <span className="font-semibold text-slate-700">GPA Recorded: </span>
                        {app.gpa}
                      </div>
                    )}
                  </div>

                  {app.statement && (
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600 italic">
                      "{app.statement}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
