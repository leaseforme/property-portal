import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Property Portal</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Welcome to Property Portal</h1>
        <p className="mt-4 text-lg">
          Browse buildings, check availability, and schedule viewings.
        </p>
      </main>
    </>
  );
}
