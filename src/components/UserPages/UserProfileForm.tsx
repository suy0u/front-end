import { Stack, Typography } from "@mui/material";
import { AppTextField } from "../TextFields/AppTextField";

interface UserProfileFormProps {
  username: string;
  email: string;
  authProviderId?: string | null;
  editMode: boolean;
  onChange: (field: "username" | "password", value: string) => void;
}

export function UserProfileForm({
  username,
  email,
  authProviderId,
  editMode,
  onChange,
}: UserProfileFormProps) {
  if (!editMode) {
    return (
      <>
        <Typography sx={{ mb: 1 }}>
          <strong>Username:</strong> {username}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <strong>Email:</strong> {email}
        </Typography>
      </>
    );
  }

  const isLocalUser = !authProviderId;

  return (
    <Stack spacing={2} sx={{ maxWidth: 420 }}>
      <AppTextField
        label="Username"
        value={username}
        onChange={(e) => onChange("username", e.target.value)}
        fullWidth
        required
      />

      <AppTextField
        label="Email"
        value={email}
        fullWidth
        disabled
        helperText="Email cannot be changed"
      />

      {isLocalUser && (
        <>
          <AppTextField
            label="New password"
            type="password"
            onChange={(e) => onChange("password", e.target.value)}
            fullWidth
          />
        </>
      )}
    </Stack>
  );
}
