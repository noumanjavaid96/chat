import React from 'react';

function FollowUpQuestions({ questions, onQuestionClick }) {
  if (!questions.length) return null;

  return (
    <div className="p-4 bg-gray-50 border-t">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Follow-up Questions:
      </h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-sm bg-white border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-50 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FollowUpQuestions;
