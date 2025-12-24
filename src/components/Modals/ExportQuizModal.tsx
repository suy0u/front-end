import { Stack, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { exportQuizSubmissions } from "../../store/thunks/exportThunks";
import { downloadFile } from "../../utils/downloadFile";
import { ConfirmModal } from "../Modals/ConfirmModal";

interface Props {
  open: boolean;
  quizId?: string;
  companyId: string;
  userId?: string;
  onClose: () => void;
}

export function ExportQuizModal({
  open,
  quizId,
  companyId,
  userId,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();
  const [format, setFormat] = useState<"csv" | "json">("csv");

  const handleConfirm = async () => {
    const result = await dispatch(
      exportQuizSubmissions({
        quizId,
        companyId,
        userId,
        format,
      })
    ).unwrap();

    const filename = quizId
      ? `quiz_${quizId}_submissions.${format}`
      : userId
      ? `user_${userId}_submissions.${format}`
      : `company_${companyId}_submissions.${format}`;

    downloadFile(result.blob, filename);
    onClose();
  };

  return (
    <ConfirmModal
      open={open}
      title="Export quiz submissions"
      confirmText="Export"
      cancelText="Cancel"
      confirmVariant="green"
      onConfirm={handleConfirm}
      onClose={onClose}
    >
      <Stack spacing={2}>
        <RadioGroup
          value={format}
          onChange={(e) => setFormat(e.target.value as "csv" | "json")}
        >
          <FormControlLabel
            value="csv"
            control={<Radio />}
            label="CSV (.csv)"
          />
          <FormControlLabel
            value="json"
            control={<Radio />}
            label="JSON (.json)"
          />
        </RadioGroup>
      </Stack>
    </ConfirmModal>
  );
}
