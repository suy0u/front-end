import { Box, Stack } from "@mui/material";

export function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Stack spacing={{ xs: 3, sm: 4 }} alignItems="center" textAlign="center">
        {children}
      </Stack>
    </Box>
  );
}
