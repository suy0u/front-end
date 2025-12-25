import type { PaginationParams } from "./common";

export type NotificationStatus = "UNREAD" | "READ";

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  status: NotificationStatus;
  created_at: string;
}

export interface NotificationsResponse {
  items: Notification[];
  total: number;
}

export interface NotificationWSMessage {
  message?: string;
}

export const MessageStatus: Record<NotificationStatus, NotificationStatus> = {
  READ: "READ",
  UNREAD: "UNREAD",
} as const;

export interface NotificationsQueryParams extends PaginationParams {
  onlyUnread?: boolean | null;
}
