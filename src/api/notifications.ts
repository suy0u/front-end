import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type {
  NotificationsResponse,
  NotificationsQueryParams,
} from "../types/notification";

export const getMyNotifications = async (
  params: NotificationsQueryParams = {}
): Promise<NotificationsResponse> =>
  withCatch(
    api.get<NotificationsResponse>("/api/notifications/me", {
      params: {
        page: params.page ?? 1,
        size: params.size ?? 20,
        only_unread: params.onlyUnread ?? null,
      },
    }),
    "getMyNotifications"
  );

export const markNotificationAsRead = (id: string): Promise<void> =>
  withCatch(
    api.post(`/api/notifications/${id}/read`),
    "markNotificationAsRead"
  );
