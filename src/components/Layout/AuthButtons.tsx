import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

const AuthButtons = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ display: "flex", gap: 1.5 }}>
      {!token && (
        <>
          <Button size="sm" variant="signIn" component={Link} to="/login">
            Sign In
          </Button>

          <Button size="sm" variant="signUp" component={Link} to="/register">
            Sign Up
          </Button>
        </>
      )}

      {token && (
        <Button size="sm" variant="purple" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Box>
  );
};

export default AuthButtons;
