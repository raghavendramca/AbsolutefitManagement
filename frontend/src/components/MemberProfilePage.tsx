import { useState, useRef, useEffect } from 'react';
import { membersApi, type MemberDto, type CreateMemberDto } from '../api/members';
import { formCustomizationApi, type FormFieldConfig, type AdditionalDetailField } from '../api/formCustomization';
import { fitnessProfileApi, type FitnessProfileItemDto } from '../api/fitnessProfile';
import { apparelItemsApi, type ApparelItemDto } from '../api/apparelItems';
import './MemberProfilePage.css';

const COUNTRY_CODES = [
  { label: 'India (+91)', value: '+91' },
  { label: 'USA (+1)',    value: '+1'  },
  { label: 'UK (+44)',    value: '+44' },
  { label: 'UAE (+971)',  value: '+971'},
  { label: 'Australia (+61)', value: '+61' },
];

const GENDERS        = ['Male', 'Female', 'Other'];
const BLOOD_GROUPS   = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const LEAD_SOURCES   = ['Walk-in', 'Phone Call', 'Instagram', 'Facebook', 'Google', 'Referral', 'Other'];
const CUSTOMER_TYPES = ['Individual', 'Corporate', 'Student', 'Senior'];
const FITNESS_GOAL_TYPES = ['Weight Loss', 'Weight Gain', 'Muscle Building', 'Endurance', 'Flexibility', 'General Fitness'];
const RELATIONSHIPS  = ['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'];
const STAFF_LIST     = ['Vasanth', 'Swetha Raghavendra', 'Rahul Kumar', 'Priya Nair'];
const MAILER_LISTS   = ['Newsletter', 'Promotions', 'Updates', 'All'];

const MAIN_TABS = [
  'Profile', 'Service Card', 'Payments', 'Call Log', 'Appointments',
  'Referrals', 'Family Member', 'Store', 'Documents', 'Attendance',
  'Trial History', 'Training', 'Terms & Conditions',
] as const;
type MainTab = typeof MAIN_TABS[number];
type ProfileSubTab = 'Personal Information' | 'Fitness Profile';

interface Props {
  member: MemberDto;
  subscriptionId: string;
  gymId: string;
  gymName?: string;
  onClose: () => void;
  onNewInvoice: (member: MemberDto) => void;
}

function parseExtended(json?: string): Record<string, string> {
  if (!json) return {};
  try { return JSON.parse(json) as Record<string, string>; } catch { return {}; }
}

function buildCfgMap(fields: FormFieldConfig[]): Map<string, FormFieldConfig> {
  return new Map(fields.map(f => [f.key, f]));
}
function fieldEnabled(map: Map<string, FormFieldConfig>, key: string): boolean {
  return map.get(key)?.isEnabled ?? false;
}

function calcAge(dob: string): string {
  if (!dob) return '';
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 0 ? String(age) : '';
}

