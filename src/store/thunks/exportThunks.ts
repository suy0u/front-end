import { createAsyncThunk } from "@reduxjs/toolkit";
import { exportQuizSubmissionsApi } from "../../api/export";
import type { ExportQuizParams, ExportQuizResponse } from "../../types/export";

export const exportQuizSubmissions = createAsyncThunk<
  ExportQuizResponse,
  ExportQuizParams,
  { rejectValue: string }
>("quizExport/exportQuizSubmissions", async (params, { rejectWithValue }) => {
  try {
    const blob = await exportQuizSubmissionsApi(params);
    return { blob, format: params.format };
  } catch {
    return rejectWithValue("Export failed");
  }
});
