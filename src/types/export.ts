export type ExportFormat = "csv" | "json";

export interface ExportQuizParams {
  quizId?: string;
  companyId: string;
  userId?: string;
  format: ExportFormat;
}

export interface ExportQuizResponse {
  blob: Blob;
  format: ExportFormat;
}
