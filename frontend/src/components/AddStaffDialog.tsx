import { useState, useRef } from 'react';
import type { CreateStaffDto } from '../api/staff';
import { STAFF_DESIGNATIONS, STAFF_ADMIN_RIGHTS } from '../constants/staffConstants';
import './AddStaffDialog.css';

const COUNTRY_CODES = [
  { label: 'India (+91)', value: '+91' },
  { label: 'USA (+1)',    value: '+1'  },
  { label: 'UK (+44)',    value: '+44' },
  { label: 'UAE (+971)',  value: '+971' },
  { label: 'Australia (+61)', value: '+61' },
];

const DESIGNATIONS   = ['Select', ...STAFF_DESIGNATIONS];
const ADMIN_RIGHTS   = ['Select', ...STAFF_ADMIN_RIGHTS];
const EMP_CATEGORIES = ['Select', 'Full-time', 'Part-time', 'Contract', 'Intern', 'Freelance'];
const PAYOUT_TYPES   = ['Select', 'Monthly', 'Weekly', 'Daily', 'Per Session'];
const GRADES         = ['Select', 'A', 'B', 'C', 'D', 'E'];

interface Props {
  gymId: string;
  onClose: () => void;
  onSave: (data: CreateStaffDto) => Promise<StaffMember>;
}

interface StaffMember { id: string; staffCode: number; fullName: string; email: string | null; attendanceId: string | null; adminRights: string | null; designation: string | null; isActive: boolean; }

