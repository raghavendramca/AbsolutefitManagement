import { useState, useRef, useEffect } from 'react';
import { formCustomizationApi, type FormFieldConfig, type AdditionalDetailField } from '../api/formCustomization';
import { fitnessProfileApi, type FitnessProfileItemDto } from '../api/fitnessProfile';
import { apparelItemsApi, type ApparelItemDto } from '../api/apparelItems';
import type { CreateMemberDto } from '../api/members';
import './AddMemberDialog.css';

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

interface Props {
  subscriptionId: string;
  gymId: string;
  enquiryId?: string;
  prefill?: Partial<CreateMemberDto>;
  pageMode?: boolean;
  onClose: () => void;
  onSave: (data: CreateMemberDto) => Promise<void>;
  onAddAndBill?: (data: CreateMemberDto) => Promise<void>;
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

export default function AddMemberDialog({ subscriptionId, gymId, enquiryId, prefill, pageMode, onClose, onSave, onAddAndBill }: Props) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [showBillConfirm, setShowBillConfirm] = useState(false);
  const pendingBillDataRef = useRef<CreateMemberDto | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('Personal Information');

  const [cfgMap, setCfgMap] = useState<Map<string, FormFieldConfig>>(new Map());
  const [additionalFields, setAdditionalFields] = useState<AdditionalDetailField[]>([]);
  const [additionalValues, setAdditionalValues] = useState<Record<string, string | string[]>>({});

  // ── Fitness profile item lists ────────────────────────────────────────────────
  const [injuryItems,        setInjuryItems]        = useState<FitnessProfileItemDto[]>([]);
  const [activityItems,      setActivityItems]      = useState<FitnessProfileItemDto[]>([]);
  const [levelItems,         setLevelItems]         = useState<FitnessProfileItemDto[]>([]);
  const [divisionItems,      setDivisionItems]      = useState<FitnessProfileItemDto[]>([]);
  const [certificationItems, setCertificationItems] = useState<FitnessProfileItemDto[]>([]);

  // ── Apparel item lists ────────────────────────────────────────────────────────
  const [tshirtItems, setTshirtItems] = useState<ApparelItemDto[]>([]);
  const [shortsItems, setShortsItems] = useState<ApparelItemDto[]>([]);
  const [shoesItems,  setShoesItems]  = useState<ApparelItemDto[]>([]);

