import { Box, Typography } from "@mui/material";

import { AnalyticsCard } from "../Cards/AnalyticsCard";
import { MyLastQuizAttempts } from "./MyLastQuizAttempts";
import type { MyLastQuizCompletion } from "../../types/analytics";

interface CompanyAnalyticsCardProps {
  myLastAttempts: MyLastQuizCompletion[];
}
export default function UserAnalyticsSection({
  myLastAttempts,
}: CompanyAnalyticsCardProps) {
  return (
    <AnalyticsCard>
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>
        My Quiz Activity
      </Typography>

      <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
        <Box sx={{ flex: 1 }}>
          <MyLastQuizAttempts items={myLastAttempts} />
        </Box>
      </Box>
    </AnalyticsCard>
  );
}
