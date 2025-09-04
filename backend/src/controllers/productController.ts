import { PrismaClient } from '.prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      },
      include: {
        category: true
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category" });
  }
};