import bcrypt from 'bcryptjs';
import { User } from './models/User.js';
import { Application } from './models/Application.js';
import { isMongoConnected } from './db.js';

export interface UserDTO {
  id: string;
  full_name: string;
  email: string;
  role: 'student' | 'admin';
  created_at: Date;
}

export interface ApplicationDTO {
  id: string;
  student_id: string;
  student_name?: string;
  student_email?: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: Date;
  gpa?: string;
  statement?: string;
}

// In-memory fallback dataset
let memoryUsers: (UserDTO & { password_hash: string })[] = [];
let memoryApplications: ApplicationDTO[] = [];

// Seed initial demo data
async function seedMemoryStore() {
  if (memoryUsers.length === 0) {
    const adminPassHash = await bcrypt.hash('admin123', 10);
    const studentPassHash = await bcrypt.hash('student123', 10);

    const adminUser = {
      id: '507f1f77bcf86cd799439011',
      full_name: 'Dean Arthur Vance',
      email: 'admin@apex.edu',
      password_hash: adminPassHash,
      role: 'admin' as const,
      created_at: new Date('2026-01-01'),
    };

    const studentUser = {
      id: '507f1f77bcf86cd799439012',
      full_name: 'Elena Rostova',
      email: 'elena@apex.edu',
      password_hash: studentPassHash,
      role: 'student' as const,
      created_at: new Date('2026-02-15'),
    };

    memoryUsers.push(adminUser, studentUser);

    memoryApplications.push({
      id: '607f1f77bcf86cd799439099',
      student_id: studentUser.id,
      student_name: studentUser.full_name,
      student_email: studentUser.email,
      program: 'M.S. Artificial Intelligence & Quantum Computing',
      status: 'pending',
      submitted_at: new Date(),
      gpa: '3.92',
      statement: 'Passionate about quantum neural networks and hybrid AI architectures.',
    });
  }
}

seedMemoryStore();

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (isMongoConnected) {
    try {
      const doc = await (User as any).findOne({ email: normalizedEmail }).exec();
      if (doc) {
        return {
          id: doc._id.toString(),
          full_name: doc.full_name,
          email: doc.email,
          password_hash: doc.password || '',
          role: doc.role as 'student' | 'admin',
          created_at: doc.created_at,
        };
      }
    } catch (e) {
      console.warn('Mongoose query failed, using memory fallback:', e);
    }
  }

  const found = memoryUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  return found || null;
}

export async function findUserById(id: string) {
  if (isMongoConnected) {
    try {
      const doc = await (User as any).findById(id).exec();
      if (doc) {
        return {
          id: doc._id.toString(),
          full_name: doc.full_name,
          email: doc.email,
          role: doc.role as 'student' | 'admin',
          created_at: doc.created_at,
        };
      }
    } catch (e) {
      console.warn('Mongoose query failed, using memory fallback:', e);
    }
  }

  const found = memoryUsers.find(u => u.id === id);
  if (!found) return null;
  const { password_hash, ...dto } = found;
  return dto;
}

export async function createUser(data: { full_name: string; email: string; password_hash: string; role?: 'student' | 'admin' }) {
  const normalizedEmail = data.email.trim().toLowerCase();
  const role = data.role || 'student';

  if (isMongoConnected) {
    try {
      const doc = new User({
        full_name: data.full_name,
        email: normalizedEmail,
        password: data.password_hash,
        role,
        created_at: new Date(),
      });
      await doc.save();
      return {
        id: doc._id.toString(),
        full_name: doc.full_name,
        email: doc.email,
        role: doc.role as 'student' | 'admin',
        created_at: doc.created_at,
      };
    } catch (e) {
      console.warn('Mongoose save failed, using memory store:', e);
    }
  }

  const newId = (Date.now() + Math.floor(Math.random() * 1000)).toString(16).padStart(24, '0');
  const newUser = {
    id: newId,
    full_name: data.full_name,
    email: normalizedEmail,
    password_hash: data.password_hash,
    role,
    created_at: new Date(),
  };
  memoryUsers.push(newUser);

  const { password_hash, ...dto } = newUser;
  return dto;
}

