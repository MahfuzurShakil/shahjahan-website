import { useState } from 'react';
import { GALLERY, VIDEOS } from '../data/staticData';
import { CONFIG } from '../config';
import { useSheetData } from '../hooks/useSheetData';
import PageHero from '../components/PageHero';
import './Gallery.css';

const PHOTO_CATS = ['সব', 'সংসদ', 'উন্নয়ন', 'রাজনীতি', 'সামাজিক', 'শিক্ষা', 'স্বাস্থ্য'];
const VIDEO_CATS = ['সব', 'সংসদ', 'উন্নয়ন', 'সামাজিক', 'রাজনীতি'];

// YouTube thumbnail helper
const ytThumb = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const ytEmbed = id => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

// ── Photo Lightbox ──────────────────────────────────────────────
function Lightbox({ item, items, onClose }) {
  const idx = items.findIndex(i => i.id === item.id);
  const prev = () => {};
  const next = () => {};

  const [currentIdx, setCurrentIdx] = useState(idx);
  const current = items[currentIdx];

  const goPrev = () => setCurrentIdx(i => (i - 1 + items.length) % items.length);
  const goNext = () => setCurrentIdx(i => (i + 1) % items.length);

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lb-close" onClick={onClose}>✕</button>
      <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); goPrev(); }}>‹</button>
      <div className="lb-content" onClick={e => e.stopPropagation()}>
        <img
          src={current.url}
          alt={current.caption}
          className="lb-img"
          onError={e => { e.target.src = 'https://via.placeholder.com/800x600/1a5c45/ffffff?text=Photo'; }}
        />
        <div className="lb-caption">
          <span>{current.caption}</span>
          <span className="lb-counter">{currentIdx + 1} / {items.length}</span>
        </div>
      </div>
      <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); goNext(); }}>›</button>
    </div>
  );
}

