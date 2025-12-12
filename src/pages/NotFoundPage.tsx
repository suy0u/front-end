import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NotFoundLayout } from "../components/NotFoundPage/NotFoundLayout";
import { NotFoundFace } from "../components/NotFoundPage/NotFoundFace";

export default function NotFoundPage({
  message = "Looks like the page you are looking for is not here.",
}: {
  message?: string;
}) {
  const navigate = useNavigate();

  return (
    <NotFoundLayout>
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

      <Typography
        sx={{
          maxWidth: { xs: 280, sm: 360, md: 420 },
          color: "#00695C",
          fontSize: { xs: 16, sm: 18, md: 25 },
        }}
      >
        {message}
      </Typography>

      <Button variant="pink" size="lg" onClick={() => navigate("/")}>
        Take me home
      </Button>

      <NotFoundFace />
    </NotFoundLayout>
  );
}
