import { Box, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { useAuth0 } from "@auth0/auth0-react";

export function SocialAuthButtons() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 3,
        mb: 1,
      }}
    >
      <IconButton
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              connection: "google-oauth2",
            },
          })
        }
      >
        <GoogleIcon />
      </IconButton>

      <IconButton
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              connection: "facebook",
            },
          })
        }
      >
        <FacebookIcon />
      </IconButton>
      <IconButton
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              connection: "apple",
            },
          })
        }
      >
        <AppleIcon />
      </IconButton>
    </Box>
  );
}
