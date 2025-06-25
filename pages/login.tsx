import { getCsrfToken } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Layout from '@/components/Layout';

interface Props {
  csrfToken: string;
}

export default function Login({ csrfToken }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout>
      <div className="max-w-sm mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Sign in</h2>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-col space-y-4"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2">
            Sign in
          </button>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      csrfToken: (await getCsrfToken(context)) ?? '',
    },
  };
};
