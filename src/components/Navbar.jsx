import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MP } from '../data/staticData';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'হোম' },
  { to: '/about', label: 'পরিচিতি' },
  { to: '/activities', label: 'কার্যক্রম' },
  { to: '/social-work', label: 'সামাজিক কার্যক্রম' },
  { to: '/gallery', label: 'গ্যালারি' },
  { to: '/constituency', label: 'নির্বাচনী এলাকা' },
  { to: '/voter-slip', label: 'ভোটার স্লিপ' },
  { to: '/news', label: 'সংবাদ' },
  { to: '/contact', label: 'যোগাযোগ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Top strip */}
      <div className="nav-topstrip">
        <div className="container nav-topstrip-inner">
          <span>বাংলাদেশ জাতীয় সংসদ | কক্সবাজার-৪</span>
          <span>📞 যোগাযোগ: ০১XXX-XXXXXX</span>
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-emblem">
              <span className="logo-initials">শ.চ</span>
            </div>
            <div className="logo-text">
              <span className="logo-name">{MP.name}</span>
              <span className="logo-subtitle">সংসদ সদস্য | কক্সবাজার-৪</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="navbar-links">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="মেনু"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="logo-emblem">
            <span className="logo-initials">শ.চ</span>
          </div>
          <div>
            <div className="logo-name">{MP.name}</div>
            <div className="logo-subtitle">সংসদ সদস্য</div>
          </div>
        </div>
        <ul className="mobile-nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
