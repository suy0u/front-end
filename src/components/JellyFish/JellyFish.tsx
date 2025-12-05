import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./JellyFish.css";

import { useState } from "react";

export default function JellyFish() {
  const [bubbleStyles] = useState(() =>
    Array.from({ length: 15 }, () => ({
      width: `${Math.random() * 12 + 4}px`,
      height: `${Math.random() * 12 + 4}px`,
      top: `${Math.random() * 90 + 5}%`,
      left: `${Math.random() * 90 + 5}%`,
      animationDelay: `${Math.random() * 1.5}s`,
    }))
  );
  const navigate = useNavigate();

  return (
    <Box className="jelly-container" onClick={() => navigate("/")}>
      <Box className="simon">
        <Box className="eyes" />
        <Box className="mouth" />

        <Box component="ul" className="tentacles">
          <Box component="li" />
          <Box component="li" />
          <Box component="li" />
          <Box component="li" />
        </Box>
      </Box>

      {bubbleStyles.map((style, i) => (
        <Box key={i} className="bubble" style={style} />
      ))}
    </Box>
  );
}
