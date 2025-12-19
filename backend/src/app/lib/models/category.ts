import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  name: String,
  slug: { type: String, index: true },
}, { timestamps: true });

export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
