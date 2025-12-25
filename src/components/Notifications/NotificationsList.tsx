import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMyNotifications,
  markNotificationAsReadThunk,
} from "../../store/thunks/notificationThunks";
import {
  selectNotifications,
  selectNotificationsTotal,
} from "../../store/selectors/notificationsSelectors";
import Pagination from "../Common/Pagination";
import { MessageStatus } from "../../types/notification";

const PAGE_SIZE = 5;

export function NotificationsList() {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(selectNotifications);
  const total = useAppSelector(selectNotificationsTotal);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchMyNotifications({
        page,
        size: PAGE_SIZE,
      })
    );
  }, [dispatch, page]);

  const markRead = async (id: string) => {
    await dispatch(markNotificationAsReadThunk(id)).unwrap();

    dispatch(
      fetchMyNotifications({
        page,
        size: PAGE_SIZE,
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {notifications.length === 0 && (
        <Typography color="text.secondary">No notifications</Typography>
      )}

      {notifications.map((n) => {
        const isUnread = n.status === MessageStatus.UNREAD;

        return (
          <Box
            key={n.id}
            sx={{
              p: 3,
              borderRadius: "16px",
              backgroundColor: isUnread ? "#fff" : "#f7f7f7",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              borderLeft: isUnread
                ? "4px solid #1d5b4e"
                : "4px solid transparent",
            }}
          >
            <Typography fontWeight={600}>{n.message}</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {new Date(n.created_at).toLocaleString()}
            </Typography>

            {isUnread && (
              <Box sx={{ mt: 2 }}>
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => markRead(n.id)}
                >
                  Mark as read
                </Button>
              </Box>
            )}
          </Box>
        );
      })}

      {total > PAGE_SIZE && (
        <Pagination
          page={page}
          limit={PAGE_SIZE}
          total={total}
          onChange={setPage}
        />
      )}
    </Box>
  );
}
