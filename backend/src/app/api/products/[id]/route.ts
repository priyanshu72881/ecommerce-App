import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";

// GET /api/products/:id
export async function GET(req: Request) {
	try {
		await connectDB();
		const url = new URL(req.url);
		const parts = url.pathname.split('/');
		const id = parts[parts.length - 1];
		if (!id) {
			return NextResponse.json({ success: false, message: 'id missing' }, { status: 400 });
		}
		const product = await Product.findById(id);
		if (!product) return NextResponse.json({ success: false, message: 'not found' }, { status: 404 });
		return NextResponse.json({ success: true, product });
	} catch (error) {
		console.error('Product GET by id Error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error }, { status: 500 });
	}
}

// PATCH /api/products/:id
export async function PATCH(req: Request) {
	try {
		await connectDB();
		const url = new URL(req.url);
		const parts = url.pathname.split('/');
		const id = parts[parts.length - 1];
		if (!id) {
			return NextResponse.json({ success: false, message: 'id missing' }, { status: 400 });
		}
		const body = await req.json();
		const updated = await Product.findByIdAndUpdate(id, body, { new: true });
		return NextResponse.json({ success: true, product: updated });
	} catch (error) {
		console.error('Product PATCH Error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error }, { status: 500 });
	}
}

// DELETE /api/products/:id
export async function DELETE(req: Request) {
	try {
		await connectDB();
		const url = new URL(req.url);
		const parts = url.pathname.split('/');
		const id = parts[parts.length - 1];
		if (!id) {
			return NextResponse.json({ success: false, message: 'id missing' }, { status: 400 });
		}
		await Product.findByIdAndDelete(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Product DELETE Error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error }, { status: 500 });
	}
}

