import { useState, useEffect } from 'react';
import { staffTargetsApi, type StaffTargetDto } from '../api/staffTargets';
import type { StaffMember } from '../api/staff';
import './StaffTargetSection.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const TARGET_OPTIONS: Record<string, string[]> = {
  Sales:     ['Call Target', 'Visit Target', 'Revenue Target', 'Membership Target'],
  Marketing: ['Campaign Target', 'Lead Target', 'Conversion Target'],
  Fitness:   ['PT Sessions Target', 'Group Class Target', 'Renewal Target'],
};
const TARGET_CATEGORIES = Object.keys(TARGET_OPTIONS);

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

function parseMonthly(json: string): number[] {
  try {
    const arr = JSON.parse(json);
    if (Array.isArray(arr)) return arr.map(v => Number(v) || 0);
  } catch { /* ignore */ }
  return Array(12).fill(0);
}

interface Props {
  gymId: string;
  staffList: StaffMember[];
  initialStaffId?: string;
  onBack: () => void;
}

export default function StaffTargetSection({ gymId, staffList, initialStaffId, onBack }: Props) {
  const [subView, setSubView] = useState<'list' | 'add'>('list');

  /* ── List / filter state ─────────────────────────────────── */
  const [filterStaffId, setFilterStaffId]             = useState(initialStaffId ?? '');
  const [filterCategory, setFilterCategory]           = useState('');
  const [filterType, setFilterType]                   = useState('');
  const [filterYear, setFilterYear]                   = useState('');
  const [targets, setTargets]                         = useState<StaffTargetDto[]>([]);
  const [listLoading, setListLoading]                 = useState(false);
  const [listError, setListError]                     = useState('');

  /* ── Add form state ──────────────────────────────────────── */
  const [formStaffId, setFormStaffId]                 = useState(initialStaffId ?? '');
  const [formCategory, setFormCategory]               = useState(TARGET_CATEGORIES[0]);
  const [formType, setFormType]                       = useState(TARGET_OPTIONS[TARGET_CATEGORIES[0]][0]);
  const [formYear, setFormYear]                       = useState(CURRENT_YEAR);
  const [formMonthly, setFormMonthly]                 = useState<number[]>(Array(12).fill(0));
  const [saving, setSaving]                           = useState(false);
  const [saveError, setSaveError]                     = useState('');

  useEffect(() => {
    fetchTargets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchTargets() {
    setListLoading(true);
    setListError('');
    try {
      const params: Record<string, string | number> = {};
      if (filterStaffId)  params.staffId        = filterStaffId;
      if (filterCategory) params.targetCategory = filterCategory;
      if (filterType)     params.targetType     = filterType;
      if (filterYear)     params.year           = Number(filterYear);
      const data = await staffTargetsApi.list(gymId, params as Parameters<typeof staffTargetsApi.list>[1]);
      setTargets(data);
    } catch {
      setListError('Failed to load targets.');
    } finally {
      setListLoading(false);
    }
  }

  function handleCategoryChange(cat: string) {
    setFormCategory(cat);
    setFormType((TARGET_OPTIONS[cat] ?? [])[0] ?? '');
  }

  function handleMonthChange(idx: number, val: string) {
    const n = parseInt(val, 10);
    setFormMonthly(prev => {
      const next = [...prev];
      next[idx] = isNaN(n) ? 0 : Math.max(0, n);
      return next;
    });
  }

  function handleCopy() {
    const first = formMonthly[0];
    setFormMonthly(Array(12).fill(first));
  }

  async function handleSubmit() {
    if (!formStaffId) { setSaveError('Please select a staff member.'); return; }
    setSaving(true);
    setSaveError('');
    try {
      const created = await staffTargetsApi.create(gymId, {
        staffId: formStaffId,
        targetCategory: formCategory,
        targetType: formType,
        year: formYear,
        monthlyValuesJson: JSON.stringify(formMonthly),
      });
      setTargets(prev => [created, ...prev]);
      setSubView('list');
      resetForm();
    } catch {
      setSaveError('Failed to save target. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setFormStaffId(initialStaffId ?? '');
    setFormCategory(TARGET_CATEGORIES[0]);
    setFormType(TARGET_OPTIONS[TARGET_CATEGORIES[0]][0]);
    setFormYear(CURRENT_YEAR);
    setFormMonthly(Array(12).fill(0));
    setSaveError('');
  }

  async function handleDelete(id: string) {
    try {
      await staffTargetsApi.delete(gymId, id);
      setTargets(prev => prev.filter(t => t.id !== id));
    } catch { /* ignore */ }
  }

  function staffName(id: string) {
    return staffList.find(s => s.id === id)?.fullName ?? id;
  }

  /* ── List view ─────────────────────────────────────────────── */
  if (subView === 'list') {
    return (
      <div className="st-section">
        {/* Breadcrumb */}
        <div className="db-breadcrumb">
          <span className="db-bc-link" style={{ cursor: 'pointer' }} onClick={onBack}>Home</span>
          <span className="db-bc-sep">/</span>
          <span className="db-bc-link" style={{ cursor: 'pointer' }} onClick={onBack}>Staff</span>
          <span className="db-bc-sep">/</span>
          <span className="db-bc-active">View Staff Target</span>
        </div>

        {/* Filter bar + Add button */}
        <div className="st-filter-bar">
          <span className="st-filter-label">Staff</span>
          <select className="st-select" value={filterStaffId} onChange={e => setFilterStaffId(e.target.value)}>
            <option value="">All</option>
            {staffList.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
          </select>

          <span className="st-filter-label">Target</span>
          <select className="st-select" value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setFilterType(''); }}>
            <option value="">All</option>
            {TARGET_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <span className="st-filter-label">Sale</span>
          <select className="st-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">All</option>
            {(filterCategory ? TARGET_OPTIONS[filterCategory] ?? [] : Object.values(TARGET_OPTIONS).flat()).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <span className="st-filter-label">Year</span>
          <select className="st-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">All</option>
            {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <button className="st-btn-go" onClick={fetchTargets}>Go</button>
          <button className="st-btn-add" onClick={() => setSubView('add')}>Add Target</button>
        </div>

        {/* Table */}
        {listLoading ? (
          <p className="db-state-msg">Loading…</p>
        ) : listError ? (
          <p className="st-error">{listError}</p>
        ) : targets.length === 0 ? (
          <p className="st-no-results">No Results Found.</p>
        ) : (
          <div className="db-table-wrap">
            <table className="db-table st-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Staff</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Year</th>
                  {MONTHS.map(m => <th key={m}>{m}</th>)}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {targets.map((t, idx) => {
                  const vals = parseMonthly(t.monthlyValuesJson);
                  return (
                    <tr key={t.id}>
                      <td>{idx + 1}</td>
                      <td>{staffName(t.staffId)}</td>
                      <td>{t.targetCategory}</td>
                      <td>{t.targetType}</td>
                      <td>{t.year}</td>
                      {vals.map((v, i) => <td key={i}>{v}</td>)}
                      <td>
                        <button className="st-delete-btn" onClick={() => handleDelete(t.id)} title="Delete">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  /* ── Add view ────────────────────────────────────────────── */
  return (
    <div className="st-section">
      {/* Breadcrumb */}
      <div className="db-breadcrumb">
        <span className="db-bc-link" style={{ cursor: 'pointer' }} onClick={onBack}>Home</span>
        <span className="db-bc-sep">/</span>
        <span className="db-bc-link" style={{ cursor: 'pointer' }} onClick={onBack}>Staff</span>
        <span className="db-bc-sep">/</span>
        <span className="db-bc-active">Staff Target</span>
      </div>

      <div className="st-form">
        {/* Staff */}
        <div className="st-form-row">
          <label className="st-form-label">Staff<span className="st-req">*</span></label>
          <select
            className={`st-form-select${!formStaffId && saveError ? ' st-input-err' : ''}`}
            value={formStaffId}
            onChange={e => setFormStaffId(e.target.value)}
          >
            <option value="">-- Select Staff --</option>
            {staffList.map(s => <option key={s.id} value={s.id}>{s.fullName}</option>)}
          </select>
        </div>

        {/* Targets */}
        <div className="st-form-row">
          <label className="st-form-label">Targets</label>
          <select className="st-form-select" value={formCategory} onChange={e => handleCategoryChange(e.target.value)}>
            {TARGET_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Sales (type within category) */}
        <div className="st-form-row">
          <label className="st-form-label">{formCategory}</label>
          <select className="st-form-select" value={formType} onChange={e => setFormType(e.target.value)}>
            {(TARGET_OPTIONS[formCategory] ?? []).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Year */}
        <div className="st-form-row">
          <label className="st-form-label">Year<span className="st-req">*</span></label>
          <select className="st-form-select" value={formYear} onChange={e => setFormYear(Number(e.target.value))}>
            {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Monthly grid */}
        <div className="st-monthly-section">
          <div className="st-monthly-header">
            {MONTHS.map(m => <div key={m} className="st-month-col">{m}</div>)}
            <div className="st-month-copy-head">Copy</div>
          </div>
          <div className="st-monthly-label">{formType}</div>
          <div className="st-monthly-row">
            {formMonthly.map((v, i) => (
              <input
                key={i}
                type="number"
                className="st-month-input"
                min={0}
                value={v}
                onChange={e => handleMonthChange(i, e.target.value)}
              />
            ))}
            <button className="st-copy-btn" type="button" onClick={handleCopy} title="Copy January to all months">Copy</button>
          </div>
        </div>

        {saveError && <p className="st-error">{saveError}</p>}

        <div className="st-form-actions">
          <button className="st-btn-submit" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
