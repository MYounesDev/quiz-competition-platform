'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Competition } from '@/lib/models';
import { Button } from '@/components/ui/Button';

interface CompetitionPreviewProps {
  competition: Competition;
  onStartQuiz: () => void;
}

export default function CompetitionPreview({ competition, onStartQuiz }: CompetitionPreviewProps) {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quiz Preview
        </h2>
        <div className="flex items-center space-x-3">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox"
              className="sr-only peer"
              checked={showAnswers}
              onChange={() => setShowAnswers(!showAnswers)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Show Answers
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {competition.questions.map((question, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm"
          >
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">
              {index + 1}. {question.questionText}
            </h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div 
                  key={optionIndex}
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    showAnswers && optionIndex === question.correctIndex
                      ? 'bg-green-50 dark:bg-green-900 border-l-4 border-green-500'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <span className={`${
                    showAnswers && optionIndex === question.correctIndex
                      ? 'text-green-700 dark:text-green-300 font-medium'
                      : 'text-gray-800 dark:text-gray-300'
                  }`}>
                    {option}
                  </span>
                  {showAnswers && optionIndex === question.correctIndex && (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Correct Answer
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={onStartQuiz} size="lg">
          Start Quiz
        </Button>
      </div>
    </div>
  );
}
