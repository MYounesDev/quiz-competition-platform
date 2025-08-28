import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimatedSection, AnimatedContainer, AnimatedItem } from '@/components/ui/AnimatedSection';

// This function gets competition data from our API endpoint
async function getCompetitions() {
  // In server components, we can fetch directly from our API routes
  const res = await fetch(process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/competitions` 
    : 'http://localhost:3000/api/competitions',
    { cache: 'no-store' } // Don't cache this data
  );
  
  if (!res.ok) {
    // This will activate the closest error.js Error Boundary
    throw new Error('Failed to fetch competitions');
  }
  
  return res.json();
}

export default async function Home() {
  // Fetch competitions data
  let competitions = [];
  try {
    competitions = await getCompetitions();
  } catch (error) {
    console.error('Error fetching competitions:', error);
    // We'll handle the empty state below
  }

  // We'll use client components for animations

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <AnimatedSection 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-8">
              <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-5xl">✨</span>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-fuchsia-600 to-violet-600 inline-block text-transparent bg-clip-text">
                Quiz Competition Platform
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Create engaging quizzes and challenge your friends without any signup required! 
              <span className="ml-2">🚀</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/create">
                <button className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Quiz
                </button>
              </Link>
              <Link href="/competitions">
                <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-violet-200 dark:border-violet-800 rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-violet-600 dark:text-violet-400 font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Quizzes
                </button>
              </Link>
            </div>
          </AnimatedSection>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400">
            How It Works 🧩
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-fuchsia-100 dark:border-fuchsia-900 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 shadow-lg">1</div>
                <div className="text-3xl mb-3">✏️</div>
                <h3 className="text-xl font-bold mb-3 text-fuchsia-700 dark:text-fuchsia-400">Create a Quiz</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Design your own custom quiz with multiple-choice questions. Add as many questions as you want, with beautiful UI and animations!
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-violet-100 dark:border-violet-900 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-violet-100 dark:bg-violet-900/30 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-violet-500 to-violet-600 text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 shadow-lg">2</div>
                <div className="text-3xl mb-3">🔗</div>
                <h3 className="text-xl font-bold mb-3 text-violet-700 dark:text-violet-400">Share Your Quiz</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Share your unique quiz link with friends, classmates, or anyone you want to challenge. No signup required for quiz takers!
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-60 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 shadow-lg">3</div>
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">Take the Quiz</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Participants get instant feedback on answers with animations and sound effects, and can track their score in real-time!
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Available Competitions */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-gradient-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-900/20 dark:to-violet-900/20 p-6 rounded-2xl backdrop-blur-sm border border-fuchsia-100 dark:border-fuchsia-900">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400 mb-2">
                Available Quizzes 🎮
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                Join a quiz competition or create your own to challenge others!
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/competitions">
                <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-full border border-violet-200 dark:border-violet-800 shadow-sm text-violet-600 dark:text-violet-400 font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  View All
                </button>
              </Link>
              <Link href="/create">
                <button className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 py-2 px-4 rounded-full shadow-md text-white font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Quiz
                </button>
              </Link>
            </div>
        </div>

          {competitions.length > 0 ? (
            <AnimatedContainer 
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {competitions.map((competition: any, index: number) => (
                <AnimatedItem 
                  key={competition._id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/competition/${competition._id}`}
                    className="block hover:no-underline"
                  >
                    <div className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-fuchsia-100 dark:border-fuchsia-900 rounded-2xl overflow-hidden group">
                      <div className="bg-gradient-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-900/30 dark:to-violet-900/30 border-b border-fuchsia-100 dark:border-fuchsia-900 p-5 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-200/50 to-violet-200/50 dark:from-fuchsia-900/30 dark:to-violet-900/30 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex items-center relative z-10">
                          <span className="text-3xl mr-3">🎲</span>
                          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-700 to-violet-700 dark:from-fuchsia-300 dark:to-violet-300 group-hover:from-fuchsia-600 group-hover:to-violet-600 transition-colors duration-300">
                            {competition.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                          {competition.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-fuchsia-50/50 to-violet-50/50 dark:from-fuchsia-900/20 dark:to-violet-900/20 border-t border-fuchsia-100 dark:border-fuchsia-900">
                        <span className="text-sm font-medium px-3 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full dark:bg-fuchsia-900/50 dark:text-fuchsia-300 flex items-center">
                          <span className="mr-1">✏️</span> {competition.questions} questions
                        </span>
                        <button className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center">
                          <span className="mr-1">🚀</span> Start Quiz
                        </button>
                      </div>
                    </div>
                  </Link>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          ) : (
            <AnimatedSection 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-fuchsia-100 dark:border-fuchsia-900 relative overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-violet-500"></div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`absolute ${
                    i === 0 ? '-left-20 -bottom-20' : i === 1 ? 'right-20 top-20' : 'left-1/3 -top-20'
                  } w-40 h-40 rounded-full bg-gradient-to-br ${
                    i === 0 ? 'from-fuchsia-100 to-fuchsia-200' : i === 1 ? 'from-violet-100 to-violet-200' : 'from-indigo-100 to-indigo-200'
                  } dark:opacity-20 opacity-30`}></div>
                ))}
              </div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6">🎮</div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-violet-600 dark:from-fuchsia-400 dark:to-violet-400 mb-3">
                  No Quizzes Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Be the first to create an amazing quiz competition and share it with others!
                </p>
                <Link href="/create">
                  <button className="px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Your First Quiz ✨
                  </button>
                </Link>
              </div>
            </AnimatedSection>
          )}
        </section>
      </div>
    </div>
  );
}