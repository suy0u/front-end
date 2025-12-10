import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { users } from "../../ mocks/users";
import { companies } from "../../ mocks/companies";
import { DataCard } from "../../components/Cards/DataCard";
import { PageCard } from "../../components/Cards/PageCard";

export default function CompanyProfilePage() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === Number(id));

  if (!company) {
    return <Typography>Company not found</Typography>;
  }

  const companyUsers = users
    .filter((u) => u.companies?.some((c) => c.companyId === company.id))
    .map((u) => ({
      ...u,
      role: u.companies.find((c) => c.companyId === company.id)?.role,
    }));

  const userCount = companyUsers.length;

  return (
    <Box sx={{ py: 6 }}>
      <PageCard>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
          {company.name}
        </Typography>

        <Chip
          label={`Users: ${userCount}`}
          sx={{
            bgcolor: "#00A779",
            color: "white",
            borderRadius: "10px",
            fontWeight: 700,
          }}
        />

        <Typography sx={{ mt: 2 }}>{company.description}</Typography>
      </PageCard>

      <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
        Users
      </Typography>

      <Stack spacing={2}>
        {companyUsers.map((user) => (
          <DataCard
            title={user.name}
            subtitle={user.role}
            to={`/users/${user.id}`}
            right={
              <Button size="sm" variant="purple">
                View
              </Button>
            }
            paperProps={{ variant: "userCard" }}
          />
        ))}
      </Stack>

      {companyUsers.length === 0 && (
        <Typography sx={{ opacity: 0.7, mt: 2 }}>
          No users found in this company.
        </Typography>
      )}
    </Box>
  );
}
