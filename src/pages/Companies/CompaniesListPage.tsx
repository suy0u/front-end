import { Box, Typography, Stack, Button } from "@mui/material";
import { companies } from "../../ mocks/companies";
import { DataCard } from "../../components/Cards/DataCard";
import { useTranslation } from "react-i18next";

export default function CompaniesListPage() {
  const { t } = useTranslation();
  return (
    <Box sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textAlign: "center" }}
      >
        {t("app.companies")}
      </Typography>

      <Stack spacing={2}>
        {companies.map((company) => (
          <DataCard
            title={company.name}
            to={`/companies/${company.id}`}
            right={
              <Button size="sm" variant="purple">
                {t("app.view")}
              </Button>
            }
            paperProps={{ variant: "companyCard" }}
          />
        ))}
      </Stack>
    </Box>
  );
}
