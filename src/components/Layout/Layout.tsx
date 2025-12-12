import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { theme } from "../../theme/theme";
import { BottomPanel } from "./BottomPanel";
import { HealthCheckGrid } from "./HealthCheckGrid";
import { ApiButtonGrid } from "./ApiButtonGrid";

const Layout = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          pt: 4,
          minHeight: "calc(100vh - 200px)",
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          py: 3,
        }}
      >
        <BottomPanel>
          <ApiButtonGrid />

          <Typography variant="h6" sx={{ fontWeight: 800, color: "#14302A" }}>
            Healthcheck API
          </Typography>

          <HealthCheckGrid />
        </BottomPanel>
      </Box>
    </Box>
  </ThemeProvider>
);

export default Layout;
