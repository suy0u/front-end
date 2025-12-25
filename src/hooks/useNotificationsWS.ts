import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNotification } from "../store/slices/notificationsSlice";
import { enqueueToast } from "../store/slices/toastSlice";
import {
  connectNotificationsWS,
  disconnectNotificationsWS,
} from "../utils/ws/notificationsSocket";

import type { Notification } from "../types/notification";

export function useNotificationsWS() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const authUser = useAppSelector((s) => s.auth.user);

  useEffect(() => {
    if (!token || !authUser?.id) return;

    connectNotificationsWS(token, (data) => {
      const notification = data as Notification;

      dispatch(addNotification(notification));

      dispatch(
        enqueueToast({
          id: notification.id,
          message: notification.message,
        })
      );
    });

    return () => {
      disconnectNotificationsWS();
    };
  }, [token, authUser?.id, dispatch]);
}
