import { Stack, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DataCard } from "../../components/Cards/DataCard";

import type { User } from "../../types/user";

interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps) {
  const { t } = useTranslation();

  return (
    <Stack spacing={2}>
      {users.map((user) => (
        <DataCard
          key={user.id}
          title={user.username}
          subtitle={user.email}
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
  );
}
