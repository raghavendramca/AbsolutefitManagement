import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gymsApi } from '../api/gyms';
import { roomsApi } from '../api/rooms';
import type { Gym, Room } from '../types';

export default function GymDetailPage() {
  const { subscriptionId, gymId } = useParams<{ subscriptionId: string; gymId: string }>();
  const [gym, setGym] = useState<Gym | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subscriptionId || !gymId) return;
    gymsApi.get(subscriptionId, gymId)
      .then(setGym)
      .catch((err) => setError(err instanceof Error ? err.message : 'Load failed'))
      .finally(() => setLoading(false));
  }, [subscriptionId, gymId]);

  async function handleCreateRoom(e: React.FormEvent) {
    e.preventDefault();
    if (!gymId) return;
    setError('');
    try {
      const room = await roomsApi.create(gymId, { name: roomName });
      setRooms((prev) => [...prev, room]);
      setRoomName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create room');
    }
  }

  async function handleDeleteRoom(roomId: string) {
    if (!gymId) return;
    setError('');
    try {
      await roomsApi.delete(gymId, roomId);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete room');
    }
  }

  async function handleAddTrainer(e: React.FormEvent) {
    e.preventDefault();
    if (!subscriptionId || !gymId) return;
    setError('');
    try {
      await gymsApi.addTrainer(subscriptionId, gymId, { trainerId });
      setTrainerId('');
      alert('Trainer added successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add trainer');
    }
  }

  if (loading) return <p className="loading">Loading…</p>;

  return (
    <div className="page">
      <Link to={`/subscriptions/${subscriptionId}`} className="back-link">
        ← Back to Subscription
      </Link>

      {gym && (
        <div className="card card-header">
          <div>
            <h1>{gym.name}</h1>
            <p className="id-label">ID: {gym.id}</p>
          </div>
          <Link
            to={`/subscriptions/${subscriptionId}/gyms/${gymId}/enquiries`}
            style={{ flexShrink: 0 }}
          >
            <button type="button">Enquiries</button>
          </Link>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <section className="card">
        <h2>Rooms</h2>
        <form onSubmit={handleCreateRoom} className="inline-form">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="New room name"
            required
          />
          <button type="submit">Add Room</button>
        </form>

        {rooms.length === 0 ? (
          <p className="empty">No rooms yet.</p>
        ) : (
          <ul className="item-list">
            {rooms.map((room) => (
              <li key={room.id} className="item-row">
                <span>{room.name}</span>
                <button
                  className="btn-danger-sm"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Add Trainer</h2>
        <form onSubmit={handleAddTrainer} className="inline-form">
          <input
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
            placeholder="Trainer UUID"
            required
          />
          <button type="submit">Add Trainer</button>
        </form>
      </section>
    </div>
  );
}
