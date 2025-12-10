import { Box, Typography, Stack, Button } from "@mui/material";
import { users } from "../../ mocks/users";
import { DataCard } from "../../components/Cards/DataCard";

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
        {users.map((user) => (
          <DataCard
            title={user.name}
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
    </Box>
  );
}
