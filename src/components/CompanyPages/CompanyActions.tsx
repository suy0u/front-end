import { Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  isOwner: boolean;
  canLeave: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onLeave: () => void;
}

export default function CompanyActions({
  isOwner,
  canLeave,
  onEdit,
  onDelete,
  onLeave,
}: Props) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={1}>
      {isOwner && (
        <>
          <Button size="sm" variant="purple" onClick={onEdit}>
            {t("actions.edit")}
          </Button>
          <Button size="sm" variant="orange" onClick={onDelete}>
            {t("actions.delete")}
          </Button>
        </>
      )}

      {canLeave && (
        <Button size="sm" variant="orange" onClick={onLeave}>
          {t("actions.leave")}
        </Button>
      )}
    </Stack>
  );
}
