import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export const FileTree = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((s) => s.auth);
  return (
    <Box
      sx={{
        mt: 3,
        px: 3,
        py: 2,
        borderRadius: 3,
        bgcolor: "#FFE66D",
        border: "2px solid #14302A",
        boxShadow: "0 6px 0 #2D6F63",
        width: "100%",
        maxWidth: 360,
        fontFamily: '"Fira Code", Menlo, monospace',
        color: "#14302A",
      }}
    >
      <Typography variant="body2">{"/"}</Typography>

      {user && (
        <Typography
          variant="body2"
          onClick={() => navigate(`/users/${user.id}`)}
          sx={{ cursor: "pointer" }}
        >
          {"├─ profile/"}
        </Typography>
      )}
      <Typography
        variant="body2"
        onClick={() => navigate("/users")}
        sx={{ cursor: "pointer" }}
      >
        {"├─ users/"}
      </Typography>
      <Typography
        variant="body2"
        onClick={() => navigate("/companies")}
        sx={{ cursor: "pointer" }}
      >
        {"├─ companies/"}
      </Typography>
      <Typography variant="body2" sx={{ pl: 3 }}>
        {"├─ quiz/"}
      </Typography>
      <Typography variant="body2" sx={{ pl: 3 }}>
        {"├─ analytics/"}
      </Typography>
      <Typography variant="body2" sx={{ pl: 3 }}>
        {"└─ notifications/"}
      </Typography>
    </Box>
  );
};
