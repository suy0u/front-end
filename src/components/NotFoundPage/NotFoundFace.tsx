import { Box } from "@mui/material";
import "./NotFoundFace.css";

export function NotFoundFace() {
  return (
    <Box className="face">
      <Box className="eye left" />
      <Box className="eye right" />
      <Box className="smile" />
    </Box>
  );
}
