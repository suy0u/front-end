import { Box, Typography, Chip } from "@mui/material";
import { getVisibilityVariant } from "../../utils/companyChips";
import CompanyActions from "./CompanyActions";
import type { Company } from "../../types/company";

interface Props {
  company: Company;
  isOwner: boolean;
  canLeave: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onLeave: () => void;
}

export default function CompanyHeader({
  company,
  isOwner,
  canLeave,
  onEdit,
  onDelete,
  onLeave,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 2,
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {company.name}
        </Typography>

        <Chip
          size="small"
          label={company.is_public ? "Public" : "Private"}
          variant={getVisibilityVariant(company.is_public)}
          sx={{ mt: 0.5 }}
        />
      </Box>

      <CompanyActions
        isOwner={isOwner}
        canLeave={canLeave}
        onEdit={onEdit}
        onDelete={onDelete}
        onLeave={onLeave}
      />
    </Box>
  );
}
