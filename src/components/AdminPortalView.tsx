import React, { useState, useEffect } from 'react';
import { User, AdmissionApplication, ApplicationStatus } from '../types';
import {
  getStoredApplications,
  updateApplicationStatus,
  deleteApplication,
  resetDemoStorage,
  addApplication
} from '../services/storageService';
import { UNIVERSITY_DIVISIONS } from '../data/universityData';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  Trash2,
  Edit3,
  Download,
  RotateCcw,
  PlusCircle,
  Eye,
  FileCheck,
  Building,
  Mail,
  UserCheck,
  X,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

interface AdminPortalViewProps {
  user: User;
  onLogout: () => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({ user, onLogout }) => {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  
  // Active Dossier Modal
  const [dossierApp, setDossierApp] = useState<AdmissionApplication | null>(null);
  const [editStatus, setEditStatus] = useState<ApplicationStatus>('Pending Review');
  const [editScholarship, setEditScholarship] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>('');

  // Add Manual Application Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualHighSchool, setManualHighSchool] = useState('');
  const [manualGpa, setManualGpa] = useState('3.85');
  const [manualSat, setManualSat] = useState('1460');
  const [manualDivisionId, setManualDivisionId] = useState(UNIVERSITY_DIVISIONS[0].id);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const loadApplications = () => {
    setApplications(getStoredApplications());
  };

  useEffect(() => {
    loadApplications();

    const handleAppsChange = () => {
      loadApplications();
    };

    window.addEventListener('apex_applications_change', handleAppsChange);
    return () => {
      window.removeEventListener('apex_applications_change', handleAppsChange);
    };
  }, []);

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.highSchool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.degreeTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDivision =
      selectedDivision === 'All' || app.divisionId === selectedDivision;

    const matchesStatus =
      selectedStatus === 'All' || app.status === selectedStatus;

    return matchesSearch && matchesDivision && matchesStatus;
  });

  // KPI Calculations
  const totalApps = applications.length;
  const admittedCount = applications.filter(
    (a) => a.status === 'Admitted' || a.status === 'Merit Awarded'
  ).length;
  const meritGrantsCount = applications.filter((a) => a.scholarshipPct > 0).length;
  const avgGpa = totalApps > 0
    ? (applications.reduce((acc, a) => acc + (a.gpa || 0), 0) / totalApps).toFixed(2)
    : '0.00';

  const handleOpenDossier = (app: AdmissionApplication) => {
    setDossierApp(app);
    setEditStatus(app.status);
    setEditScholarship(app.scholarshipPct);
    setEditNotes(app.adminNotes || '');
  };

  const handleSaveDossier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dossierApp) return;

    let updatedTitle = dossierApp.scholarshipTitle;
    if (editScholarship >= 100) {
      updatedTitle = 'Presidential Full Merit Fellowship (100% Tuition Waiver)';
    } else if (editScholarship >= 75) {
      updatedTitle = 'Dean’s Honor Merit Award (75% Tuition Waiver)';
    } else if (editScholarship >= 50) {
      updatedTitle = 'Apex Engineering STEM Grant (50% Tuition Waiver)';
    } else if (editScholarship > 0) {
      updatedTitle = `${editScholarship}% Merit Grant`;
    } else {
      updatedTitle = 'Standard Tuition (No Merit Grant)';
    }

    const baseGross = 25000;
    const net = baseGross * (1 - editScholarship / 100);

    updateApplicationStatus(dossierApp.id, {
      status: editStatus,
      scholarshipPct: editScholarship,
      scholarshipTitle: updatedTitle,
      tuitionEstimate: Math.round(net),
      adminNotes: editNotes
    });

    showToast(`Application ${dossierApp.id} for ${dossierApp.applicantName} updated!`);
    setDossierApp(null);
  };

  const handleQuickStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(appId, { status: newStatus });
    showToast(`Status updated to ${newStatus}`);
  };

  const handleDeleteApp = (appId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete application ${appId} for ${name}?`)) {
      deleteApplication(appId);
      showToast(`Application ${appId} deleted.`);
    }
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all applications & accounts to initial university defaults?')) {
      resetDemoStorage();
      showToast('Database reset to default demo records.');
    }
  };

  const handleCreateManualApp = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDiv = UNIVERSITY_DIVISIONS.find((d) => d.id === manualDivisionId) || UNIVERSITY_DIVISIONS[0];
    const gpaNum = parseFloat(manualGpa) || 3.5;
    const satNum = parseInt(manualSat) || 1400;

    let scholarshipPct = 0;
    let scholarshipTitle = 'Standard Tuition';
    if (gpaNum >= 3.8 || satNum >= 1450) {
      scholarshipPct = 100;
      scholarshipTitle = 'Presidential Full Merit Fellowship (100% Tuition Waiver)';
    } else if (gpaNum >= 3.5 || satNum >= 1350) {
      scholarshipPct = 75;
      scholarshipTitle = 'Dean’s Honor Merit Award (75% Tuition Waiver)';
    } else if (gpaNum >= 3.2) {
      scholarshipPct = 50;
      scholarshipTitle = 'Apex Engineering STEM Grant (50% Tuition Waiver)';
    }

    const baseGross = 25000;
    const net = baseGross * (1 - scholarshipPct / 100);

    addApplication({
      applicantName: manualName,
      email: manualEmail,
      phone: '+1 (555) 000-1122',
      highSchool: manualHighSchool,
      gpa: gpaNum,
      satScore: satNum,
      divisionId: targetDiv.id,
      divisionName: targetDiv.name,
      degreeTitle: targetDiv.degrees[0].title,
      degreeLevel: 'Undergraduate',
      sopText: 'Manual applicant record created by Admissions Directorate.',
      scholarshipPct,
      scholarshipTitle,
      tuitionEstimate: Math.round(net),
      documentsUploaded: ['Verified_Manual_Transcript.pdf']
    });

    showToast(`Manual application for ${manualName} registered successfully!`);
    setIsAddModalOpen(false);
    setManualName('');
    setManualEmail('');
    setManualHighSchool('');
  };

  const handleExportCSV = () => {
    const headers = ['Application_ID,Applicant_Name,Email,Division,Degree,GPA,SAT,Status,Merit_Pct,Date\n'];
    const rows = applications.map((a) =>
      `"${a.id}","${a.applicantName}","${a.email}","${a.divisionName}","${a.degreeTitle}",${a.gpa},${a.satScore || ''},"${a.status}",${a.scholarshipPct},"${a.submissionDate}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Apex_University_Admissions_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('Admissions ledger exported to CSV!');
  };

  return (
    <div className="space-y-10 pb-16 bg-slate-50 min-h-screen">
      
      {/* Admin Header */}
      <section className="bg-slate-900 border-b border-slate-800 pt-10 pb-10 text-white px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-800 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 font-serif font-bold text-3xl shadow-md">
              A
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" /> Administrative Access
                </span>
                <span className="text-xs text-slate-400 font-mono">Registry: Live</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Admissions & Enrollment Registry
              </h1>
              <p className="text-xs text-slate-300">
                Logged in as <strong>{user.name}</strong> • {user.department || 'Directorate of Admissions'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Candidate</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleResetDemoData}
              title="Reset records to factory defaults"
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="p-4 bg-slate-900 text-amber-400 border border-amber-500/40 text-xs font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-white font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Total Applications
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-slate-900">{totalApps}</span>
              <span className="text-[11px] text-amber-700 font-bold uppercase">All Schools</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Admitted Candidates
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-emerald-700">{admittedCount}</span>
              <span className="text-[11px] text-emerald-800 font-bold uppercase">
                {totalApps > 0 ? `${Math.round((admittedCount / totalApps) * 100)}% Rate` : '0%'}
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Merit Grants Disbursed
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-amber-700">{meritGrantsCount}</span>
              <span className="text-[11px] text-slate-500 font-bold uppercase">Waivers</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Applicant Pool Avg GPA
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-serif font-bold text-slate-900">{avgGpa}</span>
              <span className="text-[11px] text-slate-500 font-mono">/ 4.0 Scale</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate, email, Ref ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-amber-600 font-medium"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-amber-600" />
              <span>Division:</span>
            </div>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
            >
              <option value="All">All 6 Divisions</option>
              {UNIVERSITY_DIVISIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name.replace('School of ', '')}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold uppercase tracking-wider ml-2">
              <span>Status:</span>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Under Evaluation">Under Evaluation</option>
              <option value="Merit Awarded">Merit Awarded</option>
              <option value="Admitted">Admitted</option>
              <option value="Waitlisted">Waitlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

        </div>

        {/* Candidate Applications Table */}
        <div className="bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center border-b border-slate-800">
            <h3 className="font-serif font-bold text-base text-white">
              Candidate Registry ({filteredApps.length} records)
            </h3>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Live Real-Time Synced Database
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Ref ID / Candidate</th>
                  <th className="py-3.5 px-4">School & Major</th>
                  <th className="py-3.5 px-4 text-center">GPA / SAT</th>
                  <th className="py-3.5 px-4 text-center">Merit Grant</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500">
                      No candidate records found matching the current search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Name & ID */}
                      <td className="py-3.5 px-4">
                        <div className="font-serif font-bold text-slate-900 text-sm">
                          {app.applicantName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span className="font-mono text-amber-700 font-bold">{app.id}</span>
                          <span>•</span>
                          <span>{app.email}</span>
                        </div>
                      </td>

                      {/* School & Major */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800">{app.degreeTitle}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {app.divisionName}
                        </div>
                      </td>

                      {/* GPA & SAT */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="font-mono font-bold text-slate-900">
                          {app.gpa.toFixed(2)}
                        </div>
                        {app.satScore && (
                          <div className="text-[10px] text-slate-500 font-mono">
                            SAT: {app.satScore}
                          </div>
                        )}
                      </td>

                      {/* Merit Grant */}
                      <td className="py-3.5 px-4 text-center">
                        {app.scholarshipPct > 0 ? (
                          <span className="inline-block px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-800 font-bold text-[11px]">
                            {app.scholarshipPct}% Waiver
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">0%</span>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleQuickStatusChange(app.id, e.target.value as ApplicationStatus)
                          }
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 border transition-colors ${
                            app.status === 'Admitted' || app.status === 'Merit Awarded'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : app.status === 'Under Evaluation'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : app.status === 'Waitlisted'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : app.status === 'Rejected'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-slate-50 text-slate-700 border-slate-300'
                          }`}
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Under Evaluation">Under Evaluation</option>
                          <option value="Merit Awarded">Merit Awarded</option>
                          <option value="Admitted">Admitted</option>
                          <option value="Waitlisted">Waitlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDossier(app)}
                            className="p-1.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 border border-slate-300 transition-colors"
                            title="Review full dossier, remarks, and scholarship"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteApp(app.id, app.applicantName)}
                            className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-700 border border-slate-300 transition-colors"
                            title="Remove candidate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* EDIT CANDIDATE DOSSIER MODAL */}
      {dossierApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="bg-white border border-slate-300 w-full max-w-2xl shadow-2xl overflow-hidden my-6 text-slate-900">
            
            {/* Dossier Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  Admissions Evaluation Dossier • {dossierApp.id}
                </div>
                <h3 className="font-serif font-bold text-xl text-white">
                  {dossierApp.applicantName}
                </h3>
              </div>
              <button
                onClick={() => setDossierApp(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDossier} className="p-6 space-y-5">
              
              {/* Top Quick Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Candidate GPA:</span>
                  <span className="font-mono font-bold text-slate-900">{dossierApp.gpa.toFixed(2)} / 4.0</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">SAT Score:</span>
                  <span className="font-mono font-bold text-slate-900">{dossierApp.satScore || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Division:</span>
                  <span className="font-bold text-slate-900 truncate block">{dossierApp.divisionName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Major:</span>
                  <span className="font-bold text-slate-900 truncate block">{dossierApp.degreeTitle}</span>
                </div>
              </div>

              {/* Statement of Purpose */}
              {dossierApp.sopText && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Candidate Statement of Purpose
                  </label>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-serif italic">
                    "{dossierApp.sopText}"
                  </div>
                </div>
              )}

              {/* Uploaded Transcripts */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Attached Transcripts & Certificates
                </label>
                <div className="space-y-1">
                  {dossierApp.documentsUploaded && dossierApp.documentsUploaded.length > 0 ? (
                    dossierApp.documentsUploaded.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 text-xs">
                        <span className="flex items-center gap-2 text-slate-800">
                          <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                          {doc}
                        </span>
                        <span className="text-[10px] font-bold uppercase text-emerald-700">Verified</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No files attached.</p>
                  )}
                </div>
              </div>

              {/* Status and Scholarship Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Admissions Decision Status *
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ApplicationStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-amber-600"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Evaluation">Under Evaluation</option>
                    <option value="Merit Awarded">Merit Awarded</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Waitlisted">Waitlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Merit Scholarship Waiver % (0 - 100%)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={editScholarship}
                      onChange={(e) => setEditScholarship(parseInt(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-xs w-12 text-right text-amber-700">
                      {editScholarship}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Feedback Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Dean’s & Directorate Internal Feedback Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Verified by Physics Lab Chair; approved for 100% full waiver..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDossierApp(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest shadow-xs"
                >
                  Save Dossier Evaluation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ADD MANUAL APPLICANT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="bg-white border border-slate-300 w-full max-w-lg shadow-2xl overflow-hidden my-6 text-slate-900">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                  Directorate Portal
                </div>
                <h3 className="font-serif font-bold text-xl text-white">
                  Add Candidate Application
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualApp} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Candidate Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Nayab Irfan"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="nayab@example.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    High School / Institute *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualHighSchool}
                    onChange={(e) => setManualHighSchool(e.target.value)}
                    placeholder="Apex STEM Academy"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    GPA (4.0 Scale) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="2.0"
                    max="4.0"
                    required
                    value={manualGpa}
                    onChange={(e) => setManualGpa(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
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
                    value={manualSat}
                    onChange={(e) => setManualSat(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Assigned Engineering Division *
                </label>
                <select
                  value={manualDivisionId}
                  onChange={(e) => setManualDivisionId(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-600"
                >
                  {UNIVERSITY_DIVISIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest shadow-xs"
                >
                  Register Application
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
