import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navigationApi, type LoginOption } from '../api/navigation';
import './Navbar.css';

const NAV_LINKS = ['One', 'Business Types', 'Pricing', 'Resources'];

export default function Navbar() {
  const [loginOptions, setLoginOptions] = useState<LoginOption[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigationApi.getLoginOptions().then(setLoginOptions).catch(() => {
      setLoginOptions([
        { id: 1, label: 'Member', route: '/login/member' },
        { id: 2, label: 'Studio', route: '/login/studio' },
      ]);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">AF</span>
        <span className="logo-text">AbsoluteFit</span>
      </Link>

      <ul className="navbar-links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" className="nav-link">{link}</a>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        <button className="btn-demo" onClick={() => navigate('/')}>
          Get a Demo
        </button>

        <div className="login-wrapper" ref={dropdownRef}>
          <button
            className="btn-login"
            onClick={() => setDropdownOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            Login
            <svg
              className={`chevron ${dropdownOpen ? 'open' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="dropdown" role="menu">
              {loginOptions.map((opt) => (
                <a
                  key={opt.id}
                  href={opt.route}
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  {opt.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
