// Types for our data models

export interface Question {
  questionText: string;
  options: string[];
  correctIndex: number;
}

export interface Competition {
  _id?: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
}
