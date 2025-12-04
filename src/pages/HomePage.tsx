import { Box, Typography } from "@mui/material";

import { ApiButtonGrid } from "../components/ApiButtonGrid";
import { HealthCheckGrid } from "../components/HealthCheckGrid";
import { BottomPanel } from "../components/BottomPanel";
import { HeroSection } from "../components/HeroSection";

const appName = import.meta.env.VITE_APP_NAME || "My App";

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroSection appName={appName} />

      <BottomPanel>
        <ApiButtonGrid />

        <Typography variant="h6" sx={{ fontWeight: 800, color: "#14302A" }}>
          Healthcheck API
        </Typography>

        <HealthCheckGrid />
      </BottomPanel>
    </Box>
  );
};

export default HomePage;
