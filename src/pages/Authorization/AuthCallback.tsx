import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setTokens } from "../../store/slices/authSlice";
import { syncAuth } from "../../api/authorization";
import { CircularProgress, Box } from "@mui/material";
import { type AuthUser } from "../../types/user";

export default function AuthCallback() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSynced = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || !user || isSynced.current) return;

    const safeUser = user ?? null;

    async function run() {
      try {
        const token = await getAccessTokenSilently();

        const backendUser = await syncAuth(
          {
            sub: safeUser.sub!,
            email: safeUser.email ?? null,
            username: safeUser.name ?? safeUser.nickname ?? null,
          },
          token
        );

        const authUser: AuthUser = {
          id: backendUser.id,
          email: backendUser.email ?? "",
          username: backendUser.username,
        };

        dispatch(setTokens({ access: token, user: authUser }));
        isSynced.current = true;

        navigate("/");
      } catch (err) {
        console.error("Auth0 sync error:", err);
      }
    }

    run();
  }, [isAuthenticated, user, dispatch, getAccessTokenSilently, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
}
