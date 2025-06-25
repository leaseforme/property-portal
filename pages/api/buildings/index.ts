import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const buildings = await prisma.building.findMany({
      include: { units: true },
    });
    return res.status(200).json(buildings);
  }

  if (req.method === 'POST') {
    const { name, address, description, ownerId } = req.body;
    const building = await prisma.building.create({
      data: { name, address, description, ownerId },
    });
    return res.status(201).json(building);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
