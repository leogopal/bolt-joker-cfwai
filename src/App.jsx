import { useState } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'

const WORKER_URL = 'https://cfwai-joker.leogopal.com/';

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your friendly joke bot. Ask me to tell you a joke!", isBot: true }
  ])

  const handleSendMessage = async (message) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }])

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble thinking of a joke right now!", 
        isBot: true 
      }]);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="rounded-lg border border-gray-300 p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">AI Joke Bot</h1>
        </div>
        
        <div className="h-[500px] overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
            />
          ))}
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
