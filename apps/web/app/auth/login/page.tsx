f"use client";
import { Card, Button } from "@typequest/ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@radix-ui/react-alert-dialog";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Login failed");
    } else {
      router.push("/profile");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="w-full p-8 mt-16">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition"
              required
            />
            {error && (
              <Alert className="bg-red-100 text-red-700 rounded p-2 text-sm">{error}</Alert>
            )}
            <Button type="submit" variant="default" disabled={loading} className="flex items-center justify-center">
              {loading && <span className="loader mr-2 w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />}
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Don&apos;t have an account? <Link href="/auth/signup" className="underline hover:text-primary">Sign up</Link>
          </div>
        </Card>
      </motion.div>
      <style>{`.loader { border-right-color: transparent; border-radius: 50%; border-style: solid; border-width: 2px; }`}</style>
    </main>
  );
} 