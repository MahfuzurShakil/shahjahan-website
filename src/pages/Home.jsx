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

// ─── BNP Identity Band ────────────────────────────────────────────
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

// ─── অঙ্গীকার ও প্রতিশ্রুতি Data ────────────────────────────────
const ANGIKARS = [
  {
    id: 4,
    icon: '🎓',
    title: 'শিক্ষা ও দক্ষ মানবসম্পদ তৈরি',
    short: 'উখিয়া-টেকনাফের যুবসমাজকে আধুনিক কারিগরি প্রশিক্ষণ, ভাষা শিক্ষা ও ফ্রিল্যান্সিং দক্ষতায় গড়ে তুলে দেশে-বিদেশে কর্মসংস্থান সৃষ্টি করা।',
    details: 'সরকারি-বেসরকারি অংশীদারিত্বে কারিগরি প্রশিক্ষণ কেন্দ্র স্থাপন, ইংরেজি ও অ্যারাবিক ভাষা শিক্ষা কার্যক্রম, ফ্রিল্যান্সিং ও আইটি প্রশিক্ষণ, মেধাবী শিক্ষার্থীদের বৃত্তি প্রদান এবং নারী ও প্রতিবন্ধীদের জন্য বিশেষ কর্মসূচি চালু করা হবে। প্রশিক্ষণপ্রাপ্তদের জন্য জাতীয় ও আন্তর্জাতিক চাকরির সুযোগ তৈরিতে সহায়তা করা হবে।',
  },
  {
    id: 5,
    icon: '🚫',
    title: 'মাদকমুক্ত সুস্থ সমাজ গঠন',
    short: 'ইয়াবা ও মাদকের ভয়াল ছোবল থেকে উখিয়া-টেকনাফের যুবসমাজকে রক্ষা করে সুস্থ, নিরাপদ ও নৈতিক সমাজ প্রতিষ্ঠা করা।',
    details: 'ওয়ার্ড ও ইউনিয়নভিত্তিক মাদকবিরোধী নাগরিক কমিটি গঠন, আইনশৃঙ্খলা জোরদার, খেলাধুলা ও সৃজনশীল কার্যক্রমের বিস্তার, সামাজিক সংগঠন ও স্বেচ্ছাসেবীদের সম্পৃক্ত করা এবং মাদকাসক্তদের জন্য মানবিক চিকিৎসা ও পুনর্বাসন সহায়তা প্রদান করা হবে। সচেতনতামূলক প্রচারণার মাধ্যমে সমাজের প্রতিটি স্তরে ইতিবাচক পরিবর্তন আনা হবে।',
  },
  {
    id: 6,
    icon: '🌊',
    title: 'নিরাপদ ও সুন্দর উখিয়া-টেকনাফ',
    short: 'সড়ক দুর্ঘটনা, মানবপাচার, নারী-শিশু নির্যাতন রোধ এবং প্রাকৃতিক দুর্যোগ মোকাবিলায় সার্বিক নিরাপত্তা ব্যবস্থা গড়ে তোলা।',
    details: 'সীমান্তবর্তী উখিয়া-টেকনাফে মানবপাচার রোধে কঠোর ব্যবস্থা, সড়ক নিরাপত্তা নিশ্চিতে আধুনিক সংকেত ব্যবস্থা, নারী ও শিশু নির্যাতন রোধে বিশেষ সেল গঠন, বন্যা ও ঘূর্ণিঝড় মোকাবিলায় আশ্রয়কেন্দ্র নির্মাণ এবং দুর্যোগ পরবর্তী ত্বরিত ক্ষতিপূরণ ও পুনর্বাসন নিশ্চিত করা হবে।',
  },
  
  {
    id: 1,
    icon: '🐟',
    title: 'জেলেদের মাছ ধরার অধিকার পুনঃপ্রতিষ্ঠা',
    short: 'উখিয়া-টেকনাফের জেলে পরিবারগুলোর জীবিকা রক্ষায় সমুদ্রে মাছ ধরার উপর আরোপিত অন্যায় নিষেধাজ্ঞা প্রত্যাহার করে তাদের জীবিকার নিশ্চয়তা দেওয়া।',
    details: 'উখিয়া-টেকনাফ উপকূলীয় এলাকার হাজার হাজার জেলে পরিবার সমুদ্রে মাছ ধরার উপর নির্ভরশীল। বিভিন্ন সময়ে আরোপিত অযৌক্তিক নিষেধাজ্ঞা এবং আমলাতান্ত্রিক জটিলতায় তারা জীবিকা হারাচ্ছেন। জেলেদের লাইসেন্স প্রক্রিয়া সহজ করা, গভীর সমুদ্রে মাছ ধরার সুযোগ তৈরি, আধুনিক নৌকা ও জাল সরবরাহে সহায়তা এবং মৎস্য প্রক্রিয়াকরণ কেন্দ্র স্থাপন করা আমার অঙ্গীকার।',
  },
  {
    id: 2,
    icon: '🛳️',
    title: 'টেকনাফ স্থলবন্দর পুনরায় চালুকরণ',
    short: 'টেকনাফ স্থলবন্দর বন্ধ থাকায় মিয়ানমারের সাথে বাণিজ্য স্থবির হয়ে পড়েছে। এটি পুনরায় চালু করে স্থানীয় ব্যবসায়ীদের ও অর্থনীতিকে সচল করা জরুরি।',
    details: 'টেকনাফ স্থলবন্দর বাংলাদেশ-মিয়ানমার বাণিজ্যের একটি গুরুত্বপূর্ণ প্রবেশদ্বার। বন্দর বন্ধ থাকায় টেকনাফের শত শত ব্যবসায়ী ক্ষতিগ্রস্ত এবং হাজারো শ্রমিক বেকার হয়ে পড়েছেন। কূটনৈতিক উদ্যোগ ও আলোচনার মাধ্যমে দ্রুত বন্দর চালু, অবকাঠামো উন্নয়ন, কাস্টমস প্রক্রিয়া সহজীকরণ এবং দ্বিপাক্ষিক বাণিজ্য বৃদ্ধিতে সক্রিয় ভূমিকা রাখা আমার প্রধান লক্ষ্য।',
  },
  {
    id: 3,
    icon: '🏥',
    title: 'স্বাস্থ্যসেবা ও আধুনিক হাসপাতাল',
    short: 'উখিয়া-টেকনাফে আধুনিক হাসপাতাল নির্মাণ, বিশেষজ্ঞ চিকিৎসক নিয়োগ ও সাধারণ মানুষের জন্য সহজলভ্য স্বাস্থ্যসেবা নিশ্চিত করা।',
    details: 'উখিয়া-টেকনাফের মানুষ উন্নত চিকিৎসার জন্য কক্সবাজার বা চট্টগ্রামে যেতে বাধ্য হন। স্থানীয়ভাবে ৫০-শয্যার আধুনিক হাসপাতাল, ডায়ালিসিস সেন্টার, মাতৃ ও শিশু স্বাস্থ্য কেন্দ্র স্থাপন, প্রত্যন্ত এলাকায় মোবাইল মেডিকেল ক্যাম্প পরিচালনা এবং বিনামূল্যে ওষুধ বিতরণ কর্মসূচি বাস্তবায়ন করা হবে।',
  },
  
  {
    id: 7,
    icon: '⚡',
    title: 'নবায়নযোগ্য জ্বালানি ও বিদ্যুৎ',
    short: 'উখিয়া-টেকনাফের সমুদ্র বাতাস ও প্রখর সূর্যালোক ব্যবহার করে সৌর ও বায়ু বিদ্যুৎ প্রকল্পের মাধ্যমে বিদ্যুৎ ঘাটতি দূর করা।',
    details: 'উপকূলীয় এলাকায় সৌর বিদ্যুৎ প্যানেল স্থাপন, বায়ু বিদ্যুৎ টার্বাইন প্রকল্প গ্রহণ, প্রত্যন্ত গ্রামে সোলার হোম সিস্টেম সরবরাহ এবং নবায়নযোগ্য জ্বালানিতে স্থানীয় উদ্যোক্তাদের বিনিয়োগে সহায়তা করা হবে। এর ফলে শিল্প ও পর্যটন খাতে বিদ্যুৎ সরবরাহ নিশ্চিত হবে এবং পরিবেশবান্ধব উন্নয়ন ত্বরান্বিত হবে।',
  },
  {
    id: 8,
    icon: '🛣️',
    title: 'সড়ক, সেতু ও অবকাঠামো উন্নয়ন',
    short: 'উখিয়া-টেকনাফের প্রতিটি ইউনিয়নকে পাকা সড়কে সংযুক্ত করা এবং টেকনাফ-কক্সবাজার মহাসড়ক চার লেনে উন্নীত করার দাবি বাস্তবায়ন।',
    details: 'গ্রামীণ সড়ক পাকাকরণ, গুরুত্বপূর্ণ সেতু নির্মাণ, টেকনাফ-কক্সবাজার মহাসড়ক সম্প্রসারণ, বন্দর ও হাট-বাজারের সাথে সংযোগ সড়ক উন্নয়ন এবং পাহাড়ি এলাকায় নিরাপদ যোগাযোগ ব্যবস্থা গড়ে তোলা হবে। উন্নত যোগাযোগ ব্যবস্থা পর্যটন, বাণিজ্য ও কৃষি সকল খাতকে সমৃদ্ধ করবে।',
  },
  {
    id: 9,
    icon: '🌿',
    title: 'পরিবেশ সংরক্ষণ ও সবুজ উখিয়া-টেকনাফ',
    short: 'বনভূমি ধ্বংস রোধ, উপকূলীয় বনায়ন, দূষণ নিয়ন্ত্রণ এবং জীববৈচিত্র্য রক্ষায় কঠোর পদক্ষেপ গ্রহণ করা।',
    details: 'উখিয়া-টেকনাফের বনভূমি রক্ষায় কঠোর আইন প্রয়োগ, ঘূর্ণিঝড় ও জলোচ্ছাস প্রতিরোধে উপকূলীয় বনায়ন, নদী-খাল পরিষ্কার ও বর্জ্য ব্যবস্থাপনা উন্নয়ন, প্লাস্টিক দূষণ নিয়ন্ত্রণ, পার্ক ও সবুজ স্থান বৃদ্ধি এবং পরিবেশ সচেতনতামূলক কর্মশালা আয়োজন করা হবে।',
  },
];

