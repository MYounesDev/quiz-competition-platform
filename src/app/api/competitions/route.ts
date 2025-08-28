import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Competition } from '@/lib/models';
import { nanoid } from 'nanoid';

// GET /api/competitions - Get all competitions
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('quizCompetition');
    
    const competitions = await db
      .collection('competitions')
      .find({})
      .project({ title: 1, description: 1, questions: { $size: "$questions" } })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(competitions);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitions' },
      { status: 500 }
    );
  }
}

// POST /api/competitions - Create a new competition
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.questions || body.questions.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('quizCompetition');
    
    // Create competition with custom ID using nanoid
    const competition: Competition = {
      _id: nanoid(10), // Generate a 10-character ID
      title: body.title,
      description: body.description,
      questions: body.questions.map((q: any) => ({
        questionText: q.questionText,
        options: q.options,
        correctIndex: q.correctIndex
      })),
      createdAt: new Date()
    };
    
    await db.collection('competitions').insertOne(competition as any);
    
    return NextResponse.json(competition, { status: 201 });
  } catch (error) {
    console.error('Error creating competition:', error);
    return NextResponse.json(
      { error: 'Failed to create competition' },
      { status: 500 }
    );
  }
}
