import {
  Box,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QuizOptions } from "./QuizOptions";
import type { UseFormReturn } from "react-hook-form";
import type { CreateQuizPayload } from "../../../types/quiz";
import { AppTextField } from "../../TextFields/AppTextField";

interface Props {
  index: number;
  form: UseFormReturn<CreateQuizPayload>;
}

export function QuizQuestion({ index, form }: Props) {
  const { t } = useTranslation();
  const { control, register } = form;
  const {
    formState: { errors },
  } = form;

  return (
    <Box sx={{ border: "1px solid #5da979ff", p: 2, borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography fontWeight={700}>
          {t("quiz.question.name")} {index + 1}
        </Typography>

        <AppTextField
          label={t("quiz.question.title")}
          {...register(`questions.${index}.title`, {
            required: t("quiz.errors.question_title_required"),
          })}
          error={!!errors?.questions?.[index]?.title}
          helperText={errors?.questions?.[index]?.title?.message}
          fullWidth
        />

        <Controller
          name={`questions.${index}.is_multi_correct`}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={t("quiz.question.is_multi_correct")}
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
            />
          )}
        />

        <QuizOptions index={index} form={form} />
        {errors?.questions?.[index]?.options?.root && (
          <Typography color="error" variant="caption">
            {errors.questions[index].options.root.message}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
