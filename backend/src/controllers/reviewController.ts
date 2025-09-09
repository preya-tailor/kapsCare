import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getAllReviews = async (req: Request, res: Response) => {
    try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
