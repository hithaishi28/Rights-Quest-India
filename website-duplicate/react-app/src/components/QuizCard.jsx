import React, { useState } from "react";

export function QuizCard({ module }) {
  const [selected, setSelected] = useState(null);
  const question = module.quiz[0];
  const correct = selected === question.answer;

  return (
    <section className="quiz-card dashboard-quiz">
      <h2>{question.question}</h2>
      <div className="answer-grid">
        {question.options.map((option, index) => (
          <button key={option} className={`answer-button ${selected !== null && index === question.answer ? "correct" : ""}`} onClick={() => setSelected(index)}>
            {option}
          </button>
        ))}
      </div>
      {selected !== null && <p className="feedback">{correct ? "Correct ✅" : "Incorrect 💡"} {question.explain}</p>}
    </section>
  );
}