export async function createApplication(data: { student_id: string; program: string; gpa?: string; statement?: string }) {
  const student = await findUserById(data.student_id);

  if (isMongoConnected) {
    try {
      const doc = new Application({
        student_id: data.student_id,
        program: data.program,
        status: 'pending',
        submitted_at: new Date(),
        gpa: data.gpa || '3.85',
        statement: data.statement || '',
      });
      await doc.save();
      return {
        id: doc._id.toString(),
        student_id: doc.student_id.toString(),
        student_name: student?.full_name || 'Student',
        student_email: student?.email || '',
        program: doc.program,
        status: doc.status as 'pending' | 'approved' | 'rejected',
        submitted_at: doc.submitted_at,
        gpa: doc.gpa,
        statement: doc.statement,
      };
    } catch (e) {
      console.warn('Mongoose application creation failed, using memory store:', e);
    }
  }

  const newId = (Date.now() + Math.floor(Math.random() * 1000)).toString(16).padStart(24, '0');
  const appDTO: ApplicationDTO = {
    id: newId,
    student_id: data.student_id,
    student_name: student?.full_name || 'Student',
    student_email: student?.email || '',
    program: data.program,
    status: 'pending',
    submitted_at: new Date(),
    gpa: data.gpa || '3.85',
    statement: data.statement || '',
  };
  memoryApplications.unshift(appDTO);
  return appDTO;
}

export async function getStudentApplications(student_id: string) {
  if (isMongoConnected) {
    try {
      const docs = await (Application as any).find({ student_id }).sort({ submitted_at: -1 }).exec();
      const student = await findUserById(student_id);
      return docs.map((doc: any) => ({
        id: doc._id.toString(),
        student_id: doc.student_id.toString(),
        student_name: student?.full_name || 'Student',
        student_email: student?.email || '',
        program: doc.program,
        status: doc.status as 'pending' | 'approved' | 'rejected',
        submitted_at: doc.submitted_at,
        gpa: doc.gpa,
        statement: doc.statement,
      }));
    } catch (e) {
      console.warn('Mongoose query failed:', e);
    }
  }

  return memoryApplications.filter(a => a.student_id === student_id);
}

export async function getAllApplications() {
  if (isMongoConnected) {
    try {
      const docs = await (Application as any).find().populate('student_id', 'full_name email').sort({ submitted_at: -1 }).exec();
      return docs.map((doc: any) => {
        const student = doc.student_id as unknown as { _id: string; full_name: string; email: string } | null;
        return {
          id: doc._id.toString(),
          student_id: student?._id?.toString() || doc.student_id?.toString() || '',
          student_name: student?.full_name || 'Student Applicant',
          student_email: student?.email || 'N/A',
          program: doc.program,
          status: doc.status as 'pending' | 'approved' | 'rejected',
          submitted_at: doc.submitted_at,
          gpa: doc.gpa,
          statement: doc.statement,
        };
      });
    } catch (e) {
      console.warn('Mongoose query failed:', e);
    }
  }

  return memoryApplications;
}

export async function updateApplicationStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  if (isMongoConnected) {
    try {
      const doc = await (Application as any).findByIdAndUpdate(id, { status }, { new: true }).exec();
      if (doc) {
        const student = await findUserById(doc.student_id.toString());
        return {
          id: doc._id.toString(),
          student_id: doc.student_id.toString(),
          student_name: student?.full_name || 'Student',
          student_email: student?.email || '',
          program: doc.program,
          status: doc.status as 'pending' | 'approved' | 'rejected',
          submitted_at: doc.submitted_at,
          gpa: doc.gpa,
          statement: doc.statement,
        };
      }
    } catch (e) {
      console.warn('Mongoose update failed:', e);
    }
  }

  const app = memoryApplications.find(a => a.id === id);
  if (app) {
    app.status = status;
    return app;
  }
  return null;
}
