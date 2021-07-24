import { Types } from "mongoose";

export interface FindUserFilter {
  email?: string
  googleId?: string
  githubId?: string
  project?: string,
  'projects.project'?: Types.ObjectId
}