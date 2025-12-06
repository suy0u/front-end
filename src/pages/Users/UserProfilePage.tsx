import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { users } from "../../ mocks/users";
import { companies } from "../../ mocks/companies";
import { DataCard } from "../../components/Cards/DataCard";
import { PageCard } from "../../components/Cards/PageCard";
import { useTranslation } from "react-i18next";

export default function UserProfilePage() {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));
  const { t } = useTranslation();

  if (!user) return <Typography>{t("app.not_found")}</Typography>;

  const companyRelations = user.companies ?? [];
  const companyCount = companyRelations.length;

  return (
    <Box sx={{ py: 6 }}>
      <PageCard>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
          {user.name}
        </Typography>

        <Chip
          label={`${t("app.companies")}: ${companyCount}`}
          sx={{
            bgcolor: "#00A779",
            color: "white",
            mb: 2,
            borderRadius: "10px",
            fontWeight: 700,
          }}
        />

        <Typography>Email: {user.email}</Typography>
      </PageCard>

      <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
        {t("app.companies")}
      </Typography>

      <Stack spacing={2}>
        {companyRelations.map((relation) => {
          const company = companies.find((c) => c.id === relation.companyId);
          if (!company) return null;
          return (
            <DataCard
              key={company.id}
              title={company.name}
              subtitle={relation.role}
              to={`/companies/${company.id}`}
              right={
                <Button size="sm" variant="purple">
                  {t("app.view")}
                </Button>
              }
              paperProps={{ variant: "companyCard" }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
