import { useState, useEffect, useRef } from 'react';
import PageHero from '../components/PageHero';
import './Constituency.css';

const ELECTION_DATA = {
  totalCenters: 117,
  ukhiyaCenters: 56,
  teknafCenters: 61,
  totalVoters: 373130,
  maleVoters: 191210,
  femaleVoters: 181915,
  ukhiyaVoters: 172884,
  teknafVoters: 200246,
};

const UKHIYA_UNIONS = [
 
  { name: 'জালিয়াপালং', voters: 38500, centers: 11 },
  { name: 'রত্নাপালং', voters: 42000, centers: 12 },
  { name: 'হলদিয়াপালং', voters: 30800, centers: 9 },
  { name: 'রাজাপালং', voters: 48000, centers: 10 },
  { name: 'পালংখালী', voters: 26384, centers: 14 },
];

const TEKNAF_UNIONS = [
  { name: 'হোয়াইক্যং', voters: 38000, centers: 11 },
  { name: 'টেকনাফ সদর', voters: 42000, centers: 13 },
  { name: 'হ্নীলা', voters: 35500, centers: 10 },
  { name: 'বাহারছড়া', voters: 28500, centers: 9 },
  { name: 'সাবরাং', voters: 31246, centers: 10 },
  { name: 'শাহপরীর দ্বীপ', voters: 25000, centers: 8 },
];

// Union dots positioned on the realistic map shape
// Viewbox is 160x340 — tall narrow peninsula shape matching wiki map #297
const MAP_UNIONS = [
  { name: 'জালিয়াপালং',    x: 100, y: 52,  voters: 38500, centers: 11, type: 'ukhiya' },
  { name: 'রাজাপালং',      x: 118, y: 75,  voters: 35200, centers: 10, type: 'ukhiya' },
  { name: 'উখিয়া সদর',    x: 78,  y: 88,  voters: 42000, centers: 12, type: 'ukhiya' },
  { name: 'হলদিয়াপালং',   x: 55,  y: 115, voters: 30800, centers: 9,  type: 'ukhiya' },
  { name: 'পালংখালী',      x: 95,  y: 138, voters: 26384, centers: 14, type: 'ukhiya' },
  { name: 'হোয়াইক্যং',    x: 85,  y: 168, voters: 38000, centers: 11, type: 'teknaf' },
  { name: 'হ্নীলা',        x: 105, y: 195, voters: 35500, centers: 10, type: 'teknaf' },
  { name: 'টেকনাফ সদর',   x: 78,  y: 222, voters: 42000, centers: 13, type: 'teknaf' },
  { name: 'বাহারছড়া',     x: 60,  y: 248, voters: 28500, centers: 9,  type: 'teknaf' },
  { name: 'সাবরাং',        x: 80,  y: 278, voters: 31246, centers: 10, type: 'teknaf' },
  { name: 'শাহপরীর দ্বীপ', x: 65,  y: 310, voters: 25000, centers: 8,  type: 'teknaf' },
];

function bn(n) {
  return n.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
}

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / 2200, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{bn(count)}</span>;
}

