import useSWR from 'swr';
import Layout from '@/components/Layout';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StaffViewings() {
  const { data, error, mutate } = useSWR('/api/viewings', fetcher);

  const handleComplete = async (id: string) => {
    await fetch(`/api/viewings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'COMPLETED' }),
    });
    mutate();
  };

  if (error) return <Layout>Error loading viewings.</Layout>;
  if (!data) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Scheduled Viewings</h1>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Applicant</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v: any) => (
              <tr key={v.id}>
                <td className="p-2 border">
                  {v.unit?.number} – {v.unit?.building?.name}
                </td>
                <td className="p-2 border">{v.scheduledBy?.name}</td>
                <td className="p-2 border">
                  {new Date(v.scheduledAt).toLocaleString()}
                </td>
                <td className="p-2 border">{v.status}</td>
                <td className="p-2 border">
                  {v.status === 'SCHEDULED' && (
                    <button
                      onClick={() => handleComplete(v.id)}
                      className="bg-green-600 text-white px-2 py-1"
                    >
                      Mark Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
