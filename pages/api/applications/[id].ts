import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (req.method === 'GET') {
    const app = await prisma.application.findUnique({
      where: { id },
      include: { unit: true, applicant: true },
    });
    return res.status(200).json(app);
  }

  if (req.method === 'PUT') {
    const data = req.body;
    const app = await prisma.application.update({
      where: { id },
      data,
    });
    return res.status(200).json(app);
  }

  if (req.method === 'DELETE') {
    await prisma.application.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
