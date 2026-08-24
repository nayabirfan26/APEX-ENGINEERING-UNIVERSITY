export type NavTab = 'home' | 'divisions' | 'research' | 'admissions' | 'portal';

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  avatar?: string;
  joinedDate: string;
  phone?: string;
  password?: string;
}

export type ApplicationStatus =
  | 'Pending Review'
  | 'Under Evaluation'
  | 'Merit Awarded'
  | 'Admitted'
  | 'Waitlisted'
  | 'Rejected';

export interface AdmissionApplication {
  id: string;
  userId?: string;
  applicantName: string;
  email: string;
  phone: string;
  highSchool: string;
  gpa: number;
  satScore?: number;
  divisionId: string;
  divisionName: string;
  degreeTitle: string;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'PhD';
  sopText?: string;
  scholarshipPct: number;
  scholarshipTitle: string;
  tuitionEstimate: number;
  status: ApplicationStatus;
  submissionDate: string;
  lastUpdatedDate?: string;
  adminNotes?: string;
  documentsUploaded: string[];
}

export interface DegreeProgram {
  title: string;
  level: 'Undergraduate' | 'Postgraduate' | 'PhD';
  duration: string;
  credits: number;
  description: string;
}

export interface StudentProject {
  title: string;
  studentNames: string;
  description: string;
  award?: string;
  tags: string[];
}

export interface FacultyMember {
  name: string;
  role: string;
  specialization: string;
  email: string;
  image: string;
}

export interface EngineeringDivision {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  heroImage: string;
  iconName: string;
  accentColor: string; // Tailwind color class e.g. "blue"
  hodName: string;
  hodTitle: string;
  hodQuote: string;
  stats: {
    studentsCount: number;
    facultyCount: number;
    labCount: number;
    employmentRate: string;
  };
  degrees: DegreeProgram[];
  coreLabs: string[];
  careerPaths: string[];
  notableProjects: StudentProject[];
  keyFaculty: FacultyMember[];
}

export interface ResearchLab {
  id: string;
  name: string;
  divisionId: string;
  divisionName: string;
  category: 'AI & Robotics' | 'Quantum Tech' | 'Renewables & Energy' | 'Nanotech' | 'Aerospace' | 'Biomedical';
  summary: string;
  fullOverview: string;
  image: string;
  director: string;
  equipmentList: string[];
  activeGrants: string;
  fundingBody: string;
  featuredPublication: {
    title: string;
    journal: string;
    year: number;
  };
  metrics: {
    researchersCount: number;
    patentsFiled: number;
    annualFunding: string;
  };
}

export interface FeeStructure {
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'PhD';
  tuitionPerCredit: number;
  creditsPerYear: number;
  labFeePerSemester: number;
  admissionFeeOneTime: number;
  hostelFeePerYear: number;
}

export interface AdmissionDeadline {
  id: string;
  term: string;
  level: 'Undergraduate' | 'Postgraduate' | 'PhD';
  applicationOpens: string;
  deadlineDate: string;
  decisionDate: string;
  status: 'Open' | 'Upcoming' | 'Closed';
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Symposium' | 'Open Day' | 'Workshop' | 'Hackathon';
  summary: string;
  speaker: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Research Breakthrough' | 'Campus News' | 'Student Achievement' | 'Global Partner';
  summary: string;
  readTime: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  degree: string;
  year: string;
  currentRole: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Admissions' | 'Scholarships' | 'Housing';
}