export default function MemberProfilePage({ member, subscriptionId, gymId, gymName, onClose, onNewInvoice }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ext = parseExtended(member.extendedFieldsJson);

  const [mainTab,    setMainTab]    = useState<MainTab>('Profile');
  const [profileTab, setProfileTab] = useState<ProfileSubTab>('Personal Information');
  const [saving,     setSaving]     = useState(false);
  const [saveMsg,    setSaveMsg]    = useState('');
  const [error,      setError]      = useState('');

  // Form customization
  const [cfgMap,          setCfgMap]          = useState<Map<string, FormFieldConfig>>(new Map());
  const [additionalFields, setAdditionalFields] = useState<AdditionalDetailField[]>([]);
  const [additionalValues, setAdditionalValues] = useState<Record<string, string | string[]>>({});

  // Fitness profile item lists
  const [injuryItems,        setInjuryItems]        = useState<FitnessProfileItemDto[]>([]);
  const [activityItems,      setActivityItems]      = useState<FitnessProfileItemDto[]>([]);
  const [levelItems,         setLevelItems]         = useState<FitnessProfileItemDto[]>([]);
  const [divisionItems,      setDivisionItems]      = useState<FitnessProfileItemDto[]>([]);
  const [certificationItems, setCertificationItems] = useState<FitnessProfileItemDto[]>([]);

  // Apparel item lists
  const [tshirtItems, setTshirtItems] = useState<ApparelItemDto[]>([]);
  const [shortsItems, setShortsItems] = useState<ApparelItemDto[]>([]);
  const [shoesItems,  setShoesItems]  = useState<ApparelItemDto[]>([]);

  // Photo
  const [photoPreview, setPhotoPreview] = useState<string | null>(member.photoUrl ?? null);

  // Fixed fields
  const [fullName,      setFullName]      = useState(member.fullName ?? '');
  const [countryCode,   setCountryCode]   = useState(member.countryCode ?? '+91');
  const [contactNumber, setContactNumber] = useState(member.contactNumber ?? '');
  const [contactEditable, setContactEditable] = useState(false);

  // Configurable personal detail fields
  const [email,       setEmail]       = useState(member.email ?? '');
  const [gender,      setGender]      = useState(member.gender ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(member.dateOfBirth ?? '');
  const [anniversary, setAnniversary] = useState(ext.anniversary ?? '');
  const [address,     setAddress]     = useState(member.address ?? '');
  const [locality,    setLocality]    = useState(member.locality ?? '');
  const [city,        setCity]        = useState(ext.city ?? '');
  const [bloodGroup,  setBloodGroup]  = useState(ext.bloodGroup ?? '');
  const [whatsapp,    setWhatsapp]    = useState(ext.whatsapp ?? '');
  const [facebookId,  setFacebookId]  = useState(ext.facebookId ?? '');
  const [instagramId, setInstagramId] = useState(ext.instagramId ?? '');
  const [pincode,     setPincode]     = useState(ext.pincode ?? '');
  const [mothersName, setMothersName] = useState(ext.mothersName ?? '');
  const [motherProf,  setMotherProf]  = useState(ext.mothersProfession ?? '');
  const [fathersName, setFathersName] = useState(ext.fathersName ?? '');
  const [fatherProf,  setFatherProf]  = useState(ext.fathersProfession ?? '');
  const [vaccination, setVaccination] = useState(ext.vaccination ?? '');

  // Emergency contact
  const [emergencyName,         setEmergencyName]         = useState(member.emergencyContactName ?? '');
  const [emergencyCountryCode,  setEmergencyCountryCode]  = useState(ext.emergencyCountryCode ?? '+91');
  const [emergencyPhone,        setEmergencyPhone]        = useState(member.emergencyContactPhone ?? '');
  const [emergencyRelationship, setEmergencyRelationship] = useState(ext.emergencyRelationship ?? '');

  // Member Manager
  const [salesRep,       setSalesRep]       = useState(ext.salesRep ?? '');
  const [memberManager,  setMemberManager]  = useState(ext.memberManager ?? '');
  const [mailerList,     setMailerList]     = useState(ext.mailerList ?? '');
  const [generalTrainer, setGeneralTrainer] = useState(ext.generalTrainer ?? '');

  // IDs
  const [nationalId,   setNationalId]   = useState(ext.nationalId ?? '');
  const [lockerKey,    setLockerKey]    = useState(ext.lockerKeyNo ?? '');
  const [pan,          setPan]          = useState(ext.pan ?? '');
  const [attendanceId, setAttendanceId] = useState(ext.attendanceId ?? '');
  const [rfIdCard,     setRfIdCard]     = useState(ext.rfIdCard ?? '');
  const [clubId,       setClubId]       = useState(ext.clubId ?? '');
  const [gstNo,        setGstNo]        = useState(ext.gstNo ?? '');

  // Lead info
  const [customerType, setCustomerType] = useState(ext.customerType ?? '');
  const [leadSource,   setLeadSource]   = useState(member.leadSource ?? '');

  // Apparel
  const [tshirtSize, setTshirtSize] = useState(ext.tshirtSize ?? '');
  const [shortsSize, setShortsSize] = useState(ext.shortsSize ?? '');
  const [shoesSize,  setShoesSize]  = useState(ext.shoesSize ?? '');

  // Secondary contact
  const [secContactName,   setSecContactName]   = useState(ext.secContactName ?? '');
  const [secContactNumber, setSecContactNumber] = useState(ext.secContactNumber ?? '');

  // Communication Preferences
  const [commSms,      setCommSms]      = useState(ext.commSms !== 'No');
  const [commMail,     setCommMail]     = useState(ext.commMail !== 'No');
  const [commPush,     setCommPush]     = useState(ext.commPush !== 'No');
  const [commWhatsapp, setCommWhatsapp] = useState(ext.commWhatsapp !== 'No');

  // Fitness profile
  const [selectedInjuries,   setSelectedInjuries]   = useState<string[]>(ext.injuries ? ext.injuries.split(',') : []);
  const [fitnessGoalType,    setFitnessGoalType]    = useState(ext.fitnessGoalType ?? '');
  const [fitnessGoalStart,   setFitnessGoalStart]   = useState(ext.fitnessGoalStart ?? '');
  const [fitnessGoalEnd,     setFitnessGoalEnd]     = useState(ext.fitnessGoalEnd ?? '');
  const [fitnessGoalRemarks, setFitnessGoalRemarks] = useState(ext.fitnessGoalRemarks ?? '');
  const [activityLevel,      setActivityLevel]      = useState(ext.activityLevel ?? '');
  const [expertiseLevel,     setExpertiseLevel]     = useState(ext.expertiseLevel ?? '');
  const [division,           setDivision]           = useState(ext.division ?? '');
  const [certification,      setCertification]      = useState(ext.certification ?? '');

  useEffect(() => {
    formCustomizationApi.get(subscriptionId, gymId, 'MemberForm')
      .then(dto => {
        try {
          const parsed: FormFieldConfig[] = JSON.parse(dto.fieldsJson);
          setCfgMap(buildCfgMap(parsed));
        } catch { /* defaults */ }
      }).catch(() => {});

    formCustomizationApi.get(subscriptionId, gymId, 'AdditionalDetails')
      .then(dto => {
        try {
          const parsed: AdditionalDetailField[] = JSON.parse(dto.fieldsJson);
          const forMember = Array.isArray(parsed) ? parsed.filter(f => f.showInMember) : [];
          setAdditionalFields(forMember);
          const initVals: Record<string, string | string[]> = {};
          forMember.forEach(f => {
            const savedVal = ext[`ad_${f.id}`];
            if (f.fieldType === 'MultipleSelection')
              initVals[f.id] = savedVal ? savedVal.split(',') : [];
            else
              initVals[f.id] = savedVal ?? '';
          });
          setAdditionalValues(initVals);
        } catch { /* none */ }
      }).catch(() => {});

    fitnessProfileApi.list(subscriptionId, gymId, 'InjuryCondition').then(i => setInjuryItems(i.filter(x => x.isEnabled))).catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'ActivityLevel').then(i => setActivityItems(i.filter(x => x.isEnabled))).catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'Level').then(i => setLevelItems(i.filter(x => x.isEnabled))).catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'Division').then(i => setDivisionItems(i.filter(x => x.isEnabled))).catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'Certification').then(i => setCertificationItems(i.filter(x => x.isEnabled))).catch(() => {});
    apparelItemsApi.list(subscriptionId, gymId, 'TShirtSize').then(i => setTshirtItems(i.filter(x => x.isEnabled))).catch(() => {});
    apparelItemsApi.list(subscriptionId, gymId, 'ShortsSize').then(i => setShortsItems(i.filter(x => x.isEnabled))).catch(() => {});
    apparelItemsApi.list(subscriptionId, gymId, 'ShoesSize').then(i => setShoesItems(i.filter(x => x.isEnabled))).catch(() => {});
  }, [subscriptionId, gymId]);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function toggleInjury(name: string, checked: boolean) {
    setSelectedInjuries(prev => checked ? [...prev, name] : prev.filter(n => n !== name));
  }

  async function handleUpdate() {
    if (!fullName.trim()) { setError('Full name is required.'); return; }
    if (!contactNumber.trim()) { setError('Contact number is required.'); return; }

    const extended: Record<string, string> = {};
    if (anniversary)        extended.anniversary          = anniversary;
    if (city)               extended.city                 = city;
    if (bloodGroup)         extended.bloodGroup           = bloodGroup;
    if (whatsapp)           extended.whatsapp             = whatsapp;
    if (facebookId)         extended.facebookId           = facebookId;
    if (instagramId)        extended.instagramId          = instagramId;
    if (pincode)            extended.pincode              = pincode;
    if (mothersName)        extended.mothersName          = mothersName;
    if (motherProf)         extended.mothersProfession    = motherProf;
    if (fathersName)        extended.fathersName          = fathersName;
    if (fatherProf)         extended.fathersProfession    = fatherProf;
    if (vaccination)        extended.vaccination          = vaccination;
    if (nationalId)         extended.nationalId           = nationalId;
    if (lockerKey)          extended.lockerKeyNo          = lockerKey;
    if (pan)                extended.pan                  = pan;
    if (customerType)       extended.customerType         = customerType;
    if (tshirtSize)         extended.tshirtSize           = tshirtSize;
    if (shortsSize)         extended.shortsSize           = shortsSize;
    if (shoesSize)          extended.shoesSize            = shoesSize;
    if (secContactName)     extended.secContactName       = secContactName;
    if (secContactNumber)   extended.secContactNumber     = secContactNumber;
    if (emergencyCountryCode && emergencyCountryCode !== '+91') extended.emergencyCountryCode = emergencyCountryCode;
    if (emergencyRelationship) extended.emergencyRelationship = emergencyRelationship;
    if (salesRep)           extended.salesRep             = salesRep;
    if (memberManager)      extended.memberManager        = memberManager;
    if (mailerList)         extended.mailerList           = mailerList;
    if (generalTrainer)     extended.generalTrainer       = generalTrainer;
    if (attendanceId)       extended.attendanceId         = attendanceId;
    if (rfIdCard)           extended.rfIdCard             = rfIdCard;
    if (clubId)             extended.clubId               = clubId;
    if (gstNo)              extended.gstNo                = gstNo;
    extended.commSms      = commSms      ? 'Yes' : 'No';
    extended.commMail     = commMail     ? 'Yes' : 'No';
    extended.commPush     = commPush     ? 'Yes' : 'No';
    extended.commWhatsapp = commWhatsapp ? 'Yes' : 'No';
    if (selectedInjuries.length > 0) extended.injuries = selectedInjuries.join(',');
    if (fitnessGoalType)    extended.fitnessGoalType    = fitnessGoalType;
    if (fitnessGoalStart)   extended.fitnessGoalStart   = fitnessGoalStart;
    if (fitnessGoalEnd)     extended.fitnessGoalEnd     = fitnessGoalEnd;
    if (fitnessGoalRemarks) extended.fitnessGoalRemarks = fitnessGoalRemarks;
    if (activityLevel)      extended.activityLevel      = activityLevel;
    if (expertiseLevel)     extended.expertiseLevel     = expertiseLevel;
    if (division)           extended.division           = division;
    if (certification)      extended.certification      = certification;
    for (const af of additionalFields) {
      const val = additionalValues[af.id];
      if (Array.isArray(val) && val.length > 0) extended[`ad_${af.id}`] = val.join(',');
      else if (typeof val === 'string' && val.trim()) extended[`ad_${af.id}`] = val.trim();
    }

    const data: CreateMemberDto = {
      fullName: fullName.trim(),
      countryCode,
      contactNumber: contactNumber.trim(),
      email:                email.trim() || undefined,
      gender:               gender || undefined,
      dateOfBirth:          dateOfBirth || undefined,
      address:              address.trim() || undefined,
      locality:             locality.trim() || undefined,
      emergencyContactName: emergencyName.trim() || undefined,
      emergencyContactPhone:emergencyPhone.trim() || undefined,
      leadSource:           leadSource || undefined,
      extendedFieldsJson:   Object.keys(extended).length > 0 ? JSON.stringify(extended) : undefined,
    };

    setError('');
    setSaving(true);
    try {
      await membersApi.update(subscriptionId, gymId, member.id, data);
      setSaveMsg('Profile updated successfully.');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update member.');
    } finally {
      setSaving(false);
    }
  }

  const hasFitnessFields =
    fieldEnabled(cfgMap, 'mem_injuriesConditions') ||
    fieldEnabled(cfgMap, 'mem_fitnessGoal') ||
    fieldEnabled(cfgMap, 'mem_activityLevel') ||
    fieldEnabled(cfgMap, 'mem_expertiseLevel') ||
    fieldEnabled(cfgMap, 'mem_division') ||
    fieldEnabled(cfgMap, 'mem_certification');

  const hasExpertise =
    fieldEnabled(cfgMap, 'mem_expertiseLevel') ||
    fieldEnabled(cfgMap, 'mem_division') ||
    fieldEnabled(cfgMap, 'mem_certification');

  const consentDate = new Date(member.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).replace(',', '');

  const membershipDisplay = member.id.slice(0, 7).toUpperCase();

  return (
    <div className="mpp-root">
      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <div className="mpp-breadcrumb">
        <button className="mpp-bc-link" onClick={onClose}>Home</button>
        <span className="mpp-bc-sep"> / </span>
        <button className="mpp-bc-link" onClick={onClose}>Clients</button>
        <span className="mpp-bc-sep"> / </span>
        <span className="mpp-bc-active">Profile - {member.fullName}</span>
      </div>

      {/* ── Page heading + action buttons ─────────────────────────── */}
      <div className="mpp-heading-row">
        <h1 className="mpp-heading">Profile - {member.fullName}</h1>
        <div className="mpp-actions">
          <button className="mpp-action-btn">Inter branch transfer</button>
          <button className="mpp-action-btn">Print profile</button>
          <button className="mpp-action-btn">Add Advance Payment</button>
          <button className="mpp-action-btn" onClick={() => onNewInvoice(member)}>New Invoice</button>
          <button className="mpp-action-btn">New Call</button>
          <button className="mpp-action-btn">New appointment</button>
        </div>
      </div>

      {/* ── Main tabs ─────────────────────────────────────────────── */}
      <div className="mpp-main-tabs">
        {MAIN_TABS.map(tab => (
          <button
            key={tab}
            className={`mpp-main-tab${mainTab === tab ? ' mpp-main-tab-active' : ''}`}
            onClick={() => setMainTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab content ───────────────────────────────────────────── */}
      <div className="mpp-tab-content">
        {mainTab !== 'Profile' ? (
          <div className="mpp-placeholder">
            <p>{mainTab} — coming soon.</p>
          </div>
        ) : (
          <>
            {/* Profile sub-tabs */}
            <div className="mpp-sub-tabs">
              {(['Personal Information', 'Fitness Profile'] as ProfileSubTab[]).map(t => (
                <button
                  key={t}
                  className={`mpp-sub-tab${profileTab === t ? ' mpp-sub-tab-active' : ''}`}
                  onClick={() => setProfileTab(t)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>

            {/* ── Personal Information ─────────────────────────────── */}
            {profileTab === 'Personal Information' && (
              <div className="mpp-columns">
                {/* Left column */}
                <div className="mpp-col">
                  <p className="mpp-section-badge">Personal Details</p>

                  {/* Photo + biometric */}
                  <div className="mpp-photo-area">
                    <div className="mpp-photo-left">
                      <div className="mpp-avatar" onClick={() => fileInputRef.current?.click()}>
                        {photoPreview
                          ? <img src={photoPreview} alt="Member" className="mpp-avatar-img" />
                          : <span className="mpp-avatar-icon">&#128100;</span>
                        }
                      </div>
                      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                    </div>
                    <div className="mpp-photo-right">
                      <span className="mpp-biometric-label">Biometric Access : fingerprint</span>
                      <div className="mpp-photo-btns">
                        <button type="button" className="mpp-photo-btn" onClick={() => fileInputRef.current?.click()}>Upload Image</button>
                        <button type="button" className="mpp-photo-btn">Capture Image</button>
                      </div>
                    </div>
                  </div>

                  <div className="mpp-meta-row">
                    <span className="mpp-meta-label">Membership Number :</span>
                    <span className="mpp-meta-val">{membershipDisplay}</span>
                  </div>
                  {attendanceId && (
                    <div className="mpp-meta-row">
                      <span className="mpp-meta-label">Attendance Card Number :</span>
                      <span className="mpp-meta-val">{attendanceId}</span>
                    </div>
                  )}
                  {salesRep && (
                    <div className="mpp-meta-row">
                      <span className="mpp-meta-label">Created By :</span>
                      <span className="mpp-meta-val">{salesRep}</span>
                    </div>
                  )}

                  <div className="mpp-field">
                    <label>Full Name <span className="mpp-req">*</span></label>
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
                  </div>

                  <div className="mpp-field">
                    <label>Country Code</label>
                    <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                      {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>

                  <div className="mpp-field">
                    <label>Contact Number <span className="mpp-req">*</span></label>
                    <div className="mpp-contact-row">
                      <input
                        type="tel"
                        value={contactNumber}
                        readOnly={!contactEditable}
                        className={contactEditable ? '' : 'mpp-input-readonly'}
                        onChange={e => setContactNumber(e.target.value)}
                      />
                      {!contactEditable && (
                        <button type="button" className="mpp-change-btn" onClick={() => setContactEditable(true)}>Change</button>
                      )}
                    </div>
                  </div>

                  {fieldEnabled(cfgMap, 'mem_email') && (
                    <div className="mpp-field">
                      <label>Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_gender') && (
                    <div className="mpp-field">
                      <label>Gender</label>
                      <div className="mpp-radio-inline">
                        {GENDERS.map(g => (
                          <label key={g} className="mpp-radio-opt">
                            <input type="radio" name="mpp_gender" value={g} checked={gender === g} onChange={() => setGender(g)} />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_dateOfBirth') && (
                    <div className="mpp-field">
                      <label>Date of Birth</label>
                      <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_dateOfBirth') && dateOfBirth && (
                    <div className="mpp-field">
                      <label>Age</label>
                      <input type="text" value={calcAge(dateOfBirth)} readOnly className="mpp-input-readonly" />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_anniversary') && (
                    <div className="mpp-field">
                      <label>Anniversary</label>
                      <input type="date" value={anniversary} onChange={e => setAnniversary(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_address') && (
                    <div className="mpp-field">
                      <label>Address</label>
                      <textarea rows={2} value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_locality') && (
                    <div className="mpp-field">
                      <label>Locality</label>
                      <input type="text" value={locality} onChange={e => setLocality(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_city') && (
                    <div className="mpp-field">
                      <label>City</label>
                      <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_pincode') && (
                    <div className="mpp-field">
                      <label>Pincode</label>
                      <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_bloodGroup') && (
                    <div className="mpp-field">
                      <label>Blood Group</label>
                      <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
                        <option value="">Select</option>
                        {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_whatsappNumber') && (
                    <div className="mpp-field">
                      <label>WhatsApp Number</label>
                      <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_facebookId') && (
                    <div className="mpp-field">
                      <label>Facebook ID</label>
                      <input type="text" value={facebookId} onChange={e => setFacebookId(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_instagramId') && (
                    <div className="mpp-field">
                      <label>Instagram ID</label>
                      <input type="text" value={instagramId} onChange={e => setInstagramId(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_vaccination') && (
                    <div className="mpp-field">
                      <label>Vaccination</label>
                      <input type="text" value={vaccination} onChange={e => setVaccination(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_mothersName') && (
                    <div className="mpp-field">
                      <label>Mother's Name</label>
                      <input type="text" value={mothersName} onChange={e => setMothersName(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_mothersProfession') && (
                    <div className="mpp-field">
                      <label>Mother's Profession</label>
                      <input type="text" value={motherProf} onChange={e => setMotherProf(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_fathersName') && (
                    <div className="mpp-field">
                      <label>Father's Name</label>
                      <input type="text" value={fathersName} onChange={e => setFathersName(e.target.value)} />
                    </div>
                  )}

                  {fieldEnabled(cfgMap, 'mem_fathersProfession') && (
                    <div className="mpp-field">
                      <label>Father's Profession</label>
                      <input type="text" value={fatherProf} onChange={e => setFatherProf(e.target.value)} />
                    </div>
                  )}

                  {/* Emergency Contact */}
                  {fieldEnabled(cfgMap, 'mem_emergencyContact') && (
                    <>
                      <p className="mpp-section-badge">Emergency Contact</p>
                      <div className="mpp-field">
                        <label>Name</label>
                        <input type="text" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
                      </div>
                      <div className="mpp-field">
                        <label>Country Code</label>
                        <select value={emergencyCountryCode} onChange={e => setEmergencyCountryCode(e.target.value)}>
                          {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                      <div className="mpp-field">
                        <label>Number</label>
                        <input type="tel" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} />
                      </div>
                      <div className="mpp-field">
                        <label>Relationship</label>
                        <select value={emergencyRelationship} onChange={e => setEmergencyRelationship(e.target.value)}>
                          <option value="">Select</option>
                          {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                    </>
                  )}

                  {fieldEnabled(cfgMap, 'mem_secContactName') && (
                    <>
                      <p className="mpp-section-badge">Secondary Contact</p>
                      <div className="mpp-field">
                        <label>Name</label>
                        <input type="text" value={secContactName} onChange={e => setSecContactName(e.target.value)} />
                      </div>
                    </>
                  )}
                  {fieldEnabled(cfgMap, 'mem_secContactNumber') && (
                    <div className="mpp-field">
                      <label>Number</label>
                      <input type="tel" value={secContactNumber} onChange={e => setSecContactNumber(e.target.value)} />
                    </div>
                  )}
                </div>

                {/* Right column */}
                <div className="mpp-col">
                  <p className="mpp-section-badge">Member Manager</p>

                  <div className="mpp-field">
                    <label>Sales Rep</label>
                    <select value={salesRep} onChange={e => setSalesRep(e.target.value)}>
                      <option value="">Select</option>
                      {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="mpp-field">
                    <label>Member Manager</label>
                    <select value={memberManager} onChange={e => setMemberManager(e.target.value)}>
                      <option value="">Select</option>
                      {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="mpp-field">
                    <label>General Trainer</label>
                    <select value={generalTrainer} onChange={e => setGeneralTrainer(e.target.value)}>
                      <option value="">Select</option>
                      {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="mpp-field">
                    <label>Personal Trainer</label>
                    <input type="text" value="" disabled className="mpp-input-disabled" placeholder="—" />
                  </div>

                  <p className="mpp-section-badge">IDs</p>

                  <div className="mpp-field">
                    <label>Attendance ID</label>
                    <input type="text" value={attendanceId} readOnly className="mpp-input-readonly" />
                  </div>
                  <div className="mpp-field">
                    <label>RF ID Card</label>
                    <input type="text" value={rfIdCard} onChange={e => setRfIdCard(e.target.value)} />
                  </div>
                  <div className="mpp-field">
                    <label>Club ID</label>
                    <input type="text" value={clubId} onChange={e => setClubId(e.target.value)} />
                  </div>
                  <div className="mpp-field">
                    <label>GST No</label>
                    <input type="text" value={gstNo} onChange={e => setGstNo(e.target.value)} />
                  </div>

                  {fieldEnabled(cfgMap, 'mem_nationalId') && (
                    <div className="mpp-field">
                      <label>National ID</label>
                      <input type="text" value={nationalId} onChange={e => setNationalId(e.target.value)} />
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_lockerKeyNo') && (
                    <div className="mpp-field">
                      <label>Locker Key No</label>
                      <input type="text" value={lockerKey} onChange={e => setLockerKey(e.target.value)} />
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_pan') && (
                    <div className="mpp-field">
                      <label>PAN</label>
                      <input type="text" value={pan} onChange={e => setPan(e.target.value)} />
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_customerType') && (
                    <div className="mpp-field">
                      <label>Customer Type</label>
                      <select value={customerType} onChange={e => setCustomerType(e.target.value)}>
                        <option value="">Select</option>
                        {CUSTOMER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_leadSource') && (
                    <div className="mpp-field">
                      <label>Lead Source</label>
                      <select value={leadSource} onChange={e => setLeadSource(e.target.value)}>
                        <option value="">Select</option>
                        {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  )}

                  {(fieldEnabled(cfgMap, 'mem_tshirtSize') || fieldEnabled(cfgMap, 'mem_shortsSize') || fieldEnabled(cfgMap, 'mem_shoesSize')) && (
                    <p className="mpp-section-badge">Apparel &amp; Shoes</p>
                  )}
                  {fieldEnabled(cfgMap, 'mem_tshirtSize') && (
                    <div className="mpp-field">
                      <label>T-Shirt Size</label>
                      <select value={tshirtSize} onChange={e => setTshirtSize(e.target.value)}>
                        <option value="">Select</option>
                        {tshirtItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                      </select>
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_shortsSize') && (
                    <div className="mpp-field">
                      <label>Shorts Size</label>
                      <select value={shortsSize} onChange={e => setShortsSize(e.target.value)}>
                        <option value="">Select</option>
                        {shortsItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                      </select>
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_shoesSize') && (
                    <div className="mpp-field">
                      <label>Shoes Size</label>
                      <select value={shoesSize} onChange={e => setShoesSize(e.target.value)}>
                        <option value="">Select</option>
                        {shoesItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Communication Preference Settings */}
                  <p className="mpp-section-badge">Communication Preference Settings</p>
                  <div className="mpp-comm-prefs">
                    {([
                      ['SMS',               commSms,      setCommSms],
                      ['Mail',              commMail,     setCommMail],
                      ['Push Notification', commPush,     setCommPush],
                      ['WhatsApp',          commWhatsapp, setCommWhatsapp],
                    ] as [string, boolean, React.Dispatch<React.SetStateAction<boolean>>][]).map(([label, val, setter]) => (
                      <div key={label} className="mpp-comm-row">
                        <span className="mpp-comm-label">{label}</span>
                        <button
                          type="button"
                          className={`mpp-comm-toggle ${val ? 'mpp-comm-yes' : 'mpp-comm-no'}`}
                          onClick={() => setter(v => !v)}
                        >
                          {val ? 'Yes' : 'No'}
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mpp-consent-text">
                    I do not have any objection to receive communication from {gymName ?? 'Absolute fit'}. {consentDate}
                  </p>
                </div>
              </div>
            )}

            {/* ── Fitness Profile Tab ──────────────────────────────── */}
            {profileTab === 'Fitness Profile' && (
              <div className="mpp-fp-content">
                {fieldEnabled(cfgMap, 'mem_injuriesConditions') && (
                  <div>
                    <p className="mpp-section-title">Injuries and conditions</p>
                    {injuryItems.length > 0 ? (
                      <div className="mpp-injury-grid">
                        {injuryItems.map(item => (
                          <label key={item.id} className="mpp-injury-label">
                            <input
                              type="checkbox"
                              checked={selectedInjuries.includes(item.name)}
                              onChange={e => toggleInjury(item.name, e.target.checked)}
                            />
                            {item.name}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="mpp-fp-empty">No injury/condition items configured in Setup → Fitness Profile.</p>
                    )}
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_fitnessGoal') && (
                  <div>
                    <p className="mpp-section-title">Fitness Goals</p>
                    <div className="mpp-fp-goals-row">
                      <div className="mpp-field">
                        <label>Goal Type</label>
                        <select value={fitnessGoalType} onChange={e => setFitnessGoalType(e.target.value)}>
                          <option value="">Select</option>
                          {FITNESS_GOAL_TYPES.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div className="mpp-field">
                        <label>Start date</label>
                        <input type="date" value={fitnessGoalStart} onChange={e => setFitnessGoalStart(e.target.value)} />
                      </div>
                      <div className="mpp-field">
                        <label>End date</label>
                        <input type="date" value={fitnessGoalEnd} onChange={e => setFitnessGoalEnd(e.target.value)} />
                      </div>
                      <div className="mpp-field">
                        <label>Goal remarks</label>
                        <input type="text" maxLength={140} placeholder="Maximum 140 characters" value={fitnessGoalRemarks} onChange={e => setFitnessGoalRemarks(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {hasExpertise && (
                  <div>
                    <p className="mpp-section-title">Expertise</p>
                    <div className="mpp-fp-expertise-row">
                      {fieldEnabled(cfgMap, 'mem_expertiseLevel') && (
                        <div className="mpp-field">
                          <label>Level</label>
                          <select value={expertiseLevel} onChange={e => setExpertiseLevel(e.target.value)}>
                            <option value="">Select</option>
                            {levelItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                          </select>
                        </div>
                      )}
                      {fieldEnabled(cfgMap, 'mem_division') && (
                        <div className="mpp-field">
                          <label>Division</label>
                          <select value={division} onChange={e => setDivision(e.target.value)}>
                            <option value="">Select</option>
                            {divisionItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                          </select>
                        </div>
                      )}
                      {fieldEnabled(cfgMap, 'mem_certification') && (
                        <div className="mpp-field">
                          <label>Certification</label>
                          <select value={certification} onChange={e => setCertification(e.target.value)}>
                            <option value="">Select</option>
                            {certificationItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {fieldEnabled(cfgMap, 'mem_activityLevel') && (
                  <div>
                    <p className="mpp-section-title">Activity Level</p>
                    <div className="mpp-field mpp-fp-activity-field">
                      <label>Activity Level</label>
                      <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)}>
                        <option value="">Select</option>
                        {activityItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {!hasFitnessFields && (
                  <p className="mpp-fp-empty">No fitness profile fields are enabled in Form Customization.</p>
                )}
              </div>
            )}

            {/* Additional Detail Fields */}
            {additionalFields.length > 0 && profileTab === 'Personal Information' && (
              <div className="mpp-additional-section">
                <p className="mpp-section-title">Additional Details</p>
                <div className="mpp-additional-grid">
                  {additionalFields.map(af => (
                    <div key={af.id} className="mpp-field">
                      <label>
                        {af.caption || af.fieldType}
                        {af.required && <span className="mpp-req"> *</span>}
                      </label>
                      {af.fieldType === 'TextBox' && (
                        <input type="text" placeholder={af.placeholder} value={(additionalValues[af.id] as string) ?? ''} onChange={e => setAdditionalValues(prev => ({ ...prev, [af.id]: e.target.value }))} />
                      )}
                      {af.fieldType === 'MultiLine' && (
                        <textarea rows={3} placeholder={af.placeholder} value={(additionalValues[af.id] as string) ?? ''} onChange={e => setAdditionalValues(prev => ({ ...prev, [af.id]: e.target.value }))} />
                      )}
                      {af.fieldType === 'DropDown' && (
                        <select value={(additionalValues[af.id] as string) ?? ''} onChange={e => setAdditionalValues(prev => ({ ...prev, [af.id]: e.target.value }))}>
                          <option value="">Select</option>
                          {af.options.filter(Boolean).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      )}
                      {af.fieldType === 'RadioButton' && (
                        <div className="mpp-radio-group">
                          {af.options.filter(Boolean).map(opt => (
                            <label key={opt} className="mpp-radio-label">
                              <input type="radio" name={`ad_${af.id}`} value={opt} checked={(additionalValues[af.id] as string) === opt} onChange={() => setAdditionalValues(prev => ({ ...prev, [af.id]: opt }))} />
                              {opt}
                            </label>
                          ))}
                        </div>
                      )}
                      {af.fieldType === 'MultipleSelection' && (
                        <div className="mpp-radio-group">
                          {af.options.filter(Boolean).map(opt => {
                            const vals = (additionalValues[af.id] as string[]) ?? [];
                            return (
                              <label key={opt} className="mpp-radio-label">
                                <input type="checkbox" value={opt} checked={vals.includes(opt)} onChange={e => {
                                  const next = e.target.checked ? [...vals, opt] : vals.filter(v => v !== opt);
                                  setAdditionalValues(prev => ({ ...prev, [af.id]: next }));
                                }} />
                                {opt}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error   && <p className="mpp-error">{error}</p>}
            {saveMsg && <p className="mpp-success">{saveMsg}</p>}

            {/* Footer */}
            <div className="mpp-footer">
              <button type="button" className="mpp-save-btn" disabled={saving} onClick={handleUpdate}>
                {saving ? 'Saving…' : 'Update'}
              </button>
              <button type="button" className="mpp-save-btn">Sell Product</button>
              <button type="button" className="mpp-cancel-btn" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
