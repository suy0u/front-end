import { Box, Typography } from "@mui/material";
import { type ReactNode } from "react";

type MultiHintProps = {
  children: ReactNode;
};

export default function MultiHint({ children }: MultiHintProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.25,
        py: 0.25,
        borderRadius: "999px",
        backgroundColor: "#fdc068ff",
        border: "1px dashed #f64413ff",
        width: "fit-content",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          fontSize: "0.7rem",
          lineHeight: 1,
          color: "#1f4f41",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
