# React + TypeScript + Vite | WebSocket Chat Application

A real-time chat application built with React, TypeScript, and Vite on the frontend, connected to a WebSocket server backend. Features an **Among Us-inspired themed UI** with glassmorphism effects, neon colors, and smooth animations.

## Stack

**Frontend:**

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling with custom animations)
- WebSocket API for real-time communication

**Backend:**

- Node.js + TypeScript
- `ws` library (WebSocket server)
- Room-based chat system

## Features

- ✨ **Among Us Inspired Theme** - Dark space background, neon cyan/red accents, cartoon-style UI
- 🎨 **Glassmorphism Design** - Backdrop blur effects, gradient containers
- 💬 **Real-time Messaging** - WebSocket-based communication
- 🚀 **Room-based Chat** - Users can join different chat rooms
- 📱 **Responsive Design** - Works on mobile and desktop
- ⌨️ **Enter to Send** - Quick messaging with keyboard support
- 🎭 **Message Styling** - Different colors for user vs other messages

## Frontend Setup

```bash
cd fr-chat-application
npm install
npm run dev
```

Runs on `http://localhost:5173`

## Backend Setup

```bash
cd ../chat-app
npm install
npm run dev
```

Runs on `ws://localhost:8080`

## Protocol & Payloads

### Frontend → Backend (WebSocket Messages)

#### Join Room

```json
{
  "type": "join",
  "payload": {
    "roomId": "red"
  }
}
```

#### Send Chat Message

```json
{
  "type": "chat",
  "payload": {
    "message": "Hello everyone!"
  }
}
```

### Backend → Frontend

Receives text message directly from server (string format):

```text
"Hello everyone!"
```

### Data Flow

1. **User connects** → Browser initiates WebSocket to `ws://localhost:8080`
2. **Join room** → Client sends `{ type: "join", payload: { roomId: "red" } }`
3. **Backend stores** → User added to `AllUsers[]` array with socket & room info
4. **User sends message** → Client sends `{ type: "chat", payload: { message: "..." } }`
5. **Backend broadcasts** → Server finds all users in same room and sends message to their sockets
6. **Frontend receives** → Message arrives as string, added to state with `isUser: false`

## Frontend Architecture

### App.tsx

- Manages WebSocket connection with refs
- Maintains message state (`Message[]` interface)
- Handles message sending & keyboard input
- Sends JSON payloads to backend

### App.css

- Tailwind CSS with custom animations
- `@keyframes float` - Container floating effect
- `@keyframes slideIn` - Message entrance animation
- `@keyframes blob` - Background nebula movement
- Custom scrollbar styling

## Backend Architecture

### src/index.ts

- WebSocket server on port 8080
- `User` interface tracks socket + room
- `AllUsers[]` array stores connected users
- Message routing by room ID
- Broadcasts chat messages to room members

## UI Features

- **Message Bubbles**: Red for current user, cyan for others
- **Responsive**: Full screen mobile, `max-w-2xl` container on desktop
- **Animations**: Float effect on container, slide-in for messages
- **Input**: Bottom-fixed rounded input with Enter key support
- **Colors**: Slate/cyan/red palette with neon glows

## Development

### Hot Reload

- Frontend: Vite HMR enabled
- Backend: Use `ts-node --watch` or similar

### Debugging

- Check WebSocket connection in browser DevTools → Network → WS
- Server logs: `"user has joined the chat"` message count
- Message payload: Inspect JSON in browser console

## Future Enhancements

- User profiles & display names
- Message timestamps
- Typing indicators
- User list sidebar
- Message persistence (database)
- Authentication
