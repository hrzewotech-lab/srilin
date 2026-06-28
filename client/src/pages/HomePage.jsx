import { Link } from 'react-router-dom';
import {
  Building2,
  Cpu,
  Factory,
  Layers3,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import CertificateCarousel from '../components/CertificateCarousel';
import HeroCarousel from '../components/HeroCarousel';
import factoryHero from '../assets/factory-hero.png';

const trustedCompanies = ['Aerospace OEMs', 'Automation Teams', 'EV Suppliers', 'Industrial Brands', 'IoT Innovators'];

const whyChoose = [
  {
    icon: Cpu,
    title: 'Design-to-Manufacturing Thinking',
    text: 'Engineering support focused on reliable assemblies, practical sourcing, and production-ready decisions.',
  },
  {
    icon: Factory,
    title: 'Organized Production Capability',
    text: 'Structured workflows, inspection checkpoints, and machinery support for repeatable electronic builds.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality-Focused Delivery',
    text: 'Clear validation practices and disciplined documentation keep every requirement visible through delivery.',
  },
];

const industries = [
  ['Industrial Automation', Zap],
  ['Consumer Electronics', Cpu],
  ['Infrastructure Systems', Building2],
  ['Product Engineering', Layers3],
];

const testimonials = [
  {
    quote:
      'SriLin gives us the confidence of an engineering partner, not just a vendor. Their team understands production realities early.',
    name: 'Procurement Head',
    company: 'Industrial Controls Company',
  },
  {
    quote:
      'The project communication was clear, the build quality was consistent, and the delivery rhythm helped our launch stay on track.',
    name: 'Product Lead',
    company: 'Electronics Product Brand',
  },
];

export default function HomePage() {
  return (
    <div className="home-page modern-home">
      <HeroCarousel />

      <section className="home-hero">
        <div className="home-hero-copy reveal-up">
          <p className="public-eyebrow">SriLin Electronics Private Limited</p>
          <h1>Precision electronics manufacturing for ambitious product teams.</h1>
          <p>
            From design support to production capability, SriLin helps businesses build dependable
            electronic products with clarity, consistency, and industrial discipline.
          </p>
          <div className="home-actions">
            <Link className="public-cta" to="/contact-us">Start a Project</Link>
            <Link className="secondary-link" to="/infrastructure-machinery">View Capabilities</Link>
          </div>
          <div className="hero-proof-row" aria-label="Company highlights">
            <span><strong>3+</strong> capability areas</span>
            <span><strong>QC</strong> focused workflow</span>
            <span><strong>EMC</strong> industrial location</span>
          </div>
        </div>

        <div className="factory-video-card reveal-up">
          <img src={factoryHero} alt="Modern electronics manufacturing factory floor" />
          <div className="video-overlay">
            <button type="button" className="play-button" aria-label="Play factory overview video">
              <Play size={24} fill="currentColor" />
            </button>
            <div>
              <span>Factory Overview</span>
              <strong>Electronics manufacturing infrastructure</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-section section-shell">
        <p className="section-kicker">Trusted by Leading Companies</p>
        <div className="trusted-strip">
          {trustedCompanies.map((company) => (
            <span key={company}>{company}</span>
          ))}
        </div>
      </section>

      <section className="why-section section-shell">
        <div className="section-heading">
          <p className="section-kicker">Why Choose SriLin</p>
          <h2>Built for electronics teams that need precision, speed, and accountability.</h2>
        </div>
        <div className="why-grid">
          {whyChoose.map(({ icon: Icon, title, text }) => (
            <article className="modern-card reveal-up" key={title}>
              <span className="card-icon"><Icon size={24} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="industries-section">
        <div className="section-shell industries-layout">
          <div className="section-heading">
            <p className="section-kicker">Industries Served</p>
            <h2>Flexible electronics capability for modern industrial and product ecosystems.</h2>
          </div>
          <div className="industry-grid">
            {industries.map(([industry, Icon]) => (
              <article className="industry-card" key={industry}>
                <Icon size={22} />
                <span>{industry}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CertificateCarousel />

      <section className="testimonials-section section-shell">
        <div className="section-heading centered">
          <p className="section-kicker">Client Testimonials</p>
          <h2>Clear communication, dependable execution, and production-aware support.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <Quote size={28} />
              <p>{testimonial.quote}</p>
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.company}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-final-cta section-shell">
        <Sparkles size={22} />
        <h2>Ready to discuss your next electronics requirement?</h2>
        <Link className="public-cta" to="/contact-us">Contact SriLin</Link>
      </section>
    </div>
  );
}
