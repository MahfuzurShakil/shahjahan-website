import { useState, useEffect, useCallback } from 'react';
import { NEWS } from '../data/staticData';
import { CONFIG } from '../config';
import { useSheetData } from '../hooks/useSheetData';
import PageHero from '../components/PageHero';
import './News.css';

const CATS = ['সব', 'উন্নয়ন', 'সামাজিক', 'সংসদ', 'শিক্ষা', 'স্বাস্থ্য'];

const CAT_META = {
  'উন্নয়ন':  { color: '#1a5c45', bg: 'rgba(26,92,69,0.1)'  },
  'সামাজিক': { color: '#2d8a5e', bg: 'rgba(45,138,94,0.1)' },
  'সংসদ':    { color: '#0d3b2e', bg: 'rgba(13,59,46,0.1)'  },
  'শিক্ষা':  { color: '#b07d10', bg: 'rgba(201,168,76,0.12)'},
  'স্বাস্থ্য':{ color: '#7b4f9e', bg: 'rgba(123,79,158,0.1)'},
};

const catColor = (cat) => CAT_META[cat]?.color || '#1a5c45';

/* ═══ MODAL ═══════════════════════════════════════════════ */
function NewsModal({ item, allNews, onClose, onNavigate }) {
  const suggestions = allNews.filter(n => n.id !== item.id).slice(0, 3);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const color = catColor(item.category);

  return (
    <div className="nm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="nm-dialog" role="dialog" aria-modal="true">

        {/* Close */}
        <button className="nm-close" onClick={onClose} aria-label="বন্ধ করুন">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M14 4L4 14M4 4L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Hero image */}
        <div className="nm-hero">
          <img
            src={item.image}
            alt={item.title}
            className="nm-hero-img"
            onError={e => { e.target.src = `https://via.placeholder.com/900x440/1a5c45/ffffff?text=সংবাদ`; }}
          />
          <div className="nm-hero-gradient" />
          <div className="nm-hero-badges">
            <span className="nm-badge" style={{ background: color }}>{item.category}</span>
            {item.featured === 'TRUE' && <span className="nm-badge nm-badge-gold">⭐ প্রধান সংবাদ</span>}
          </div>
        </div>

        {/* Body */}
        <div className="nm-body">
          <div className="nm-meta-row">
            <span className="nm-date">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {item.date}
            </span>
          </div>

          <h2 className="nm-title">{item.title}</h2>
          <div className="nm-rule" style={{ background: color }} />

          <p className="nm-lead">{item.excerpt}</p>

          <div className="nm-content">
            <p>এই প্রকল্পটি এলাকার দীর্ঘমেয়াদী উন্নয়নের একটি গুরুত্বপূর্ণ অংশ। মাননীয় সংসদ সদস্য আলহাজ্ব শাহজাহান চৌধুরীর ব্যক্তিগত উদ্যোগে এবং সরকারের সহায়তায় এই কার্যক্রম পরিচালিত হচ্ছে। ভবিষ্যতে আরও বড় পরিসরে এই ধরনের উদ্যোগ নেওয়ার পরিকল্পনা রয়েছে।</p>
            <p>এলাকার জনগণের দীর্ঘদিনের দাবির প্রেক্ষিতে এবং তাদের জীবনমান উন্নয়নের লক্ষ্যে এই পদক্ষেপ গ্রহণ করা হয়েছে। স্থানীয় প্রশাসন ও সংশ্লিষ্ট কর্তৃপক্ষের সাথে সমন্বয় করে এই উদ্যোগটি বাস্তবায়ন করা হচ্ছে।</p>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="nm-suggestions">
              <h4 className="nm-sugg-heading">আরও পড়ুন</h4>
              <div className="nm-sugg-list">
                {suggestions.map(s => (
                  <div key={s.id} className="nm-sugg-item" onClick={() => onNavigate(s)}>
                    <div className="nm-sugg-img-wrap">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="nm-sugg-img"
                        onError={e => { e.target.src = `https://via.placeholder.com/120x80/1a5c45/ffffff?text=News`; }}
                      />
                    </div>
                    <div className="nm-sugg-info">
                      <span className="nm-sugg-cat" style={{ color: catColor(s.category) }}>{s.category}</span>
                      <p className="nm-sugg-title">{s.title}</p>
                      <span className="nm-sugg-date">{s.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══ FEATURED HERO CARD ════════════════════════════════════ */
function FeaturedCard({ item, onOpen }) {
  const color = catColor(item.category);
  return (
    <div className="nf-hero" onClick={() => onOpen(item)}>
      <div className="nf-hero-media">
        <img
          src={item.image}
          alt={item.title}
          className="nf-hero-img"
          onError={e => { e.target.src = 'https://via.placeholder.com/1200x560/0d3b2e/ffffff?text=প্রধান+সংবাদ'; }}
        />
        <div className="nf-hero-gradient" />
      </div>
      <div className="nf-hero-content">
        <div className="nf-hero-tags">
          {item.featured === 'TRUE' && <span className="nf-tag-gold">⭐ প্রধান সংবাদ</span>}
          <span className="nf-tag-cat" style={{ background: color }}>{item.category}</span>
        </div>
        <div className="nf-hero-date">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {item.date}
        </div>
        <h2 className="nf-hero-title">{item.title}</h2>
        <p className="nf-hero-excerpt">{item.excerpt}</p>
        <div className="nf-hero-btn">
          বিস্তারিত পড়ুন
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══ STANDARD NEWS CARD ════════════════════════════════════ */
function NewsCard({ item, index, onOpen, size = 'normal' }) {
  const color = catColor(item.category);
  return (
    <article
      className={`nc nc--${size}`}
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => onOpen(item)}
    >
      <div className="nc-img-wrap">
        <img
          src={item.image}
          alt={item.title}
          className="nc-img"
          loading="lazy"
          onError={e => { e.target.src = 'https://via.placeholder.com/400x240/1a5c45/ffffff?text=সংবাদ'; }}
        />
        <div className="nc-img-overlay" />
        <span className="nc-cat" style={{ background: color }}>{item.category}</span>
        {item.featured === 'TRUE' && <span className="nc-featured">⭐</span>}
      </div>
      <div className="nc-body">
        <p className="nc-date">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {item.date}
        </p>
        <h3 className="nc-title">{item.title}</h3>
        <p className="nc-excerpt">{item.excerpt}</p>
        <span className="nc-read" style={{ color }}>
          বিস্তারিত পড়ুন
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div className="nc-bar" style={{ background: color }} />
    </article>
  );
}

/* ═══ MAIN PAGE ═════════════════════════════════════════════ */
export default function News() {
  const [active, setActive]     = useState('সব');
  const [modalItem, setModalItem] = useState(null);

  const { data: news, loading } = useSheetData(
    CONFIG.sheets.news.enabled ? CONFIG.sheets.news.url : null,
    NEWS
  );

  const filtered  = active === 'সব' ? news : news.filter(n => n.category === active);
  const featured  = filtered.find(n => n.featured === 'TRUE') || filtered[0];
  const secondary = filtered.filter(n => n.id !== featured?.id);

  // For the grid: first 2 get a "medium" slot, rest are "small"
  const topTwo  = secondary.slice(0, 2);
  const theRest = secondary.slice(2);

  const handleNavigate = useCallback((item) => {
    setModalItem(null);
    setTimeout(() => setModalItem(item), 60);
  }, []);

  return (
    <div>
      <PageHero
        title="সংবাদ ও বিজ্ঞপ্তি"
        subtitle="সাম্প্রতিক কার্যক্রম, উন্নয়ন প্রকল্প ও গুরুত্বপূর্ণ বিজ্ঞপ্তি"
        breadcrumb="হোম / সংবাদ"
      />

      <section className="section-pad">
        <div className="container">

          {/* ── Filter Bar ── */}
          <div className="news-filterbar">
            <div className="news-filterbar-inner">
              <span className="news-filterbar-label">বিভাগ</span>
              <div className="news-pills">
                {CATS.map(cat => (
                  <button
                    key={cat}
                    className={`news-pill ${active === cat ? 'active' : ''}`}
                    onClick={() => setActive(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <span className="news-total">{filtered.length} টি সংবাদ</span>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="news-loading">
              <div className="news-spinner" />
              <span>সংবাদ লোড হচ্ছে…</span>
            </div>
          )}

          {/* ── Content ── */}
          {!loading && filtered.length > 0 && (
            <>
              {/* Featured hero */}
              {featured && <FeaturedCard item={featured} onOpen={setModalItem} />}

              {/* Secondary grid – top two side by side */}
              {topTwo.length > 0 && (
                <div className="news-secondary-grid">
                  {topTwo.map((item, i) => (
                    <NewsCard key={item.id} item={item} index={i} onOpen={setModalItem} size="medium" />
                  ))}
                </div>
              )}

              {/* Remaining items – 3 col grid */}
              {theRest.length > 0 && (
                <>
                  <div className="news-divider-row">
                    <div className="news-divider-line" />
                    <span className="news-divider-text">আরও সংবাদ</span>
                    <div className="news-divider-line" />
                  </div>
                  <div className="news-main-grid">
                    {theRest.map((item, i) => (
                      <NewsCard key={item.id} item={item} index={i} onOpen={setModalItem} size="normal" />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ── Empty ── */}
          {!loading && filtered.length === 0 && (
            <div className="news-empty">
              <span className="news-empty-icon">📰</span>
              <p>এই বিভাগে কোনো সংবাদ নেই।</p>
            </div>
          )}

        </div>
      </section>

      {modalItem && (
        <NewsModal
          item={modalItem}
          allNews={news}
          onClose={() => setModalItem(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}