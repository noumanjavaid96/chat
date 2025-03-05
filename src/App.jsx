import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import FollowUpQuestions from './components/FollowUpQuestions';
import { generateResponse, generateFollowUpQuestions } from './services/openai';
import { marked } from 'marked';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=User'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiMessages = messages.concat(userMessage).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await generateResponse(apiMessages);
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=AI'
      };

      setMessages(prev => [...prev, aiMessage]);

      // Generate follow-up questions
      const questions = await generateFollowUpQuestions([...apiMessages, { role: 'assistant', content: response }]);
      setFollowUpQuestions(questions);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        avatar: 'https://api.dicebear.com/6.x/bottts/svg?seed=AI'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUpClick = (question) => {
    handleSendMessage(question);
    setFollowUpQuestions([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <ChatWindow 
            messages={messages} 
            isLoading={isLoading} 
            chatEndRef={chatEndRef}
          />
          <FollowUpQuestions 
            questions={followUpQuestions}
            onQuestionClick={handleFollowUpClick}
          />
          <MessageInput 
            onSendMessage={handleSendMessage} 
            disabled={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
