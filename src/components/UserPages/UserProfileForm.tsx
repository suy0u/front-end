import { Stack, Typography, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppTextField } from "../TextFields/AppTextField";
import { PasswordField } from "../TextFields/PasswordField";
import { AvatarUploader } from "./AvatarUploader";
import { resolveMediaUrl } from "../../utils/media";

interface UserProfileFormProps {
  username: string;
  fullName?: string | null;
  about?: string | null;
  avatarUrl?: string | null;
  onAvatarUpload?: (file: File) => void;
  email: string;
  authProviderId?: string | null;
  editMode: boolean;
  onChange: (
    field: "username" | "password" | "about" | "avatar_url",
    value: string
  ) => void;
}

export function UserProfileForm({
  username,
  email,
  authProviderId,
  about,
  avatarUrl,
  onAvatarUpload,
  editMode,
  onChange,
}: UserProfileFormProps) {
  const { t } = useTranslation();

  if (!editMode) {
    return (
      <>
        {avatarUrl && (
          <Avatar
            src={resolveMediaUrl(avatarUrl)}
            sx={{ width: 96, height: 96, mb: 2 }}
          />
        )}

        <Typography sx={{ mb: 1 }}>
          <strong>{t("profile.username")}:</strong> {username}
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <strong>Email:</strong> {email}
        </Typography>

        {about && (
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            {about}
          </Typography>
        )}
      </>
    );
  }

  const isLocalUser = !authProviderId;

  return (
    <Stack spacing={2} sx={{ maxWidth: 420 }}>
      {editMode && onAvatarUpload && (
        <AvatarUploader
          uploadLabel={`${t("actions.upload")} ${t("profile.avatar")}`}
          avatarUrl={resolveMediaUrl(avatarUrl)}
          onUpload={onAvatarUpload}
        />
      )}

      <AppTextField
        label={t("profile.username")}
        value={username}
        onChange={(e) => onChange("username", e.target.value)}
        fullWidth
        required
      />

      <AppTextField
        label={t("profile.about")}
        value={about ?? ""}
        onChange={(e) => onChange("about", e.target.value)}
        fullWidth
        multiline
        rows={4}
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
