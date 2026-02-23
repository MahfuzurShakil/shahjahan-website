import { useInView } from 'react-intersection-observer';
import { MP, TIMELINE } from '../data/staticData';
import PageHero from '../components/PageHero';
import './About.css';

export default function About() {
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const details = [
    { label: 'জন্ম', value: MP.born },
    { label: 'শিক্ষা', value: MP.education },
    { label: 'রাজনৈতিক দল', value: MP.party },
    { label: 'নির্বাচনী এলাকা', value: MP.constituency },
    { label: 'এলাকা নম্বর', value: MP.constituencyNo },
  ];

  const achievements = [
    { icon: '🏆', title: 'সংসদীয় হুইপ', desc: '২০০১-২০০৬ সাল পর্যন্ত জাতীয় সংসদের হুইপ হিসেবে দায়িত্ব পালন' },
    { icon: '🌟', title: 'জেলা সভাপতি', desc: 'কক্সবাজার জেলা বিএনপির সভাপতি হিসেবে দলের সংগঠনকে শক্তিশালী করা' },
    { icon: '🤝', title: 'রোহিঙ্গা সংকট', desc: 'মিয়ানমার থেকে আগত শরণার্থীদের জন্য আন্তর্জাতিক সহায়তা আদায়ে ভূমিকা' },
    { icon: '📜', title: 'আইন প্রণেতা', desc: 'জাতীয় সংসদে কক্সবাজার বিষয়ক একাধিক গুরুত্বপূর্ণ বিল উত্থাপন' },
  ];

  return (
    <div>
      <PageHero
        title="পরিচিতি"
        subtitle="আলহাজ্ব শাহজাহান চৌধুরীর জীবনী ও রাজনৈতিক ক্যারিয়ার"
        breadcrumb="হোম / পরিচিতি"
      />

      {/* Bio section */}
      <section className="about-bio section-pad">
        <div className="container about-bio-grid">
          <div className="about-photo-side">
            <div className="about-photo-wrap">
              <img
                src={MP.photo}
                alt={MP.name}
                className="about-photo"
                onError={e => { e.target.src = 'https://via.placeholder.com/500x600/0d3b2e/c9a84c?text=MP+Photo'; }}
              />
              <div className="about-photo-overlay">
                <span className="about-party-badge">{MP.partyEn}</span>
              </div>
            </div>

            {/* Info card */}
            <div className="about-info-card">
              <h3 className="about-info-title">ব্যক্তিগত তথ্য</h3>
              {details.map(d => (
                <div key={d.label} className="about-info-row">
                  <span className="about-info-label">{d.label}</span>
                  <span className="about-info-value">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-text-side">
            <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
            <span className="section-eyebrow">জীবনী</span>
            <h2 className="section-title bangla-title">আলহাজ্ব শাহজাহান চৌধুরী</h2>
            <div className="about-bio-paras">
              <p className="bangla-body">
                আলহাজ্ব শাহজাহান চৌধুরী বাংলাদেশের কক্সবাজার জেলার একজন বিশিষ্ট রাজনীতিবিদ এবং সমাজসেবক। তিনি বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)-র একজন প্রবীণ ও প্রভাবশালী নেতা।
              </p>
              <p className="bangla-body">
                চারবার কক্সবাজার-৪ (উখিয়া-টেকনাফ) আসন থেকে সংসদ সদস্য নির্বাচিত হয়ে তিনি এলাকার উন্নয়নে অসামান্য অবদান রাখছেন। তিনি ২০০১-২০০৬ সালে জাতীয় সংসদের হুইপ হিসেবে দায়িত্ব পালন করেছেন এবং কক্সবাজার জেলা বিএনপির সভাপতি হিসেবে দলকে পরিচালিত করছেন।
              </p>
              <p className="bangla-body">
                উখিয়া-টেকনাফ অঞ্চলের শিক্ষা, স্বাস্থ্য, অবকাঠামো উন্নয়ন এবং রোহিঙ্গা শরণার্থী সংকট মোকাবেলায় তার অবদান অতুলনীয়। স্থানীয় মৎস্যজীবী, কৃষক ও সাধারণ মানুষের স্বার্থ রক্ষায় তিনি সংসদে এবং মাঠ পর্যায়ে সর্বদা সক্রিয়।
              </p>
              <p className="bangla-body">
                তিনি বিশ্বাস করেন যে রাজনীতি শুধু ক্ষমতার জায়গা নয়, এটি জনগণের সেবার সুযোগ। এই বিশ্বাসই তাকে তিন দশকেরও বেশি সময় ধরে এলাকার মানুষের পাশে রেখেছে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">রাজনৈতিক যাত্রা</span>
            <h2 className="section-title bangla-title">ক্যারিয়ারের মাইলফলক</h2>
          </div>

          <div className={`timeline ${timelineInView ? 'visible' : ''}`} ref={timelineRef}>
            {TIMELINE.map((item, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="timeline-connector" />
                <div className="timeline-card">
                  <div className="timeline-year">{item.year}</div>
                  <p className="timeline-event">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section section-pad">
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">উল্লেখযোগ্য অর্জন</span>
            <h2 className="section-title bangla-title">গুরুত্বপূর্ণ অবদান</h2>
          </div>

          <div className="achievements-grid">
            {achievements.map((item, i) => (
              <div key={i} className="achievement-card card">
                <div className="achievement-icon">{item.icon}</div>
                <h3 className="achievement-title">{item.title}</h3>
                <p className="achievement-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
