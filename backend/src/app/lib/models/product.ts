import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
  




  name: String,
  price: Number,
  description: String,
  images: [String],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
