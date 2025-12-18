import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type {
  Quiz,
  CreateQuizPayload,
  UpdateQuizPayload,
  SubmitQuizPayload,
  QuizSubmission,
  QuizStat,
  QuizDetails,
} from "../types/quiz";
import type { PaginationParams } from "../types/common";

export const createQuiz = (
  companyId: string,
  payload: CreateQuizPayload
): Promise<Quiz> =>
  withCatch(
    api.post("/api/quizzes", payload, { params: { company_id: companyId } }),
    "createQuiz"
  );

export async function listQuizzes(
  companyId: string,
  params: PaginationParams & { active?: boolean } = {}
): Promise<{
  items: Quiz[];
  total: number;
  page: number;
  size: number;
}> {
  const res = await api.get("/api/quizzes", {
    params: {
      company_id: companyId,
      page: params.page ?? 1,
      size: params.size ?? 20,
      active: params.active,
    },
  });

  return res.data;
}

export const getQuiz = (
  quizId: string,
  companyId: string
): Promise<QuizDetails> =>
  withCatch(
    api.get(`/api/quizzes/${quizId}`, {
      params: { company_id: companyId },
    }),
    "getQuiz"
  );

export const updateQuiz = (
  quizId: string,
  companyId: string,
  payload: UpdateQuizPayload
): Promise<QuizDetails> =>
  withCatch(
    api.patch(`/api/quizzes/${quizId}`, payload, {
      params: { company_id: companyId },
    }),
    "updateQuiz"
  );

export const deleteQuiz = (quizId: string, companyId: string): Promise<void> =>
  withCatch(
    api.delete(`/api/quizzes/${quizId}`, {
      params: { company_id: companyId },
    }),
    "deleteQuiz"
  );

export const submitQuiz = (
  quizId: string,
  companyId: string,
  payload: SubmitQuizPayload
): Promise<void> =>
  withCatch(
    api.post(`/api/quizzes/${quizId}/submit`, payload, {
      params: { company_id: companyId },
    }),
    "submitQuiz"
  );

export const getMyQuizStats = (): Promise<QuizStat[]> =>
  withCatch(api.get("/api/quizzes/me/stats"), "getMyQuizStats");

export const getMyQuizSubmissions = (
  quizId: string
): Promise<QuizSubmission[]> =>
  withCatch(
    api.get(`/api/quizzes/${quizId}/me/submissions`),
    "getMyQuizSubmissions"
  );

export const getCompanyQuizSubmissions = (
  quizId: string
): Promise<QuizSubmission[]> =>
  withCatch(
    api.get(`/api/quizzes/${quizId}/submissions`),
    "getCompanyQuizSubmissions"
  );

export const exportQuizSubmissions = (quizId: string): Promise<Blob> =>
  withCatch(
    api.get(`/api/quizzes/${quizId}/submissions/export`, {
      responseType: "blob",
    }),
    "exportQuizSubmissions"
  );
