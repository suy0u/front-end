import { Button, Stack, Switch, FormControlLabel } from "@mui/material";
import AppModal from "./AppModal";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { updateCompanyThunk } from "../../store/slices/companySlice";
import type { Company, UpdateCompanyPayload } from "../../types/company";
import { AppTextField } from "../../components/TextFields/AppTextField";

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

  const [form, setForm] = useState<UpdateCompanyPayload>({
    name: company.name,
    description: company.description ?? "",
    is_public: company.is_public,
  });

  const submit = async () => {
    await dispatch(updateCompanyThunk({ id: company.id, data: form })).unwrap();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Edit company"
      actions={
        <>
          <Button size="md" variant="purple" onClick={submit}>
            Save
          </Button>
          <Button size="md" variant="yellow" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      <Stack>
        <AppTextField
          label="Company name"
          type="email"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          fullWidth
        />

        <AppTextField
          label="Description"
          multiline
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.is_public}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  is_public: e.target.checked,
                }))
              }
            />
          }
          label="Public company"
        />
      </Stack>
    </AppModal>
  );
}
