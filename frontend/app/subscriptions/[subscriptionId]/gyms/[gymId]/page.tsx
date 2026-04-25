import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGym } from '@/lib/api';
import { addTrainerAction, createRoomAction, deleteRoomAction } from '@/app/actions';

export default async function GymPage(props: PageProps<'/subscriptions/[subscriptionId]/gyms/[gymId]'>) {
  const { subscriptionId, gymId } = await props.params;

  const gym = await getGym(subscriptionId, gymId).catch(() => null);
  if (!gym) notFound();

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/subscriptions" className="hover:text-gray-800">Subscriptions</Link>
        <span className="mx-2">/</span>
        <Link href={`/subscriptions/${subscriptionId}`} className="hover:text-gray-800 font-mono text-xs">{subscriptionId}</Link>
        <span className="mx-2">/</span>
        <span>{gym.name}</span>
      </nav>

      {/* Gym Header */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6">
        <p className="text-xs text-gray-400 font-mono mb-1">{gym.id}</p>
        <h1 className="text-2xl font-bold">{gym.name}</h1>
      </div>

      {/* Rooms Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Rooms</h2>
        <form action={createRoomAction} className="flex gap-2 mb-5">
          <input type="hidden" name="gymId" value={gymId} />
          <input type="hidden" name="subscriptionId" value={subscriptionId} />
          <input
            name="name"
            type="text"
            required
            placeholder="Room name"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            + Add Room
          </button>
        </form>
        <RoomsList gymId={gymId} subscriptionId={subscriptionId} />
      </section>

      {/* Add Trainer Section */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Add Trainer</h2>
        <form action={addTrainerAction} className="flex gap-2 max-w-md">
          <input type="hidden" name="subscriptionId" value={subscriptionId} />
          <input type="hidden" name="gymId" value={gymId} />
          <input
            name="trainerId"
            type="text"
            required
            placeholder="Trainer ID (UUID)"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            Add
          </button>
        </form>
      </section>
    </div>
  );
}

function RoomsList({ gymId, subscriptionId }: { gymId: string; subscriptionId: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-400">
      <p>Rooms will appear here once added.</p>
      <p className="mt-1 text-xs text-gray-300">
        (The backend does not expose a list-rooms endpoint; rooms are managed by creating and deleting them.)
      </p>
    </div>
  );
}
