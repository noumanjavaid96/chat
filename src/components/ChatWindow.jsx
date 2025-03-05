import React from 'react';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';

function ChatWindow({ messages, isLoading, chatEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatWindow;
