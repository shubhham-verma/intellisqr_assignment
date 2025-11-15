import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
    message: string;
    stack?: string;
    route: string;
    timestamp: Date;
}

const LogSchema = new Schema<ILog>({
    message: { type: String, required: true },
    stack: { type: String },
    route: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Log || mongoose.model<ILog>("Log", LogSchema);
