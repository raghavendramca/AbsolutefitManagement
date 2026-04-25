import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import './LoginPage.css';

const COUNTRY_CODES = [
  { code: '+1', label: '+1 (USA)' },
  { code: '+44', label: '+44 (UK)' },
  { code: '+91', label: '+91 (India)' },
  { code: '+61', label: '+61 (Australia)' },
  { code: '+49', label: '+49 (Germany)' },
  { code: '+33', label: '+33 (France)' },
  { code: '+81', label: '+81 (Japan)' },
  { code: '+86', label: '+86 (China)' },
  { code: '+55', label: '+55 (Brazil)' },
  { code: '+52', label: '+52 (Mexico)' },
];

export default function LoginPage() {
  const { tenantType } = useParams<{ tenantType: string }>();
  const navigate = useNavigate();
  const isMember = tenantType === 'member';

  return isMember ? <MemberLogin navigate={navigate} /> : <StudioLogin navigate={navigate} />;
}

function MemberLogin({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [countryCode, setCountryCode] = useState('+1');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      navigate('/');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="member-login-page">
      <div className="member-login-container">
        <Link to="/" className="back-to-home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </Link>

        <div className="member-login-card">
          <div className="member-logo">
            <div className="member-logo-icon">
              <span className="logo-af">AF</span>
            </div>
            <span className="member-logo-text">
              Absolute<strong>Fit</strong>
              <sup>®</sup>
            </span>
          </div>

          <h1 className="member-signin-title">Sign In</h1>

          <form className="member-form" onSubmit={handleSubmit} noValidate>
            <div className="phone-row">
              <select
                className="country-select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input
                type="tel"
                className="mobile-input"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                autoComplete="tel"
              />
            </div>

            <input
              type="password"
              className="member-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <Link to="/forgot-password" className="member-forgot">Forgot Password ?</Link>

            {error && <p className="member-error">{error}</p>}

            <button type="submit" className="member-login-btn" disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>

            <p className="member-signup-link">
              Don't have an account?{' '}
              <Link to="/signup/member">Signup!</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function StudioLogin({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaVerified) {
      setError('Please complete the CAPTCHA verification.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { tenantId } = await authApi.studioLogin({ email, password });
      navigate(`/select-branch?tenantId=${tenantId}`);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-tenant-badge">Studio Portal</div>
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <input
              type="text"
              placeholder="Email or Mobile phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="login-input"
            />
          </div>

          <div className="login-field password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="login-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <div className="login-forgot">
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          <div
            className={`captcha-widget ${captchaVerified ? 'verified' : ''}`}
            onClick={() => !captchaVerified && setCaptchaVerified(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && !captchaVerified && setCaptchaVerified(true)}
          >
            <div className="captcha-left">
              <div className={`captcha-checkbox ${captchaVerified ? 'checked' : ''}`}>
                {captchaVerified && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="captcha-label">{captchaVerified ? 'Success!' : "I'm not a robot"}</span>
            </div>
            <div className="captcha-brand">
              <svg className="cloudflare-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.3 26.4c-.2-.1-.5-.1-.7 0l-.1.1c-1 .7-2.3.2-2.6-1-.1-.4-.1-.8 0-1.2.9-3.2-.4-6.7-3.3-8.5-2.9-1.8-6.6-1.5-9.2.6-1.4 1.1-2.3 2.7-2.7 4.4-.1.5-.6.8-1.1.7-3.8-.6-7.4 2-8.1 5.8-.1.7-.1 1.4 0 2.1.1.5-.2 1-.7 1.1H14c-2.4.5-4.2 2.7-4 5.2.2 2.3 2.2 4.1 4.5 4.1h26.3c2.8 0 5.1-2.3 5.1-5.1 0-2.2-1.4-4.1-3.6-4.3z" fill="#F4821F"/>
                <path d="M44.3 30.4c-.2 0-.4 0-.6.1-.1-3.2-2.7-5.8-5.9-5.8-.5 0-1 .1-1.5.2-.8-3.1-3.7-5.4-7.1-5.4-4.1 0-7.4 3.3-7.4 7.4 0 .3 0 .6.1.9-2.5.2-4.4 2.3-4.4 4.8 0 2.7 2.2 4.8 4.8 4.8h22c2.2 0 4-1.8 4-4s-1.8-4-4-4z" fill="#FBAD41"/>
              </svg>
              <span className="captcha-brand-name">CLOUDFLARE</span>
              <div className="captcha-links">
                <a href="#" onClick={(e) => e.stopPropagation()}>Privacy</a>
                <span>•</span>
                <a href="#" onClick={(e) => e.stopPropagation()}>Help</a>
              </div>
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="login-switch">
          Looking for member access? <Link to="/login/member">Member Login</Link>
        </p>
      </div>
    </div>
  );
}
