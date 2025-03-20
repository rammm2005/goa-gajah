import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
    const filePath = path.join(process.cwd(), "public", "testimonials.json");

    try {
        await fs.access(filePath);

        const fileData = await fs.readFile(filePath, "utf-8");

        const testimonials = fileData.trim() ? JSON.parse(fileData) : [];

        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json([], { status: 200 });
    }
}
