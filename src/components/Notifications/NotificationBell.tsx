import { useEffect, useRef } from "react";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMyNotifications } from "../../store/thunks/notificationThunks";
import { openModal } from "../../store/slices/uiSlice";
import { ListModal } from "../../types/common";

export function NotificationBell() {
  const dispatch = useAppDispatch();
  const initializedRef = useRef(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const unreadCount = useAppSelector((s) => s.notifications.unreadCount);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (initializedRef.current) return;

    initializedRef.current = true;

    dispatch(
      fetchMyNotifications({
        onlyUnread: true,
      })
    );
  }, [dispatch, isAuthenticated]);

  const handleClick = () => {
    dispatch(openModal({ type: ListModal.Notifications }));
  };

  if (!isAuthenticated) return null;

  return (
    <IconButton onClick={handleClick} size="notification">
      <Badge
        badgeContent={unreadCount}
        color="error"
        invisible={unreadCount === 0}
      >
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}
