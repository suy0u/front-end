import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import { theme } from "../../theme/theme";

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
        }}
      >
        {children}
      </Box>
    </Box>
  </ThemeProvider>
);

export default Layout;
