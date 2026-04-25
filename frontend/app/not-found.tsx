import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900">404 — Not Found</h1>
      <p className="text-gray-500">The resource you requested does not exist.</p>
      <Link href="/" className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
        Go Home
      </Link>
    </div>
  );
}
