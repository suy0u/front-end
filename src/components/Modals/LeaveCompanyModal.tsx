import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppModal from "../../components/Modals/AppModal";
import type { MyCompany } from "../../types/company";

interface Props {
  company: MyCompany | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LeaveCompanyModal({
  company,
  onClose,
  onConfirm,
}: Props) {
  const { t } = useTranslation();

  return (
    <AppModal
      open={!!company}
      onClose={onClose}
      title={t("company.leave_company")}
      actions={
        <>
          <Button size="sm" variant="orange" onClick={onConfirm}>
            {t("actions.leave")}
          </Button>
          <Button size="sm" variant="yellow" onClick={onClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      {t("company.leave_company_confirm", { name: company?.name })}
    </AppModal>
  );
}
