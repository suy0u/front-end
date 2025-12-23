import { Box, Typography } from "@mui/material";

import { AnalyticsCard } from "../Cards/AnalyticsCard";
import CompanyUserQuizScoresChart from "./CompanyUserQuizScoresChart";
import CompanyQuizzesLastCompletionsTable from "./CompanyQuizzesLastCompletionsTable";
import { UserSearchAutocomplete } from "../UserPages/UserSearchAutocomplete";
import DateRangeSelector from "../Common/DateRangeSelector";
import type { User } from "../../types/user";
import type {
  CompanyUserWeeklyQuizScore,
  DateRangeParams,
  CompanyUserLastAttempt,
} from "../../types/analytics";

interface CompanyAnalyticsCardProps {
  companyId: string;
  selectedUsers: User[];
  userQuizScores: CompanyUserWeeklyQuizScore[];
  loading: boolean;
  dateRange: DateRangeParams;
  companyLastAttempts: CompanyUserLastAttempt[];
  onDateRangeChange: (range: DateRangeParams) => void;
  onUsersChange: (users: User[]) => void;
}

export default function CompanyAnalyticsSection({
  companyId,
  selectedUsers,
  userQuizScores,
  loading,
  dateRange,
  companyLastAttempts,
  onDateRangeChange,
  onUsersChange,
}: CompanyAnalyticsCardProps) {
  return (
    <AnalyticsCard>
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>
        Company Analytics
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box sx={{ flex: 1, maxWidth: 420 }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Select user</Typography>

          <UserSearchAutocomplete
            companyId={companyId}
            value={selectedUsers}
            onChange={(users) => onUsersChange(users.slice(0, 1))}
            scope="members"
          />

          <Box sx={{ mt: 4 }}>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Date range</Typography>

            <DateRangeSelector value={dateRange} onChange={onDateRangeChange} />
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CompanyQuizzesLastCompletionsTable
            data={companyLastAttempts}
            loading={loading}
          />
        </Box>
      </Box>

      {selectedUsers.length > 0 && (
        <CompanyUserQuizScoresChart data={userQuizScores} loading={loading} />
      )}
    </AnalyticsCard>
  );
}
