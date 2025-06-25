import useSWR from 'swr';
import Layout from '@/components/Layout';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function OwnerApplications() {
  const { data, error, mutate } = useSWR('/api/applications', fetcher);

  const handleApprove = async (id: string) => {
    await fetch(`/api/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'APPROVED' }),
    });
    mutate();
  };

  if (error) return <Layout>Error loading applications.</Layout>;
  if (!data) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Applications</h1>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Applicant</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((app: any) => (
              <tr key={app.id}>
                <td className="p-2 border">{app.applicant?.name}</td>
                <td className="p-2 border">
                  {app.unit?.number} – {app.unit?.building?.name}
                </td>
                <td className="p-2 border">{app.status}</td>
                <td className="p-2 border">
                  {app.status === 'PENDING' && (
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="bg-green-600 text-white px-2 py-1"
                    >
                      Approve
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
