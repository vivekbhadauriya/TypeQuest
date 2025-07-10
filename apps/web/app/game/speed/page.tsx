"use client";
import { Card, Button } from "@typequest/ui";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TypingTestPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl text-center mt-16 mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Typing Test</h1>
        <p className="text-muted-foreground mb-6">
          Test your typing speed and accuracy. Join a multiplayer race or practice solo!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href="/game/speed/single">Single Player</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/game/speed/multiplayer">Multiplayer</Link>
          </Button>
        </div>
      </motion.div>
      <Card className="w-full max-w-2xl p-8 mb-8">
        <div className="text-center text-muted-foreground">
          <p>Purchase required for unlimited multiplayer races after 3 free games.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/purchase">Unlock Multiplayer</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
} 