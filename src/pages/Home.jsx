import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { MP, NEWS, SOCIAL_WORKS } from '../data/staticData';
import { CONFIG } from '../config';
import { useSheetData } from '../hooks/useSheetData';
import './Home.css';

// ─── Dhaner Shish SVG ────────────────────────────────────────────
function DhanerShish({ size = 80, opacity = 1, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120"
      fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <path d="M60 108 Q58 80 55 50 Q52 28 60 8" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M60 108 Q62 80 65 50 Q68 28 60 8" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4"/>
      {[[52,66],[46,54],[41,42],[49,59],[44,48]].map(([x,y],i) => (
        <ellipse key={`l${i}`} cx={x} cy={y} rx="5" ry="9" fill="#c9a84c"
          opacity={0.82 - i*0.1} transform={`rotate(${-20 - i*5} ${x} ${y})`}/>
      ))}
      {[[68,66],[74,54],[79,42],[71,59],[76,48]].map(([x,y],i) => (
        <ellipse key={`r${i}`} cx={x} cy={y} rx="5" ry="9" fill="#c9a84c"
          opacity={0.82 - i*0.1} transform={`rotate(${20 + i*5} ${x} ${y})`}/>
      ))}
      <ellipse cx="60" cy="12" rx="4" ry="8" fill="#e8c97a"/>
      <circle cx="60" cy="60" r="50" stroke="#c9a84c" strokeWidth="0.5" opacity="0.14"/>
    </svg>
  );
}

// ─── BNP Identity Band (replaces news ticker) ────────────────────
function BnpBand() {
  return (
    <div className="bnp-band">
      <div className="container bnp-band-inner">
        <div className="bnp-band-identity">
          <DhanerShish size={40} opacity={1} className="bnp-band-sheaf" />
          <div>
            <div className="bnp-band-name">বাংলাদেশ জাতীয়তাবাদী দল</div>
            <div className="bnp-band-en">Bangladesh Nationalist Party · BNP</div>
          </div>
        </div>
        <div className="bnp-band-sep" />
        <div className="bnp-band-quote">
          <span className="bnp-qmark">&ldquo;</span>
          <div>
            <div className="bnp-band-qtext">জনগণই আমার শক্তি</div>
            <div className="bnp-band-qcite">— শহীদ রাষ্ট্রপতি জিয়াউর রহমান</div>
          </div>
          <span className="bnp-qmark">&rdquo;</span>
        </div>
        <div className="bnp-band-sep" />
        <div className="bnp-band-slogan">বাংলাদেশ জিন্দাবাদ</div>
      </div>
    </div>
  );
}

// ─── Stats — grouped by theme, with icon + context line ──────────
const STAT_GROUPS = [
  {
    label: 'সংসদীয় অভিজ্ঞতা',
    items: [
      { icon: '🗳️', value: 5,   suffix: '',    label: 'বার নির্বাচিত সংসদ সদস্য', context: '১৯৮৯ · ১৯৯১ · ১৯৯৬ · ২০০১ · ২০২৪' },
      { icon: '🏛️', value: 50,  suffix: '+',   label: 'বছরের রাজনৈতিক অভিজ্ঞতা',  context: '১৯৯১ সাল থেকে সক্রিয়' },
      { icon: '📜', value: 85,  suffix: '+',   label: 'সংসদীয় বক্তৃতা প্রদান',    context: 'জাতীয় ও স্থানীয় ইস্যুতে' },
    ],
  },
  {
    label: 'উন্নয়নমূলক কার্যক্রম',
    items: [
      { icon: '🏗️', value: 250, suffix: '+',       label: 'উন্নয়ন প্রকল্প সম্পন্ন',   context: 'উখিয়া-টেকনাফ জুড়ে' },
      { icon: '🛣️', value: 480, suffix: ' কি.মি.', label: 'সড়ক ও সেতু নির্মাণ',      context: '২৫+ নতুন সেতু সহ' },
      { icon: '🎓', value: 500, suffix: '+',       label: 'শিক্ষাবৃত্তি প্রদান',      context: 'মেধাবী শিক্ষার্থীদের' },
    ],
  },
];

function StatCard({ item, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="stat-card" style={{ animationDelay: `${delay}s` }}>
      <span className="stat-icon">{item.icon}</span>
      <div className="stat-value">
        {inView ? <CountUp end={Number(item.value)} duration={2.4} separator="," /> : '0'}
        <span className="stat-suffix">{item.suffix}</span>
      </div>
      <div className="stat-label">{item.label}</div>
      <div className="stat-context">{item.context}</div>
    </div>
  );
}

// ─── Typewriter ──────────────────────────────────────────────────
function TypeWriter({ texts }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const text = texts[current];
    let t;
    if (!deleting && displayed.length < text.length)
      t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 80);
    else if (!deleting)
      t = setTimeout(() => setDeleting(true), 2500);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    else { setDeleting(false); setCurrent((current + 1) % texts.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, current, texts]);
  return <span className="typewriter">{displayed}<span className="cursor">|</span></span>;
}

// ─── Bengali date parser ─────────────────────────────────────────
const BN_M = { 'জানুয়ারি':0,'ফেব্রুয়ারি':1,'মার্চ':2,'এপ্রিল':3,'মে':4,'জুন':5,'জুলাই':6,'আগস্ট':7,'সেপ্টেম্বর':8,'অক্টোবর':9,'নভেম্বর':10,'ডিসেম্বর':11 };
const BND = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
const bnEn = s => String(s).replace(/[০-৯]/g, d => BND[d]||d);
function parseBnDate(str) {
  if (!str) return 0;
  const p = String(str).split(' ');
  if (p.length===3) return new Date(parseInt(bnEn(p[2]))||2000, BN_M[p[1]]??0, parseInt(bnEn(p[0]))||1).getTime();
  return 0;
}

