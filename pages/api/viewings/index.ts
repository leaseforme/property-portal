import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const viewings = await prisma.viewing.findMany({
      include: { unit: true, scheduledBy: true },
    });
    return res.status(200).json(viewings);
  }

  if (req.method === 'POST') {
    const data = req.body;
    const viewing = await prisma.viewing.create({ data });
    return res.status(201).json(viewing);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
