import { useState, useEffect, useRef } from "react";
import "./App.css";

interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { text: "hi", isUser: true },
    { text: "hello", isUser: false },
  ]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      setMessages((m) => [...m, { text: event.data, isUser: false }]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        }),
      );
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleSend = () => {
    const message = inputRef?.current?.value;
    if (!message || !message.trim()) return;

    setMessages((m) => [...m, { text: message, isUser: true }]);
    if (wsRef?.current) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        }),
      );
    }
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background nebula effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main chat container */}
      <div className="relative w-full max-w-2xl h-screen md:h-[600px] rounded-3xl bg-slate-900 bg-opacity-80 backdrop-blur-xl border-4 border-cyan-400 shadow-2xl shadow-cyan-500/50 flex flex-col animate-float">
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-cyan-400 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <h1 className="text-2xl font-black text-cyan-300 drop-shadow-lg">
            CREW COMMS
          </h1>
          <p className="text-xs text-purple-300 font-bold">SPACESHIP CHANNEL</p>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-slate-800">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-center text-cyan-300/50 font-bold text-lg">
                No messages yet...
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-slideIn`}
              >
                {/* Message bubble */}
                <div
                  className={`max-w-xs px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-default ${
                    msg.isUser
                      ? "bg-gradient-to-br from-red-600 to-red-700 text-white border-2 border-red-400 shadow-lg shadow-red-500/50"
                      : "bg-gradient-to-br from-cyan-500 to-cyan-600 text-slate-900 border-2 border-cyan-300 shadow-lg shadow-cyan-400/50"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input area */}
        <div className="px-4 py-4 border-t-2 border-cyan-400 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type message..."
              ref={inputRef}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-slate-800 text-white placeholder-slate-400 rounded-full px-5 py-3 font-bold border-2 border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-200 shadow-inner"
            />

            <button
              onClick={handleSend}
              className="px-6 py-3 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white font-black border-2 border-red-400 hover:shadow-lg hover:shadow-red-500/50 hover:scale-110 active:scale-95 transition-all duration-200 uppercase text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
