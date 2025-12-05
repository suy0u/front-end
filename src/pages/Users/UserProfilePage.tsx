import { Box, Typography, Paper, Chip, Button, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { users } from "../../ mocks/users";
import { companies } from "../../ mocks/companies";

export default function UserProfilePage() {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));

  if (!user) return <Typography>User not found</Typography>;

  const companyRelations = user.companies ?? [];
  const companyCount = companyRelations.length;

  return (
    <Box sx={{ py: 6 }}>
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
          {user.name}
        </Typography>

        <Chip
          label={`Companies: ${companyCount}`}
          sx={{
            bgcolor: "#00A779",
            color: "white",
            mb: 2,
            borderRadius: "10px",
            fontWeight: 700,
          }}
        />

        <Typography>Email: {user.email}</Typography>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
        Companies
      </Typography>

      <Stack spacing={2}>
        {companyRelations.map((relation) => {
          const company = companies.find((c) => c.id === relation.companyId);
          if (!company) return null;

          return (
            <Paper
              key={company.id}
              component={Link}
              to={`/companies/${company.id}`}
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
                <Typography sx={{ fontWeight: 700 }}>{company.name}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  {relation.role}
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
          );
        })}
      </Stack>
    </Box>
  );
}
