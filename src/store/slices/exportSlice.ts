import { createSlice } from "@reduxjs/toolkit";
import { exportQuizSubmissions } from "../thunks/exportThunks";

interface ExportState {
  loading: boolean;
  error: string | null;
  lastFormat: "csv" | "json" | null;
}

const initialState: ExportState = {
  loading: false,
  error: null,
  lastFormat: null,
};

const exportSlice = createSlice({
  name: "export",
  initialState,
  reducers: {
    clearExportError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exportQuizSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportQuizSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.lastFormat = action.payload.format;
      })
      .addCase(exportQuizSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown export error";
      });
  },
});

export const { clearExportError } = exportSlice.actions;
export default exportSlice.reducer;
