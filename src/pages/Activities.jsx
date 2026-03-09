import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ACTIVITIES } from '../data/staticData';
import { CONFIG } from '../config';
import { useSheetData } from '../hooks/useSheetData';
import PageHero from '../components/PageHero';
import './Activities.css';

// ─── Category config (icon + color) ─────────────────────────────
const CATEGORY_META = {
  'সংসদীয়':       { color: '#0d3b2e', bg: '#e8f5ee', icon: '🏛️' },
  'আইন ও নীতি':   { color: '#1a5c45', bg: '#eaf4ef', icon: '⚖️' },
  'আন্তর্জাতিক':  { color: '#2d6a4f', bg: '#edf7f2', icon: '🌍' },
  'উন্নয়ন':       { color: '#b5850a', bg: '#fdf6e3', icon: '🏗️' },
  'মানবাধিকার':   { color: '#7b3f00', bg: '#fdf0e6', icon: '🤝' },
  'পরিবেশ':       { color: '#2d8a5e', bg: '#eaf7f2', icon: '🌿' },
  'রাজনৈতিক':     { color: '#5c1a1a', bg: '#fdf0f0', icon: '✊' },
  'অন্যান্য':     { color: '#444',    bg: '#f4f4f4', icon: '📌' },
};

function getMeta(category) {
  return CATEGORY_META[category] || CATEGORY_META['অন্যান্য'];
}

// ─── Statistics strip ─────────────────────────────────────────────
function StatsStrip({ activities }) {
  const categories = [...new Set(activities.map(a => a.category || a.type || 'অন্যান্য'))];
  return (
    <div className="act-stats-strip">
      <div className="act-stat">
        <span className="act-stat-value">{activities.length}+</span>
        <span className="act-stat-label">মোট কার্যক্রম</span>
      </div>
      <div className="act-stat-div" />
      <div className="act-stat">
        <span className="act-stat-value">{categories.length}</span>
        <span className="act-stat-label">বিভাগ</span>
      </div>
      <div className="act-stat-div" />
      <div className="act-stat">
        <span className="act-stat-value">৫০+</span>
        <span className="act-stat-label">বছরের অভিজ্ঞতা</span>
      </div>
      <div className="act-stat-div" />
      <div className="act-stat">
        <span className="act-stat-value">৫ বার</span>
        <span className="act-stat-label">নির্বাচিত সংসদ সদস্য</span>
      </div>
    </div>
  );
}

