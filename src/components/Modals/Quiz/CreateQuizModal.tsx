import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import AppModal from "../AppModal";
import { useAppDispatch } from "../../../store/hooks";
import { createQuizThunk } from "../../../store/thunks/quizThunks";

import type { CreateQuizPayload } from "../../../types/quiz";
import { QuizForm } from "./QuizForm";

interface Props {
  open: boolean;
  companyId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateQuizModal({
  open,
  companyId,
  onClose,
  onSuccess,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const form = useForm<CreateQuizPayload>({
    defaultValues: {
      title: "",
      description: "",
      questions: [createEmptyQuestion(0), createEmptyQuestion(1)],
    },
  });

  const onSubmit = async (data: CreateQuizPayload) => {
    await dispatch(createQuizThunk({ companyId, payload: data })).unwrap();

    onSuccess?.();
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={t("quiz.create")}
      actions={
        <>
          <Button
            size="sm"
            variant="green"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {t("actions.create")}
          </Button>
          <Button size="sm" variant="yellow" onClick={handleClose}>
            {t("actions.cancel")}
          </Button>
        </>
      }
    >
      <QuizForm form={form} />
    </AppModal>
  );
}

function createEmptyQuestion(position: number) {
  return {
    title: "",
    is_multi_correct: false,
    position,
    options: [createEmptyOption(0), createEmptyOption(1)],
  };
}

function createEmptyOption(position: number) {
  return {
    text: "",
    is_correct: false,
    position,
  };
}
