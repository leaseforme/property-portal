import Link from 'next/link';
import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <div>
          <Link href="/" className="font-bold">
            Property Portal
          </Link>
          <Link href="/buildings" className="ml-4">
            Buildings
          </Link>
          {session && (
            <Link href="/portal" className="ml-4">
              Dashboard
            </Link>
          )}
        </div>
        <div>
          {session ? (
            <button onClick={() => signOut()} className="hover:underline">
              Sign out
            </button>
          ) : (
            <Link href="/login" className="hover:underline">
              Sign in
            </Link>
          )}
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 p-4 text-center">
        &copy; {new Date().getFullYear()} Property Portal
      </footer>
    </div>
  );
}
