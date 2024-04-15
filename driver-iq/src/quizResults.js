import React from 'react';
import './quizResults.css'; // Import the CSS file

const QuizResults = ({ score, questions, selectedOptions }) => {
    return (
        <div className="quiz-results-container">
            <div className="quiz-results-header">
                <h1>Quiz Results</h1>
                <p className="score">Your score: {score}</p>
            </div>
            <ul className="question-list">
                {questions.map((question, index) => (
                    <li key={question.id} className="question-item">
                        <p className="question-text">Question {index + 1}: {question.question}</p>
                        <p className="answer">Correct Answer: {question.options[parseInt(question.answer)]}</p>
                        <p className="answer">Your Answer: {selectedOptions[question.id]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizResults;
