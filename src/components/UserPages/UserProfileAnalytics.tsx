import { Typography, Grid, Box } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getMyGlobalQuizRatingThunk,
  getMyQuizAveragesThunk,
} from "../../store/thunks/analyticsThunks";

import {
  adaptGlobalRatingChart,
  adaptMyQuizAveragesChart,
} from "../../utils/Charts/chartAdapters";

import Pagination from "../Common/Pagination";

interface Props {
  isSelf: boolean;
}

export function UserProfileAnalytics({ isSelf }: Props) {
  const dispatch = useAppDispatch();
  const { globalRating, myQuizAverages } = useAppSelector((s) => s.analytics);

  useEffect(() => {
    dispatch(getMyGlobalQuizRatingThunk());

    if (isSelf) {
      dispatch(getMyQuizAveragesThunk({}));
    }
  }, [dispatch, isSelf]);

  const LIMIT = 10;
  const [page, setPage] = useState(1);

  const paginatedQuizzes = useMemo(
    () => myQuizAverages.slice((page - 1) * LIMIT, page * LIMIT),
    [myQuizAverages, page]
  );

  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid size={{ md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Global Quiz Rating
          </Typography>

          {globalRating && (
            <Box sx={{ width: 180, height: 180 }}>
              <Doughnut
                data={adaptGlobalRatingChart(globalRating)}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout: "70%",
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ width: "100%", maxWidth: 320 }}>
          <Typography sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}>
            My Quiz Scores
          </Typography>

          <Box sx={{ height: 220 }}>
            <Bar
              data={adaptMyQuizAveragesChart(paginatedQuizzes)}
              options={{
                indexAxis: "y",
                maintainAspectRatio: false,
              }}
            />

            <Pagination
              page={page}
              total={myQuizAverages.length}
              limit={LIMIT}
              onChange={setPage}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
