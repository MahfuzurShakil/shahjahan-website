import { useState } from 'react';
import { VOTER_DATA } from '../data/staticData';
import PageHero from '../components/PageHero';
import './VoterSlip.css';

export default function VoterSlip() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('nid');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);

    setTimeout(() => {
      let found = null;
      if (type === 'nid') {
        found = VOTER_DATA.find(v => v.nid === query.trim());
      } else {
        found = VOTER_DATA.find(v => v.name.includes(query.trim()));
      }
      setResult(found || null);
      setSearched(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div>
      <PageHero
        title="ভোটার স্লিপ"
        subtitle="আপনার জাতীয় পরিচয়পত্র বা নাম দিয়ে ভোটার তথ্য খুঁজুন"
        breadcrumb="হোম / ভোটার স্লিপ"
      />

      <section className="section-pad">
        <div className="container voter-container">

          <div className="voter-search-card">
            <div className="voter-search-header">
              <div className="voter-icon">🗳️</div>
              <h2 className="voter-search-title">ভোটার তথ্য অনুসন্ধান</h2>
              <p className="voter-search-subtitle">আপনার তথ্য খুঁজে পেতে নিচের ফর্মটি পূরণ করুন</p>
            </div>

            <div className="search-type-tabs">
              <button
                className={`type-tab ${type === 'nid' ? 'active' : ''}`}
                onClick={() => { setType('nid'); setQuery(''); setSearched(false); setResult(null); }}
              >
                📋 জাতীয় পরিচয়পত্র নম্বর
              </button>
              <button
                className={`type-tab ${type === 'name' ? 'active' : ''}`}
                onClick={() => { setType('name'); setQuery(''); setSearched(false); setResult(null); }}
              >
                👤 নাম দিয়ে খুঁজুন
              </button>
            </div>

            <div className="search-input-row">
              <input
                type="text"
                className="voter-input"
                placeholder={type === 'nid' ? 'জাতীয় পরিচয়পত্র নম্বর লিখুন...' : 'আপনার নাম লিখুন...'}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <button
                className="btn-primary voter-search-btn"
                onClick={handleSearch}
                disabled={loading || !query.trim()}
              >
                {loading ? 'খোঁজা হচ্ছে...' : 'অনুসন্ধান'}
              </button>
            </div>

            <div className="voter-hint">
              💡 পরীক্ষার জন্য: NID <strong>1234567890</strong> বা নাম <strong>মোহাম্মদ</strong> ব্যবহার করুন
            </div>
          </div>

          {/* Result */}
          {searched && (
            <div className={`voter-result ${result ? 'found' : 'not-found'}`}>
              {result ? (
                <>
                  <div className="result-header">
                    <div className="result-check">✓</div>
                    <div>
                      <h3 className="result-title">তথ্য পাওয়া গেছে</h3>
                      <p className="result-subtitle">আপনার ভোটার তথ্য নিচে দেওয়া হলো</p>
                    </div>
                  </div>

                  <div className="voter-slip">
                    <div className="slip-header">
                      <div className="slip-logo">
                        <div className="logo-emblem" style={{ width: 40, height: 40 }}>
                          <span className="logo-initials" style={{ fontSize: '0.8rem' }}>শ.চ</span>
                        </div>
                      </div>
                      <div>
                        <div className="slip-title">ভোটার স্লিপ</div>
                        <div className="slip-sub">কক্সবাজার-৪ | নির্বাচনী এলাকা নং ২৯৭</div>
                      </div>
                      <div className="slip-serial">{result.serial}</div>
                    </div>

                    <div className="slip-body">
                      {[
                        ['ভোটারের নাম', result.name],
                        ['পিতার নাম', result.father],
                        ['গ্রাম', result.village],
                        ['ভোট কেন্দ্র', result.center],
                        ['এনআইডি নম্বর', result.nid],
                        ['সিরিয়াল নম্বর', result.serial],
                      ].map(([label, value]) => (
                        <div key={label} className="slip-row">
                          <span className="slip-label">{label}</span>
                          <span className="slip-value">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="slip-footer">
                      <button className="btn-primary" onClick={() => window.print()}>
                        🖨️ প্রিন্ট করুন
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="not-found-content">
                  <div className="nf-icon">❌</div>
                  <h3>তথ্য পাওয়া যায়নি</h3>
                  <p>আপনার দেওয়া তথ্যের সাথে কোনো ভোটার রেকর্ড মেলেনি। সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
