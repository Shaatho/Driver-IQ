import React from 'react';

const Statistics = ({ userAnswers, questions }) => {
  // Check if questions array is defined and not empty
  const totalQuestions = questions && questions.length;

  // Calculate performance only if questions array is defined
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  const wrongQuestions = [];

  if (questions) {
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer === questions[index].answer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
        wrongQuestions.push({ 
          question: questions[index].question, 
          userAnswer: questions[index].options[userAnswer], // User's answer
          correctAnswer: questions[index].options[questions[index].answer] // Correct answer
        });
      }
    });
  }

  return (
    <div className="results-container">
      <h1>Results</h1>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {incorrectAnswers}</p>
      {incorrectAnswers > 0 && (
        <div>
          <h2>Questions with Incorrect Answers</h2>
          <ul>
            {wrongQuestions.map((item, index) => (
              <li key={index}>
                <p>Question: {item.question}</p>
                <p>User's Answer: {item.userAnswer}</p> {/* Show user's answer */}
                <p>Correct Answer: {item.correctAnswer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Statistics;
