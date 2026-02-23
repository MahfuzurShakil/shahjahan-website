import './PageHero.css';

export default function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <div className="page-hero-section">
      <div className="page-hero-pattern" />
      <div className="page-hero-circles">
        <div className="hero-circle hero-circle-1" />
        <div className="hero-circle hero-circle-2" />
        <div className="hero-circle hero-circle-3" />
      </div>
      <div className="container page-hero-content">
        {breadcrumb && (
          <div className="page-breadcrumb">
            {breadcrumb}
          </div>
        )}
        <h1 className="page-hero-title bangla-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        <div className="gold-line" style={{ marginTop: '1.25rem' }} />
      </div>
    </div>
  );
}
