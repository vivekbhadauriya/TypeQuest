"use client";
import { Card } from "@typequest/ui";
import { useEffect, useState } from "react";

export default function StatsPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      setError("");
      const res = await fetch("/api/game/leaderboard");
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Failed to fetch leaderboard");
      } else {
        setLeaderboard(data.leaderboard || []);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">Stats & Leaderboard</h2>
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <div className="mb-6 text-muted-foreground">
            <div className="font-semibold mb-2">Leaderboard:</div>
            <ol className="list-decimal pl-6">
              {leaderboard.length === 0 && <li>No data yet.</li>}
              {leaderboard.map((entry, i) => (
                <li key={i}>{entry.username || entry.userId}: {entry.wpm || entry.score || 0} WPM</li>
              ))}
            </ol>
          </div>
        )}
      </Card>
    </main>
  );
} 