import { useState, useRef, useEffect } from 'react';
import type { CreateEnquiryRequest, TrialType, CallTag } from '../types';
import './AddEnquiryDialog.css';

const COUNTRY_CODES = [
  { label: 'India (+91)', value: '+91' },
  { label: 'USA (+1)',    value: '+1'  },
  { label: 'UK (+44)',    value: '+44' },
  { label: 'UAE (+971)',  value: '+971'},
  { label: 'Australia (+61)', value: '+61' },
];

const SERVICES      = ['Weight Loss', 'Weight Gain', 'Yoga', 'Zumba', 'CrossFit', 'Personal Training', 'Other'];
const LEAD_SOURCES  = ['Walk-in', 'Phone Call', 'Instagram', 'Facebook', 'Google', 'Referral', 'Other'];
// Placeholder options — replace with API-fetched lists when Training module is built
const CLASS_OPTIONS   = ['Morning Yoga', 'Zumba Fitness', 'CrossFit Basics', 'Evening Pilates', 'Strength Training'];
const SESSION_OPTIONS = ['PT Session – Morning', 'PT Session – Afternoon', 'PT Session – Evening'];

interface Props {
  onClose: () => void;
  onSave: (data: CreateEnquiryRequest) => Promise<void>;
  staffNames?: string[];
}

const today = new Date().toISOString().split('T')[0];

