import { ACTIVITIES } from '../data/staticData';
import PageHero from '../components/PageHero';
import './Activities.css';

export default function Activities() {
  const parliamentary = ACTIVITIES.filter(a => a.type === 'সংসদীয়' || a.type === 'আইন');
  const other = ACTIVITIES.filter(a => a.type !== 'সংসদীয়' && a.type !== 'আইন');

  return (
    <div>
      <PageHero
        title="কার্যক্রম"
        subtitle="সংসদীয় কার্যক্রম, আইন প্রণয়ন ও জাতীয় উন্নয়নে অবদান"
        breadcrumb="হোম / কার্যক্রম"
      />

      <section className="section-pad">
        <div className="container">
          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
          <span className="section-eyebrow">সংসদীয় কার্যক্রম</span>
          <h2 className="section-title bangla-title" style={{ marginBottom: '2.5rem' }}>
            জাতীয় সংসদে অবদান
          </h2>

          <div className="activities-grid">
            {ACTIVITIES.map((item, i) => (
              <div key={item.id} className="activity-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="activity-icon-wrap">
                  <span className="activity-icon">{item.icon}</span>
                </div>
                <div className="activity-content">
                  <div className="activity-meta">
                    <span className="tag">{item.type}</span>
                    <span className="activity-count">{item.count}</span>
                  </div>
                  <h3 className="activity-title">{item.title}</h3>
                  <p className="activity-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speeches section */}
      <section className="speeches-section section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">গুরুত্বপূর্ণ বক্তৃতা</span>
            <h2 className="section-title bangla-title">সংসদে উল্লেখযোগ্য বক্তব্য</h2>
          </div>

          <div className="speeches-list">
            {[
              { date: '১২ মার্চ ২০২৪', topic: 'রোহিঙ্গা সংকট ও জাতীয় নিরাপত্তা', summary: 'উখিয়া-টেকনাফে রোহিঙ্গা শিবিরের নিরাপত্তা জোরদারে সরকারের মনোযোগ আকর্ষণ এবং আন্তর্জাতিক সম্প্রদায়ের সক্রিয় ভূমিকার দাবি।' },
              { date: '২৮ জানুয়ারি ২০২৪', topic: 'কক্সবাজার পর্যটন উন্নয়ন', summary: 'দেশের বৃহত্তম পর্যটন কেন্দ্রকে আন্তর্জাতিক মানে উন্নীত করতে বিশেষ অর্থনৈতিক অঞ্চল স্থাপনের দাবি।' },
              { date: '০৫ নভেম্বর ২০২৩', topic: 'উপকূলীয় মৎস্যজীবীদের সুরক্ষা', summary: 'সামুদ্রিক জলদস্যুতা রোধে আইনশৃঙ্খলা বাহিনীকে আরও সক্রিয় করার দাবি এবং ক্ষতিগ্রস্ত মৎস্যজীবীদের ক্ষতিপূরণের প্রস্তাব।' },
            ].map((speech, i) => (
              <div key={i} className="speech-item">
                <div className="speech-date-col">
                  <div className="speech-date">{speech.date}</div>
                </div>
                <div className="speech-content-col">
                  <h4 className="speech-topic">{speech.topic}</h4>
                  <p className="speech-summary">{speech.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
