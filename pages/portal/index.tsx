import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions as any);
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const role = (session.user as any).role;
  let destination = '/';
  switch (role) {
    case 'OWNER':
      destination = '/portal/owner';
      break;
    case 'STAFF':
      destination = '/portal/staff';
      break;
    case 'TENANT':
      destination = '/portal/tenant';
      break;
    case 'PROSPECTIVE_TENANT':
      destination = '/portal/applicant';
      break;
  }

  return { redirect: { destination, permanent: false } };
};

export default function Portal() {
  return null; // redirects immediately
}
