// pages/index.
"use client";

import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/gpt3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      const data = await response.json();
      setAnswer(data.answer);
      setShowQuestion(true);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const handleReset = () => {
    setQuestion("");
    setAnswer("");
    setShowQuestion(false);
    setShowForm(true);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-8 text-white bg-indigo-600">
      <h1 className="text-6xl">Dental GPT</h1>
      {showForm && (
        <div className="w-full max-w-xl p-10 mx-auto border-2 border-green-50">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="myInput" className="text-2xl">
              Enter Your Question:
            </label>
            <textarea
              id="myInput"
              className="w-full h-auto px-2 text-lg text-black"
              placeholder="Enter your question"
              required
              rows="6"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {showQuestion && (
        <div className="flex flex-col gap-4">
          <p className="text-2xl">
            You asked: <span className="text-yellow-300">{question}</span>
          </p>
          <p className="text-2xl">
            Dental GPT says: <span className="text-yellow-300">{answer}</span>
          </p>
          <button
            className="inline-flex items-center justify-center px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700"
            onClick={handleReset}
          >
            Ask Another Question
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
