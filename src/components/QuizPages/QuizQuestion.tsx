import { Box, Typography, Stack } from "@mui/material";
import type { QuizQuestion } from "../../types/quiz";
import OptionButton from "./OptionButton";
import MultiHint from "./MultiHint";

interface Props {
  question: QuizQuestion;
  index: number;
  selected: string[];
  onSelect: (optionId: string, isMulti: boolean) => void;
  hint_message: string;
}

export default function QuizQuestion({
  question,
  index,
  selected,
  onSelect,
  hint_message,
}: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Typography
            sx={{
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            {index + 1}. {question.title}
          </Typography>

          {question.is_multi_correct && (
            <Box
              sx={{
                position: "relative",
                top: -6,
              }}
            >
              <MultiHint>{hint_message}</MultiHint>
            </Box>
          )}
        </Stack>

        <Box display="flex" flexDirection="column" gap={2}>
          {question.options.map((o) => (
            <OptionButton
              key={o.id}
              label={o.text}
              selected={selected.includes(o.id)}
              onClick={() => onSelect(o.id, question.is_multi_correct)}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
