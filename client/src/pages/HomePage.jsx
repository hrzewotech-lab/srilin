import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Cpu,
  Factory,
  Layers3,
  MapPin,
  Play,
  Quote,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import CertificateCarousel from '../components/CertificateCarousel';
import HeroCarousel from '../components/HeroCarousel';
import api from '../api/axios';
import factoryHero from '../assets/factory-hero.png';

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
  ['Automotive', Factory],
  ['Aviation, Space & Defence', MapPin],
  ['IT Hardware & Consumer Electronics', Cpu],
  ['Telecom', Sparkles],
  ['Electric Vehicles', Zap],
  ['Railways', Building2],
  ['AI, IoT & Automation', Layers3],
  ['Medical Devices', ShieldCheck],
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

const aboutStats = [
  { value: '2017', label: 'Established' },
  { value: '25,000', label: 'Sqft current facility' },
  { value: '214,000', label: 'Sqft expansion space' },
  { value: 'ISO-8', label: 'Cleanroom class' },
];

const certificationBadges = ['ISO9001:2015', 'AS9100D', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1'];

const defaultClientNames = ['Aerospace OEMs', 'Automation Teams', 'EV Suppliers', 'Industrial Brands', 'IoT Innovators'];

const premiumStats = [
  {
    value: '98%',
    label: 'On-time delivery',
    detail: 'Precision production schedules with consistent delivery rhythm.',
  },
  {
    value: '4.9/5',
    label: 'Customer satisfaction',
    detail: 'Trusted by engineers and procurement teams for clear collaboration.',
  },
  {
    value: '75+',
    label: 'Global customers',
    detail: 'Manufacturing partnerships across aerospace, industrial and commercial segments.',
  },
  {
    value: '12 days',
    label: 'Prototype lead time',
    detail: 'Rapid prototype cycles that move designs from concept to review quickly.',
  },
];

const aboutHighlights = [
  {
    icon: MapPin,
    title: 'Strategic Location',
    meta: '15 minutes from airport cargo terminal',
    text: 'Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal.',
  },
  {
    icon: ShieldCheck,
    title: 'High Reliability Specialist',
    meta: 'Aerospace, defence, automotive and more',
    text: 'AS9100D certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    meta: '8x expansion footprint on same campus',
    text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility with dedicated clusters for strategic partners.',
  },
  {
    icon: Smile,
    title: 'Customer Satisfaction',
    meta: 'Flexible volumes and account ownership',
    text: 'Dedicated account management, quick prototyping, and flexible production volumes tailored to exact requirements.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality First Approach',
    meta: '3D SPI, 3D AOI and X-ray systems',
    text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems for dependable output.',
  },
];

export default function HomePage() {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await api.get('/clients');
        setClients((res.data.clients || []).filter((client) => client.isActive !== false));
      } catch (error) {
        console.error('Failed to load clients', error);
      }
    };

    const loadServices = async () => {
      try {
        const res = await api.get('/services');
        setServices((res.data.services || []).filter((service) => service.isActive !== false).slice(0, 8));
      } catch (error) {
        console.error('Failed to load services', error);
      }
    };

    loadClients();
    loadServices();
  }, []);

  const safeClients = clients.length
    ? clients
    : defaultClientNames.map((companyName) => ({ companyName, logo: null }));

  const rowA = [...safeClients, ...safeClients];
  const rowB = [...safeClients.slice().reverse(), ...safeClients.slice().reverse()];

  return (
    <div className="home-page modern-home bg-[radial-gradient(circle_at_top_left,_rgba(15,159,95,0.08),_transparent_32rem)]">
      <HeroCarousel />

      <section className="home-about-company section-shell px-4 sm:px-6 lg:px-8">
        <div className="about-company-shell reveal-up">
          <div className="about-company-hero-grid grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="about-company-visual-card !rounded-none !border-0 !bg-transparent !shadow-none overflow-hidden">
              <img src='/about-us2.png' alt="SriLin electronics manufacturing facility" className="h-full w-full object-cover" />
              <div className="about-company-badge">
                <Building2 size={18} /> E-City EMC, Hyderabad
              </div>
            </div>

            <div className="about-company-copy flex flex-col gap-4">
              <p className="section-kicker">About Company</p>
              <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-[2.2rem]">
                Srilin Electronics Private Limited
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Srilin Electronics Pvt Ltd is an ISO9001:2015, AS9100D, ANSI ESD S20.20 2021 & IEC 61340 5.1 certified premier electronics system design and manufacturing services company located in E-City EMC, Hyderabad. Our one-stop electronics manufacturing services factory integrates quick prototyping, mid-range production, and high-volume manufacturing with disciplined execution.
              </p>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                We provide embedded design, SMT mounting, product integration, testing, box build, and comprehensive supply chain support to help clients scale with confidence and production flexibility.
              </p>
              <div className="home-actions mt-6 flex flex-wrap gap-3">
                <Link className="public-cta inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold" to="/about-company">
                  Discover SriLin <ArrowRight size={18} />
                </Link>
                <Link className="secondary-link rounded-full px-5 py-3 text-sm font-semibold" to="/contact-us">Talk to our team</Link>
              </div>
              <div className="about-cert-list mt-6 flex flex-wrap gap-2" aria-label="Srilin certifications">
                {certificationBadges.map((certification) => (
                  <span key={certification} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                    <ShieldCheck size={15} className="text-emerald-600" />
                    {certification}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="about-stat-grid mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {aboutStats.map((stat) => (
              <article key={stat.label} className="rounded-[18px] border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                <strong className="block text-2xl font-semibold text-slate-950">{stat.value}</strong>
                <span className="mt-1 block text-sm text-slate-600">{stat.label}</span>
              </article>
            ))}
          </div>

          <div className="about-service-panel mt-6 flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="section-kicker">Core EMS Services</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">One-stop electronics manufacturing support from design to box build.</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Embedded Design', 'SMT Mounting', 'Product Integration', 'Testing', 'Box Build', 'Supply Chain Management'].map((service) => (
                <span key={service} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                  {service === 'SMT Mounting' || service === 'Embedded Design' ? <Cpu size={15} className="text-emerald-600" /> : <Factory size={15} className="text-emerald-600" />}
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="about-highlight-grid mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {aboutHighlights.map(({ icon: Icon, title, meta, text }) => (
              <article key={title} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Icon size={20} />
                </span>
                <h4 className="text-lg font-semibold text-slate-950">{title}</h4>
                <p className="mt-1 text-sm font-medium text-emerald-600">{meta}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trusted-section section-shell px-4 sm:px-6 lg:px-8">
        <p className="section-kicker">Trusted by Leading Companies</p>
        <div className="trusted-slider mt-6 overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          <div className="client-marquee client-marquee-left">
            <div className="marquee-track">
              {rowA.map((client, index) => (
                <div key={`${client.companyName}-${index}`} className="client-logo-card">
                  {client.logo?.url ? (
                    <img src={client.logo.url} alt={client.companyName} className="client-logo-image" />
                  ) : (
                    <span>{client.companyName}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="client-marquee client-marquee-right">
            <div className="marquee-track">
              {rowB.map((client, index) => (
                <div key={`${client.companyName}-rev-${index}`} className="client-logo-card">
                  {client.logo?.url ? (
                    <img src={client.logo.url} alt={client.companyName} className="client-logo-image" />
                  ) : (
                    <span>{client.companyName}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="why-section section-shell px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="section-kicker">Why Choose SriLin</p>
          <h2 className="text-slate-950">Built for electronics teams that need precision, speed, and accountability.</h2>
        </div>
        <div className="why-grid mt-8">
          {whyChoose.map(({ icon: Icon, title, text }) => (
            <article className="modern-card reveal-up rounded-[22px] border border-slate-200/90 bg-white/90 p-6 shadow-[0_16px_38px_rgba(15,23,42,0.05)]" key={title}>
              <span className="card-icon"><Icon size={24} /></span>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-preview-section section-shell px-4 sm:px-6 lg:px-8">
        <div className="services-preview-header">
          <div>
            <p className="section-kicker">Featured Services</p>
            <h2 className="text-slate-950">Explore our top service capabilities with fast access to the full services page.</h2>
          </div>
          <Link className="public-cta" to="/services">
            View all services
          </Link>
        </div>

        <div className="services-preview-grid">
          {services.length ? services.map((service) => (
            <article className="data-card service-preview-card" key={service._id}>
              <div className="card-visual">
                <img src={service.image?.url || '/image.png'} alt={service.title} />
              </div>
              <div className="data-card-body">
                <h3>{service.title}</h3>
              </div>
            </article>
          )) : (
            <div className="data-state-card">No featured services available right now.</div>
          )}
        </div>
      </section>

      <section className="industries-section">
        <div className="section-shell industries-layout px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <p className="section-kicker">Industries Served</p>
            <h2 className="text-white">Flexible electronics capability for modern industrial and product ecosystems.</h2>
          </div>
          <div className="industry-grid mt-6 sm:mt-0">
            {industries.map(([industry, Icon]) => (
              <article className="industry-card" key={industry}>
                <div className="industry-card-icon">
                  <Icon size={22} />
                </div>
                <span>{industry}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CertificateCarousel />

      <section className="premium-stats-section section-shell px-4 sm:px-6 lg:px-8">
        <div className="section-heading centered">
          <p className="section-kicker">Performance metrics</p>
          <h2 className="text-slate-950">Premium operational numbers that demonstrate reliability, speed, and quality.</h2>
        </div>
        <div className="premium-stat-grid">
          {premiumStats.map((stat) => (
            <article key={stat.label} className="premium-stat-card">
              <span className="premium-stat-label">{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials-section section-shell px-4 sm:px-6 lg:px-8">
        <div className="section-heading centered">
          <p className="section-kicker">Client Testimonials</p>
          <h2 className="text-slate-950">Clear communication, dependable execution, and production-aware support.</h2>
        </div>
        <div className="testimonial-grid mt-8">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card rounded-[22px] border border-slate-200/90 bg-white/90 p-6 shadow-[0_16px_38px_rgba(15,23,42,0.05)]" key={testimonial.name}>
              <Quote size={28} />
              <p className="mt-4 text-base leading-7 text-slate-600">{testimonial.quote}</p>
              <div className="mt-5">
                <strong className="block text-slate-950">{testimonial.name}</strong>
                <span className="mt-1 block text-sm text-slate-500">{testimonial.company}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-final-cta section-shell mx-auto rounded-[24px] border border-slate-200/80 bg-slate-950 px-4 py-8 shadow-[0_20px_45px_rgba(7,20,51,0.18)] sm:px-6 lg:px-8">
        <Sparkles size={22} />
        <h2>Ready to discuss your next electronics requirement?</h2>
        <Link className="public-cta rounded-full px-5 py-3 text-sm font-semibold" to="/contact-us">Contact SriLin</Link>
      </section>
    </div>
  );
}
