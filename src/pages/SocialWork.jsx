import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { SOCIAL_WORKS } from '../data/staticData';
import PageHero from '../components/PageHero';
import './SocialWork.css';

export default function SocialWork() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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

      {/* Impact numbers */}
      <section className="impact-section section-pad-sm" ref={ref}>
        <div className="container">
          <div className="impact-grid">
            {SOCIAL_WORKS.map((item, i) => (
              <div key={item.id} className="impact-item" style={{ '--clr': item.color }}>
                <span className="impact-emoji">{item.icon}</span>
                <div className="impact-num">
                  {inView ? (
                    <CountUp end={parseInt(item.count.replace(/[^0-9]/g, '')) || 0} duration={2.5} separator="," />
                  ) : '0'}
                  <span>{item.count.replace(/[0-9,]/g, '')}</span>
                </div>
                <div className="impact-unit">{item.unit}</div>
                <div className="impact-label">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="social-detail-section section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center" />
            <span className="section-eyebrow">বিস্তারিত কার্যক্রম</span>
            <h2 className="section-title bangla-title">সামাজিক উন্নয়নের বিভিন্ন খাত</h2>
          </div>

          <div className="social-detail-grid">
            {SOCIAL_WORKS.map((item, i) => (
              <div key={item.id} className="social-detail-card" style={{ '--card-accent': item.color, animationDelay: `${i * 0.1}s` }}>
                <div className="sdc-header">
                  <div className="sdc-icon-bg">
                    <span>{item.icon}</span>
                  </div>
                  <div className="sdc-count-wrap">
                    <span className="sdc-count">{item.count}</span>
                    <span className="sdc-unit">{item.unit}</span>
                  </div>
                </div>
                <h3 className="sdc-title">{item.title}</h3>
                <p className="sdc-desc">{item.desc}</p>
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
          <h2 className="section-title bangla-title" style={{ marginBottom: '2rem' }}>সম্পন্ন ও চলমান প্রকল্প</h2>

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
