import { Box, Button } from "@mui/material";

const AuthButtons = () => (
  <Box sx={{ display: "flex", gap: 1.5 }}>
    <Button size="sm" variant="signIn">
      Sign In
    </Button>
    <Button size="sm" variant="signUp">
      Sign Up
    </Button>
  </Box>
);

export default AuthButtons;
