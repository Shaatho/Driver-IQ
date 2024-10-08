import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig';
import './quiz.css'; // Corrected CSS file import
import Navbar from './NavBar'; // Import the NavBar component
import QuizResults from './quizResults'; // Import the QuizResults component

const Quiz = () => {
    const { id } = useParams(); 
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({}); // Initialize as an empty object
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const snapshot = await db.collection('Matshwao').doc(id).collection('Questions').get();
                const questionsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setQuestions(questionsData);

                // Initialize selectedOptions state
                const initialSelectedOptions = {};
                questionsData.forEach((question) => {
                    initialSelectedOptions[question.id] = ''; // Initialize with an empty string
                });
                setSelectedOptions(initialSelectedOptions);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError('Failed to fetch questions');
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [id]);
 
    const handleOptionSelect = (questionId, optionIndex) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: optionIndex.toString(), // Update the selected option index as a string
        }));
    };
    
    const handleFinishQuiz = () => {
        let finalScore = 0;
        questions.forEach(question => {
            const selectedOption = selectedOptions[question.id]; // Parse the selected option as a string
            const correctAnswerIndex = question.answer; // Parse the correct answer index as a string
            
            // Check if the selected option matches the correct answer
            if (selectedOption === correctAnswerIndex) {
                finalScore++;
            }
        });

        // Set the final score and mark the quiz as completed
        setScore(finalScore);
        setQuizCompleted(true);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <>
            <Navbar />
            <div className="quiz-container">
                <h1>Quiz</h1>
                {!quizCompleted ? (
                    <>
                        {questions.map((question, index) => (
                            <div key={question.id}>
                                <h2>Question {index + 1}</h2>
                                {question.imageURL && ( // Check if imageURL exists
                                    <img src={question.imageURL} alt={`Question ${index + 1}`} className="question-image" />
                                )}
                                <h3>{question.question}</h3>
                                <ul>
                                    {question.options.map((option, optionIndex) => (
                                        <li key={optionIndex}>
                                            <input
                                                type="radio"
                                                id={`option${optionIndex}`}
                                                name={`question${index}`}
                                                value={option}
                                                checked={parseInt(selectedOptions[question.id]) === optionIndex}
                                                // Check if the current option is selected
                                                onChange={() => handleOptionSelect(question.id, optionIndex)} // Call handleOptionSelect on change
                                            />
                                            <label htmlFor={`option${optionIndex}`}>{option}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <button onClick={handleFinishQuiz}>Finish</button>
                    </>
                ) : (
                    <QuizResults score={score} questions={questions} selectedOptions={selectedOptions} />
                )}
            </div>
        </>
    );
};

export default Quiz;