  useEffect(() => {
    formCustomizationApi.get(subscriptionId, gymId, 'MemberForm')
      .then(dto => {
        try {
          const parsed: FormFieldConfig[] = JSON.parse(dto.fieldsJson);
          setCfgMap(buildCfgMap(parsed));
        } catch { /* use defaults */ }
      })
      .catch(() => { /* use defaults */ });

    formCustomizationApi.get(subscriptionId, gymId, 'AdditionalDetails')
      .then(dto => {
        try {
          const parsed: AdditionalDetailField[] = JSON.parse(dto.fieldsJson);
          const forMember = Array.isArray(parsed) ? parsed.filter(f => f.showInMember) : [];
          setAdditionalFields(forMember);
          const initVals: Record<string, string | string[]> = {};
          forMember.forEach(f => { initVals[f.id] = f.fieldType === 'MultipleSelection' ? [] : ''; });
          setAdditionalValues(initVals);
        } catch { /* no additional fields */ }
      })
      .catch(() => { /* no additional fields */ });

    fitnessProfileApi.list(subscriptionId, gymId, 'InjuryCondition')
      .then(items => setInjuryItems(items.filter(i => i.isEnabled)))
      .catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'ActivityLevel')
      .then(items => setActivityItems(items.filter(i => i.isEnabled)))
      .catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'Level')
      .then(items => setLevelItems(items.filter(i => i.isEnabled)))
      .catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'Division')
      .then(items => setDivisionItems(items.filter(i => i.isEnabled)))
      .catch(() => {});
    fitnessProfileApi.list(subscriptionId, gymId, 'Certification')
      .then(items => setCertificationItems(items.filter(i => i.isEnabled)))
      .catch(() => {});

    apparelItemsApi.list(subscriptionId, gymId, 'TShirtSize')
      .then(items => setTshirtItems(items.filter(i => i.isEnabled)))
      .catch(() => {});
    apparelItemsApi.list(subscriptionId, gymId, 'ShortsSize')
      .then(items => setShortsItems(items.filter(i => i.isEnabled)))
      .catch(() => {});
    apparelItemsApi.list(subscriptionId, gymId, 'ShoesSize')
      .then(items => setShoesItems(items.filter(i => i.isEnabled)))
      .catch(() => {});
  }, [subscriptionId, gymId]);

  // ── Fixed fields ──────────────────────────────────────────────────────────────
  const [fullName,      setFullName]      = useState(prefill?.fullName ?? '');
  const [countryCode,   setCountryCode]   = useState(prefill?.countryCode ?? '+91');
  const [contactNumber, setContactNumber] = useState(prefill?.contactNumber ?? '');
  const [contactEditable, setContactEditable] = useState(!prefill?.contactNumber);

  // ── Photo ─────────────────────────────────────────────────────────────────────
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // ── Configurable personal detail fields ──────────────────────────────────────
  const [email,       setEmail]       = useState(prefill?.email ?? '');
  const [gender,      setGender]      = useState(prefill?.gender ?? '');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [address,     setAddress]     = useState(prefill?.address ?? '');
  const [locality,    setLocality]    = useState(prefill?.locality ?? '');
  const [city,        setCity]        = useState('');
  const [bloodGroup,  setBloodGroup]  = useState('');
  const [whatsapp,    setWhatsapp]    = useState('');
  const [facebookId,  setFacebookId]  = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [pincode,     setPincode]     = useState('');
  const [mothersName, setMothersName] = useState('');
  const [motherProf,  setMotherProf]  = useState('');
  const [fathersName, setFathersName] = useState('');
  const [fatherProf,  setFatherProf]  = useState('');
  const [vaccination, setVaccination] = useState('');

  // ── Emergency contact ─────────────────────────────────────────────────────────
  const [emergencyName,        setEmergencyName]        = useState(prefill?.emergencyContactName ?? '');
  const [emergencyCountryCode, setEmergencyCountryCode] = useState('+91');
  const [emergencyPhone,       setEmergencyPhone]       = useState(prefill?.emergencyContactPhone ?? '');
  const [emergencyRelationship,setEmergencyRelationship]= useState('');

  // ── Member Manager ────────────────────────────────────────────────────────────
  const [salesRep,       setSalesRep]       = useState('');
  const [memberManager,  setMemberManager]  = useState('');
  const [mailerList,     setMailerList]     = useState('');
  const [generalTrainer, setGeneralTrainer] = useState('');

  // ── IDs ────────────────────────────────────────────────────────────────────────
  const [nationalId,   setNationalId]   = useState('');
  const [lockerKey,    setLockerKey]    = useState('');
  const [pan,          setPan]          = useState('');
  const [attendanceId, setAttendanceId] = useState('');
  const [rfIdCard,     setRfIdCard]     = useState('');
  const [clubId,       setClubId]       = useState('');
  const [gstNo,        setGstNo]        = useState('');

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

  // ── Communication Preferences (default: all enabled) ─────────────────────────
  const [commSms,      setCommSms]      = useState(true);
  const [commMail,     setCommMail]     = useState(true);
  const [commPush,     setCommPush]     = useState(true);
  const [commWhatsapp, setCommWhatsapp] = useState(true);

  // ── Fitness profile ───────────────────────────────────────────────────────────
  const [selectedInjuries,   setSelectedInjuries]   = useState<string[]>([]);
  const [fitnessGoalType,    setFitnessGoalType]    = useState('');
  const [fitnessGoalStart,   setFitnessGoalStart]   = useState('');
  const [fitnessGoalEnd,     setFitnessGoalEnd]     = useState('');
  const [fitnessGoalRemarks, setFitnessGoalRemarks] = useState('');
  const [activityLevel,      setActivityLevel]      = useState('');
  const [expertiseLevel,     setExpertiseLevel]     = useState('');
  const [division,           setDivision]           = useState('');
  const [certification,      setCertification]      = useState('');

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

  function toggleInjury(name: string, checked: boolean) {
    setSelectedInjuries(prev =>
      checked ? [...prev, name] : prev.filter(n => n !== name)
    );
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
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

    for (const af of additionalFields) {
      if (!af.required) continue;
      const val = additionalValues[af.id];
      const isEmpty = Array.isArray(val) ? val.length === 0 : !val?.toString().trim();
      if (isEmpty) {
        setError(`${af.caption || af.fieldType} is required.`);
        return;
      }
    }

    const extended: Record<string, string> = {};

    if (fieldEnabled(cfgMap, 'mem_anniversary')     && anniversary)   extended.anniversary   = anniversary;
    if (fieldEnabled(cfgMap, 'mem_city')            && city)          extended.city          = city;
    if (fieldEnabled(cfgMap, 'mem_bloodGroup')      && bloodGroup)    extended.bloodGroup    = bloodGroup;
    if (fieldEnabled(cfgMap, 'mem_whatsappNumber')  && whatsapp)      extended.whatsapp      = whatsapp;
    if (fieldEnabled(cfgMap, 'mem_facebookId')      && facebookId)    extended.facebookId    = facebookId;
    if (fieldEnabled(cfgMap, 'mem_instagramId')     && instagramId)   extended.instagramId   = instagramId;
    if (fieldEnabled(cfgMap, 'mem_pincode')         && pincode)       extended.pincode       = pincode;
    if (fieldEnabled(cfgMap, 'mem_mothersName')     && mothersName)   extended.mothersName   = mothersName;
    if (fieldEnabled(cfgMap, 'mem_mothersProfession') && motherProf)  extended.mothersProfession = motherProf;
    if (fieldEnabled(cfgMap, 'mem_fathersName')     && fathersName)   extended.fathersName   = fathersName;
    if (fieldEnabled(cfgMap, 'mem_fathersProfession') && fatherProf)  extended.fathersProfession = fatherProf;
    if (fieldEnabled(cfgMap, 'mem_vaccination')     && vaccination)   extended.vaccination   = vaccination;
    if (fieldEnabled(cfgMap, 'mem_nationalId')      && nationalId)    extended.nationalId    = nationalId;
    if (fieldEnabled(cfgMap, 'mem_lockerKeyNo')     && lockerKey)     extended.lockerKeyNo   = lockerKey;
    if (fieldEnabled(cfgMap, 'mem_pan')             && pan)           extended.pan           = pan;
    if (fieldEnabled(cfgMap, 'mem_customerType')    && customerType)  extended.customerType  = customerType;
    if (fieldEnabled(cfgMap, 'mem_tshirtSize')      && tshirtSize)    extended.tshirtSize    = tshirtSize;
    if (fieldEnabled(cfgMap, 'mem_shortsSize')      && shortsSize)    extended.shortsSize    = shortsSize;
    if (fieldEnabled(cfgMap, 'mem_shoesSize')       && shoesSize)     extended.shoesSize     = shoesSize;
    if (fieldEnabled(cfgMap, 'mem_secContactName')  && secContactName)   extended.secContactName   = secContactName;
    if (fieldEnabled(cfgMap, 'mem_secContactNumber')&& secContactNumber) extended.secContactNumber = secContactNumber;

    // Emergency contact extras
    if (emergencyCountryCode && emergencyCountryCode !== '+91') extended.emergencyCountryCode = emergencyCountryCode;
    if (emergencyRelationship) extended.emergencyRelationship = emergencyRelationship;

    // Member Manager
    if (salesRep)       extended.salesRep       = salesRep;
    if (memberManager)  extended.memberManager  = memberManager;
    if (mailerList)     extended.mailerList     = mailerList;
    if (generalTrainer) extended.generalTrainer = generalTrainer;

    // New IDs
    if (attendanceId) extended.attendanceId = attendanceId;
    if (rfIdCard)     extended.rfIdCard     = rfIdCard;
    if (clubId)       extended.clubId       = clubId;
    if (gstNo)        extended.gstNo        = gstNo;

    // Communication preferences
    extended.commSms      = commSms      ? 'Yes' : 'No';
    extended.commMail     = commMail     ? 'Yes' : 'No';
    extended.commPush     = commPush     ? 'Yes' : 'No';
    extended.commWhatsapp = commWhatsapp ? 'Yes' : 'No';

    // Fitness profile
    if (fieldEnabled(cfgMap, 'mem_injuriesConditions') && selectedInjuries.length > 0)
      extended.injuries = selectedInjuries.join(',');
    if (fieldEnabled(cfgMap, 'mem_fitnessGoal')) {
      if (fitnessGoalType)    extended.fitnessGoalType    = fitnessGoalType;
      if (fitnessGoalStart)   extended.fitnessGoalStart   = fitnessGoalStart;
      if (fitnessGoalEnd)     extended.fitnessGoalEnd     = fitnessGoalEnd;
      if (fitnessGoalRemarks) extended.fitnessGoalRemarks = fitnessGoalRemarks;
    }
    if (fieldEnabled(cfgMap, 'mem_activityLevel') && activityLevel) extended.activityLevel = activityLevel;
    if (fieldEnabled(cfgMap, 'mem_expertiseLevel')&& expertiseLevel)extended.expertiseLevel= expertiseLevel;
    if (fieldEnabled(cfgMap, 'mem_division')      && division)      extended.division      = division;
    if (fieldEnabled(cfgMap, 'mem_certification') && certification) extended.certification = certification;

    for (const af of additionalFields) {
      const val = additionalValues[af.id];
      if (Array.isArray(val) && val.length > 0) extended[`ad_${af.id}`] = val.join(',');
      else if (typeof val === 'string' && val.trim()) extended[`ad_${af.id}`] = val.trim();
    }

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

  function buildMemberData(): CreateMemberDto | null {
    if (!fullName.trim())     { setError('Full name is required.');      return null; }
    if (!contactNumber.trim()){ setError('Contact number is required.'); return null; }

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
        return null;
      }
    }

    for (const af of additionalFields) {
      if (!af.required) continue;
      const val = additionalValues[af.id];
      const isEmpty = Array.isArray(val) ? val.length === 0 : !val?.toString().trim();
      if (isEmpty) {
        setError(`${af.caption || af.fieldType} is required.`);
        return null;
      }
    }

    const extended: Record<string, string> = {};
    if (fieldEnabled(cfgMap, 'mem_anniversary')     && anniversary)   extended.anniversary   = anniversary;
    if (fieldEnabled(cfgMap, 'mem_city')            && city)          extended.city          = city;
    if (fieldEnabled(cfgMap, 'mem_bloodGroup')      && bloodGroup)    extended.bloodGroup    = bloodGroup;
    if (fieldEnabled(cfgMap, 'mem_whatsappNumber')  && whatsapp)      extended.whatsapp      = whatsapp;
    if (fieldEnabled(cfgMap, 'mem_facebookId')      && facebookId)    extended.facebookId    = facebookId;
    if (fieldEnabled(cfgMap, 'mem_instagramId')     && instagramId)   extended.instagramId   = instagramId;
    if (fieldEnabled(cfgMap, 'mem_pincode')         && pincode)       extended.pincode       = pincode;
    if (fieldEnabled(cfgMap, 'mem_mothersName')     && mothersName)   extended.mothersName   = mothersName;
    if (fieldEnabled(cfgMap, 'mem_mothersProfession') && motherProf)  extended.mothersProfession = motherProf;
    if (fieldEnabled(cfgMap, 'mem_fathersName')     && fathersName)   extended.fathersName   = fathersName;
    if (fieldEnabled(cfgMap, 'mem_fathersProfession') && fatherProf)  extended.fathersProfession = fatherProf;
    if (fieldEnabled(cfgMap, 'mem_vaccination')     && vaccination)   extended.vaccination   = vaccination;
    if (fieldEnabled(cfgMap, 'mem_nationalId')      && nationalId)    extended.nationalId    = nationalId;
    if (fieldEnabled(cfgMap, 'mem_lockerKeyNo')     && lockerKey)     extended.lockerKeyNo   = lockerKey;
    if (fieldEnabled(cfgMap, 'mem_pan')             && pan)           extended.pan           = pan;
    if (fieldEnabled(cfgMap, 'mem_customerType')    && customerType)  extended.customerType  = customerType;
    if (fieldEnabled(cfgMap, 'mem_tshirtSize')      && tshirtSize)    extended.tshirtSize    = tshirtSize;
    if (fieldEnabled(cfgMap, 'mem_shortsSize')      && shortsSize)    extended.shortsSize    = shortsSize;
    if (fieldEnabled(cfgMap, 'mem_shoesSize')       && shoesSize)     extended.shoesSize     = shoesSize;
    if (fieldEnabled(cfgMap, 'mem_secContactName')  && secContactName)   extended.secContactName   = secContactName;
    if (fieldEnabled(cfgMap, 'mem_secContactNumber')&& secContactNumber) extended.secContactNumber = secContactNumber;
    if (emergencyCountryCode && emergencyCountryCode !== '+91') extended.emergencyCountryCode = emergencyCountryCode;
    if (emergencyRelationship) extended.emergencyRelationship = emergencyRelationship;
    if (salesRep)       extended.salesRep       = salesRep;
    if (memberManager)  extended.memberManager  = memberManager;
    if (mailerList)     extended.mailerList     = mailerList;
    if (generalTrainer) extended.generalTrainer = generalTrainer;
    if (attendanceId)   extended.attendanceId   = attendanceId;
    if (rfIdCard)       extended.rfIdCard       = rfIdCard;
    if (clubId)         extended.clubId         = clubId;
    if (gstNo)          extended.gstNo          = gstNo;
    extended.commSms      = commSms      ? 'Yes' : 'No';
    extended.commMail     = commMail     ? 'Yes' : 'No';
    extended.commPush     = commPush     ? 'Yes' : 'No';
    extended.commWhatsapp = commWhatsapp ? 'Yes' : 'No';
    if (fieldEnabled(cfgMap, 'mem_injuriesConditions') && selectedInjuries.length > 0)
      extended.injuries = selectedInjuries.join(',');
    if (fieldEnabled(cfgMap, 'mem_fitnessGoal')) {
      if (fitnessGoalType)    extended.fitnessGoalType    = fitnessGoalType;
      if (fitnessGoalStart)   extended.fitnessGoalStart   = fitnessGoalStart;
      if (fitnessGoalEnd)     extended.fitnessGoalEnd     = fitnessGoalEnd;
      if (fitnessGoalRemarks) extended.fitnessGoalRemarks = fitnessGoalRemarks;
    }
    if (fieldEnabled(cfgMap, 'mem_activityLevel') && activityLevel)  extended.activityLevel  = activityLevel;
    if (fieldEnabled(cfgMap, 'mem_expertiseLevel') && expertiseLevel) extended.expertiseLevel = expertiseLevel;
    if (fieldEnabled(cfgMap, 'mem_division')       && division)       extended.division       = division;
    if (fieldEnabled(cfgMap, 'mem_certification')  && certification)  extended.certification  = certification;
    for (const af of additionalFields) {
      const val = additionalValues[af.id];
      if (Array.isArray(val) && val.length > 0) extended[`ad_${af.id}`] = val.join(',');
      else if (typeof val === 'string' && val.trim()) extended[`ad_${af.id}`] = val.trim();
    }

    return {
      fullName: fullName.trim(),
      countryCode,
      contactNumber: contactNumber.trim(),
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
    };
  }

  function handleAddAndBillClick() {
    const data = buildMemberData();
    if (!data) return;
    pendingBillDataRef.current = data;
    setShowBillConfirm(true);
  }

  async function handleBillConfirmOk() {
    const data = pendingBillDataRef.current;
    if (!data) return;
    setShowBillConfirm(false);
    setError('');
    setSaving(true);
    try {
      if (onAddAndBill) {
        await onAddAndBill(data);
      } else {
        await onSave(data);
        onClose();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save member.');
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

  const formContent = (
    <div className={pageMode ? 'amd-page-inner' : 'amd-dialog'} role={pageMode ? undefined : 'dialog'} aria-modal={pageMode ? undefined : true} aria-label="Add Member">
      {!pageMode && (
        <div className="amd-header">
          <h2 className="amd-title">Add Member</h2>
          <button className="amd-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>
      )}

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
              <p className="amd-section-badge">Personal Details</p>

              {/* Photo upload */}
              <div className="amd-photo-row">
                <div className="amd-photo-avatar" onClick={() => fileInputRef.current?.click()}>
                  {photoPreview
                    ? <img src={photoPreview} alt="Member photo" className="amd-photo-img" />
                    : <span className="amd-photo-placeholder">&#128100;</span>
                  }
                </div>
                <div className="amd-photo-actions">
                  <button type="button" className="amd-photo-btn" onClick={() => fileInputRef.current?.click()}>
                    Upload Image
                  </button>
                  <button type="button" className="amd-photo-btn amd-photo-btn-secondary">
                    Capture Image
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
              </div>

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
                <div className="amd-contact-row">
                  <input
                    type="tel"
                    value={contactNumber}
                    readOnly={!contactEditable}
                    className={contactEditable ? '' : 'amd-input-readonly'}
                    onChange={e => setContactNumber(e.target.value)}
                  />
                  {!contactEditable && (
                    <button type="button" className="amd-change-btn" onClick={() => setContactEditable(true)}>
                      Change
                    </button>
                  )}
                </div>
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
                  <div className="amd-radio-inline">
                    {GENDERS.map(g => (
                      <label key={g} className="amd-radio-opt">
                        <input
                          type="radio"
                          name="member_gender"
                          value={g}
                          checked={gender === g}
                          onChange={() => setGender(g)}
                        />
                        {g}
                      </label>
                    ))}
                  </div>
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
                  <p className="amd-section-badge">Emergency Contact</p>
                  <div className="amd-field">
                    <label>Name<Req fieldKey="mem_emergencyContact" /></label>
                    <input type="text" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
                  </div>
                  <div className="amd-field">
                    <label>Country Code</label>
                    <select value={emergencyCountryCode} onChange={e => setEmergencyCountryCode(e.target.value)}>
                      {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="amd-field">
                    <label>Number</label>
                    <input type="tel" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} />
                  </div>
                  <div className="amd-field">
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
                  <p className="amd-section-badge">Secondary Contact</p>
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

              {/* Member Manager section */}
              <p className="amd-section-badge">Member Manager</p>

              <div className="amd-field">
                <label>Sales Rep</label>
                <select value={salesRep} onChange={e => setSalesRep(e.target.value)}>
                  <option value="">Select</option>
                  {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="amd-field">
                <label>Member Manager</label>
                <select value={memberManager} onChange={e => setMemberManager(e.target.value)}>
                  <option value="">Select</option>
                  {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="amd-field">
                <label>Mailer List</label>
                <select value={mailerList} onChange={e => setMailerList(e.target.value)}>
                  <option value="">Select</option>
                  {MAILER_LISTS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="amd-field">
                <label>General Trainer</label>
                <select value={generalTrainer} onChange={e => setGeneralTrainer(e.target.value)}>
                  <option value="">Select</option>
                  {STAFF_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="amd-field">
                <label>Personal Trainer</label>
                <input type="text" value="" disabled className="amd-input-disabled" placeholder="—" />
              </div>

              {/* IDs section */}
              <p className="amd-section-badge">IDs</p>

              <div className="amd-field">
                <label>Attendance ID</label>
                <input type="text" value={attendanceId} onChange={e => setAttendanceId(e.target.value)} />
              </div>

              <div className="amd-field">
                <label>RF ID Card</label>
                <input type="text" value={rfIdCard} onChange={e => setRfIdCard(e.target.value)} />
              </div>

              <div className="amd-field">
                <label>Club ID</label>
                <input type="text" value={clubId} onChange={e => setClubId(e.target.value)} />
              </div>

              <div className="amd-field">
                <label>GST No</label>
                <input type="text" value={gstNo} onChange={e => setGstNo(e.target.value)} />
              </div>

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
                <p className="amd-section-badge">Apparel &amp; Shoes</p>
              )}

              {fieldEnabled(cfgMap, 'mem_tshirtSize') && (
                <div className="amd-field">
                  <label>T-Shirt Size</label>
                  <select value={tshirtSize} onChange={e => setTshirtSize(e.target.value)}>
                    <option value="">Select</option>
                    {tshirtItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
              )}

              {fieldEnabled(cfgMap, 'mem_shortsSize') && (
                <div className="amd-field">
                  <label>Shorts Size</label>
                  <select value={shortsSize} onChange={e => setShortsSize(e.target.value)}>
                    <option value="">Select</option>
                    {shortsItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
              )}

              {fieldEnabled(cfgMap, 'mem_shoesSize') && (
                <div className="amd-field">
                  <label>Shoes Size</label>
                  <select value={shoesSize} onChange={e => setShoesSize(e.target.value)}>
                    <option value="">Select</option>
                    {shoesItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
              )}

              {/* Communication Preference Settings */}
              <p className="amd-section-badge">Communication Preference Settings</p>
              <div className="amd-comm-prefs">
                {([
                  ['SMS',               commSms,      setCommSms],
                  ['Mail',              commMail,     setCommMail],
                  ['Push Notification', commPush,     setCommPush],
                  ['WhatsApp',          commWhatsapp, setCommWhatsapp],
                ] as [string, boolean, React.Dispatch<React.SetStateAction<boolean>>][]).map(([label, val, setter]) => (
                  <div key={label} className="amd-comm-row">
                    <span className="amd-comm-label">{label}</span>
                    <button
                      type="button"
                      className={`amd-comm-toggle ${val ? 'amd-comm-yes' : 'amd-comm-no'}`}
                      onClick={() => setter(v => !v)}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Fitness Profile Tab ─────────────────────────────────────────────── */}
        {activeTab === 'Fitness Profile' && (
          <div className="amd-fp-content">

            {fieldEnabled(cfgMap, 'mem_injuriesConditions') && (
              <div>
                <p className="amd-section-title">Injuries and conditions</p>
                {injuryItems.length > 0 ? (
                  <div className="amd-injury-grid">
                    {injuryItems.map(item => (
                      <label key={item.id} className="amd-injury-label">
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
                  <p className="amd-fp-empty">No injury/condition items configured in Setup → Fitness Profile.</p>
                )}
              </div>
            )}

            {fieldEnabled(cfgMap, 'mem_fitnessGoal') && (
              <div>
                <p className="amd-section-title">Fitness Goals</p>
                <div className="amd-fp-goals-row">
                  <div className="amd-field">
                    <label>Goal Type</label>
                    <select value={fitnessGoalType} onChange={e => setFitnessGoalType(e.target.value)}>
                      <option value="">Select</option>
                      {FITNESS_GOAL_TYPES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="amd-field">
                    <label>Start date</label>
                    <input type="date" value={fitnessGoalStart} onChange={e => setFitnessGoalStart(e.target.value)} />
                  </div>
                  <div className="amd-field">
                    <label>End date</label>
                    <input type="date" value={fitnessGoalEnd} onChange={e => setFitnessGoalEnd(e.target.value)} />
                  </div>
                  <div className="amd-field">
                    <label>Goal remarks</label>
                    <input
                      type="text"
                      maxLength={140}
                      placeholder="Maximum 140 characters"
                      value={fitnessGoalRemarks}
                      onChange={e => setFitnessGoalRemarks(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {hasExpertise && (
              <div>
                <p className="amd-section-title">Expertise</p>
                <div className="amd-fp-expertise-row">
                  {fieldEnabled(cfgMap, 'mem_expertiseLevel') && (
                    <div className="amd-field">
                      <label>Level</label>
                      <select value={expertiseLevel} onChange={e => setExpertiseLevel(e.target.value)}>
                        <option value="">Select</option>
                        {levelItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                      </select>
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_division') && (
                    <div className="amd-field">
                      <label>Division</label>
                      <select value={division} onChange={e => setDivision(e.target.value)}>
                        <option value="">Select</option>
                        {divisionItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                      </select>
                    </div>
                  )}
                  {fieldEnabled(cfgMap, 'mem_certification') && (
                    <div className="amd-field">
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
                <p className="amd-section-title">Activity Level</p>
                <div className="amd-field amd-fp-activity-field">
                  <label>Activity Level</label>
                  <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)}>
                    <option value="">Select</option>
                    {activityItems.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
              </div>
            )}

            {!hasFitnessFields && (
              <p className="amd-empty-tab">No fitness profile fields are enabled in Form Customization.</p>
            )}
          </div>
        )}

        {/* ── Additional Detail Fields ─────────────────── */}
        {additionalFields.length > 0 && (
          <div className="amd-additional-section">
            <p className="amd-section-title">Additional Details</p>
            <div className="amd-additional-grid">
              {additionalFields.map(af => (
                <div key={af.id} className="amd-field">
                  <label>
                    {af.caption || af.fieldType}
                    {af.required && <span className="amd-req"> *</span>}
                  </label>
                  {af.fieldType === 'TextBox' && (
                    <input
                      type="text"
                      placeholder={af.placeholder}
                      value={(additionalValues[af.id] as string) ?? ''}
                      onChange={e => setAdditionalValues(prev => ({ ...prev, [af.id]: e.target.value }))}
                    />
                  )}
                  {af.fieldType === 'MultiLine' && (
                    <textarea
                      rows={3}
                      placeholder={af.placeholder}
                      value={(additionalValues[af.id] as string) ?? ''}
                      onChange={e => setAdditionalValues(prev => ({ ...prev, [af.id]: e.target.value }))}
                    />
                  )}
                  {af.fieldType === 'DropDown' && (
                    <select
                      value={(additionalValues[af.id] as string) ?? ''}
                      onChange={e => setAdditionalValues(prev => ({ ...prev, [af.id]: e.target.value }))}
                    >
                      <option value="">Select</option>
                      {af.options.filter(Boolean).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  )}
                  {af.fieldType === 'RadioButton' && (
                    <div className="amd-radio-group">
                      {af.options.filter(Boolean).map(opt => (
                        <label key={opt} className="amd-radio-label">
                          <input
                            type="radio"
                            name={`ad_${af.id}`}
                            value={opt}
                            checked={(additionalValues[af.id] as string) === opt}
                            onChange={() => setAdditionalValues(prev => ({ ...prev, [af.id]: opt }))}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                  {af.fieldType === 'MultipleSelection' && (
                    <div className="amd-radio-group">
                      {af.options.filter(Boolean).map(opt => {
                        const vals = (additionalValues[af.id] as string[]) ?? [];
                        return (
                          <label key={opt} className="amd-radio-label">
                            <input
                              type="checkbox"
                              value={opt}
                              checked={vals.includes(opt)}
                              onChange={e => {
                                const next = e.target.checked
                                  ? [...vals, opt]
                                  : vals.filter(v => v !== opt);
                                setAdditionalValues(prev => ({ ...prev, [af.id]: next }));
                              }}
                            />
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

        {error && <p className="amd-error">{error}</p>}

        {pageMode ? (
          <div className="amd-footer amd-footer-page">
            <button type="button" className="amd-save-btn" disabled={saving} onClick={handleAddAndBillClick}>
              {saving ? 'Saving…' : 'Add Member & Bill'}
            </button>
            <button type="button" className="amd-save-btn" disabled={saving}>Add to Transfer</button>
            <button type="button" className="amd-save-btn" disabled={saving}>Sell Product</button>
            <button type="button" className="amd-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        ) : (
          <div className="amd-footer">
            <button type="button" className="amd-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="amd-save-btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save Member'}
            </button>
          </div>
        )}
      </form>
    </div>
  );

  return pageMode ? (
    <div className="amd-page">
      <div className="amd-page-breadcrumb">
        <span className="amd-page-bc-link">Home</span>
        <span className="amd-page-bc-sep"> / </span>
        <span className="amd-page-bc-link">Clients</span>
        <span className="amd-page-bc-sep"> / </span>
        <span className="amd-page-bc-active">Add Member</span>
      </div>
      {formContent}
      {showBillConfirm && (
        <div className="amd-confirm-overlay">
          <div className="amd-confirm-box">
            <p className="amd-confirm-msg">Would you like to save the details?</p>
            <div className="amd-confirm-actions">
              <button className="amd-save-btn" onClick={handleBillConfirmOk} disabled={saving}>OK</button>
              <button className="amd-cancel-btn" onClick={() => setShowBillConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="amd-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      {formContent}
    </div>
  );
}