export default function AddStaffDialog({ gymId: _gymId, onClose, onSave }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  // Left column fields
  const [photoBase64, setPhotoBase64] = useState('');
  const [fullName, setFullName]       = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contact, setContact]         = useState('');
  const [email, setEmail]             = useState('');
  const [gender, setGender]           = useState('');
  const [vaccinated, setVaccinated]   = useState('');
  const [loginAccess, setLoginAccess] = useState(true);
  const [password, setPassword]       = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [resumeBase64, setResumeBase64] = useState('');
  const [resumeName, setResumeName]   = useState('');
  const [empCategory, setEmpCategory] = useState('');
  const [payoutType, setPayoutType]   = useState('');
  const [grade, setGrade]             = useState('');

  // Right column fields
  const [dob, setDob]               = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [salary, setSalary]         = useState('');
  const [designation, setDesignation] = useState('');
  const [adminRights, setAdminRights] = useState('');
  const [joinDate, setJoinDate]     = useState('');
  const [attendanceId, setAttendanceId] = useState('');
  const [panCard, setPanCard]       = useState('');
  const [gstNumber, setGstNumber]   = useState('');
  const [accountNo, setAccountNo]   = useState('');
  const [ifsc, setIfsc]             = useState('');
  const [hrmsId, setHrmsId]         = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!fullName.trim())  e.fullName  = 'Full Name is required.';
    if (!contact.trim())   e.contact   = 'Contact Number is required.';
    if (!email.trim())     e.email     = 'Email is required.';
    if (!gender)           e.gender    = 'Please select gender.';
    if (!designation || designation === 'Select') e.designation = 'Job Designation is required.';
    if (!adminRights || adminRights === 'Select') e.adminRights = 'Admin Rights is required.';
    if (loginAccess && !password.trim()) e.password = 'Password is required when Login Access is enabled.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSaving(true);
    setError('');
    try {
      const extended = JSON.stringify({
        vaccinated,
        loginAccess,
        password: loginAccess ? password : '',
        resumeBase64,
        empCategory,
        payoutType,
        grade,
        dob,
        anniversary,
        panCard,
        gstNumber,
        accountNo,
        ifsc,
        hrmsId,
        photoBase64,
      });
      await onSave({
        fullName: fullName.trim(),
        contactNumber: contact.trim(),
        countryCode,
        email: email.trim() || undefined,
        gender: gender || undefined,
        designation: designation !== 'Select' ? designation : undefined,
        adminRights: adminRights !== 'Select' ? adminRights : undefined,
        attendanceId: attendanceId.trim() || undefined,
        salary: salary ? parseFloat(salary) : undefined,
        joinDate: joinDate || undefined,
        extendedFieldsJson: extended,
      });
      onClose();
    } catch {
      setError('Failed to save staff. Please try again.');
    } finally {
      setSaving(false);
    }
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

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div className="asd-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="asd-dialog">
        {/* Header */}
        <div className="asd-header">
          <span className="asd-title">Add Staff</span>
          <button className="asd-close" onClick={onClose}>✕</button>
        </div>
        <div className="asd-divider" />

        {/* Body */}
        <div className="asd-body">
          <div className="asd-2col">

            {/* ── LEFT COLUMN ─────────────────────────────── */}
            <div className="asd-col">
              {/* Photo */}
              <div className="asd-photo-row">
                <div className="asd-photo-placeholder">
                  {photoBase64
                    ? <img src={photoBase64} alt="staff" className="asd-photo-img" />
                    : <svg viewBox="0 0 80 80" fill="none" className="asd-photo-svg"><circle cx="40" cy="30" r="18" fill="#ccc"/><ellipse cx="40" cy="68" rx="28" ry="16" fill="#ccc"/></svg>
                  }
                </div>
                <label className="asd-upload-img-btn">
                  Upload Image
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                </label>
              </div>

              <div className="asd-field">
                <label className="asd-label">Full Name <span className="asd-req">*</span></label>
                <input className={`asd-input${errors.fullName ? ' asd-input-err' : ''}`} placeholder="First Name and Last Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                {errors.fullName && <span className="asd-err-msg">{errors.fullName}</span>}
              </div>

              <div className="asd-field">
                <label className="asd-label">Country Code</label>
                <select className="asd-select" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                  {COUNTRY_CODES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              <div className="asd-field">
                <label className="asd-label">Contact Number <span className="asd-req">*</span></label>
                <input className={`asd-input${errors.contact ? ' asd-input-err' : ''}`} placeholder="" value={contact} onChange={e => setContact(e.target.value)} />
                {errors.contact && <span className="asd-err-msg">{errors.contact}</span>}
              </div>

              <div className="asd-field">
                <label className="asd-label">Email <span className="asd-req">*</span></label>
                <input className={`asd-input${errors.email ? ' asd-input-err' : ''}`} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <span className="asd-err-msg">{errors.email}</span>}
              </div>

              <div className="asd-field">
                <label className="asd-label">Gender <span className="asd-req">*</span></label>
                <div className="asd-radio-row">
                  {['Male', 'Female'].map(g => (
                    <label key={g} className="asd-radio-label">
                      <input type="radio" name="gender" value={g} checked={gender === g} onChange={() => setGender(g)} />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.gender && <span className="asd-err-msg">{errors.gender}</span>}
              </div>

              <div className="asd-field">
                <label className="asd-label">Vaccinated</label>
                <div className="asd-radio-row">
                  {['Yes', 'No'].map(v => (
                    <label key={v} className="asd-radio-label">
                      <input type="radio" name="vaccinated" value={v} checked={vaccinated === v} onChange={() => setVaccinated(v)} />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div className="asd-field asd-field-inline">
                <label className="asd-label">Login Access</label>
                <button
                  type="button"
                  className={`asd-toggle${loginAccess ? ' asd-toggle-on' : ' asd-toggle-off'}`}
                  onClick={() => setLoginAccess(v => !v)}
                >
                  <span className="asd-toggle-label">{loginAccess ? 'Yes' : 'No'}</span>
                  <span className="asd-toggle-thumb" />
                </button>
              </div>

              <div className="asd-field">
                <label className="asd-label">Password {loginAccess && <span className="asd-req">*</span>}</label>
                <div className="asd-pass-wrap">
                  <input
                    className={`asd-input asd-pass-input${errors.password ? ' asd-input-err' : ''}`}
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button type="button" className="asd-pass-eye" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                    {showPass
                      ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="10" cy="10" r="2"/><line x1="3" y1="3" x2="17" y2="17"/></svg>
                      : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="10" cy="10" r="2"/></svg>
                    }
                  </button>
                </div>
                {errors.password && <span className="asd-err-msg">{errors.password}</span>}
              </div>

              <div className="asd-field">
                <label className="asd-label">Upload Resume</label>
                <label className="asd-file-label">
                  <span className="asd-file-btn">Choose File</span>
                  <span className="asd-file-name">{resumeName || 'No file chosen'}</span>
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleResumeChange} />
                </label>
              </div>

              <div className="asd-field">
                <label className="asd-label">Employee Category</label>
                <select className="asd-select" value={empCategory} onChange={e => setEmpCategory(e.target.value)}>
                  {EMP_CATEGORIES.map(c => <option key={c} value={c === 'Select' ? '' : c}>{c}</option>)}
                </select>
              </div>

              <div className="asd-field">
                <label className="asd-label">Payout type</label>
                <select className="asd-select" value={payoutType} onChange={e => setPayoutType(e.target.value)}>
                  {PAYOUT_TYPES.map(p => <option key={p} value={p === 'Select' ? '' : p}>{p}</option>)}
                </select>
              </div>

              <div className="asd-field">
                <label className="asd-label">Grade</label>
                <select className="asd-select" value={grade} onChange={e => setGrade(e.target.value)}>
                  {GRADES.map(g => <option key={g} value={g === 'Select' ? '' : g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* ── RIGHT COLUMN ────────────────────────────── */}
            <div className="asd-col">
              <div className="asd-field">
                <label className="asd-label">Date of Birth</label>
                <div className="asd-date-wrap">
                  <input className="asd-input" type="date" placeholder="Date" value={dob} onChange={e => setDob(e.target.value)} />
                </div>
              </div>

              <div className="asd-field">
                <label className="asd-label">Anniversary</label>
                <div className="asd-date-wrap">
                  <input className="asd-input" type="date" placeholder="Date" value={anniversary} onChange={e => setAnniversary(e.target.value)} />
                </div>
              </div>

              <div className="asd-field">
                <label className="asd-label">Salary</label>
                <input className="asd-input" placeholder="Salary" type="number" min="0" value={salary} onChange={e => setSalary(e.target.value)} />
              </div>

              <div className="asd-field">
                <label className="asd-label">Job Designation <span className="asd-req">*</span></label>
                <select className={`asd-select${errors.designation ? ' asd-input-err' : ''}`} value={designation} onChange={e => setDesignation(e.target.value)}>
                  {DESIGNATIONS.map(d => <option key={d} value={d === 'Select' ? '' : d}>{d}</option>)}
                </select>
                {errors.designation && <span className="asd-err-msg">{errors.designation}</span>}
              </div>

              <div className="asd-field">
                <label className="asd-label">Admin Rights <span className="asd-req">*</span></label>
                <select className={`asd-select${errors.adminRights ? ' asd-input-err' : ''}`} value={adminRights} onChange={e => setAdminRights(e.target.value)}>
                  {ADMIN_RIGHTS.map(r => <option key={r} value={r === 'Select' ? '' : r}>{r}</option>)}
                </select>
                {errors.adminRights && <span className="asd-err-msg">{errors.adminRights}</span>}
              </div>

              <div className="asd-field">
                <label className="asd-label">Date of Joining</label>
                <div className="asd-date-wrap">
                  <input className="asd-input" type="date" placeholder="Date" value={joinDate} onChange={e => setJoinDate(e.target.value)} />
                </div>
              </div>

              <div className="asd-field">
                <label className="asd-label">Attendance ID</label>
                <input className="asd-input" value={attendanceId} onChange={e => setAttendanceId(e.target.value)} />
              </div>

              <div className="asd-field">
                <label className="asd-label">PAN Card</label>
                <input className="asd-input" value={panCard} onChange={e => setPanCard(e.target.value)} />
              </div>

              <div className="asd-field">
                <label className="asd-label">GST number</label>
                <input className="asd-input" value={gstNumber} onChange={e => setGstNumber(e.target.value)} />
              </div>

              <div className="asd-field">
                <label className="asd-label">Account No</label>
                <input className="asd-input" value={accountNo} onChange={e => setAccountNo(e.target.value)} />
              </div>

              <div className="asd-field">
                <label className="asd-label">IFSC</label>
                <input className="asd-input" value={ifsc} onChange={e => setIfsc(e.target.value)} />
              </div>

              <div className="asd-field">
                <label className="asd-label">HRMS ID</label>
                <input className="asd-input" value={hrmsId} onChange={e => setHrmsId(e.target.value)} />
              </div>
            </div>

          </div>{/* end 2col */}

          {error && <p className="asd-global-err">{error}</p>}

          <div className="asd-save-row">
            <button className="asd-save-btn" disabled={saving} onClick={handleSubmit}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
