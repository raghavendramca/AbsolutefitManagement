import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { enquiriesApi } from '../api/enquiries';
import { navigationApi, type NavMenuItemDto, type QuickAddMenuItemDto } from '../api/navigation';
import { staffApi, type StaffMember } from '../api/staff';
import { servicesApi, type GymServiceDto, type ServiceVariationDto, type CreateServiceVariationRequest, type UpdateServiceRequest } from '../api/services';
import { packagesApi, type GymPackageDto, type CreatePackageItemRequest } from '../api/packages';
import { profileApi, type GymProfileDto, DAYS, parseOperatingHours, defaultHours, type OperatingHourSlot } from '../api/profile';
import { formCustomizationApi, type FormFieldConfig, type AdditionalDetailField, type AdditionalDetailFieldType } from '../api/formCustomization';
import { fitnessProfileApi, type FitnessProfileItemDto, type FitnessCategory } from '../api/fitnessProfile';
import { apparelItemsApi, type ApparelItemDto, type ApparelCategory } from '../api/apparelItems';
import { membersApi, type CreateMemberDto } from '../api/members';
import { getFormSections } from '../formSchemas/formSchemaRegistry';
import type { Enquiry, CreateEnquiryRequest } from '../types';
import AddEnquiryDialog from '../components/AddEnquiryDialog';
import AddMemberDialog from '../components/AddMemberDialog';
import './DashboardPage.css';
import './setup-additions.css';

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

// ─── Setup: Getting Started ───────────────────────────────────────────────────

const GETTING_STARTED_STEPS = [
  { label: 'Set Up Branch Profile' },
  { label: 'Update Brand Logo' },
  { label: 'Define Tax' },
  { label: 'Update Bill Template' },
  { label: 'Define Services And Pricing' },
  { label: 'Create Membership Plans' },
  { label: 'Add Staff Members' },
  { label: 'Configure Notifications' },
];

