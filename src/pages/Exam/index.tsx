import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";

import { Separator } from "../../components/Separator";

import { api } from "../../services/api.service";
import { Container } from "./styles";

type AlternativeData = {
  id: string;
  title: string;
  isCorrect: boolean;
  questionId: string;
};

type QuestionData = {
  id: string;
  answer: string;
  grade: number;
  alternatives: string[];
  commentary: string;
  question: {
    id: string;
    title: string;
    type: "open" | "single" | "multiple";
    difficulty: "easy" | "medium" | "hard";
    alternatives: AlternativeData[];
  };
};

type ExamData = {
  id: string;
  status: "draft" | "published" | "waiting_for_review" | "finished";
  grade: number;
  title: string;
  description: string;
  createdAt: string;
  questions: QuestionData[];
};

export function Exam() {
  const { examId } = useParams();

  const [exam, setExam] = useState<ExamData | null>(null);
  const [reload, setReload] = useState(false);

  const disabled = exam?.status !== "published";
  let status = "";

  if (exam?.status === "draft") {
    status = "Rascunho";
  } else if (exam?.status === "waiting_for_review") {
    status = "Aguardando revisão";
  } else if (exam?.status === "finished") {
    status = "Finalizada";
  }

  async function handleSubmitExam(event: FormEvent) {
    event.preventDefault();
    if (exam) {
      try {
        const response = await api.post("/exams/submit", {
          questions: exam.questions,
        });
        console.log(response.data);
        // setExam({ ...exam, status: "waiting_for_review" });
        setReload(!reload);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleMarkAlternative(question: QuestionData, alternativeId: string, answer: string) {
    if (!exam) {
      return;
    }

    const selectedQuestion = exam.questions.find((q) => q.id === question.id)?.question;

    if (selectedQuestion?.type === "open") {
      question.answer = answer;
      return;
    }

    if (question.alternatives && selectedQuestion?.type === "multiple") {
      const findIndex = question.alternatives.findIndex((a) => a === alternativeId);
      if (findIndex === -1) {
        question.alternatives.push(alternativeId);
      } else {
        question.alternatives.splice(findIndex, 1);
      }
    } else {
      question.alternatives = [alternativeId];
    }

    setExam({ ...exam });
  }

  setTimeout(() => {
    function onTextAreaInput(this: HTMLTextAreaElement) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    const textareas = document.getElementsByTagName("textarea");

    for (const textarea of textareas) {
      textarea.setAttribute("style", "height:" + textarea.scrollHeight + "px;overflow-y:hidden;");
      textarea.addEventListener("input", onTextAreaInput, false);
    }
  }, 500);

  useEffect(() => {
    async function loadExam() {
      const response = await api.get(`/exams/${examId}`);
      setExam(response.data);
    }

    loadExam();
  }, [reload]);

  return (
    <Container>
      <h1>{exam?.title}</h1>
      <h3>{status}</h3>
      <p>{exam?.description}</p>
      <Separator />
      <h2>Questões</h2>

      <form className="content" onSubmit={handleSubmitExam}>
        {exam?.questions.map((question, index) => (
          <div className="question" key={question.id}>
            <div>
              <span>
                {index + 1}. {question.question.title}
              </span>
              {exam?.status === "waiting_for_review" && <span className="grade">Nota: {Number(question.grade).toFixed(0)}</span>}
            </div>

            {question.question.type === "open" ? (
              <textarea
                value={question.answer}
                disabled={disabled}
                placeholder="Resposta..."
                onChange={(event) => handleMarkAlternative(question, "", event.target.value)}
              />
            ) : (
              <div className="alternatives">
                {question.question.alternatives.map((alternative) => (
                  <div key={alternative.id}>
                    {question.question.type === "single" ? (
                      <>
                        <input
                          onChange={() => handleMarkAlternative(question, alternative.id, "")}
                          name={question.id}
                          type="radio"
                          disabled={disabled}
                          checked={question.alternatives?.includes(alternative.id)}
                        />
                      </>
                    ) : (
                      <input
                        disabled={disabled}
                        type="checkbox"
                        onChange={() => handleMarkAlternative(question, alternative.id, "")}
                        checked={question.alternatives?.includes(alternative.id)}
                      />
                    )}
                    <span>{alternative.title}</span>
                    {exam?.status === "waiting_for_review" && <span>{alternative.isCorrect ? "✓" : "✕"}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <Button disabled={disabled} type="submit">
          Enviar
        </Button>
      </form>
    </Container>
  );
}
