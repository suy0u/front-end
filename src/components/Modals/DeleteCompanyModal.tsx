import { Button, Checkbox, FormControlLabel } from "@mui/material";
import AppModal from "./AppModal";
import { useAppDispatch } from "../../store/hooks";
import { deleteCompanyThunk } from "../../store/thunks/companyThunks";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormValues {
  confirm: boolean;
}

interface DeleteCompanyModalProps {
  open: boolean;
  onClose: () => void;
  companyId: string;
}

export function DeleteCompanyModal({
  open,
  onClose,
  companyId,
}: DeleteCompanyModalProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { confirm: false },
  });

  const confirmed = watch("confirm");

  const onSubmit = async () => {
    await dispatch(deleteCompanyThunk(companyId)).unwrap();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("company.delete")}
      actions={
        <>
          <Button
            size="sm"
            color="error"
            disabled={!confirmed}
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
      <p>{t("company.delete_confirm")}</p>

      <Controller
        name="confirm"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label={t("company.delete_company_checkbox")}
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
          />
        )}
      />
    </AppModal>
  );
}
