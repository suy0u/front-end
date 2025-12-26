import { renderHook, act } from "@testing-library/react";
import { useQuizPage } from "../pages/Quizzes/hooks/useQuizPage";

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    quizId: "1",
    companyId: "10",
  }),
}));

jest.mock("../store/hooks", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => ({
    currentQuiz: {
      id: "1",
      questions: [{ id: "q1" }],
    },
    loading: false,
    error: null,
  }),
}));

describe("useQuizPage", () => {
  test("toggleAnswer single select", () => {
    const { result } = renderHook(() => useQuizPage());

    act(() => {
      result.current.toggleAnswer("q1", "a1", false);
    });

    expect(result.current.answers).toEqual({
      q1: ["a1"],
    });
  });

  test("toggleAnswer multi select", () => {
    const { result } = renderHook(() => useQuizPage());

    act(() => {
      result.current.toggleAnswer("q1", "a1", true);
      result.current.toggleAnswer("q1", "a2", true);
    });

    expect(result.current.answers.q1).toEqual(["a1", "a2"]);
  });

  test("resetQuiz clears answers", () => {
    const { result } = renderHook(() => useQuizPage());

    act(() => {
      result.current.toggleAnswer("q1", "a1", false);
      result.current.resetQuiz();
    });

    expect(result.current.answers).toEqual({});
  });
});
