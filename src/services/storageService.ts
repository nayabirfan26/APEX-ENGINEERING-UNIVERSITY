import { User, AdmissionApplication, ApplicationStatus } from '../types';

const USERS_STORAGE_KEY = 'apex_university_users_db';
const CURRENT_USER_KEY = 'apex_university_current_user';
const APPLICATIONS_STORAGE_KEY = 'apex_university_applications_db';

// Initial Demo Accounts
export const DEMO_STUDENT: User = {
  id: 'usr-student-01',
  name: 'Zayn Ahmed',
  email: 'student@apex.edu',
  role: 'student',
  studentId: 'APX-ST-2026-042',
  department: 'School of Computer Science & Artificial Intelligence',
  phone: '+1 (555) 234-8901',
  joinedDate: 'August 2026',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  password: 'student123'
};

export const DEMO_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Dr. Eleanor Vance',
  email: 'admin@apex.edu',
  role: 'admin',
  department: 'Office of Admissions & Faculty Directorate',
  phone: '+1 (800) 555-APEX',
  joinedDate: 'January 2018',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  password: 'admin123'
};

// Initial Seed Applications for Admin / Student view
const INITIAL_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'AEU-2026-894102',
    userId: 'usr-student-01',
    applicantName: 'Zayn Ahmed',
    email: 'student@apex.edu',
    phone: '+1 (555) 234-8901',
    highSchool: 'St. Jude International Academy of STEM',
    gpa: 3.92,
    satScore: 1510,
    divisionId: 'cs-ai',
    divisionName: 'School of Computer Science & Artificial Intelligence',
    degreeTitle: 'B.S. in Computer Science & AI',
    degreeLevel: 'Undergraduate',
    sopText: 'Aspiring to research deep neural architectures and decentralized edge compute systems at Apex Engineering University.',
    scholarshipPct: 100,
    scholarshipTitle: 'Turing Presidential Full Merit Fellowship (100% Tuition Waiver)',
    tuitionEstimate: 0,
    status: 'Merit Awarded',
    submissionDate: '2026-08-15',
    lastUpdatedDate: '2026-08-20',
    adminNotes: 'Exceptional academic profile with 1510 SAT. Approved for Presidential 100% Fellowship by Dean.',
    documentsUploaded: ['High_School_Transcript_Official.pdf', 'SAT_Score_Report.pdf', 'Statement_of_Purpose.pdf']
  },
  {
    id: 'AEU-2026-783109',
    applicantName: 'Maya Lin',
    email: 'maya.lin@gmail.com',
    phone: '+1 (555) 432-8765',
    highSchool: 'Pacific Science & Technology High',
    gpa: 3.78,
    satScore: 1440,
    divisionId: 'aero-space',
    divisionName: 'School of Aerospace & Space Systems',
    degreeTitle: 'B.S. in Aerospace & Rocket Propulsion',
    degreeLevel: 'Undergraduate',
    sopText: 'Passionate about hypersonic aerodynamics, reusable orbital rocket stages, and autonomous flight guidance systems.',
    scholarshipPct: 75,
    scholarshipTitle: 'Von Karman Dean’s Merit Award (75% Tuition Waiver)',
    tuitionEstimate: 6250,
    status: 'Admitted',
    submissionDate: '2026-08-18',
    lastUpdatedDate: '2026-08-22',
    adminNotes: 'Excellent rocketry club leadership experience and strong physics coursework. Offer issued.',
    documentsUploaded: ['Transcript_Official.pdf', 'Recommendation_Letter_Physics.pdf']
  },
  {
    id: 'AEU-2026-654210',
    applicantName: 'David K. O’Connor',
    email: 'david.oconnor@yahoo.com',
    phone: '+1 (555) 876-1234',
    highSchool: 'Midwest STEM Preparatory',
    gpa: 3.55,
    satScore: 1380,
    divisionId: 'ece-quantum',
    divisionName: 'School of Electrical & Quantum Systems',
    degreeTitle: 'B.S. in Quantum Hardware & Microelectronics',
    degreeLevel: 'Undergraduate',
    sopText: 'Focusing on superconductor qubit fabrication and VLSI chip synthesis.',
    scholarshipPct: 50,
    scholarshipTitle: 'Apex Engineering Merit Grant (50% Tuition Waiver)',
    tuitionEstimate: 12500,
    status: 'Under Evaluation',
    submissionDate: '2026-08-21',
    lastUpdatedDate: '2026-08-23',
    adminNotes: 'Transcripts in review with Quantum Lab department head.',
    documentsUploaded: ['Academic_Record.pdf', 'Essay.pdf']
  },
  {
    id: 'AEU-2026-541908',
    applicantName: 'Sofia Rossi',
    email: 'sofia.rossi@tech.eu',
    phone: '+39 06 6987 1234',
    highSchool: 'Milan Polytechnic Preparatory',
    gpa: 3.88,
    satScore: 1480,
    divisionId: 'bme-nano',
    divisionName: 'School of Biomedical & Neural Engineering',
    degreeTitle: 'M.S. in Neural Prosthetics & Bio-Robotics',
    degreeLevel: 'Postgraduate',
    sopText: 'Conducting graduate research in cortical brain-computer interfaces and robotic limb neural integration.',
    scholarshipPct: 100,
    scholarshipTitle: 'Full Graduate Research Fellowship with Stipend',
    tuitionEstimate: 0,
    status: 'Admitted',
    submissionDate: '2026-08-10',
    lastUpdatedDate: '2026-08-16',
    adminNotes: 'Direct admission to BME Neural Interfaces Lab under Dr. Elena Ramos.',
    documentsUploaded: ['Undergrad_Degree_Certificate.pdf', 'GRE_Report.pdf', 'Research_Proposal.pdf']
  },
  {
    id: 'AEU-2026-432890',
    applicantName: 'Tariq Al-Mansoor',
    email: 'tariq.mansoor@gulftech.edu',
    phone: '+971 50 123 4567',
    highSchool: 'Dubai Emirates Science College',
    gpa: 3.42,
    satScore: 1320,
    divisionId: 'mech-robotics',
    divisionName: 'School of Mechanical & Autonomous Robotics',
    degreeTitle: 'B.S. in Mechatronics & Bipedal Robotics',
    degreeLevel: 'Undergraduate',
    sopText: 'Desire to specialize in autonomous humanoid robotics and actuator dynamic control.',
    scholarshipPct: 25,
    scholarshipTitle: 'University STEM Entrance Grant (25% Tuition Waiver)',
    tuitionEstimate: 18750,
    status: 'Pending Review',
    submissionDate: '2026-08-23',
    lastUpdatedDate: '2026-08-23',
    adminNotes: 'Application received. Pending secondary physics evaluation.',
    documentsUploaded: ['HighSchool_Transcript.pdf']
  }
];

