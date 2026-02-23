import { Link } from 'react-router-dom';
import { MP } from '../data/staticData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Decorative wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0d3b2e"/>
        </svg>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-emblem">
                <span className="logo-initials">শ.চ</span>
              </div>
              <div>
                <div className="footer-name">{MP.name}</div>
                <div className="footer-pos">{MP.title}</div>
              </div>
            </div>
            <p className="footer-bio">
              কক্সবাজার-৪ (উখিয়া-টেকনাফ) আসনের জনগণের সেবায় নিবেদিত, সংসদ সদস্য হিসেবে এলাকার সামগ্রিক উন্নয়নে প্রতিশ্রুতিবদ্ধ।
            </p>
            <div className="footer-social">
              <a href={MP.facebook} target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${MP.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
              <a href={`mailto:${MP.email}`} className="social-btn" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4 className="footer-heading">দ্রুত লিঙ্ক</h4>
            <ul className="footer-links">
              {[
                ['/', 'হোম'],
                ['/about', 'পরিচিতি'],
                ['/activities', 'কার্যক্রম'],
                ['/social-work', 'সামাজিক কার্যক্রম'],
                ['/gallery', 'গ্যালারি'],
              ].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">অন্যান্য</h4>
            <ul className="footer-links">
              {[
                ['/constituency', 'নির্বাচনী এলাকা'],
                ['/voter-slip', 'ভোটার স্লিপ'],
                ['/news', 'সংবাদ'],
                ['/contact', 'যোগাযোগ'],
              ].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">যোগাযোগ করুন</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <span className="contact-icon">📍</span>
                <span>{MP.office}</span>
              </div>
              <div className="footer-contact-item">
                <span className="contact-icon">📞</span>
                <span>{MP.phone}</span>
              </div>
              <div className="footer-contact-item">
                <span className="contact-icon">✉️</span>
                <span>{MP.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© ২০২৫ {MP.name}। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>কক্সবাজার-৪ (উখিয়া-টেকনাফ) | নির্বাচনী এলাকা নং ২৯৭</span>
        </div>
      </div>
    </footer>
  );
}
