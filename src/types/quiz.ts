import type { PaginationParams } from "./common";
export interface Quiz {
  id: string;
  company_id: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuizOption {
  id: string;
  text: string;
  position: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  is_multi_correct: boolean;
  position: number;
  options: QuizOption[];
}

export interface QuizAnswer {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface QuizOptionPayload {
  text: string;
  is_correct: boolean;
  position: number;
}

export interface QuizQuestionPayload {
  title: string;
  is_multi_correct: boolean;
  position: number;
  options: QuizOptionPayload[];
}

export interface CreateQuizPayload {
  title: string;
  description: string;
  questions: QuizQuestionPayload[];
}

export interface UpdateQuizPayload {
  title?: string;
  description?: string;
  is_active?: boolean;
}

export interface QuizAnswerPayload {
  question_id: string;
  option_ids: string[];
}

export interface SubmitQuizPayload {
  answers: QuizAnswerPayload[];
}
export interface QuizSubmission {
  id: string;
  quiz_id: string;
  user_id: string;

  correct_answers: number;
  total_answers: number;
  score_percent: number;

  created_at: string;
}

export interface QuizStat {
  quiz_id: string;
  attempts: number;
  last_score: number | null;
}

export interface QuizDetails extends Quiz {
  questions: QuizQuestion[];
}

export interface ListQuizzesArgs extends PaginationParams {
  companyId: string;
  active?: boolean;
}
