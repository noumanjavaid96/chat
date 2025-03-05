import React from 'react';

function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://api.dicebear.com/6.x/bottts/svg?seed=AI"
        alt="AI avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="bg-white rounded-lg p-3">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
