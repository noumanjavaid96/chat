import React from 'react';
import { format } from 'date-fns';
import { marked } from 'marked';

function Message({ message }) {
  const isAI = message.sender === 'ai';

  const renderMarkdown = (text) => {
    return { __html: marked(text) };
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="flex max-w-[80%] items-start gap-2">
        <img
          src={message.avatar}
          alt={`${message.sender}'s avatar`}
          className="w-8 h-8 rounded-full mt-1"
        />
        <div
          className={`rounded-lg p-3 ${
            message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          {isAI ? (
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={renderMarkdown(message.text)}
            />
          ) : (
            <p className="text-sm">{message.text}</p>
          )}
          <time className="text-xs opacity-75 block mt-1">
            {format(new Date(message.timestamp), 'HH:mm')}
          </time>
        </div>
      </div>
    </div>
  );
}

export default Message;
