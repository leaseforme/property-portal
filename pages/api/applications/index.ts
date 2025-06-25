import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const apps = await prisma.application.findMany({
      include: { unit: true, applicant: true },
    });
    return res.status(200).json(apps);
  }

  if (req.method === 'POST') {
    const data = req.body;
    const app = await prisma.application.create({ data });
    return res.status(201).json(app);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
