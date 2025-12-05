import { Box, Typography } from "@mui/material";
import { FileTree } from "./FileTree";

interface HeroSectionProps {
  appName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ appName }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        pt: 6,
        pb: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: { md: "60%" },
        mx: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.6rem", md: "2.2rem" },
          fontWeight: 800,
          textAlign: "center",
          mb: 2,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#14302A",
        }}
      >
        MEET {appName} QUIZZES
      </Typography>

      <FileTree />
    </Box>
  );
};
