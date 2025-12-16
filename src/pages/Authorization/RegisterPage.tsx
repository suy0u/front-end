import { Typography, Button } from "@mui/material";
import { AuthCard } from "../../components/Authorization/AuthorizationCard";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../api/authorization";
import { handleApiError } from "../../utils/errorHandler";
import TimedAlert from "../../components/Alerts/TimedAlert";
import { SocialAuthButtons } from "../../components/Authorization/SocialAuthButtons";
import { AppTextField } from "../../components/TextFields/AppTextField";
import { PasswordField } from "../../components/TextFields/PasswordField";

export default function RegisterPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await registerUser(email, password, username);
      navigate("/login", {
        state: {
          successMessage: "Registration successful! You can now login.",
        },
      });
    } catch (err) {
      setError(handleApiError(err));
    }
  }

  return (
    <AuthCard>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: 900, mb: 3, color: "#1d5b4e" }}
      >
        {t("auth.create_account")}
      </Typography>

      <TimedAlert message={error} severity="error" />

      <form onSubmit={handleSubmit}>
        <AppTextField
          label={t("profile.username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <AppTextField
          label={t("profile.email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordField
          label={t("profile.password")}
          value={password}
          onChange={setPassword}
          required
        />

        <Button fullWidth size="lg" variant="purple" type="submit">
          {t("auth.sign_up")}
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
