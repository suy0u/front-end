import { Stack, Switch, FormControlLabel, Button } from "@mui/material";
import AppModal from "./AppModal";
import { useAppDispatch } from "../../store/hooks";
import { createCompanyThunk } from "../../store/slices/companySlice";
import type { CreateCompanyPayload } from "../../types/company";
import { AppTextField } from "../../components/TextFields/AppTextField";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCompanyModal({ open, onClose }: CreateCompanyModalProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateCompanyPayload>({
    defaultValues: {
      name: "",
      description: "",
      is_public: true,
    },
  });

  const onSubmit = async (data: CreateCompanyPayload) => {
    await dispatch(createCompanyThunk(data)).unwrap();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("company.create")}
      actions={
        <>
          <Button
            size="md"
            variant="purple"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Create
          </Button>
          <Button size="md" variant="yellow" onClick={onClose}>
            Cancel
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
