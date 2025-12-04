import { Box } from "@mui/material";
import { ButtonUI } from "../ButtonUI";

const AuthButtons = () => (
  <Box sx={{ display: "flex", gap: 1.5 }}>
    <ButtonUI variant="signIn">Sign In</ButtonUI>
    <ButtonUI variant="signUp">Sign Up</ButtonUI>
  </Box>
);

export default AuthButtons;
