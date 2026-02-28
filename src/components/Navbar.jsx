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

// Rotating slogans for the top strip
const TOP_SLOGANS = [
  { icon: '🇧🇩', text: 'বাংলাদেশ জিন্দাবাদ  |  কক্সবাজার-৪ এর উন্নয়নে প্রতিশ্রুতিবদ্ধ' },
  { icon: '🌿', text: 'জনগণের সেবাই আমার ধর্ম  |  আলহাজ্ব শাহজাহান চৌধুরী, সংসদ সদস্য' },
  { icon: '✊', text: '"জনগণই আমার শক্তি"  —  শহীদ রাষ্ট্রপতি জিয়াউর রহমান' },
  { icon: '📞', text: 'যোগাযোগ: ০১XXX-XXXXXX  |  কার্যালয়: সোম–শুক্র, সকাল ৯টা – বিকাল ৫টা' },
];

function TopStrip() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out → switch → fade in
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % TOP_SLOGANS.length);
        setVisible(true);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const slogan = TOP_SLOGANS[idx];

  return (
    <div className="nav-topstrip">
      <div className="container nav-topstrip-inner">
        {/* Left: rotating slogan */}
        <div className={`topstrip-slogan ${visible ? 'topstrip-slogan--visible' : ''}`}>
          <span className="topstrip-icon">{slogan.icon}</span>
          <span className="topstrip-text">{slogan.text}</span>
        </div>

        {/* Right: static contact / dots indicator */}
        <div className="topstrip-right">
          <div className="topstrip-dots">
            {TOP_SLOGANS.map((_, i) => (
              <button
                key={i}
                className={`topstrip-dot ${i === idx ? 'active' : ''}`}
                onClick={() => { setIdx(i); setVisible(true); }}
                aria-label={`slogan ${i + 1}`}
              />
            ))}
          </div>
          <span className="topstrip-separator">|</span>
          <span className="topstrip-flag">🇧🇩 কক্সবাজার-৪</span>
        </div>
      </div>
    </div>
  );
}

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
      <TopStrip />

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

        {/* BNP slogan in drawer */}
        <div className="mobile-drawer-slogan">
          🇧🇩 বাংলাদেশ জিন্দাবাদ
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