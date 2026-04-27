import { useState, useRef, useEffect } from 'react';
import { formCustomizationApi, type FormFieldConfig } from '../api/formCustomization';
import type { CreateMemberDto } from '../api/members';
import './AddMemberDialog.css';

const COUNTRY_CODES = [
  { label: 'India (+91)', value: '+91' },
  { label: 'USA (+1)',    value: '+1'  },
  { label: 'UK (+44)',    value: '+44' },
  { label: 'UAE (+971)',  value: '+971'},
  { label: 'Australia (+61)', value: '+61' },
];

const GENDERS       = ['Male', 'Female', 'Other'];
const BLOOD_GROUPS  = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const LEAD_SOURCES  = ['Walk-in', 'Phone Call', 'Instagram', 'Facebook', 'Google', 'Referral', 'Other'];
const CUSTOMER_TYPES = ['Individual', 'Corporate', 'Student', 'Senior'];
const FITNESS_GOALS = ['Weight Loss', 'Weight Gain', 'Muscle Building', 'Endurance', 'Flexibility', 'General Fitness'];
const ACTIVITY_LEVELS = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'];
const EXPERTISE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const TSHIRT_SIZES  = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface Props {
  subscriptionId: string;
  gymId: string;
  enquiryId?: string;
  prefill?: Partial<CreateMemberDto>;
  onClose: () => void;
  onSave: (data: CreateMemberDto) => Promise<void>;
}

function buildCfgMap(fields: FormFieldConfig[]): Map<string, FormFieldConfig> {
  return new Map(fields.map(f => [f.key, f]));
}

function fieldEnabled(map: Map<string, FormFieldConfig>, key: string): boolean {
  return map.get(key)?.isEnabled ?? false;
}

function fieldMandatory(map: Map<string, FormFieldConfig>, key: string): boolean {
  return (map.get(key)?.isEnabled && map.get(key)?.isMandatory) ?? false;
}

type Tab = 'Personal Information' | 'Fitness Profile';

