import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const GRID_IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    alt: 'Hair salon professional',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    alt: 'Fitness class',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    alt: 'Yoga stretching',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400&h=300&fit=crop',
    alt: 'Prenatal yoga',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    alt: 'Gym treadmill',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    alt: 'Massage therapy',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=400&h=300&fit=crop',
    alt: 'Back massage',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=400&h=300&fit=crop',
    alt: 'Cycling class',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    alt: 'Personal training',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing">
      <div className="landing-inner">
        {/* Hero left */}
        <section className="hero-left">
          <span className="hero-eyebrow">Fitness + Business</span>
          <h1 className="hero-heading">
            Management Software for Your Business and Members
          </h1>
          <p className="hero-sub">
            Increase and engage your clients with powerful tools designed for
            fitness studios, gyms, and wellness businesses.
          </p>
          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => navigate('/subscriptions/new')}>
              Get a Demo
            </button>
            <button className="cta-secondary" onClick={() => navigate('/subscriptions')}>
              Learn More
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">10k+</span>
              <span className="stat-label">Studios worldwide</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">2M+</span>
              <span className="stat-label">Members managed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">98%</span>
              <span className="stat-label">Satisfaction rate</span>
            </div>
          </div>
        </section>

        {/* Hero right — image grid */}
        <section className="hero-right" aria-hidden="true">
          <div className="image-grid">
            {GRID_IMAGES.map((img) => (
              <div key={img.id} className="grid-cell">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Features strip */}
      <section className="features">
        {[
          { icon: '🏋️', title: 'Gym Management', desc: 'Manage locations, rooms, and equipment from one dashboard.' },
          { icon: '👥', title: 'Member Tracking', desc: 'Onboard, retain, and engage your members with ease.' },
          { icon: '📅', title: 'Scheduling', desc: 'Class booking, trainer assignments, and calendar sync.' },
          { icon: '💳', title: 'Subscriptions', desc: 'Flexible plans — Free, Starter, and Pro tiers.' },
        ].map((f) => (
          <div key={f.title} className="feature-card">
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
