import { Typography } from "@mui/material";

export function EmptyState({ text }: { text: string }) {
  return <Typography sx={{ opacity: 0.7 }}>{text}</Typography>;
}
