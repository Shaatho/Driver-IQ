import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from './firebaseConfig';
import './Flashcards.css';
import Navbar from './NavBar';

const Flashcards = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const snapshot = await db.collection('Matshwao').doc(id).collection('Questions').get();
                const questionsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setQuestions(questionsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError('Failed to fetch questions');
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [id]);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
        setShowAnswers(false);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => (prevIndex - 1 + questions.length) % questions.length);
        setShowAnswers(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Navbar />
            <div className="flashcards-container">
                <h1>Flashcards</h1>
                <div className="flashcard-container">
                    {questions.length > 0 && (
                        <div className="flashcard">
                            <h2>Question {currentQuestionIndex + 1}</h2>
                            <h3>{questions[currentQuestionIndex].question}</h3>
                            {questions[currentQuestionIndex].imageURL && ( // Check if imageURL exists
                                <img src={questions[currentQuestionIndex].imageURL} alt="Question" className="question-image" />
                            )}
                            {!showAnswers && (
                                <ul className="options">
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <li key={index}>{option}</li>
                                    ))}
                                </ul>
                            )}
                            <button onClick={() => setShowAnswers(!showAnswers)}>
                                {showAnswers ? 'Hide Answers' : 'Show Answers'}
                            </button>
                            {showAnswers && (
                                <ul className="answers">
                                    <li>
                                        {questions[currentQuestionIndex].options[parseInt(questions[currentQuestionIndex].answer)]}
                                    </li>
                                </ul>
                            )}
                            <div className="navigation-buttons">
                                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                                    Previous
                                </button>
                                <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                                    Next
                                </button>
                            </div>
                            <Link to={`/quiz/${id}`} className="quiz-button">Take Quiz</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Flashcards;
