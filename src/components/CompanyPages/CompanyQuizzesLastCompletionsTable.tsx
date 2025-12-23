import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useMemo } from "react";
import type { CompanyUserLastAttempt } from "../../types/analytics";
import Pagination from "../Common/Pagination";

interface Props {
  data: CompanyUserLastAttempt[];
  loading: boolean;
}

const PAGE_LIMIT = 10;

export default function CompanyQuizzesLastCompletionsTable({
  data,
  loading,
}: Props) {
  const [page, setPage] = useState(1);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_LIMIT;
    const end = start + PAGE_LIMIT;
    return data.slice(start, end);
  }, [data, page]);

  if (loading) {
    return <CircularProgress />;
  }

  if (data.length === 0) {
    return <Typography sx={{ opacity: 0.7 }}>No data</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 800 }}>User</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Quiz</TableCell>
            <TableCell sx={{ fontWeight: 800 }}>Last completion</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedData.map((q) => (
            <TableRow key={`${q.user_id}-${q.quiz_id}`}>
              <TableCell>{q.username}</TableCell>
              <TableCell>{q.quiz_title}</TableCell>
              <TableCell>
                {q.last_attempt_at
                  ? new Date(q.last_attempt_at).toLocaleString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data.length > PAGE_LIMIT && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            page={page}
            total={data.length}
            limit={PAGE_LIMIT}
            onChange={setPage}
          />
        </Box>
      )}
    </Box>
  );
}
