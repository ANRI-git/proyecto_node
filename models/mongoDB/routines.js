import mongoose from 'mongoose';

// Mongo DB Schema

const routineSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
routineSchema.set('toJSON', {
  transform(_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
routineSchema.index({ name: 'text' });

export const Routine = mongoose.model('Routine', routineSchema);
