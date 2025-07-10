"use client";
import { Card, Button } from "@typequest/ui";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/profile", { credentials: "include" });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Failed to fetch profile");
      } else {
        setUser(data.user);
      }
    }
    fetchProfile();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">Profile & Settings</h2>
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : user ? (
          <div className="mb-6 text-muted-foreground">
            <div><b>Email:</b> {user.email}</div>
            <div><b>Username:</b> {user.username}</div>
            <div><b>Joined:</b> {new Date(user.createdAt).toLocaleDateString()}</div>
          </div>
        ) : null}
        <Button variant="outline">Edit Profile</Button>
      </Card>
    </main>
  );
} 