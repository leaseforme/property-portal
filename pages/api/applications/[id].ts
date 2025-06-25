import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { sendEmail, sendSMS } from '@/lib/notifications';

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
          include: { unit: { include: { building: true } }, applicant: true },
    }
                                                  if (data.status === 'APPROVED') {
    await sendEmail(
      app.applicant.email,
      'Application Approved',
      `<p>Your application for Unit ${app.unit.number} has been approved!</p>`
    );
  }

                                               );
    return res.status(200).json(app);
  }

  if (req.method === 'DELETE') {
    await prisma.application.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