// ─── Angikar Section Component ───────────────────────────────────
function AngikarSection() {
  const [expanded, setExpanded] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const visibleCards = showAll ? ANGIKARS : ANGIKARS.slice(0, 6);

  return (
    <section className="angikar-section section-pad" ref={ref}>
      <div className="container">
        <div className="section-header-center">
          <div className="gold-line gold-line-center" />
          <span className="section-eyebrow">উন্নয়নের রোডম্যাপ</span>
          <h2 className="section-title bangla-title">অঙ্গীকার ও প্রতিশ্রুতি</h2>
          <p className="angikar-subtitle">উখিয়া-টেকনাফের সার্বিক উন্নয়নে আমার সুনির্দিষ্ট প্রতিশ্রুতি</p>
        </div>

        <div className={`angikar-grid ${inView ? 'visible' : ''}`}>
          {visibleCards.map((item, i) => (
            <div
              key={item.id}
              className={`angikar-card ${expanded === item.id ? 'angikar-card--open' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="angikar-card-top" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                <div className="angikar-card-icon-wrap">
                  <span className="angikar-card-icon">{item.icon}</span>
                </div>
                <div className="angikar-card-header">
                  <h3 className="angikar-card-title">{item.title}</h3>
                  <p className="angikar-card-short">{item.short}</p>
                </div>
                <button className="angikar-toggle" aria-label="বিস্তারিত">
                  <span className={`angikar-toggle-icon ${expanded === item.id ? 'open' : ''}`}>▾</span>
                </button>
              </div>

              {expanded === item.id && (
                <div className="angikar-card-details">
                  <div className="angikar-detail-divider" />
                  <p className="angikar-detail-text">{item.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showAll && ANGIKARS.length > 6 && (
          <div className="center-cta" style={{ marginTop: '2.5rem' }}>
            <button
              className="btn-outline angikar-show-more"
              onClick={() => setShowAll(true)}
              style={{ color: 'var(--forest)', borderColor: 'var(--forest)' }}
            >
              আরও {ANGIKARS.length - 6}টি অঙ্গীকার দেখুন ↓
            </button>
          </div>
        )}
        {showAll && (
          <div className="center-cta" style={{ marginTop: '2.5rem' }}>
            <button
              className="btn-outline angikar-show-more"
              onClick={() => setShowAll(false)}
              style={{ color: 'var(--forest)', borderColor: 'var(--forest)' }}
            >
              কম দেখুন ↑
            </button>
          </div>
        )}
      </div>
    </section>
  );
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
        <div className="hero-watermark" aria-hidden="true">
          <DhanerShish size={380} opacity={0.04} />
        </div>

        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              কক্সবাজার-৪ | উখিয়া - টেকনাফ
            </div>
            <h1 className="hero-title bangla-title">{MP.name}</h1>
            <div className="hero-role">
              <TypeWriter texts={[
                'মাননীয় সংসদ সদস্য, কক্সবাজার-৪',
                'সভাপতি, কক্সবাজার জেলা বিএনপি',
                'সাবেক সংসদীয় হুইপ'
                // 'কক্সবাজার-৪ সবার',
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
        {/* scroll hint removed */}
      </section>

      {/* BNP BAND */}
      <BnpBand />

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
              আলহাজ্ব শাহজাহান চৌধুরী কক্সবাজার-৪ আসনের পাঁচবার নির্বাচিত সংসদ সদস্য। তিনি বাংলাদেশ জাতীয়তাবাদী দলের (বিএনপি) কক্সবাজার জেলা সভাপতি এবং সাবেক সংসদীয় হুইপ।
            </p>
            <p className="bangla-body" style={{ color: 'var(--text-muted)' }}>
              পাঁচ দশকেরও বেশি সময় ধরে উখিয়া-টেকনাফ এলাকার মানুষের শিক্ষা, স্বাস্থ্য, অবকাঠামোগত উন্নয়ন, যোগাযোগ ও কর্মসংস্থানের জন্য অক্লান্ত পরিশ্রম করে আসছেন।
            </p>
            <Link to="/about" className="btn-primary" style={{ marginTop: '1.75rem' }}>আরও জানুন →</Link>
          </div>
        </div>
      </section>

      {/* অঙ্গীকার ও প্রতিশ্রুতি */}
      <AngikarSection />

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
              <article key={`news-${item.id}-${i}`} className="news-card card" style={{ animationDelay: `${i*0.12}s` }}>
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

      {/* CTA */}
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