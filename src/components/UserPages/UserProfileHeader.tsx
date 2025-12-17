import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { PageCard } from "../../components/Cards/PageCard";
import { UserProfileForm } from "../../components/UserPages/UserProfileForm";
import { UserProfileActions } from "../../components/UserPages/UserProfileActions";
import type { EditUserData, User } from "../../types/user";

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
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
        {t("profile.user_profile")}
      </Typography>

      <UserProfileForm
        username={editMode ? editData.username : user.username}
        about={editMode ? editData.about : user.about}
        avatarUrl={editMode ? editData.avatar_url : user.avatar_url}
        email={user.email}
        authProviderId={user.auth_provider_id}
        editMode={editMode}
        onAvatarUpload={onAvatarUpload}
        onChange={(field, value) => onChange((p) => ({ ...p, [field]: value }))}
      />

      <UserProfileActions
        isSelf={isSelf}
        editMode={editMode}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    </PageCard>
  );
}
