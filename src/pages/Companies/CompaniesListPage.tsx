import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { companies } from "../../ mocks/companies";

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
        {companies.map((c) => (
          <Paper
            key={c.id}
            component={Link}
            to={`/companies/${c.id}`}
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "20px",
              bgcolor: "#C1FFF0",
              textDecoration: "none",
              color: "inherit",
              "&:hover": { bgcolor: "#B6FBEA" },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{c.name}</Typography>
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
    </Box>
  );
}
