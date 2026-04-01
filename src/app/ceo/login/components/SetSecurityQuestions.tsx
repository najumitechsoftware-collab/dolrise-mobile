"use client";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/questions.module.css";

export default function SetSecurityQuestions({ ceoId, onSuccess }: any) {
  const [questions, setQuestions] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.post(
      "https://api.dolrise.com/api/ceo/auth/security-questions/setup",
      { ceoId, questions }
    );

    onSuccess();
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Set Security Questions</h2>

      {questions.map((q, i) => (
        <div key={i}>
          <input
            placeholder="Custom Question"
            value={q.question}
            onChange={(e) => {
              const copy = [...questions];
              copy[i].question = e.target.value;
              setQuestions(copy);
            }}
          />
          <input
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => {
              const copy = [...questions];
              copy[i].answer = e.target.value;
              setQuestions(copy);
            }}
          />
        </div>
      ))}

      <button type="submit">Save Questions</button>
    </form>
  );
}