// Helper to get all users
export const getStoredUsers = (): User[] => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const initialUsers = [DEMO_STUDENT, DEMO_ADMIN];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(raw);
  } catch {
    return [DEMO_STUDENT, DEMO_ADMIN];
  }
};

// Register / Save a new user
export const registerUser = (userData: {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role?: 'student' | 'admin';
  department?: string;
}): { success: boolean; user?: User; error?: string } => {
  const users = getStoredUsers();
  const normalizedEmail = userData.email.trim().toLowerCase();

  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return { success: false, error: 'An account with this email address is already registered. Please sign in.' };
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newUser: User = {
    id: `usr-${Date.now()}-${randomNum}`,
    name: userData.name.trim(),
    email: normalizedEmail,
    role: userData.role || 'student',
    studentId: `APX-ST-2026-${randomNum}`,
    department: userData.department || 'School of Computer Science & AI',
    phone: userData.phone || '+1 (555) 000-0000',
    joinedDate: 'August 2026',
    password: userData.password || 'password123',
    avatar: `https://images.unsplash.com/photo-${1534528741775 + (randomNum % 100)}?auto=format&fit=crop&w=200&q=80`
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  setCurrentUser(newUser);

  return { success: true, user: newUser };
};

// Authenticate / Login User
export const authenticateUser = (
  email: string,
  password?: string,
  role?: 'student' | 'admin'
): { success: boolean; user?: User; error?: string } => {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return { success: false, error: 'No account found with this email. Please register first.' };
  }

  // If password provided and user has password, verify it
  if (password && user.password && user.password !== password) {
    return { success: false, error: 'Incorrect password. Please verify and try again.' };
  }

  // Role validation if specified
  if (role && user.role !== role) {
    return { success: false, error: `This account does not have ${role} privileges.` };
  }

  setCurrentUser(user);
  return { success: true, user };
};

// Current Logged In User
export const getCurrentUser = (): User | null => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
  // Dispatch custom event for immediate UI reaction
  window.dispatchEvent(new Event('apex_auth_change'));
};

export const logoutUser = (): void => {
  setCurrentUser(null);
};

// APPLICATIONS STORAGE MANAGEMENT

export const getStoredApplications = (): AdmissionApplication[] => {
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPLICATIONS;
  }
};

export const saveApplicationsList = (apps: AdmissionApplication[]): void => {
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
  window.dispatchEvent(new Event('apex_applications_change'));
};

// Add new application submitted by a student
export const addApplication = (appData: Omit<AdmissionApplication, 'id' | 'submissionDate' | 'status'> & { id?: string }): AdmissionApplication => {
  const currentApps = getStoredApplications();
  const today = new Date().toISOString().split('T')[0];
  const newId = appData.id || `AEU-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const newApp: AdmissionApplication = {
    ...appData,
    id: newId,
    submissionDate: today,
    lastUpdatedDate: today,
    status: appData.scholarshipPct >= 75 ? 'Merit Awarded' : 'Pending Review',
    adminNotes: `Application submitted online via Student Portal on ${today}.`
  };

  const updated = [newApp, ...currentApps];
  saveApplicationsList(updated);
  return newApp;
};

// Update an existing application (for Admin actions like status change, scholarship adjustment, notes)
export const updateApplicationStatus = (
  appId: string,
  updates: Partial<AdmissionApplication>
): boolean => {
  const currentApps = getStoredApplications();
  const index = currentApps.findIndex((a) => a.id === appId);
  if (index === -1) return false;

  const today = new Date().toISOString().split('T')[0];
  currentApps[index] = {
    ...currentApps[index],
    ...updates,
    lastUpdatedDate: today
  };

  saveApplicationsList(currentApps);
  return true;
};

// Delete an application (Admin tool)
export const deleteApplication = (appId: string): boolean => {
  const currentApps = getStoredApplications();
  const filtered = currentApps.filter((a) => a.id !== appId);
  if (filtered.length === currentApps.length) return false;
  saveApplicationsList(filtered);
  return true;
};

// Reset demo data to factory defaults
export const resetDemoStorage = (): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEMO_STUDENT, DEMO_ADMIN]));
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
  window.dispatchEvent(new Event('apex_applications_change'));
  window.dispatchEvent(new Event('apex_auth_change'));
};
