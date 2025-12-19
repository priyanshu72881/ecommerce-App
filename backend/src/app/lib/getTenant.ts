import { Tenant } from "@/models/tenant";
import { connectDB } from "./db";

export async function getTenantBySlug(slug: string) {
  try {
    await connectDB();
    return Tenant.findOne({ slug });
  } catch (err) {
    console.error("getTenantBySlug - DB connect failed:", err);
    // Development fallback: return a mock tenant so the UI can render
    if (process.env.NODE_ENV === "development") {
      return {
        name: slug ? String(slug).charAt(0).toUpperCase() + String(slug).slice(1) : "Demo Tenant",
        slug: slug || "demo",
      } as any;
    }
    // Re-throw in production so failures are visible
    throw err;
  }
}
