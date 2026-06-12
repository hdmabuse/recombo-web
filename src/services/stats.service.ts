import { prisma } from "@/lib/prisma";

export const statsService = {
  async getCounts() {
    const [artworks, artists, events, interviews, tags] = await Promise.all([
      prisma.artwork.count(),
      prisma.artist.count(),
      prisma.event.count(),
      prisma.interview.count(),
      prisma.tag.count(),
    ]);
    return { artworks, artists, events, interviews, tags };
  },
};
