import { createSelector } from "@reduxjs/toolkit";
import { MessageStatus } from "../../types/notification";
import type { RootState } from "../store";

export const selectNotifications = (state: RootState) =>
  state.notifications.items;

export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (items) => items.filter((n) => n.status === MessageStatus.UNREAD)
);
export const selectNotificationsTotal = (state: RootState) =>
  state.notifications.total;

export const selectLastNotification = (state: RootState) =>
  state.notifications.items.find(
    (n) => n.id === state.notifications.lastAddedId
  );
