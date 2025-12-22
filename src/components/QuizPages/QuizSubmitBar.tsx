import { Box, Button } from "@mui/material";

export default function QuizSubmitBar({
  disabled,
  onSubmit,
}: {
  disabled: boolean;
  onSubmit: () => void;
}) {
  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Button size="lg" variant="purple" disabled={disabled} onClick={onSubmit}>
        Submit Quiz
      </Button>
    </Box>
  );
}
