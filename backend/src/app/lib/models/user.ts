import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, index: true },
  password: String, // hashed
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
