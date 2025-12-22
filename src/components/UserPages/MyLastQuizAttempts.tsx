import { List, ListItem, ListItemText, Box } from "@mui/material";
import { useState } from "react";
import type { MyLastQuizCompletion } from "../../types/analytics";
import Pagination from "../Common/Pagination";

interface Props {
  items: MyLastQuizCompletion[];
  limit?: number;
}

export function MyLastQuizAttempts({ items, limit = 5 }: Props) {
  const [page, setPage] = useState(1);

  if (!items.length) {
    return (
      <ListItemText
        primary="No quizzes yet"
        secondary="You haven’t attempted any quizzes"
      />
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedItems = items.slice(start, end);

  return (
    <Box>
      <List>
        {paginatedItems.map((q) => (
          <ListItem key={q.quiz_id}>
            <ListItemText
              primary={q.quiz_title}
              secondary={
                q.last_attempt_at
                  ? `Last attempt: ${new Date(
                      q.last_attempt_at
                    ).toLocaleString()}`
                  : "No attempts yet"
              }
            />
          </ListItem>
        ))}
      </List>

      <Pagination
        page={page}
        total={items.length}
        limit={limit}
        onChange={setPage}
      />
    </Box>
  );
}
