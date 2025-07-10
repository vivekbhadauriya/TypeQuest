"use client";
import { Card, Button } from "@typequest/ui";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Typing Test",
    description: "Single & multiplayer WPM/accuracy races, purchase gating, stats.",
    href: "/game/speed",
    icon: "⌨️",
  },
  {
    title: "RPG Battle Arena",
    description: "Solo/PvP, real-time HP/mana, XP, cosmetics, Socket.io.",
    href: "/game/rpg",
    icon: "⚔️",
  },
  {
    title: "Story Racer",
    description: "Collaborative writing, AI prompts, live voting, export story.",
    href: "/game/story",
    icon: "📖",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl text-center mt-24 mb-12"
      >
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          <span className="text-primary">TypeQuest</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Maximize your typing speed while learning programming concepts.<br />
          Multiplayer, RPG, and collaborative story modes—all in one app.
        </p>
        <Button asChild className="text-lg px-8 py-4">
          <Link href="/game/speed">Start Typing Now</Link>
        </Button>
      </motion.div>
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
          >
            <Card className="flex flex-col items-center p-8 h-full bg-card shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button asChild variant="secondary">
                <Link href={feature.href}>Explore</Link>
              </Button>
            </Card>
          </motion.div>
        ))}
      </section>
      <footer className="text-muted-foreground text-sm mb-4 opacity-70">
        &copy; {new Date().getFullYear()} TypeQuest. All rights reserved.
      </footer>
    </main>
  );
}
