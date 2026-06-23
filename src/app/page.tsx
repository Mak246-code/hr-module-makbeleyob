import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 text-center">
      <h1 className="text-3xl font-bold">ERP Frontend — HR Module</h1>
      <p className="text-gray-500">Manage your organization&apos;s employees.</p>
      <Link href="/hr" className="bg-blue-600 text-white rounded px-4 py-2">
        Go to Employee Directory
      </Link>
    </main>
  )
}
