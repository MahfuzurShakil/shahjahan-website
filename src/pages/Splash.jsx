import { useState, useEffect, useRef } from 'react';
import { MP } from '../data/staticData';
import './Splash.css';

const SLOGANS = [
  { bn: 'বাংলাদেশ জিন্দাবাদ', en: 'Bangladesh Zindabad' },
  { bn: 'সবার আগে বাংলাদেশ', en: 'Bangladesh First' },
  { bn: 'জনগণই সকল ক্ষমতার উৎস', en: 'People are the source of all power' },
];

// Animated particle that floats up like embers
function Particle({ style }) {
  return <div className="splash-particle" style={style} />;
}

// Paddy sheaf (ধানের শীষ) SVG — BNP's electoral symbol
function DhanerShish({ className = '', size = 120 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <path d="M60 110 Q58 80 55 50 Q52 30 60 10" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M60 110 Q62 80 65 50 Q68 30 60 10" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>

      {/* Paddy grains on left */}
      {[
        [52, 65], [46, 52], [41, 40], [49, 57], [44, 46],
      ].map(([x, y], i) => (
        <ellipse key={`l${i}`} cx={x} cy={y} rx="5" ry="9" fill="#c9a84c" opacity={0.8 - i * 0.1}
          transform={`rotate(${-20 - i * 5} ${x} ${y})`} />
      ))}

      {/* Paddy grains on right */}
      {[
        [68, 65], [74, 52], [79, 40], [71, 57], [76, 46],
      ].map(([x, y], i) => (
        <ellipse key={`r${i}`} cx={x} cy={y} rx="5" ry="9" fill="#c9a84c" opacity={0.8 - i * 0.1}
          transform={`rotate(${20 + i * 5} ${x} ${y})`} />
      ))}

      {/* Top grain */}
      <ellipse cx="60" cy="14" rx="4" ry="8" fill="#e8c97a" />

      {/* Subtle glow circle */}
      <circle cx="60" cy="60" r="50" stroke="#c9a84c" strokeWidth="0.5" opacity="0.15"/>
      <circle cx="60" cy="60" r="56" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08"/>
    </svg>
  );
}

export default function Splash({ onEnter }) {
  const [phase, setPhase] = useState('intro');   // intro → ready → leaving
  const [sloganIdx, setSloganIdx] = useState(0);
  const [particles, setParticles] = useState([]);
  const timerRef = useRef(null);

  // Generate particles on mount
  useEffect(() => {
    const pts = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
      animationDuration: `${4 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 6}s`,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setParticles(pts);
  }, []);

  // Phase: intro → ready after 600ms
  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 600);
    return () => clearTimeout(t);
  }, []);

  // Rotate slogans every 2.8s
  useEffect(() => {
    const t = setInterval(() => {
      setSloganIdx(i => (i + 1) % SLOGANS.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  // Auto-skip after 7 seconds, update phase to trigger exit animation, then call onEnter after animation duration
  useEffect(() => {
    timerRef.current = setTimeout(() => handleEnter(), 70000);
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleEnter() {
    clearTimeout(timerRef.current);
    setPhase('leaving');
    setTimeout(onEnter, 700);
  }

  return (
    <div className={`splash splash--${phase}`} onClick={handleEnter}>
      {/* ── Background layers ── */}
      <div className="splash-bg" />
      <div className="splash-radial" />
      <div className="splash-grid" />

      {/* ── Floating particles ── */}
      <div className="splash-particles">
        {particles.map(p => (
          <Particle key={p.id} style={{
            left: p.left,
            width: p.width,
            height: p.height,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
          }} />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="splash-content">

        {/* BNP symbol top */}
        <div className="splash-symbol">
          <DhanerShish className="splash-sheaf" size={100} />
          <div className="splash-sheaf-glow" />
        </div>

        {/* Party label */}
        <div className="splash-party-label">
          <span className="splash-party-dot" />
          বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)
          <span className="splash-party-dot" />
        </div>

        {/* MP Photo */}
        <div className="splash-photo-wrap">
          <div className="splash-photo-ring splash-photo-ring--outer" />
          <div className="splash-photo-ring splash-photo-ring--inner" />
          <div className="splash-photo-ring splash-photo-ring--pulse" />
          <img
            src={MP.photo}
            alt={MP.name}
            className="splash-photo"
            onError={e => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* MP Name */}
        <div className="splash-name-block">
          <h1 className="splash-name">{MP.name}</h1>
          <div className="splash-gold-line" />
          <p className="splash-title">জাতীয় সংসদ সদস্য</p>
          <p className="splash-constituency">কক্সবাজার-৪ (উখিয়া-টেকনাফ) • নির্বাচনী এলাকা নং ২৯৭</p>
        </div>

        {/* Rotating slogan */}
        <div className="splash-slogan-wrap">
          <span className="splash-slogan-quote">"</span>
          <span className="splash-slogan" key={sloganIdx}>
            {SLOGANS[sloganIdx].bn}
          </span>
          <span className="splash-slogan-quote">"</span>
        </div>

        {/* Enter button */}
        <button className="splash-enter-btn" onClick={e => { e.stopPropagation(); handleEnter(); }}>
          <span className="splash-enter-text">ওয়েবসাইটে প্রবেশ করুন</span>
          <span className="splash-enter-arrow">→</span>
        </button>

        {/* Auto-skip hint */}
        <div className="splash-skip">
          <div className="splash-progress-bar">
            <div className="splash-progress-fill" />
          </div>
          <span>স্বয়ংক্রিয়ভাবে এগিয়ে যাচ্ছে...</span>
        </div>
      </div>

      {/* ── Bottom band ── */}
      <div className="splash-bottom-band">
        <span>🇧🇩</span>
        <span>বাংলাদেশ জিন্দাবাদ</span>
        <span className="splash-band-dot">◆</span>
        <span>সবার আগে বাংলাদেশ</span>
        <span className="splash-band-dot">◆</span>
        <span>জনগণই সকল ক্ষমতার উৎস</span>
        <span>🇧🇩</span>
      </div>
    </div>
  );
}