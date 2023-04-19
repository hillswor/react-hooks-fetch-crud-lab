import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, deleteQuestion, patchQuestion }) {
  const questionItems = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        deleteQuestion={deleteQuestion}
        patchQuestion={patchQuestion}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
