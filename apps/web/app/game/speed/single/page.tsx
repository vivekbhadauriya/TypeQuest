"use client";
import { Card, Button } from "@typequest/ui";
import { useState } from "react";

export default function SinglePlayerTypingTest() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    // Simulate WPM/accuracy calculation
    const wpm = Math.floor(Math.random() * 100);
    const accuracy = Math.floor(Math.random() * 100);
    const res = await fetch("/api/game/typing/single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wpm, accuracy }),
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to submit result");
    } else {
      setResult({ wpm, accuracy });
      // Fetch stats (simulate userId as 'me')
      const statsRes = await fetch("/api/game/stats/me", { credentials: "include" });
      const statsData = await statsRes.json();
      setStats(statsData);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">Single Player Typing Test</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Type here..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" variant="secondary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Result"}
          </Button>
        </form>
        {result && (
          <div className="mt-6 text-muted-foreground">
            <div><b>WPM:</b> {result.wpm}</div>
            <div><b>Accuracy:</b> {result.accuracy}%</div>
          </div>
        )}
        {stats && (
          <div className="mt-6 text-muted-foreground">
            <div><b>Your Stats:</b></div>
            <pre className="text-xs bg-gray-100 rounded p-2 mt-2 overflow-x-auto">{JSON.stringify(stats, null, 2)}</pre>
          </div>
        )}
      </Card>
    </main>
  );
} 