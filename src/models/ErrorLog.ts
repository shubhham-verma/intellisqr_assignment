import mongoose, { Schema } from "mongoose";

const errorSchema = new Schema({
    route: String,
    message: String,
    stack: String,
    meta: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ErrorLog || mongoose.model("ErrorLog", errorSchema);
