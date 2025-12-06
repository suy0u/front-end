import { Paper } from "@mui/material";

export function PageCard({ children }: { children: React.ReactNode }) {
  return <Paper variant="pageCard">{children}</Paper>;
}
