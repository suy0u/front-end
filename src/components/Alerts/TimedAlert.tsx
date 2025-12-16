import { useEffect, useState } from "react";
import { Alert } from "@mui/material";

interface TimedAlertProps {
  message: string | null;
  severity?: "success" | "error" | "warning" | "info";
  duration?: number;
}
export default function TimedAlert({
  message,
  severity = "success",
  duration = 0,
}: TimedAlertProps) {
  if (!message) return null;

  return (
    <AlertWithTimer
      key={message}
      message={message}
      severity={severity}
      duration={duration}
    />
  );
}

function AlertWithTimer({ message, severity, duration }: TimedAlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!visible) return null;

  return (
    <Alert
      severity={severity}
      sx={{
        mb: 2,
        fontWeight: 700,
        borderRadius: "12px",
        backgroundColor: severity === "error" ? "#ffe6e6" : undefined,
      }}
    >
      {message}
    </Alert>
  );
}
