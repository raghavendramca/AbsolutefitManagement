import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSubscription, listGyms } from '@/lib/api';
import { deleteSubscriptionAction, createGymAction, deleteGymAction } from '@/app/actions';

export default async function SubscriptionPage(props: PageProps<'/subscriptions/[subscriptionId]'>) {
  const { subscriptionId } = await props.params;

  const [subscription, gyms] = await Promise.all([
    getSubscription(subscriptionId).catch(() => null),
    listGyms(subscriptionId).catch(() => [] as Awaited<ReturnType<typeof listGyms>>),
  ]);

  if (!subscription) notFound();

  const planColors: Record<string, string> = {
    Free: 'bg-gray-100 text-gray-700',
    Starter: 'bg-blue-100 text-blue-700',
    Pro: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/subscriptions" className="hover:text-gray-800">Subscriptions</Link>
        <span className="mx-2">/</span>
        <span className="font-mono text-xs">{subscriptionId}</span>
      </nav>

      {/* Subscription Card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-400 font-mono">{subscription.id}</p>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Subscription</h1>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${planColors[subscription.subscriptionType] ?? 'bg-gray-100 text-gray-700'}`}>
              {subscription.subscriptionType}
            </span>
          </div>
        </div>
        <form action={deleteSubscriptionAction}>
          <input type="hidden" name="subscriptionId" value={subscription.id} />
          <button
            type="submit"
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </form>
      </div>

      {/* Gyms Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Gyms</h2>
        </div>

        {/* Create Gym Form */}
        <form action={createGymAction} className="flex gap-2 mb-5">
          <input type="hidden" name="subscriptionId" value={subscriptionId} />
          <input
            name="name"
            type="text"
            required
            placeholder="Gym name"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            + Add Gym
          </button>
        </form>

        {gyms.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-400">
            No gyms yet. Add your first gym above.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {gyms.map((gym) => (
              <li key={gym.id} className="rounded-xl border border-gray-200 bg-white shadow-sm px-5 py-4 flex items-center justify-between gap-4">
                <Link
                  href={`/subscriptions/${subscriptionId}/gyms/${gym.id}`}
                  className="font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                >
                  {gym.name}
                </Link>
                <div className="flex items-center gap-3">
                  <p className="font-mono text-xs text-gray-400">{gym.id}</p>
                  <form action={deleteGymAction}>
                    <input type="hidden" name="subscriptionId" value={subscriptionId} />
                    <input type="hidden" name="gymId" value={gym.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
