import { Button, Stack, Switch, FormControlLabel } from "@mui/material";
import AppModal from "./AppModal";
import { useAppDispatch } from "../../store/hooks";
import { updateCompanyThunk } from "../../store/thunks/companyThunks";
import type { Company, UpdateCompanyPayload } from "../../types/company";
import { AppTextField } from "../../components/TextFields/AppTextField";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface EditCompanyModalProps {
  open: boolean;
  onClose: () => void;
  company: Company;
}

export function EditCompanyModal({
  open,
  onClose,
  company,
}: EditCompanyModalProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateCompanyPayload>({
    defaultValues: {
      name: company.name,
      description: company.description ?? "",
      is_public: company.is_public,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: company.name,
        description: company.description ?? "",
        is_public: company.is_public,
      });
    }
  }, [open, company, reset]);

  const onSubmit = async (data: UpdateCompanyPayload) => {
    await dispatch(updateCompanyThunk({ id: company.id, data })).unwrap();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("company.edit")}
      actions={
        <>
          <Button
            size="md"
            variant="purple"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {t("actions.save")}
          </Button>
          <Button size="md" variant="yellow" onClick={onClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: t("validation.required", {
              field: t("company.name"),
            }),
          }}
          render={({ field, fieldState }) => (
            <AppTextField
              {...field}
              label={t("company.name")}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <AppTextField
              {...field}
              label={t("company.description")}
              multiline
              rows={3}
              fullWidth
            />
          )}
        />

        <Controller
          name="is_public"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={t("company.ispublic_message")}
              control={
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
            />
          )}
        />
      </Stack>
    </AppModal>
  );
}
