import { Box } from "@mui/material";

import { HeroSection } from "../components/HomePage/HeroSection";

const appName = import.meta.env.VITE_APP_NAME || "My App";

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroSection appName={appName} />
    </Box>
  );
};

export default HomePage;
