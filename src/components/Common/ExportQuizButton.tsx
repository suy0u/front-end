import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import { ExportQuizModal } from "../Modals/ExportQuizModal";

interface Props {
  companyId: string;
  quizId?: string;
  userId?: string;
}

export const ExportQuizButton = ({ companyId, quizId, userId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="blue"
        size="sm"
        startIcon={<DownloadIcon />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Export
      </Button>

      <ExportQuizModal
        open={open}
        companyId={companyId}
        quizId={quizId}
        userId={userId}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
