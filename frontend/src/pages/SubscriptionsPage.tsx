import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionsApi } from '../api/subscriptions';
import type { SubscriptionType } from '../types';

export default function SubscriptionsPage() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>('Free');
  const [lookupId, setLookupId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const sub = await subscriptionsApi.create({ subscriptionType, adminId });
      navigate(`/subscriptions/${sub.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create subscription');
    } finally {
      setLoading(false);
    }
  }

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (lookupId.trim()) navigate(`/subscriptions/${lookupId.trim()}`);
  }

  return (
    <div className="page">
      <h1>AbsoluteFit Management</h1>

      <section className="card">
        <h2>Create Subscription</h2>
        <form onSubmit={handleCreate}>
          <label>
            Admin ID
            <input
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="UUID of the admin"
              required
            />
          </label>
          <label>
            Subscription Type
            <select
              value={subscriptionType}
              onChange={(e) => setSubscriptionType(e.target.value as SubscriptionType)}
            >
              <option value="Free">Free</option>
              <option value="Starter">Starter</option>
              <option value="Pro">Pro</option>
            </select>
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create'}
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Look Up Subscription</h2>
        <form onSubmit={handleLookup}>
          <label>
            Subscription ID
            <input
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              placeholder="Paste a subscription UUID"
              required
            />
          </label>
          <button type="submit">View</button>
        </form>
      </section>
    </div>
  );
}
