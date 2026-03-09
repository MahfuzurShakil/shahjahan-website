import { SOCIAL_WORKS } from '../data/staticData';
import PageHero from '../components/PageHero';
import './SocialWork.css';

export default function SocialWork() {
  const projects = [
    { title: 'উখিয়া-টেকনাফ সংযোগ সেতু', year: '২০২৩', status: 'সম্পন্ন', type: 'অবকাঠামো' },
    { title: 'হোয়াইক্যং কমিউনিটি ক্লিনিক', year: '২০২২', status: 'সম্পন্ন', type: 'স্বাস্থ্য' },
    { title: 'জালিয়াপালং মডেল স্কুল', year: '২০২৩', status: 'সম্পন্ন', type: 'শিক্ষা' },
    { title: 'সাবরাং সোলার বিদ্যুৎ প্রকল্প', year: '২০২৪', status: 'চলমান', type: 'জ্বালানি' },
    { title: 'মৎস্যজীবী সমবায় সমিতি', year: '২০২৩', status: 'সম্পন্ন', type: 'কর্মসংস্থান' },
    { title: 'বালুখালী বন্যা আশ্রয়কেন্দ্র', year: '২০২৪', status: 'সম্পন্ন', type: 'দুর্যোগ' },
  ];

  return (
    <div>
      <PageHero
        title="সামাজিক কার্যক্রম"
        subtitle="উখিয়া-টেকনাফ এলাকার সামগ্রিক উন্নয়নে নিরলস প্রচেষ্টা"
        breadcrumb="হোম / সামাজিক কার্যক্রম"
      />

      {/* Impact numbers - display as text, no CountUp (Bengali digits not parseable) */}
      <section className="impact-section section-pad-sm">
        <div className="container">
          <div className="impact-grid">
            {SOCIAL_WORKS.map((item) => (
              <div key={item.id} className="impact-item" style={{ '--clr': item.color }}>
                <span className="impact-emoji">{item.icon}</span>
                <div className="impact-num">{item.count}</div>
                <div className="impact-unit">{item.unit}</div>
                <div className="impact-label">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail section — professional feature layout */}
      <section className="social-detail-section section-pad">
        <div className="container">

          {/* Section header */}
          <div className="sds-header">
            <div className="sds-header-left">
              <div className="gold-line" style={{ marginBottom: '1rem' }} />
              <span className="section-eyebrow">বিস্তারিত কার্যক্রম</span>
              <h2 className="section-title bangla-title">সামাজিক উন্নয়নের বিভিন্ন খাত</h2>
            </div>
            <p className="sds-header-desc">
              উখিয়া-টেকনাফের প্রতিটি মানুষের জীবনমান উন্নয়নে শিক্ষা, স্বাস্থ্য,
              অবকাঠামো ও কর্মসংস্থান — প্রতিটি খাতে বহুমাত্রিক কার্যক্রম পরিচালিত হচ্ছে।
            </p>
          </div>

          {/* Cards grid */}
          <div className="sds-grid">
            {SOCIAL_WORKS.map((item, i) => (
              <div
                key={item.id}
                className="sds-item"
                style={{ '--acc': item.color, animationDelay: `${i * 0.08}s` }}
              >
                {/* Top accent stripe */}
                <div className="sds-item__stripe" />

                <div className="sds-item__inner">
                  {/* Left: icon + stat stacked */}
                  <div className="sds-item__left">
                    <div className="sds-item__icon-ring">
                      <span className="sds-item__icon">{item.icon}</span>
                    </div>
                    <div className="sds-item__stat">
                      <span className="sds-item__count">{item.count}</span>
                      <span className="sds-item__unit">{item.unit}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="sds-item__divider" />

                  {/* Right: text */}
                  <div className="sds-item__right">
                    <h3 className="sds-item__title bangla-title">{item.title}</h3>
                    <p className="sds-item__desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Projects table */}
      <section className="projects-section section-pad">
        <div className="container">
          <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
          <span className="section-eyebrow">প্রকল্প তালিকা</span>
          <h2 className="section-title bangla-title" style={{ marginBottom: '2rem' }}>
            সম্পন্ন ও চলমান প্রকল্প
          </h2>

          <div className="projects-table-wrap">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>প্রকল্পের নাম</th>
                  <th>ধরন</th>
                  <th>সাল</th>
                  <th>অবস্থা</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={i}>
                    <td>{p.title}</td>
                    <td><span className="tag">{p.type}</span></td>
                    <td>{p.year}</td>
                    <td>
                      <span className={`status-badge ${p.status === 'সম্পন্ন' ? 'done' : 'ongoing'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}