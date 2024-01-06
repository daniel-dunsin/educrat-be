import { Types } from 'mongoose';

export interface DefaultModel {
     _id: string;
     createdAt: Date;
     updatedAt: Date;
}

export type Relations<T = unknown> = string | Types.ObjectId | T;
