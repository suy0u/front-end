import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { AppTextField } from "../TextFields/AppTextField";
import { PasswordVisibilityToggle } from "../PasswordVisibilityToggle";

interface PasswordFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;

  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;

  initialVisible?: boolean;
}

export function PasswordField({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  helperText,
  error,
  initialVisible = false,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(initialVisible);

  return (
    <AppTextField
      label={label}
      type={visible ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      helperText={helperText}
      error={error}
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <PasswordVisibilityToggle
                visible={visible}
                onToggle={() => setVisible((v) => !v)}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
