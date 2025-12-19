import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getQuizThunk,
  submitQuizThunk,
} from "../../../store/thunks/quizThunks";
import type { QuizSubmission } from "../../../types/quiz";

export function useQuizPage() {
  const { quizId, companyId } = useParams<{
    quizId: string;
    companyId: string;
  }>();
  const dispatch = useAppDispatch();

  const { currentQuiz, loading, error } = useAppSelector((s) => s.quiz);

  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitResult, setSubmitResult] = useState<QuizSubmission | null>(null);

  useEffect(() => {
    if (!quizId || !companyId) return;
    dispatch(
      getQuizThunk({
        quizId: quizId,
        companyId: companyId,
      })
    );
  }, [dispatch, quizId, companyId]);

  const toggleAnswer = (
    questionId: string,
    answerId: string,
    multiple: boolean
  ) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];

      const next = multiple
        ? current.includes(answerId)
          ? current.filter((id) => id !== answerId)
          : [...current, answerId]
        : [answerId];

      const updated = { ...prev, [questionId]: next };

      return updated;
    });
  };

  const submitQuiz = async () => {
    if (!currentQuiz || !companyId) return;

    try {
      const result = await dispatch(
        submitQuizThunk({
          quizId: currentQuiz.id,
          companyId: companyId,
          payload: {
            answers: Object.entries(answers).map(
              ([question_id, option_ids]) => ({
                question_id,
                option_ids,
              })
            ),
          },
        })
      ).unwrap();

      setSubmitResult(result);
      setIsSubmitSuccess(true);
    } catch (e) {
      console.error("Submit error:", e);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
  };

  const isSubmitDisabled = useMemo(() => {
    if (!currentQuiz) return true;

    return !currentQuiz.questions.every((q) => answers[q.id]?.length > 0);
  }, [currentQuiz, answers]);

  return {
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
    submitResult,
  };
}
