import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage({
  message = "Looks like the page you are looking for is not here.",
}: {
  message?: string;
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Stack spacing={{ xs: 3, sm: 4 }} alignItems="center" textAlign="center">
        {/* Title */}
        <Typography
          sx={{
            fontSize: { xs: 40, sm: 56, md: 96 },
            fontWeight: 900,
            color: "#004D40",
            letterSpacing: "-0.04em",
          }}
        >
          WHOOPSIE!
        </Typography>

        {/* Message */}
        <Typography
          sx={{
            maxWidth: { xs: 280, sm: 360, md: 420 },
            color: "#00695C",
            fontSize: { xs: 16, sm: 18, md: 25 },
          }}
        >
          {message}
        </Typography>

        {/* Button */}
        <Button size="lg" variant="pink" onClick={() => navigate("/")}>
          Take me home
        </Button>

        {/* Character */}
        <Box
          sx={{
            mt: { xs: 2, sm: 4, md: 6 },
            width: { xs: 200, sm: 260, md: 300 },
            height: { xs: 200, sm: 260, md: 300 },
            bgcolor: "#FF9EB5",
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left Eye */}
          <Box
            className="eye"
            sx={{
              position: "absolute",
              top: { xs: 70, sm: 90, md: 110 },
              left: { xs: 50, sm: 65, md: 75 },
              width: { xs: 32, sm: 40, md: 48 },
              height: { xs: 32, sm: 40, md: 48 },
              bgcolor: "#004D40",
              borderRadius: "50%",
            }}
          />

          {/* Right Eye */}
          <Box
            className="eye"
            sx={{
              position: "absolute",
              top: { xs: 70, sm: 90, md: 110 },
              right: { xs: 50, sm: 65, md: 75 },
              width: { xs: 32, sm: 40, md: 48 },
              height: { xs: 32, sm: 40, md: 48 },
              bgcolor: "#004D40",
              borderRadius: "50%",
            }}
          />

          {/* Sad Mouth */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 70, sm: 90, md: 110 },
              left: "50%",
              transform: "translateX(-50%) rotate(180deg)",
              width: { xs: 40, sm: 50, md: 60 },
              height: { xs: 20, sm: 25, md: 30 },
              bgcolor: "#004D40",
              borderRadius: "0 0 90px 90px",
            }}
          />

          <style>
            {`
              .eye {
                animation: eyeMove 6s ease-in-out infinite, blink 5s infinite;
                transform-origin: center;
              }

              @keyframes eyeMove {
                0%   { transform: translateX(0); }
                25%  { transform: translateX(-6px); }
                50%  { transform: translateX(6px); }
                75%  { transform: translateX(-3px); }
                100% { transform: translateX(0); }
              }

              @keyframes blink {
                0%, 92%, 100% {
                  transform: scaleY(1);
                }
                95% {
                  transform: scaleY(0.1);
                }
              }
            `}
          </style>
        </Box>
      </Stack>
    </Box>
  );
}
