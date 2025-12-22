import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type { ExportQuizParams } from "../types/export";

export const exportQuizSubmissionsApi = async ({
  quizId,
  companyId,
  userId,
  format = "csv",
}: ExportQuizParams): Promise<Blob> =>
  withCatch(
    api.get(`/api/quizzes/submissions/export`, {
      params: {
        company_id: companyId,
        quiz_id: quizId,
        user_id: userId,
        format,
      },
      responseType: "blob",
    }),
    "getExport"
  );
