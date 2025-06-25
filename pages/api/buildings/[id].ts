import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const building = await prisma.building.findUnique({
      where: { id },
      include: { units: true },
    });
    return res.status(200).json(building);
  }

  if (req.method === 'PUT') {
    const data = req.body;
    const building = await prisma.building.update({
      where: { id },
      data,
    });
    return res.status(200).json(building);
  }

  if (req.method === 'DELETE') {
    await prisma.building.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
