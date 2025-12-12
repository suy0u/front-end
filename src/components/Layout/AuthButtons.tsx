import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

const AuthButtons = () => {
  const { t } = useTranslation();
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
            {t("auth.sign_in")}
          </Button>

          <Button size="sm" variant="signUp" component={Link} to="/register">
            {t("auth.sign_up")}
          </Button>
        </>
      )}

      {token && (
        <Button size="sm" variant="purple" onClick={handleLogout}>
          {t("auth.logout")}
        </Button>
      )}
    </Box>
  );
};

export default AuthButtons;
