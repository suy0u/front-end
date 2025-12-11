import { Typography, Button } from "@mui/material";
import { AuthCard } from "../../components/Authorization/AuthorizationCard";
import { AuthTextField } from "../../components/Authorization/AuthorizationTextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api/authorization";
import { handleApiError } from "../../utils/errorHandler";
import TimedAlert from "../../components/Alerts/TimedAlert";
import { SocialAuthButtons } from "../../components/Authorization/SocialAuthButtons";

export default function RegisterPage() {
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
        CREATE ACCOUNT
      </Typography>

      <TimedAlert message={error} severity="error" />

      <form onSubmit={handleSubmit}>
        <AuthTextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <AuthTextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthTextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button fullWidth size="lg" variant="purple" type="submit">
          Register
        </Button>
        <Typography
          sx={{ textAlign: "center", mt: 3, fontWeight: 700, color: "#1d5b4e" }}
        >
          Or continue with
        </Typography>

        <SocialAuthButtons />
      </form>
    </AuthCard>
  );
}
