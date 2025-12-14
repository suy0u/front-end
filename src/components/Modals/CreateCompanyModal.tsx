import { Stack, Switch, FormControlLabel, Button } from "@mui/material";
import AppModal from "./AppModal";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { createCompanyThunk } from "../../store/slices/companySlice";
import type { CreateCompanyPayload } from "../../types/company";
import { AppTextField } from "../../components/TextFields/AppTextField";

interface CreateCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCompanyModal({ open, onClose }: CreateCompanyModalProps) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<CreateCompanyPayload>({
    name: "",
    description: "",
    is_public: true,
  });

  const submit = async () => {
    await dispatch(createCompanyThunk(form)).unwrap();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Create company"
      actions={
        <>
          <Button size="md" variant="purple" onClick={submit}>
            Create
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
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
        />

        <AppTextField
          label="Description"
          multiline
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
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
