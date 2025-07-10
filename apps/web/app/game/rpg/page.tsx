"use client";
import { Card, Button } from "@typequest/ui";
import { useState } from "react";

export default function RPGBattleArena() {
  const [action, setAction] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    const res = await fetch("/api/game/rpg/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to submit RPG session");
    } else {
      setResult(data);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">RPG Battle Arena</h2>
        <div className="mb-6 text-muted-foreground">[Solo/PvP, HP/mana, Socket.io, XP/cosmetics UI goes here]</div>
        <Button variant="secondary">Start Solo Battle</Button>
        <Button variant="outline" className="ml-4">Join PvP Room</Button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <input
            type="text"
            placeholder="Your action (e.g. attack, spell)"
            value={action}
            onChange={e => setAction(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" variant="secondary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Action"}
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