import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Splash from './pages/Splash';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Activities from './pages/Activities';
import SocialWork from './pages/SocialWork';
import Gallery from './pages/Gallery';
import Constituency from './pages/Constituency';
import VoterSlip from './pages/VoterSlip';
import News from './pages/News';
import Contact from './pages/Contact';

import './App.css';

// Show splash once per browser session (not on every page refresh)
const SPLASH_KEY = 'shahjahan_splash_seen';

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <div className="page-spinner" />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>লোড হচ্ছে...</span>
    </div>
  );
}

export default function App() {
  // true = still showing splash, false = website visible
  const [showSplash, setShowSplash] = useState(() => {
    try {
      // Skip splash if already seen this session
      return !sessionStorage.getItem(SPLASH_KEY);
    } catch {
      return false;
    }
  });

  function handleSplashEnter() {
    try { sessionStorage.setItem(SPLASH_KEY, '1'); } catch {}
    setShowSplash(false);
  }

  // Prevent background scroll while splash is visible
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showSplash]);

  return (
    <>
      {/* Splash renders on top of everything */}
      {showSplash && <Splash onEnter={handleSplashEnter} />}

      <BrowserRouter>
        <div className="app-layout">
          <Navbar />
          <main className="app-main">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/social-work" element={<SocialWork />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/constituency" element={<Constituency />} />
                <Route path="/voter-slip" element={<VoterSlip />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '8rem 1rem' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</div>
      <h2 style={{ fontFamily: 'var(--font-bangla)', color: 'var(--forest)', marginBottom: '1rem' }}>
        পেজটি পাওয়া যায়নি
      </h2>
      <a href="/" className="btn-primary">হোমে ফিরুন</a>
    </div>
  );
}