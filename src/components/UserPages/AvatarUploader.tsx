import { Box, Avatar, Button } from "@mui/material";
import { type ChangeEvent } from "react";

interface AvatarUploaderProps {
  avatarUrl?: string | null;
  onUpload: (file: File) => void;
  uploadLabel: string;
}

export function AvatarUploader({
  avatarUrl,
  onUpload,
  uploadLabel,
}: AvatarUploaderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box sx={{ mb: 3, textAlign: "center" }}>
      <Avatar
        src={avatarUrl || undefined}
        sx={{ width: 96, height: 96, mx: "auto", mb: 1 }}
      />

      <Button component="label" size="sm" variant="green">
        {uploadLabel}
        <input hidden type="file" accept="image/*" onChange={handleChange} />
      </Button>
    </Box>
  );
}
