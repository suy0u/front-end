import { Box, Typography, Stack, CircularProgress } from "@mui/material";

interface Props {
  title?: string;
  loading: boolean;
  empty: boolean;
  emptyText: string;
  children: React.ReactNode;
}

export function ListSection({
  title,
  loading,
  empty,
  emptyText,
  children,
}: Props) {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
        {title}
      </Typography>

      {loading && <CircularProgress />}

      {!loading && empty && (
        <Typography sx={{ opacity: 0.7 }}>{emptyText}</Typography>
      )}

      {!loading && <Stack spacing={2}>{children}</Stack>}
    </Box>
  );
}
