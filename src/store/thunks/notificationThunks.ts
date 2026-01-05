import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../../api/notifications";
import type {
  NotificationsResponse,
  NotificationsQueryParams,
} from "../../types/notification";

export const fetchMyNotifications = createAsyncThunk<
  NotificationsResponse,
  NotificationsQueryParams | undefined,
  { rejectValue: string }
>("notifications/getMyNotifications", async (params, { rejectWithValue }) => {
  try {
    return await getMyNotifications(params);
  } catch {
    return rejectWithValue("Failed to fetch notifications");
  }
});

export const markNotificationAsReadThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("notifications/markAsRead", async (id, { rejectWithValue }) => {
  try {
    return await markNotificationAsRead(id);
  } catch {
    return rejectWithValue("Failed to mark notification as read");
  }
});