export default function AddMemberDialog({ subscriptionId, gymId, enquiryId, prefill, onClose, onSave }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('Personal Information');

  const [cfgMap, setCfgMap] = useState<Map<string, FormFieldConfig>>(new Map());

  useEffect(() => {
    formCustomizationApi.get(subscriptionId, gymId, 'MemberForm')
      .then(dto => {
        try {
          const parsed: FormFieldConfig[] = JSON.parse(dto.fieldsJson);
          setCfgMap(buildCfgMap(parsed));
        } catch { /* use defaults */ }
      })
      .catch(() => { /* use defaults */ });
  }, [subscriptionId, gymId]);

  // ── Fixed fields ─────────────────────────────────────────────────────────────
  const [fullName,      setFullName]      = useState(prefill?.fullName ?? '');
  const [countryCode,   setCountryCode]   = useState(prefill?.countryCode ?? '+91');
  const [contactNumber, setContactNumber] = useState(prefill?.contactNumber ?? '');

  // ── Configurable personal detail fields ──────────────────────────────────────
  const [email,         setEmail]         = useState(prefill?.email ?? '');
  const [gender,        setGender]        = useState(prefill?.gender ?? '');
  const [dateOfBirth,   setDateOfBirth]   = useState('');
  const [anniversary,   setAnniversary]   = useState('');
  const [address,       setAddress]       = useState(prefill?.address ?? '');
  const [locality,      setLocality]      = useState(prefill?.locality ?? '');
  const [city,          setCity]          = useState('');
  const [bloodGroup,    setBloodGroup]    = useState('');
  const [whatsapp,      setWhatsapp]      = useState('');
  const [facebookId,    setFacebookId]    = useState('');
  const [instagramId,   setInstagramId]   = useState('');
  const [pincode,       setPincode]       = useState('');
  const [mothersName,   setMothersName]   = useState('');
  const [motherProf,    setMotherProf]    = useState('');
  const [fathersName,   setFathersName]   = useState('');
  const [fatherProf,    setFatherProf]    = useState('');
  const [vaccination,   setVaccination]   = useState('');

  // ── Emergency contact ─────────────────────────────────────────────────────────
  const [emergencyName,  setEmergencyName]  = useState(prefill?.emergencyContactName ?? '');
  const [emergencyPhone, setEmergencyPhone] = useState(prefill?.emergencyContactPhone ?? '');

  // ── IDs ────────────────────────────────────────────────────────────────────────
  const [nationalId, setNationalId] = useState('');
  const [lockerKey,  setLockerKey]  = useState('');
  const [pan,        setPan]        = useState('');

  // ── Lead info ─────────────────────────────────────────────────────────────────
  const [customerType, setCustomerType] = useState('');
  const [leadSource,   setLeadSource]   = useState(prefill?.leadSource ?? '');

  // ── Apparel ───────────────────────────────────────────────────────────────────
  const [tshirtSize, setTshirtSize] = useState('');
  const [shortsSize, setShortsSize] = useState('');
  const [shoesSize,  setShoesSize]  = useState('');

  // ── Secondary contact ─────────────────────────────────────────────────────────
  const [secContactName,   setSecContactName]   = useState('');
  const [secContactNumber, setSecContactNumber] = useState('');

  // ── Fitness profile ───────────────────────────────────────────────────────────
  const [injuries,      setInjuries]      = useState('');
  const [fitnessGoal,   setFitnessGoal]   = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [expertiseLevel,setExpertiseLevel]= useState('');
  const [division,      setDivision]      = useState('');
  const [certification, setCertification] = useState('');

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  function Req({ fieldKey }: { fieldKey: string }) {
    return fieldMandatory(cfgMap, fieldKey)
      ? <span className="amd-req"> *</span>
      : null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim())     { setError('Full name is required.');      return; }
    if (!contactNumber.trim()){ setError('Contact number is required.'); return; }

    const mandatoryChecks: [string, string, string][] = [
      ['mem_email',        email,        'Email'],
      ['mem_gender',       gender,       'Gender'],
      ['mem_dateOfBirth',  dateOfBirth,  'Date of Birth'],
      ['mem_address',      address,      'Address'],
      ['mem_locality',     locality,     'Locality'],
      ['mem_emergencyContact', emergencyName, 'Emergency Contact Name'],
      ['mem_leadSource',   leadSource,   'Lead Source'],
    ];
    for (const [key, val, label] of mandatoryChecks) {
      if (fieldMandatory(cfgMap, key) && !val.trim()) {
        setError(`${label} is required.`);
        return;
      }
    }

    // Collect all extended fields into a JSON blob
    const extended: Record<string, string> = {};
    if (fieldEnabled(cfgMap, 'mem_anniversary')   && anniversary)   extended.anniversary   = anniversary;
    if (fieldEnabled(cfgMap, 'mem_city')          && city)          extended.city          = city;
    if (fieldEnabled(cfgMap, 'mem_bloodGroup')    && bloodGroup)    extended.bloodGroup    = bloodGroup;
    if (fieldEnabled(cfgMap, 'mem_whatsappNumber')&& whatsapp)      extended.whatsapp      = whatsapp;
    if (fieldEnabled(cfgMap, 'mem_facebookId')    && facebookId)    extended.facebookId    = facebookId;
    if (fieldEnabled(cfgMap, 'mem_instagramId')   && instagramId)   extended.instagramId   = instagramId;
    if (fieldEnabled(cfgMap, 'mem_pincode')       && pincode)       extended.pincode       = pincode;
    if (fieldEnabled(cfgMap, 'mem_mothersName')   && mothersName)   extended.mothersName   = mothersName;
    if (fieldEnabled(cfgMap, 'mem_mothersProfession') && motherProf) extended.mothersProfession = motherProf;
    if (fieldEnabled(cfgMap, 'mem_fathersName')   && fathersName)   extended.fathersName   = fathersName;
    if (fieldEnabled(cfgMap, 'mem_fathersProfession') && fatherProf) extended.fathersProfession = fatherProf;
    if (fieldEnabled(cfgMap, 'mem_vaccination')   && vaccination)   extended.vaccination   = vaccination;
    if (fieldEnabled(cfgMap, 'mem_nationalId')    && nationalId)    extended.nationalId    = nationalId;
    if (fieldEnabled(cfgMap, 'mem_lockerKeyNo')   && lockerKey)     extended.lockerKeyNo   = lockerKey;
    if (fieldEnabled(cfgMap, 'mem_pan')           && pan)           extended.pan           = pan;
    if (fieldEnabled(cfgMap, 'mem_customerType')  && customerType)  extended.customerType  = customerType;
    if (fieldEnabled(cfgMap, 'mem_tshirtSize')    && tshirtSize)    extended.tshirtSize    = tshirtSize;
    if (fieldEnabled(cfgMap, 'mem_shortsSize')    && shortsSize)    extended.shortsSize    = shortsSize;
    if (fieldEnabled(cfgMap, 'mem_shoesSize')     && shoesSize)     extended.shoesSize     = shoesSize;
    if (fieldEnabled(cfgMap, 'mem_secContactName')   && secContactName)   extended.secContactName   = secContactName;
    if (fieldEnabled(cfgMap, 'mem_secContactNumber') && secContactNumber) extended.secContactNumber = secContactNumber;
    if (fieldEnabled(cfgMap, 'mem_injuriesConditions') && injuries)      extended.injuries      = injuries;
    if (fieldEnabled(cfgMap, 'mem_fitnessGoal')   && fitnessGoal)   extended.fitnessGoal   = fitnessGoal;
    if (fieldEnabled(cfgMap, 'mem_activityLevel') && activityLevel) extended.activityLevel = activityLevel;
    if (fieldEnabled(cfgMap, 'mem_expertiseLevel')&& expertiseLevel)extended.expertiseLevel= expertiseLevel;
    if (fieldEnabled(cfgMap, 'mem_division')      && division)      extended.division      = division;
    if (fieldEnabled(cfgMap, 'mem_certification') && certification) extended.certification = certification;

    setError('');
    setSaving(true);
    try {
      await onSave({
        fullName:             fullName.trim(),
        countryCode,
        contactNumber:        contactNumber.trim(),
        email:                fieldEnabled(cfgMap, 'mem_email')   ? email.trim()   || undefined : undefined,
        gender:               fieldEnabled(cfgMap, 'mem_gender')  ? gender         || undefined : undefined,
        dateOfBirth:          fieldEnabled(cfgMap, 'mem_dateOfBirth') ? dateOfBirth || undefined : undefined,
        address:              fieldEnabled(cfgMap, 'mem_address') ? address.trim() || undefined : undefined,
        locality:             fieldEnabled(cfgMap, 'mem_locality')? locality.trim()|| undefined : undefined,
        emergencyContactName: fieldEnabled(cfgMap, 'mem_emergencyContact') ? emergencyName.trim() || undefined : undefined,
        emergencyContactPhone:fieldEnabled(cfgMap, 'mem_emergencyContact') ? emergencyPhone.trim()|| undefined : undefined,
        leadSource:           fieldEnabled(cfgMap, 'mem_leadSource')? leadSource   || undefined : undefined,
        extendedFieldsJson:   Object.keys(extended).length > 0 ? JSON.stringify(extended) : undefined,
        enquiryId,
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save member.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="amd-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="amd-dialog" role="dialog" aria-modal="true" aria-label="Add Member">
        <div className="amd-header">
          <h2 className="amd-title">Add Member</h2>
          <button className="amd-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>

        <div className="amd-tabs">
          {(['Personal Information', 'Fitness Profile'] as Tab[]).map(tab => (
            <button
              key={tab}
              className={`amd-tab ${activeTab === tab ? 'amd-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="amd-body" onSubmit={handleSubmit}>
          {activeTab === 'Personal Information' && (
            <div className="amd-columns">
              {/* ── Left column ───────────────────────────── */}
              <div className="amd-col">
                <p className="amd-section-title">Personal Details</p>

                <div className="amd-field">
                  <label>Full Name <span className="amd-req">*</span></label>
                  <input
                    type="text"
                    placeholder="First Name and Last Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>

                <div className="amd-field">
                  <label>Country Code</label>
                  <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                    {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <div className="amd-field">
                  <label>Contact Number <span className="amd-req">*</span></label>
                  <input type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
                </div>

                {fieldEnabled(cfgMap, 'mem_email') && (
                  <div className="amd-field">
                    <label>Email<Req fieldKey="mem_email" /></label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_gender') && (
                  <div className="amd-field">
                    <label>Gender<Req fieldKey="mem_gender" /></label>
                    <select value={gender} onChange={e => setGender(e.target.value)}>
                      <option value="">Select</option>
                      {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_dateOfBirth') && (
                  <div className="amd-field">
                    <label>Date of Birth<Req fieldKey="mem_dateOfBirth" /></label>
                    <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_anniversary') && (
                  <div className="amd-field">
                    <label>Anniversary</label>
                    <input type="date" value={anniversary} onChange={e => setAnniversary(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_address') && (
                  <div className="amd-field">
                    <label>Address<Req fieldKey="mem_address" /></label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_locality') && (
                  <div className="amd-field">
                    <label>Locality<Req fieldKey="mem_locality" /></label>
                    <input type="text" value={locality} onChange={e => setLocality(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_city') && (
                  <div className="amd-field">
                    <label>City</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_pincode') && (
                  <div className="amd-field">
                    <label>Pincode</label>
                    <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_bloodGroup') && (
                  <div className="amd-field">
                    <label>Blood Group</label>
                    <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
                      <option value="">Select</option>
                      {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_whatsappNumber') && (
                  <div className="amd-field">
                    <label>WhatsApp Number</label>
                    <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_facebookId') && (
                  <div className="amd-field">
                    <label>Facebook ID</label>
                    <input type="text" value={facebookId} onChange={e => setFacebookId(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_instagramId') && (
                  <div className="amd-field">
                    <label>Instagram ID</label>
                    <input type="text" value={instagramId} onChange={e => setInstagramId(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_vaccination') && (
                  <div className="amd-field">
                    <label>Vaccination</label>
                    <input type="text" placeholder="Vaccination details" value={vaccination} onChange={e => setVaccination(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_mothersName') && (
                  <div className="amd-field">
                    <label>Mother's Name</label>
                    <input type="text" value={mothersName} onChange={e => setMothersName(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_mothersProfession') && (
                  <div className="amd-field">
                    <label>Mother's Profession</label>
                    <input type="text" value={motherProf} onChange={e => setMotherProf(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_fathersName') && (
                  <div className="amd-field">
                    <label>Father's Name</label>
                    <input type="text" value={fathersName} onChange={e => setFathersName(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_fathersProfession') && (
                  <div className="amd-field">
                    <label>Father's Profession</label>
                    <input type="text" value={fatherProf} onChange={e => setFatherProf(e.target.value)} />
                  </div>
                )}
              </div>

              {/* ── Right column ──────────────────────────── */}
              <div className="amd-col">
                {fieldEnabled(cfgMap, 'mem_emergencyContact') && (
                  <>
                    <p className="amd-section-title">Emergency Contact</p>
                    <div className="amd-field">
                      <label>Contact Name<Req fieldKey="mem_emergencyContact" /></label>
                      <input type="text" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
                    </div>
                    <div className="amd-field">
                      <label>Contact Phone</label>
                      <input type="tel" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} />
                    </div>
                  </>
                )}

                {fieldEnabled(cfgMap, 'mem_secContactName') && (
                  <>
                    <p className="amd-section-title">Secondary Contact</p>
                    <div className="amd-field">
                      <label>Name</label>
                      <input type="text" value={secContactName} onChange={e => setSecContactName(e.target.value)} />
                    </div>
                  </>
                )}

                {fieldEnabled(cfgMap, 'mem_secContactNumber') && (
                  <div className="amd-field">
                    <label>Number</label>
                    <input type="tel" value={secContactNumber} onChange={e => setSecContactNumber(e.target.value)} />
                  </div>
                )}

                <p className="amd-section-title">IDs &amp; Lead Info</p>

                {fieldEnabled(cfgMap, 'mem_nationalId') && (
                  <div className="amd-field">
                    <label>National ID</label>
                    <input type="text" value={nationalId} onChange={e => setNationalId(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_lockerKeyNo') && (
                  <div className="amd-field">
                    <label>Locker Key No</label>
                    <input type="text" value={lockerKey} onChange={e => setLockerKey(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_pan') && (
                  <div className="amd-field">
                    <label>PAN</label>
                    <input type="text" value={pan} onChange={e => setPan(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_customerType') && (
                  <div className="amd-field">
                    <label>Customer Type</label>
                    <select value={customerType} onChange={e => setCustomerType(e.target.value)}>
                      <option value="">Select</option>
                      {CUSTOMER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_leadSource') && (
                  <div className="amd-field">
                    <label>Lead Source<Req fieldKey="mem_leadSource" /></label>
                    <select value={leadSource} onChange={e => setLeadSource(e.target.value)}>
                      <option value="">Select</option>
                      {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                {(fieldEnabled(cfgMap, 'mem_tshirtSize') || fieldEnabled(cfgMap, 'mem_shortsSize') || fieldEnabled(cfgMap, 'mem_shoesSize')) && (
                  <p className="amd-section-title">Apparel &amp; Shoes</p>
                )}

                {fieldEnabled(cfgMap, 'mem_tshirtSize') && (
                  <div className="amd-field">
                    <label>T-Shirt Size</label>
                    <select value={tshirtSize} onChange={e => setTshirtSize(e.target.value)}>
                      <option value="">Select</option>
                      {TSHIRT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_shortsSize') && (
                  <div className="amd-field">
                    <label>Shorts Size</label>
                    <select value={shortsSize} onChange={e => setShortsSize(e.target.value)}>
                      <option value="">Select</option>
                      {TSHIRT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_shoesSize') && (
                  <div className="amd-field">
                    <label>Shoes Size</label>
                    <input type="text" placeholder="e.g. UK 8" value={shoesSize} onChange={e => setShoesSize(e.target.value)} />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Fitness Profile' && (
            <div className="amd-columns">
              <div className="amd-col">
                <p className="amd-section-title">Fitness Profile</p>

                {fieldEnabled(cfgMap, 'mem_injuriesConditions') && (
                  <div className="amd-field">
                    <label>Injuries &amp; Conditions</label>
                    <textarea
                      rows={3}
                      placeholder="Describe any injuries or medical conditions"
                      value={injuries}
                      onChange={e => setInjuries(e.target.value)}
                    />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_fitnessGoal') && (
                  <div className="amd-field">
                    <label>Fitness Goal</label>
                    <select value={fitnessGoal} onChange={e => setFitnessGoal(e.target.value)}>
                      <option value="">Select</option>
                      {FITNESS_GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_activityLevel') && (
                  <div className="amd-field">
                    <label>Activity Level</label>
                    <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)}>
                      <option value="">Select</option>
                      {ACTIVITY_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_expertiseLevel') && (
                  <div className="amd-field">
                    <label>Expertise Level</label>
                    <select value={expertiseLevel} onChange={e => setExpertiseLevel(e.target.value)}>
                      <option value="">Select</option>
                      {EXPERTISE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_division') && (
                  <div className="amd-field">
                    <label>Division</label>
                    <input type="text" value={division} onChange={e => setDivision(e.target.value)} />
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_certification') && (
                  <div className="amd-field">
                    <label>Certification</label>
                    <input type="text" value={certification} onChange={e => setCertification(e.target.value)} />
                  </div>
                )}

                {!fieldEnabled(cfgMap, 'mem_injuriesConditions') &&
                 !fieldEnabled(cfgMap, 'mem_fitnessGoal') &&
                 !fieldEnabled(cfgMap, 'mem_activityLevel') &&
                 !fieldEnabled(cfgMap, 'mem_expertiseLevel') &&
                 !fieldEnabled(cfgMap, 'mem_division') &&
                 !fieldEnabled(cfgMap, 'mem_certification') && (
                  <p className="amd-empty-tab">No fitness profile fields are enabled in Form Customization.</p>
                )}
              </div>
            </div>
          )}

          {error && <p className="amd-error">{error}</p>}

          <div className="amd-footer">
            <button type="button" className="amd-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="amd-save-btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
