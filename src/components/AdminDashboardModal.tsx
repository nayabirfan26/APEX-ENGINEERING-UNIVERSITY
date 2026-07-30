import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { Application } from '../types';
import { X, ShieldCheck, CheckCircle2, XCircle, Clock, Search, RefreshCw, Loader2, Award, UserCheck } from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { token, user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch student applications.');
      }
      setApplications(data.applications || []);
    } catch (err: any) {
      setError(err.message || 'Error loading applications.');
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

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update status.');
      }

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const nameMatch = (app.student_name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = (app.student_email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const programMatch = app.program.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && (nameMatch || emailMatch || programMatch);
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const approvedCount = applications.filter((a) => a.status === 'approved').length;
  const rejectedCount = applications.filter((a) => a.status === 'rejected').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="bg-slate-950 p-6 text-white flex items-center justify-between shrink-0 border-b border-amber-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl font-bold shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  Faculty Admin Portal
                </span>
                <span className="text-xs text-slate-400">Log: {user?.full_name}</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-white mt-0.5">
                Admission Applications Review Dashboard
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchApplications}
              className="p-2 text-slate-300 hover:text-amber-400 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Top Summary Stats Cards */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 text-indigo-950 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-slate-900 block leading-tight">
                {totalCount}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Total Applications</span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-amber-200/80 shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-amber-900 block leading-tight">
                {pendingCount}
              </span>
              <span className="text-[11px] font-semibold text-amber-700">Pending Review</span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-emerald-200/80 shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-emerald-900 block leading-tight">
                {approvedCount}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">Approved</span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-rose-200/80 shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-rose-900 block leading-tight">
                {rejectedCount}
              </span>
              <span className="text-[11px] font-semibold text-rose-700">Rejected</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="px-6 py-3 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-slate-950 text-amber-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search applicant name, program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-950/20"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="py-16 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
              <span>Loading university applicant dataset...</span>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-rose-600 text-xs font-semibold">{error}</div>
          ) : filteredApps.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No applicant submissions match the selected filters.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-900/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">
                        {app.student_name || 'Applicant'}
                      </span>
                      <span className="text-[11px] text-slate-500">({app.student_email || 'No email'})</span>
                    </div>

                    <p className="text-xs font-serif font-semibold text-indigo-950">
                      {app.program}
                    </p>

                    <div className="flex items-center space-x-4 text-[11px] text-slate-500">
                      <span>Submitted: {new Date(app.submitted_at).toLocaleDateString()}</span>
                      {app.gpa && <span className="font-semibold text-slate-700">GPA: {app.gpa}</span>}
                    </div>

                    {app.statement && (
                      <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded border border-slate-100 mt-1 line-clamp-2">
                        "{app.statement}"
                      </p>
                    )}
                  </div>

                  {/* Status & Action Buttons */}
                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="text-right">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold capitalize border ${
                          app.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : app.status === 'rejected'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 border-l border-slate-200 pl-3">
                      <button
                        onClick={() => handleUpdateStatus(app.id, 'approved')}
                        disabled={updatingId === app.id || app.status === 'approved'}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1 disabled:opacity-40"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(app.id, 'rejected')}
                        disabled={updatingId === app.id || app.status === 'rejected'}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-rose-600 hover:text-white text-slate-700 font-bold text-xs rounded-lg transition-colors flex items-center space-x-1 disabled:opacity-40"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
