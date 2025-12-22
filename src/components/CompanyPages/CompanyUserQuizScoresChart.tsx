import { Box, CircularProgress, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";

import { adaptCompanyUserQuizScoresChart } from "../../utils/Charts/chartAdapters";
import type { CompanyUserWeeklyQuizScore } from "../../types/analytics";

interface Props {
  data: CompanyUserWeeklyQuizScore[];
  loading?: boolean;
  userLabel?: string;
}

export default function CompanyUserQuizScoresChart({
  data,
  loading = false,
  userLabel,
}: Props) {
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data.length) {
    return (
      <Typography sx={{ opacity: 0.7 }}>
        No quiz data for selected user
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Quiz scores over time
        {userLabel && ` — ${userLabel}`}
      </Typography>

      <Line data={adaptCompanyUserQuizScoresChart(data)} />
    </Box>
  );
}
