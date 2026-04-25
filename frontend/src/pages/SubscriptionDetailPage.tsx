import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { subscriptionsApi } from '../api/subscriptions';
import { gymsApi } from '../api/gyms';
import type { Subscription, Gym } from '../types';

export default function SubscriptionDetailPage() {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [gymName, setGymName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subscriptionId) return;
    Promise.all([
      subscriptionsApi.get(subscriptionId),
      gymsApi.list(subscriptionId),
    ])
      .then(([sub, gymList]) => {
        setSubscription(sub);
        setGyms(gymList);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Load failed'))
      .finally(() => setLoading(false));
  }, [subscriptionId]);

  async function handleCreateGym(e: React.FormEvent) {
    e.preventDefault();
    if (!subscriptionId) return;
    setError('');
    try {
      const gym = await gymsApi.create(subscriptionId, { name: gymName });
      setGyms((prev) => [...prev, gym]);
      setGymName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create gym');
    }
  }

  async function handleDeleteGym(gymId: string) {
    if (!subscriptionId) return;
    setError('');
    try {
      await gymsApi.delete(subscriptionId, gymId);
      setGyms((prev) => prev.filter((g) => g.id !== gymId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gym');
    }
  }

  async function handleDeleteSubscription() {
    if (!subscriptionId || !confirm('Delete this subscription?')) return;
    try {
      await subscriptionsApi.delete(subscriptionId);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete subscription');
    }
  }

  if (loading) return <p className="loading">Loading…</p>;

  return (
    <div className="page">
      <Link to="/" className="back-link">← All Subscriptions</Link>

      {subscription && (
        <div className="card">
          <div className="card-header">
            <div>
              <h1>Subscription</h1>
              <p className="meta">
                <span className={`badge badge-${subscription.subscriptionType.toLowerCase()}`}>
                  {subscription.subscriptionType}
                </span>
              </p>
              <p className="id-label">ID: {subscription.id}</p>
            </div>
            <button className="btn-danger" onClick={handleDeleteSubscription}>
              Delete Subscription
            </button>
          </div>
        </div>
      )}

      <section className="card">
        <h2>Gyms</h2>
        <form onSubmit={handleCreateGym} className="inline-form">
          <input
            value={gymName}
            onChange={(e) => setGymName(e.target.value)}
            placeholder="New gym name"
            required
          />
          <button type="submit">Add Gym</button>
        </form>

        {error && <p className="error">{error}</p>}

        {gyms.length === 0 ? (
          <p className="empty">No gyms yet.</p>
        ) : (
          <ul className="item-list">
            {gyms.map((gym) => (
              <li key={gym.id} className="item-row">
                <Link to={`/subscriptions/${subscriptionId}/gyms/${gym.id}`}>
                  {gym.name}
                </Link>
                <button
                  className="btn-danger-sm"
                  onClick={() => handleDeleteGym(gym.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
