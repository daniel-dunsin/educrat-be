import mongoose, { DefaultSchemaOptions, SchemaDefinition } from 'mongoose';

export default function createSchema<T = unknown>(schema: SchemaDefinition<T>, options?: DefaultSchemaOptions) {
     return new mongoose.Schema<T>(schema, {
          timestamps: true,
          virtuals: true,
          toJSON: { virtuals: true },
          toObject: { virtuals: true },
          ...options,
     });
}
