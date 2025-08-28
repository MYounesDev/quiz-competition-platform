import CreateCompetitionForm from './CreateCompetitionForm';

export const metadata = {
  title: 'Create Competition - Quiz Competition Platform',
  description: 'Create your own quiz competition to share with friends!',
};

export default function CreateCompetitionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Create a New Quiz Competition
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Design your own interactive quiz with multiple-choice questions for others to enjoy!
          </p>
        </div>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-purple-100 dark:border-purple-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-900 dark:to-purple-800 opacity-30 blur-xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900 dark:to-pink-800 opacity-30 blur-xl"></div>
          
          <div className="relative z-10">
            <CreateCompetitionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
