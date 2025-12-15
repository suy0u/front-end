import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import AppModal from "./AppModal";
import { useAppDispatch } from "../../store/hooks";
import { inviteUsersBulkThunk } from "../../store/thunks/membershipThunks";
import type { User } from "../../types/user";
import { UserSearchAutocomplete } from "../UserPages/UserSearchAutocomplete";

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

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [inviting, setInviting] = useState(false);

  const handleInvite = async () => {
    if (selectedUsers.length === 0) return;

    setInviting(true);
    try {
      const res = await dispatch(
        inviteUsersBulkThunk({
          companyId,
          userIds: selectedUsers.map((u) => u.id),
        })
      ).unwrap();

      if (res.skipped.length > 0) {
        console.warn("Skipped users:", res.skipped);
      }

      onSuccess?.();
      handleClose();
    } finally {
      setInviting(false);
    }
  };

  const handleClose = () => {
    setSelectedUsers([]);
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
            onClick={handleInvite}
            disabled={selectedUsers.length === 0 || inviting}
          >
            {t("actions.invite")} ({selectedUsers.length})
          </Button>

          <Button size="sm" variant="yellow" onClick={handleClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <UserSearchAutocomplete
          companyId={companyId}
          value={selectedUsers}
          onChange={setSelectedUsers}
        />
      </Box>
    </AppModal>
  );
}
