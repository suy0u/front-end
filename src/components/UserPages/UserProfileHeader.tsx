import { Typography, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { PageCard } from "../../components/Cards/PageCard";
import { UserProfileForm } from "../../components/UserPages/UserProfileForm";
import { UserProfileActions } from "../../components/UserPages/UserProfileActions";
import type { EditUserData, User } from "../../types/user";
import { UserProfileAnalytics } from "../../components/UserPages/UserProfileAnalytics";

interface Props {
  user: User;
  isSelf: boolean;
  editMode: boolean;
  editData: EditUserData;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onAvatarUpload: (file: File) => void;
  onChange: React.Dispatch<React.SetStateAction<EditUserData>>;
}

export default function UserProfileHeader({
  user,
  isSelf,
  editMode,
  editData,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onAvatarUpload,
  onChange,
}: Props) {
  const { t } = useTranslation();

  return (
    <PageCard>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>
        {t("profile.user_profile")}
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        <Grid size={{ md: 4 }}>
          <UserProfileForm
            username={editMode ? editData.username : user.username}
            about={editMode ? editData.about : user.about}
            avatarUrl={editMode ? editData.avatar_url : user.avatar_url}
            email={user.email}
            authProviderId={user.auth_provider_id}
            editMode={editMode}
            onAvatarUpload={onAvatarUpload}
            onChange={(field, value) =>
              onChange((p) => ({ ...p, [field]: value }))
            }
          />
        </Grid>
        <Grid size={{ md: 8 }}>
          <UserProfileAnalytics isSelf={isSelf} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <UserProfileActions
          isSelf={isSelf}
          editMode={editMode}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      </Box>
    </PageCard>
  );
}
