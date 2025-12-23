export interface GlobalQuizRating {
  user_id: string;
  correct_answers: number;
  total_answers: number;
  average_score: number;
}

export interface MyQuizAverage {
  quiz_id: string;
  quiz_title: string;
  average_score: number;
  attempts: number;
  first_attempt_at: string;
  last_attempt_at: string;
}

export interface CompanyMemberWeeklyScore {
  user_id: string;
  week_key: number;
  period_start: string;
  period_end: string;
  average_score: number;
  attempts: number;
}

export interface CompanyUserWeeklyQuizScore {
  user_id: string;
  quiz_id: string;
  quiz_title: string;
  week_key: number;
  period_start: string;
  period_end: string;
  average_score: number;
  attempts: number;
}

export interface CompanyUserLastAttempt {
  quiz_id: string;
  quiz_title: string;
  user_id: string;
  username: string;
  last_attempt_at: string;
}

export type PresetRange = "week" | "month" | "custom";

export interface DateRangeParams {
  from?: string;
  to?: string;
  preset?: PresetRange;
}

export interface MyLastQuizCompletion {
  quiz_id: string;
  quiz_title: string;
  last_attempt_at: string;
}
