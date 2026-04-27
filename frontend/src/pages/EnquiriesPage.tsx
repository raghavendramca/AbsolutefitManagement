import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { enquiriesApi } from '../api/enquiries';
import type { Enquiry, CreateEnquiryRequest } from '../types';
import AddEnquiryDialog from '../components/AddEnquiryDialog';
import './EnquiriesPage.css';

const STAFF_NAMES = ['Swetha Raghavendra', 'Rahul Kumar', 'Priya Nair'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function CallTagBadge({ tag }: { tag?: string }) {
  if (!tag) return null;
  return <span className={`enq-badge enq-badge-${tag.toLowerCase()}`}>{tag}</span>;
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`enq-badge ${status === 'Member' ? 'enq-badge-member' : 'enq-badge-enquiry'}`}>
      {status}
    </span>
  );
}

export default function EnquiriesPage() {
  const { subscriptionId, gymId } = useParams<{ subscriptionId: string; gymId: string }>();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!subscriptionId || !gymId) return;
    enquiriesApi.list(subscriptionId, gymId)
      .then(setEnquiries)
      .catch(() => setError('Failed to load enquiries.'))
      .finally(() => setLoading(false));
  }, [subscriptionId, gymId]);

  async function handleSave(data: CreateEnquiryRequest) {
    if (!subscriptionId || !gymId) return;
    const created = await enquiriesApi.create(subscriptionId, gymId, data);
    setEnquiries(prev => [created, ...prev]);
  }

  const filtered = search.trim()
    ? enquiries.filter(e =>
        e.fullName.toLowerCase().includes(search.toLowerCase()) ||
        e.contactNumber.includes(search) ||
        (e.email ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : enquiries;

  return (
    <div className="enq-page">
      <div className="enq-top">
        <Link to={`/subscriptions/${subscriptionId}/gyms/${gymId}`} className="back-link">
          ← Back to Branch
        </Link>
      </div>

      <div className="enq-header-row">
        <div>
          <h1 className="enq-heading">Enquiries</h1>
          <p className="enq-subheading">Manage leads and walk-ins for this branch.</p>
        </div>
        <button className="enq-add-btn" onClick={() => setShowDialog(true)}>
          + Add Enquiry
        </button>
      </div>

      <div className="enq-search-row">
        <input
          className="enq-search"
          type="text"
          placeholder="Search by name, phone or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="enq-count">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <p className="loading">Loading enquiries…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="enq-empty">
          <p>No enquiries yet.</p>
          <button onClick={() => setShowDialog(true)}>Add your first enquiry</button>
        </div>
      ) : (
        <div className="enq-table-wrap">
          <table className="enq-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Lead Source</th>
                <th>Enquiry Date</th>
                <th>Trial</th>
                <th>Call Tag</th>
                <th>Follow-up Staff</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, idx) => (
                <tr key={e.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="enq-name">{e.fullName}</div>
                    {e.email && <div className="enq-email">{e.email}</div>}
                  </td>
                  <td>{e.countryCode} {e.contactNumber}</td>
                  <td>{e.serviceName}</td>
                  <td>{e.leadSource ?? '—'}</td>
                  <td>{formatDate(e.enquiryDate)}</td>
                  <td>{e.trialType === 'NoTrial' ? '—' : e.trialType.replace('Trial', 'Trial ')}</td>
                  <td><CallTagBadge tag={e.callTag} /></td>
                  <td>{e.followUpStaffName ?? '—'}</td>
                  <td><StatusBadge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDialog && subscriptionId && gymId && (
        <AddEnquiryDialog
          subscriptionId={subscriptionId}
          gymId={gymId}
          onClose={() => setShowDialog(false)}
          onSave={handleSave}
          staffNames={STAFF_NAMES}
        />
      )}
    </div>
  );
}
