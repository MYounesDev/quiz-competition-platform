'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { AnimatedSection, AnimatedContainer, AnimatedItem } from '@/components/ui/AnimatedSection';

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Fetch competitions
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/competitions');
        
        if (!res.ok) {
          throw new Error('Failed to fetch competitions');
        }
        
        const data = await res.json();
        setCompetitions(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching competitions:', err);
        setError('Failed to load competitions. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filter competitions based on search term
  const filteredCompetitions = competitions.filter((competition: any) => {
    return competition.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           competition.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400 mb-4">
            All Quiz Competitions 🎯
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse all available quizzes or use the search to find one on your favorite topic!
          </p>
        </AnimatedSection>

        {/* Search Bar */}
        <AnimatedSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search competitions by title or description..."
              className="block w-full pl-10 pr-3 py-4 border border-purple-200 dark:border-purple-800 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </AnimatedSection>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading competitions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <svg className="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-4 text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCompetitions.length === 0 && (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md border border-purple-100 dark:border-purple-900">
            {searchTerm ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">No results found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Try different keywords or create your own quiz!</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                  No quizzes yet 🎭
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Be the first to create an amazing quiz competition and share it with others!
                </p>
                <Link href="/create">
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white font-medium shadow-lg">
                    Create Your First Quiz ✨
                  </button>
                </Link>
              </>
            )}
          </div>
        )}

        {/* Competitions List */}
        {!loading && !error && filteredCompetitions.length > 0 && (
          <AnimatedContainer
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            {filteredCompetitions.map((competition: any, index: number) => (
              <AnimatedItem
                key={competition._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Link href={`/competition/${competition._id}`} className="block hover:no-underline h-full">
                  <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-100 dark:border-purple-900 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-900/30 dark:to-violet-900/30 border-b border-purple-100 dark:border-purple-900">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🎲</span>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {competition.title}
                        </h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-2">
                        {competition.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                      <span className="text-sm font-medium px-3 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full dark:bg-fuchsia-900/50 dark:text-fuchsia-300">
                        <span className="mr-1">✏️</span> {competition.questions} questions
                      </span>
                      <button className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200">
                        Start Quiz 🚀
                      </button>
                    </CardFooter>
                  </Card>
                </Link>
              </AnimatedItem>
            ))}
          </AnimatedContainer>
        )}
      </div>
    </div>
  );
}
