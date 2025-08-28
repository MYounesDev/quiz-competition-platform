'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Competition } from '@/lib/models';
import { Button } from '@/components/ui/Button';
import { useQuizSounds } from '@/hooks/useQuizSounds';

interface QuizGameProps {
  competition: Competition;
}

export default function QuizGame({ competition }: QuizGameProps) {
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Get our custom sound hooks with fallback
  const { playCorrect, playIncorrect, soundsEnabled, toggleSounds, toggleBackgroundMusic } = useQuizSounds();
  
  // Handle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      quizContainerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  }, []);

  const currentQuestion = competition.questions[currentQuestionIndex];
  const totalQuestions = competition.questions.length;

  const handleOptionSelect = (optionIndex: number) => {
    // If an answer is already selected but it was wrong, allow selecting another answer
    if (selectedOption !== null && isCorrect !== false) return;
    
    setSelectedOption(optionIndex);
    const correct = optionIndex === currentQuestion.correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      playCorrect();
      setScore(score + 1);
      // Don't auto-advance - wait for user to click next button
    } else {
      playIncorrect();
      
      // After a brief delay, allow the user to try again
      setTimeout(() => {
        setSelectedOption(null);
        // Keep isCorrect as false to indicate they need to try again
      }, 1000);
    }
  };

  const handleNextQuestion = () => {
    if (isCorrect) {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setIsCompleted(true);
      }
    } else {
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setIsCompleted(false);
  };

  // Progress calculation
  const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;

  if (isCompleted) {
    return (
      <div className="relative p-8 min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 rounded-xl overflow-hidden">
        {/* Confetti effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-green-500'][i % 6]
              }`}
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: '-10px',
              }}
              animate={{
                y: [0, window.innerHeight],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-10 shadow-xl border border-purple-100 dark:border-purple-900 max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-5 shadow-lg"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mt-8 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Quiz Completed!
          </motion.h2>
          
          <motion.div
            className="mb-8 flex items-center justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 relative">
              <span className="text-sm text-purple-600 dark:text-purple-400 absolute -top-4 left-0">Your Score</span>
              <span className="text-indigo-600 dark:text-indigo-400">{score}</span>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <span>{totalQuestions}</span>
              <motion.div
                className="text-6xl absolute -right-12 top-0"
                initial={{ rotate: -45, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 1.2 }}
              >
                {score === totalQuestions ? '🎉' : '👏'}
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-4 mt-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={handleRestart}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
            
            <motion.button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 rounded-full bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-indigo-600 dark:text-indigo-400 font-bold shadow-md border border-indigo-100 dark:border-indigo-800"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={quizContainerRef} className={`p-6 ${isFullscreen ? 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 min-h-screen' : ''}`}>
      {/* Floating particles for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-teal-400'][i % 5]
            } opacity-20 dark:opacity-10`}
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: Math.random() * 10 + 10,
            }}
          />
        ))}
      </div>
      
      {/* Top Bar with Controls */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        {/* Quiz Controls */}
        <div className="flex items-center gap-3">
          {/* Sound effects toggle */}
          <motion.button 
            onClick={(e) => {
              e.preventDefault();
              toggleSounds();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg hover:shadow-xl transition-all"
            title={soundsEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundsEnabled ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </motion.button>

          {/* Music toggle button */}
          <motion.button 
            onClick={(e) => {
              e.preventDefault();
              toggleBackgroundMusic();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all"
            title="Toggle background music"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </motion.button>
          
          {/* Fullscreen button */}
          <motion.button 
            onClick={(e) => {
              e.preventDefault();
              toggleFullscreen();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </motion.button>
        </div>
        
        {/* Score */}
        <motion.div 
          className="py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white"
          whileHover={{ scale: 1.05 }}
          animate={{ 
            y: [0, -5, 0],
            transition: { 
              duration: 2, 
              repeat: Infinity,
              repeatType: "mirror" 
            }
          }}
        >
          <span className="font-bold text-lg">Score: <span className="text-yellow-200">{score}</span></span>
        </motion.div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-white/30 dark:bg-gray-700/30 rounded-full h-3 mb-6 shadow-inner overflow-hidden backdrop-blur-sm">
        <motion.div 
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white/20 overflow-hidden" style={{ 
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }}></div>
        </motion.div>
      </div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <motion.div
          className="py-2 px-5 rounded-full shadow-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold"
          whileHover={{ scale: 1.05 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl mb-8 border-b-4 border-indigo-500 relative overflow-hidden"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 dark:from-purple-800 dark:to-pink-800 opacity-20 blur-xl"></div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-3">
              {currentQuestion.questionText}
            </h2>
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Select the correct answer below
            </p>
          </motion.div>
          
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full text-left p-5 rounded-xl shadow-lg transition-all duration-300 ${
                  selectedOption === index && isCorrect
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border border-green-400 dark:border-green-600'
                    : selectedOption === index && !isCorrect
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border border-red-400 dark:border-red-600'
                    : selectedOption === null
                    ? 'bg-white/80 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:bg-gray-800/80 dark:hover:bg-gray-700/90 hover:shadow-xl border border-indigo-100 dark:border-indigo-900 backdrop-blur-sm'
                    : 'bg-white/60 dark:bg-gray-800/60 opacity-70 border border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null && isCorrect !== false}
                whileHover={selectedOption === null ? { scale: 1.02, y: -5 } : {}}
                whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                animate={
                  selectedOption === index && isCorrect 
                    ? { 
                        scale: [1, 1.08, 1],
                        boxShadow: ["0 4px 6px rgba(0,0,0,0.1)", "0 10px 15px rgba(0,0,0,0.2)", "0 4px 6px rgba(0,0,0,0.1)"],
                        transition: { duration: 0.8 }
                      }
                    : selectedOption === index && !isCorrect
                    ? { 
                        x: [0, -10, 10, -10, 10, 0], 
                        boxShadow: ["0 4px 6px rgba(0,0,0,0.1)", "0 10px 15px rgba(0,0,0,0.2)", "0 4px 6px rgba(0,0,0,0.1)"],
                        transition: { duration: 0.6 } 
                      }
                    : {}
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
                      selectedOption === index 
                        ? (isCorrect ? 'bg-white text-green-600' : 'bg-white text-red-600') 
                        : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-medium">{option}</span>
                  </div>
                  
                  {selectedOption === index && isCorrect && (
                    <motion.div 
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 10 }}
                      className="text-white text-xl bg-green-400 dark:bg-green-500 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      ✓
                    </motion.div>
                  )}
                  
                  {selectedOption === index && !isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 10 }}
                      className="text-white text-xl bg-red-400 dark:bg-red-500 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      ✗
                    </motion.div>
                  )}
                  {/* Don't show the correct answer when wrong answer is selected */}
                </div>
              </motion.button>
            ))}
          </div>
          
          {selectedOption !== null && (
            <motion.div 
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className={`px-8 py-4 rounded-full shadow-lg text-white font-bold text-lg ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                }`}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isCorrect
                  ? currentQuestionIndex < totalQuestions - 1
                    ? (
                      <span className="flex items-center">
                        Next Question 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )
                    : (
                      <span className="flex items-center">
                        Finish Quiz
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )
                  : 'Try Again'
                }
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
