import { notFound } from 'next/navigation';
import Page from './CompetitionPage';
import { Competition } from '@/lib/models';

// Fetch competition data by ID
async function getCompetition(id: string): Promise<Competition | null> {
  try {
    const res = await fetch(
      process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}/api/competitions/${id}` 
        : `http://localhost:3000/api/competitions/${id}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch competition');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching competition:', error);
    return null;
  }
}

// Generate dynamic metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const competition = await getCompetition(params.id);
  
  if (!competition) {
    return {
      title: 'Competition not found',
    };
  }
  
  return {
    title: `${competition.title} - Quiz Competition`,
    description: competition.description,
  };
}

export default async function CompetitionPage({ params }: { params: { id: string } }) {
  const competition = await getCompetition(params.id);
  
  if (!competition) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {competition.title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {competition.description}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <Page competition={competition} />
        </div>
      </div>
    </div>
  );
}