export default function AddEnquiryDialog({ onClose, onSave, staffNames = [] }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  // ── Personal details ────────────────────────────────────────────────────────
  const [fullName,       setFullName]       = useState('');
  const [countryCode,    setCountryCode]    = useState('+91');
  const [contactNumber,  setContactNumber]  = useState('');
  const [email,          setEmail]          = useState('');
  const [gender,         setGender]         = useState('');

  // ── Trial type ──────────────────────────────────────────────────────────────
  const [trialType, setTrialType] = useState<TrialType>('NoTrial');

  // ── Trial Appointment fields ────────────────────────────────────────────────
  const [trialDateTime,  setTrialDateTime]  = useState('');
  const [trialService,   setTrialService]   = useState('');
  const [trialStaffName, setTrialStaffName] = useState('');

  // ── Trial Class fields ──────────────────────────────────────────────────────
  const [trialClassDate, setTrialClassDate] = useState('');
  const [trialClass,     setTrialClass]     = useState('');

  // ── Trial Session fields ────────────────────────────────────────────────────
  const [trialSessionDate, setTrialSessionDate] = useState('');
  const [trialSession,     setTrialSession]     = useState('');

  // ── Lead info ───────────────────────────────────────────────────────────────
  const [enquiryDate,  setEnquiryDate]  = useState(today);
  const [serviceName,  setServiceName]  = useState('');
  const [leadSource,   setLeadSource]   = useState('');

  // ── Follow-up scheduling ────────────────────────────────────────────────────
  const [followUpStaff,    setFollowUpStaff]    = useState('');
  const [followUpDateTime, setFollowUpDateTime] = useState('');
  const [callTag,          setCallTag]          = useState<CallTag | ''>('');
  const [message,          setMessage]          = useState('');

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  // ── Validation & submit ─────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim())    { setError('Full name is required.');    return; }
    if (!contactNumber.trim()){ setError('Contact number is required.'); return; }
    if (!enquiryDate)         { setError('Enquiry date is required.'); return; }
    if (!serviceName)         { setError('Service name is required.'); return; }

    if (trialType === 'TrialAppointment') {
      if (!trialDateTime)  { setError('Date & Time is required for Trial Appointment.'); return; }
      if (!trialService)   { setError('Service is required for Trial Appointment.');    return; }
      if (!trialStaffName) { setError('Staff name is required for Trial Appointment.'); return; }
    }
    if (trialType === 'TrialClass') {
      if (!trialClassDate) { setError('Date is required for Trial Class.');  return; }
      if (!trialClass)     { setError('Class is required for Trial Class.'); return; }
    }
    if (trialType === 'TrialSession') {
      if (!trialSessionDate) { setError('Date is required for Trial Session.');    return; }
      if (!trialSession)     { setError('Session is required for Trial Session.'); return; }
    }

    // Build trial scheduling fields based on the selected type
    let trialScheduledAt: string | undefined;
    let trialServiceVal: string | undefined;
    let trialStaffNameVal: string | undefined;
    let trialClassVal: string | undefined;
    let trialSessionVal: string | undefined;

    if (trialType === 'TrialAppointment') {
      trialScheduledAt  = trialDateTime;
      trialServiceVal   = trialService;
      trialStaffNameVal = trialStaffName;
    } else if (trialType === 'TrialClass') {
      trialScheduledAt = trialClassDate;
      trialClassVal    = trialClass;
    } else if (trialType === 'TrialSession') {
      trialScheduledAt = trialSessionDate;
      trialSessionVal  = trialSession;
    }

    setError('');
    setSaving(true);
    try {
      await onSave({
        fullName: fullName.trim(),
        countryCode,
        contactNumber: contactNumber.trim(),
        email:    email.trim()    || undefined,
        gender:   gender          || undefined,
        trialType,
        enquiryDate,
        serviceName,
        leadSource:       leadSource       || undefined,
        followUpStaffName: followUpStaff   || undefined,
        followUpDateTime:  followUpDateTime || undefined,
        callTag:  (callTag as CallTag)     || undefined,
        message:  message.trim()           || undefined,
        trialScheduledAt,
        trialService:   trialServiceVal,
        trialStaffName: trialStaffNameVal,
        trialClass:     trialClassVal,
        trialSession:   trialSessionVal,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save enquiry.');
    } finally {
      setSaving(false);
    }
  }

  // ── Conditional trial scheduling section ────────────────────────────────────
  function TrialSchedulingFields() {
    if (trialType === 'TrialAppointment') {
      return (
        <>
          <div className="aeq-field">
            <label>Date &amp; Time <span className="aeq-req">*</span></label>
            <input
              type="datetime-local"
              value={trialDateTime}
              onChange={e => setTrialDateTime(e.target.value)}
            />
          </div>
          <div className="aeq-field">
            <label>Service <span className="aeq-req">*</span></label>
            <select value={trialService} onChange={e => setTrialService(e.target.value)}>
              <option value="">Select</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="aeq-field">
            <label>Staff Name <span className="aeq-req">*</span></label>
            <select value={trialStaffName} onChange={e => setTrialStaffName(e.target.value)}>
              <option value="">Select</option>
              {staffNames.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </>
      );
    }

    if (trialType === 'TrialClass') {
      return (
        <>
          <div className="aeq-field">
            <label>Date <span className="aeq-req">*</span></label>
            <input
              type="date"
              value={trialClassDate}
              onChange={e => setTrialClassDate(e.target.value)}
            />
          </div>
          <div className="aeq-field">
            <label>Class <span className="aeq-req">*</span></label>
            <select value={trialClass} onChange={e => setTrialClass(e.target.value)}>
              <option value="">Select Class</option>
              {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </>
      );
    }

    if (trialType === 'TrialSession') {
      return (
        <>
          <div className="aeq-field">
            <label>Date <span className="aeq-req">*</span></label>
            <input
              type="date"
              value={trialSessionDate}
              onChange={e => setTrialSessionDate(e.target.value)}
            />
          </div>
          <div className="aeq-field">
            <label>Session <span className="aeq-req">*</span></label>
            <select value={trialSession} onChange={e => setTrialSession(e.target.value)}>
              <option value="">Select Session</option>
              {SESSION_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </>
      );
    }

    return null;
  }

  return (
    <div className="aeq-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="aeq-dialog" role="dialog" aria-modal="true" aria-label="Add Enquiry">
        <div className="aeq-header">
          <h2 className="aeq-title">Add Enquiry</h2>
          <button className="aeq-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>

        <div className="aeq-tabs">
          <span className="aeq-tab active">Personal Information</span>
        </div>

        <form className="aeq-body" onSubmit={handleSubmit}>
          <div className="aeq-columns">
            {/* ── Left column ───────────────────────────── */}
            <div className="aeq-col">
              <p className="aeq-section-title">Personal Details</p>

              <div className="aeq-field">
                <label>Full name <span className="aeq-req">*</span></label>
                <input
                  type="text"
                  placeholder="First Name and Last Name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>

              <div className="aeq-field">
                <label>Country Code</label>
                <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                  {COUNTRY_CODES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="aeq-field">
                <label>Contact Number <span className="aeq-req">*</span></label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                />
              </div>

              <div className="aeq-field">
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="aeq-field">
                <label>Gender</label>
                <div className="aeq-radio-group">
                  {['Male', 'Female'].map(g => (
                    <label key={g} className="aeq-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={() => setGender(g)}
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Trial type selector ─────────────────── */}
              <p className="aeq-section-title aeq-section-gap">Schedule a trial / meeting</p>
              <div className="aeq-trial-group">
                {([
                  ['NoTrial',          'No Trial'],
                  ['TrialAppointment', 'Trial Appointment'],
                  ['TrialClass',       'Trial Class'],
                  ['TrialSession',     'Trial Session'],
                ] as [TrialType, string][]).map(([val, label]) => (
                  <label key={val} className="aeq-radio-label">
                    <input
                      type="radio"
                      name="trialType"
                      value={val}
                      checked={trialType === val}
                      onChange={() => setTrialType(val)}
                    />
                    {label}
                  </label>
                ))}
              </div>

              {/* ── Conditional trial scheduling fields ─── */}
              {trialType !== 'NoTrial' && (
                <div className="aeq-trial-fields">
                  <TrialSchedulingFields />
                </div>
              )}
            </div>

            {/* ── Right column ──────────────────────────── */}
            <div className="aeq-col">
              <p className="aeq-section-title">Lead Information</p>

              <div className="aeq-field">
                <label>Enquiry Date <span className="aeq-req">*</span></label>
                <input
                  type="date"
                  value={enquiryDate}
                  onChange={e => setEnquiryDate(e.target.value)}
                />
              </div>

              <div className="aeq-field">
                <label>Service Name <span className="aeq-req">*</span></label>
                <select value={serviceName} onChange={e => setServiceName(e.target.value)}>
                  <option value="">Select</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="aeq-field">
                <label>Lead source</label>
                <select value={leadSource} onChange={e => setLeadSource(e.target.value)}>
                  <option value="">Select</option>
                  {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <p className="aeq-section-title aeq-section-gap">Schedule enquiry follow-up</p>

              <div className="aeq-field">
                <label>Staff Name</label>
                <select value={followUpStaff} onChange={e => setFollowUpStaff(e.target.value)}>
                  <option value="">Select</option>
                  {staffNames.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="aeq-field">
                <label>Date &amp; Time</label>
                <input
                  type="datetime-local"
                  value={followUpDateTime}
                  onChange={e => setFollowUpDateTime(e.target.value)}
                />
              </div>

              <div className="aeq-field">
                <label>Call Tag</label>
                <div className="aeq-calltag-group">
                  {(['Cold', 'Warm', 'Hot'] as CallTag[]).map(tag => (
                    <label
                      key={tag}
                      className={`aeq-calltag-label aeq-calltag-${tag.toLowerCase()} ${callTag === tag ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="callTag"
                        value={tag}
                        checked={callTag === tag}
                        onChange={() => setCallTag(tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

              <div className="aeq-field">
                <label>Message</label>
                <textarea
                  placeholder="Maximum 250 characters"
                  maxLength={250}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {error && <p className="aeq-error">{error}</p>}

          <div className="aeq-footer">
            <button type="submit" className="aeq-save-btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
