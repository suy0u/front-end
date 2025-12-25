import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Notification, MessageStatus } from "../../types/notification";
import {
  fetchMyNotifications,
  markNotificationAsReadThunk,
} from "../thunks/notificationThunks";

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  total: number;
  lastAddedId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  total: 0,
  lastAddedId: null,
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      console.log("🟢 addNotification payload:", action.payload);

      state.items.unshift(action.payload);

      if (action.payload.status === MessageStatus.UNREAD) {
        state.unreadCount += 1;
        console.log("🔔 unreadCount++", state.unreadCount);
      } else {
        console.warn("⚠️ notification is not UNREAD:", action.payload.status);
      }
    },

    markAsRead(state, action: PayloadAction<string>) {
      const n = state.items.find((i) => i.id === action.payload);
      if (n && n.status === MessageStatus.UNREAD) {
        n.status = MessageStatus.READ;
        state.unreadCount -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyNotifications.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;

        state.unreadCount = action.payload.items.filter(
          (n) => n.status === MessageStatus.UNREAD
        ).length;

        state.loading = false;
      })
      .addCase(fetchMyNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error";
      })
      .addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
        const id = action.meta.arg;
        const n = state.items.find((i) => i.id === id);
        if (n && n.status === MessageStatus.UNREAD) {
          n.status = MessageStatus.READ;
          state.unreadCount -= 1;
        }
      });
  },
});

export const { addNotification, markAsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
