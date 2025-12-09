import { Box } from "@mui/material";
import type { ReactNode } from "react";

export const BottomPanel = ({ children }: { children?: ReactNode }) => (
  <Box
    sx={{
      bgcolor: "#FFE66D",
      borderRadius: "40px 40px 0 0",
      boxShadow: "0 -10px 30px rgba(0,0,0,0.1)",
      p: { xs: 3, md: 4 },
      minHeight: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 3,
    }}
  >
    {children}
  </Box>
);
