import mongoose, { DefaultSchemaOptions, SchemaDefinition, SchemaOptions } from 'mongoose';

export default function createSchema<T = unknown>(
     schema: SchemaDefinition<T>,
     options?: SchemaOptions<T> | DefaultSchemaOptions
) {
     return new mongoose.Schema<T>(schema, {
          timestamps: true,
          virtuals: true,
          toJSON: { virtuals: true },
          toObject: { virtuals: true },
          ...(options as Omit<DefaultSchemaOptions, 'timestamps'>),
     });
}
