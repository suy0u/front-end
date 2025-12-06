import { Box, Typography, Stack, Button } from "@mui/material";
import { companies } from "../../ mocks/companies";
import { DataCard } from "../../components/Cards/DataCard";

export default function CompaniesListPage() {
  return (
    <Box sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textAlign: "center" }}
      >
        Companies
      </Typography>

      <Stack spacing={2}>
        {companies.map((company) => (
          <DataCard
            title={company.name}
            to={`/companies/${company.id}`}
            right={
              <Button size="sm" variant="purple">
                View
              </Button>
            }
            paperProps={{ variant: "companyCard" }}
          />
        ))}
      </Stack>
    </Box>
  );
}
