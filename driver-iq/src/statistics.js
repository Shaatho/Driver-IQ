import React from 'react';
import './statistics.css'; // Import the CSS file

const Statistics = ({ score, questions, selectedOptions }) => {
    // Calculate statistics
    const calculateChapterStatistics = () => {
        const chapterStats = {};
        questions.forEach(question => {
            const selectedOption = selectedOptions[question.id];
            const correctAnswerIndex = question.answer;
            if (selectedOption === correctAnswerIndex.toString()) {
                // Correct answer
                const chapterId = question.chapterId; // Assuming each question has a chapterId property
                if (chapterStats[chapterId]) {
                    chapterStats[chapterId].correctCount += 1;
                } else {
                    chapterStats[chapterId] = { correctCount: 1, totalCount: 1 };
                }
            } else {
                // Incorrect answer
                const chapterId = question.chapterId;
                if (chapterStats[chapterId]) {
                    chapterStats[chapterId].totalCount += 1;
                } else {
                    chapterStats[chapterId] = { correctCount: 0, totalCount: 1 };
                }
            }
        });
        return chapterStats;
    };

    const chapterStatistics = calculateChapterStatistics();

    // Find chapter with most correct answers and chapter with most incorrect answers
    let mostCorrectChapter = null;
    let maxCorrectCount = 0;
    let mostIncorrectChapter = null;
    let maxIncorrectCount = 0;
    for (const chapterId in chapterStatistics) {
        const stats = chapterStatistics[chapterId];
        if (stats.correctCount > maxCorrectCount) {
            mostCorrectChapter = chapterId;
            maxCorrectCount = stats.correctCount;
        }
        const incorrectCount = stats.totalCount - stats.correctCount;
        if (incorrectCount > maxIncorrectCount) {
            mostIncorrectChapter = chapterId;
            maxIncorrectCount = incorrectCount;
        }
    }

    return (
        <div className="quiz-results-container">
            <div className="quiz-results-header">
                <h1>Statistics</h1>
                <p className="score">Your score: {score}</p>
                <div>
                    {mostCorrectChapter && (
                        <p>Chapter with most correct answers: {mostCorrectChapter}</p>
                    )}
                    {mostIncorrectChapter && (
                        <p>Chapter with most incorrect answers: {mostIncorrectChapter}</p>
                    )}
                </div>
            </div>
            <ul className="question-list">
                {questions.map((question, index) => (
                    <li key={question.id} className="question-item">
                        <p className="question-text">Question {index + 1}: {question.question}</p>
                        <p className="answer">Correct Answer: {question.options[parseInt(question.answer)]}</p>
                        <p className="answer">Your Answer: {question.options[parseInt(selectedOptions[question.id])]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Statistics;
