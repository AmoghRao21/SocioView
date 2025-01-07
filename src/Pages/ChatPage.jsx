import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Send, Loader2, Moon, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // WebSocket connection setup and handling
  useEffect(() => {
    const connectWebSocket = () => {
      const wsConnection = new WebSocket('wss://socioview-production.up.railway.app/');

      wsConnection.onopen = () => {
        console.log('WebSocket connection established');
      };

      wsConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'requestId') {
          setRequestId(data.requestId);
        } else if (data.type === 'response') {
          setMessages((prev) => [
            ...prev,
            { text: data.message, type: 'response' }
          ]);
          setIsLoading(false);
        } else if (data.type === 'error') {
          setError(data.message);
          setIsLoading(false);
        }
      };

      wsConnection.onerror = () => {
        setError('WebSocket connection error');
        setIsLoading(false);
      };

      wsConnection.onclose = () => {
        console.log('WebSocket connection closed, attempting to reconnect...');
        setTimeout(connectWebSocket, 5000); // Try to reconnect after 5 seconds
      };

      setWs(wsConnection);
    };

    connectWebSocket();

    return () => {
      ws?.close();
    };
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !requestId || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      setMessages((prev) => [...prev, { text: inputMessage, type: 'user' }]);

      const response = await fetch('https://socioview-production.up.railway.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_value: inputMessage, requestId })
      });

      if (!response.ok) throw new Error('Failed to send message');

      setInputMessage(''); // Clear input after successful message submission
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [inputMessage, requestId, isLoading]);

  return (
    <div
      className={`${
        isDark ? 'dark' : ''
      } flex flex-col min-h-screen w-full bg-gray-100 dark:bg-gray-900 z-10`}
    >
      {/* Main Container */}
      <div className="flex flex-col flex-grow w-full h-full">
        {/* Header */}
        <div className="w-full bg-gray-800 dark:bg-gray-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Chat</h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-grow overflow-y-auto bg-white dark:bg-gray-800 px-6 py-4 w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 max-w-[75%] rounded-lg ${
                message.type === 'user'
                  ? 'ml-auto bg-blue-500 text-white'
                  : 'mr-auto bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
              }`}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin w-4 h-4" />
              <span className="text-sm">Processing...</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500 text-white rounded-lg mx-6">{error}</div>
        )}

        {/* Input Box */}
        <div className="flex gap-4 px-6 py-4 bg-gray-100 dark:bg-gray-900 w-full">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatClient;