// ── Realistic SVG map of constituency 297 ──────────────────────────────────
// Based on the Wikipedia map: #297 is a tall narrow peninsula-like strip
// Ukhiya (north, wider) + Teknaf (south, long narrow tail pointing SE)
// Viewbox: 160 wide × 340 tall
function MapSVG() {
  const [hover, setHover] = useState(null);
  const [sel, setSel]     = useState(null);
  const active = sel || hover;

  return (
    <div className="c-map-outer">
      <svg viewBox="0 0 160 340" className="c-map-svg">
        <defs>
          <linearGradient id="ukG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e6b50"/>
            <stop offset="100%" stopColor="#2d9e6b"/>
          </linearGradient>
          <linearGradient id="tkG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d3b2e"/>
            <stop offset="100%" stopColor="#1a5c45"/>
          </linearGradient>
          <linearGradient id="bgG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8f4f0"/>
            <stop offset="100%" stopColor="#d4eae2"/>
          </linearGradient>
          <filter id="shadow" x="-10%" y="-5%" width="120%" height="115%">
            <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="rgba(13,59,46,0.25)"/>
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Light map background */}
        <rect width="160" height="340" fill="#c8dff4" rx="6"/>

        {/* Sea texture hint */}
        <rect width="160" height="340" fill="url(#bgG)" rx="6" opacity="0.4"/>

        {/* ── UKHIYA — wider northern region ────────────────────────
            Shape: roughly trapezoidal block, wider at top,
            eastern border follows Myanmar, western coast curves slightly
        */}
        <path
          d="
            M 30  15
            L 138  8
            L 142 22
            Q 145 38 140 55
            Q 136 70 128 82
            Q 120 94 110 102
            Q 100 108 88 112
            Q 75 116 62 118
            Q 48 120 38 114
            Q 26 108 22 96
            Q 16 82 18 65
            Q 18 48 22 32
            Z
          "
          fill="url(#ukG)"
          stroke="white"
          strokeWidth="1.2"
          filter="url(#shadow)"
        />

        {/* Ukhiya label */}
        <text x="82" y="68" textAnchor="middle" fontSize="11" fontWeight="bold"
              fill="rgba(255,255,255,0.9)" fontFamily="sans-serif" letterSpacing="0.5">উখিয়া</text>
        <text x="82" y="82" textAnchor="middle" fontSize="7.5"
              fill="rgba(255,255,255,0.65)" fontFamily="sans-serif">উপজেলা</text>

        {/* ── TEKNAF — long narrow southern peninsula ────────────────
            Starts where Ukhiya ends (~y=112) and narrows southward,
            curving SE, matching the pointed peninsula shape in wiki map
        */}
        <path
          d="
            M 38  114
            Q 48  120 62  118
            Q 75  116 88  112
            Q 100 108 110 102
            Q 118 110 122 122
            Q 126 134 124 148
            Q 122 162 116 175
            Q 110 188 104 200
            Q 98  212 94  224
            Q 90  236 88  248
            Q 86  260 84  270
            Q 82  280 80  290
            Q 76  302 70  312
            Q 64  320 58  325
            Q 52  326 48  322
            Q 42  314 40  302
            Q 36  288 34  272
            Q 32  256 30  240
            Q 28  224 26  210
            Q 24  194 24  178
            Q 22  160 24  144
            Q 26  128 32  118
            Z
          "
          fill="url(#tkG)"
          stroke="white"
          strokeWidth="1.2"
          filter="url(#shadow)"
        />

        {/* Teknaf label */}
        <text x="74" y="215" textAnchor="middle" fontSize="11" fontWeight="bold"
              fill="rgba(255,255,255,0.9)" fontFamily="sans-serif" letterSpacing="0.5">টেকনাফ</text>
        <text x="74" y="229" textAnchor="middle" fontSize="7.5"
              fill="rgba(255,255,255,0.65)" fontFamily="sans-serif">উপজেলা</text>

        {/* Saint Martin island — small dot south of peninsula tip */}
        <ellipse cx="52" cy="332" rx="7" ry="4"
                 fill="#4ecdc4" stroke="white" strokeWidth="1" opacity="0.85"/>
        <text x="52" y="333" textAnchor="middle" fontSize="4.2"
              fill="white" fontFamily="sans-serif" fontWeight="bold">সেন্ট মার্টিন</text>

        {/* Boundary divider between Ukhiya & Teknaf */}
        <path
          d="M 34 116 Q 62 122 88 112 Q 108 106 122 120"
          fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeDasharray="3,2"/>

        {/* Myanmar border hint (right side) */}
        <path d="M 138 8 Q 148 60 140 120 Q 132 165 122 200 Q 118 220 116 240"
              fill="none" stroke="rgba(200,60,60,0.3)" strokeWidth="0.8" strokeDasharray="3,2"/>
        <text x="152" y="100" fontSize="5.5" fill="rgba(200,60,60,0.5)"
              fontFamily="sans-serif" transform="rotate(90,152,100)">মিয়ানমার</text>

        {/* Bay of Bengal hint (left side) */}
        <text x="6" y="230" fontSize="5.5" fill="rgba(30,100,200,0.45)"
              fontFamily="sans-serif" transform="rotate(-90,6,230)">বঙ্গোপসাগর</text>

        {/* Union dot markers */}
        {MAP_UNIONS.map((u, i) => {
          const on = active?.name === u.name;
          return (
            <g key={i} style={{cursor:'pointer'}}
               onMouseEnter={() => setHover(u)}
               onMouseLeave={() => setHover(null)}
               onClick={() => setSel(s => s?.name === u.name ? null : u)}>
              {on && (
                <circle cx={u.x} cy={u.y} r="8" fill="none" stroke="#f0d070" strokeWidth="0.8" opacity="0.5">
                  <animate attributeName="r" values="5;12;5" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
                </circle>
              )}
              <circle
                cx={u.x} cy={u.y}
                r={on ? 5 : 3.5}
                fill={on ? '#f0d070' : u.type === 'ukhiya' ? '#a8edca' : '#7dd4b0'}
                stroke={on ? '#0d3b2e' : 'white'}
                strokeWidth={on ? "1.2" : "0.8"}
                filter={on ? "url(#glow)" : ""}
                style={{transition:'all 0.25s'}}
              />
              <text
                x={u.x + (u.x > 85 ? -6 : 6)}
                y={u.y + 1.5}
                textAnchor={u.x > 85 ? "end" : "start"}
                fontSize={on ? "7" : "6"}
                fill={on ? '#fff' : 'rgba(255,255,255,0.92)'}
                fontFamily="sans-serif"
                fontWeight={on ? "bold" : "600"}
                style={{transition:'all 0.25s', pointerEvents:'none'}}
              >
                {u.name}
              </text>
            </g>
          );
        })}

        {/* North arrow */}
        <g transform="translate(143,22)">
          <circle r="10" fill="rgba(255,255,255,0.85)" stroke="rgba(13,59,46,0.3)" strokeWidth="0.8"/>
          <path d="M0 -7 L2.5 0 L0 -2.5 L-2.5 0Z" fill="#1a5c45"/>
          <path d="M0 7 L2.5 0 L0 2.5 L-2.5 0Z" fill="rgba(13,59,46,0.25)"/>
          <text y="-10" textAnchor="middle" fontSize="6" fill="#1a5c45" fontFamily="sans-serif" fontWeight="bold">N</text>
        </g>

        {/* Constituency number badge */}
        <g transform="translate(143,300)">
          <rect x="-14" y="-12" width="28" height="18" rx="5"
                fill="rgba(201,168,76,0.9)" stroke="white" strokeWidth="0.8"/>
          <text textAnchor="middle" y="1" fontSize="8" fill="white"
                fontFamily="sans-serif" fontWeight="bold">#২৯৭</text>
        </g>
      </svg>

      {/* Hover tooltip */}
      {active && (
        <div className="map-tooltip">
          <div className="mtt-name">{active.name}</div>
          <div className="mtt-type">{active.type === 'ukhiya' ? '🏘️ উখিয়া উপজেলা' : '🌊 টেকনাফ উপজেলা'}</div>
          <div className="mtt-row">
            <span>👥 {bn(active.voters)} ভোটার</span>
            <span>🏫 {bn(active.centers)} কেন্দ্র</span>
          </div>
        </div>
      )}

      <div className="map-legend">
        <span className="mleg"><span className="mleg-dot" style={{background:'#a8edca', border:'1px solid #1a5c45'}}/>উখিয়া ইউনিয়ন</span>
        <span className="mleg"><span className="mleg-dot" style={{background:'#7dd4b0', border:'1px solid #0d3b2e'}}/>টেকনাফ ইউনিয়ন</span>
        <span className="mleg"><span className="mleg-dot" style={{background:'#f0d070', border:'1px solid #c9a84c'}}/>নির্বাচিত</span>
      </div>
    </div>
  );
}

