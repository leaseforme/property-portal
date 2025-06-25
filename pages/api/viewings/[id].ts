import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/notifications';

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
      include: { unit: { include: { building: true } }, scheduledBy: true },
    });

    if (data.status === 'COMPLETED') {
      await sendEmail(
        viewing.scheduledBy.email,
        'Viewing Completed',
        `<p>Your viewing for Unit ${viewing.unit.number} at ${viewing.unit.building.name} has been marked as completed.</p>`
      );
    }

    return res.status(200).json(viewing);
  }

  if (req.method === 'DELETE') {
    await prisma.viewing.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
