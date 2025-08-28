'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Question } from '@/lib/models';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateCompetitionForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    { questionText: '', options: ['', '', '', ''], correctIndex: 0 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleQuestionChange = (index: number, field: string, value: string | number | string[]) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return updatedQuestions;
    });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const updatedOptions = [...updatedQuestions[questionIndex].options || []];
      updatedOptions[optionIndex] = value;
      updatedQuestions[questionIndex] = { 
        ...updatedQuestions[questionIndex], 
        options: updatedOptions 
      };
      return updatedQuestions;
    });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions, 
      { questionText: '', options: ['', '', '', ''], correctIndex: 0 }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    // Validate all questions and options
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      if (!q.questionText?.trim()) {
        setError(`Question ${i + 1} text is required`);
        return;
      }

      if (!q.options || q.options.length < 2) {
        setError(`Question ${i + 1} must have at least 2 options`);
        return;
      }

      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setError(`Option ${j + 1} for question ${i + 1} is required`);
          return;
        }
      }
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch('/api/competitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          questions
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create competition');
      }

      const competition = await response.json();
      
      // Redirect to the new competition page
      router.push(`/competition/${competition._id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <motion.div 
          className="bg-red-50 dark:bg-red-900/30 backdrop-blur-sm border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-xl shadow-md mb-6 flex items-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-base font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Competition Title
          </label>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              id="title"
              className="block w-full border-2 border-indigo-100 dark:border-indigo-900 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Ultimate Geography Quiz"
              required
            />
          </motion.div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-base font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Description
          </label>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <textarea
              id="description"
              rows={4}
              className="block w-full border-2 border-indigo-100 dark:border-indigo-900 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell players what this competition is about..."
              required
            />
          </motion.div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 backdrop-blur-sm p-6 rounded-xl shadow-md border border-indigo-200 dark:border-indigo-800 mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-1">
              Quiz Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Add multiple-choice questions below. You can have up to 6 options per question.
            </p>
          </div>
          <div className="flex space-x-3">
            <motion.button 
              type="button" 
              onClick={() => {
                // Add 3 questions at once for convenience
                for (let i = 0; i < 3; i++) {
                  setQuestions(prev => [
                    ...prev, 
                    { questionText: '', options: ['', '', '', ''], correctIndex: 0 }
                  ]);
                }
              }}
              className="py-3 px-5 rounded-xl shadow-md bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium border border-purple-100 dark:border-purple-900 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
                Add 3 Questions
              </span>
            </motion.button>
            <motion.button
              type="button" 
              onClick={addQuestion}
              className="py-3 px-5 rounded-xl shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium hover:shadow-lg transition-all"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Question
              </span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {questions.map((question, qIndex) => (
            <motion.div 
              key={qIndex} 
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl space-y-4 border-t-4 border-purple-500 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIndex * 0.05 }}
            >
              <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-purple-100 dark:bg-purple-900 opacity-20"></div>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl text-gray-800 dark:text-white">Question {qIndex + 1}</h3>
              <div className="space-x-2">
                {/* Option count control */}
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      const currentOptions = question.options || [];
                      if (currentOptions.length > 2) {
                        const newOptions = [...currentOptions];
                        newOptions.pop();
                        // Adjust correctIndex if needed
                        const newCorrectIndex = question.correctIndex >= newOptions.length 
                          ? 0 
                          : question.correctIndex;
                        handleQuestionChange(qIndex, 'options', newOptions);
                        handleQuestionChange(qIndex, 'correctIndex', newCorrectIndex);
                      }
                    }}
                    className="bg-white dark:bg-gray-600 py-1 px-2 rounded-l-md border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <div className="bg-gray-100 dark:bg-gray-700 py-1 px-3 border-y border-gray-300 dark:border-gray-500 text-sm text-gray-700 dark:text-gray-200">
                    {(question.options || []).length} options
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentOptions = question.options || [];
                      if (currentOptions.length < 6) { // Limit to 6 options max
                        handleQuestionChange(qIndex, 'options', [...currentOptions, '']);
                      }
                    }}
                    className="bg-white dark:bg-gray-600 py-1 px-2 rounded-r-md border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Question Text
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={question.questionText || ''}
                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                placeholder="e.g., What is the capital of France?"
                required
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Answer Options (select the correct one)
                </label>
              </div>
              
              <AnimatePresence>
                {(question.options || []).map((option, oIndex) => (
                <motion.div 
                  key={oIndex} 
                  className="flex items-center space-x-3 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: oIndex * 0.05 }}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}-correct`}
                    checked={question.correctIndex === oIndex}
                    onChange={() => handleQuestionChange(qIndex, 'correctIndex', oIndex)}
                    className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 dark:border-gray-600"
                    required
                  />
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    placeholder={`Option ${oIndex + 1}`}
                    required
                  />
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg flex items-center"
          whileHover={{ scale: 1.05, boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            <>
              Create Competition
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}
