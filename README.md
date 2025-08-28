# Quiz Competition Platform

A community-driven quiz competition platform built with Next.js and MongoDB.

## Features

- Create and share quiz competitions without requiring an account
- Multiple-choice questions with instant feedback
- Animated feedback with sound effects
- Shareable unique URLs for each quiz
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (MongoDB Atlas recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quiz-competition.git
cd quiz-competition
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/quizCompetition?retryWrites=true&w=majority
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sound Effects (Optional)

To enable sound effects:

1. Add sound files to the `/public/sounds/` directory:
   - `correct.mp3` - Sound when an answer is correct
   - `incorrect.mp3` - Sound when an answer is wrong

You can find free sound effects on websites like:
- [Freesound](https://freesound.org)
- [Pixabay](https://pixabay.com/sound-effects/)
- [Mixkit](https://mixkit.co/free-sound-effects/)

## Deployment

The easiest way to deploy this application is with [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Add your `MONGODB_URI` as an environment variable
4. Deploy!

## Project Structure

- `/src/app` - Next.js app directory
  - `/api` - API routes
  - `/competition` - Competition pages
  - `/create` - Create competition page
- `/src/components` - Reusable React components
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and models
- `/public` - Static assets

## License

This project is open source and available under the [MIT License](LICENSE).