import { Stack, Divider, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFieldArray } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { QuizQuestion } from "./QuizQuestion";
import type { UseFormReturn } from "react-hook-form";
import type { CreateQuizPayload } from "../../../types/quiz";
import { AppTextField } from "../../TextFields/AppTextField";

interface Props {
  form: UseFormReturn<CreateQuizPayload>;
}

export function QuizForm({ form }: Props) {
  const { t } = useTranslation();

  const { control, register } = form;

  const { fields: questionFields, append } = useFieldArray({
    control,
    name: "questions",
  });

  const watchedQuestions = useWatch({
    control,
    name: "questions",
  });

  const {
    formState: { errors },
  } = form;

  return (
    <Stack spacing={3}>
      <AppTextField
        label={t("quiz.title")}
        {...register("title", {
          required: t("quiz.errors.quiz_title_required"),
        })}
        error={!!errors?.title}
        helperText={errors?.title?.message}
        fullWidth
      />

      <AppTextField
        label={t("quiz.description")}
        {...register("description")}
        fullWidth
        multiline
        rows={3}
      />

      <Divider />

      <Stack spacing={3}>
        {questionFields.map((q, index) => (
          <QuizQuestion key={q.id} index={index} form={form} />
        ))}
      </Stack>

      <Button
        variant="outlined"
        onClick={() =>
          append({
            title: "",
            is_multi_correct: false,
            position: watchedQuestions.length,
            options: [
              { text: "", is_correct: false, position: 0 },
              { text: "", is_correct: false, position: 1 },
            ],
          })
        }
      >
        {t("quiz.question.add")}
      </Button>
      <input
        type="hidden"
        {...register("questions", {
          validate: (value) =>
            value.length >= 2 || t("quiz.errors.min_questions"),
        })}
      />
      {errors?.questions?.root && (
        <Typography color="error" variant="caption">
          {errors.questions.root.message}
        </Typography>
      )}
    </Stack>
  );
}
