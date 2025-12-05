import { Typography } from "@mui/material";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
      {children}
    </Typography>
  );
}
