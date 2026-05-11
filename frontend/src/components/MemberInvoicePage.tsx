import { useState, useEffect, useRef, useCallback } from 'react';
import { servicesApi, type GymServiceDto, type ServiceVariationDto } from '../api/services';
import { packagesApi, type GymPackageDto } from '../api/packages';
import { invoicesApi } from '../api/invoices';
import './MemberInvoicePage.css';

const MEMBER_TABS = [
  'Profile', 'Service Card', 'Payments', 'Call Log', 'Appointments',
  'Referrals', 'Family Member', 'Store', 'Documents', 'Attendance',
  'Trial History', 'Training', 'Terms & Conditions',
];

const SALES_REPS = ['Vasanth', 'Swetha Raghavendra', 'Rahul Kumar', 'Priya Nair'];
const TAX_OPTIONS = ['No tax', 'GST 5%', 'GST 12%', 'GST 18%', 'GST 28%'];
const DISCOUNT_TYPES = ['%', '₹'];
const PAYMENT_MODES = ['Cash', 'Card', 'UPI', 'Net Banking', 'Cheque', 'EMI'];

type InvoiceType = 'Service' | 'Package' | 'Deal';

interface InvoiceRow {
  id: number;
  description: string;
  startDate: string;
  expiryDate: string;
  sessions: number | null;
  sacCode: string;
  duration: string;
  quantity: string;
  fee: number;
  discount: number;
  discountType: string;
  tax: string;
}

interface PaymentRow {
  id: number;
  mode: string;
  amount: number;
}

interface Props {
  memberName: string;
  memberContact: string;
  subscriptionId: string;
  gymId: string;
  onClose: () => void;
}

function todayStr() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}

function newRow(id: number): InvoiceRow {
  return { id, description: '', startDate: '', expiryDate: '', sessions: null, sacCode: '', duration: '', quantity: '', fee: 0, discount: 0, discountType: '%', tax: 'No tax' };
}

function formatDuration(v: ServiceVariationDto): string {
  const type = v.serviceType.toLowerCase();
  if (type === 'membership') {
    const m = v.months || Math.round(v.validityDays / 30) || 1;
    return `${v.daysPerWeek || 7} Days Per week. Valid for ${m} month(s).`;
  }
  if (type === 'multiple sessions') {
    const mins = String(v.timeMinutes).padStart(2, '0');
    return `${v.numberOfSessions} Sessions. ${v.timeHours}h ${mins}m per session. Valid for ${v.validityDays} day(s).`;
  }
  if (type === '1 session') {
    const mins = String(v.timeMinutes).padStart(2, '0');
    return `${v.timeHours}h ${mins}m. Valid for ${v.validityDays} day(s)`;
  }
  return `Valid for ${v.validityDays} day(s)`;
}

function normaliseTax(raw: string | undefined | null): string {
  if (!raw || raw === 'No tax' || raw === 'none') return 'No tax';
  const found = TAX_OPTIONS.find(t => t.toLowerCase() === raw.toLowerCase());
  return found ?? 'No tax';
}

/* ── Service selector popup (per row) ────────────────────────────────── */
interface ServiceSelectorProps {
  services: GymServiceDto[];
  loadingServices: boolean;
  subscriptionId: string;
  gymId: string;
  onSelect: (row: Partial<InvoiceRow>) => void;
  onClose: () => void;
  label: string;
}