function GettingStartedContent() {
  const [completed] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));
  const completedCount = completed.size;
  const total = GETTING_STARTED_STEPS.length;
  const pct = Math.round((completedCount / total) * 100);

  return (
    <div className="gs-wrap">
      <div className="gs-card">
        <h2 className="gs-title">Getting Started</h2>
        <p className="gs-subtitle">Complete the following steps to get the most out of your account</p>
        <div className="gs-progress-row">
          <div className="gs-progress-bar">
            <div className="gs-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="gs-progress-label">Completed {completedCount} out of {total}</span>
        </div>
        <div className="gs-steps">
          {GETTING_STARTED_STEPS.map((step, idx) => {
            const done = completed.has(idx);
            return (
              <div key={idx} className={`gs-step${done ? ' gs-step-done' : ''}`}>
                <div className="gs-step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {done
                      ? <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      : <circle cx="12" cy="12" r="8" />}
                  </svg>
                </div>
                <div className="gs-step-info">
                  <span className="gs-step-num">Step:{idx + 1}</span>
                  <span className="gs-step-label">{step.label}</span>
                </div>
                {done && <button className="gs-btn-done">COMPLETED</button>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Setup: Profile ───────────────────────────────────────────────────────────

const HOURS_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  const hNum = parseInt(h);
  const ampm = hNum < 12 ? 'AM' : 'PM';
  const h12 = hNum === 0 ? 12 : hNum > 12 ? hNum - 12 : hNum;
  return { value: `${h}:${m}`, label: `${h12.toString().padStart(2, '0')}:${m} ${ampm}` };
});

function ProfileContent({ subscriptionId, gymId }: { subscriptionId: string; gymId: string }) {
  const [profile, setProfile] = useState<GymProfileDto | null>(null);
  const [hours, setHours] = useState<Record<string, OperatingHourSlot>>(defaultHours());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    profileApi.get(subscriptionId, gymId).then(p => {
      setProfile(p);
      setHours(parseOperatingHours(p.operatingHoursJson) || defaultHours());
    }).catch(() => {});
  }, [subscriptionId, gymId]);

  function updateField(field: keyof GymProfileDto, value: string | number) {
    setProfile(prev => prev ? { ...prev, [field]: value } : null);
  }

  function updateHour(day: string, field: keyof OperatingHourSlot, value: string | boolean) {
    setHours(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  }

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    try {
      const updated = await profileApi.update(subscriptionId, gymId, {
        ...profile,
        operatingHoursJson: JSON.stringify(hours),
      });
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  const p = profile ?? ({} as GymProfileDto);

  return (
    <div className="prof-wrap">
      <div className="prof-form">
        <div className="prof-field"><label>Country*</label>
          <select value={p.country ?? 'India'} onChange={e => updateField('country', e.target.value)}>
            <option>India</option><option>USA</option><option>UK</option><option>UAE</option>
          </select>
        </div>
        <div className="prof-field"><label>State/Region*</label>
          <select value={p.stateRegion ?? ''} onChange={e => updateField('stateRegion', e.target.value)}>
            <option value="">Select</option>
            <option>Karnataka</option><option>Maharashtra</option><option>Tamil Nadu</option><option>Delhi</option>
          </select>
        </div>
        <div className="prof-field"><label>City*</label>
          <select value={p.city ?? ''} onChange={e => updateField('city', e.target.value)}>
            <option value="">Select</option>
            <option>Bengaluru</option><option>Mumbai</option><option>Chennai</option><option>Delhi</option>
          </select>
        </div>
        <div className="prof-field"><label>Locality*</label>
          <select value={p.locality ?? ''} onChange={e => updateField('locality', e.target.value)}>
            <option value="">Select</option>
            <option>Marathahalli</option><option>Koramangala</option><option>Indiranagar</option>
          </select>
        </div>
        <div className="prof-field"><label>Currency*</label>
          <select value={p.currency ?? '₹'} onChange={e => updateField('currency', e.target.value)}>
            <option value="₹">₹</option><option value="$">$</option><option value="€">€</option>
          </select>
        </div>
        <div className="prof-field"><label>Region</label>
          <select value={p.region ?? ''} onChange={e => updateField('region', e.target.value)}>
            <option value="">Select</option><option>South</option><option>North</option><option>East</option><option>West</option>
          </select>
        </div>
        <div className="prof-field"><label>Timezone*</label>
          <select value={p.timezone ?? ''} onChange={e => updateField('timezone', e.target.value)}>
            <option value="(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
            <option value="(UTC+00:00) UTC">(UTC+00:00) UTC</option>
          </select>
        </div>
        <div className="prof-field"><label>Business Type*</label>
          <select value={p.businessType ?? 'Fitness'} onChange={e => updateField('businessType', e.target.value)}>
            <option>Fitness</option><option>Yoga</option><option>Martial Arts</option><option>Dance</option>
          </select>
        </div>
        <div className="prof-field"><label>Brand Name*</label>
          <input type="text" value={p.brandName ?? ''} onChange={e => updateField('brandName', e.target.value)} />
        </div>
        <div className="prof-field"><label>Branch Phone Number</label>
          <input type="text" value={p.phoneNumber ?? ''} onChange={e => updateField('phoneNumber', e.target.value)} placeholder="+91" />
        </div>
        <div className="prof-field"><label>Branch e-mail id</label>
          <input type="email" value={p.email ?? ''} onChange={e => updateField('email', e.target.value)} />
        </div>
        <div className="prof-field-row">
          <div className="prof-field prof-field-half">
            <label>Latitude</label>
            <input type="number" value={p.latitude ?? 0} onChange={e => updateField('latitude', parseFloat(e.target.value) || 0)} />
          </div>
          <div className="prof-field prof-field-half">
            <label>Longitude</label>
            <input type="number" value={p.longitude ?? 0} onChange={e => updateField('longitude', parseFloat(e.target.value) || 0)} />
          </div>
        </div>
        <div className="prof-field"><label>Address*</label>
          <textarea rows={3} value={p.address ?? ''} onChange={e => updateField('address', e.target.value)} />
        </div>

        <div className="prof-hours-section">
          <h3 className="prof-hours-title">Operating Hours *</h3>
          <table className="prof-hours-table">
            <thead>
              <tr>
                <th>Days</th>
                <th colSpan={4}>Select Operating Hour</th>
                <th colSpan={3}>Select Break Timing</th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map(day => {
                const slot = hours[day] ?? { closed: false, openFrom: '05:00', openTo: '22:00', breakFrom: '', breakTo: '' };
                return (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>
                      <label className="prof-closed-chk">
                        <input type="checkbox" checked={slot.closed} onChange={e => updateHour(day, 'closed', e.target.checked)} />
                        <span>We are closed</span>
                      </label>
                    </td>
                    <td>
                      <select disabled={slot.closed} value={slot.openFrom} onChange={e => updateHour(day, 'openFrom', e.target.value)}>
                        {HOURS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </td>
                    <td><span className="prof-to">to</span></td>
                    <td>
                      <select disabled={slot.closed} value={slot.openTo} onChange={e => updateHour(day, 'openTo', e.target.value)}>
                        {HOURS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </td>
                    <td>
                      <select disabled={slot.closed} value={slot.breakFrom ?? ''} onChange={e => updateHour(day, 'breakFrom', e.target.value)}>
                        <option value="">Select</option>
                        {HOURS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </td>
                    <td><span className="prof-to">to</span></td>
                    <td>
                      <select disabled={slot.closed} value={slot.breakTo ?? ''} onChange={e => updateHour(day, 'breakTo', e.target.value)}>
                        <option value="">Select</option>
                        {HOURS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="prof-field prof-field-inline">
          <label>Area</label>
          <input type="number" value={p.areaSqft ?? 0} style={{ width: 100 }} onChange={e => updateField('areaSqft', parseFloat(e.target.value) || 0)} />
          <span className="prof-unit">(Sqft)</span>
        </div>

        <button className="setup-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : saved ? 'Saved!' : 'Save'}
        </button>
      </div>
    </div>
  );
}

// ─── Setup: Manage Services ───────────────────────────────────────────────────

const SERVICE_CATEGORIES = [
  'General Membership', 'Personal Training', 'Group Training',
  'Nutrition Counselling', 'Teachers Training', 'Workshop/Event', 'Trial', 'PT Trial',
];
const SERVICE_TYPES = ['1 Session', 'Multiple Sessions', 'Membership', 'Day pass', 'Monthly', 'Quarterly', 'Yearly'];
const TAX_OPTIONS = ['No Tax', 'GST 5%', 'GST 12%', 'GST 18%'];

function formatDuration(v: ServiceVariationDto): string {
  const type = v.serviceType.toLowerCase();
  if (type === 'membership') {
    const months = Math.round(v.validityDays / 30) || 1;
    return `7 Days Per week. Valid for ${months} month(s).`;
  }
  if (type === 'multiple sessions') {
    const mins = String(v.timeMinutes).padStart(2, '0');
    return `${v.validityDays} Sessions. ${v.timeHours} Hours ${mins} minutes per session. Valid for ${v.validityDays} day(s).`;
  }
  return `Valid for ${v.validityDays} day(s)`;
}

// ── Add/Edit Variation Modal ──────────────────────────────────────────────────

function AddVariationModal({
  service,
  subscriptionId,
  gymId,
  onClose,
  onSaved,
}: {
  service: GymServiceDto;
  subscriptionId: string;
  gymId: string;
  onClose: () => void;
  onSaved: (v: ServiceVariationDto) => void;
}) {
  const [form, setForm] = useState<CreateServiceVariationRequest>({
    serviceType: '1 Session',
    name: '',
    serviceFee: 1,
    timeHours: 0,
    timeMinutes: 15,
    validityDays: 1,
    maxMembers: 1,
    tax: 'No Tax',
    category: 'General Membership',
    otpVerification: false,
    upgradable: true,
    transferable: false,
    appointmentsApplicable: false,
    registrationFee: false,
    minFeeLimit: 0,
    maxFeeLimit: 0,
    eligibleForReferralBonus: false,
    referralBonusFromPurchase: false,
    promoteOnline: false,
  });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof CreateServiceVariationRequest>(k: K, v: CreateServiceVariationRequest[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const result = await servicesApi.createVariation(subscriptionId, gymId, service.id, form);
      onSaved(result);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box variation-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span>Add Service Variation for &ldquo;{service.name}&rdquo;</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-service-type-row">
          <label>Choose Service type</label>
          <select value={form.serviceType} onChange={e => set('serviceType', e.target.value)}>
            {SERVICE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="variation-modal-body">
          <div className="variation-left">
            <div className="var-field"><label>Service Variations Name*</label>
              <input type="text" value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div className="var-field"><label>Service Fee</label>
              <input type="number" value={form.serviceFee} onChange={e => set('serviceFee', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="var-field-row">
              <div className="var-field var-field-half"><label>Time (Hours)</label>
                <select value={form.timeHours} onChange={e => set('timeHours', parseInt(e.target.value))}>
                  {Array.from({ length: 25 }, (_, i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="var-field var-field-half"><label>Time (Minutes)</label>
                <select value={form.timeMinutes} onChange={e => set('timeMinutes', parseInt(e.target.value))}>
                  {[0, 15, 30, 45].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="var-field"><label>Validity in day(s)*</label>
              <input type="number" value={form.validityDays} min={1} onChange={e => set('validityDays', parseInt(e.target.value) || 1)} />
            </div>
            <div className="var-field"><label>Maximum Member(s)</label>
              <input type="number" value={form.maxMembers} disabled />
            </div>
            <div className="var-field"><label>Tax</label>
              <select value={form.tax} onChange={e => set('tax', e.target.value)}>
                {TAX_OPTIONS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="var-field"><label>Choose Category*</label>
              <div className="var-radio-grid">
                {SERVICE_CATEGORIES.map(cat => (
                  <label key={cat} className="var-radio">
                    <input type="radio" name="category" value={cat} checked={form.category === cat} onChange={() => set('category', cat)} />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            {([
              ['OTP Verification for Check-in', 'otpVerification'],
              ['Upgradable*', 'upgradable'],
              ['Transferable*', 'transferable'],
              ['Appointments Applicable*', 'appointmentsApplicable'],
              ['Registration fee*', 'registrationFee'],
              ['Eligible for referral bonus*', 'eligibleForReferralBonus'],
              ['Referral Bonus from this Purchase*', 'referralBonusFromPurchase'],
            ] as [string, keyof CreateServiceVariationRequest][]).map(([label, key]) => (
              <div key={key} className="var-field var-yn-field">
                <label>{label}</label>
                <div className="var-yn">
                  <label><input type="radio" checked={form[key] === true} onChange={() => set(key, true as never)} /> Yes</label>
                  <label><input type="radio" checked={form[key] === false} onChange={() => set(key, false as never)} /> No</label>
                </div>
              </div>
            ))}
            <div className="var-field"><label>Minimum Fee Limit <span className="var-hint">(0= Unlimited)</span></label>
              <input type="number" value={form.minFeeLimit} onChange={e => set('minFeeLimit', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="var-field"><label>Maximum Fee Limit <span className="var-hint">(0= Unlimited)</span></label>
              <input type="number" value={form.maxFeeLimit} onChange={e => set('maxFeeLimit', parseFloat(e.target.value) || 0)} />
            </div>
          </div>
          <div className="variation-right">
            <div className="var-promo-tab">Promotion</div>
            <div className="var-field var-yn-field">
              <label>Promote on Website/Member App/Plug-in*</label>
              <div className="var-yn">
                <label><input type="radio" checked={form.promoteOnline === true} onChange={() => set('promoteOnline', true)} /> Yes</label>
                <label><input type="radio" checked={form.promoteOnline === false} onChange={() => set('promoteOnline', false)} /> No</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="setup-save-btn" onClick={handleSave} disabled={saving || !form.name}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button className="setup-cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Service Form ───────────────────────────────────────────────────

const DEFAULT_SERVICE_FORM = {
  name: '',
  description: '',
  categoryType: 'Brand',
  sacCode: '',
  tax: '',
};

function ServiceForm({
  initial,
  title,
  onSave,
  onCancel,
}: {
  initial: typeof DEFAULT_SERVICE_FORM;
  title: string;
  onSave: (data: typeof DEFAULT_SERVICE_FORM) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(k: keyof typeof form, v: string) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function handleSubmit() {
    if (!form.name.trim()) { setError('Service name is required.'); return; }
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="svc-form-wrap">
      <div className="svc-form-card">
        <div className="svc-form-header">{title}</div>

        <div className="svc-form-field">
          <label className="svc-form-label">Category Type*</label>
          <div className="svc-form-radios">
            <label className="svc-form-radio-opt">
              <input type="radio" name="categoryType" value="Brand"
                checked={form.categoryType === 'Brand'}
                onChange={() => set('categoryType', 'Brand')} />
              <span>
                <strong>Brand:</strong> You will be able to sell this service at the studio, company&rsquo;s website, member mobile app and plug-in.
              </span>
            </label>
            <label className="svc-form-radio-opt">
              <input type="radio" name="categoryType" value="aktivity"
                checked={form.categoryType === 'aktivity'}
                onChange={() => set('categoryType', 'aktivity')} />
              <span>
                <strong>aktivity:</strong> You will be able to sell this service on Yoactiv website and Yoactiv app.
              </span>
            </label>
          </div>
        </div>

        <div className="svc-form-field">
          <label className="svc-form-label">Service / Activity Name*</label>
          <input
            className={`svc-form-input${!form.name && error ? ' svc-form-input-err' : ''}`}
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Enter service name"
          />
        </div>

        <div className="svc-form-field">
          <label className="svc-form-label">SAC Code</label>
          <input className="svc-form-input svc-form-input-narrow" type="text"
            value={form.sacCode} onChange={e => set('sacCode', e.target.value)} />
        </div>

        <div className="svc-form-field">
          <label className="svc-form-label">Tax</label>
          <select className="svc-form-select" value={form.tax} onChange={e => set('tax', e.target.value)}>
            <option value="">Select</option>
            {TAX_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {error && <p className="svc-form-error">{error}</p>}

        <div className="svc-form-actions">
          <button className="setup-save-btn" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button className="setup-cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Variations List View ──────────────────────────────────────────────────────

function VariationsListView({
  service,
  subscriptionId,
  gymId,
  onBack,
}: {
  service: GymServiceDto;
  subscriptionId: string;
  gymId: string;
  onBack: () => void;
}) {
  const [variations, setVariations] = useState<ServiceVariationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [openOptionsMenu, setOpenOptionsMenu] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    servicesApi.listVariations(subscriptionId, gymId, service.id)
      .then(setVariations)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [subscriptionId, gymId, service.id]);

  useEffect(() => {
    if (!openOptionsMenu) return;
    function handleOutside(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.svc-var-options-wrap')) setOpenOptionsMenu(null);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [openOptionsMenu]);

  function handleVariationSaved(v: ServiceVariationDto) {
    setVariations(prev => [...prev, v]);
  }

  async function handleDeleteVariation(variationId: string) {
    if (!window.confirm('Delete this variation?')) return;
    setDeleting(variationId);
    try {
      await servicesApi.deleteVariation(subscriptionId, gymId, service.id, variationId);
      setVariations(prev => prev.filter(v => v.id !== variationId));
    } finally {
      setDeleting(null);
      setOpenOptionsMenu(null);
    }
  }

  const allTypes = Array.from(new Set(variations.map(v => v.serviceType)));

  const filtered = variations.filter(v => {
    const matchType = !typeFilter || v.serviceType === typeFilter;
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const shortId = (id: string) => parseInt(id.replace(/-/g, '').substring(0, 8), 16) % 1000000;

  return (
    <div className="svc-var-list-wrap">
      <div className="svc-var-toolbar">
        <div className="svc-var-toolbar-left">
          <button className="svc-back-btn" onClick={onBack}>Back</button>
          <select className="svc-var-filter-select" value="">
            <option>{service.name}</option>
          </select>
          <select className="svc-var-filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">All Type</option>
            {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input className="svc-var-search" type="text" placeholder="Search"
            value={searchInput} onChange={e => setSearchInput(e.target.value)} />
          <button className="db-btn-go" onClick={() => setSearch(searchInput)}>Go</button>
        </div>
        <button className="svc-var-add-btn" onClick={() => setShowAddModal(true)}>Add Variation</button>
      </div>

      {loading ? (
        <p className="db-state-msg">Loading variations…</p>
      ) : (
        <div className="db-table-wrap">
          <table className="db-table svc-var-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Variation Id</th>
                <th>Service Variations</th>
                <th>Service Type</th>
                <th>Duration</th>
                <th>Service Fee</th>
                <th>Online Sale</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, idx) => (
                <tr key={v.id}>
                  <td>
                    <span className="svc-drag-handle">
                      <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                        <circle cx="5" cy="4" r="1.2"/><circle cx="11" cy="4" r="1.2"/>
                        <circle cx="5" cy="8" r="1.2"/><circle cx="11" cy="8" r="1.2"/>
                        <circle cx="5" cy="12" r="1.2"/><circle cx="11" cy="12" r="1.2"/>
                      </svg>
                    </span>
                    {idx + 1}
                  </td>
                  <td className="svc-var-id">{shortId(v.id)}</td>
                  <td className="svc-var-name">{v.name}</td>
                  <td>{v.serviceType}</td>
                  <td className="svc-var-duration">{formatDuration(v)}</td>
                  <td>₹ {v.serviceFee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td>{v.promoteOnline ? 'Yes' : 'No'}</td>
                  <td>
                    <button className={`db-toggle ${v.isActive ? 'db-toggle-on' : 'db-toggle-off'}`}>
                      <span className="db-toggle-label">{v.isActive ? 'On' : 'Off'}</span>
                      <span className="db-toggle-knob" />
                    </button>
                  </td>
                  <td>
                    <div className="svc-var-options-wrap">
                      <button
                        className="svc-options-arrow-btn"
                        onClick={() => setOpenOptionsMenu(openOptionsMenu === v.id ? null : v.id)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {openOptionsMenu === v.id && (
                        <div className="svc-options-dropdown">
                          <button
                            className="svc-options-item svc-options-item-danger"
                            onClick={() => handleDeleteVariation(v.id)}
                            disabled={deleting === v.id}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                            </svg>
                            {deleting === v.id ? 'Deleting…' : 'Delete'}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="db-state-msg">No variations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <AddVariationModal
          service={service}
          subscriptionId={subscriptionId}
          gymId={gymId}
          onClose={() => setShowAddModal(false)}
          onSaved={handleVariationSaved}
        />
      )}
    </div>
  );
}

// ── Manage Services (main list) ───────────────────────────────────────────────

type SvcView = 'list' | 'add' | 'edit' | 'variations';

function ManageServicesContent({ subscriptionId, gymId }: { subscriptionId: string; gymId: string }) {
  const [services, setServices] = useState<GymServiceDto[]>([]);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [view, setView] = useState<SvcView>('list');
  const [selectedService, setSelectedService] = useState<GymServiceDto | null>(null);
  const [openOptionsMenu, setOpenOptionsMenu] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    servicesApi.list(subscriptionId, gymId).then(setServices).catch(() => {});
  }, [subscriptionId, gymId]);

  useEffect(() => {
    if (!openOptionsMenu) return;
    function handleOutside(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.svc-options-btn-group')) setOpenOptionsMenu(null);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [openOptionsMenu]);

  async function handleAddService(data: typeof DEFAULT_SERVICE_FORM) {
    const s = await servicesApi.create(subscriptionId, gymId, {
      name: data.name,
      description: data.description || undefined,
      categoryType: data.categoryType,
      sacCode: data.sacCode || undefined,
      tax: data.tax || undefined,
    });
    setServices(prev => [...prev, s]);
    setView('list');
  }

  async function handleEditService(data: typeof DEFAULT_SERVICE_FORM) {
    if (!selectedService) return;
    const updated = await servicesApi.update(subscriptionId, gymId, selectedService.id, {
      name: data.name,
      description: data.description || undefined,
      categoryType: data.categoryType,
      sacCode: data.sacCode || undefined,
      tax: data.tax || undefined,
      isActive: selectedService.isActive,
    } as UpdateServiceRequest);
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
    setView('list');
  }

  async function handleToggleActive(svc: GymServiceDto) {
    const updated = await servicesApi.update(subscriptionId, gymId, svc.id, {
      name: svc.name,
      description: svc.description,
      categoryType: svc.categoryType,
      sacCode: svc.sacCode,
      tax: svc.tax,
      isActive: !svc.isActive,
    } as UpdateServiceRequest);
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
  }

  async function handleDelete(svc: GymServiceDto) {
    if (!window.confirm(`Delete service "${svc.name}"?`)) return;
    setDeleting(svc.id);
    setOpenOptionsMenu(null);
    try {
      await servicesApi.delete(subscriptionId, gymId, svc.id);
      setServices(prev => prev.filter(s => s.id !== svc.id));
    } finally {
      setDeleting(null);
    }
  }

  function openEdit(svc: GymServiceDto) {
    setSelectedService(svc);
    setOpenOptionsMenu(null);
    setView('edit');
  }

  function openVariations(svc: GymServiceDto) {
    setSelectedService(svc);
    setView('variations');
  }

  if (view === 'add') {
    return (
      <ServiceForm
        title="Add Service"
        initial={DEFAULT_SERVICE_FORM}
        onSave={handleAddService}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'edit' && selectedService) {
    return (
      <ServiceForm
        title={`Edit Service — ${selectedService.name}`}
        initial={{
          name: selectedService.name,
          description: selectedService.description ?? '',
          categoryType: selectedService.categoryType,
          sacCode: selectedService.sacCode ?? '',
          tax: selectedService.tax ?? '',
        }}
        onSave={handleEditService}
        onCancel={() => { setView('list'); setSelectedService(null); }}
      />
    );
  }

  if (view === 'variations' && selectedService) {
    return (
      <VariationsListView
        service={selectedService}
        subscriptionId={subscriptionId}
        gymId={gymId}
        onBack={() => { setView('list'); setSelectedService(null); }}
      />
    );
  }

  const filtered = search.trim()
    ? services.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    : services;

  return (
    <div className="svc-wrap">
      <div className="svc-toolbar">
        <div className="svc-search-group">
          <input className="svc-search" type="text" placeholder="Search"
            value={searchInput} onChange={e => setSearchInput(e.target.value)} />
          <button className="db-btn-go" onClick={() => setSearch(searchInput)}>Go</button>
        </div>
        <div className="svc-actions">
          <button className="setup-outline-btn" onClick={() => setView('add')}>Add New Service</button>
          <button className="setup-outline-btn">Playgrounds</button>
        </div>
      </div>

      <div className="db-table-wrap">
        <table className="db-table svc-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Service Name</th>
              <th>Service Variations</th>
              <th>Promote</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((svc, idx) => (
              <tr key={svc.id}>
                <td>
                  <span className="svc-drag-handle">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                      <circle cx="5" cy="4" r="1.2"/><circle cx="11" cy="4" r="1.2"/>
                      <circle cx="5" cy="8" r="1.2"/><circle cx="11" cy="8" r="1.2"/>
                      <circle cx="5" cy="12" r="1.2"/><circle cx="11" cy="12" r="1.2"/>
                    </svg>
                  </span>
                  {idx + 1}
                </td>
                <td>{svc.name}</td>
                <td>
                  <button className="svc-variation-count" onClick={() => openVariations(svc)}>
                    {svc.variationCount} View
                  </button>
                </td>
                <td>
                  <button
                    className={`db-toggle ${svc.isActive ? 'db-toggle-on' : 'db-toggle-off'}`}
                    onClick={() => handleToggleActive(svc)}
                  >
                    <span className="db-toggle-label">{svc.isActive ? 'On' : 'Off'}</span>
                    <span className="db-toggle-knob" />
                  </button>
                </td>
                <td>
                  <button
                    className={`db-toggle ${svc.isActive ? 'db-toggle-on' : 'db-toggle-off'}`}
                    onClick={() => handleToggleActive(svc)}
                  >
                    <span className="db-toggle-label">{svc.isActive ? 'On' : 'Off'}</span>
                    <span className="db-toggle-knob" />
                  </button>
                </td>
                <td>
                  <div className="svc-options-btn-group">
                    <button className="svc-add-var-btn" onClick={() => openVariations(svc)}>
                      + Add Variation
                    </button>
                    <button
                      className="svc-options-arrow-btn"
                      onClick={() => setOpenOptionsMenu(openOptionsMenu === svc.id ? null : svc.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openOptionsMenu === svc.id && (
                      <div className="svc-options-dropdown">
                        <button className="svc-options-item" onClick={() => openEdit(svc)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </button>
                        <button className="svc-options-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                          Access control
                        </button>
                        <button
                          className="svc-options-item svc-options-item-danger"
                          onClick={() => handleDelete(svc)}
                          disabled={deleting === svc.id}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                          </svg>
                          {deleting === svc.id ? 'Deleting…' : 'Delete'}
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="db-state-msg">No services found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {filtered.length > 0 && (
        <div className="svc-load-more-row">
          <button className="svc-load-more-btn">Load More</button>
        </div>
      )}
    </div>
  );
}

// ─── Setup: Manage Packages ───────────────────────────────────────────────────

function ManagePackagesContent({ subscriptionId, gymId }: { subscriptionId: string; gymId: string }) {
  const [packages, setPackages] = useState<GymPackageDto[]>([]);
  const [services, setServices] = useState<GymServiceDto[]>([]);
  const [packageName, setPackageName] = useState('');
  const [rows, setRows] = useState<CreatePackageItemRequest[]>([
    { serviceId: '', serviceName: '', serviceFee: 0, quantity: 1, discount: 0, discountType: '%' },
  ]);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    servicesApi.list(subscriptionId, gymId).then(setServices).catch(() => {});
    packagesApi.list(subscriptionId, gymId).then(setPackages).catch(() => {});
  }, [subscriptionId, gymId]);

  function addRow() {
    setRows(prev => [...prev, { serviceId: '', serviceName: '', serviceFee: 0, quantity: 1, discount: 0, discountType: '%' }]);
  }

  function updateRow(idx: number, field: keyof CreatePackageItemRequest, value: string | number) {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  }

  function selectService(idx: number, svc: GymServiceDto) {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, serviceId: svc.id, serviceName: svc.name } : r));
    setServiceDropdownOpen(null);
  }

  const total = rows.reduce((sum, r) => {
    const fee = r.serviceFee * r.quantity;
    const disc = r.discountType === '%' ? fee * r.discount / 100 : r.discount;
    return sum + fee - disc;
  }, 0);

  async function handleSave() {
    if (!packageName.trim()) return;
    const validRows = rows.filter(r => r.serviceId);
    setSaving(true);
    try {
      const pkg = await packagesApi.create(subscriptionId, gymId, { name: packageName, items: validRows });
      setPackages(prev => [...prev, pkg]);
      setPackageName('');
      setRows([{ serviceId: '', serviceName: '', serviceFee: 0, quantity: 1, discount: 0, discountType: '%' }]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="pkg-wrap">
      <div className="pkg-form">
        <div className="pkg-name-row">
          <label className="pkg-name-label">Package Name*</label>
          <input className="pkg-name-input" type="text" value={packageName} onChange={e => setPackageName(e.target.value)} />
        </div>
        <table className="pkg-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>SERVICE</th>
              <th>SERVICE FEE</th>
              <th>QUANTITY</th>
              <th>SERVICE DISCOUNT</th>
              <th><button className="pkg-add-row" onClick={addRow}>+</button></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td className="pkg-svc-cell">
                  <div className="pkg-svc-select-wrap">
                    <button
                      className="pkg-svc-btn"
                      onClick={() => setServiceDropdownOpen(serviceDropdownOpen === idx ? null : idx)}
                    >
                      {row.serviceName || 'Select service'}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {serviceDropdownOpen === idx && (
                      <div className="pkg-svc-dropdown">
                        {services.map(s => (
                          <div key={s.id} className="pkg-svc-opt" onClick={() => selectService(idx, s)}>{s.name}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td><input className="pkg-num-input" type="number" value={row.serviceFee} onChange={e => updateRow(idx, 'serviceFee', parseFloat(e.target.value) || 0)} /></td>
                <td><input className="pkg-num-input" type="number" value={row.quantity} min={1} onChange={e => updateRow(idx, 'quantity', parseInt(e.target.value) || 1)} /></td>
                <td>
                  <div className="pkg-discount-row">
                    <input className="pkg-num-input" type="number" value={row.discount} onChange={e => updateRow(idx, 'discount', parseFloat(e.target.value) || 0)} />
                    <select value={row.discountType} onChange={e => updateRow(idx, 'discountType', e.target.value)}>
                      <option value="%">%</option><option value="Flat">Flat</option>
                    </select>
                    <span>= {(row.discountType === '%' ? row.serviceFee * row.quantity * row.discount / 100 : row.discount).toFixed(0)}</span>
                  </div>
                </td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pkg-total">Total = {total.toFixed(0)}</div>
        <div className="pkg-actions">
          <button className="setup-save-btn" onClick={handleSave} disabled={saving || !packageName.trim()}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {packages.length > 0 && (
        <div className="pkg-list">
          <h3>Saved Packages</h3>
          {packages.map(pkg => (
            <div key={pkg.id} className="pkg-list-item">
              <strong>{pkg.name}</strong>
              <span className="pkg-list-count">{pkg.items.length} service(s)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Setup: Fitness Profile ───────────────────────────────────────────────────

const FITNESS_SUBTABS: { label: string; category: FitnessCategory }[] = [
  { label: 'Level',                   category: 'Level'          },
  { label: 'Division',                category: 'Division'       },
  { label: 'Certification',           category: 'Certification'  },
  { label: 'Injuries and Conditions', category: 'InjuryCondition'},
  { label: 'Activity Level',          category: 'ActivityLevel'  },
];

const FP_PAGE_SIZE = 20;

function FitnessProfileContent({ subscriptionId, gymId }: { subscriptionId: string; gymId: string }) {
  const [activeCategory, setActiveCategory] = useState<FitnessCategory>('Level');
  const [items, setItems] = useState<FitnessProfileItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');
  const [page, setPage] = useState(1);

  const activeSubtab = FITNESS_SUBTABS.find(t => t.category === activeCategory)!;
  const totalPages = Math.max(1, Math.ceil(items.length / FP_PAGE_SIZE));
  const pageItems = items.slice((page - 1) * FP_PAGE_SIZE, page * FP_PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setEditId(null);
    fitnessProfileApi.list(subscriptionId, gymId, activeCategory)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [subscriptionId, gymId, activeCategory]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = inputVal.trim();
    if (!name) return;
    setSubmitting(true);
    try {
      const created = await fitnessProfileApi.create(subscriptionId, gymId, activeCategory, name);
      setItems(prev => [...prev, created]);
      setInputVal('');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(id: string) {
    const name = editVal.trim();
    if (!name) return;
    const updated = await fitnessProfileApi.update(subscriptionId, gymId, id, name);
    setItems(prev => prev.map(it => it.id === id ? updated : it));
    setEditId(null);
  }

  async function handleToggle(id: string) {
    const updated = await fitnessProfileApi.toggle(subscriptionId, gymId, id);
    setItems(prev => prev.map(it => it.id === id ? updated : it));
  }

  async function handleMove(id: string, moveUp: boolean) {
    const result = await fitnessProfileApi.move(subscriptionId, gymId, activeCategory, id, moveUp);
    setItems(result);
  }

  return (
    <div className="fp-wrap">
      <div className="fp-subtabs">
        {FITNESS_SUBTABS.map(t => (
          <button
            key={t.category}
            className={`fp-subtab ${activeCategory === t.category ? 'fp-subtab-active' : ''}`}
            onClick={() => setActiveCategory(t.category)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="fp-body">
        <form className="fp-form" onSubmit={handleSubmit}>
          <label className="fp-form-label">{activeSubtab.label}</label>
          <div className="fp-form-row">
            <input
              className="fp-form-input"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder=""
              required
            />
            <span className="fp-form-req">*</span>
            <button className="fp-submit-btn" type="submit" disabled={submitting}>Submit</button>
          </div>
        </form>

        {loading ? (
          <div className="fp-loading">Loading…</div>
        ) : (
          <>
            <div className="fp-pagination">
              <div className="fp-page-nav">
                <button onClick={() => setPage(1)} disabled={page === 1}>|◀</button>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>◀</button>
              </div>
              <span className="fp-page-label">Page {page} of {totalPages}</span>
              <div className="fp-page-nav">
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>▶</button>
                <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>▶|</button>
              </div>
            </div>

            <table className="fp-table">
              <thead>
                <tr>
                  <th className="fp-th fp-th-sno">S.No</th>
                  <th className="fp-th fp-th-name">Name</th>
                  <th className="fp-th fp-th-edit">Edit</th>
                  <th className="fp-th fp-th-sort">Sort</th>
                  <th className="fp-th fp-th-opt">Option</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr><td colSpan={5} className="fp-empty">No items yet. Use the form above to add one.</td></tr>
                ) : pageItems.map((item, idx) => {
                  const globalIdx = (page - 1) * FP_PAGE_SIZE + idx;
                  const isFirst = globalIdx === 0;
                  const isLast = globalIdx === items.length - 1;
                  const isEditing = editId === item.id;
                  return (
                    <tr key={item.id} className={idx % 2 === 0 ? 'fp-row-even' : 'fp-row-odd'}>
                      <td className="fp-td fp-td-sno">{globalIdx + 1}</td>
                      <td className="fp-td fp-td-name">
                        {isEditing ? (
                          <input
                            className="fp-edit-input"
                            value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleUpdate(item.id); if (e.key === 'Escape') setEditId(null); }}
                            autoFocus
                          />
                        ) : (
                          <span style={{ color: item.isEnabled ? undefined : '#aaa' }}>{item.name}</span>
                        )}
                      </td>
                      <td className="fp-td fp-td-edit">
                        {isEditing ? (
                          <button className="fp-edit-save" onClick={() => handleUpdate(item.id)}>✓</button>
                        ) : (
                          <button className="fp-edit-btn" onClick={() => { setEditId(item.id); setEditVal(item.name); }} title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                        )}
                      </td>
                      <td className="fp-td fp-td-sort">
                        <div className="fp-sort-btns">
                          <button disabled={isFirst} onClick={() => handleMove(item.id, true)} title="Move up">↑</button>
                          <button disabled={isLast} onClick={() => handleMove(item.id, false)} title="Move down">↓</button>
                        </div>
                      </td>
                      <td className="fp-td fp-td-opt">
                        <button
                          className={`fp-toggle-btn ${item.isEnabled ? 'fp-toggle-on' : 'fp-toggle-off'}`}
                          onClick={() => handleToggle(item.id)}
                          title={item.isEnabled ? 'Click To Disable' : 'Click To Enable'}
                        >
                          <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                            <circle cx="8" cy="8" r="7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Setup: Apparel and Shoes ─────────────────────────────────────────────────

const APPAREL_SUBTABS: { label: string; category: ApparelCategory }[] = [
  { label: 'T-Shirt Size', category: 'TShirtSize'  },
  { label: 'Shorts Size',  category: 'ShortsSize'  },
  { label: 'Shoes Size',   category: 'ShoesSize'   },
];

const AP_PAGE_SIZE = 20;

function ApparelContent({ subscriptionId, gymId }: { subscriptionId: string; gymId: string }) {
  const [activeCategory, setActiveCategory] = useState<ApparelCategory>('TShirtSize');
  const [items, setItems] = useState<ApparelItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');
  const [page, setPage] = useState(1);

  const activeSubtab = APPAREL_SUBTABS.find(t => t.category === activeCategory)!;
  const totalPages = Math.max(1, Math.ceil(items.length / AP_PAGE_SIZE));
  const pageItems = items.slice((page - 1) * AP_PAGE_SIZE, page * AP_PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setEditId(null);
    apparelItemsApi.list(subscriptionId, gymId, activeCategory)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [subscriptionId, gymId, activeCategory]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = inputVal.trim();
    if (!name) return;
    setSubmitting(true);
    try {
      const created = await apparelItemsApi.create(subscriptionId, gymId, activeCategory, name);
      setItems(prev => [...prev, created]);
      setInputVal('');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(id: string) {
    const name = editVal.trim();
    if (!name) return;
    const updated = await apparelItemsApi.update(subscriptionId, gymId, id, name);
    setItems(prev => prev.map(it => it.id === id ? updated : it));
    setEditId(null);
  }

  async function handleToggle(id: string) {
    const updated = await apparelItemsApi.toggle(subscriptionId, gymId, id);
    setItems(prev => prev.map(it => it.id === id ? updated : it));
  }

  async function handleMove(id: string, moveUp: boolean) {
    const result = await apparelItemsApi.move(subscriptionId, gymId, activeCategory, id, moveUp);
    setItems(result);
  }

  return (
    <div className="fp-wrap">
      <div className="fp-subtabs">
        {APPAREL_SUBTABS.map(t => (
          <button
            key={t.category}
            className={`fp-subtab ${activeCategory === t.category ? 'fp-subtab-active' : ''}`}
            onClick={() => setActiveCategory(t.category)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="fp-body">
        <form className="fp-form" onSubmit={handleSubmit}>
          <label className="fp-form-label">{activeSubtab.label}</label>
          <div className="fp-form-row">
            <input
              className="fp-form-input"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder=""
              required
            />
            <span className="fp-form-req">*</span>
            <button className="fp-submit-btn" type="submit" disabled={submitting}>Submit</button>
          </div>
        </form>

        {loading ? (
          <div className="fp-loading">Loading…</div>
        ) : (
          <>
            <div className="fp-pagination">
              <div className="fp-page-nav">
                <button onClick={() => setPage(1)} disabled={page === 1}>|◀</button>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>◀</button>
              </div>
              <span className="fp-page-label">Page {page} of {totalPages}</span>
              <div className="fp-page-nav">
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>▶</button>
                <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>▶|</button>
              </div>
            </div>

            <table className="fp-table">
              <thead>
                <tr>
                  <th className="fp-th fp-th-sno">S.No</th>
                  <th className="fp-th fp-th-name">Name</th>
                  <th className="fp-th fp-th-edit">Edit</th>
                  <th className="fp-th fp-th-sort">Sort</th>
                  <th className="fp-th fp-th-opt">Option</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr><td colSpan={5} className="fp-empty">No items yet. Use the form above to add one.</td></tr>
                ) : pageItems.map((item, idx) => {
                  const globalIdx = (page - 1) * AP_PAGE_SIZE + idx;
                  const isFirst = globalIdx === 0;
                  const isLast = globalIdx === items.length - 1;
                  const isEditing = editId === item.id;
                  return (
                    <tr key={item.id} className={idx % 2 === 0 ? 'fp-row-even' : 'fp-row-odd'}>
                      <td className="fp-td fp-td-sno">{globalIdx + 1}</td>
                      <td className="fp-td fp-td-name">
                        {isEditing ? (
                          <input
                            className="fp-edit-input"
                            value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleUpdate(item.id); if (e.key === 'Escape') setEditId(null); }}
                            autoFocus
                          />
                        ) : (
                          <span style={{ color: item.isEnabled ? undefined : '#aaa' }}>{item.name}</span>
                        )}
                      </td>
                      <td className="fp-td fp-td-edit">
                        {isEditing ? (
                          <button className="fp-edit-save" onClick={() => handleUpdate(item.id)}>✓</button>
                        ) : (
                          <button className="fp-edit-btn" onClick={() => { setEditId(item.id); setEditVal(item.name); }} title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                        )}
                      </td>
                      <td className="fp-td fp-td-sort">
                        <div className="fp-sort-btns">
                          <button disabled={isFirst} onClick={() => handleMove(item.id, true)} title="Move up">↑</button>
                          <button disabled={isLast} onClick={() => handleMove(item.id, false)} title="Move down">↓</button>
                        </div>
                      </td>
                      <td className="fp-td fp-td-opt">
                        <button
                          className={`fp-toggle-btn ${item.isEnabled ? 'fp-toggle-on' : 'fp-toggle-off'}`}
                          onClick={() => handleToggle(item.id)}
                          title={item.isEnabled ? 'Click To Disable' : 'Click To Enable'}
                        >
                          <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                            <circle cx="8" cy="8" r="7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Setup: Form Customization ────────────────────────────────────────────────

const FORM_TABS = ['Enquiry Form', 'Member Form', 'Additional Details', 'Fitness Profile', 'Apparel and Shoes'];

const FORM_TYPE_KEY: Record<string, string> = {
  'Enquiry Form':      'EnquiryForm',
  'Member Form':       'MemberForm',
  'Additional Details':'AdditionalDetails',
  'Fitness Profile':   'FitnessProfile',
  'Apparel and Shoes': 'ApparelAndShoes',
};

const AD_FIELD_LABELS: Record<AdditionalDetailFieldType, string> = {
  TextBox:          'Text Box',
  MultiLine:        'Multi Line',
  DropDown:         'Drop Down',
  RadioButton:      'Radio Button',
  MultipleSelection:'Multiple Selection',
};

const AD_TYPES_WITH_OPTIONS: AdditionalDetailFieldType[] = ['DropDown', 'RadioButton', 'MultipleSelection'];

function AdditionalDetailsGrid({ subscriptionId, gymId }: { subscriptionId: string; gymId: string }) {
  const [rows, setRows]     = useState<AdditionalDetailField[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    setLoading(true);
    setSaved(false);
    formCustomizationApi.get(subscriptionId, gymId, 'AdditionalDetails')
      .then(dto => {
        try {
          const parsed: AdditionalDetailField[] = JSON.parse(dto.fieldsJson);
          setRows(Array.isArray(parsed) ? parsed : []);
        } catch { setRows([]); }
      })
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [subscriptionId, gymId]);

  function addField(fieldType: AdditionalDetailFieldType) {
    const newRow: AdditionalDetailField = {
      id: crypto.randomUUID(),
      fieldType,
      caption: '',
      placeholder: '',
      required: false,
      options: AD_TYPES_WITH_OPTIONS.includes(fieldType) ? [''] : [],
      showInEnquiry: false,
      showInMember: false,
    };
    setRows(prev => [...prev, newRow]);
    setSaved(false);
  }

  function updateRow(id: string, patch: Partial<AdditionalDetailField>) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
    setSaved(false);
  }

  function deleteRow(id: string) {
    setRows(prev => prev.filter(r => r.id !== id));
    setSaved(false);
  }

  function moveRow(id: string, dir: 'up' | 'down') {
    setRows(prev => {
      const i = prev.findIndex(r => r.id === id);
      if (i < 0) return prev;
      if (dir === 'up'   && i === 0)              return prev;
      if (dir === 'down' && i === prev.length - 1) return prev;
      const next = [...prev];
      const j = dir === 'up' ? i - 1 : i + 1;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setSaved(false);
  }

  function addOption(id: string) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, options: [...r.options, ''] } : r));
    setSaved(false);
  }

  function updateOption(id: string, oi: number, val: string) {
    setRows(prev => prev.map(r => {
      if (r.id !== id) return r;
      const opts = [...r.options];
      opts[oi] = val;
      return { ...r, options: opts };
    }));
    setSaved(false);
  }

  function deleteOption(id: string, oi: number) {
    setRows(prev => prev.map(r =>
      r.id === id ? { ...r, options: r.options.filter((_, i) => i !== oi) } : r
    ));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await formCustomizationApi.upsert(subscriptionId, gymId, 'AdditionalDetails', rows);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading…</div>;

  return (
    <div className="ad-wrap">
      <div className="ad-layout">
        <div className="ad-main">
          <table className="ad-table">
            <thead>
              <tr className="ad-head-row">
                <th className="ad-th-type">Type</th>
                <th className="ad-th-placeholder">Placeholder</th>
                <th className="ad-th-required">Required</th>
                <th className="ad-th-options">Options</th>
                <th className="ad-th-check">Enquiry</th>
                <th className="ad-th-check">Member</th>
                <th className="ad-th-move">Move</th>
                <th className="ad-th-action">
                  <button className="ad-clear-btn" onClick={() => { setRows([]); setSaved(false); }}>
                    Clear All
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="ad-empty">
                    No fields added. Use the buttons on the right to add fields.
                  </td>
                </tr>
              ) : rows.map((row, idx) => (
                <tr key={row.id} className={idx % 2 === 0 ? 'ad-row-even' : 'ad-row-odd'}>
                  <td className="ad-td-type">
                    <div className="ad-type-label">{AD_FIELD_LABELS[row.fieldType]}</div>
                    <input
                      className="ad-caption-input"
                      placeholder="Caption"
                      value={row.caption}
                      onChange={e => updateRow(row.id, { caption: e.target.value })}
                    />
                  </td>
                  <td className="ad-td-placeholder">
                    {(row.fieldType === 'TextBox' || row.fieldType === 'MultiLine') && (
                      <input
                        className="ad-placeholder-input"
                        placeholder="Placeholder Text"
                        value={row.placeholder}
                        onChange={e => updateRow(row.id, { placeholder: e.target.value })}
                      />
                    )}
                  </td>
                  <td className="ad-td-check">
                    <input
                      type="checkbox"
                      className="ad-checkbox"
                      checked={row.required}
                      onChange={e => updateRow(row.id, { required: e.target.checked })}
                    />
                  </td>
                  <td className="ad-td-options">
                    {AD_TYPES_WITH_OPTIONS.includes(row.fieldType) && (
                      <div className="ad-options-cell">
                        <button className="ad-add-option-btn" onClick={() => addOption(row.id)}>
                          Add Option
                        </button>
                        {row.options.map((opt, oi) => (
                          <div key={oi} className="ad-option-row">
                            <input
                              className="ad-option-input"
                              placeholder="Option text"
                              value={opt}
                              onChange={e => updateOption(row.id, oi, e.target.value)}
                            />
                            <button className="ad-option-del" onClick={() => deleteOption(row.id, oi)}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="ad-td-check">
                    <input
                      type="checkbox"
                      className="ad-checkbox"
                      checked={row.showInEnquiry}
                      onChange={e => updateRow(row.id, { showInEnquiry: e.target.checked })}
                    />
                  </td>
                  <td className="ad-td-check">
                    <input
                      type="checkbox"
                      className="ad-checkbox"
                      checked={row.showInMember}
                      onChange={e => updateRow(row.id, { showInMember: e.target.checked })}
                    />
                  </td>
                  <td className="ad-td-move">
                    <button className="ad-move-btn" onClick={() => moveRow(row.id, 'up')}   disabled={idx === 0}>▲</button>
                    <button className="ad-move-btn" onClick={() => moveRow(row.id, 'down')} disabled={idx === rows.length - 1}>▼</button>
                  </td>
                  <td className="ad-td-del">
                    <button className="ad-del-btn" onClick={() => deleteRow(row.id)} title="Delete field">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="fc-footer">
            <div>
              <button className="fc-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
              {saved && <div className="fc-notice">Settings saved successfully.</div>}
            </div>
          </div>
        </div>

        <div className="ad-sidebar">
          {(['TextBox', 'MultiLine', 'DropDown', 'RadioButton', 'MultipleSelection'] as AdditionalDetailFieldType[]).map(type => (
            <button key={type} className="ad-type-btn" onClick={() => addField(type)}>
              {AD_FIELD_LABELS[type]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function buildDefaultFields(schema: ReturnType<typeof getFormSections>): FormFieldConfig[] {
  return schema.flatMap(s => s.fields.map(f => ({
    key: f.key,
    isEnabled: f.defaultEnabled ?? true,
    isMandatory: f.defaultMandatory ?? false,
    hasPlugin: f.defaultPlugin ?? false,
  })));
}

function mergeWithDefaults(schema: ReturnType<typeof getFormSections>, saved: FormFieldConfig[]): FormFieldConfig[] {
  const map = new Map(saved.map(f => [f.key, f]));
  return schema.flatMap(s => s.fields.map(f => map.get(f.key) ?? {
    key: f.key,
    isEnabled: f.defaultEnabled ?? true,
    isMandatory: f.defaultMandatory ?? false,
    hasPlugin: f.defaultPlugin ?? false,
  }));
}

function FieldToggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button className={`fc-toggle ${on ? 'fc-toggle-on' : 'fc-toggle-off'}`} onClick={onClick}>
      <span className="fc-toggle-knob" />
      <span>{on ? 'Yes' : 'OFF'}</span>
    </button>
  );
}

function FormCustomizationContent({ subscriptionId, gymId }: { subscriptionId: string; gymId: string }) {
  const [activeTab, setActiveTab] = useState('Enquiry Form');
  const [fields, setFields] = useState<FormFieldConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const formType = FORM_TYPE_KEY[activeTab];
  const schema = getFormSections(formType);

  useEffect(() => {
    setLoading(true);
    setSaved(false);
    const ft = FORM_TYPE_KEY[activeTab];
    const sc = getFormSections(ft);
    formCustomizationApi.get(subscriptionId, gymId, ft)
      .then(dto => {
        try {
          const parsed: FormFieldConfig[] = JSON.parse(dto.fieldsJson);
          if (sc.length > 0) {
            setFields(mergeWithDefaults(sc, parsed));
          } else {
            setFields(parsed.length > 0 ? parsed : []);
          }
        } catch {
          setFields(sc.length > 0 ? buildDefaultFields(sc) : []);
        }
      })
      .catch(() => setFields(sc.length > 0 ? buildDefaultFields(sc) : []))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId, gymId, activeTab]);

  function toggle(key: string, prop: 'isEnabled' | 'isMandatory' | 'hasPlugin') {
    setFields(prev => prev.map(f => {
      if (f.key !== key) return f;
      const next = { ...f, [prop]: !f[prop] };
      // disabling a field clears mandatory and plugin
      if (prop === 'isEnabled' && !next.isEnabled) {
        next.isMandatory = false;
        next.hasPlugin = false;
      }
      return next;
    }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await formCustomizationApi.upsert(subscriptionId, gymId, formType, fields);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const fieldMap = new Map(fields.map(f => [f.key, f]));

  return (
    <div className="fc-wrap">
      <div className="fc-tabs">
        {FORM_TABS.map(tab => (
          <button
            key={tab}
            className={`fc-tab ${activeTab === tab ? 'fc-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : activeTab === 'Additional Details' ? (
        <AdditionalDetailsGrid subscriptionId={subscriptionId} gymId={gymId} />
      ) : activeTab === 'Fitness Profile' ? (
        <FitnessProfileContent subscriptionId={subscriptionId} gymId={gymId} />
      ) : activeTab === 'Apparel and Shoes' ? (
        <ApparelContent subscriptionId={subscriptionId} gymId={gymId} />
      ) : schema.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
          Configuration for <strong>{activeTab}</strong> is coming soon.
        </div>
      ) : (
        <>
          <div className="fc-body">
            {schema.map(section => (
              <div key={section.title} className="fc-section">
                <div className="fc-section-title">{section.title}</div>
                {section.fields.map(meta => {
                  const cfg = fieldMap.get(meta.key) ?? { key: meta.key, isEnabled: false, isMandatory: false, hasPlugin: false };
                  return (
                    <div key={meta.key} className="fc-row">
                      <span className="fc-label">{meta.label}</span>
                      <div className="fc-controls">
                        <FieldToggle on={cfg.isEnabled} onClick={() => toggle(meta.key, 'isEnabled')} />
                        {meta.showMandatory && cfg.isEnabled && (
                          <div className="fc-control-group">
                            <span className="fc-control-label">Mandatory</span>
                            <FieldToggle on={cfg.isMandatory} onClick={() => toggle(meta.key, 'isMandatory')} />
                          </div>
                        )}
                        {meta.showPlugin && cfg.isEnabled && (
                          <div className="fc-control-group">
                            <span className="fc-control-label">Plugin</span>
                            <FieldToggle on={cfg.hasPlugin} onClick={() => toggle(meta.key, 'hasPlugin')} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="fc-footer">
            <div>
              <button className="fc-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
              {saved && <div className="fc-notice">Settings saved successfully.</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Setup: Generic "Coming Soon" ─────────────────────────────────────────────

function ComingSoon({ item, section }: { item: string; section: string }) {
  return (
    <div className="setup-panel">
      <div className="db-breadcrumb">
        <span className="db-bc-link">Setup</span>
        <span className="db-bc-sep">/</span>
        <span className="db-bc-link">{section}</span>
        <span className="db-bc-sep">/</span>
        <span className="db-bc-active">{item}</span>
      </div>
      <h1 className="db-heading">{item}</h1>
      <div className="setup-panel-body">
        <div className="setup-coming-soon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="setup-cs-icon">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l2 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Coming soon</span>
        </div>
      </div>
    </div>
  );
}

// ─── Setup Root ───────────────────────────────────────────────────────────────

function SetupContent({
  activeSegment,
  subscriptionId,
  gymId,
}: {
  activeSegment: string | null;
  subscriptionId: string;
  gymId: string;
}) {
  if (!activeSegment) {
    return (
      <div className="setup-welcome">
        <h1 className="db-heading">Setup</h1>
        <p className="setup-welcome-desc">
          Select a category from the left panel to configure your gym management system.
        </p>
        <div className="setup-category-grid">
          {['General', 'Marketing', 'Client Management', 'Training', 'Staff Management', 'Inventory', 'Expense', 'Integrations'].map(cat => (
            <div key={cat} className="setup-cat-card">
              <span className="setup-cat-name">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const [section, item] = activeSegment.split('::');

  const breadcrumb = (
    <div className="db-breadcrumb">
      <span className="db-bc-link">Home</span>
      <span className="db-bc-sep">/</span>
      <span className="db-bc-link">Setup</span>
      <span className="db-bc-sep">/</span>
      <span className="db-bc-link">{section}</span>
      <span className="db-bc-sep">/</span>
      <span className="db-bc-active">{item}</span>
    </div>
  );

  if (item === 'Getting Started') {
    return <>{breadcrumb}<GettingStartedContent /></>;
  }
  if (item === 'Profile') {
    return <>{breadcrumb}<ProfileContent subscriptionId={subscriptionId} gymId={gymId} /></>;
  }
  if (item === 'Manage Services') {
    return <>{breadcrumb}<ManageServicesContent subscriptionId={subscriptionId} gymId={gymId} /></>;
  }
  if (item === 'Manage Packages') {
    return <>{breadcrumb}<ManagePackagesContent subscriptionId={subscriptionId} gymId={gymId} /></>;
  }
  if (item === 'Form Customization') {
    return <>{breadcrumb}<FormCustomizationContent subscriptionId={subscriptionId} gymId={gymId} /></>;
  }

  return <ComingSoon item={item} section={section} />;
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
  const [showMemberDialog, setShowMemberDialog] = useState(false);
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
    if (key === 'member')  setShowMemberDialog(true);
  }

  async function handleSaveMember(data: CreateMemberDto) {
    if (!tenantId || !gymId) return;
    await membersApi.create(tenantId, gymId, data);
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
          {activeNav === 'setup' ? (
            /* ── Setup ───────────────────────────────────────────────── */
            <SetupContent
              activeSegment={activeSegment}
              subscriptionId={tenantId ?? ''}
              gymId={gymId ?? ''}
            />
          ) : activeNav === 'staff' ? (
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

      {showDialog && tenantId && gymId && (
        <AddEnquiryDialog
          subscriptionId={tenantId}
          gymId={gymId}
          onClose={() => setShowDialog(false)}
          onSave={handleSave}
          staffNames={staffList.map(s => s.fullName)}
        />
      )}

      {showMemberDialog && tenantId && gymId && (
        <AddMemberDialog
          subscriptionId={tenantId}
          gymId={gymId}
          onClose={() => setShowMemberDialog(false)}
          onSave={handleSaveMember}
        />
      )}
    </div>
  );
}
