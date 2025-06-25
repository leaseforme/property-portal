import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const units = await prisma.unit.findMany();
    return res.status(200).json(units);
  }

  if (req.method === 'POST') {
    const data = req.body;
    const unit = await prisma.unit.create({ data });
    return res.status(201).json(unit);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
