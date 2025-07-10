import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
// If you need to export types, do so like this:
// export type { User, GameSession, Race, Room, Purchase } from '@prisma/client';

export async function createUser(email: string, name?: string) {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  });
}

export async function createGameSession(userId: string, gameType: string) {
  return prisma.gameSession.create({
    data: {
      userId,
      gameType,
    },
  });
}

export async function endGameSession(sessionId: string) {
  return prisma.gameSession.update({
    where: { id: sessionId },
    data: {
      endedAt: new Date(),
    },
  });
}

export async function createScore(
  userId: string,
  gameSessionId: string,
  wpm: number,
  accuracy: number
) {
  return prisma.score.create({
    data: {
      userId,
      gameSessionId,
      wpm,
      accuracy,
    },
  });
}

export async function getUserScores(userId: string) {
  return prisma.score.findMany({
    where: { userId },
    include: {
      gameSession: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getLeaderboard(gameType: string, limit = 10) {
  return prisma.score.findMany({
    where: {
      gameSession: {
        gameType,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      wpm: 'desc',
    },
    take: limit,
  });
} 