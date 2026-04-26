import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { enquiriesApi } from '../api/enquiries';
import { navigationApi, type NavMenuItemDto, type QuickAddMenuItemDto } from '../api/navigation';
import { staffApi, type StaffMember } from '../api/staff';
import type { Enquiry, CreateEnquiryRequest } from '../types';
import AddEnquiryDialog from '../components/AddEnquiryDialog';
import './DashboardPage.css';

const DATE_OPTIONS = ['Today', 'Yesterday', 'This Week', 'This Month', 'Last Month'];
const SEARCH_FIELDS = ['Member Name', 'Phone', 'Email'];


// ─── Sidebar Icons ────────────────────────────────────────────────────────────

function IcoDashboard() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}
function IcoEnquiries() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  );
}
function IcoMarketing() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 4L6 9v6l12 5V4z" strokeLinejoin="round" />
      <path d="M6 9H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3" />
      <path d="M8 15l1.5 4" strokeLinecap="round" />
    </svg>
  );
}
function IcoClients() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="7" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M22 20c0-2.8-2-5-5-5.5" strokeLinecap="round" />
    </svg>
  );
}
function IcoTraining() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="10.5" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="5" y="8.5" width="2" height="7" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="17" y="8.5" width="2" height="7" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="19" y="10.5" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
      <line x1="7" y1="12" x2="17" y2="12" strokeLinecap="round" />
    </svg>
  );
}
function IcoStaff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20c0-2.8 2.2-5 5-5s5 2.2 5 5" strokeLinecap="round" />
    </svg>
  );
}
function IcoReports() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="7" width="4" height="13" rx="1" />
      <rect x="16" y="3" width="4" height="17" rx="1" />
    </svg>
  );
}
function IcoSetup() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IcoCorporates() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="8" width="20" height="14" rx="1" />
      <path d="M8 22V12M16 22V12M12 8V4" strokeLinecap="round" />
      <path d="M8 4h8" strokeLinecap="round" />
    </svg>
  );
}
function IcoChevron() {
  return (
    <svg className="db-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// Maps the iconName string from the API to the matching icon component
const ICON_MAP: Record<string, () => React.JSX.Element> = {
  dashboard:  IcoDashboard,
  enquiries:  IcoEnquiries,
  marketing:  IcoMarketing,
  clients:    IcoClients,
  training:   IcoTraining,
  staff:      IcoStaff,
  reports:    IcoReports,
  setup:      IcoSetup,
  corporates: IcoCorporates,
};

// ─── Top-bar icon buttons ─────────────────────────────────────────────────────

const topIcons = [
  <svg key="search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>,
  <svg key="add"    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  <svg key="doc"    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2" width="13" height="20" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/><polyline points="13 2 13 8 19 8"/></svg>,
  <svg key="reply"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 10H4l5-5M4 10c0 5.5 3.5 9.3 8 10" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 6h6v6" strokeLinecap="round"/><path d="M20 6l-7 7" strokeLinecap="round"/></svg>,
  <svg key="cam"    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="15" rx="2"/><circle cx="12" cy="15" r="4"/><path d="M8 7l2-4h4l2 4"/></svg>,
  <svg key="qr"     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="2" height="2"/><rect x="19" y="15" width="2" height="2"/><rect x="15" y="19" width="2" height="2"/><rect x="19" y="19" width="2" height="2"/></svg>,
  <svg key="grid"   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="4" height="4"/><rect x="10" y="3" width="4" height="4"/><rect x="17" y="3" width="4" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/><rect x="3" y="17" width="4" height="4"/><rect x="10" y="17" width="4" height="4"/><rect x="17" y="17" width="4" height="4"/></svg>,
  <svg key="send"   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { tenantId, gymId } = useParams<{ tenantId: string; gymId: string }>();
  const location = useLocation();
  const state = location.state as { studio?: string; locality?: string } | null;
  const gymName = state?.studio
    ? `${state.studio}${state.locality ? ' ' + state.locality : ''}`
    : 'Absolute Fit';

  // ── Nav state (data-driven) ──────────────────────────────────────────────
  const [navItems, setNavItems] = useState<NavMenuItemDto[]>([]);
  const [activeNav, setActiveNav] = useState('enquiries');
  const [openFlyoutKey, setOpenFlyoutKey] = useState<string | null>(null);
  const [segmentSearch, setSegmentSearch] = useState('');
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // ── Enquiry state ────────────────────────────────────────────────────────
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dateFilter, setDateFilter] = useState('Today');
  const [searchField, setSearchField] = useState('Member Name');
  const [searchText, setSearchText] = useState('');
  const [action, setAction] = useState('');
  const [communicate, setCommunicate] = useState('');

  // ── Staff state ───────────────────────────────────────────────────────────
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [staffSearch, setStaffSearch] = useState('');
  const [staffCommunicate, setStaffCommunicate] = useState('');
  const [staffDesignation, setStaffDesignation] = useState('');
  const [staffAdminRightsFilter, setStaffAdminRightsFilter] = useState('');

  // ── Quick-add dropdown state ──────────────────────────────────────────────
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [quickAddItems, setQuickAddItems] = useState<QuickAddMenuItemDto[]>([]);
  const quickAddRef = useRef<HTMLDivElement>(null);

  // ── Fetch nav menu + quick-add items ─────────────────────────────────────
  useEffect(() => {
    navigationApi.getNavMenu().then(setNavItems).catch(() => {});
    // Role is derived from auth context in a full implementation; 'Admin' here shows all items
    navigationApi.getQuickAddItems('Admin').then(setQuickAddItems).catch(() => {});
  }, []);

  // ── Fetch enquiries ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!tenantId || !gymId) return;
    enquiriesApi.list(tenantId, gymId)
      .then(setEnquiries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tenantId, gymId]);

  // ── Fetch staff (on mount so names are available in the Add Enquiry dialog)
  useEffect(() => {
    if (!gymId) return;
    setStaffLoading(true);
    staffApi.list(gymId)
      .then(setStaffList)
      .catch(() => {})
      .finally(() => setStaffLoading(false));
  }, [gymId]);

  // ── Close quick-add dropdown on outside click ─────────────────────────────
  useEffect(() => {
    if (!quickAddOpen) return;
    function handleOutside(e: MouseEvent) {
      if (quickAddRef.current && !quickAddRef.current.contains(e.target as Node)) {
        setQuickAddOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [quickAddOpen]);

  async function handleSave(data: CreateEnquiryRequest) {
    if (!tenantId || !gymId) return;
    const created = await enquiriesApi.create(tenantId, gymId, data);
    setEnquiries(prev => [created, ...prev]);
  }

  function handleQuickAdd(key: string) {
    setQuickAddOpen(false);
    if (key === 'enquiry') setShowDialog(true);
  }

  async function handleToggleStaff(id: string) {
    if (!gymId) return;
    const updated = await staffApi.toggleActive(gymId, id);
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, isActive: updated.isActive } : s));
  }

  async function handleDeleteStaff(id: string) {
    if (!gymId) return;
    await staffApi.delete(gymId, id);
    setStaffList(prev => prev.filter(s => s.id !== id));
  }

  const filteredStaff = staffList.filter(s => {
    const q = staffSearch.toLowerCase();
    const matchSearch = !q || s.fullName.toLowerCase().includes(q) || (s.email ?? '').toLowerCase().includes(q);
    const matchDesig = !staffDesignation || (s.designation ?? '').toLowerCase().includes(staffDesignation.toLowerCase());
    const matchRights = !staffAdminRightsFilter || (s.adminRights ?? '').toLowerCase().includes(staffAdminRightsFilter.toLowerCase());
    return matchSearch && matchDesig && matchRights;
  });

  // ── Nav click: toggle flyout for expandable items ─────────────────────────
  function handleNavClick(item: NavMenuItemDto) {
    if (item.flyout) {
      setActiveNav(item.key);
      if (openFlyoutKey === item.key) {
        setOpenFlyoutKey(null);
      } else {
        setOpenFlyoutKey(item.key);
        setSegmentSearch('');
        setActiveSegment(null);
        // Expand all sections by default when opening
        setExpandedCategories(new Set(item.flyout.sections.map(s => s.label)));
      }
    } else {
      setActiveNav(item.key);
      setOpenFlyoutKey(null);
    }
  }

  function toggleCategory(label: string) {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  }

  // ── Derive the open flyout's data ─────────────────────────────────────────
  const openFlyoutItem = navItems.find(i => i.key === openFlyoutKey);
  const flyout = openFlyoutItem?.flyout;

  const filteredSections = flyout?.sections.map(s => ({
    ...s,
    items: segmentSearch.trim()
      ? s.items.filter(item => item.label.toLowerCase().includes(segmentSearch.toLowerCase()))
      : s.items,
  })).filter(s => s.items.length > 0) ?? [];

  // ── Stats ─────────────────────────────────────────────────────────────────
  const openCount      = enquiries.filter(e => e.status === 'Enquiry').length;
  const convertedCount = enquiries.filter(e => e.status === 'Member').length;
  const openEnquiry    = enquiries.filter(e => e.status === 'Enquiry' && e.trialType === 'NoTrial').length;
  const trialSched     = enquiries.filter(e => e.status === 'Enquiry' && e.trialType !== 'NoTrial').length;

  const filtered = searchText.trim()
    ? enquiries.filter(e =>
        e.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        e.contactNumber.includes(searchText) ||
        (e.email ?? '').toLowerCase().includes(searchText.toLowerCase())
      )
    : enquiries;

  return (
    <div
      className="db-root"
      onClick={e => {
        if (!(e.target as HTMLElement).closest('.db-sidebar') &&
            !(e.target as HTMLElement).closest('.db-flyout-panel')) {
          setOpenFlyoutKey(null);
        }
      }}
    >
      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className="db-sidebar">
        <div className="db-brand"><span>{gymName}</span></div>
        <nav className="db-nav">
          {navItems.map(item => {
            const IconComp = ICON_MAP[item.iconName] ?? IcoDashboard;
            return (
              <button
                key={item.key}
                className={`db-nav-item${activeNav === item.key ? ' active' : ''}`}
                onClick={() => handleNavClick(item)}
              >
                <span className="db-nav-icon"><IconComp /></span>
                <span className="db-nav-label">{item.label}</span>
                {item.isExpandable && <IcoChevron />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Generic Flyout Panel ──────────────────────────────────────── */}
      {openFlyoutKey && flyout && (
        <div className="db-flyout-panel">
          <div className="db-flyout-header">{flyout.title}</div>
          <div className="db-flyout-search-wrap">
            <input
              className="db-flyout-search"
              type="text"
              placeholder="Search"
              value={segmentSearch}
              onChange={e => setSegmentSearch(e.target.value)}
            />
          </div>
          <div className="db-flyout-body">
            {filteredSections.map(section => (
              <div key={section.label} className="db-flyout-section">
                <button
                  className="db-flyout-cat"
                  onClick={() => toggleCategory(section.label)}
                >
                  <span>{section.label}</span>
                  <svg
                    className={`db-flyout-arrow${expandedCategories.has(section.label) ? ' open' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {expandedCategories.has(section.label) && (
                  <ul className="db-flyout-items">
                    {section.items.map(item => (
                      <li
                        key={item.label}
                        className={`db-flyout-item${activeSegment === `${section.label}::${item.label}` ? ' selected' : ''}`}
                        onClick={() => setActiveSegment(`${section.label}::${item.label}`)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <div className="db-main">
        {/* Top bar */}
        <header className="db-topbar">
          <div className="db-search-group">
            <select className="db-search-field" value={searchField} onChange={e => setSearchField(e.target.value)}>
              {SEARCH_FIELDS.map(f => <option key={f}>{f}</option>)}
            </select>
            <input
              className="db-search-input"
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button className="db-btn-go-top">Go</button>
          </div>
          <div className="db-topbar-icons">
            {/* Search icon */}
            <button className="db-icon-btn">{topIcons[0]}</button>

            {/* Quick-add "+" button with dropdown */}
            <div className="db-quick-add-wrap" ref={quickAddRef}>
              <button
                className={`db-icon-btn${quickAddOpen ? ' db-icon-btn-active' : ''}`}
                onClick={() => setQuickAddOpen(o => !o)}
                title="Quick add"
              >
                {topIcons[1]}
              </button>
              {quickAddOpen && (
                <div className="db-quick-add-dropdown">
                  {quickAddItems.map(item => (
                    <button
                      key={item.key}
                      className="db-quick-add-item"
                      onClick={() => handleQuickAdd(item.key)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining icons */}
            {topIcons.slice(2).map((icon, i) => (
              <button key={i + 2} className="db-icon-btn">{icon}</button>
            ))}
            <div className="db-avatar">SR</div>
          </div>
        </header>

        {/* Content */}
        <main className="db-content">
          {activeNav === 'staff' ? (
            /* ── Staff Management ─────────────────────────────────────── */
            <>
              <div className="db-breadcrumb">
                <span className="db-bc-link">Home</span>
                <span className="db-bc-sep">/</span>
                <span className="db-bc-active">Staff Management</span>
              </div>

              {/* Filter bar */}
              <div className="db-staff-filters">
                <input
                  className="db-staff-search"
                  type="text"
                  placeholder="Search by Staff Name / Mail"
                  value={staffSearch}
                  onChange={e => setStaffSearch(e.target.value)}
                />
                <span className="db-staff-filter-label">Communicate</span>
                <select className="db-staff-select" value={staffCommunicate} onChange={e => setStaffCommunicate(e.target.value)}>
                  <option value="">Select</option>
                  <option>Email</option>
                  <option>SMS</option>
                  <option>WhatsApp</option>
                </select>
                <span className="db-staff-filter-label">Designation</span>
                <select className="db-staff-select" value={staffDesignation} onChange={e => setStaffDesignation(e.target.value)}>
                  <option value="">Select</option>
                  <option>Trainer</option>
                  <option>Manager</option>
                  <option>Receptionist</option>
                  <option>Admin</option>
                </select>
                <span className="db-staff-filter-label">Admin Rights</span>
                <select className="db-staff-select" value={staffAdminRightsFilter} onChange={e => setStaffAdminRightsFilter(e.target.value)}>
                  <option value="">Select</option>
                  <option>Training</option>
                  <option>Housekeeping</option>
                  <option>Sales</option>
                  <option>Master Admin</option>
                </select>
                <button className="db-btn-go">Go</button>
              </div>

              {/* Pagination */}
              <div className="db-staff-pagination">
                <button className="db-page-btn" title="First">&#x21E4;</button>
                <button className="db-page-btn" title="Prev">&#x2039;</button>
                <span className="db-page-info">Page 1 of 1</span>
                <button className="db-page-btn" title="Next">&#x203A;</button>
                <button className="db-page-btn" title="Last">&#x21E5;</button>
              </div>

              {/* Table */}
              {staffLoading ? (
                <p className="db-state-msg">Loading staff…</p>
              ) : (
                <div className="db-table-wrap">
                  <table className="db-table db-staff-table">
                    <thead>
                      <tr>
                        <th><input type="checkbox" /></th>
                        <th>S.No</th>
                        <th>Staff ID</th>
                        <th>Staff Name</th>
                        <th>Mail</th>
                        <th>Attendance ID</th>
                        <th>Active</th>
                        <th>Admin Rights</th>
                        <th>Target</th>
                        <th>Rep Change</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((s, idx) => (
                        <tr key={s.id}>
                          <td>
                            {s.attendanceId
                              ? <input type="checkbox" />
                              : <span className="db-staff-dash">-</span>}
                          </td>
                          <td>{idx + 1}</td>
                          <td>{s.staffCode}</td>
                          <td><button className="db-staff-name-link">{s.fullName}</button></td>
                          <td>{s.email ?? '—'}</td>
                          <td>{s.attendanceId ?? ''}</td>
                          <td>
                            <button
                              className={`db-toggle ${s.isActive ? 'db-toggle-on' : 'db-toggle-off'}`}
                              onClick={() => handleToggleStaff(s.id)}
                            >
                              <span className="db-toggle-label">{s.isActive ? 'ON' : 'OFF'}</span>
                              <span className="db-toggle-knob" />
                            </button>
                          </td>
                          <td><button className="db-staff-rights-link">{s.adminRights ?? '—'}</button></td>
                          <td><button className="db-staff-action-link">View</button></td>
                          <td><button className="db-staff-action-link">Change</button></td>
                          <td>
                            <button className="db-staff-delete-btn" onClick={() => handleDeleteStaff(s.id)} title="Delete">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14H6L5 6"/>
                                <path d="M10 11v6M14 11v6"/>
                                <path d="M9 6V4h6v2"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            /* ── Enquiries (default) ──────────────────────────────────── */
            <>
              <div className="db-breadcrumb">
                <span className="db-bc-link">Home</span>
                <span className="db-bc-sep">/</span>
                <span className="db-bc-active">Enquiries</span>
              </div>

              <h1 className="db-heading">All Enquiries</h1>

              <div className="db-filter-bar">
                <div className="db-filter-left">
                  <select className="db-date-select" value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
                    {DATE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <button className="db-btn-go">Go</button>
                </div>
                <div className="db-filter-right">
                  <button className="db-btn-outline">Import Enquiry</button>
                  <button className="db-btn-outline">Enquiry Archive</button>
                </div>
              </div>

              {/* Stat cards */}
              <div className="db-stats-row">
                <div className="db-stat-card">
                  <div className="db-stat-title">Enquiries - {openCount + convertedCount}</div>
                  <div className="db-stat-cols">
                    <div className="db-stat-col"><span className="db-stat-label">Open</span><span className="db-stat-val">{openCount}</span></div>
                    <div className="db-stat-col"><span className="db-stat-label">Converted</span><span className="db-stat-val">{convertedCount}</span></div>
                    <div className="db-stat-col"><span className="db-stat-label">Archived/Lost</span><span className="db-stat-val">0</span></div>
                  </div>
                </div>
                <div className="db-stat-card">
                  <div className="db-stat-title">Open Enquiries</div>
                  <div className="db-stat-cols">
                    <div className="db-stat-col"><span className="db-stat-label">Enquiry</span><span className="db-stat-val db-green">{openEnquiry}</span></div>
                    <div className="db-stat-col"><span className="db-stat-label">Trial Scheduled</span><span className="db-stat-val db-orange">{trialSched}</span></div>
                    <div className="db-stat-col"><span className="db-stat-label">Post Trial</span><span className="db-stat-val db-red">0</span></div>
                    <div className="db-stat-col"><span className="db-stat-label">Sales Stage</span><span className="db-stat-val db-red">0</span></div>
                  </div>
                </div>
                <div className="db-stat-card">
                  <div className="db-stat-title">Trial Status</div>
                  <div className="db-stat-cols">
                    <div className="db-stat-col"><span className="db-stat-label">Trial Scheduled</span><span className="db-stat-val">0</span></div>
                    <div className="db-stat-col"><span className="db-stat-label">Trial Completed</span><span className="db-stat-val">0</span></div>
                    <div className="db-stat-col"><span className="db-stat-label">Converted</span><span className="db-stat-val">0</span></div>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="db-action-bar">
                <div className="db-action-left">
                  <button className="db-filter-btn" title="Filter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                    </svg>
                  </button>
                  <span className="db-action-label">Action</span>
                  <select className="db-action-select" value={action} onChange={e => setAction(e.target.value)}>
                    <option value="">Select</option>
                    <option>Delete</option>
                    <option>Archive</option>
                  </select>
                  <span className="db-action-label">Communicate</span>
                  <select className="db-action-select" value={communicate} onChange={e => setCommunicate(e.target.value)}>
                    <option value="">Select</option>
                    <option>Email</option>
                    <option>SMS</option>
                  </select>
                </div>
                <div className="db-action-right">
                  <button className="db-btn-outline" onClick={() => setShowDialog(true)}>+ Add Enquiry</button>
                  <button className="db-btn-outline">Export Enquiries</button>
                </div>
              </div>

              {/* Results */}
              {loading ? (
                <p className="db-state-msg">Loading enquiries…</p>
              ) : filtered.length === 0 ? (
                <p className="db-no-results">No Results Found.</p>
              ) : (
                <div className="db-table-wrap">
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>#</th><th>Name</th><th>Contact</th><th>Service</th>
                        <th>Lead Source</th><th>Enquiry Date</th><th>Trial</th>
                        <th>Call Tag</th><th>Follow-up Staff</th><th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((e, idx) => (
                        <tr key={e.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <div className="db-name">{e.fullName}</div>
                            {e.email && <div className="db-email">{e.email}</div>}
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
            </>
          )}
        </main>
      </div>

      {showDialog && (
        <AddEnquiryDialog
          onClose={() => setShowDialog(false)}
          onSave={handleSave}
          staffNames={staffList.map(s => s.fullName)}
        />
      )}
    </div>
  );
}
