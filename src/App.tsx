import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { Question } from './components/Question';
import { FeedbackScreen } from './components/FeedbackScreen';
import { questionsData } from './data/questions';
import type { GameState } from './types';

const TIMER_DURATION = 60; // Increased time due to multiple blanks
const questions = questionsData.data.questions;

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isGameComplete: false,
    timeRemaining: TIMER_DURATION,
  });

  useEffect(() => {
    if (gameState.isGameComplete) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeRemaining <= 1) {
          handleNextQuestion();
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameComplete]);

  const handleAnswerSelect = (answer: string, blankIndex: number) => {
    const currentQuestion = questions[gameState.currentQuestionIndex];
    
    setGameState((prev) => {
      const currentAnswers = prev.answers[currentQuestion.questionId] || Array(4).fill('');
      const newAnswers = [...currentAnswers];
      newAnswers[blankIndex] = answer;

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.questionId]: newAnswers,
        },
      };
    });
  };

  const handleNextQuestion = () => {
    setGameState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= questions.length;

      if (isComplete) {
        const score = questions.reduce((acc, question) => {
          const userAnswers = prev.answers[question.questionId] || [];
          return acc + userAnswers.reduce((correct, answer, index) => 
            correct + (answer === question.correctAnswer[index] ? 1 : 0), 0);
        }, 0);

        return {
          ...prev,
          isGameComplete: true,
          score,
        };
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: TIMER_DURATION,
      };
    });
  };

  const handleRestart = () => {
    setGameState({
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isGameComplete: false,
      timeRemaining: TIMER_DURATION,
    });
  };

  if (gameState.isGameComplete) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <FeedbackScreen
            questions={questions}
            answers={gameState.answers}
            score={gameState.score}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const selectedAnswers = gameState.answers[currentQuestion.questionId] || Array(4).fill('');
  const allAnswered = selectedAnswers.every(answer => answer);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg p-8 shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-semibold">
              Question {gameState.currentQuestionIndex + 1} of {questions.length}
            </div>
            <Timer
              timeRemaining={gameState.timeRemaining}
              onTimeUp={handleNextQuestion}
            />
          </div>

          <Question
            question={currentQuestion}
            selectedAnswers={selectedAnswers}
            onSelectAnswer={handleAnswerSelect}
          />

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={!allAnswered}
              className={`px-6 py-3 rounded-lg transition-colors ${
                allAnswered
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;