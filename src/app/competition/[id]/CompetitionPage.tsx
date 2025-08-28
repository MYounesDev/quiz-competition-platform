'use client';

import { useState } from 'react';
import { Competition } from '@/lib/models';
import QuizGame from './QuizGame';
import CompetitionPreview from './CompetitionPreview';
import { motion, AnimatePresence } from 'framer-motion';

interface CompetitionPageProps {
  competition: Competition;
}

export default function Page({ competition }: CompetitionPageProps) {
  const [mode, setMode] = useState<'preview' | 'quiz'>('preview');

  return (
    <AnimatePresence mode="wait">
      {mode === 'preview' ? (
        <motion.div
          key="preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CompetitionPreview 
            competition={competition} 
            onStartQuiz={() => setMode('quiz')}
          />
        </motion.div>
      ) : (
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <QuizGame competition={competition} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
