import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuizPage from "../pages/Quizzes/QuizPage";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockUseQuizPage = jest.fn();

jest.mock("../pages/Quizzes/hooks/useQuizPage", () => ({
  useQuizPage: () => mockUseQuizPage(),
}));

describe("QuizPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows loader when loading", () => {
    mockUseQuizPage.mockReturnValue({
      loading: true,
    });

    render(<QuizPage />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows not found message on error", () => {
    mockUseQuizPage.mockReturnValue({
      loading: false,
      error: "error",
      currentQuiz: null,
    });

    render(<QuizPage />);

    expect(screen.getByText("quiz.not_found")).toBeInTheDocument();
  });

  test("renders quiz questions and submit button", () => {
    mockUseQuizPage.mockReturnValue({
      loading: false,
      error: null,
      currentQuiz: {
        id: "1",
        title: "Test Quiz",
        company_id: "10",
        questions: [{ id: "q1", title: "Question 1", options: [] }],
      },
      answers: {},
      toggleAnswer: jest.fn(),
      submitQuiz: jest.fn(),
      isSubmitDisabled: true,
      isSubmitSuccess: false,
      setIsSubmitSuccess: jest.fn(),
      resetQuiz: jest.fn(),
      submitResult: null,
    });

    render(<QuizPage />);

    expect(
      screen.getByText((content) => content.includes("Question 1"))
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  test("shows success modal after submit", () => {
    mockUseQuizPage.mockReturnValue({
      loading: false,
      error: null,
      currentQuiz: {
        id: "1",
        company_id: "10",
        questions: [],
      },
      answers: {},
      toggleAnswer: jest.fn(),
      submitQuiz: jest.fn(),
      isSubmitDisabled: false,
      isSubmitSuccess: true,
      setIsSubmitSuccess: jest.fn(),
      resetQuiz: jest.fn(),
      submitResult: {
        correct_answers: 2,
        total_answers: 3,
        score_percent: 66,
      },
    });

    render(<QuizPage />);

    expect(screen.getByText("quiz.submission.passed")).toBeInTheDocument();

    expect(screen.getByText("quiz.correct_answers")).toBeInTheDocument();
  });
});
