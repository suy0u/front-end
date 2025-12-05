import { Box, Typography, Paper, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { users } from "../../ mocks/users";

export default function UsersListPage() {
  return (
    <Box sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textAlign: "center" }}
      >
        Users
      </Typography>

      <Stack spacing={2}>
        {users.map((u) => (
          <Paper
            key={u.id}
            component={Link}
            to={`/users/${u.id}`}
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "20px",
              bgcolor: "#E0FFE0",
              textDecoration: "none",
              color: "inherit",
              "&:hover": { bgcolor: "#D6FFD6" },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{u.name}</Typography>
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
