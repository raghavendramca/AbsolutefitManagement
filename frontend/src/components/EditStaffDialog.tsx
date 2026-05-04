import { useState, useRef, useEffect } from 'react';
import { staffApi, type StaffMember, type CreateStaffDto } from '../api/staff';
import { STAFF_DESIGNATIONS, STAFF_ADMIN_RIGHTS } from '../constants/staffConstants';
import './EditStaffDialog.css';

const COUNTRY_CODES = [
  { label: 'India (+91)', value: '+91' },
  { label: 'USA (+1)',    value: '+1'  },
  { label: 'UK (+44)',    value: '+44' },
  { label: 'UAE (+971)',  value: '+971' },
  { label: 'Australia (+61)', value: '+61' },
];
const DESIGNATIONS     = ['', ...STAFF_DESIGNATIONS];
const ADMIN_RIGHTS     = ['', ...STAFF_ADMIN_RIGHTS];
const EMP_CATEGORIES   = ['', 'Employee', 'Full-time', 'Part-time', 'Contract', 'Intern', 'Freelance'];
const PAYOUT_TYPES     = ['', 'Fixed', 'Monthly', 'Weekly', 'Daily', 'Per Session'];
const GRADES           = ['', 'A', 'B', 'C', 'D', 'E'];
const BIOMETRIC_ACCESS = ['', 'User', 'Admin', 'None'];
const DOCUMENT_TYPES   = ['', 'Offer letter', 'Appointment letter', 'ID Proof', 'Address Proof', 'Photo', 'Education Certificate', 'Other'];
const DOC_PAGE_SIZE    = 10;

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHIFT_OPTIONS = [
  { value: '',        label: 'Select' },
  { value: 'branch',  label: 'Branch Working Hours (05:00 AM-10:00 PM)' },
  { value: 'am',      label: '05:00 AM-01:00 PM' },
  { value: 'pm',      label: '01:00 PM-10:00 PM' },
  { value: 'morning', label: '06:00 AM-02:00 PM' },
  { value: 'evening', label: '02:00 PM-10:00 PM' },
];

type DaySchedule = { isHoliday: boolean; shift1: string; shift2: string };
interface StaffDocument {
  id: string;
  date: string;
  documentType: string;
  documentName: string;
  fileBase64?: string;
  fileName?: string;
}
type Tab = 'profile' | 'hours' | 'documents';

interface Props {
  gymId: string;
  staffId: string;
  staffList: StaffMember[];
  onClose: () => void;
  onUpdate: (updated: StaffMember) => void;
}

