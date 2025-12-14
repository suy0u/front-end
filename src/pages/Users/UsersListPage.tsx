import { useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import Pagination from "../../components/Pagination";
import { UsersList } from "../../components/UserPages/UserList";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers } from "../../store/thunks/userThunks";

const USERS_PER_PAGE = 10;

export default function UsersListPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { list, loading, page, total } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: USERS_PER_PAGE }));
  }, [dispatch]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(fetchUsers({ page: newPage, limit: USERS_PER_PAGE }));
    },
    [dispatch]
  );

  return (
    <Box sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textAlign: "center" }}
      >
        {t("app.users")}
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <UsersList users={list} />
      )}

      {total > USERS_PER_PAGE && (
        <Box sx={{ mt: 4 }}>
          <Pagination
            page={page}
            total={total}
            limit={USERS_PER_PAGE}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
}
