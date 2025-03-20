import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import { promises as fs } from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false, // Disable automatic body parsing
    },
};

async function createIncomingMessage(req: NextRequest) {
    const bodyBuffer = Buffer.from(await req.arrayBuffer());
    const readable = new Readable();
    readable.push(bodyBuffer);
    readable.push(null);

    // Membuat object mirip IncomingMessage
    const fakeReq = Object.assign(readable, {
        headers: {
            "content-type": req.headers.get("content-type") || "",
            "content-length": bodyBuffer.length.toString(),
        },
    });

    return fakeReq;
}

export async function POST(req: NextRequest) {
    try {
        const fakeReq = await createIncomingMessage(req);

        const form = new IncomingForm({
            multiples: false,
            uploadDir: path.join(process.cwd(), "public", "uploads"),
            keepExtensions: true,
        });

        const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
            form.parse(fakeReq as any, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        console.log("FILES:", files);

        const getValue = (field: any) => (Array.isArray(field) ? field[0] : field);

        const name = getValue(fields.name);
        const rating = getValue(fields.rating);
        const country = getValue(fields.country);
        const city = getValue(fields.city);
        const feedback = getValue(fields.feedback);

        if (!name || !country || !city || !feedback || isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        const imageUrls: string[] = [];

        if (files.images) {
            const imagesArray = Array.isArray(files.images) ? files.images : [files.images];

            for (const image of imagesArray) {
                if (allowedTypes.includes(image.mimetype)) {
                    const newFilename = `${Date.now()}_${image.originalFilename}`;
                    const filePath = path.join(process.cwd(), "public", "uploads", newFilename);
                    await fs.rename(image.filepath, filePath);
                    imageUrls.push(`/uploads/${newFilename}`);
                }
            }
        }

        const filePath = path.join(process.cwd(), "public", "testimonials.json");
        let testimonials = [];

        try {
            await fs.access(filePath);
            const fileData = await fs.readFile(filePath, "utf-8");
            testimonials = fileData.trim() ? JSON.parse(fileData) : [];
        } catch (error) {
            testimonials = [];
        }

        const newTestimonial = { name, rating: Number(rating), country, city, feedback, images: imageUrls };
        testimonials.push(newTestimonial);
        await fs.writeFile(filePath, JSON.stringify(testimonials, null, 2));

        return NextResponse.json({ message: "Testimonial berhasil disimpan", testimonial: newTestimonial });
    } catch (error) {
        console.error("Error saat menyimpan testimoni:", error);
        return NextResponse.json({ error: "Terjadi kesalahan saat menyimpan testimoni" }, { status: 500 });
    }
}

