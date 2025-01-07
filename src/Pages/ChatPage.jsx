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
    <div className={`${isDark ? 'dark' : ''} min-h-screen h-full bg-gray-100 dark:bg-gray-900 z-10`}>
      {/* Main Container */}
      <div className="flex flex-col w-full h-full max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="w-full bg-gray-800 dark:bg-gray-700 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Chat</h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-grow overflow-y-auto bg-white dark:bg-gray-800 px-6 py-4 rounded-b-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 max-w-[75%] rounded-lg ${
                message.type === 'user'
                  ? 'ml-auto bg-blue-500 text-white'
                  : 'mr-auto bg-gray-200 dark:bg-gray-700 text-black dar
