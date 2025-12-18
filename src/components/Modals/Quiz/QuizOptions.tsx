import { Stack, Button, Checkbox } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { CreateQuizPayload } from "../../../types/quiz";
import { useTranslation } from "react-i18next";
import { AppTextField } from "../../TextFields/AppTextField";

interface Props {
  index: number;
  form: UseFormReturn<CreateQuizPayload>;
}

export function QuizOptions({ index, form }: Props) {
  const { control, register, watch, setValue } = form;
  const { t } = useTranslation();

  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const isMultiCorrect = watch(`questions.${index}.is_multi_correct`);

  return (
    <Stack spacing={1}>
      {options.map((opt, oIndex) => (
        <Stack key={opt.id} direction="row" spacing={1} alignItems="center">
          <Controller
            name={`questions.${index}.options.${oIndex}.is_correct`}
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  if (!isMultiCorrect) {
                    options.forEach((_, i) =>
                      setValue(
                        `questions.${index}.options.${i}.is_correct`,
                        i === oIndex
                      )
                    );
                  } else {
                    field.onChange(e.target.checked);
                  }
                }}
              />
            )}
          />

          <AppTextField
            label={t("quiz.option.title")}
            {...register(`questions.${index}.options.${oIndex}.text`, {
              required: t("quiz.errors.option_title_required"),
            })}
            error={
              !!form.formState.errors?.questions?.[index]?.options?.[oIndex]
                ?.text
            }
            helperText={
              form.formState.errors?.questions?.[index]?.options?.[oIndex]?.text
                ?.message
            }
            fullWidth
          />

          {options.length > 2 && (
            <Button size="sm" color="error" onClick={() => remove(oIndex)}>
              ✕
            </Button>
          )}
        </Stack>
      ))}

      <Button
        size="sm"
        variant="outlined"
        onClick={() =>
          append({
            text: "",
            is_correct: false,
            position: options.length,
          })
        }
      >
        + {t("quiz.option.name")}
      </Button>

      <input
        type="hidden"
        {...register(`questions.${index}.options`, {
          validate: (options) => {
            if (options.length < 2) {
              return t("quiz.errors.at_least_two_options_required");
            }

            if (!options.some((o) => o.is_correct)) {
              return t("quiz.errors.one_correct_required");
            }

            return true;
          },
        })}
      />
    </Stack>
  );
}
