import { Paper, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { PaperProps } from "@mui/material";

interface DataCardProps {
  title?: ReactNode;
  subtitle?: string;
  to?: string;
  right?: ReactNode;
  children?: ReactNode;
  sx?: object;
  paperProps?: PaperProps;
}

export function DataCard({
  title,
  subtitle,
  to,
  right,
  children,
  paperProps = {},
  sx = {},
}: DataCardProps) {
  return (
    <Paper
      variant={paperProps.variant}
      component={to ? Link : "div"}
      to={to}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textDecoration: "none",
        color: "inherit",
        ...sx,
      }}
    >
      <Box sx={{ flex: 1, textAlign: "left" }}>
        {title && (
          <Typography component="div" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography sx={{ opacity: 0.6, fontSize: "0.85rem" }}>
            {subtitle}
          </Typography>
        )}

        {children}
      </Box>
      {right}
    </Paper>
  );
}
