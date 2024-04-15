import React, { useState, useEffect } from 'react';
import { db, firebase } from './firebaseConfig';
import './PractiseTest.css';
import Navbar from './NavBar';

const PracticeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const chaptersSnapshot = await db.collection('Matshwao').get();
        const allQuestions = [];
        chaptersSnapshot.forEach((chapter) => {
          const chapterName = chapter.id;
          const chapterQuestionsSnapshot = chapter.ref.collection('Questions').get();
          chapterQuestionsSnapshot.then((snapshot) => {
            snapshot.forEach((doc) => {
              const questionData = doc.data();
              allQuestions.push(questionData);
            });
            const shuffledQuestions = shuffleArray(allQuestions);
            const selectedQuestions = shuffledQuestions.slice(0, 30);
            setQuestions(selectedQuestions);
          });
        });
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Display an error message to the user
      }
    };

    fetchQuestions();

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      // Timer reached 0, navigate to statistics page
      handleFinish();
    }
  }, [timer]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // End of questions
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    } else {
      // Beginning of questions
    }
  };

  const selectAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const speakQuestion = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex].question);
    synth.speak(utterance);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleFinish = () => {
    window.location.href = '/statistics';
  };

  return (
    <div>
      <Navbar onFinish={handleFinish} />
      <div className="practice-test-container">
        <div className="timer">Time remaining: {formatTime(timer)}</div>
        <h1>Practice Test</h1>
        <div className="question-container">
          {questions.length > 0 && (
            <>
              <p className="question">{questions[currentQuestionIndex].question}</p>
              <ul className="options">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <li key={index} className="option">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => selectAnswer(index)}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="button-container">
          <button className="speak-button" onClick={speakQuestion}>Read Question</button>
          <button className="previous-button" onClick={previousQuestion}>Previous Question</button>
          <button className="next-button" onClick={nextQuestion}>Next Question</button>
          <button className="finish-button" onClick={handleFinish}>Finish</button>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
