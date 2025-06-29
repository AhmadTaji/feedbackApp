// app/api/submit-feedback/route.js
// import { NextResponse } from 'next/server';
// import clientPromise from "../../../lib/mongodb.js";

// export async function POST(request) {
//   const { name, rating, comments } = await request.json();

//   try {
//     const client = await clientPromise;
//     const db = client.db('feedback-db');
//     await db.collection('feedbacks').insertOne({ name, rating, comments, createdAt: new Date() });

//     return NextResponse.json({ message: 'Feedback saved!' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Database error' }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import clientPromise from "../../../lib/mongodb.js";

// const dbName = 'feedback-db';
// const collectionName = 'feedbacks';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const {
//       name,
//       comments,
//       rating,
//       teacher,
//       faculty,
//       department,
//     } = body;

//     const client = await clientPromise;
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     await collection.insertOne({
//       name,
//       comments,
//       rating,
//       teacher,
//       faculty,
//       department,
//       createdAt: new Date(),
//     });

//     return NextResponse.json({ message: 'Feedback stored' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to store feedback' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import clientPromise from "../../../lib/mongodb.js";

const dbName = 'feedback-db';
const collectionName = 'feedbacks';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      comments,
      rating,
      teacher,
      faculty,
      department,
      subject, // ✅ new field
    } = body;

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    await collection.insertOne({
      name,
      comments,
      rating,
      teacher,
      faculty,
      department,
      subject, // ✅ store it
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Feedback stored' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to store feedback' }, { status: 500 });
  }
}

// Optional: handle preflight CORS
export async function OPTIONS(req) {
  const origin = req.headers.get('origin') || '*';
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
