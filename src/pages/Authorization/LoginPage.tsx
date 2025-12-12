import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setTokens, clearRedirect } from "../../store/slices/authSlice";
import { login } from "../../api/authorization";
import { handleApiError } from "../../utils/errorHandler";
import { AuthCard } from "../../components/Authorization/AuthorizationCard";
import TimedAlert from "../../components/Alerts/TimedAlert";
import { SocialAuthButtons } from "../../components/Authorization/SocialAuthButtons";
import { AppTextField } from "../../components/TextFields/AppTextField";

export default function LoginPage() {
  const { t } = useTranslation();

  const location = useLocation();
  const successMessage = location.state?.successMessage || null;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectPath = useAppSelector((s) => s.auth.redirectAfterLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await login(email, password);
      dispatch(
        setTokens({
          access: data.access_token,
          refresh: data.refresh_token,
          user: data.user,
        })
      );

      if (redirectPath) {
        navigate(redirectPath);
        dispatch(clearRedirect());
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(handleApiError(err));
    }
  }

  return (
    <AuthCard>
      <TimedAlert message={successMessage} severity="success" duration={5000} />

      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: 900, mb: 3, color: "#1d5b4e" }}
      >
        {t("auth.sign_in")}
      </Typography>

      <TimedAlert message={error} severity="error" />

      <form onSubmit={handleSubmit}>
        <AppTextField
          label={t("profile.email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AppTextField
          label={t("profile.password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button fullWidth size="lg" variant="green" type="submit">
          {t("auth.sign_in")}
        </Button>
        <Typography
          sx={{ textAlign: "center", mt: 3, fontWeight: 700, color: "#1d5b4e" }}
        >
          {t("auth.or_continue_with")}
        </Typography>

        <SocialAuthButtons />
      </form>
    </AuthCard>
  );
}
