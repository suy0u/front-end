import { Box } from "@mui/material";
import Pagination from "./Pagination";

interface ListPaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export function ListPagination({
  page,
  total,
  limit,
  onChange,
}: ListPaginationProps) {
  if (total <= limit) return null;

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <Pagination page={page} total={total} limit={limit} onChange={onChange} />
    </Box>
  );
}
