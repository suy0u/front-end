import { TextField, type TextFieldProps } from "@mui/material";

export function AppTextField(props: TextFieldProps) {
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

          "& fieldset": {
            borderRadius: "20px",
            borderWidth: "2px",
            borderColor: (theme) => theme.palette.custom.dark,
          },

          "&:hover fieldset": {
            boxShadow: "0 8px 0 rgba(0,0,0,0.15)",
          },
        },

        "& .MuiInputLabel-root": {
          fontWeight: 700,
          color: "#1d5b4e",
        },

        "& .MuiInputLabel-shrink": {
          fontSize: 18,
        },

        ...props.sx,
      }}
    />
  );
}
