import { Chip } from "@mui/material";

export function RoleChip({ label }: { label: string }) {
  return (
    <Chip
      label={label}
      sx={{
        bgcolor: "#00A779",
        color: "white",
        borderRadius: "10px",
        fontWeight: 700,
      }}
    />
  );
}
