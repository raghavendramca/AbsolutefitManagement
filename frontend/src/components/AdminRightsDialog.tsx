import { useState, useRef, useEffect } from 'react';
import { staffApi, type StaffDetail } from '../api/staff';
import { ADMIN_RIGHTS_SECTIONS } from '../constants/adminRightsPermissions';
import './AdminRightsDialog.css';

interface Props {
  gymId: string;
  staffId: string;
  staffName: string;
  onClose: () => void;
}

export default function AdminRightsDialog({ gymId, staffId, staffName, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [perms, setPerms]       = useState<Record<string, boolean | number>>({});
  const [detail, setDetail]     = useState<StaffDetail | null>(null);
  const [extOther, setExtOther] = useState<Record<string, unknown>>({});

  useEffect(() => {
    staffApi.getById(gymId, staffId)
      .then(s => {
        setDetail(s);
        if (s.extendedFieldsJson) {
          try {
            const ext = JSON.parse(s.extendedFieldsJson);
            const { adminRightsConfig, ...other } = ext;
            setExtOther(other);
            if (adminRightsConfig && typeof adminRightsConfig === 'object') {
              setPerms(adminRightsConfig as Record<string, boolean | number>);
            }
          } catch { /* ignore */ }
        }
      })
      .catch(() => setError('Failed to load staff details.'))
      .finally(() => setLoading(false));
  }, [gymId, staffId]);

  function togglePerm(key: string) {
    setPerms(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function setNumericPerm(key: string, value: string) {
    const n = parseInt(value, 10);
    setPerms(prev => ({ ...prev, [key]: isNaN(n) ? 0 : Math.max(0, n) }));
  }

  async function handleSave() {
    if (!detail) return;
    setSaving(true);
    setError('');
    try {
      const extJson = JSON.stringify({ ...extOther, adminRightsConfig: perms });
      await staffApi.update(gymId, staffId, {
        fullName:          detail.fullName,
        contactNumber:     detail.contactNumber,
        countryCode:       detail.countryCode,
        email:             detail.email     ?? undefined,
        gender:            detail.gender    ?? undefined,
        designation:       detail.designation  ?? undefined,
        adminRights:       detail.adminRights  ?? undefined,
        attendanceId:      detail.attendanceId ?? undefined,
        salary:            detail.salary    ?? undefined,
        joinDate:          detail.joinDate,
        address:           detail.address   ?? undefined,
        extendedFieldsJson: extJson,
      });
      onClose();
    } catch {
      setError('Failed to save admin rights. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setPerms({});
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div className="ard-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="ard-dialog">

        {/* Header */}
        <div className="ard-header">
          <div className="ard-breadcrumb">
            <span className="ard-bc-link">Home</span>
            <span className="ard-bc-sep">/</span>
            <span className="ard-bc-link">Staff</span>
            <span className="ard-bc-sep">/</span>
            <span className="ard-bc-active">Admin Rights - {staffName}</span>
          </div>
          <button className="ard-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="ard-body">
          {loading ? (
            <p className="ard-loading">Loading…</p>
          ) : (
            <div className="ard-grid">
              {ADMIN_RIGHTS_SECTIONS.map(section => (
                <div key={section.id} className="ard-card">
                  <h3 className="ard-card-title">{section.title}</h3>
                  {section.groups.map((group, gi) => (
                    <div key={gi} className="ard-group">
                      {group.heading && (
                        <p className="ard-group-heading">{group.heading}</p>
                      )}
                      {group.permissions.map(perm => (
                        <div key={perm.key} className="ard-perm-row">
                          <span className="ard-perm-label">{perm.label}</span>
                          {perm.type === 'number' ? (
                            <input
                              type="number"
                              className="ard-num-input"
                              min={0}
                              value={typeof perms[perm.key] === 'number' ? (perms[perm.key] as number) : 0}
                              onChange={e => setNumericPerm(perm.key, e.target.value)}
                            />
                          ) : (
                            <button
                              type="button"
                              className={`ard-toggle${perms[perm.key] ? ' ard-toggle-on' : ' ard-toggle-off'}`}
                              onClick={() => togglePerm(perm.key)}
                              aria-label={perm.label}
                            >
                              <span className="ard-toggle-thumb" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {error && <p className="ard-error">{error}</p>}
        </div>

        {/* Footer */}
        <div className="ard-footer">
          <button className="ard-btn-save" disabled={saving || loading} onClick={handleSave}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button className="ard-btn-reset" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}
