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
      const wsConnection = new WebSocket('wss://a7e6-117-192-72-120.ngrok-free.app');

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

      const response = await fetch('https://a7e6-117-192-72-120.ngrok-free.app/chat', {
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
    <div className={`${isDark ? 'dark' : ''} min-h-screen flex flex-col z-10 bg-background`}>
      <div className="flex-grow flex flex-col justify-between p-4 max-w-screen-sm mx-auto bg-card rounded-lg shadow-lg z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 p-2">
            <MessageCircle className="text-primary w-5 h-5" />
            <h1 className="text-lg font-semibold text-primary">Chat</h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-secondary transition-colors">
            {isDark ? (
              <Sun className="w-5 h-5 text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        <div className="flex-grow overflow-y-auto mb-4 p-4 rounded-lg bg-background z-10 max-h-[calc(100vh-150px)] w-screen">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg max-w-screen-lg ${
                message.type === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground w-screen'
                  : 'mr-auto bg-secondary text-secondary-foreground w-screen'
              } break-words whitespace-normal`}>
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground z-10 w-screen">
              <Loader2 className="animate-spin w-4 h-4" />
              <span className="text-sm">Processing...</span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm z-10">
            {error}
          </div>
        )}

        <div className="flex gap-2 z-10">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 bg-background text-primary text-black rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="p-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatClient;
