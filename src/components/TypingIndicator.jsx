import React from 'react'

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gray-200" />
      <div className="bg-white rounded-lg p-3">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
