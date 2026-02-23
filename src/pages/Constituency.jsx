import { UNION_PARISHADS } from '../data/staticData';
import PageHero from '../components/PageHero';
import './Constituency.css';

export default function Constituency() {
  const areas = [
    { title: 'উখিয়া উপজেলা', icon: '🏘️', pop: '~৩ লাখ+', area: '১৬২ বর্গকিমি', unions: UNION_PARISHADS.ukhiya, color: 'var(--forest)' },
    { title: 'টেকনাফ উপজেলা', icon: '🌊', pop: '~২.৫ লাখ+', area: '১৩৫ বর্গকিমি', unions: UNION_PARISHADS.teknaf, color: 'var(--emerald)' },
  ];

  const facts = [
    { label: 'মোট জনসংখ্যা', value: '৫.৫ লাখ+' },
    { label: 'মোট আয়তন', value: '২৯৭ বর্গকিমি' },
    { label: 'ইউনিয়ন পরিষদ', value: '১১টি' },
    { label: 'সমুদ্র সৈকত', value: '৩৫ কিমি+' },
    { label: 'প্রধান পেশা', value: 'মৎস্যজীবী, কৃষি' },
    { label: 'এলাকা নম্বর', value: '#২৯৭' },
  ];

  return (
    <div>
      <PageHero
        title="নির্বাচনী এলাকা"
        subtitle="কক্সবাজার-৪ (উখিয়া-টেকনাফ) আসন সম্পর্কে বিস্তারিত"
        breadcrumb="হোম / নির্বাচনী এলাকা"
      />

      {/* Key facts */}
      <section className="facts-band section-pad-sm">
        <div className="container">
          <div className="facts-grid">
            {facts.map((f, i) => (
              <div key={i} className="fact-item">
                <div className="fact-value">{f.value}</div>
                <div className="fact-label">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area cards */}
      <section className="area-section section-pad">
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">উপজেলা সমূহ</span>
            <h2 className="section-title bangla-title">নির্বাচনী এলাকার পরিচিতি</h2>
          </div>

          <div className="area-cards-grid">
            {areas.map((area, i) => (
              <div key={i} className="area-card" style={{ '--ac': area.color }}>
                <div className="area-card-header">
                  <span className="area-card-icon">{area.icon}</span>
                  <div>
                    <h3 className="area-card-title">{area.title}</h3>
                    <div className="area-card-meta">
                      <span>👥 {area.pop}</span>
                      <span>📐 {area.area}</span>
                    </div>
                  </div>
                </div>

                <div className="unions-section">
                  <div className="unions-label">ইউনিয়ন পরিষদ সমূহ</div>
                  <div className="unions-list">
                    {area.unions.map((u, j) => (
                      <div key={j} className="union-badge">
                        <span className="union-dot" />
                        {u}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the area */}
      <section className="area-info-section section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container area-info-grid">
          <div>
            <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
            <span className="section-eyebrow">ভৌগোলিক পরিচিতি</span>
            <h2 className="section-title bangla-title">উখিয়া-টেকনাফ: বিশেষ একটি এলাকা</h2>
            <p className="bangla-body" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              উখিয়া ও টেকনাফ বাংলাদেশের সর্ব দক্ষিণ-পূর্ব অঞ্চলে অবস্থিত। এই এলাকা মিয়ানমারের সীমান্তবর্তী এবং বঙ্গোপসাগরের তীরে অবস্থিত।
            </p>
            <p className="bangla-body" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              এখানকার প্রধান পেশা মৎস্যজীবী ও কৃষি। সেন্ট মার্টিন দ্বীপ টেকনাফ সংলগ্ন বাংলাদেশের একমাত্র প্রবাল দ্বীপ, যা একটি গুরুত্বপূর্ণ পর্যটন কেন্দ্র।
            </p>
            <p className="bangla-body" style={{ color: 'var(--text-muted)' }}>
              বর্তমানে এই এলাকায় মিয়ানমার থেকে আগত রোহিঙ্গা শরণার্থীরা অবস্থান করছেন, যা স্থানীয় অর্থনীতি ও পরিবেশে গুরুত্বপূর্ণ প্রভাব ফেলছে।
            </p>
          </div>

          <div className="area-highlights">
            {[
              { emoji: '🏖️', title: 'সেন্ট মার্টিন দ্বীপ', desc: 'বাংলাদেশের একমাত্র প্রবাল দ্বীপ' },
              { emoji: '🐟', title: 'মৎস্য শিল্প', desc: 'দেশের গুরুত্বপূর্ণ মৎস্য আহরণ কেন্দ্র' },
              { emoji: '🌿', title: 'জীববৈচিত্র্য', desc: 'সংরক্ষিত বন ও সামুদ্রিক জীববৈচিত্র্য' },
              { emoji: '🌍', title: 'সীমান্ত এলাকা', desc: 'মিয়ানমার সীমান্তবর্তী কৌশলগত অবস্থান' },
            ].map((h, i) => (
              <div key={i} className="area-highlight-item">
                <span className="ahi-emoji">{h.emoji}</span>
                <div>
                  <div className="ahi-title">{h.title}</div>
                  <div className="ahi-desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
