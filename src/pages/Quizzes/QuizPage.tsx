import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { PageCard } from "../../components/Cards/PageCard";
import QuizHeader from "../../components/QuizPages/QuizHeader";
import QuizQuestion from "../../components/QuizPages/QuizQuestion";
import QuizSubmitBar from "../../components/QuizPages/QuizSubmitBar";
import AppModal from "../../components/Modals/AppModal";

import { useQuizPage } from "./hooks/useQuizPage";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    currentQuiz,
    loading,
    error,
    answers,
    toggleAnswer,
    submitQuiz,
    isSubmitDisabled,
    isSubmitSuccess,
    setIsSubmitSuccess,
    resetQuiz,
  } = useQuizPage();

  if (loading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !currentQuiz) {
    return (
      <Typography sx={{ py: 6, textAlign: "center" }}>
        {t("quiz.not_found")}
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 6 }}>
      <PageCard>
        <QuizHeader quiz={currentQuiz} />

        {currentQuiz.questions.map((q, index) => (
          <QuizQuestion
            key={q.id}
            index={index}
            question={q}
            selected={answers[q.id] || []}
            onSelect={(optionId, isMulti) =>
              toggleAnswer(q.id, optionId, isMulti)
            }
            hint_message={t("quiz.hints.can_multiple_select")}
          />
        ))}

        <QuizSubmitBar disabled={isSubmitDisabled} onSubmit={submitQuiz} />
      </PageCard>
      <AppModal
        open={isSubmitSuccess}
        title={t("quiz.submission.passed")}
        onClose={() => setIsSubmitSuccess(false)}
        actions={
          <>
            <Button
              variant="yellow"
              onClick={() => {
                setIsSubmitSuccess(false);
                resetQuiz();
              }}
            >
              {t("actions.repeat")}
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                navigate(`/companies/${currentQuiz.company_id}`);
              }}
            >
              {t("actions.move_to.companies")}
            </Button>
          </>
        }
      >
        <Box sx={{ fontSize: 18, mt: 2 }}>{t("common.what_next")}</Box>
      </AppModal>
    </Box>
  );
}
