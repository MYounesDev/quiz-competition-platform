import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from '@/components/AnimatedBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz Competition Platform",
  description: "Create and participate in fun quiz competitions without any signup!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-fuchsia-50 via-violet-50 to-indigo-50 dark:from-fuchsia-950 dark:via-violet-950 dark:to-indigo-950`}
      >
        {/* Animated background with bubbles and shapes */}
        <AnimatedBackground />
        
        <div className="min-h-screen flex flex-col relative z-10">
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-purple-200 dark:border-purple-900 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <nav className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <a href="/" className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-violet-600 inline-block text-transparent bg-clip-text flex items-center">
                    <span className="text-3xl mr-2">🎮</span>
                    QuizMaster
                  </a>
                  <a 
                    href="/"
                    className="px-3 py-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-800 dark:text-purple-200 flex items-center transition-all duration-200"
                    title="Home"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                  </a>
                  <a 
                    href="/competitions"
                    className="px-3 py-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-800 dark:text-purple-200 flex items-center transition-all duration-200"
                    title="All Competitions"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    Competitions
                  </a>
                </div>
                
                <div>
                  <a 
                    href="/create"
                    className="ml-4 px-5 py-2.5 border border-transparent rounded-full shadow-lg text-base font-medium text-white bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Create Quiz ✨
                  </a>
                </div>
              </nav>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-inner border-t border-purple-200 dark:border-purple-900">
            <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex justify-center space-x-6 mb-4">
                <a href="/" className="text-purple-600 hover:text-purple-500 transition-colors">
                  <span className="sr-only">Home</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </a>
                <a href="/create" className="text-fuchsia-600 hover:text-fuchsia-500 transition-colors">
                  <span className="sr-only">Create</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
                <a href="/competitions" className="text-violet-600 hover:text-violet-500 transition-colors">
                  <span className="sr-only">Competitions</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </a>
              </div>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-violet-600 font-semibold">
                QuizMaster ✨ Create and play quizzes without signup 🚀
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}