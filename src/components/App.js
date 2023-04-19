import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);

  function deleteQuestion(id) {
    setQuestions(
      questions.filter((question) => {
        return question.id !== id;
      })
    );
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function addNewQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function patchQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return { ...question, correctIndex: updatedQuestion.correctIndex };
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      Body: {
        correctIndex: updatedQuestion.correctIndex,
      },
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onChangePage={setPage} addNewQuestion={addNewQuestion} />
      ) : (
        <QuestionList
          patchQuestion={patchQuestion}
          questions={questions}
          deleteQuestion={deleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
