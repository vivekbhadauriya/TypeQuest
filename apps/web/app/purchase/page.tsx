"use client";
import { Card, Button } from "@typequest/ui";
import { useState } from "react";

export default function PurchasePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    setError("");
    setSuccess(false);
    const res = await fetch("/api/purchase", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Purchase failed");
    } else {
      setSuccess(true);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">Unlock Multiplayer</h2>
        <div className="mb-6 text-muted-foreground">Unlock unlimited multiplayer races for a one-time fee of <span className="font-semibold">₹9</span>.</div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success ? (
          <div className="text-green-600 font-semibold mb-2">Purchase successful! Multiplayer unlocked.</div>
        ) : (
          <Button variant="default" onClick={handlePurchase} disabled={loading}>
            {loading ? "Processing..." : "Purchase Now"}
          </Button>
        )}
      </Card>
    </main>
  );
} 