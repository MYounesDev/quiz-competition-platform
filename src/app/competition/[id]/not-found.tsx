import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Competition Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the competition you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button>
              Back to Home
            </Button>
          </Link>
          <Link href="/create">
            <Button variant="secondary">
              Create Competition
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
