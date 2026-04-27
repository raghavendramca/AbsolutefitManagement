import { useState, useRef, useEffect } from 'react';
import type { CreateEnquiryRequest, TrialType, CallTag } from '../types';
import { formCustomizationApi, type FormFieldConfig } from '../api/formCustomization';
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
const CLASS_OPTIONS   = ['Morning Yoga', 'Zumba Fitness', 'CrossFit Basics', 'Evening Pilates', 'Strength Training'];
const SESSION_OPTIONS = ['PT Session – Morning', 'PT Session – Afternoon', 'PT Session – Evening'];
const INCOME_SLABS  = ['Below 2L', '2L–5L', '5L–10L', '10L–20L', 'Above 20L'];
const ENQUIRY_TYPES = ['Walk-in', 'Online', 'Referral', 'Event', 'Other'];
const CUSTOMER_TYPES = ['Individual', 'Corporate', 'Student', 'Senior'];

interface Props {
  subscriptionId: string;
  gymId: string;
  onClose: () => void;
  onSave: (data: CreateEnquiryRequest) => Promise<void>;
  staffNames?: string[];
}

const today = new Date().toISOString().split('T')[0];

// Returns a config map keyed by field key; missing keys default to disabled
function buildCfgMap(fields: FormFieldConfig[]): Map<string, FormFieldConfig> {
  return new Map(fields.map(f => [f.key, f]));
}

function fieldEnabled(map: Map<string, FormFieldConfig>, key: string): boolean {
  return map.get(key)?.isEnabled ?? false;
}

function fieldMandatory(map: Map<string, FormFieldConfig>, key: string): boolean {
  return (map.get(key)?.isEnabled && map.get(key)?.isMandatory) ?? false;
}

