import React, { useState, useRef } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

function MessageInput({ onSendMessage, onTyping }) {
  const [message, setMessage] = useState('')
  const typingTimeoutRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
      onTyping(false)
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
    onTyping(true)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:border-blue-500"
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:opacity-50"
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

export default MessageInput
