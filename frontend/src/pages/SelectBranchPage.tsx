import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { branchesApi, type BranchResponse } from '../api/branches';
import './SelectBranchPage.css';

export default function SelectBranchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tenantId = searchParams.get('tenantId') ?? '';

  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    if (!tenantId) { setLoading(false); return; }
    branchesApi.listBranches(tenantId)
      .then(setBranches)
      .catch(() => setError('Failed to load branches.'))
      .finally(() => setLoading(false));
  }, [tenantId]);

  const cities = useMemo(
    () => Array.from(new Set(branches.map((b) => b.city))).sort(),
    [branches]
  );

  const filtered = selectedCity
    ? branches.filter((b) => b.city === selectedCity)
    : branches;

  function handleBranchLogin(branch: BranchResponse) {
    navigate(`/dashboard/${tenantId}/${branch.id}`, {
      state: { studio: branch.studio, locality: branch.locality },
    });
  }

  return (
    <div className="sb-page">
      <div className="sb-header-bar">
        <Link to="/" className="sb-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="sb-body">
        {/* City filter */}
        <section className="sb-filter-section">
          <label className="sb-filter-label">Select Branch</label>
          <select
            className="sb-city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </section>

        <div className="sb-divider" />

        {/* Branch table */}
        {loading ? (
          <p className="sb-state">Loading branches…</p>
        ) : error ? (
          <p className="sb-state sb-error">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="sb-state">No branches found.</p>
        ) : (
          <div className="sb-table-wrapper">
            <table className="sb-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Branch ID</th>
                  <th>Studio</th>
                  <th>Locality</th>
                  <th>City</th>
                  <th>Role</th>
                  <th>Login</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((branch, idx) => (
                  <tr key={branch.id}>
                    <td className="sb-center">{idx + 1}</td>
                    <td className="sb-center sb-branch-id">{branch.branchCode}</td>
                    <td>{branch.studio}</td>
                    <td className="sb-locality">{branch.locality}</td>
                    <td>{branch.city}</td>
                    <td>{branch.role}</td>
                    <td className="sb-center">
                      <button
                        className={`sb-login-btn ${idx === 0 ? 'filled' : 'outlined'}`}
                        onClick={() => handleBranchLogin(branch)}
                        aria-label={`Login to ${branch.studio}`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
