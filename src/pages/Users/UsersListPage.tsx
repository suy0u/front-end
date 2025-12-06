import { Box, Typography, Stack, Button } from "@mui/material";
import { users } from "../../ mocks/users";
import { DataCard } from "../../components/Cards/DataCard";
import { useTranslation } from "react-i18next";

export default function UsersListPage() {
  const { t } = useTranslation();
  return (
    <Box sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textAlign: "center" }}
      >
        {t("app.users")}
      </Typography>

      <Stack spacing={2}>
        {users.map((user) => (
          <DataCard
            title={user.name}
            to={`/users/${user.id}`}
            right={
              <Button size="sm" variant="purple">
                {t("app.view")}
              </Button>
            }
            paperProps={{ variant: "userCard" }}
          />
        ))}
      </Stack>
    </Box>
  );
}
