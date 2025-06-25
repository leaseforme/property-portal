import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const viewing = await prisma.viewing.findUnique({
      where: { id },
      include: { unit: true, scheduledBy: true },
    });
    return res.status(200).json(viewing);
  }

  if (req.method === 'PUT') {
    const data = req.body;
    const viewing = await prisma.viewing.update({
      where: { id },
      data,
    });
    return res.status(200).json(viewing);
  }

  if (req.method === 'DELETE') {
    await prisma.viewing.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
