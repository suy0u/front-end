import { Typography } from "@mui/material";

interface ModalTitleProps {
  children: React.ReactNode;
}

export function ModalTitle({ children }: ModalTitleProps) {
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: 900,
        textAlign: "center",
        color: "#004225",
        letterSpacing: "-1px",
        lineHeight: 1,
        mb: 3,
      }}
    >
      {children}
    </Typography>
  );
}
