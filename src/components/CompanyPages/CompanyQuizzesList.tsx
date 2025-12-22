import { useEffect, useState, useCallback } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DataCard } from "../Cards/DataCard";
import { ListSection } from "../Common/ListSection";
import { ListPagination } from "../Common/ListPagination";
import { ConfirmModal } from "../Modals/ConfirmModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  listQuizzesThunk,
  deleteQuizThunk,
} from "../../store/thunks/quizThunks";

import type { Quiz } from "../../types/quiz";

interface ConfirmDeleteState {
  quiz: Quiz;
}

interface Props {
  companyId: string;
  canManage?: boolean;
}

const QUIZZES_PER_PAGE = 10;

export function CompanyQuizzesList({ companyId, canManage }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { quizzes, loading, total, page } = useAppSelector((s) => s.quiz);

  const [confirmDelete, setConfirmDelete] = useState<ConfirmDeleteState | null>(
    null
  );

  const loadQuizzes = useCallback(() => {
    dispatch(
      listQuizzesThunk({
        companyId,
        page,
        size: QUIZZES_PER_PAGE,
      })
    );
  }, [dispatch, companyId, page]);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  const handlePageChange = (newPage: number) => {
    dispatch(
      listQuizzesThunk({
        companyId,
        page: newPage,
        size: QUIZZES_PER_PAGE,
      })
    );
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;

    await dispatch(
      deleteQuizThunk({
        quizId: confirmDelete.quiz.id,
        companyId,
      })
    ).unwrap();

    setConfirmDelete(null);

    loadQuizzes();
  };

  return (
    <>
      <ListSection
        loading={loading}
        empty={!loading && quizzes.length === 0}
        emptyText={t("errors.not_found")}
      >
        {quizzes.map((quiz) => (
          <DataCard
            key={quiz.id}
            title={quiz.title}
            subtitle={quiz.description}
            to={`/companies/${companyId}/quizzes/${quiz.id}`}
            right={
              canManage && (
                <Button
                  size="sm"
                  variant="orange"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmDelete({ quiz });
                  }}
                >
                  {t("actions.delete")}
                </Button>
              )
            }
          />
        ))}
      </ListSection>

      {total > QUIZZES_PER_PAGE && (
        <ListPagination
          page={page}
          total={total}
          limit={QUIZZES_PER_PAGE}
          onChange={handlePageChange}
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          open
          title={t("quiz.delete")}
          confirmText={t("actions.confirm")}
          cancelText={t("actions.cancel")}
          onConfirm={handleDelete}
          onClose={() => setConfirmDelete(null)}
        >
          {t("quiz.delete_confirm", {
            name: confirmDelete.quiz.title,
          })}
        </ConfirmModal>
      )}
    </>
  );
}
