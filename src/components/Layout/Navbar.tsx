import { AppBar, Toolbar } from "@mui/material";
import JellyFish from "../JellyFish/JellyFish";
import AuthButtons from "./AuthButtons";

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
      <AuthButtons />
    </Toolbar>
  </AppBar>
);

export default Navbar;
