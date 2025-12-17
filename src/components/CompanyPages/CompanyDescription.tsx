import { Typography } from "@mui/material";

interface Props {
  description?: string | null;
}

export default function CompanyDescription({ description }: Props) {
  if (!description) return null;

  return (
    <Typography
      sx={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
      }}
    >
      {description}
    </Typography>
  );
}
