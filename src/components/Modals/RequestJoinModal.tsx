import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import AppModal from "./AppModal";
import { useAppDispatch } from "../../store/hooks";
import { requestToJoinCompanyThunk } from "../../store/thunks/membershipThunks";

interface Props {
  open: boolean;
  companyId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RequestJoinModal({
  open,
  companyId,
  onClose,
  onSuccess,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { handleSubmit, formState } = useForm();

  const onSubmit = async () => {
    await dispatch(requestToJoinCompanyThunk(companyId)).unwrap();

    onSuccess?.();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={t("request.join")}
      actions={
        <>
          <Button
            size="sm"
            variant="green"
            onClick={handleSubmit(onSubmit)}
            disabled={formState.isSubmitting}
          >
            {t("actions.confirm")}
          </Button>
          <Button size="sm" variant="yellow" onClick={onClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      <Typography>{t("request.join_confirm")}</Typography>
    </AppModal>
  );
}
