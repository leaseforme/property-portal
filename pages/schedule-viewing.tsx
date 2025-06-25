import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';

export default function ScheduleViewing() {
  const router = useRouter();
  const { unit } = router.query;
  const { data: session } = useSession();
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/viewings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unitId: unit,
        scheduledAt: date,
        scheduledById: (session?.user as any)?.id,
      }),
    });
    if (res.ok) {
      router.push('/portal/applicant');
    }
  };

  return (
    <Layout>
      <div className="max-w-sm mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-4">Schedule a Viewing</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2">
            Schedule
          </button>
        </form>
      </div>
    </Layout>
  );
}
