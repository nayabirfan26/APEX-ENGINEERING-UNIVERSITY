import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  _id: mongoose.Types.ObjectId;
  student_id: mongoose.Types.ObjectId;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: Date;
  gpa?: string;
  statement?: string;
}

const ApplicationSchema: Schema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  program: {
    type: String,
    required: [true, 'Program is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
  gpa: {
    type: String,
    default: '3.8',
  },
  statement: {
    type: String,
    default: '',
  },
});

export const Application: mongoose.Model<IApplication> =
  (mongoose.models.Application as mongoose.Model<IApplication>) ||
  mongoose.model<IApplication>('Application', ApplicationSchema);
