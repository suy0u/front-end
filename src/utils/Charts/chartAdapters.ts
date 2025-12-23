import type { ChartData } from "chart.js";

import type {
  GlobalQuizRating,
  MyQuizAverage,
  CompanyMemberWeeklyScore,
  CompanyUserWeeklyQuizScore,
} from "../../types/analytics";

export function adaptGlobalRatingChart(
  data: GlobalQuizRating
): ChartData<"doughnut"> {
  return {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [data.correct_answers, data.total_answers - data.correct_answers],
        backgroundColor: ["#4CAF50", "#E57373"],
      },
    ],
  };
}

export function adaptMyQuizAveragesChart(
  quizzes: MyQuizAverage[]
): ChartData<"bar"> {
  return {
    labels: quizzes.map((q) => q.quiz_title),
    datasets: [
      {
        label: "Average Score (%)",
        data: quizzes.map((q) => q.average_score),
        backgroundColor: "#64B5F6",
      },
    ],
  };
}

export function adaptCompanyMembersWeeklyChart(
  data: CompanyMemberWeeklyScore[]
): ChartData<"line"> {
  const labels = data.map((d) => new Date(d.period_start).toLocaleDateString());

  return {
    labels,
    datasets: [
      {
        label: "Average Score",
        data: data.map((d) => d.average_score),
        borderColor: "#7E57C2",
        backgroundColor: "rgba(126,87,194,0.2)",
        tension: 0.3,
      },
    ],
  };
}

export function adaptUserQuizScoresLineChart(
  data: CompanyUserWeeklyQuizScore[]
): ChartData<"line"> {
  const quizzes = Array.from(new Set(data.map((d) => d.quiz_id)));

  const labels = Array.from(new Set(data.map((d) => d.period_start).sort()));

  return {
    labels,
    datasets: quizzes.map((quizId) => {
      const quizData = data.filter((d) => d.quiz_id === quizId);
      return {
        label: quizData[0]?.quiz_title ?? "Quiz",
        data: labels.map(
          (l) =>
            quizData.find((d) => d.period_start === l)?.average_score ?? null
        ),
        tension: 0.3,
      };
    }),
  };
}

export function adaptCompanyUserQuizScoresChart(
  data: CompanyUserWeeklyQuizScore[]
): ChartData<"line"> {
  if (!data.length) {
    return { labels: [], datasets: [] };
  }

  const byQuiz = new Map<string, CompanyUserWeeklyQuizScore[]>();

  for (const row of data) {
    if (!byQuiz.has(row.quiz_id)) {
      byQuiz.set(row.quiz_id, []);
    }
    byQuiz.get(row.quiz_id)!.push(row);
  }

  const labels = Array.from(
    new Set(
      data
        .map((r) => r.period_start)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    )
  ).map((d) => new Date(d).toLocaleDateString());

  const datasets = Array.from(byQuiz.values()).map((rows) => {
    const sorted = [...rows].sort(
      (a, b) =>
        new Date(a.period_start).getTime() - new Date(b.period_start).getTime()
    );

    return {
      label: rows[0].quiz_title,
      data: sorted.map((r) => r.average_score),
      tension: 0.35,
    };
  });

  return { labels, datasets };
}
