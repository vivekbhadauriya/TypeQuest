"use client";
import { Card, Button } from "@typequest/ui";
import { useState } from "react";

export default function StoryRacer() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    const res = await fetch("/api/game/story/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence }),
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to submit story session");
    } else {
      setResult(data);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">Story Racer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Type your sentence..."
            value={sentence}
            onChange={e => setSentence(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" variant="secondary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Sentence"}
          </Button>
        </form>
        {result && (
          <div className="mt-6 text-muted-foreground">
            <div><b>Result:</b> {JSON.stringify(result)}</div>
          </div>
        )}
      </Card>
    </main>
  );
} 