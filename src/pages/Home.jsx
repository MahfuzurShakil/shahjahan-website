import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { MP, STATS, TICKER_ITEMS, NEWS, SOCIAL_WORKS } from '../data/staticData';
import { CONFIG } from '../config';
import './Home.css';

// News Ticker
function NewsTicker() {
  return (
    <div className="ticker-wrapper">
      <div className="ticker-label">🔴 সর্বশেষ</div>
      <div className="ticker-track">
        <div className="ticker-items">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Animated stat counter
function StatCard({ stat, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  // Safely convert to number — works for both numeric and string values
  const endValue = Number(stat.value) || 0;

  return (
    <div ref={ref} className="stat-card" style={{ animationDelay: `${delay}s` }}>
      <div className="stat-value">
        {inView ? (
          <CountUp end={endValue} duration={2.5} />
        ) : '0'}
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

// Typewriter effect
function TypeWriter({ texts }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const text = texts[current];
    let timeout;

    if (!deleting && displayed.length < text.length) {
      timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === text.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrent((current + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, current, texts]);

  return <span className="typewriter">{displayed}<span className="cursor">|</span></span>;
}

export default function Home() {
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setParallax(window.scrollY * 0.4);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true });
  const { ref: newsRef, inView: newsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="home">
      {/* ======= HERO ======= */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" style={{ transform: `translateY(${parallax}px)` }} />
        <div className="hero-overlay" />
        <div className="hero-pattern" />

        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              কক্সবাজার-৪ | উখিয়া - টেকনাফ
            </div>

            <h1 className="hero-title bangla-title">
              {MP.name}
            </h1>

            <div className="hero-role">
              <TypeWriter texts={[
                'জাতীয় সংসদ সদস্য',
                'কক্সবাজার জেলা বিএনপি সভাপতি',
                'জনগণের সেবক',
                'উন্নয়নের পথিকৃৎ',
              ]} />
            </div>

            <p className="hero-desc">
              উখিয়া ও টেকনাফের সাধারণ মানুষের স্বপ্ন ও আকাঙ্ক্ষাকে বাস্তবে রূপ দিতে নিরলসভাবে কাজ করে যাচ্ছি।
            </p>

            <div className="hero-actions">
              <Link to="/about" className="btn-primary">পরিচিতি জানুন</Link>
              <Link to="/contact" className="btn-outline">যোগাযোগ করুন</Link>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring hero-photo-ring-2" />
            <img
              src={MP.photo}
              alt={MP.name}
              className="hero-photo"
              onError={e => { e.target.src = 'https://via.placeholder.com/600x750/1a5c45/c9a84c?text=MP'; }}
            />
            <div className="hero-photo-badge">
              <span>৫ বার</span>
              <span>নির্বাচিত</span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-mouse" />
          <span>স্ক্রোল করুন</span>
        </div>
      </section>

      {/* ======= NEWS TICKER ======= */}
      <NewsTicker />

      {/* ======= STATS ======= */}
      <section className="stats-section section-pad-sm" ref={statsRef}>
        <div className="container">
          <div className={`stats-grid ${statsInView ? 'visible' : ''}`}>
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ======= INTRO BAND ======= */}
      <section className="intro-band section-pad">
        <div className="container intro-band-inner">
          <div className="intro-img-wrap">
            <img
              src={MP.photoFormal}
              alt={MP.name}
              className="intro-img"
              onError={e => { e.target.src = 'https://via.placeholder.com/400x500/0d3b2e/c9a84c?text=MP+Photo'; }}
            />
            <div className="intro-img-frame" />
            <div className="intro-quote-card">
              <p>"জনগণের সেবাই আমার একমাত্র লক্ষ্য"</p>
              <cite>— শাহজাহান চৌধুরী</cite>
            </div>
          </div>

          <div className="intro-text">
            <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
            <span className="section-eyebrow">সংক্ষিপ্ত পরিচিতি</span>
            <h2 className="section-title bangla-title">জনসেবায় প্রতিশ্রুতিবদ্ধ একজন নেতা</h2>
            <p className="bangla-body" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              আলহাজ্ব শাহজাহান চৌধুরী কক্সবাজার-৪ আসনের চারবার নির্বাচিত সংসদ সদস্য। তিনি বাংলাদেশ জাতীয়তাবাদী দলের (বিএনপি) কক্সবাজার জেলা সভাপতি এবং সাবেক সংসদীয় হুইপ।
            </p>
            <p className="bangla-body" style={{ color: 'var(--text-muted)' }}>
              তিন দশকেরও বেশি সময় ধরে উখিয়া-টেকনাফ এলাকার মানুষের শিক্ষা, স্বাস্থ্য, যোগাযোগ ও কর্মসংস্থানের জন্য অক্লান্ত পরিশ্রম করে আসছেন।
            </p>
            <Link to="/about" className="btn-primary" style={{ marginTop: '1.75rem' }}>
              আরও জানুন →
            </Link>
          </div>
        </div>
      </section>

      {/* ======= SOCIAL WORK HIGHLIGHT ======= */}
      <section className="social-highlight section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">উন্নয়ন কার্যক্রম</span>
            <h2 className="section-title bangla-title">সামাজিক উন্নয়নে অগ্রণী ভূমিকা</h2>
          </div>

          <div className="social-grid">
            {SOCIAL_WORKS.slice(0, 4).map((item, i) => (
              <div key={item.id} className="social-card" style={{ '--accent': item.color }}>
                <div className="social-card-icon">{item.icon}</div>
                <div className="social-card-count">{item.count}</div>
                <div className="social-card-unit">{item.unit}</div>
                <h3 className="social-card-title">{item.title}</h3>
                <p className="social-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="center-cta">
            <Link to="/social-work" className="btn-outline" style={{ color: 'var(--forest)', borderColor: 'var(--forest)' }}>
              সকল কার্যক্রম দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* ======= LATEST NEWS ======= */}
      <section className="latest-news section-pad" ref={newsRef}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="gold-line" />
              <span className="section-eyebrow">সর্বশেষ আপডেট</span>
              <h2 className="section-title bangla-title">সাম্প্রতিক সংবাদ</h2>
            </div>
            <Link to="/news" className="btn-outline">সব সংবাদ →</Link>
          </div>

          <div className={`news-grid ${newsInView ? 'visible' : ''}`}>
            {NEWS.slice(0, 3).map((item, i) => (
              <article key={item.id} className="news-card card" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="news-img-wrap">
                  <img src={item.image} alt={item.title}
                    onError={e => { e.target.src = 'https://res.cloudinary.com/dpvqcgvnr/image/upload/v1772185949/WhatsApp_Image_2026-02-27_at_11.29.51_AM_rm6wpv.jpg'; }}
                  />
                  <span className="news-category-badge">{item.category}</span>
                </div>
                <div className="news-body">
                  <div className="news-date">{item.date}</div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.excerpt}</p>
                  <Link to="/news" className="news-read-more">বিস্তারিত পড়ুন →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CONTACT CTA ======= */}
      <section className="cta-section">
        <div className="cta-pattern" />
        <div className="container cta-inner">
          <h2 className="cta-title bangla-title">আপনার সমস্যা জানান</h2>
          <p className="cta-desc">নির্বাচনী এলাকার যেকোনো সমস্যা বা পরামর্শ আমাদের কাছে পৌঁছে দিন।</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn-primary">বার্তা পাঠান</Link>
            <a href={CONFIG.whatsapp.messageLink} target="_blank" rel="noreferrer" className="cta-whatsapp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              হোয়াটসঅ্যাপে যোগাযোগ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}