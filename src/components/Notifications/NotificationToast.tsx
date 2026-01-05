import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ToastProps {
  message: string;
  onClose: () => void;
  onView?: () => void;
  title?: string;
}

export function NotificationToast({
  message,
  onClose,
  onView,
  title = "Notification",
}: ToastProps) {
  return (
    <Paper variant="toast" elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography fontWeight={600}>{title}</Typography>

        <IconButton size="toastClose" disableRipple onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ mb: 1 }}>
        {message}
      </Typography>

      {onView && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="sm" variant="green" onClick={onView}>
            View
          </Button>
        </Box>
      )}
    </Paper>
  );
}