// ── YouTube Video Modal ──────────────────────────────────────────
function VideoModal({ video, onClose }) {
  return (
    <div className="lightbox video-modal" onClick={onClose}>
      <button className="lb-close" onClick={onClose}>✕</button>
      <div className="video-modal-content" onClick={e => e.stopPropagation()}>
        <div className="video-iframe-wrap">
          <iframe
            src={ytEmbed(video.youtubeId)}
            title={video.title}
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="video-modal-info">
          <h3>{video.title}</h3>
          <span className="tag">{video.category}</span>
          <span className="news-date" style={{ marginLeft: '0.5rem' }}>📅 {video.date}</span>
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Source indicator ─────────────────────────────────────────────
function SourceBadge({ source }) {
  if (source === 'local') return null;
  return (
    <div className="source-badge">
      <span className="source-dot" />
      Google Sheets থেকে লাইভ আপডেট
    </div>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos'
  const [photoFilter, setPhotoFilter] = useState('সব');
  const [videoFilter, setVideoFilter] = useState('সব');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [videoModal, setVideoModal] = useState(null);

  // Live data from Google Sheets (falls back to staticData if not configured)
  const { data: liveGallery, source: gallerySource } = useSheetData(
    CONFIG.sheets.gallery.enabled ? CONFIG.sheets.gallery.url : null,
    GALLERY
  );
  const { data: liveVideos, source: videosSource } = useSheetData(
    CONFIG.sheets.videos.enabled ? CONFIG.sheets.videos.url : null,
    VIDEOS
  );

  const filteredPhotos = photoFilter === 'সব'
    ? liveGallery
    : liveGallery.filter(g => g.category === photoFilter);

  const filteredVideos = videoFilter === 'সব'
    ? liveVideos
    : liveVideos.filter(v => v.category === videoFilter);

  return (
    <div>
      <PageHero
        title="মিডিয়া গ্যালারি"
        subtitle="ছবি ও ভিডিও — কার্যক্রম, অনুষ্ঠান ও উন্নয়নমূলক কাজের মুহূর্ত"
        breadcrumb="হোম / গ্যালারি"
      />

      <section className="section-pad">
        <div className="container">

          {/* ── Tab switcher ── */}
          <div className="gallery-tab-switch">
            <button
              className={`gtab ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              🖼️ ফটো গ্যালারি
              <span className="gtab-count">{liveGallery.length}</span>
            </button>
            <button
              className={`gtab ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              ▶️ ভিডিও
              <span className="gtab-count">{liveVideos.length}</span>
            </button>
          </div>

          {/* ── PHOTOS TAB ── */}
          {activeTab === 'photos' && (
            <div className="tab-panel">
              <div className="tab-header">
                <div className="gallery-filters">
                  {PHOTO_CATS.map(cat => (
                    <button
                      key={cat}
                      className={`filter-btn ${photoFilter === cat ? 'active' : ''}`}
                      onClick={() => setPhotoFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <SourceBadge source={gallerySource} />
              </div>

              <div className="gallery-grid">
                {filteredPhotos.map((item, i) => (
                  <div
                    key={item.id}
                    className="gallery-item"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => setLightboxItem(item)}
                  >
                    <div className="gallery-img-wrap">
                      <img
                        src={item.url}
                        alt={item.caption}
                        loading="lazy"
                        onError={e => { e.target.src = 'https://via.placeholder.com/600x450/1a5c45/ffffff?text=Photo'; }}
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-zoom-icon">🔍</div>
                        <div className="gallery-cat-tag">{item.category}</div>
                      </div>
                    </div>
                    <div className="gallery-caption">{item.caption}</div>
                  </div>
                ))}
              </div>

              {filteredPhotos.length === 0 && (
                <div className="no-results">এই বিভাগে কোনো ছবি নেই।</div>
              )}
            </div>
          )}

          {/* ── VIDEOS TAB ── */}
          {activeTab === 'videos' && (
            <div className="tab-panel">
              <div className="tab-header">
                <div className="gallery-filters">
                  {VIDEO_CATS.map(cat => (
                    <button
                      key={cat}
                      className={`filter-btn ${videoFilter === cat ? 'active' : ''}`}
                      onClick={() => setVideoFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <SourceBadge source={videosSource} />
              </div>

              <div className="videos-grid">
                {filteredVideos.map((video, i) => (
                  <div
                    key={video.id}
                    className="video-card"
                    style={{ animationDelay: `${i * 0.08}s` }}
                    onClick={() => setVideoModal(video)}
                  >
                    <div className="video-thumb-wrap">
                      <img
                        src={ytThumb(video.youtubeId)}
                        alt={video.title}
                        loading="lazy"
                        onError={e => { e.target.src = 'https://via.placeholder.com/480x270/0d3b2e/c9a84c?text=Video'; }}
                      />
                      <div className="video-play-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <polygon points="5,3 19,12 5,21"/>
                        </svg>
                      </div>
                      <div className="video-duration-badge">YouTube</div>
                    </div>
                    <div className="video-info">
                      <span className="tag" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>{video.category}</span>
                      <h3 className="video-title">{video.title}</h3>
                      <div className="video-date">📅 {video.date}</div>
                      <p className="video-desc">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="no-results">এই বিভাগে কোনো ভিডিও নেই।</div>
              )}

              {/* YouTube channel CTA */}
              <div className="yt-cta">
                <div className="yt-cta-icon">▶️</div>
                <div>
                  <h4>আরও ভিডিও দেখুন</h4>
                  <p>আমাদের ইউটিউব চ্যানেলে সকল ভিডিও পাবেন</p>
                </div>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ flexShrink: 0 }}
                >
                  চ্যানেল দেখুন →
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightboxes */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          items={filteredPhotos}
          onClose={() => setLightboxItem(null)}
        />
      )}
      {videoModal && (
        <VideoModal video={videoModal} onClose={() => setVideoModal(null)} />
      )}
    </div>
  );
}
