import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppModal from "../AppModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  const { t } = useTranslation();

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("profile.delete_account")}
      actions={
        <>
          <Button size="sm" variant="orange" onClick={onConfirm}>
            {t("actions.delete")}
          </Button>
          <Button size="sm" variant="yellow" onClick={onClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      {t("profile.delete_account_confirm")}
    </AppModal>
  );
}
