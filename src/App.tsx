import React, { useState, useEffect } from 'react';
import { NavTab, User } from './types';
import { getCurrentUser, logoutUser } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DivisionsPage } from './pages/DivisionsPage';
import { ResearchLabsPage } from './pages/ResearchLabsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { PortalPage } from './pages/PortalPage';
import { AiCounselorModal } from './components/AiCounselorModal';
import { ApplyModal } from './components/ApplyModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('cs-ai');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'student-login' | 'student-signup' | 'admin-login'>('student-login');

  // Modals state
  const [isAiCounselorOpen, setIsAiCounselorOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [preselectedDivForApply, setPreselectedDivForApply] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener('apex_auth_change', handleAuthChange);
    return () => {
      window.removeEventListener('apex_auth_change', handleAuthChange);
    };
  }, []);

  const openAuthModal = (mode: 'student-login' | 'student-signup' | 'admin-login' = 'student-login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    // Automatically transition to Portal view on login
    setActiveTab('portal');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const openApplyModal = (divisionId?: string) => {
    if (divisionId) {
      setPreselectedDivForApply(divisionId);
    }
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setPreselectedDivForApply(undefined);
  };

  const handleViewPortalFromApply = () => {
    setActiveTab('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openApplyModal={() => openApplyModal()}
        openAiCounselor={() => setIsAiCounselorOpen(true)}
        currentUser={currentUser}
        openAuthModal={openAuthModal}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            openApplyModal={openApplyModal}
            openAiCounselor={() => setIsAiCounselorOpen(true)}
            setSelectedDivisionId={setSelectedDivisionId}
          />
        )}

        {activeTab === 'divisions' && (
          <DivisionsPage
            selectedDivisionId={selectedDivisionId}
            setSelectedDivisionId={setSelectedDivisionId}
            openApplyModal={openApplyModal}
          />
        )}

        {activeTab === 'research' && (
          <ResearchLabsPage
            openAiCounselor={() => setIsAiCounselorOpen(true)}
          />
        )}

        {activeTab === 'admissions' && (
          <AdmissionsPage
            openApplyModal={() => openApplyModal()}
            openAiCounselor={() => setIsAiCounselorOpen(true)}
          />
        )}

        {activeTab === 'portal' && (
          <PortalPage
            currentUser={currentUser}
            openAuthModal={openAuthModal}
            openApplyModal={openApplyModal}
            openAiCounselor={() => setIsAiCounselorOpen(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openApplyModal={() => openApplyModal()}
        openAiCounselor={() => setIsAiCounselorOpen(true)}
      />

      {/* Modals */}
      <AiCounselorModal
        isOpen={isAiCounselorOpen}
        onClose={() => setIsAiCounselorOpen(false)}
        openApplyModal={() => openApplyModal()}
      />

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={closeApplyModal}
        preselectedDivisionId={preselectedDivForApply}
        currentUser={currentUser}
        onViewPortal={handleViewPortalFromApply}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
      />

    </div>
  );
}
