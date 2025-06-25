import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import { prisma } from '@/lib/prisma';

interface Props {
  building: any | null;
}

export default function BuildingDetail({ building }: Props) {
  if (!building) return <Layout>Building not found.</Layout>;

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-2">{building.name}</h1>
        <p className="mb-4">{building.address}</p>
        <h2 className="text-2xl font-semibold mb-2">Units</h2>
        <ul className="space-y-2">
          {building.units.map((u: any) => (
            <li key={u.id} className="border p-2">
              <div className="flex justify-between">
                <span>
                  Unit {u.number} – {u.size} sqft – ${u.price}
                </span>
                {u.available ? (
                  <a
                    href={`/schedule-viewing?unit=${u.id}`}
                    className="text-blue-600 underline"
                  >
                    Schedule Viewing
                  </a>
                ) : (
                  <span className="text-gray-500">Not Available</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const building = await prisma.building.findUnique({
    where: { id: params?.id as string },
    include: { units: true },
  });

  return { props: { building } };
};
