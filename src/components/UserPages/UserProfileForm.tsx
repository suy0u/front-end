import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppTextField } from "../TextFields/AppTextField";
import { PasswordField } from "../TextFields/PasswordField";

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
  const { t } = useTranslation();

  if (!editMode) {
    return (
      <>
        <Typography sx={{ mb: 1 }}>
          <strong>{t("profile.username")}:</strong> {username}
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
        label={t("profile.username")}
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
        helperText={t("profile.email_immutable")}
      />

      {isLocalUser && (
        <PasswordField
          label={`${t("common.new")} ${t("profile.password")}`}
          onChange={(value) => onChange("password", value)}
        />
      )}
    </Stack>
  );
}
