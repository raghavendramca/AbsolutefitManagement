import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
      <h1 className="text-4xl font-bold text-gray-900">AbsoluteFit Management</h1>
      <p className="text-lg text-gray-500 max-w-md">
        Manage gym subscriptions, facilities, rooms, and trainers from one place.
      </p>
      <div className="flex gap-4">
        <Link
          href="/subscriptions"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          View Subscriptions
        </Link>
        <Link
          href="/subscriptions/new"
          className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          New Subscription
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-2xl">
        {[
          { label: 'Subscriptions', desc: 'Free, Starter, or Pro plans per admin' },
          { label: 'Gyms', desc: 'Multiple gyms per subscription' },
          { label: 'Rooms', desc: 'Training rooms within each gym' },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-left">
            <p className="font-semibold text-gray-800">{card.label}</p>
            <p className="mt-1 text-sm text-gray-500">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
