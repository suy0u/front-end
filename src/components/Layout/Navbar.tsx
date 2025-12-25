import { AppBar, Toolbar, Box } from "@mui/material";
import JellyFish from "../JellyFish/JellyFish";
import AuthButtons from "./AuthButtons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NotificationBell } from "../Notifications/NotificationBell";

const Navbar = () => (
  <AppBar
    position="static"
    elevation={0}
    sx={{
      bgcolor: "transparent",
      borderBottom: "1px solid rgba(0,0,0,0.12)",
      pt: 1.5,
    }}
  >
    <Toolbar
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <JellyFish />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AuthButtons />
        <LanguageSwitcher />
        <NotificationBell />
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
