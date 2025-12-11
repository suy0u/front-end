import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setTokens } from "../../store/slices/authSlice";

export default function AuthCallback() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSynced = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || !user || isSynced.current) return;

    async function syncAuth() {
      try {
        const token = await getAccessTokenSilently();

        dispatch(setTokens({ access: token, user }));

        isSynced.current = true;

        navigate("/");
      } catch (err) {
        console.error("Auth0 sync error:", err);
      }
    }

    syncAuth();
  });

  return <div>Loading...</div>;
}
