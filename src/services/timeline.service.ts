import { prisma } from "@/lib/prisma";

export const timelineService = {
  async getAll() {
    const events = await prisma.event.findMany({
      include: {
        artworks: {
          include: { artwork: { select: { slug: true, title: true } } },
        },
      },
      orderBy: { dateStart: "asc" },
    });

    return events.map((event) => ({
      year: event.dateStart.getFullYear(),
      title: event.name,
      description: event.description || "",
      location: [event.city, event.state].filter(Boolean).join(", ") || event.venue || "",
      type: event.type,
      slug: event.slug,
      artworks: event.artworks.map((ea) => ({
        slug: ea.artwork.slug,
        title: ea.artwork.title,
      })),
    }));
  },
};
