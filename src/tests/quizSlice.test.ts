import reducer, {
  clearCurrentQuiz,
  clearQuizState,
  type QuizState,
} from "../store/slices/quizSlice";

describe("quizSlice", () => {
  test("should return initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(
      expect.objectContaining({
        quizzes: [],
        currentQuiz: null,
        loading: false,
        error: null,
      })
    );
  });

  test("clearCurrentQuiz", () => {
    const state = {
      currentQuiz: { id: "1" },
    };

    const newState = reducer(state as QuizState, clearCurrentQuiz());

    expect(newState.currentQuiz).toBeNull();
  });

  test("clearQuizState", () => {
    const state = {
      quizzes: [{ id: "1" }],
      currentQuiz: { id: "1" },
      loading: true,
      error: "error",
    };

    const newState = reducer(state as QuizState, clearQuizState());

    expect(newState.quizzes).toEqual([]);
    expect(newState.currentQuiz).toBeNull();
    expect(newState.error).toBeNull();
  });
});
