import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
// Database
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

export async function GET() {
	try {
		await connectDB();

		const events = await Event.find().sort({ createdAt: -1 });

		return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
	} catch (error: Error | unknown) {
		return NextResponse.json({ message: 'Event fetching failed', error: (error as Error)?.message || 'Unknown error' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const formData = await request.formData();

		let event = null;

		try {
			event = Object.fromEntries(formData.entries());
		} catch (error: Error | unknown) {
			return NextResponse.json({ message: 'Invalid JSON data format', }, { status: 400 });
		}

		const file = formData.get('image') as File;

		if (!file) return NextResponse.json({ message: 'Image file is required', }, { status: 400 });

		const image = await uploadImage(file);
		
		if (!image) return NextResponse.json({ message: 'Failed to upload image', }, { status: 500 });

		let tags: Array<string> = JSON.parse(formData.get('tags') as string);
		let agenda: Array<string> = JSON.parse(formData.get('agenda') as string);

		const createdEvent = await Event.create({
			...event,
			tags,
			agenda,
			image
		});

		return NextResponse.json({ message: 'Event Created Successfully', event: createdEvent }, { status: 201 });
	} catch (error: Error | unknown) {
		return NextResponse.json({ message: 'Event Creation Failed', error: (error as Error)?.message || 'Unknown error' }, { status: 500 });
	}
}

async function uploadImage(file: File): Promise<string | null> {
	try {
		const bytes: ArrayBuffer = await file.arrayBuffer();
		const buffer: Buffer = Buffer.from(bytes);
		let timestamp: number = Date.now();
		let randomString: string = Math.random().toString(36).substring(2, 15);
		let originalName: string = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
		let extension: string = path.extname(originalName);
		let filename: string = `${timestamp}-${randomString}${extension}`;
		let uploadsDir: string = path.join(process.cwd(), 'public', 'images');
		
		if (!existsSync(uploadsDir)) await mkdir(uploadsDir, { recursive: true });

		let filePath: string = path.join(uploadsDir, filename);

		await writeFile(filePath, buffer);

		return `/images/${filename}`;
	} catch (error: Error | unknown) {
		console.error('Error uploading image:', error);
		return null;
	}
}