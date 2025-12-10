import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const savedLang = localStorage.getItem("lng") || "en";

interface LanguageState {
  current: string;
}

const initialState: LanguageState = {
  current: savedLang,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.current = action.payload;
      localStorage.setItem("lng", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