function ServiceSelector({ services, loadingServices, subscriptionId, gymId, onSelect, onClose, label }: ServiceSelectorProps) {
  const [search, setSearch]         = useState('');
  const [step, setStep]             = useState<'service' | 'variation'>('service');
  const [pickedSvc, setPickedSvc]   = useState<GymServiceDto | null>(null);
  const [variations, setVariations] = useState<ServiceVariationDto[]>([]);
  const [loadingVar, setLoadingVar] = useState(false);
  const [varSearch, setVarSearch]   = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const filteredSvcs = services.filter(s =>
    s.isActive && (!search.trim() || s.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredVars = variations.filter(v =>
    v.isActive && (!varSearch.trim() || v.name.toLowerCase().includes(varSearch.toLowerCase()))
  );

  async function pickService(svc: GymServiceDto) {
    setPickedSvc(svc);
    setLoadingVar(true);
    setStep('variation');
    try {
      const vars = await servicesApi.listVariations(subscriptionId, gymId, svc.id);
      setVariations(vars.filter(v => v.isActive));
    } catch {
      setVariations([]);
    } finally {
      setLoadingVar(false);
    }
  }

  function pickVariation(v: ServiceVariationDto) {
    if (!pickedSvc) return;
    onSelect({
      description: `${pickedSvc.name} - ${v.name}`,
      duration:    formatDuration(v),
      sessions:    v.numberOfSessions > 0 ? v.numberOfSessions : null,
      sacCode:     pickedSvc.sacCode ?? '',
      fee:         v.serviceFee,
      tax:         normaliseTax(v.tax || pickedSvc.tax),
    });
    onClose();
  }

  return (
    <div className="mip-svc-popup" ref={popupRef}>
      {step === 'service' ? (
        <>
          <div className="mip-svc-popup-header">
            <span className="mip-svc-popup-title">{label}</span>
            <button className="mip-svc-popup-close" onClick={onClose}>✕</button>
          </div>
          <div className="mip-svc-popup-search">
            <input
              autoFocus
              className="mip-input"
              placeholder="Search services…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="mip-svc-popup-list">
            {loadingServices && <div className="mip-svc-popup-empty">Loading…</div>}
            {!loadingServices && filteredSvcs.length === 0 && (
              <div className="mip-svc-popup-empty">No services found.</div>
            )}
            {filteredSvcs.map(svc => (
              <button key={svc.id} className="mip-svc-popup-item" onClick={() => pickService(svc)}>
                <span className="mip-svc-popup-item-name">{svc.name}</span>
                <span className="mip-svc-popup-item-meta">{svc.variationCount} variation{svc.variationCount !== 1 ? 's' : ''}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mip-svc-popup-header">
            <button className="mip-svc-popup-back" onClick={() => { setStep('service'); setPickedSvc(null); setVariations([]); }}>
              ← {pickedSvc?.name}
            </button>
            <button className="mip-svc-popup-close" onClick={onClose}>✕</button>
          </div>
          <div className="mip-svc-popup-search">
            <input
              autoFocus
              className="mip-input"
              placeholder="Search variations…"
              value={varSearch}
              onChange={e => setVarSearch(e.target.value)}
            />
          </div>
          <div className="mip-svc-popup-list">
            {loadingVar && <div className="mip-svc-popup-empty">Loading variations…</div>}
            {!loadingVar && filteredVars.length === 0 && (
              <div className="mip-svc-popup-empty">No active variations found.</div>
            )}
            {!loadingVar && filteredVars.map(v => (
              <button key={v.id} className="mip-svc-popup-item" onClick={() => pickVariation(v)}>
                <span className="mip-svc-popup-item-name">{v.name}</span>
                <span className="mip-svc-popup-item-meta">
                  {v.serviceType} · ₹{v.serviceFee.toLocaleString('en-IN')} · {formatDuration(v)}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Package selector popup ──────────────────────────────────────────── */
interface PackageSelectorProps {
  packages: GymPackageDto[];
  loadingPackages: boolean;
  onSelect: (pkg: GymPackageDto) => void;
  onClose: () => void;
}

function PackageSelector({ packages, loadingPackages, onSelect, onClose }: PackageSelectorProps) {
  const [search, setSearch] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const filtered = packages.filter(p =>
    !p.isDisabledFromSelling &&
    (!search.trim() || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mip-svc-popup" ref={popupRef}>
      <div className="mip-svc-popup-header">
        <span className="mip-svc-popup-title">Select Package</span>
        <button className="mip-svc-popup-close" onClick={onClose}>✕</button>
      </div>
      <div className="mip-svc-popup-search">
        <input
          autoFocus
          className="mip-input"
          placeholder="Search packages…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="mip-svc-popup-list">
        {loadingPackages && <div className="mip-svc-popup-empty">Loading…</div>}
        {!loadingPackages && filtered.length === 0 && (
          <div className="mip-svc-popup-empty">No packages found.</div>
        )}
        {filtered.map(pkg => (
          <button key={pkg.id} className="mip-svc-popup-item" onClick={() => { onSelect(pkg); onClose(); }}>
            <span className="mip-svc-popup-item-name">{pkg.name}</span>
            <span className="mip-svc-popup-item-meta">{pkg.items.length} item{pkg.items.length !== 1 ? 's' : ''}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main invoice page ────────────────────────────────────────────────── */
export default function MemberInvoicePage({ memberName, memberContact, subscriptionId, gymId, onClose }: Props) {
  const [activeTab, setActiveTab]   = useState('Service Card');
  const [invoiceType, setInvoiceType] = useState<InvoiceType>('Service');
  const [salesRep, setSalesRep]     = useState(SALES_REPS[0]);
  const [invoiceDate]               = useState(todayStr());
  const [rows, setRows]             = useState<InvoiceRow[]>([newRow(1)]);
  const [payments, setPayments]     = useState<PaymentRow[]>([{ id: 1, mode: '', amount: 0 }]);
  const [discountReason, setDiscountReason] = useState('');
  const [customerNotes, setCustomerNotes]   = useState('');
  const [internalNotes, setInternalNotes]   = useState('');
  const [saving, setSaving]         = useState(false);
  const [saveError, setSaveError]   = useState('');

  // Service picker state
  const [services, setServices]             = useState<GymServiceDto[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [openSelectorRowId, setOpenSelectorRowId] = useState<number | null>(null);

  // Package picker state
  const [packages, setPackages]             = useState<GymPackageDto[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [pkgPopupOpen, setPkgPopupOpen]     = useState(false);
  const [selectedPackageName, setSelectedPackageName] = useState('');
  const pkgSearchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!subscriptionId || !gymId) return;
    setLoadingServices(true);
    servicesApi.list(subscriptionId, gymId)
      .then(list => setServices(list))
      .catch(() => setServices([]))
      .finally(() => setLoadingServices(false));

    setLoadingPackages(true);
    packagesApi.list(subscriptionId, gymId)
      .then(list => setPackages(list))
      .catch(() => setPackages([]))
      .finally(() => setLoadingPackages(false));
  }, [subscriptionId, gymId]);

  function updateRow(id: number, patch: Partial<InvoiceRow>) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  }

  function addRow() {
    setRows(prev => [...prev, newRow(prev.length + 1)]);
  }

  function addPayment() {
    setPayments(prev => [...prev, { id: Date.now(), mode: '', amount: 0 }]);
  }

  function deletePayment(id: number) {
    setPayments(prev => prev.filter(p => p.id !== id));
  }

  function updatePayment(id: number, patch: Partial<PaymentRow>) {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  }

  function rowSubtotal(row: InvoiceRow): number {
    let sub = row.fee;
    if (row.discount > 0) {
      sub = row.discountType === '%' ? sub - (sub * row.discount / 100) : sub - row.discount;
    }
    const taxPct = row.tax === 'No tax' ? 0 : parseFloat(row.tax.replace(/[^0-9.]/g, '')) || 0;
    return sub + (sub * taxPct / 100);
  }

  const subTotal  = rows.reduce((s, r) => s + r.fee, 0);
  const taxDue    = rows.reduce((s, r) => {
    const discounted = r.discountType === '%' ? r.fee - (r.fee * r.discount / 100) : r.fee - r.discount;
    const taxPct = r.tax === 'No tax' ? 0 : parseFloat(r.tax.replace(/[^0-9.]/g, '')) || 0;
    return s + (discounted * taxPct / 100);
  }, 0);
  const totalDue  = rows.reduce((s, r) => s + rowSubtotal(r), 0);
  const rounding  = Math.round(totalDue) - totalDue;
  const totalPaid = payments.reduce((s, p) => s + (p.amount || 0), 0);
  const pending   = Math.round(totalDue + rounding) - totalPaid;

  const selectorLabel = invoiceType === 'Service' ? 'Select Service' : invoiceType === 'Package' ? 'Select Package' : 'Select Deal';

  const handleSelectorSelect = useCallback((rowId: number, patch: Partial<InvoiceRow>) => {
    updateRow(rowId, patch);
    setOpenSelectorRowId(null);
    setSaveError('');
  }, []);

  function handlePackageSelect(pkg: GymPackageDto) {
    setSelectedPackageName(pkg.name);
    setSaveError('');
    const newRows: InvoiceRow[] = pkg.items.map((item, idx) => ({
      id: idx + 1,
      description: item.serviceName,
      startDate: '',
      expiryDate: '',
      sessions: item.quantity,
      sacCode: '',
      duration: '',
      quantity: String(item.quantity),
      fee: item.serviceFee,
      discount: item.discount,
      discountType: item.discountType,
      tax: 'No tax',
    }));
    setRows(newRows.length > 0 ? newRows : [newRow(1)]);
  }

  function parseTaxRate(tax: string): number {
    if (tax === 'No tax') return 0;
    return parseFloat(tax.replace(/[^0-9.]/g, '')) || 0;
  }

  async function handleSave() {
    if (!subscriptionId || !gymId) return;

    // Validate: at least one row must have a description selected
    const hasSelection = rows.some(r => r.description.trim() !== '');
    if (!hasSelection) {
      setSaveError(
        invoiceType === 'Package'
          ? 'Please select a package before saving.'
          : `Please select at least one ${invoiceType.toLowerCase()} before saving.`
      );
      return;
    }
    setSaveError('');

    setSaving(true);
    try {
      await invoicesApi.create(subscriptionId, gymId, {
        invoiceType: invoiceType,
        salesRepName: salesRep,
        invoiceDate: invoiceDate,
        items: rows.map(r => ({
          description: r.description,
          duration: r.duration || undefined,
          startDate: r.startDate || undefined,
          expiryDate: r.expiryDate || undefined,
          numberOfSessions: r.sessions ?? undefined,
          sacCode: r.sacCode || undefined,
          fee: r.fee,
          discount: r.discount,
          discountType: r.discountType,
          taxRate: parseTaxRate(r.tax),
        })),
        payments: payments.filter(p => p.mode).map(p => ({ mode: p.mode, amount: p.amount })),
        discountReason: discountReason || undefined,
        customerNotes: customerNotes || undefined,
        internalNotes: internalNotes || undefined,
      });
      alert('Invoice saved successfully.');
    } catch (err: unknown) {
      alert(`Failed to save invoice: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mip-page">
      {/* Breadcrumb */}
      <div className="mip-breadcrumb">
        <span className="mip-bc-link" onClick={onClose}>Home</span>
        <span className="mip-bc-sep"> / </span>
        <span className="mip-bc-link" onClick={onClose}>Clients</span>
        <span className="mip-bc-sep"> / </span>
        <span className="mip-bc-link">Validity Based</span>
        <span className="mip-bc-sep"> / </span>
        <span className="mip-bc-active">Invoice</span>
      </div>

      {/* Member tabs */}
      <div className="mip-tabs">
        {MEMBER_TABS.map(tab => (
          <button
            key={tab}
            className={`mip-tab${activeTab === tab ? ' mip-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Service Card' && (
        <div className="mip-content">
          {/* Invoice type radio */}
          <div className="mip-type-row">
            {(['Service', 'Package', 'Deal'] as InvoiceType[]).map(t => (
              <label key={t} className="mip-radio-label">
                <input
                  type="radio"
                  name="invoiceType"
                  checked={invoiceType === t}
                  onChange={() => { setInvoiceType(t); setOpenSelectorRowId(null); setPkgPopupOpen(false); setSelectedPackageName(''); setRows([newRow(1)]); setSaveError(''); }}
                />
                {t}
              </label>
            ))}
          </div>

          {invoiceType === 'Package' && (
            <div className="mip-pkg-search-row" ref={pkgSearchWrapRef} style={{ position: 'relative' }}>
              <span className="mip-pkg-label">Select Package</span>
              <input
                className="mip-input mip-desc-input"
                style={{ minWidth: 200, cursor: 'pointer' }}
                placeholder="Click to choose a package…"
                value={selectedPackageName}
                readOnly
                onClick={() => setPkgPopupOpen(true)}
              />
              <button className="mip-search-icon-btn" title="Search" onClick={() => setPkgPopupOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
              {pkgPopupOpen && (
                <PackageSelector
                  packages={packages}
                  loadingPackages={loadingPackages}
                  onSelect={handlePackageSelect}
                  onClose={() => setPkgPopupOpen(false)}
                />
              )}
            </div>
          )}

          {/* Validation error shown on save attempt */}
          {saveError && (
            <div className="mip-active-service">{saveError}</div>
          )}

          {/* Pro forma header */}
          <div className="mip-proforma-header">
            <div className="mip-proforma-left">
              <div className="mip-field-row">
                <label className="mip-field-label">Name/Mobile Number</label>
                <input
                  className="mip-input mip-name-input"
                  value={`${memberName}${memberContact ? ' ' + memberContact : ''}`}
                  readOnly
                />
              </div>
            </div>
            <div className="mip-proforma-title">Pro Forma Invoice</div>
            <div className="mip-proforma-right">
              <div className="mip-field-row">
                <label className="mip-field-label">Invoice Date</label>
                <input className="mip-input" value={invoiceDate} readOnly />
              </div>
              <div className="mip-field-row">
                <label className="mip-field-label">Sales Rep</label>
                <select className="mip-select" value={salesRep} onChange={e => setSalesRep(e.target.value)}>
                  {SALES_REPS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Invoice table */}
          <table className="mip-table">
            <thead>
              <tr>
                <th className="mip-th mip-th-sno">S.NO</th>
                <th className="mip-th mip-th-desc">DESCRIPTION</th>
                <th className="mip-th mip-th-dur">DURATION</th>
                <th className="mip-th mip-th-qty">QUANTITY</th>
                <th className="mip-th mip-th-fee">SERVICE FEE</th>
                <th className="mip-th mip-th-add">
                  {invoiceType !== 'Package' && (
                    <button className="mip-add-row-btn" onClick={addRow} title="Add row">+</button>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id} className="mip-tr">
                  <td className="mip-td mip-td-sno">{idx + 1}</td>
                  <td className="mip-td mip-td-desc">
                    <div className="mip-desc-search-wrap">
                      <div className="mip-desc-search">
                        <input
                          className="mip-input mip-desc-input"
                          placeholder={selectorLabel}
                          value={row.description}
                          readOnly
                          onClick={() => setOpenSelectorRowId(row.id)}
                        />
                        <button
                          className="mip-search-icon-btn"
                          title="Search"
                          onClick={() => setOpenSelectorRowId(row.id)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          </svg>
                        </button>
                      </div>

                      {/* Service selector popup */}
                      {openSelectorRowId === row.id && invoiceType === 'Service' && (
                        <ServiceSelector
                          services={services}
                          loadingServices={loadingServices}
                          subscriptionId={subscriptionId}
                          gymId={gymId}
                          label={selectorLabel}
                          onSelect={patch => handleSelectorSelect(row.id, patch)}
                          onClose={() => setOpenSelectorRowId(null)}
                        />
                      )}
                    </div>

                    <div className="mip-desc-meta">
                      <span>Start date:&nbsp;
                        <input className="mip-date-input" type="date" value={row.startDate} onChange={e => updateRow(row.id, { startDate: e.target.value })} />
                      </span>
                      <span>Expiry date:&nbsp;
                        <input className="mip-date-input" type="date" value={row.expiryDate} onChange={e => updateRow(row.id, { expiryDate: e.target.value })} />
                      </span>
                      <span>Number of sessions:&nbsp;{row.sessions ?? 'NaN'}</span>
                    </div>
                    <div className="mip-sac-row">
                      SAC Code:&nbsp;
                      <input className="mip-sac-input" value={row.sacCode} onChange={e => updateRow(row.id, { sacCode: e.target.value })} />
                    </div>
                  </td>
                  <td className="mip-td mip-td-dur">
                    <input className="mip-input mip-dur-input" value={row.duration} readOnly />
                  </td>
                  <td className="mip-td mip-td-qty">
                    <div className="mip-qty-box" />
                  </td>
                  <td className="mip-td mip-td-fee">
                    <input
                      className="mip-input mip-fee-input"
                      type="number"
                      min={0}
                      value={row.fee}
                      onChange={e => updateRow(row.id, { fee: parseFloat(e.target.value) || 0 })}
                    />
                    <div className="mip-discount-row">
                      <span>Discount:</span>
                      <input
                        className="mip-input mip-discount-num"
                        type="number"
                        min={0}
                        value={row.discount}
                        onChange={e => updateRow(row.id, { discount: parseFloat(e.target.value) || 0 })}
                      />
                      <select className="mip-select mip-discount-type" value={row.discountType} onChange={e => updateRow(row.id, { discountType: e.target.value })}>
                        {DISCOUNT_TYPES.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="mip-tax-row">
                      <span>Tax:</span>
                      <select className="mip-select mip-tax-select" value={row.tax} onChange={e => updateRow(row.id, { tax: e.target.value })}>
                        {TAX_OPTIONS.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="mip-row-subtotal">{rowSubtotal(row).toFixed(2)}</div>
                  </td>
                  <td className="mip-td" />
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals + Payment */}
          <div className="mip-bottom">
            <div className="mip-bottom-left" />
            <div className="mip-bottom-right">
              <div className="mip-summary">
                <div className="mip-summary-row">
                  <span className="mip-summary-label">Sub Total</span>
                  <span className="mip-summary-val mip-summary-box">{subTotal.toFixed(2)}</span>
                </div>
                <div className="mip-summary-row">
                  <span className="mip-summary-label">Tax due</span>
                  <span className="mip-summary-val mip-summary-box">{taxDue.toFixed(2)}</span>
                </div>
                <div className="mip-summary-row">
                  <span className="mip-summary-label">Total Due</span>
                  <span className="mip-summary-val mip-summary-box">{totalDue.toFixed(2)}</span>
                </div>
                <div className="mip-summary-row">
                  <span className="mip-summary-label">Rounding</span>
                  <span className="mip-summary-val mip-summary-box">{rounding.toFixed(2)}</span>
                </div>

                <div className="mip-payment-heading">MODE OF PAYMENT</div>
                {payments.map((p, idx) => (
                  <div key={p.id} className="mip-payment-row">
                    <select
                      className="mip-select mip-payment-mode"
                      value={p.mode}
                      onChange={e => updatePayment(p.id, { mode: e.target.value })}
                    >
                      <option value="">Select</option>
                      {PAYMENT_MODES.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <input
                      className="mip-input mip-payment-amt"
                      type="number"
                      min={0}
                      value={p.amount}
                      onChange={e => updatePayment(p.id, { amount: parseFloat(e.target.value) || 0 })}
                    />
                    {idx === 0 ? (
                      <button className="mip-add-row-btn" onClick={addPayment} title="Add payment row">+</button>
                    ) : (
                      <button className="mip-del-row-btn" onClick={() => deletePayment(p.id)} title="Remove row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6M14 11v6"/>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}

                <div className="mip-summary-row">
                  <span className="mip-summary-label">Pending</span>
                  <span className="mip-summary-val mip-summary-box">{pending.toFixed(2)}</span>
                </div>
                <div className="mip-summary-row mip-note-row">
                  <span className="mip-summary-label">Discount Reason</span>
                  <input className="mip-input mip-note-input" value={discountReason} onChange={e => setDiscountReason(e.target.value)} />
                </div>
                <div className="mip-summary-row mip-note-row">
                  <span className="mip-summary-label">Notes for Customer: (This will appear in the invoice copy)</span>
                  <input className="mip-input mip-note-input" placeholder="Maximum 240 characters" maxLength={240} value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} />
                </div>
                <div className="mip-summary-row mip-note-row">
                  <span className="mip-summary-label">Internal Notes:</span>
                  <input className="mip-input mip-note-input" placeholder="Maximum 240 characters" maxLength={240} value={internalNotes} onChange={e => setInternalNotes(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="mip-terms-section">
            <div className="mip-terms-heading">TERMS AND CONDITIONS</div>
            <div className="mip-terms-body" />
          </div>

          {/* Footer */}
          <div className="mip-footer">
            <button className="mip-save-btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {activeTab !== 'Service Card' && (
        <div className="mip-content mip-placeholder">
          <p>{activeTab} content will be shown here.</p>
        </div>
      )}
    </div>
  );
}
