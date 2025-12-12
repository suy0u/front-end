import { Stack, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface UserProfileActionsProps {
  editMode: boolean;
  isSelf: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export function UserProfileActions({
  editMode,
  isSelf,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: UserProfileActionsProps) {
  const { t } = useTranslation();

  if (!isSelf) return null;

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        {!editMode ? (
          <Button variant="green" size="md" onClick={onEdit}>
            {t("profile.edit_profile")}
          </Button>
        ) : (
          <>
            <Button variant="green" size="md" onClick={onSave}>
              {t("actions.save")}
            </Button>
            <Button variant="pink" size="md" onClick={onCancel}>
              {t("actions.cancel")}
            </Button>
          </>
        )}
      </Stack>

      <Box
        sx={{
          mt: 6,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button variant="orange" size="md" onClick={onDelete}>
          {t("actions.delete")}
        </Button>
      </Box>
    </>
  );
}
