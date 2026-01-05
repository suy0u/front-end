import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Toast {
  id: string;
  message: string;
}

interface ToastState {
  queue: Toast[];
}

const initialState: ToastState = {
  queue: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    enqueueToast(state, action: PayloadAction<Toast>) {
      state.queue.push(action.payload);
    },
    dequeueToast(state, action: PayloadAction<string>) {
      state.queue = state.queue.filter((t) => t.id !== action.payload);
    },
    clearToasts(state) {
      state.queue = [];
    },
  },
});

export const { enqueueToast, dequeueToast, clearToasts } = toastSlice.actions;

export default toastSlice.reducer;
