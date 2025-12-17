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
      <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
        {t("common.my")} {t("app.companies")}
      </Typography>

      {membership.loading && <CircularProgress />}

      {!membership.loading && !membership.myCompanies.length && (
        <Typography sx={{ opacity: 0.7 }}>
          {t("profile.no_companies")}
        </Typography>
      )}

      <Stack spacing={2}>
        {membership.myCompanies.map((company: MyCompany) => (
          <DataCard
            key={company.company_id}
            to={`/companies/${company.company_id}`}
            title={company.name}
            right={
              company.role !== "OWNER" && (
                <Button
                  size="sm"
                  variant="orange"
                  onClick={(e) => {
                    e.preventDefault();
                    onLeaveClick(company);
                  }}
                >
                  {t("actions.leave")}
                </Button>
              )
            }
          >
            <Chip
              size="small"
              label={company.role}
              variant={getRoleVariant(company.role)}
            />
          </DataCard>
        ))}
      </Stack>
    </Box>
  );
}
