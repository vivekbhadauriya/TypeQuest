"use client";
import { Card, Button } from "@typequest/ui";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io();

export default function MultiplayerTypingTest() {
  const [roomId, setRoomId] = useState("");
  const [joinedRoom, setJoinedRoom] = useState("");
  const [progress, setProgress] = useState(0);
  const [others, setOthers] = useState<any[]>([]);
  const [input, setInput] = useState("");

  function handleCreateRoom() {
    const newRoom = Math.random().toString(36).substring(2, 8);
    setRoomId(newRoom);
    socket.emit("join-room", newRoom);
    setJoinedRoom(newRoom);
  }

  function handleJoinRoom() {
    if (roomId) {
      socket.emit("join-room", roomId);
      setJoinedRoom(roomId);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    const prog = Math.min(100, Math.floor((e.target.value.length / 30) * 100));
    setProgress(prog);
    if (joinedRoom) {
      socket.emit("typing-progress", { roomId: joinedRoom, progress: prog });
    }
  }

  socket.on("typing-progress", (data) => {
    setOthers((prev) => {
      const filtered = prev.filter((o) => o.userId !== data.userId);
      return [...filtered, data];
    });
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">Multiplayer Typing Race</h2>
        {!joinedRoom ? (
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Room code (or create new)"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleCreateRoom}>Create Room</Button>
              <Button variant="outline" onClick={handleJoinRoom}>Join Room</Button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="mb-2">Room: <b>{joinedRoom}</b></div>
            <input
              type="text"
              placeholder="Type here..."
              value={input}
              onChange={handleInput}
              className="border rounded px-3 py-2"
            />
            <div className="mt-4">Your progress: <b>{progress}%</b></div>
            <div className="mt-2 text-sm text-muted-foreground">Other players:</div>
            <ul>
              {others.map((o) => (
                <li key={o.userId}>User {o.userId}: {o.progress}%</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </main>
  );
} 