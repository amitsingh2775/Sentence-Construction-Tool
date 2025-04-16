import React from 'react';
import type { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  selectedAnswers: string[];
  onSelectAnswer: (answer: string, index: number) => void;
}

export const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswers,
  onSelectAnswer,
}) => {
  const parts = question.question.split('_____________');

  return (
    <div className="space-y-6">
      <div className="text-xl text-gray-800 leading-relaxed">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span
                onClick={() => selectedAnswers[index] && onSelectAnswer(selectedAnswers[index], index)}
                className={`mx-2 px-4 py-1 rounded inline-block min-w-[120px] text-center ${
                  selectedAnswers[index]
                    ? 'bg-blue-500 text-white cursor-pointer'
                    : 'bg-gray-200'
                }`}
              >
                {selectedAnswers[index] || '____'}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => {
              const nextEmptyIndex = selectedAnswers.findIndex(answer => !answer);
              if (nextEmptyIndex !== -1) {
                onSelectAnswer(option, nextEmptyIndex);
              }
            }}
            disabled={selectedAnswers.includes(option)}
            className={`p-4 text-lg rounded-lg transition-all ${
              selectedAnswers.includes(option)
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};