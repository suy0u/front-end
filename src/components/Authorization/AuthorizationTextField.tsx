import { TextField, type TextFieldProps } from "@mui/material";

export function AuthTextField(props: TextFieldProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
      sx={{
        my: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          background: "#F9FFF6",
          border: (theme) => `2px solid ${theme.palette.custom.dark}`,
          "& fieldset": { border: "none" },
          "&:hover": {
            boxShadow: "0 3px 0 rgba(0,0,0,0.15)",
          },
        },
        "& .MuiInputLabel-root": {
          fontWeight: 700,
          color: "#1d5b4e",
          transform: "translate(20px, 18px) scale(1)",
          transition: "all .2s ease",
        },

        "& .MuiInputLabel-shrink": {
          transform: "translate(14px, -10px) scale(0.85)",
          backgroundColor: "#F9FFF6",
          padding: "0 6px",
        },
        ...props.sx,
      }}
    />
  );
}