export default function Home() {
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const fn = () => { if (heroRef.current) setParallax(window.scrollY * 0.4); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const { ref: newsRef, inView: newsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Live news from Sheets, sorted by date
  const { data: allNews } = useSheetData(
    CONFIG.sheets.news.enabled ? CONFIG.sheets.news.url : null,
    NEWS
  );
  const latestNews = [...allNews].sort((a,b) => parseBnDate(b.date)-parseBnDate(a.date)).slice(0,3);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" style={{ transform: `translateY(${parallax}px)` }} />
        <div className="hero-overlay" />
        <div className="hero-pattern" />
        {/* Large watermark behind everything */}
        <div className="hero-watermark" aria-hidden="true">
          <DhanerShish size={380} opacity={0.04} />
        </div>

        <div className="container hero-inner">
          <div className="hero-content">
            {/* BNP pill — sits above the location badge */}
            {/* <div className="hero-bnp-pill">
              <DhanerShish size={20} opacity={1} />
              <span>বাংলাদেশ জাতীয়তাবাদী দল · বিএনপি</span>
            </div> */}
            <div className="hero-badge">
              <span className="badge-dot" />
              কক্সবাজার-৪ | উখিয়া - টেকনাফ
            </div>
            <h1 className="hero-title bangla-title">{MP.name}</h1>
            <div className="hero-role">
              <TypeWriter texts={[
                'মাননীয় সংসদ সদস্য',
                'সভাপতি, কক্সবাজার জেলা বিএনপি',
                'সাবেক সংসদীয় হুইপ',
                'কক্সবাজার-৪ সবার',
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
            <img src={MP.photo} alt={MP.name} className="hero-photo"
              onError={e => { e.target.onerror = null; }} />
            <div className="hero-photo-badge">
              <span>৫ বার</span>
              <span>নির্বাচিত</span>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-mouse" />
          <span>স্ক্রোল করুন</span>
        </div>
      </section>

      {/* BNP BAND */}
      <BnpBand />

      {/* ACHIEVEMENT STATS — two themed groups */}
      <section className="stats-section section-pad-sm">
        <div className="container">
          {STAT_GROUPS.map((group, gi) => (
            <div key={gi} className="stat-group">
              <div className="stat-group-header">
                <span className="stat-group-label">{group.label}</span>
                <div className="stat-group-line" />
              </div>
              <div className="stats-grid">
                {group.items.map((item, ii) => (
                  <StatCard key={ii} item={item} delay={(gi*3+ii)*0.1} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO BAND */}
      <section className="intro-band section-pad">
        <div className="container intro-band-inner">
          <div className="intro-img-wrap">
            <img src={MP.photoFormal} alt={MP.name} className="intro-img"
              onError={e => { e.target.onerror = null; }} />
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
            <Link to="/about" className="btn-primary" style={{ marginTop: '1.75rem' }}>আরও জানুন →</Link>
          </div>
        </div>
      </section>

      {/* SOCIAL WORK */}
      <section className="social-highlight section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">উন্নয়ন কার্যক্রম</span>
            <h2 className="section-title bangla-title">সামাজিক উন্নয়নে অগ্রণী ভূমিকা</h2>
          </div>
          <div className="social-grid">
            {SOCIAL_WORKS.slice(0, 4).map(item => (
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

      {/* LATEST NEWS */}
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
            {latestNews.map((item, i) => (
              <article key={item.id||i} className="news-card card" style={{ animationDelay: `${i*0.12}s` }}>
                <div className="news-img-wrap">
                  <img src={item.image} alt={item.title}
                    onError={e => { e.target.onerror=null; e.target.closest('.news-img-wrap').style.display='none'; }} />
                  <span className="news-category-badge">{item.category}</span>
                </div>
                <div className="news-body">
                  <div className="news-date">📅 {item.date}</div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.excerpt}</p>
                  <Link to="/news" className="news-read-more">বিস্তারিত পড়ুন →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — redesigned two-column */}
      <section className="cta-section">
        <div className="cta-bg-gradient" />
        <div className="cta-bg-watermark" aria-hidden="true">
          <DhanerShish size={340} opacity={0.055} />
        </div>
        <div className="container cta-inner">
          <div className="cta-left">
            <div className="cta-eyebrow">
              <span className="cta-eyebrow-dot" />
              সরাসরি যোগাযোগ
            </div>
            <h2 className="cta-title bangla-title">আপনার সমস্যা জানান</h2>
            <p className="cta-desc">
              নির্বাচনী এলাকার যেকোনো সমস্যা, অভিযোগ বা পরামর্শ সরাসরি মাননীয় সংসদ সদস্যের কাছে পৌঁছে দিন।
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">✉️&nbsp; বার্তা পাঠান</Link>
              <a href={CONFIG.whatsapp.messageLink} target="_blank" rel="noreferrer" className="cta-whatsapp">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                হোয়াটসঅ্যাপ
              </a>
            </div>
          </div>
          <div className="cta-right">
            {[
              { icon:'📍', title:'কার্যালয়',    value: MP.office },
              { icon:'🕐', title:'অফিস সময়',   value:'সোম–শুক্র, সকাল ৯টা – বিকাল ৫টা' },
              { icon:'📞', title:'যোগাযোগ',     value: MP.phone },
              { icon:'✉️', title:'ইমেইল',       value: MP.email },
            ].map((c,i) => (
              <div key={i} className="cta-info-card">
                <span className="cta-info-icon">{c.icon}</span>
                <div>
                  <div className="cta-info-title">{c.title}</div>
                  <div className="cta-info-value">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}