import { Button, Typography } from "@mui/material";

interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}
export default function OptionButton({ label, selected, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      variant="option"
      size="sm"
      sx={{
        width: "fit-content",
        alignSelf: "flex-start",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {selected && <Typography sx={{ opacity: 0.7 }}>✓</Typography>}
      <Typography variant="inherit">{label}</Typography>
    </Button>
  );
}
