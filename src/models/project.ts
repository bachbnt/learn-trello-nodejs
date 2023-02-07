import DbSchema from '@constants/dbSchema';
import mongoose, { Document, Schema } from 'mongoose';
import { Issue } from './issue';
import { User } from './user';

export interface Project {
  name: string;
  key: string;
  members?: User[];
  issues?: Issue[];
}

export type ProjectDocument = Project & Document;

export const projectSchema = new Schema(
  {
    name: { type: String, require: true },
    key: { type: String, require: true },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        default: [],
        ref: DbSchema.USER,
      },
    ],
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        default: [],
        ref: DbSchema.ISSUE,
      },
    ],
  },
  { collection: DbSchema.PROJECT, versionKey: false }
);

export const ProjectModel = mongoose.model<ProjectDocument>(
  DbSchema.PROJECT,
  projectSchema
);
