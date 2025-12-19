// models/tenant.ts

import mongoose, { Schema } from "mongoose";

// Define the schema as usual
const TenantSchema = new Schema({
    name: String,
    slug: { type: String, unique: true, index: true },
    logoUrl: String,
    primaryColor: String,
    secondaryColor: String,
    accentColor: String,
    backgroundColor: String,
    font: String,
        // whether tenant setup is complete (persisted)
        setupCompleted: { type: Boolean, default: false },
        // persisted card size options
        cardSizes: {
            home: { type: String, default: 'medium' },
            shop: { type: String, default: 'medium' },
            blog: { type: String, default: 'medium' },
        },
}, { timestamps: true });

/**
 * Check if the model already exists on the Mongoose instance.
 * In Next.js, this prevents the Model from being compiled multiple times
 * due to Hot Module Replacement (HMR) and serverless function cold starts.
 *
 * It uses the short-circuiting pattern:
 * 1. Try to get the existing model: mongoose.models.Tenant
 * 2. If it doesn't exist (i.e., is undefined), create and register it: mongoose.model("Tenant", TenantSchema)
 */
export const Tenant = mongoose.models.Tenant || mongoose.model("Tenant", TenantSchema);

// If you prefer default exports:
// export default mongoose.models.Tenant || mongoose.model("Tenant", TenantSchema);