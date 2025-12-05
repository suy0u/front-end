import { Paper } from "@mui/material";

export function PageCard({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "40px",
        bgcolor: "#FFE66D",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        mb: 4,
      }}
    >
      {children}
    </Paper>
  );
}
