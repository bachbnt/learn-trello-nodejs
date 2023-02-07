import DbSchema from '@constants/dbSchema';
import mongoose, { Document, Schema } from 'mongoose';

export enum IssueType {
  TASK = 'TASK',
  BUG = 'BUG',
  STORY = 'STORY',
  EPIC = 'EPIC',
}

export enum IssuePriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum IssueStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CLOSED = 'CLOSED',
}

export interface Issue {
  name: string;
  key: string;
  description?: string;
  type: IssueType;
  priority: IssuePriority;
  status: IssueStatus;
  project: string;
  assignee?: string;
  reporter: string;
}

export type IssueDocument = Issue & Document;

export const issueSchema = new Schema(
  {
    name: { type: String, require: true },
    key: { type: String, require: true },
    description: { type: String },
    type: {
      type: String,
      require: true,
      enum: IssueType,
      default: IssueType.TASK,
    },
    priority: {
      type: String,
      require: true,
      enum: IssuePriority,
      default: IssuePriority.MEDIUM,
    },
    status: {
      type: String,
      require: true,
      enum: IssueStatus,
      default: IssueStatus.OPEN,
    },
    project: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: DbSchema.PROJECT,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: DbSchema.USER,
    },
    reporter: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: DbSchema.USER,
    },
  },
  { collection: DbSchema.ISSUE, versionKey: false }
);

export const IssueModel = mongoose.model<IssueDocument>(
  DbSchema.ISSUE,
  issueSchema
);
