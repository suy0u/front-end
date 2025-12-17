import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import AppModal from "../AppModal";

interface FormValues {
  confirm: boolean;
}

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

  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      confirm: false,
    },
  });

  const isConfirmed = watch("confirm");

  const onSubmit = () => {
    onConfirm();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("profile.delete_account")}
      actions={
        <>
          <Button
            size="sm"
            variant="orange"
            disabled={!isConfirmed}
            onClick={handleSubmit(onSubmit)}
          >
            {t("actions.delete")}
          </Button>
          <Button size="sm" variant="yellow" onClick={onClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      <p>{t("profile.delete_account_confirm")}</p>

      <FormControlLabel
        control={<Checkbox {...register("confirm")} />}
        label={t("profile.delete_account_checkbox")}
      />
    </AppModal>
  );
}
