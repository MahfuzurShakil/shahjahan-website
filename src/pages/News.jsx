import { useState } from 'react';
import { NEWS } from '../data/staticData';
import { CONFIG } from '../config';
import { useSheetData } from '../hooks/useSheetData';
import PageHero from '../components/PageHero';
import './News.css';

const CATS = ['সব', 'উন্নয়ন', 'সামাজিক', 'সংসদ', 'শিক্ষা', 'স্বাস্থ্য'];

export default function News() {
  const [active, setActive] = useState('সব');
  const [expanded, setExpanded] = useState(null);

  // Live from Google Sheets, fallback to staticData
  const { data: news, loading, source } = useSheetData(
    CONFIG.sheets.news.enabled ? CONFIG.sheets.news.url : null,
    NEWS
  );

  const filtered = active === 'সব' ? news : news.filter(n => n.category === active);
  const featured = filtered.find(n => n.featured === 'TRUE') || filtered[0];
  const rest = filtered.filter(n => n.id !== (featured?.id));

  return (
    <div>
      <PageHero
        title="সংবাদ ও বিজ্ঞপ্তি"
        subtitle="সাম্প্রতিক কার্যক্রম, উন্নয়ন প্রকল্প ও গুরুত্বপূর্ণ বিজ্ঞপ্তি"
        breadcrumb="হোম / সংবাদ"
      />

      <section className="section-pad">
        <div className="container">

          {/* Filter + source badge */}
          <div className="news-top-bar">
            <div className="gallery-filters">
              {CATS.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${active === cat ? 'active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            {source === 'sheet' && (
              <div className="source-badge">
                <span className="source-dot" />
                Google Sheets থেকে লাইভ আপডেট
              </div>
            )}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              সংবাদ লোড হচ্ছে...
            </div>
          )}

          {/* Featured */}
          {!loading && featured && (
            <div className="news-featured">
              <div className="nf-img">
                <img
                  src={featured.image}
                  alt={featured.title}
                  onError={e => { e.target.src = 'https://via.placeholder.com/800x450/1a5c45/ffffff?text=News'; }}
                />
                {featured.featured === 'TRUE' && (
                  <div className="featured-banner">⭐ প্রধান সংবাদ</div>
                )}
                <span className="news-category-badge">{featured.category}</span>
              </div>
              <div className="nf-content">
                <div className="news-date">📅 {featured.date}</div>
                <h2 className="nf-title">{featured.title}</h2>
                <p className="nf-excerpt">{featured.excerpt}</p>
                <button
                  className="btn-primary"
                  onClick={() => setExpanded(expanded === featured.id ? null : featured.id)}
                >
                  {expanded === featured.id ? 'সংক্ষিপ্ত করুন ↑' : 'বিস্তারিত পড়ুন →'}
                </button>
                {expanded === featured.id && (
                  <p className="nf-full-text bangla-body">
                    এই প্রকল্পটি এলাকার দীর্ঘমেয়াদী উন্নয়নের একটি গুরুত্বপূর্ণ অংশ। মাননীয় সংসদ সদস্য আলহাজ্ব শাহজাহান চৌধুরীর ব্যক্তিগত উদ্যোগে এবং সরকারের সহায়তায় এই কার্যক্রম পরিচালিত হচ্ছে। ভবিষ্যতে আরও বড় পরিসরে এই ধরনের উদ্যোগ নেওয়ার পরিকল্পনা রয়েছে।
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Rest of news */}
          {!loading && rest.length > 0 && (
            <div className="news-list">
              {rest.map((item, i) => (
                <article key={item.id} className="news-list-item" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="nli-img">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={e => { e.target.src = 'https://via.placeholder.com/300x200/1a5c45/ffffff?text=News'; }}
                    />
                  </div>
                  <div className="nli-content">
                    <div className="nli-meta">
                      <span className="tag">{item.category}</span>
                      <span className="news-date">📅 {item.date}</span>
                    </div>
                    <h3 className="nli-title">{item.title}</h3>
                    <p className="nli-excerpt">{item.excerpt}</p>
                    <button
                      className="news-read-more"
                      onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    >
                      {expanded === item.id ? 'কম দেখুন ↑' : 'বিস্তারিত পড়ুন →'}
                    </button>
                    {expanded === item.id && (
                      <p className="nf-full-text bangla-body" style={{ marginTop: '0.75rem' }}>
                        এই কার্যক্রমটি এলাকার মানুষের জীবনমান উন্নয়নে গুরুত্বপূর্ণ ভূমিকা রাখছে।
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="no-results">এই বিভাগে কোনো সংবাদ নেই।</div>
          )}
        </div>
      </section>
    </div>
  );
}
