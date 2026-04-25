import Link from 'next/link';
import SubscriptionLookupClient from './SubscriptionLookupClient';

export default function SubscriptionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <Link
          href="/subscriptions/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          + New Subscription
        </Link>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-8">
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter a subscription ID to view and manage it.
        </p>
        <div className="max-w-sm mx-auto">
          <SubscriptionLookupClient />
        </div>
      </div>
    </div>
  );
}