// ─── Activity Card ────────────────────────────────────────────────
function ActivityCard({ item, index, onOpen }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const category = item.category || item.type || 'অন্যান্য';
  const meta = getMeta(category);
  const hasDetails = item.details && item.details.trim().length > 0;

  return (
    <div
      ref={ref}
      className={`act-card ${inView ? 'act-card--visible' : ''}`}
      style={{ animationDelay: `${index * 0.07}s` }}
      onClick={() => hasDetails && onOpen(item)}
    >
      {/* Top accent bar */}
      <div className="act-card-accent" style={{ background: meta.color }} />

      <div className="act-card-body">
        {/* Icon + category */}
        <div className="act-card-top">
          <div className="act-card-icon-wrap" style={{ background: meta.bg, borderColor: meta.color + '33' }}>
            <span className="act-card-icon">{item.icon || meta.icon}</span>
          </div>
          <div className="act-card-tags">
            <span className="act-category-tag" style={{ color: meta.color, background: meta.bg }}>
              {category}
            </span>
            {item.year && (
              <span className="act-year-tag">{item.year}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="act-card-title">{item.title}</h3>

        {/* Short description */}
        <p className="act-card-desc">{item.desc || item.description}</p>

        {/* Count badge */}
        {item.count && (
          <div className="act-card-count">
            <span className="act-count-dot" style={{ background: meta.color }} />
            {item.count}
          </div>
        )}

        {/* Footer */}
        {hasDetails && (
          <div className="act-card-footer">
            <span className="act-read-more" style={{ color: meta.color }}>
              বিস্তারিত দেখুন <span className="act-arrow">→</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Modal Popup ──────────────────────────────────────────────────
function ActivityModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const category = item.category || item.type || 'অন্যান্য';
  const meta = getMeta(category);

  // Split details into bullet points if pipe-separated
  const detailPoints = item.details
    ? item.details.split('|').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="act-modal-overlay" onClick={onClose}>
      <div className="act-modal" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="act-modal-close" onClick={onClose} aria-label="বন্ধ করুন">✕</button>

        {/* Header */}
        <div className="act-modal-header" style={{ borderColor: meta.color }}>
          <div className="act-modal-icon-wrap" style={{ background: meta.bg }}>
            <span>{item.icon || meta.icon}</span>
          </div>
          <div>
            <span className="act-category-tag" style={{ color: meta.color, background: meta.bg }}>
              {category}
            </span>
            {item.year && <span className="act-year-tag" style={{ marginLeft: '0.5rem' }}>{item.year}</span>}
            <h2 className="act-modal-title">{item.title}</h2>
          </div>
        </div>

        {/* Summary */}
        <p className="act-modal-summary">{item.desc || item.description}</p>

        {/* Details bullets */}
        {detailPoints.length > 0 && (
          <div className="act-modal-details">
            <h4 className="act-modal-details-heading">বিস্তারিত কার্যক্রম</h4>
            <ul className="act-modal-bullets">
              {detailPoints.map((point, i) => (
                <li key={i} className="act-modal-bullet">
                  <span className="act-bullet-dot" style={{ background: meta.color }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Count */}
        {item.count && (
          <div className="act-modal-count-wrap">
            <span className="act-modal-count-label">অর্জন / পরিসংখ্যান</span>
            <span className="act-modal-count-value" style={{ color: meta.color }}>{item.count}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Activities() {
  const [activeCategory, setActiveCategory] = useState('সব');
  const [modalItem, setModalItem] = useState(null);

  // Load from Google Sheets
  const { data: sheetActivities, loading } = useSheetData(
    CONFIG.sheets.activities?.enabled ? CONFIG.sheets.activities.url : null,
    ACTIVITIES
  );

  // Normalize: sheet data uses 'category' column, static uses 'type'
  const activities = sheetActivities.map(a => ({
    ...a,
    category: a.category || a.type || 'অন্যান্য',
    icon: a.icon || getMeta(a.category || a.type || 'অন্যান্য').icon,
  }));

  // Build category list
  const categories = ['সব', ...new Set(activities.map(a => a.category))];

  // Filter
  const filtered = activeCategory === 'সব'
    ? activities
    : activities.filter(a => a.category === activeCategory);

  return (
    <div>
      <PageHero
        title="রাজনৈতিক কার্যক্রম"
        subtitle="সংসদীয় কার্যক্রম, আইন প্রণয়ন, উন্নয়ন কর্মসূচি ও জনসেবায় নিরলস অবদান"
        breadcrumb="হোম / রাজনৈতিক কার্যক্রম"
      />

      <div className="act-page">

        {/* Stats strip */}
        <section className="act-stats-section">
          <div className="container">
            <StatsStrip activities={activities} />
          </div>
        </section>

        {/* Category filter tabs */}
        <section className="act-filter-section">
          <div className="container">
            <div className="act-filter-bar">
              {categories.map(cat => {
                const meta = cat === 'সব' ? { color: '#0d3b2e', bg: '#e8f5ee' } : getMeta(cat);
                return (
                  <button
                    key={cat}
                    className={`act-filter-btn ${activeCategory === cat ? 'act-filter-btn--active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    style={activeCategory === cat ? { background: meta.color, color: '#fff', borderColor: meta.color } : {}}
                  >
                    {cat !== 'সব' && <span>{getMeta(cat).icon}</span>}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cards grid */}
        <section className="act-cards-section section-pad">
          <div className="container">
            {loading ? (
              <div className="act-loading">
                <div className="act-spinner" />
                <span>তথ্য লোড হচ্ছে...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="act-empty">এই বিভাগে কোনো কার্যক্রম নেই।</div>
            ) : (
              <div className="act-grid">
                {filtered.map((item, i) => (
                  <ActivityCard
                    key={item.id || i}
                    item={item}
                    index={i}
                    onOpen={setModalItem}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        

      </div>

      {/* Modal */}
      {modalItem && (
        <ActivityModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </div>
  );
}