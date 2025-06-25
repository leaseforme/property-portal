import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const unit = await prisma.unit.findUnique({ where: { id } });
    return res.status(200).json(unit);
  }

  if (req.method === 'PUT') {
    const data = req.body;
    const unit = await prisma.unit.update({ where: { id }, data });
    return res.status(200).json(unit);
  }

  if (req.method === 'DELETE') {
    await prisma.unit.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
