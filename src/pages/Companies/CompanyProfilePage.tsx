import { Box, Typography, Paper, Chip, Button, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { users } from "../../ mocks/users";
import { companies } from "../../ mocks/companies";

export default function CompanyProfilePage() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === Number(id));

  if (!company) {
    return <Typography>Company not found</Typography>;
  }

  // users that belong to this company
  const companyUsers = users
    .filter((u) => u.companies?.some((c) => c.companyId === company.id))
    .map((u) => ({
      ...u,
      role: u.companies.find((c) => c.companyId === company.id)?.role,
    }));

  const userCount = companyUsers.length;

  return (
    <Box sx={{ py: 6 }}>
      {/* Header card */}
      <Paper
        sx={{
          p: 4,
          borderRadius: "40px",
          bgcolor: "#FFE66D",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          mb: 4,
        }}
      >
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
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
        Users
      </Typography>

      <Stack spacing={2}>
        {companyUsers.map((user) => (
          <Paper
            key={user.id}
            component={Link}
            to={`/users/${user.id}`}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "20px",
              bgcolor: "#C1FFF0",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "&:hover": { bgcolor: "#B6FBEA" },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>

              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                {user.role}
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#00A779",
                "&:hover": { bgcolor: "#008F67" },
                borderRadius: "12px",
              }}
            >
              View
            </Button>
          </Paper>
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
