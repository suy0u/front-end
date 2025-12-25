import { useEffect } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { dequeueToast, clearToasts } from "../../store/slices/toastSlice";
import { openModal } from "../../store/slices/uiSlice";
import { NotificationToast } from "../../components/Notifications/NotificationToast";
import { ListModal } from "../../types/common";

interface Props {
  autoHideMs?: number;
  maxVisible?: number;
}

export function NotificationToastStack({
  autoHideMs = 10000,
  maxVisible = 3,
}: Props) {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((s) => s.toast.queue.slice(-maxVisible));

  useEffect(() => {
    const timers = toasts.map((t) =>
      window.setTimeout(() => {
        dispatch(dequeueToast(t.id));
      }, autoHideMs)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, autoHideMs, dispatch]);

  if (!toasts.length) return null;

  const handleView = () => {
    dispatch(clearToasts());
    dispatch(openModal({ type: ListModal.Notifications }));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 80,
        right: 24,
        zIndex: 1400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 360,
      }}
    >
      {toasts.map((t) => (
        <NotificationToast
          key={t.id}
          message={t.message}
          onClose={() => dispatch(dequeueToast(t.id))}
          onView={handleView}
        />
      ))}
    </Box>
  );
}
