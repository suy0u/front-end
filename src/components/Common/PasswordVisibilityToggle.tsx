import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordVisibilityToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export function PasswordVisibilityToggle({
  visible,
  onToggle,
}: PasswordVisibilityToggleProps) {
  return (
    <IconButton
      onClick={onToggle}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      aria-label={visible ? "Hide password" : "Show password"}
      sx={{
        p: 0,
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        "& .MuiSvgIcon-root": {
          width: 20,
          height: 20,
        },
      }}
    >
      {visible ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
}