export default function EditStaffDialog({ gymId, staffId, staffList, onClose, onUpdate }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const docFileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab]       = useState<Tab>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [errors, setErrors]   = useState<Record<string, string>>({});

  // Left column
  const [photoBase64, setPhotoBase64]         = useState('');
  const [fullName, setFullName]               = useState('');
  const [countryCode, setCountryCode]         = useState('+91');
  const [contact, setContact]                 = useState('');
  const [email, setEmail]                     = useState('');
  const [gender, setGender]                   = useState('');
  const [vaccinated, setVaccinated]           = useState('');
  const [loginAccess, setLoginAccess]         = useState(false);
  const [password, setPassword]               = useState('');
  const [showPass, setShowPass]               = useState(false);
  const [resumeBase64, setResumeBase64]       = useState('');
  const [resumeName, setResumeName]           = useState('');
  const [empCategory, setEmpCategory]         = useState('');
  const [payoutType, setPayoutType]           = useState('');
  const [grade, setGrade]                     = useState('');
  const [biometricAccess, setBiometricAccess] = useState('');

  // Right column
  const [dob, setDob]                   = useState('');
  const [anniversary, setAnniversary]   = useState('');
  const [salary, setSalary]             = useState('');
  const [designation, setDesignation]   = useState('');
  const [adminRights, setAdminRights]   = useState('');
  const [joinDate, setJoinDate]         = useState('');
  const [attendanceId, setAttendanceId] = useState('');
  const [rfIdCard, setRfIdCard]         = useState('');
  const [panCard, setPanCard]           = useState('');
  const [gstNumber, setGstNumber]       = useState('');
  const [accountNo, setAccountNo]       = useState('');
  const [ifsc, setIfsc]                 = useState('');
  const [hrmsId, setHrmsId]             = useState('');
  const [leaveStaff, setLeaveStaff]     = useState('');

  // Working Hours tab
  const [timeRestriction, setTimeRestriction] = useState(false);
  const [workingHours, setWorkingHours] = useState<Record<string, DaySchedule>>(() =>
    Object.fromEntries(DAYS.map(d => [d.toLowerCase(), { isHoliday: false, shift1: 'branch', shift2: '' }]))
  );
  const [hoursSaving, setHoursSaving] = useState(false);

  // Documents tab
  const [documents, setDocuments]     = useState<StaffDocument[]>([]);
  const [docType, setDocType]         = useState('');
  const [docName, setDocName]         = useState('');
  const [docFileName, setDocFileName] = useState('');
  const [docBase64, setDocBase64]     = useState('');
  const [docError, setDocError]       = useState('');
  const [docSaving, setDocSaving]     = useState(false);
  const [docPage, setDocPage]         = useState(1);
  const [editDocId, setEditDocId]     = useState<string | null>(null);

  useEffect(() => {
    staffApi.getById(gymId, staffId).then(s => {
      setFullName(s.fullName);
      setCountryCode(s.countryCode ?? '+91');
      setContact(s.contactNumber ?? '');
      setEmail(s.email ?? '');
      setGender(s.gender ?? '');
      setDesignation(s.designation ?? '');
      setAdminRights(s.adminRights ?? '');
      setAttendanceId(s.attendanceId ?? '');
      setSalary(s.salary != null ? String(s.salary) : '');
      setJoinDate(s.joinDate ?? '');

      if (s.extendedFieldsJson) {
        try {
          const ext = JSON.parse(s.extendedFieldsJson);
          setPhotoBase64(ext.photoBase64 ?? '');
          setVaccinated(ext.vaccinated ?? '');
          setLoginAccess(ext.loginAccess ?? false);
          setPassword(ext.password ?? '');
          setResumeBase64(ext.resumeBase64 ?? '');
          setResumeName(ext.resumeBase64 ? 'resume (uploaded)' : '');
          setEmpCategory(ext.empCategory ?? '');
          setPayoutType(ext.payoutType ?? '');
          setGrade(ext.grade ?? '');
          setBiometricAccess(ext.biometricAccess ?? '');
          setDob(ext.dob ?? '');
          setAnniversary(ext.anniversary ?? '');
          setRfIdCard(ext.rfIdCard ?? '');
          setPanCard(ext.panCard ?? '');
          setGstNumber(ext.gstNumber ?? '');
          setAccountNo(ext.accountNo ?? '');
          setIfsc(ext.ifsc ?? '');
          setHrmsId(ext.hrmsId ?? '');
          setLeaveStaff(ext.leaveStaff ?? '');
          if (ext.timeRestriction !== undefined) setTimeRestriction(ext.timeRestriction);
          if (ext.workingHours) setWorkingHours(ext.workingHours);
          if (Array.isArray(ext.documents)) setDocuments(ext.documents);
        } catch { /* ignore parse errors */ }
      }
    }).catch(() => setError('Failed to load staff details.')).finally(() => setLoading(false));
  }, [gymId, staffId]);

  function buildExtJson(docs: StaffDocument[]) {
    return JSON.stringify({
      vaccinated, loginAccess,
      password: loginAccess ? password : '',
      resumeBase64, empCategory, payoutType, grade, biometricAccess,
      dob, anniversary, rfIdCard, panCard, gstNumber, accountNo, ifsc, hrmsId,
      leaveStaff, photoBase64, timeRestriction, workingHours,
      documents: docs,
    });
  }

  function buildDto(extJson: string): CreateStaffDto {
    return {
      fullName: fullName.trim(),
      contactNumber: contact.trim(),
      countryCode,
      email: email.trim() || undefined,
      gender: gender || undefined,
      designation: designation || undefined,
      adminRights: adminRights || undefined,
      attendanceId: attendanceId.trim() || undefined,
      salary: salary ? parseFloat(salary) : undefined,
      joinDate: joinDate || undefined,
      extendedFieldsJson: extJson,
    };
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!fullName.trim())  e.fullName    = 'Full Name is required.';
    if (!contact.trim())   e.contact     = 'Contact Number is required.';
    if (!email.trim())     e.email       = 'Email is required.';
    if (!gender)           e.gender      = 'Please select gender.';
    if (!designation)      e.designation = 'Job Designation is required.';
    if (!adminRights)      e.adminRights = 'Admin Rights is required.';
    if (loginAccess && !password.trim()) e.password = 'Password is required when Login Access is enabled.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleUpdate() {
    if (!validate()) return;
    setSaving(true);
    setError('');
    try {
      const updated = await staffApi.update(gymId, staffId, buildDto(buildExtJson(documents)));
      onUpdate(updated);
      onClose();
    } catch {
      setError('Failed to update staff. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleHoursSubmit() {
    setHoursSaving(true);
    setError('');
    try {
      const updated = await staffApi.update(gymId, staffId, buildDto(buildExtJson(documents)));
      onUpdate(updated);
    } catch {
      setError('Failed to save working hours. Please try again.');
    } finally {
      setHoursSaving(false);
    }
  }

  function updateDaySchedule(day: string, patch: Partial<DaySchedule>) {
    setWorkingHours(prev => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoBase64(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeName(file.name);
    const reader = new FileReader();
    reader.onload = () => setResumeBase64(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleDocFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setDocBase64(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleAddDocument() {
    setDocError('');
    if (!docType) { setDocError('Document Type is required.'); return; }
    if (!docName.trim()) { setDocError('Document name is required.'); return; }

    setDocSaving(true);
    try {
      let updatedDocs: StaffDocument[];
      if (editDocId) {
        updatedDocs = documents.map(d =>
          d.id === editDocId
            ? { ...d, documentType: docType, documentName: docName.trim(), ...(docBase64 ? { fileBase64: docBase64, fileName: docFileName } : {}) }
            : d
        );
      } else {
        const newDoc: StaffDocument = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('en-GB'),
          documentType: docType,
          documentName: docName.trim(),
          ...(docBase64 ? { fileBase64: docBase64, fileName: docFileName } : {}),
        };
        updatedDocs = [...documents, newDoc];
      }

      await staffApi.update(gymId, staffId, buildDto(buildExtJson(updatedDocs)));
      setDocuments(updatedDocs);
      setDocType('');
      setDocName('');
      setDocBase64('');
      setDocFileName('');
      setEditDocId(null);
      if (docFileRef.current) docFileRef.current.value = '';
      if (!editDocId) setDocPage(Math.ceil(updatedDocs.length / DOC_PAGE_SIZE) || 1);
    } catch {
      setDocError('Failed to save document. Please try again.');
    } finally {
      setDocSaving(false);
    }
  }

  async function handleDeleteDoc(id: string) {
    const updatedDocs = documents.filter(d => d.id !== id);
    try {
      await staffApi.update(gymId, staffId, buildDto(buildExtJson(updatedDocs)));
      setDocuments(updatedDocs);
      const totalPages = Math.max(1, Math.ceil(updatedDocs.length / DOC_PAGE_SIZE));
      if (docPage > totalPages) setDocPage(totalPages);
    } catch { /* silently ignore */ }
  }

  function handleEditDoc(doc: StaffDocument) {
    setEditDocId(doc.id);
    setDocType(doc.documentType);
    setDocName(doc.documentName);
    setDocBase64(doc.fileBase64 ?? '');
    setDocFileName(doc.fileName ?? '');
    setDocError('');
  }

  function cancelDocEdit() {
    setEditDocId(null);
    setDocType('');
    setDocName('');
    setDocBase64('');
    setDocFileName('');
    setDocError('');
    if (docFileRef.current) docFileRef.current.value = '';
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  const otherStaff    = staffList.filter(s => s.id !== staffId);
  const totalDocPages = Math.max(1, Math.ceil(documents.length / DOC_PAGE_SIZE));
  const pagedDocs     = documents.slice((docPage - 1) * DOC_PAGE_SIZE, docPage * DOC_PAGE_SIZE);

  return (
    <div className="esd-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="esd-dialog">
        {/* Header */}
        <div className="esd-header">
          <div className="esd-breadcrumb">
            <span className="esd-bc-link">Home</span>
            <span className="esd-bc-sep">/</span>
            <span className="esd-bc-link">Staff</span>
            <span className="esd-bc-sep">/</span>
            <span className="esd-bc-active">Edit Staff Details</span>
          </div>
          <button className="esd-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="esd-tabs">
          <button className={`esd-tab${tab === 'profile'   ? ' esd-tab-active' : ''}`} onClick={() => setTab('profile')}>Profile</button>
          <button className={`esd-tab${tab === 'hours'     ? ' esd-tab-active' : ''}`} onClick={() => setTab('hours')}>Working Hours</button>
          <button className={`esd-tab${tab === 'documents' ? ' esd-tab-active' : ''}`} onClick={() => setTab('documents')}>Documents</button>
        </div>
        <div className="esd-tab-divider" />

        {/* Body */}
        <div className="esd-body">
          {loading ? (
            <p className="esd-loading">Loading…</p>
          ) : tab === 'profile' ? (
            <div className="esd-2col">

              {/* ── LEFT COLUMN ─────────────────────────────── */}
              <div className="esd-col">
                <div className="esd-photo-section">
                  <div className="esd-photo-placeholder">
                    {photoBase64
                      ? <img src={photoBase64} alt="staff" className="esd-photo-img" />
                      : <svg viewBox="0 0 80 80" fill="none" className="esd-photo-svg"><circle cx="40" cy="30" r="18" fill="#ccc"/><ellipse cx="40" cy="68" rx="28" ry="16" fill="#ccc"/></svg>
                    }
                  </div>
                  <div className="esd-photo-actions">
                    <span className="esd-biometric-label">Biometric Access : fingerprint</span>
                    <div className="esd-photo-btns">
                      <label className="esd-upload-btn">
                        Upload Image
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                      </label>
                      <button type="button" className="esd-capture-btn">Capture Image</button>
                    </div>
                  </div>
                </div>

                <div className="esd-field">
                  <label className="esd-label">Full Name <span className="esd-req">*</span></label>
                  <input className={`esd-input${errors.fullName ? ' esd-input-err' : ''}`} value={fullName} onChange={e => setFullName(e.target.value)} />
                  {errors.fullName && <span className="esd-err-msg">{errors.fullName}</span>}
                </div>

                <div className="esd-field">
                  <label className="esd-label">Country Code</label>
                  <select className="esd-select" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                    {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <div className="esd-field">
                  <label className="esd-label">Contact Number <span className="esd-req">*</span></label>
                  <input className={`esd-input${errors.contact ? ' esd-input-err' : ''}`} value={contact} onChange={e => setContact(e.target.value)} />
                  {errors.contact && <span className="esd-err-msg">{errors.contact}</span>}
                </div>

                <div className="esd-field">
                  <label className="esd-label">Email <span className="esd-req">*</span></label>
                  <input className={`esd-input${errors.email ? ' esd-input-err' : ''}`} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  {errors.email && <span className="esd-err-msg">{errors.email}</span>}
                </div>

                <div className="esd-field">
                  <label className="esd-label">Gender <span className="esd-req">*</span></label>
                  <div className="esd-radio-row">
                    {['Male', 'Female'].map(g => (
                      <label key={g} className="esd-radio-label">
                        <input type="radio" name="esd-gender" value={g} checked={gender === g} onChange={() => setGender(g)} />
                        {g}
                      </label>
                    ))}
                  </div>
                  {errors.gender && <span className="esd-err-msg">{errors.gender}</span>}
                </div>

                <div className="esd-field">
                  <label className="esd-label">Vaccinated</label>
                  <div className="esd-radio-row">
                    {['Yes', 'No'].map(v => (
                      <label key={v} className="esd-radio-label">
                        <input type="radio" name="esd-vaccinated" value={v} checked={vaccinated === v} onChange={() => setVaccinated(v)} />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="esd-field esd-field-inline">
                  <label className="esd-label">Login Access</label>
                  <button
                    type="button"
                    className={`esd-toggle${loginAccess ? ' esd-toggle-on' : ' esd-toggle-off'}`}
                    onClick={() => setLoginAccess(v => !v)}
                  >
                    <span className="esd-toggle-label">{loginAccess ? 'Yes' : 'No'}</span>
                    <span className="esd-toggle-thumb" />
                  </button>
                </div>

                <div className="esd-field">
                  <label className="esd-label">Password {loginAccess && <span className="esd-req">*</span>}</label>
                  <div className="esd-pass-wrap">
                    <input
                      className={`esd-input esd-pass-input${errors.password ? ' esd-input-err' : ''}`}
                      type={showPass ? 'text' : 'password'}
                      placeholder="8 to 12 characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button type="button" className="esd-pass-eye" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                      {showPass
                        ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="10" cy="10" r="2"/><line x1="3" y1="3" x2="17" y2="17"/></svg>
                        : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="10" cy="10" r="2"/></svg>
                      }
                    </button>
                  </div>
                  {errors.password && <span className="esd-err-msg">{errors.password}</span>}
                </div>

                <div className="esd-field">
                  <label className="esd-label">Upload Resume</label>
                  <label className="esd-file-label">
                    <span className="esd-file-btn">Choose File</span>
                    <span className="esd-file-name">{resumeName || 'No file chosen'}</span>
                    <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleResumeChange} />
                  </label>
                </div>

                <div className="esd-field">
                  <label className="esd-label">Employee Category</label>
                  <select className="esd-select" value={empCategory} onChange={e => setEmpCategory(e.target.value)}>
                    {EMP_CATEGORIES.map(c => <option key={c} value={c}>{c || 'Select'}</option>)}
                  </select>
                </div>

                <div className="esd-field">
                  <label className="esd-label">Payout type</label>
                  <select className="esd-select" value={payoutType} onChange={e => setPayoutType(e.target.value)}>
                    {PAYOUT_TYPES.map(p => <option key={p} value={p}>{p || 'Select'}</option>)}
                  </select>
                </div>

                <div className="esd-field">
                  <label className="esd-label">Grade</label>
                  <select className="esd-select" value={grade} onChange={e => setGrade(e.target.value)}>
                    {GRADES.map(g => <option key={g} value={g}>{g || 'Select'}</option>)}
                  </select>
                </div>

                <div className="esd-field">
                  <label className="esd-label">Biometric device access</label>
                  <select className="esd-select" value={biometricAccess} onChange={e => setBiometricAccess(e.target.value)}>
                    {BIOMETRIC_ACCESS.map(b => <option key={b} value={b}>{b || 'Select'}</option>)}
                  </select>
                </div>
              </div>

              {/* ── RIGHT COLUMN ────────────────────────────── */}
              <div className="esd-col">
                <div className="esd-field">
                  <label className="esd-label">Date of Birth</label>
                  <input className="esd-input" type="date" value={dob} onChange={e => setDob(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">Anniversary</label>
                  <input className="esd-input" type="date" value={anniversary} onChange={e => setAnniversary(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">Salary</label>
                  <input className="esd-input" type="number" min="0" step="0.01" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">Job Designation <span className="esd-req">*</span></label>
                  <select className={`esd-select${errors.designation ? ' esd-input-err' : ''}`} value={designation} onChange={e => setDesignation(e.target.value)}>
                    {DESIGNATIONS.map(d => <option key={d} value={d}>{d || 'Select'}</option>)}
                  </select>
                  {errors.designation && <span className="esd-err-msg">{errors.designation}</span>}
                </div>

                <div className="esd-field">
                  <label className="esd-label">Admin Rights <span className="esd-req">*</span></label>
                  <select className={`esd-select${errors.adminRights ? ' esd-input-err' : ''}`} value={adminRights} onChange={e => setAdminRights(e.target.value)}>
                    {ADMIN_RIGHTS.map(r => <option key={r} value={r}>{r || 'Select'}</option>)}
                  </select>
                  {errors.adminRights && <span className="esd-err-msg">{errors.adminRights}</span>}
                </div>

                <div className="esd-field">
                  <label className="esd-label">Date of Joining</label>
                  <input className="esd-input" type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">Attendance ID</label>
                  <input className="esd-input esd-input-readonly" value={attendanceId} readOnly />
                </div>

                <div className="esd-field">
                  <label className="esd-label">RF ID Card</label>
                  <input className="esd-input" value={rfIdCard} onChange={e => setRfIdCard(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">PAN Card</label>
                  <input className="esd-input" value={panCard} onChange={e => setPanCard(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">GST number</label>
                  <input className="esd-input" value={gstNumber} onChange={e => setGstNumber(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">Account No</label>
                  <input className="esd-input" value={accountNo} onChange={e => setAccountNo(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">IFSC</label>
                  <input className="esd-input" value={ifsc} onChange={e => setIfsc(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">HRMS ID</label>
                  <input className="esd-input" value={hrmsId} onChange={e => setHrmsId(e.target.value)} />
                </div>

                <div className="esd-field">
                  <label className="esd-label">Leave Staff <span className="esd-req">*</span></label>
                  <select className="esd-select" value={leaveStaff} onChange={e => setLeaveStaff(e.target.value)}>
                    <option value="">Select</option>
                    {otherStaff.map(s => <option key={s.id} value={s.fullName}>{s.fullName}</option>)}
                  </select>
                </div>
              </div>
            </div>

          ) : tab === 'hours' ? (
            <div className="esd-hours-panel">
              <div className="esd-hours-meta">
                <div className="esd-hours-meta-row">
                  <span className="esd-hours-meta-label">Staff Name</span>
                  <span className="esd-hours-meta-value">{fullName}</span>
                </div>
                <div className="esd-hours-meta-row">
                  <span className="esd-hours-meta-label">Time Restriction</span>
                  <button
                    type="button"
                    className={`esd-toggle${timeRestriction ? ' esd-toggle-on' : ' esd-toggle-off'}`}
                    onClick={() => setTimeRestriction(v => !v)}
                  >
                    <span className="esd-toggle-label">{timeRestriction ? 'Yes' : 'No'}</span>
                    <span className="esd-toggle-thumb" />
                  </button>
                </div>
              </div>

              <h4 className="esd-shift-heading">Shift Time</h4>

              <table className="esd-shift-table">
                <thead>
                  <tr>
                    <th className="esd-th-day">Days</th>
                    <th className="esd-th-shift">Shift 1</th>
                    <th className="esd-th-shift">Shift 2</th>
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map(day => {
                    const key = day.toLowerCase();
                    const row = workingHours[key] ?? { isHoliday: false, shift1: 'branch', shift2: '' };
                    return (
                      <tr key={day}>
                        <td className="esd-td-day">{day}</td>
                        <td className="esd-td-shift">
                          <div className="esd-shift1-cell">
                            <label className="esd-holiday-label">
                              <input
                                type="checkbox"
                                checked={row.isHoliday}
                                onChange={e => updateDaySchedule(key, { isHoliday: e.target.checked })}
                              />
                              Weekly Holiday
                            </label>
                            <select
                              className="esd-shift-select"
                              value={row.shift1}
                              disabled={row.isHoliday}
                              onChange={e => updateDaySchedule(key, { shift1: e.target.value })}
                            >
                              {SHIFT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                          </div>
                        </td>
                        <td className="esd-td-shift">
                          <select
                            className="esd-shift-select"
                            value={row.shift2}
                            disabled={row.isHoliday}
                            onChange={e => updateDaySchedule(key, { shift2: e.target.value })}
                          >
                            {SHIFT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {error && <p className="esd-global-err">{error}</p>}

              <div className="esd-hours-actions">
                <button className="esd-btn-submit" disabled={hoursSaving} onClick={handleHoursSubmit}>
                  {hoursSaving ? 'Saving…' : 'Submit'}
                </button>
              </div>
            </div>

          ) : (
            /* ── DOCUMENTS TAB ─────────────────────────────── */
            <div className="esd-docs-panel">
              <div className="esd-docs-form">
                <div className="esd-docs-row">
                  <span className="esd-docs-label">Staff Name</span>
                  <span className="esd-docs-value">{fullName}</span>
                </div>
                <div className="esd-docs-row">
                  <label className="esd-docs-label">Document Type <span className="esd-req">*</span></label>
                  <select className="esd-select esd-docs-ctrl" value={docType} onChange={e => setDocType(e.target.value)}>
                    {DOCUMENT_TYPES.map(t => <option key={t} value={t}>{t || 'Select'}</option>)}
                  </select>
                </div>
                <div className="esd-docs-row">
                  <label className="esd-docs-label">Document name <span className="esd-req">*</span></label>
                  <input className="esd-input esd-docs-ctrl" value={docName} onChange={e => setDocName(e.target.value)} />
                </div>
                <div className="esd-docs-row">
                  <label className="esd-docs-label">Upload Document</label>
                  <label className="esd-file-label esd-docs-ctrl">
                    <span className="esd-file-btn">Choose File</span>
                    <span className="esd-file-name">{docFileName || 'No file chosen'}</span>
                    <input ref={docFileRef} type="file" style={{ display: 'none' }} onChange={handleDocFileChange} />
                  </label>
                </div>
                {docError && <p className="esd-err-msg esd-docs-err">{docError}</p>}
                <div className="esd-docs-btns">
                  <button className="esd-btn-add-doc" disabled={docSaving} onClick={handleAddDocument}>
                    {docSaving ? 'Saving…' : editDocId ? 'Update Document' : 'Add Document'}
                  </button>
                  {editDocId && (
                    <button className="esd-btn-doc-cancel" onClick={cancelDocEdit}>Cancel Edit</button>
                  )}
                </div>
              </div>

              <div className="esd-docs-page-row">
                <button className="esd-page-btn" disabled={docPage <= 1} onClick={() => setDocPage(1)}>⟨⟨</button>
                <button className="esd-page-btn" disabled={docPage <= 1} onClick={() => setDocPage(p => Math.max(1, p - 1))}>⟨</button>
                <span className="esd-page-info">Page {docPage} of {totalDocPages}</span>
                <button className="esd-page-btn" disabled={docPage >= totalDocPages} onClick={() => setDocPage(p => Math.min(totalDocPages, p + 1))}>⟩</button>
                <button className="esd-page-btn" disabled={docPage >= totalDocPages} onClick={() => setDocPage(totalDocPages)}>⟩⟩</button>
              </div>

              <table className="esd-docs-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Staff Name</th>
                    <th>Document Type</th>
                    <th>Document Name</th>
                    <th>Document</th>
                    <th>Edit</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedDocs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="esd-no-results">No Results Found.</td>
                    </tr>
                  ) : (
                    pagedDocs.map((doc, idx) => (
                      <tr key={doc.id}>
                        <td>{(docPage - 1) * DOC_PAGE_SIZE + idx + 1}</td>
                        <td>{doc.date}</td>
                        <td>{fullName}</td>
                        <td>{doc.documentType}</td>
                        <td>{doc.documentName}</td>
                        <td>
                          {doc.fileBase64
                            ? <a href={doc.fileBase64} download={doc.fileName || 'document'} className="esd-doc-link">View</a>
                            : '—'}
                        </td>
                        <td>
                          <button className="esd-doc-action-btn" onClick={() => handleEditDoc(doc)}>Edit</button>
                        </td>
                        <td>
                          <button className="esd-doc-action-btn esd-doc-delete-btn" onClick={() => handleDeleteDoc(doc.id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {error && tab !== 'hours' && <p className="esd-global-err">{error}</p>}
        </div>

        {/* Footer */}
        <div className="esd-footer">
          <button className="esd-btn-update" disabled={saving || loading} onClick={handleUpdate}>
            {saving ? 'Updating…' : 'Update'}
          </button>
          <button className="esd-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="esd-btn-fingerprint">Delete Fingerprint</button>
        </div>
      </div>
    </div>
  );
}
