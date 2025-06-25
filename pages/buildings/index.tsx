import useSWR from 'swr';
import Layout from '@/components/Layout';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BuildingsList() {
  const { data, error } = useSWR('/api/buildings', fetcher);

  if (error) return <div>Failed to load buildings.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Available Buildings</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((b: any) => (
            <Link key={b.id} href={`/buildings/${b.id}`} className="border p-4 hover:shadow">
              <h2 className="text-xl font-semibold">{b.name}</h2>
              <p>{b.address}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
