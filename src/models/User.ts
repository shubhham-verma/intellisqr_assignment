import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    resetToken?: string | null;
    resetTokenExpiry?: Date | null;
};

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        resetToken: { type: String, default: null },
        resetTokenExpiry: { type: Date, default: null }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);