function VoterChart() {
  const { maleVoters: m, femaleVoters: f, totalVoters: t } = ELECTION_DATA;
  const r = 36, c = 55, circ = 2 * Math.PI * r;
  const mp = (m / t) * 100;
  return (
    <div className="vc-wrap">
      <svg viewBox="0 0 110 110" className="vc-svg">
        <defs>
          <linearGradient id="mG"><stop offset="0%" stopColor="#1a5c45"/><stop offset="100%" stopColor="#3db87a"/></linearGradient>
          <linearGradient id="fG"><stop offset="0%" stopColor="#c9a84c"/><stop offset="100%" stopColor="#f0d070"/></linearGradient>
        </defs>
        <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="13"/>
        <circle cx={c} cy={c} r={r} fill="none" stroke="url(#fG)" strokeWidth="13"
          strokeDasharray={circ} transform={`rotate(-90 ${c} ${c})`} opacity="0.8"/>
        <circle cx={c} cy={c} r={r} fill="none" stroke="url(#mG)" strokeWidth="13"
          strokeDasharray={`${(mp/100)*circ} ${circ-(mp/100)*circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${c} ${c})`}>
          <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${(mp/100)*circ} ${circ-(mp/100)*circ}`} dur="2s" fill="freeze"/>
        </circle>
        <text x={c} y={c-6} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1a3a2e" fontFamily="sans-serif">মোট</text>
        <text x={c} y={c+8} textAnchor="middle" fontSize="6" fill="#1a5c45" fontFamily="sans-serif" fontWeight="bold">{bn(t)}</text>
      </svg>
      <div className="vc-rows">
        {[
          {label:'👨 পুরুষ ভোটার', val: m, pct: mp, cls:'male'},
          {label:'👩 নারী ভোটার',  val: f, pct: 100-mp, cls:'female'},
        ].map((row, i) => (
          <div key={i} className={`vcr ${row.cls}`}>
            <div className="vcr-top">
              <span>{row.label}</span>
              <span className="vcr-val">{bn(row.val)}</span>
              <span className="vcr-pct">{Math.round(row.pct)}%</span>
            </div>
            <div className="vcr-track">
              <div className="vcr-fill" style={{width:`${row.pct}%`}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Constituency() {
  const [tab, setTab]         = useState('ukhiya');
  const [expanded, setExpanded] = useState(null);

  const tabs = {
    ukhiya: { title:'উখিয়া উপজেলা', icon:'🏘️', voters: ELECTION_DATA.ukhiyaVoters, centers: ELECTION_DATA.ukhiyaCenters, unions: UKHIYA_UNIONS, clr:'#1a5c45' },
    teknaf: { title:'টেকনাফ উপজেলা', icon:'🌊', voters: ELECTION_DATA.teknafVoters, centers: ELECTION_DATA.teknafCenters, unions: TEKNAF_UNIONS, clr:'#0d3b2e' },
  };
  const current = tabs[tab];

  return (
    <div className="con-page">
      <PageHero
        title="নির্বাচনী এলাকা"
        subtitle="কক্সবাজার-৪ (উখিয়া-টেকনাফ) — নির্বাচনী তথ্য ও বিস্তারিত"
        breadcrumb="হোম / নির্বাচনী এলাকা"
      />

      {/* ── Stats Band ── */}
      <section className="vb-section">
        <div className="container">
          <div className="vb-grid">
            {[
              { icon:'🗳️', val: ELECTION_DATA.totalVoters,   lbl:'মোট ভোটার',   sub:'কক্সবাজার-৪ আসন' },
              { icon:'🏫', val: ELECTION_DATA.totalCenters,  lbl:'ভোট কেন্দ্র', sub:`উখিয়া ${bn(56)} + টেকনাফ ${bn(61)}` },
              { icon:'👨', val: ELECTION_DATA.maleVoters,    lbl:'পুরুষ ভোটার', sub:`মোটের ${Math.round(ELECTION_DATA.maleVoters/ELECTION_DATA.totalVoters*100)}%` },
              { icon:'👩', val: ELECTION_DATA.femaleVoters,  lbl:'নারী ভোটার',  sub:`মোটের ${Math.round(ELECTION_DATA.femaleVoters/ELECTION_DATA.totalVoters*100)}%` },
            ].map((s, i) => (
              <div key={i} className="vb-card">
                <div className="vb-icon">{s.icon}</div>
                <div className="vb-body">
                  <div className="vb-num"><AnimatedCounter target={s.val}/></div>
                  <div className="vb-lbl">{s.lbl}</div>
                  <div className="vb-sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map + Charts ── */}
      <section className="map-sec section-pad">
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center"/>
            <span className="section-eyebrow">ভৌগোলিক বিন্যাস</span>
            <h2 className="section-title bangla-title">নির্বাচনী এলাকার মানচিত্র</h2>
          </div>
          <div className="map-layout">
            <div className="map-card glass-card">
              <div className="gc-hdr">
                <span className="gc-ico">🗺️</span>
                <div>
                  <h3 className="gc-ttl">কক্সবাজার-৪ আসন (#২৯৭)</h3>
                  <p className="gc-sub">ইউনিয়নে ক্লিক করুন বিস্তারিত দেখতে</p>
                </div>
              </div>
              <MapSVG/>
            </div>

            <div className="chart-stack">
              <div className="glass-card chart-card">
                <div className="gc-hdr">
                  <span className="gc-ico">📊</span>
                  <div>
                    <h3 className="gc-ttl">ভোটার বিভাজন</h3>
                    <p className="gc-sub">লিঙ্গভিত্তিক তথ্য</p>
                  </div>
                </div>
                <VoterChart/>
              </div>

              <div className="glass-card chart-card">
                <div className="gc-hdr">
                  <span className="gc-ico">🗳️</span>
                  <div>
                    <h3 className="gc-ttl">উপজেলাভিত্তিক ভোটার</h3>
                    <p className="gc-sub">তুলনামূলক চিত্র</p>
                  </div>
                </div>
                <div className="upaz-cmp">
                  {[
                    { name:'উখিয়া', voters: ELECTION_DATA.ukhiyaVoters, centers: ELECTION_DATA.ukhiyaCenters, clr:'#2d8a5e' },
                    { name:'টেকনাফ', voters: ELECTION_DATA.teknafVoters, centers: ELECTION_DATA.teknafCenters, clr:'#1a5c45' },
                  ].map((u, i) => (
                    <div key={i} className="upc-item">
                      <div className="upc-row">
                        <span className="upc-name">{u.name}</span>
                        <span className="upc-val">{bn(u.voters)}</span>
                      </div>
                      <div className="upc-track">
                        <div className="upc-fill" style={{width:`${(u.voters/ELECTION_DATA.totalVoters)*100}%`, background: u.clr}}/>
                      </div>
                      <div className="upc-row">
                        <span className="upc-pct">{((u.voters/ELECTION_DATA.totalVoters)*100).toFixed(1)}% ভোটার</span>
                        <span className="upc-ctr">🏫 {bn(u.centers)} কেন্দ্র</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Union Detail ── */}
      <section className="union-sec section-pad">
        <div className="container">
          <div className="section-header-center">
            <div className="gold-line gold-line-center"/>
            <span className="section-eyebrow">উপজেলা ও ইউনিয়ন</span>
            <h2 className="section-title bangla-title">ইউনিয়ন পরিষদ বিস্তারিত</h2>
          </div>

          <div className="tab-pills">
            {Object.entries(tabs).map(([k, t]) => (
              <button key={k} className={`tab-pill ${tab===k?'active':''}`}
                      onClick={() => { setTab(k); setExpanded(null); }}>
                {t.icon} {t.title}
                <span className="pill-badge">{bn(t.voters)}</span>
              </button>
            ))}
          </div>

          <div className="union-master" style={{'--uc': current.clr}}>
            <div className="um-header">
              <div className="um-icon">{current.icon}</div>
              <div className="um-info">
                <h3 className="um-title">{current.title}</h3>
                <div className="um-stats">
                  {[{v:bn(current.voters),l:'মোট ভোটার'},{v:bn(current.centers),l:'ভোট কেন্দ্র'},{v:bn(current.unions.length),l:'ইউনিয়ন'}].map((s,i)=>(
                    <div key={i} className="ums-item">
                      <span className="ums-v">{s.v}</span>
                      <span className="ums-l">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="union-rows">
              {current.unions.map((u, i) => {
                const open = expanded === i;
                const pct  = ((u.voters / current.voters) * 100).toFixed(1);
                return (
                  <div key={i} className={`ur-item ${open?'open':''}`}
                       onClick={() => setExpanded(open ? null : i)}>
                    <div className="uri-main">
                      <div className="uri-left">
                        <span className="uri-num">{bn(i+1)}</span>
                        <span className="uri-name">{u.name}</span>
                      </div>
                      <div className="uri-right">
                        <span className="uri-voters">👥 {bn(u.voters)}</span>
                        <span className="uri-centers">🏫 {bn(u.centers)}</span>
                        <span className="uri-chev">{open?'▲':'▼'}</span>
                      </div>
                    </div>
                    <div className="uri-bar">
                      <div className="uri-bar-fill" style={{width:`${pct}%`}}/>
                    </div>
                    {open && (
                      <div className="uri-detail">
                        <div className="urid-grid">
                          <div className="urid-item"><span className="urid-l">মোট ভোটার</span><span className="urid-v">{bn(u.voters)} জন</span></div>
                          <div className="urid-item"><span className="urid-l">ভোট কেন্দ্র</span><span className="urid-v">{bn(u.centers)}টি</span></div>
                          <div className="urid-item"><span className="urid-l">উপজেলার শেয়ার</span><span className="urid-v">{pct}%</span></div>
                          <div className="urid-item"><span className="urid-l">আসন নম্বর</span><span className="urid-v">#২৯৭</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Geo Highlights ── */}
      <section className="geo-sec section-pad" style={{background:'var(--cream)'}}>
        <div className="container geo-layout">
          <div className="geo-text">
            <div className="gold-line" style={{marginBottom:'1.5rem'}}/>
            <span className="section-eyebrow">ভৌগোলিক পরিচিতি</span>
            <h2 className="section-title bangla-title">উখিয়া-টেকনাফ:<br/>বিশেষ একটি এলাকা</h2>
            <p className="bangla-body" style={{color:'var(--text-muted)',marginBottom:'1rem'}}>উখিয়া ও টেকনাফ বাংলাদেশের সর্ব দক্ষিণ-পূর্ব অঞ্চলে অবস্থিত। মিয়ানমারের সীমান্তবর্তী এবং বঙ্গোপসাগরের তীরে অবস্থিত।</p>
            <p className="bangla-body" style={{color:'var(--text-muted)',marginBottom:'1.5rem'}}>সেন্ট মার্টিন দ্বীপ টেকনাফ সংলগ্ন বাংলাদেশের একমাত্র প্রবাল দ্বীপ, যা একটি গুরুত্বপূর্ণ পর্যটন কেন্দ্র।</p>
            <div className="geo-tags">
              {['🗺️ কক্সবাজার-৪','🏛️ আসন নং ২৯৭','🌊 উপকূলীয় এলাকা','🌿 সংরক্ষিত বনাঞ্চল'].map((t,i)=>(
                <span key={i} className="geo-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="geo-cards">
            {[
              {e:'🏖️',t:'সেন্ট মার্টিন দ্বীপ', d:'বাংলাদেশের একমাত্র প্রবাল দ্বীপ'},
              {e:'🐟',t:'মৎস্য শিল্প',          d:'দেশের গুরুত্বপূর্ণ মৎস্য আহরণ কেন্দ্র'},
              {e:'🌿',t:'জীববৈচিত্র্য',         d:'সংরক্ষিত বন ও সামুদ্রিক প্রাণিসম্পদ'},
              {e:'🌍',t:'সীমান্ত এলাকা',         d:'মিয়ানমার সীমান্তবর্তী কৌশলগত অবস্থান'},
            ].map((h,i)=>(
              <div key={i} className="geo-card">
                <div className="gc-em">{h.e}</div>
                <div>
                  <div className="gc-ti">{h.t}</div>
                  <div className="gc-de">{h.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}