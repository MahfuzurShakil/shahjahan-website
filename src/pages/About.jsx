import { useInView } from 'react-intersection-observer';
import { MP, TIMELINE } from '../data/staticData';
import PageHero from '../components/PageHero';
import './About.css';

export default function About() {
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: andolonRef, inView: andolonInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const details = [
    { label: 'জন্ম', value: MP.born },
    { label: 'শিক্ষা', value: MP.education },
    { label: 'রাজনৈতিক দল', value: MP.party },
    { label: 'নির্বাচনী এলাকা', value: MP.constituency },
    { label: 'এলাকা নম্বর', value: MP.constituencyNo },
  ];

  const extraCards = [
    {
      icon: '🏛️',
      title: 'সংসদীয় অভিজ্ঞতা',
      value: '৫০+ বছর',
      desc: 'জাতীয় সংসদে দীর্ঘ অভিজ্ঞতাসম্পন্ন প্রবীণ আইনপ্রণেতা',
    },
    {
      icon: '🗳️',
      title: 'নির্বাচিত',
      value: '৫ বার',
      desc: 'কক্সবাজার-৪ (উখিয়া-টেকনাফ) আসন থেকে বারবার নির্বাচিত',
    },
    {
      icon: '⚖️',
      title: 'পদ',
      value: 'সংসদীয় হুইপ',
      desc: '১৯৯১–১৯৯৬ সালে জাতীয় সংসদের হুইপ হিসেবে দায়িত্ব পালন',
    },
    {
      icon: '🌿',
      title: 'দলীয় পদ',
      value: 'জেলা সভাপতি',
      desc: 'কক্সবাজার জেলা বিএনপির সভাপতি হিসেবে সংগঠন পরিচালনা',
    },
  ];

  const andolonItems = [
    {
      year: '১৯৯০',
      icon: '✊',
      title: '১৯৯০ সালের স্বৈরাচারবিরোধী আন্দোলন',
      desc: 'এরশাদের সামরিক স্বৈরশাসনের বিরুদ্ধে গণতন্ত্র পুনরুদ্ধারের আন্দোলনে শাহজাহান চৌধুরী সক্রিয়ভাবে অংশগ্রহণ করেন। কক্সবাজার জেলায় আন্দোলনকে সংগঠিত করতে এবং জনগণকে ঐক্যবদ্ধ করতে তিনি গুরুত্বপূর্ণ ভূমিকা পালন করেন। এই আন্দোলনের মাধ্যমে দেশে গণতান্ত্রিক শাসন পুনঃপ্রতিষ্ঠিত হয় এবং ১৯৯১ সালে অবাধ নির্বাচনে তিনি জনগণের রায়ে সংসদ সদস্য নির্বাচিত হন।',
      tags: ['গণতন্ত্র পুনরুদ্ধার', 'জন আন্দোলন', 'কক্সবাজার সংগঠন'],
    },
    {
      year: '২০২৪',
      icon: '🔥',
      title: 'ফ্যাসিবাদবিরোধী জুলাই-আগস্ট গণঅভ্যুত্থান (৩৬ বিপ্লব)',
      desc: '২০২৪ সালের জুলাই-আগস্টে ছাত্র-জনতার ফ্যাসিবাদবিরোধী গণঅভ্যুত্থানে শাহজাহান চৌধুরী সক্রিয় ভূমিকা পালন করেন। দীর্ঘ ফ্যাসিস্ট শাসনের বিরুদ্ধে স্বৈরাচার পতনের এই ঐতিহাসিক আন্দোলনে তিনি কক্সবাজার জেলা বিএনপির সভাপতি হিসেবে সংগঠনকে পথ দেখান। জুলাই ৩৬ বিপ্লবের মাধ্যমে দেশে নতুন রাজনৈতিক অধ্যায়ের সূচনা হয় এবং গণতন্ত্রের পুনরুদ্ধারে এই আন্দোলন মাইলফলক হয়ে ওঠে।',
      tags: ['গণঅভ্যুত্থান', 'ফ্যাসিবাদবিরোধী', 'জুলাই ৩৬', 'ছাত্র-জনতা'],
    }
    // {
    //   year: '২০০৭–২০০৮',
    //   icon: '⚡',
    //   title: 'সেনা-সমর্থিত তত্ত্বাবধায়ক সরকারের বিরুদ্ধে সংগ্রাম',
    //   desc: '১/১১ সরকারের আমলে রাজনৈতিক弾 দমননীতি ও নেতাকর্মীদের গ্রেফতারের বিরুদ্ধে শাহজাহান চৌধুরী অবিচল ছিলেন। দলীয় নেতাকর্মীদের আইনি সহায়তা ও মনোবল রক্ষায় তিনি গুরুত্বপূর্ণ ভূমিকা পালন করেন এবং গণতন্ত্র পুনরুদ্ধারের আন্দোলনে সক্রিয় থাকেন।',
    //   tags: ['১/১১ প্রতিরোধ', 'দলীয় সংগঠন রক্ষা', 'গণতন্ত্র আন্দোলন'],
    // },
  ];

  const achievements = [
    { icon: '🏆', title: 'সংসদীয় হুইপ', desc: '১৯৯১-১৯৯৬ সাল পর্যন্ত জাতীয় সংসদের হুইপ হিসেবে দায়িত্ব পালন' },
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
          {/* Left: Photo + Info Card */}
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

          {/* Right: Bio + Extra Cards */}
          <div className="about-text-side">
            <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
            <span className="section-eyebrow">জীবনী</span>
            <h2 className="section-title bangla-title">আলহাজ্ব শাহজাহান চৌধুরী</h2>
            <div className="about-bio-paras">
              <p className="bangla-body">
                আলহাজ্ব শাহজাহান চৌধুরী বাংলাদেশের কক্সবাজার জেলার একজন বিশিষ্ট রাজনীতিবিদ ও সমাজসেবক। তিনি বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)-এর একজন প্রবীণ নেতা এবং দীর্ঘদিন ধরে কক্সবাজার-৪ (উখিয়া–টেকনাফ) এলাকার মানুষের প্রতিনিধি হিসেবে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছেন।
              </p>
              <p className="bangla-body">
                তিনি কক্সবাজার জেলা বিএনপির দুই বারের সভাপতি ও সাবেক আহ্বায়ক। তৎকালীন কক্সবাজার মহকুমা বিএনপির প্রতিষ্ঠাকালীন যুগ্ম আহ্বায়ক হিসেবে তিনি সংগঠন গঠন ও শক্তিশালী করতে গুরুত্বপূর্ণ ভূমিকা রাখেন।
              </p>
              <p className="bangla-body">
                ১৯৭৭ সালে তিনি রাজাপালং ইউনিয়ন পরিষদের চেয়ারম্যান নির্বাচিত হন। ১৯৭৯ সালের দ্বিতীয় জাতীয় সংসদ নির্বাচনে তৎকালীন চট্টগ্রাম-১৮ (রামু–উখিয়া–টেকনাফ) আসন থেকে বিএনপির প্রার্থী হিসেবে প্রথমবার সংসদ সদস্য নির্বাচিত হন এবং দ্বিতীয় জাতীয় সংসদে সরকারি দলীয় হুইপ হিসেবে দায়িত্ব পালন করেন।
              </p>
              <p className="bangla-body">
                পরবর্তীতে তিনি ১৯৯১ সালের পঞ্চম, ফেব্রুয়ারি ১৯৯৬ সালের ষষ্ঠ এবং ২০০১ সালের অষ্টম জাতীয় সংসদ নির্বাচনে কক্সবাজার-৪ (উখিয়া–টেকনাফ) আসন থেকে সংসদ সদস্য নির্বাচিত হন।
              </p>
              <p className="bangla-body">
                সর্বশেষ ২০২৬ সালে অনুষ্ঠিত ত্রয়োদশ জাতীয় সংসদ নির্বাচনে পঞ্চমবারের মতো কক্সবাজার-৪ (উখিয়া–টেকনাফ) আসন থেকে সংসদ সদস্য নির্বাচিত হন।
              </p>
            </div>

            {/* Extra info cards below bio */}
            <div className="about-extra-cards">
              {extraCards.map((card, i) => (
                <div key={i} className="about-extra-card">
                  <div className="about-extra-icon">{card.icon}</div>
                  <div className="about-extra-body">
                    <div className="about-extra-value">{card.value}</div>
                    <div className="about-extra-title">{card.title}</div>
                    <div className="about-extra-desc">{card.desc}</div>
                  </div>
                </div>
              ))}
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

      {/* আন্দোলন Section */}
      <section className="andolon-section section-pad" ref={andolonRef}>
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">সংগ্রামের ইতিহাস</span>
            <h2 className="section-title bangla-title">আন্দোলন</h2>
            <p className="andolon-subtitle">
              গণতন্ত্র ও ন্যায়বিচার প্রতিষ্ঠায় শাহজাহান চৌধুরীর অবিচল সংগ্রামের গৌরবময় অধ্যায়
            </p>
          </div>

          <div className={`andolon-list ${andolonInView ? 'visible' : ''}`}>
            {andolonItems.map((item, i) => (
              <div
                key={i}
                className="andolon-card"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="andolon-year-col">
                  <div className="andolon-icon">{item.icon}</div>
                  <div className="andolon-year">{item.year}</div>
                  <div className="andolon-vline" />
                </div>
                <div className="andolon-content">
                  <h3 className="andolon-title">{item.title}</h3>
                  <p className="andolon-desc">{item.desc}</p>
                  <div className="andolon-tags">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="andolon-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section section-pad" style={{ background: 'var(--cream)' }}>
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