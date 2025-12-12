import { Stack, Button, Box } from "@mui/material";

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
  if (!isSelf) return null;

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        {!editMode ? (
          <Button variant="green" size="md" onClick={onEdit}>
            Edit profile
          </Button>
        ) : (
          <>
            <Button variant="green" size="md" onClick={onSave}>
              Save changes
            </Button>
            <Button variant="pink" size="md" onClick={onCancel}>
              Cancel
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
          Delete my account
        </Button>
      </Box>
    </>
  );
}
