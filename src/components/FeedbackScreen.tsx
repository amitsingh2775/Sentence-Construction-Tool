import React from 'react';
import type { Question } from '../types';


interface FeedbackScreenProps {
  questions: Question[];
  answers: Record<string, string[]>;
  score: number;
  onRestart: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  questions,
  answers,
  score,
  onRestart,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
        <p className="text-xl">
          Your score: {score} out of {questions.length * 4} points
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question) => {
          const userAnswers = answers[question.questionId] || [];
          const parts = question.question.split('_____________');
          
          return (
            <div
              key={question.questionId}
              className="p-6 rounded-lg bg-white shadow-sm"
            >
              <div className="space-y-4">
                <div className="text-lg">
                  {parts.map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < parts.length - 1 && (
                        <span className="mx-2 px-3 py-1 rounded inline-block">
                          <span className={`font-medium ${
                            userAnswers[index] === question.correctAnswer[index]
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                            {userAnswers[index] || '____'}
                          </span>
                          {userAnswers[index] !== question.correctAnswer[index] && (
                            <span className="text-sm text-gray-600 ml-2">
                              (Correct: {question.correctAnswer[index]})
                            </span>
                          )}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};