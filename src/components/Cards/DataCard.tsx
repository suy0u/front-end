import { Paper, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function DataCard({
  title,
  subtitle,
  to,
}: {
  title: string;
  subtitle?: string;
  to: string;
}) {
  return (
    <Paper
      component={Link}
      to={to}
      elevation={0}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "20px",
        bgcolor: "#E0FFE0",
        textDecoration: "none",
        color: "inherit",
        "&:hover": { bgcolor: "#D6FFD6" },
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 700 }}>{title}</Typography>

        {subtitle && <Typography sx={{ opacity: 0.6 }}>{subtitle}</Typography>}
      </Box>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#00A779",
          borderRadius: "12px",
          "&:hover": { bgcolor: "#008F67" },
        }}
      >
        View
      </Button>
    </Paper>
  );
}
