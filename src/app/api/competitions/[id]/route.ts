import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET /api/competitions/[id] - Get a specific competition
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const client = await clientPromise;
    const db = client.db('quizCompetition');
    
    const competition = await db.collection('competitions').findOne({ _id: id });
    
    if (!competition) {
      return NextResponse.json(
        { error: 'Competition not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(competition);
  } catch (error) {
    console.error('Error fetching competition:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competition' },
      { status: 500 }
    );
  }
}
