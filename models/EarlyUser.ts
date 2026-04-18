import mongoose, { Model, Schema, Document } from "mongoose";

export interface IEarlyUser extends Document {
  email: string;
  username?: string;
  createdAt: Date;
}

const EarlyUserSchema = new Schema<IEarlyUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.EarlyUser as Model<IEarlyUser>) ||
  mongoose.model<IEarlyUser>("EarlyUser", EarlyUserSchema);