import {
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataCard } from "../../components/Cards/DataCard";
import { CreateCompanyModal } from "../../components/Modals/CreateCompanyModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCompanies } from "../../store/thunks/companyThunks";
import { getVisibilityVariant } from "../../utils/companyChips";

export default function CompaniesListPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { list, loading, error } = useAppSelector((state) => state.companies);

  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanies({ page: 1, size: 20 }));
  }, [dispatch]);

  return (
    <Box sx={{ py: 6 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {t("app.companies")}
        </Typography>

        <Button variant="blue" onClick={() => setCreateOpen(true)}>
          {t("actions.create")}
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Stack spacing={2}>
          {list.map((company) => (
            <DataCard
              key={company.id}
              title={company.name}
              to={`/companies/${company.id}`}
              right={
                <Stack direction="row" spacing={3} alignItems="center">
                  <Chip
                    size="small"
                    label={company.is_public ? "Public" : "Private"}
                    variant={getVisibilityVariant(company.is_public)}
                  />

                  <Button size="sm" variant="purple">
                    {t("app.view")}
                  </Button>
                </Stack>
              }
              paperProps={{ variant: "companyCard" }}
            />
          ))}
        </Stack>
      )}

      <CreateCompanyModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </Box>
  );
}