export default function AddEnquiryDialog({ subscriptionId, gymId, onClose, onSave, staffNames = [] }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  // Form customization config
  const [cfgMap, setCfgMap] = useState<Map<string, FormFieldConfig>>(new Map());

  useEffect(() => {
    formCustomizationApi.get(subscriptionId, gymId, 'EnquiryForm')
      .then(dto => {
        try {
          const parsed: FormFieldConfig[] = JSON.parse(dto.fieldsJson);
          setCfgMap(buildCfgMap(parsed));
        } catch { /* use defaults */ }
      })
      .catch(() => { /* use defaults */ });
  }, [subscriptionId, gymId]);

  // ── Fixed fields (always shown) ─────────────────────────────────────────────
  const [fullName,       setFullName]       = useState('');
  const [countryCode,    setCountryCode]    = useState('+91');
  const [contactNumber,  setContactNumber]  = useState('');
  const [enquiryDate,    setEnquiryDate]    = useState(today);
  const [serviceName,    setServiceName]    = useState('');

  // ── Configurable personal detail fields ─────────────────────────────────────
  const [email,       setEmail]       = useState('');
  const [gender,      setGender]      = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address,     setAddress]     = useState('');
  const [locality,    setLocality]    = useState('');
  const [city,        setCity]        = useState('');
  const [nationalId,  setNationalId]  = useState('');
  const [goal,        setGoal]        = useState('');
  const [profession,  setProfession]  = useState('');
  const [incomeSlab,  setIncomeSlab]  = useState('');

  // ── Configurable lead info fields ────────────────────────────────────────────
  const [customerType, setCustomerType] = useState('');
  const [leadSource,   setLeadSource]   = useState('');
  const [enquiryType,  setEnquiryType]  = useState('');
  const [company,      setCompany]      = useState('');
  const [campaign,     setCampaign]     = useState('');
  const [subCampaign,  setSubCampaign]  = useState('');
  const [utmSource,    setUtmSource]    = useState('');
  const [medium,       setMedium]       = useState('');
  const [campaignTerm, setCampaignTerm] = useState('');
  const [publisher,    setPublisher]    = useState('');

  // ── Trial type ──────────────────────────────────────────────────────────────
  const [trialType,        setTrialType]        = useState<TrialType>('NoTrial');
  const [trialDateTime,    setTrialDateTime]    = useState('');
  const [trialService,     setTrialService]     = useState('');
  const [trialStaffName,   setTrialStaffName]   = useState('');
  const [trialClassDate,   setTrialClassDate]   = useState('');
  const [trialClass,       setTrialClass]       = useState('');
  const [trialSessionDate, setTrialSessionDate] = useState('');
  const [trialSession,     setTrialSession]     = useState('');

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
    if (!fullName.trim())     { setError('Full name is required.');        return; }
    if (!contactNumber.trim()){ setError('Contact number is required.');   return; }
    if (!enquiryDate)         { setError('Enquiry date is required.');     return; }
    if (!serviceName)         { setError('Service name is required.');     return; }

    // Dynamic mandatory field validation
    const mandatoryChecks: [string, string, string][] = [
      ['email',        email,        'Email'],
      ['gender',       gender,       'Gender'],
      ['dateOfBirth',  dateOfBirth,  'Date of Birth'],
      ['address',      address,      'Address'],
      ['locality',     locality,     'Locality'],
      ['city',         city,         'City'],
      ['nationalId',   nationalId,   'National ID'],
      ['goal',         goal,         'Goal'],
      ['profession',   profession,   'Profession'],
      ['incomeSlab',   incomeSlab,   'Income Slab'],
      ['customerType', customerType, 'Customer type'],
      ['leadSource',   leadSource,   'Lead source'],
      ['enquiryType',  enquiryType,  'Enquiry Type'],
      ['company',      company,      'Company'],
      ['campaign',     campaign,     'Campaign'],
    ];
    for (const [key, val, label] of mandatoryChecks) {
      if (fieldMandatory(cfgMap, key) && !val.trim()) {
        setError(`${label} is required.`);
        return;
      }
    }

    if (fieldEnabled(cfgMap, 'scheduleTrial')) {
      if (trialType === 'TrialAppointment') {
        if (!trialDateTime)  { setError('Date & Time is required for Trial Appointment.'); return; }
        if (!trialService)   { setError('Service is required for Trial Appointment.');    return; }
        if (!trialStaffName) { setError('Staff name is required for Trial Appointment.'); return; }
      }
      if (trialType === 'TrialClass') {
        if (!trialClassDate) { setError('Date is required for Trial Class.'); return; }
        if (!trialClass)     { setError('Class is required for Trial Class.'); return; }
      }
      if (trialType === 'TrialSession') {
        if (!trialSessionDate) { setError('Date is required for Trial Session.');    return; }
        if (!trialSession)     { setError('Session is required for Trial Session.'); return; }
      }
    }

    // Build trial fields
    let trialScheduledAt: string | undefined;
    let trialServiceVal: string | undefined;
    let trialStaffNameVal: string | undefined;
    let trialClassVal: string | undefined;
    let trialSessionVal: string | undefined;

    if (fieldEnabled(cfgMap, 'scheduleTrial') && trialType !== 'NoTrial') {
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
    }

    // Build extended fields JSON for configurable optional data
    const extended: Record<string, string> = {};
    if (fieldEnabled(cfgMap, 'dateOfBirth')  && dateOfBirth)  extended.dateOfBirth  = dateOfBirth;
    if (fieldEnabled(cfgMap, 'address')      && address)      extended.address      = address;
    if (fieldEnabled(cfgMap, 'locality')     && locality)     extended.locality     = locality;
    if (fieldEnabled(cfgMap, 'city')         && city)         extended.city         = city;
    if (fieldEnabled(cfgMap, 'nationalId')   && nationalId)   extended.nationalId   = nationalId;
    if (fieldEnabled(cfgMap, 'goal')         && goal)         extended.goal         = goal;
    if (fieldEnabled(cfgMap, 'profession')   && profession)   extended.profession   = profession;
    if (fieldEnabled(cfgMap, 'incomeSlab')   && incomeSlab)   extended.incomeSlab   = incomeSlab;
    if (fieldEnabled(cfgMap, 'customerType') && customerType) extended.customerType = customerType;
    if (fieldEnabled(cfgMap, 'enquiryType')  && enquiryType)  extended.enquiryType  = enquiryType;
    if (fieldEnabled(cfgMap, 'company')      && company)      extended.company      = company;
    if (fieldEnabled(cfgMap, 'campaign')     && campaign)     extended.campaign     = campaign;
    if (fieldEnabled(cfgMap, 'subCampaign')  && subCampaign)  extended.subCampaign  = subCampaign;
    if (fieldEnabled(cfgMap, 'utmSource')    && utmSource)    extended.utmSource    = utmSource;
    if (fieldEnabled(cfgMap, 'medium')       && medium)       extended.medium       = medium;
    if (fieldEnabled(cfgMap, 'campaignTerm') && campaignTerm) extended.campaignTerm = campaignTerm;
    if (fieldEnabled(cfgMap, 'publisher')    && publisher)    extended.publisher    = publisher;

    setError('');
    setSaving(true);
    try {
      await onSave({
        fullName: fullName.trim(),
        countryCode,
        contactNumber: contactNumber.trim(),
        email:    fieldEnabled(cfgMap, 'email')    ? email.trim()    || undefined : undefined,
        gender:   fieldEnabled(cfgMap, 'gender')   ? gender          || undefined : undefined,
        trialType: fieldEnabled(cfgMap, 'scheduleTrial') ? trialType : 'NoTrial',
        enquiryDate,
        serviceName,
        leadSource:       fieldEnabled(cfgMap, 'leadSource')     ? leadSource       || undefined : undefined,
        followUpStaffName: fieldEnabled(cfgMap, 'scheduleFollowUp') ? followUpStaff   || undefined : undefined,
        followUpDateTime:  fieldEnabled(cfgMap, 'scheduleFollowUp') ? followUpDateTime || undefined : undefined,
        callTag:  fieldEnabled(cfgMap, 'scheduleFollowUp') ? (callTag as CallTag) || undefined : undefined,
        message:  fieldEnabled(cfgMap, 'scheduleFollowUp') ? message.trim() || undefined : undefined,
        trialScheduledAt,
        trialService:   trialServiceVal,
        trialStaffName: trialStaffNameVal,
        trialClass:     trialClassVal,
        trialSession:   trialSessionVal,
        extendedFieldsJson: Object.keys(extended).length > 0 ? JSON.stringify(extended) : undefined,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save enquiry.');
    } finally {
      setSaving(false);
    }
  }

  // ── Required asterisk helper ─────────────────────────────────────────────────
  function Req({ fieldKey }: { fieldKey: string }) {
    return fieldMandatory(cfgMap, fieldKey)
      ? <span className="aeq-req"> *</span>
      : null;
  }

  // ── Conditional trial scheduling fields ─────────────────────────────────────
  function TrialSchedulingFields() {
    if (trialType === 'TrialAppointment') {
      return (
        <>
          <div className="aeq-field">
            <label>Date &amp; Time <span className="aeq-req">*</span></label>
            <input type="datetime-local" value={trialDateTime} onChange={e => setTrialDateTime(e.target.value)} />
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
            <input type="date" value={trialClassDate} onChange={e => setTrialClassDate(e.target.value)} />
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
            <input type="date" value={trialSessionDate} onChange={e => setTrialSessionDate(e.target.value)} />
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

              {/* Always shown */}
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
                  {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              <div className="aeq-field">
                <label>Contact Number <span className="aeq-req">*</span></label>
                <input type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
              </div>

              {/* Configurable */}
              {fieldEnabled(cfgMap, 'email') && (
                <div className="aeq-field">
                  <label>Email<Req fieldKey="email" /></label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'gender') && (
                <div className="aeq-field">
                  <label>Gender<Req fieldKey="gender" /></label>
                  <div className="aeq-radio-group">
                    {['Male', 'Female'].map(g => (
                      <label key={g} className="aeq-radio-label">
                        <input type="radio" name="gender" value={g} checked={gender === g} onChange={() => setGender(g)} />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {fieldEnabled(cfgMap, 'dateOfBirth') && (
                <div className="aeq-field">
                  <label>Date of Birth<Req fieldKey="dateOfBirth" /></label>
                  <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'address') && (
                <div className="aeq-field">
                  <label>Address<Req fieldKey="address" /></label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'locality') && (
                <div className="aeq-field">
                  <label>Locality<Req fieldKey="locality" /></label>
                  <input type="text" value={locality} onChange={e => setLocality(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'city') && (
                <div className="aeq-field">
                  <label>City<Req fieldKey="city" /></label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'nationalId') && (
                <div className="aeq-field">
                  <label>National ID<Req fieldKey="nationalId" /></label>
                  <input type="text" value={nationalId} onChange={e => setNationalId(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'goal') && (
                <div className="aeq-field">
                  <label>Goal<Req fieldKey="goal" /></label>
                  <input type="text" value={goal} onChange={e => setGoal(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'profession') && (
                <div className="aeq-field">
                  <label>Profession<Req fieldKey="profession" /></label>
                  <input type="text" value={profession} onChange={e => setProfession(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'incomeSlab') && (
                <div className="aeq-field">
                  <label>Income Slab<Req fieldKey="incomeSlab" /></label>
                  <select value={incomeSlab} onChange={e => setIncomeSlab(e.target.value)}>
                    <option value="">Select</option>
                    {INCOME_SLABS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {/* Schedule a trial / meeting */}
              {fieldEnabled(cfgMap, 'scheduleTrial') && (
                <>
                  <p className="aeq-section-title aeq-section-gap">Schedule a trial / meeting</p>
                  <div className="aeq-trial-group">
                    {([
                      ['NoTrial',          'No Trial'],
                      ['TrialAppointment', 'Trial Appointment'],
                      ['TrialClass',       'Trial Class'],
                      ['TrialSession',     'Trial Session'],
                    ] as [TrialType, string][]).map(([val, label]) => (
                      <label key={val} className="aeq-radio-label">
                        <input type="radio" name="trialType" value={val} checked={trialType === val} onChange={() => setTrialType(val)} />
                        {label}
                      </label>
                    ))}
                  </div>
                  {trialType !== 'NoTrial' && (
                    <div className="aeq-trial-fields">
                      <TrialSchedulingFields />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Right column ──────────────────────────── */}
            <div className="aeq-col">
              <p className="aeq-section-title">Lead Information</p>

              {/* Always shown */}
              <div className="aeq-field">
                <label>Enquiry Date <span className="aeq-req">*</span></label>
                <input type="date" value={enquiryDate} onChange={e => setEnquiryDate(e.target.value)} />
              </div>

              <div className="aeq-field">
                <label>Service Name <span className="aeq-req">*</span></label>
                <select value={serviceName} onChange={e => setServiceName(e.target.value)}>
                  <option value="">Select</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Configurable */}
              {fieldEnabled(cfgMap, 'customerType') && (
                <div className="aeq-field">
                  <label>Customer type<Req fieldKey="customerType" /></label>
                  <select value={customerType} onChange={e => setCustomerType(e.target.value)}>
                    <option value="">Select</option>
                    {CUSTOMER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              )}

              {fieldEnabled(cfgMap, 'leadSource') && (
                <div className="aeq-field">
                  <label>Lead source<Req fieldKey="leadSource" /></label>
                  <select value={leadSource} onChange={e => setLeadSource(e.target.value)}>
                    <option value="">Select</option>
                    {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {fieldEnabled(cfgMap, 'enquiryType') && (
                <div className="aeq-field">
                  <label>Enquiry Type<Req fieldKey="enquiryType" /></label>
                  <select value={enquiryType} onChange={e => setEnquiryType(e.target.value)}>
                    <option value="">Select</option>
                    {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              )}

              {fieldEnabled(cfgMap, 'company') && (
                <div className="aeq-field">
                  <label>Company<Req fieldKey="company" /></label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'campaign') && (
                <div className="aeq-field">
                  <label>Campaign<Req fieldKey="campaign" /></label>
                  <input type="text" value={campaign} onChange={e => setCampaign(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'subCampaign') && (
                <div className="aeq-field">
                  <label>Sub Campaign</label>
                  <input type="text" value={subCampaign} onChange={e => setSubCampaign(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'utmSource') && (
                <div className="aeq-field">
                  <label>UTM Source</label>
                  <input type="text" value={utmSource} onChange={e => setUtmSource(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'medium') && (
                <div className="aeq-field">
                  <label>Medium</label>
                  <input type="text" value={medium} onChange={e => setMedium(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'campaignTerm') && (
                <div className="aeq-field">
                  <label>Campaign Term</label>
                  <input type="text" value={campaignTerm} onChange={e => setCampaignTerm(e.target.value)} />
                </div>
              )}

              {fieldEnabled(cfgMap, 'publisher') && (
                <div className="aeq-field">
                  <label>Publisher</label>
                  <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)} />
                </div>
              )}

              {/* Schedule enquiry follow-up */}
              {fieldEnabled(cfgMap, 'scheduleFollowUp') && (
                <>
                  <p className="aeq-section-title aeq-section-gap">Schedule enquiry follow-up</p>

                  <div className="aeq-field">
                    <label>Staff Name{fieldMandatory(cfgMap, 'scheduleFollowUp') ? <span className="aeq-req"> *</span> : null}</label>
                    <select value={followUpStaff} onChange={e => setFollowUpStaff(e.target.value)}>
                      <option value="">Select</option>
                      {staffNames.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="aeq-field">
                    <label>Date &amp; Time</label>
                    <input type="datetime-local" value={followUpDateTime} onChange={e => setFollowUpDateTime(e.target.value)} />
                  </div>

                  <div className="aeq-field">
                    <label>Call Tag</label>
                    <div className="aeq-calltag-group">
                      {(['Cold', 'Warm', 'Hot'] as CallTag[]).map(tag => (
                        <label
                          key={tag}
                          className={`aeq-calltag-label aeq-calltag-${tag.toLowerCase()} ${callTag === tag ? 'selected' : ''}`}
                        >
                          <input type="radio" name="callTag" value={tag} checked={callTag === tag} onChange={() => setCallTag(tag)} />
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
                </>
              )}
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
