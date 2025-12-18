import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

import AppModal from "./AppModal";
import { useAppDispatch } from "../../store/hooks";
import { inviteUsersBulkThunk } from "../../store/thunks/membershipThunks";
import type { User } from "../../types/user";
import { UserSearchAutocomplete } from "../UserPages/UserSearchAutocomplete";

interface FormValues {
  users: User[];
}

interface Props {
  companyId: string;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function InviteUserModal({
  companyId,
  open,
  onClose,
  onSuccess,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      users: [],
    },
  });

  const users = watch("users");

  const onSubmit = async ({ users }: FormValues) => {
    if (users.length === 0) return;

    const res = await dispatch(
      inviteUsersBulkThunk({
        companyId,
        userIds: users.map((u) => u.id),
      })
    ).unwrap();

    if (res.skipped.length > 0) {
      console.warn("Skipped users:", res.skipped);
    }

    onSuccess?.();
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={t("actions.invite")}
      actions={
        <>
          <Button
            size="sm"
            variant="green"
            onClick={handleSubmit(onSubmit)}
            disabled={users.length === 0 || isSubmitting}
          >
            {t("actions.invite")} ({users.length})
          </Button>

          <Button size="sm" variant="yellow" onClick={handleClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Controller
          name="users"
          control={control}
          render={({ field }) => (
            <UserSearchAutocomplete
              companyId={companyId}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Box>
    </AppModal>
  );
}
