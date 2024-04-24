import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig';
import './PractiseTest.css'; // Corrected CSS file import
import Navbar from './NavBar'; // Import the NavBar component
import Statistics from './statistics'; // Import the QuizResults component

const PractiseTest = () => {
    const { id } = useParams(); 
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(30 * 60 * 1000); // 30 minutes in milliseconds

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const chaptersSnapshot = await db.collection('Matshwao').get();
                const chaptersData = chaptersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const allQuestions = [];
                for (const chapter of chaptersData) {
                    const chapterQuestionsSnapshot = await db.collection('Matshwao').doc(chapter.id).collection('Questions').get();
                    const chapterQuestionsData = chapterQuestionsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    allQuestions.push(...chapterQuestionsData);
                }

                const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
                const selectedQuestions = shuffledQuestions.slice(0, 30);

                setQuestions(selectedQuestions);

                const initialSelectedOptions = {};
                selectedQuestions.forEach((question) => {
                    initialSelectedOptions[question.id] = '';
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
    }, []);

    const handleOptionSelect = (questionId, optionIndex) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: optionIndex.toString(),
        }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };
    
    const handleFinishQuiz = () => {
        let finalScore = 0;
        questions.forEach(question => {
            const selectedOption = selectedOptions[question.id];
            const correctAnswerIndex = question.answer;
            if (selectedOption === correctAnswerIndex) {
                finalScore++;
            }
        });

        setScore(finalScore);
        setQuizCompleted(true);
    };

    const speakQuestion = () => {
      const synth = window.speechSynthesis;
      const currentQuestion = questions[currentQuestionIndex];
      if (synth && currentQuestion) {
          let speechText = currentQuestion.question + ". Options are: ";
          currentQuestion.options.forEach((option, index) => {
              speechText += `${option}. `;
          });
          const questionUtterance = new SpeechSynthesisUtterance(speechText);
          synth.speak(questionUtterance);
      }
  };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <Navbar />
            <div className="quiz-container">
                <h1>Practise Test</h1>
                <div className="question-container">
                    {!quizCompleted ? (
                        <div className="question-card">
                            <div className="timer-container">
                                <p>Time Remaining: {formatTime(timer)}</p>
                            </div>
                            <h2>Question {currentQuestionIndex + 1}</h2>
                            {currentQuestion && currentQuestion.imageURL && (
                                <img src={currentQuestion.imageURL} alt={`Question ${currentQuestionIndex + 1}`} className="question-image" />
                            )}
                            <h3>{currentQuestion && currentQuestion.question}</h3>
                            <ul>
                                {currentQuestion && currentQuestion.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>
                                        <input
                                            type="radio"
                                            id={`option${optionIndex}`}
                                            name={`question${currentQuestionIndex}`}
                                            value={option}
                                            checked={parseInt(selectedOptions[currentQuestion.id]) === optionIndex}
                                            onChange={() => handleOptionSelect(currentQuestion.id, optionIndex)}
                                        />
                                        <label htmlFor={`option${optionIndex}`}>{option}</label>
                                    </li>
                                ))}
                            </ul>
                            <div className="button-container">
                                {currentQuestionIndex > 0 && (
                                    <button onClick={handlePreviousQuestion}>Previous</button>
                                )}
                                {currentQuestionIndex < questions.length - 1 && (
                                    <button onClick={handleNextQuestion}>Next</button>
                                )}
                                {currentQuestionIndex === questions.length - 1 && (
                                    <button onClick={handleFinishQuiz}>Finish</button>
                                )}
                                <button onClick={speakQuestion}>Speak Question</button>
                            </div>
                        </div>
                    ) : (
                        <Statistics score={score} questions={questions} selectedOptions={selectedOptions} />
                    )}
                </div>
            </div>
        </>
    );
};

const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default PractiseTest;
