// app/api/get-feedback/route.js
import { NextResponse } from 'next/server';
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('feedback-db');
    const feedbacks = await db.collection('feedbacks').find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}
