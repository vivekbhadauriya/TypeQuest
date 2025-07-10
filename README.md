# TypeQuest

A full-stack typing game platform built with Next.js, Express.js, and TypeScript.

## Features

- **Typing Test Mode**
  - Single-player WPM & accuracy tests
  - Multiplayer races with real-time progress
  - Free for 3 races, then ₹9 lifetime unlock

- **RPG Battle Arena**
  - Solo vs. AI or PvP battles
  - Real-time HP/Mana sync
  - XP & leveling system

- **Story Racer**
  - Collaborative writing rooms
  - AI-seeded prompts
  - Real-time voting & progress

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Zustand
- **Backend**: Express.js, TypeScript, Socket.io, Auth.js, Redis
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: Auth.js with JWT in HTTP-only cookies
- **Real-Time**: Socket.io + Redis Pub/Sub
- **Email**: Resend
- **Export**: html2canvas, PDFKit

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL
- Redis

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/TypeQuest.git
   cd TypeQuest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env
   cp apps/server/.env.example apps/server/.env
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

### Development

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps and packages
- `npm run lint` - Run ESLint
- `npm run check-types` - Run TypeScript type checking

## Project Structure

```
TypeQuest/
├── apps/
│   ├── web/       # Next.js frontend
│   └── server/    # Express.js backend
├── packages/
│   ├── db/        # Prisma schema & migrations
│   └── ui/        # Shared React components
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
