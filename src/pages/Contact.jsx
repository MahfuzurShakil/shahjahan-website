import { useState } from 'react';
import { MP } from '../data/staticData';
import { CONFIG } from '../config';
import PageHero from '../components/PageHero';
import './Contact.css';

/**
 * Contact Page
 * ─────────────────────────────────────────────────────────────────
 * Submission flow:
 *  1. Formspree  → email arrives in Gmail/Outlook
 *  2. WhatsApp   → opens WhatsApp with pre-filled message
 * Both happen at the same time when user clicks submit.
 * ─────────────────────────────────────────────────────────────────
 */

// Quick-contact WhatsApp button with pre-filled text
function WhatsAppFloat() {
  return (
    <a
      href={CONFIG.whatsapp.messageLink}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      title="হোয়াটসঅ্যাপে যোগাযোগ করুন"
      aria-label="WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <span className="wa-float-label">WhatsApp</span>
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', subject: '', message: '', type: 'সাধারণ',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formspreeId = CONFIG.formspree.id;
    const isConfigured = formspreeId && formspreeId !== 'YOUR_FORMSPREE_ID_HERE';

    try {
      // ── Step 1: Send to Formspree (email) ──────────────────────
      if (isConfigured) {
        const res = await fetch(CONFIG.formspree.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...form,
            _subject: `[ওয়েবসাইট বার্তা] ${form.subject}`,
            _replyto: form.email || form.phone,
          }),
        });
        if (!res.ok) throw new Error('Formspree error');
      }

      // ── Step 2: Open WhatsApp with pre-filled message ──────────
      const waText = encodeURIComponent(
        `*নতুন বার্তা - ওয়েবসাইট থেকে*\n\n` +
        `👤 নাম: ${form.name}\n` +
        `📞 ফোন: ${form.phone}\n` +
        `📌 ধরন: ${form.type}\n` +
        `📋 বিষয়: ${form.subject}\n\n` +
        `💬 বার্তা:\n${form.message}`
      );
      const waUrl = `https://wa.me/${CONFIG.whatsapp.number}?text=${waText}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setStatus('success');
      setForm({ name: '', phone: '', email: '', subject: '', message: '', type: 'সাধারণ' });

    } catch (err) {
      console.error('Contact form error:', err);
      // Even if Formspree fails, still open WhatsApp
      const waText = encodeURIComponent(`ওয়েবসাইট থেকে যোগাযোগ — ${form.name}: ${form.message}`);
      window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${waText}`, '_blank');
      setStatus('success'); // Treat as success since WhatsApp opened
    }
  };

  const contactInfo = [
    { icon: '📍', label: 'ঠিকানা', value: MP.office, link: null },
    { icon: '📞', label: 'ফোন', value: MP.phone, link: `tel:${MP.phone}` },
    { icon: '✉️', label: 'ইমেইল', value: MP.email, link: `mailto:${MP.email}` },
    { icon: '💬', label: 'হোয়াটসঅ্যাপ', value: CONFIG.whatsapp.number, link: CONFIG.whatsapp.messageLink },
    { icon: '🏛️', label: 'সংসদ অফিস', value: 'জাতীয় সংসদ ভবন, ঢাকা-১২০৭', link: null },
  ];

  return (
    <div>
      <PageHero
        title="যোগাযোগ করুন"
        subtitle="আপনার মতামত, পরামর্শ বা অভিযোগ আমাদের কাছে পাঠান"
        breadcrumb="হোম / যোগাযোগ"
      />

      <section className="section-pad">
        <div className="container contact-grid">

          {/* ── Left: Info ── */}
          <div className="contact-info-side">
            <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
            <span className="section-eyebrow">যোগাযোগের তথ্য</span>
            <h2 className="section-title bangla-title">আমাদের সাথে থাকুন</h2>
            <p className="bangla-body" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              নির্বাচনী এলাকার যেকোনো সমস্যা, উন্নয়ন বিষয়ক প্রস্তাব বা ব্যক্তিগত সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।
            </p>

            <div className="contact-info-list">
              {contactInfo.map((info, i) => (
                <div key={i} className="contact-info-item">
                  <div className="ci-icon">{info.icon}</div>
                  <div className="ci-text">
                    <div className="ci-label">{info.label}</div>
                    {info.link
                      ? <a href={info.link} className="ci-value" target={info.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">{info.value}</a>
                      : <div className="ci-value">{info.value}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact buttons */}
            <div className="contact-social">
              <h4 className="contact-social-title">দ্রুত যোগাযোগ</h4>
              <div className="contact-social-btns">
                <a href={MP.facebook} target="_blank" rel="noreferrer" className="csb facebook">📘 ফেসবুক</a>
                <a href={CONFIG.whatsapp.messageLink} target="_blank" rel="noreferrer" className="csb whatsapp">💬 হোয়াটসঅ্যাপ</a>
              </div>
            </div>

            {/* How it works info box */}
            <div className="how-it-works">
              <div className="hiw-title">📨 বার্তা কীভাবে পৌঁছাবে?</div>
              <div className="hiw-steps">
                <div className="hiw-step">
                  <span className="hiw-num">১</span>
                  <span>আপনার বার্তা <strong>ইমেইলে</strong> পৌঁছাবে</span>
                </div>
                <div className="hiw-step">
                  <span className="hiw-num">২</span>
                  <span><strong>হোয়াটসঅ্যাপে</strong>ও বার্তা যাবে</span>
                </div>
                <div className="hiw-step">
                  <span className="hiw-num">৩</span>
                  <span>শীঘ্রই আপনার সাথে যোগাযোগ করা হবে</span>
                </div>
              </div>
            </div>

            {/* Office hours */}
            <div className="office-hours">
              <h4 className="oh-title">অফিস সময়</h4>
              <div className="oh-rows">
                <div className="oh-row"><span>রবি - বৃহস্পতি</span><span>সকাল ৯টা - বিকাল ৫টা</span></div>
                <div className="oh-row"><span>শুক্রবার</span><span>বন্ধ</span></div>
                <div className="oh-row"><span>শনিবার</span><span>সকাল ৯টা - দুপুর ১টা</span></div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-form-side">
            {status === 'success' ? (
              <div className="submit-success">
                <div className="success-icon">✅</div>
                <h3>বার্তা পাঠানো হয়েছে!</h3>
                <p>আপনার বার্তাটি আমরা পেয়েছি। হোয়াটসঅ্যাপ খোলা হয়েছে — সেখানেও বার্তা পাঠান।</p>
                <div className="success-actions">
                  <button
                    className="btn-primary"
                    onClick={() => setStatus('idle')}
                  >
                    আরেকটি বার্তা পাঠান
                  </button>
                  <a href={CONFIG.whatsapp.messageLink} target="_blank" rel="noreferrer" className="csb whatsapp">
                    💬 হোয়াটসঅ্যাপ খুলুন
                  </a>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="form-title">বার্তা পাঠান</h3>

                <div className="form-delivery-note">
                  <span>📧</span> ইমেইল + <span>💬</span> হোয়াটসঅ্যাপ — দুটোতেই পৌঁছাবে
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>আপনার নাম *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="আপনার পুরো নাম" />
                  </div>
                  <div className="form-group">
                    <label>মোবাইল নম্বর *</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="০১XXX-XXXXXX" />
                  </div>
                </div>

                <div className="form-group">
                  <label>ইমেইল ঠিকানা</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com (ঐচ্ছিক)" />
                </div>

                <div className="form-group">
                  <label>বার্তার ধরন</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option>সাধারণ</option>
                    <option>উন্নয়ন প্রস্তাব</option>
                    <option>অভিযোগ</option>
                    <option>ব্যক্তিগত সহায়তা</option>
                    <option>মিডিয়া যোগাযোগ</option>
                    <option>জরুরি বিষয়</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>বিষয় *</label>
                  <input type="text" name="subject" required value={form.subject} onChange={handleChange} placeholder="বার্তার বিষয় লিখুন" />
                </div>

                <div className="form-group">
                  <label>বার্তা *</label>
                  <textarea name="message" required value={form.message} onChange={handleChange} placeholder="আপনার বার্তা বিস্তারিত লিখুন..." rows={5} />
                </div>

                {errorMsg && (
                  <div className="form-error">{errorMsg}</div>
                )}

                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <><span className="btn-spinner" /> পাঠানো হচ্ছে...</>
                  ) : (
                    '📨 বার্তা পাঠান'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <WhatsAppFloat />
    </div>
  );
}
