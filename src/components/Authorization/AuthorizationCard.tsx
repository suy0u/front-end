import { Paper } from "@mui/material";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        p: 5,
        borderRadius: "40px",
        bgcolor: "#f9f8f4",
        border: (theme) => `3px solid ${theme.palette.custom.dark}`,
        boxShadow: "0 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </Paper>
  );
}
