import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // our db connection

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET all pantry items
export async function GET() {
    try {
        const items = await prisma.pantryItem.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ items });
    } catch (error) {
        console.error("Error fetching pantry items:", error);
        return NextResponse.json({ error: "Failed to fetch pantry items" }, { status: 500 });
    }
}

// POST a new pantry item
export async function POST(req: Request) {
    try {
        const itemData = await req.json();

        // Handle Vercel Blob Upload
        if (itemData.image && itemData.image.startsWith('data:image')) {
            const base64Data = itemData.image.split(',')[1];
            // Infer mimeType if possible
            const mimeType = itemData.image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || "image/jpeg";
            const filename = `pantry-${Date.now()}-${Math.random().toString(36).substring(7)}`;

            // Call the Vercel Blob utility
            const { uploadImageToBlob } = await import('@/lib/blob');
            const imageUrl = await uploadImageToBlob(base64Data, filename, mimeType);
            itemData.image = imageUrl;
        }

        const newItem = await prisma.pantryItem.create({
            data: itemData,
        });
        return NextResponse.json({ item: newItem }, { status: 201 });
    } catch (error) {
        console.error("Error creating pantry item:", error);
        return NextResponse.json({ error: "Failed to add pantry item" }, { status: 500 });
    }
}

// PATCH to update an existing pantry item
export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: "Item ID is required for updating" }, { status: 400 });
        }

        const updatedItem = await prisma.pantryItem.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ item: updatedItem });
    } catch (error) {
        console.error("Error updating pantry item:", error);
        return NextResponse.json({ error: "Failed to update pantry item" }, { status: 500 });
    }
}
