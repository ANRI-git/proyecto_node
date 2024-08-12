import { mongoose } from 'mongoose';
const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const User = mongoose.model('User', userSchema);
