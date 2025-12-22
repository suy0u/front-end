import { Typography, Box } from "@mui/material";
import type { Quiz } from "../../types/quiz";

export default function QuizHeader({ quiz }: { quiz: Quiz }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        {quiz.title}
      </Typography>
      {quiz.description && (
        <Typography sx={{ opacity: 0.7 }}>{quiz.description}</Typography>
      )}
    </Box>
  );
}
