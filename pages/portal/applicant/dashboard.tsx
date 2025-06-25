import useSWR from 'swr';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ApplicantDashboard() {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id;

  const { data: apps } = useSWR(userId ? '/api/applications' : null, fetcher);
  const { data: viewings } = useSWR(userId ? '/api/viewings' : null, fetcher);

  return (
    <Layout>
      <div className="p-4 space-y-8">
        <section>
          <h1 className="text-2xl font-bold mb-2">My Applications</h1>
          {!apps ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-2">
              {apps
                .filter((a: any) => a.applicantId === userId)
                .map((a: any) => (
                  <li key={a.id} className="border p-2">
                    Unit {a.unit?.number} – {a.unit?.building?.name} –{' '}
                    <strong>{a.status}</strong>
                  </li>
                ))}
            </ul>
          )}
        </section>

        <section>
          <h1 className="text-2xl font-bold mb-2">Upcoming Viewings</h1>
          {!viewings ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-2">
              {viewings
                .filter((v: any) => v.scheduledById === userId)
                .map((v: any) => (
                  <li key={v.id} className="border p-2">
                    {new Date(v.scheduledAt).toLocaleString()} – Unit{' '}
                    {v.unit?.number} – {v.unit?.building?.name} –{' '}
                    <strong>{v.status}</strong>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
}
