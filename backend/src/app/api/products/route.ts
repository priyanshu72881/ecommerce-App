import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";

// CREATE PRODUCT
export async function POST(req: Request) {
  try {
    await connectDB();

    const { tenantId, name, price, description, images, categoryId } =
      await req.json();

    if (!tenantId || !name || !price || !categoryId) {
      return NextResponse.json(
        {
          success: false,
          message: "tenantId, name, price, categoryId required",
        },
        { status: 400 }
      );
    }

    const product = await Product.create({
      tenantId,
      name,
      price,
      description,
      images,
      categoryId,
    });

    return NextResponse.json(
      { success: true, product, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product POST Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
}

// GET PRODUCT LIST BY TENANT
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");
    const categorySlug = searchParams.get("category");

    // Support optional category filtering by slug
    let query: any = {};
    if (tenantId) query.tenantId = tenantId;

    if (categorySlug) {
      // try to find category by slug (scoped to tenant if tenantId provided)
      const { Category } = await import("@/models/category");
      const catQuery: any = { slug: categorySlug };
      if (tenantId) catQuery.tenantId = tenantId;
      const cat = await Category.findOne(catQuery);
      if (cat) {
        query.categoryId = cat._id;
      } else {
        // If no category matched, try to match by exact name string field in sample dataset
        query = { ...query, name: { $regex: categorySlug, $options: "i" } };
      }
    }

    const products = await Product.find(query);

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Product GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
}
