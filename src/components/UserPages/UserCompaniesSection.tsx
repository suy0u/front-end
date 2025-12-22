import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { DataCard } from "../../components/Cards/DataCard";
import { ExportQuizButton } from "../Common/ExportQuizButton";
import { getRoleVariant } from "../../utils/companyChips";
import type { MyCompany } from "../../types/company";
import { type MembershipState } from "../../store/slices/membershipSlice";

interface Props {
  membership: MembershipState;
  onLeaveClick: (company: MyCompany) => void;
}

export default function UserCompaniesSection({
  membership,
  onLeaveClick,
}: Props) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 6 }}>
      {membership.loading && <CircularProgress />}

      {!membership.loading && !membership.myCompanies.length && (
        <Typography sx={{ opacity: 0.7 }}>{t("errors.not_found")}</Typography>
      )}

      <Stack spacing={2}>
        {membership.myCompanies.map((company: MyCompany) => (
          <DataCard
            key={company.company_id}
            to={`/companies/${company.company_id}`}
            title={
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>{company.name}</Typography>
                <Chip
                  size="sm"
                  label={company.role}
                  variant={getRoleVariant(company.role)}
                />
              </Stack>
            }
            right={
              <Stack direction="row" spacing={2}>
                {(company.role === "OWNER" || company.role === "ADMIN") && (
                  <ExportQuizButton companyId={company.company_id} />
                )}

                {company.role !== "OWNER" && (
                  <Button
                    size="sm"
                    variant="orange"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onLeaveClick(company);
                    }}
                  >
                    {t("actions.leave")}
                  </Button>
                )}
              </Stack>
            }
          ></DataCard>
        ))}
      </Stack>
    </Box>
  );
}
