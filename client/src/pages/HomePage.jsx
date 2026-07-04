import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowRight, ArrowUpRight, BadgeCheck, BatteryCharging, Bot, Building2, Car, CheckCircle2,
  ChevronLeft, ChevronRight, Cpu, Factory, Layers3, MapPin, Plane, ShieldCheck,
  Smile, Sparkles, Train, TrendingUp, Wifi, Zap,
} from 'lucide-react';
import CertificateCarousel from '../components/CertificateCarousel';
import HeroCarousel from '../components/HeroCarousel';
import api from '../api/axios';
import { slugify } from '../utils/slugify';

/* ════════════════════════════════════════════════════════════════
   STATIC DATA  — all original arrays unchanged
   ════════════════════════════════════════════════════════════════ */
const whyChoose = [
  { icon: MapPin, title: 'Strategic Location', meta: '15 minutes from airport cargo terminal', text: 'Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal.' },
  { icon: ShieldCheck, title: 'High Reliability Specialist', meta: 'Aerospace, defence, automotive and more', text: 'AS9100D certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics.' },
  { icon: TrendingUp, title: 'Built to Scale', meta: '8x expansion footprint on same campus', text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility with dedicated clusters for strategic partners.' },
  { icon: Smile, title: 'Customer Satisfaction', meta: 'Flexible volumes and account ownership', text: 'Dedicated account management, quick prototyping, and flexible production volumes tailored to exact requirements.' },
  { icon: BadgeCheck, title: 'Quality First Approach', meta: '3D SPI, 3D AOI and X-ray systems', text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems for dependable output.' },
];
const industries = [
  ['Automotive', Car],
  ['Aviation, Space & Defence', Plane],
  ['IT Hardware & Consumer Electronics', Cpu],
  ['Telecom', Wifi],
  ['Electric Vehicles', BatteryCharging],
  ['Railways', Train],
  ['AI, IoT & Automation', Bot],
  ['Medical Devices', Activity],
];
const testimonials = [
  { quote: 'SriLin gives us the confidence of an engineering partner, not just a vendor. Their team understands production realities early.', name: 'Procurement Head', company: 'Industrial Controls Company' },
  { quote: 'The project communication was clear, the build quality was consistent, and the delivery rhythm helped our launch stay on track.', name: 'Product Lead', company: 'Electronics Product Brand' },
  { quote: 'SriLin\'s rapid prototyping capability cut our time-to-validation in half. From DFM feedback to first article in under 12 days — truly impressive.', name: 'Hardware Engineering Lead', company: 'Embedded IoT Startup' },
  { quote: 'We scaled from prototype to mid-volume production without a single quality escape. SriLin\'s inspection rigour and documentation are second to none.', name: 'VP Operations', company: 'Electric Vehicle Supplier' },
  { quote: 'The team\'s proactive communication and structured account management kept our complex multi-board program on track across three revisions.', name: 'Program Director', company: 'Defence Electronics Integrator' },
];
const aboutStats = [
  { value: '2017', label: 'Established' },
  { value: '25,000', label: 'Sqft current facility' },
  { value: '214,000', label: 'Sqft expansion space' },
  { value: 'ISO-8', label: 'Cleanroom class' },
];
const certificationBadges = ['ISO9001:2015', 'AS9100D', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1'];
const coreServices = ['Embedded Design', 'SMT Mounting', 'Product Integration', 'Testing', 'Box Build', 'Supply Chain Management'];
const defaultClientNames = ['Aerospace OEMs', 'Automation Teams', 'EV Suppliers', 'Industrial Brands', 'IoT Innovators'];

const aboutHighlights = [
  { icon: MapPin, title: 'Strategic Location', meta: '15 minutes from airport cargo terminal', text: 'Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal.' },
  { icon: ShieldCheck, title: 'High Reliability Specialist', meta: 'Aerospace, defence, automotive and more', text: 'AS9100D certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics.' },
  { icon: TrendingUp, title: 'Built to Scale', meta: '8x expansion footprint on same campus', text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility with dedicated clusters for strategic partners.' },
  { icon: Smile, title: 'Customer Satisfaction', meta: 'Flexible volumes and account ownership', text: 'Dedicated account management, quick prototyping, and flexible production volumes tailored to exact requirements.' },
  { icon: BadgeCheck, title: 'Quality First Approach', meta: '3D SPI, 3D AOI and X-ray systems', text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems for dependable output.' },
];
const tickerItems = ['AS9100D Certified', 'ISO 9001:2015', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1', '98% On-Time Delivery', '75+ Global Customers', '12-Day Prototype Cycle', 'ISO-8 Cleanroom Class', 'E-City EMC · Hyderabad', '214,000 Sqft Expansion Ready'];
const quickFacts = [
  { value: '2017', label: 'Year Founded', icon: Building2 },
  { value: '98%', label: 'On-time Delivery', icon: TrendingUp },
  { value: '75+', label: 'Global Customers', icon: Smile },
  { value: '12 days', label: 'Prototype Cycle', icon: Zap },
];


/* ════════════════════════════════════════════════════════════════
   ANIMATION UTILITIES
   ════════════════════════════════════════════════════════════════ */

/** Scroll-reveal wrapper — fades + slides up when entering viewport */
function Reveal({ children, delay = 0, y = 28, style = {}, className = '' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/** Counts up a numeric string (e.g. '98%', '75+', '25,000') when scrolled into view */
function AnimatedNumber({ value, className = '', style = {} }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Only animate values that START with a digit
    if (!/^\d/.test(String(value))) { setDisplay(value); return; }
    // Values with '/' (like 4.9/5) — skip animation
    if (String(value).includes('/')) { setDisplay(value); return; }

    const raw = String(value).replace(/[^0-9.]/g, '');
    const num = parseFloat(raw);
    if (isNaN(num)) { setDisplay(value); return; }

    const suffix = String(value).replace(/^[\d,. ]+/, '');
    const hasComma = String(value).includes(',');
    const hasDecimal = String(value).replace(suffix, '').includes('.');
    const decimals = hasDecimal ? (String(value).replace(suffix, '').split('.')[1]?.length ?? 1) : 0;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        obs.unobserve(el);
        let t0 = null;
        const dur = 2000;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / dur, 1);
          const eased = 1 - (1 - p) ** 3;
          const cur = eased * num;
          const fmt = hasDecimal ? cur.toFixed(decimals) : (hasComma ? Math.floor(cur).toLocaleString() : Math.floor(cur).toString());
          setDisplay(fmt + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref} className={className} style={style}>{display}</span>;
}

function TestimonialCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden bg-[#f0f4f8] border-t border-[#E2E8F0]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[#9a7a3e] text-xs font-bold uppercase tracking-widest">Client Testimonials</span>
          </div>
          <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight mb-10 md:mb-12 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
            Clear communication, dependable execution, and production-aware support.
          </h2>
        </Reveal>

        {/* Testimonial Cards */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[current, testimonials[(currentIndex + 1) % testimonials.length]].map((item, idx) => (
              <div
                key={idx}
                className={`relative border border-[#E2E8F0] bg-white p-6 sm:p-8 hover:shadow-xl transition-all duration-300 min-h-[260px] flex flex-col justify-between ${
                  idx === 1 ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg,#c29f5d,#9a7a3e,transparent)' }} />

                <div>
                  <div className="font-['JetBrains_Mono'] font-bold leading-none select-none text-left"
                    style={{ fontSize: '3rem', color: '#9a7a3e', opacity: 0.12, marginTop: '-0.5rem' }}>"</div>

                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-[#334155] font-medium mb-6 italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0] w-full">
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-sm text-white font-['JetBrains_Mono'] shrink-0"
                    style={{ background: 'linear-gradient(135deg,#9a7a3e,#0F172A)' }}>
                    {item.name[0]}
                  </div>
                  <div className="text-left">
                    <strong className="block font-['JetBrains_Mono'] text-[#0F172A] text-sm leading-tight">{item.name}</strong>
                    <span className="mt-0.5 block text-xs text-[#64748b]">{item.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-8 max-w-md mx-auto">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="inline-flex items-center justify-center w-10 h-10 border border-[#E2E8F0] bg-white text-[#334155] hover:border-[#c29f5d] hover:text-[#9a7a3e] transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
                style={{
                  width: i === currentIndex ? 24 : 8,
                  height: 6,
                  borderRadius: 3,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === currentIndex ? '#c29f5d' : 'rgba(194,159,93,0.25)',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="inline-flex items-center justify-center w-10 h-10 border border-[#E2E8F0] bg-white text-[#334155] hover:border-[#c29f5d] hover:text-[#9a7a3e] transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  /* ── original backend fetching — unchanged ── */
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);


  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await api.get('/clients');
        const list = Array.isArray(res?.data?.clients) ? res.data.clients : [];
        setClients(list.filter((c) => c && c.isActive !== false));
      } catch (e) { console.error('Failed to load clients', e); }
    };
    const loadServices = async () => {
      try {
        const res = await api.get('/services');
        const list = Array.isArray(res?.data?.services) ? res.data.services : [];
        setServices(list.filter((s) => s && s.isActive !== false).slice(0, 8));
      } catch (e) { console.error('Failed to load services', e); }
    };
    loadClients();
    loadServices();
  }, []);

  /* ── original marquee data — unchanged ── */
  const logoClients = clients.filter((c) => c?.logo?.url).length
    ? clients.filter((c) => c?.logo?.url)
    : defaultClientNames.map((companyName) => ({ companyName, logo: { url: '/image.png' } }));
  const rowA = [...logoClients, ...logoClients];
  const rowB = [...logoClients.slice().reverse(), ...logoClients.slice().reverse()];

  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen overflow-x-hidden pb-16" style={{ fontFamily: 'Inter,system-ui,sans-serif' }}>

      {/* ══ HERO + TICKER — same container, ticker rounds bottom ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
        <HeroCarousel />
        {/* Ticker — same width as carousel, rounded bottom corners to close the card */}
        <div className="overflow-hidden rounded-b-[20px] sm:rounded-b-[28px] bg-[#0a1224] border border-t-0 border-white/10">
          <div className="overflow-hidden py-3">
            <div className="flex gap-0 w-max" style={{ animation: 'tickerScroll 40s linear infinite' }}>
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-3 px-6 text-xs font-mono font-semibold whitespace-nowrap"
                  style={{ color: i % 2 === 0 ? '#c29f5d' : 'rgba(255,255,255,0.45)' }}>
                  {item}<span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ QUICK FACTS STRIP ═════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E2E8F0]">
            {quickFacts.map(({ value, label, icon: Icon }, i) => (
              <Reveal key={label} delay={i * 80} style={{ display: 'contents' }}>
                <div className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-5 sm:py-6 hover:bg-[#f7f9fb] transition-colors">
                  <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center bg-[#eceef0] group-hover:bg-teal-50 transition-colors" style={{ color: '#9a7a3e' }}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong className="block font-['JetBrains_Mono'] text-lg sm:text-xl font-bold text-[#0F172A] leading-none">
                      <AnimatedNumber value={value} />
                    </strong>
                    <span className="mt-1 block text-xs text-[#64748b]">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 01 — ABOUT ════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-28 overflow-hidden">

        <Reveal>
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#9a7a3e] uppercase tracking-widest">About Company</span>
            <span className="flex-1 h-px bg-[#E2E8F0] max-w-[60px]" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-center">
          {/* Image */}
          <Reveal delay={100}>
            <div className="relative group">
              <div className="relative overflow-hidden border border-[#E2E8F0] bg-[#0F172A] aspect-[4/3]">
                <img src="/about-us2.png" alt="SriLin electronics manufacturing facility"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top,rgba(194, 159, 93,0.08),transparent)' }} />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-[#0F172A]/90 text-white text-xs font-['JetBrains_Mono'] px-3 py-2 border border-white/10">
                  <Building2 size={14} style={{ color: '#c29f5d' }} /> E-City EMC, Hyderabad
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-['JetBrains_Mono']"
                  style={{ background: 'rgba(194, 159, 93,0.1)', color: '#c29f5d', border: '1px solid rgba(194, 159, 93,0.3)' }}>
                  AS9100D Certified
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#c29f5d]/15 pointer-events-none" />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={200}>
            <div className="flex flex-col gap-5">
              <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight"
                style={{ fontSize: 'clamp(1.5rem,3.5vw,2.5rem)' }}>
                Srilin Electronics<br />Private Limited
              </h2>
              <p className="text-[#334155] text-base sm:text-lg leading-relaxed">
                Srilin Electronics Pvt Ltd is an ISO9001:2015, AS9100D, ANSI ESD S20.20 2021 &amp; IEC 61340 5.1
                certified premier electronics system design and manufacturing services company located in
                E-City EMC, Hyderabad. Our one-stop electronics manufacturing services factory integrates
                quick prototyping, mid-range production, and high-volume manufacturing with disciplined execution.
              </p>
              <p className="text-[#334155] text-base leading-relaxed">
                We provide embedded design, SMT mounting, product integration, testing, box build, and
                comprehensive supply chain support to help clients scale with confidence and production flexibility.
              </p>
              <ul className="flex flex-col gap-2 mt-1">
                {['Design-to-delivery in one location', 'Aerospace-grade quality systems', 'Flexible volumes — prototype to high-volume'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#334155]">
                    <CheckCircle2 size={15} style={{ color: '#9a7a3e', flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link to="/about-company" className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-5 sm:px-6 py-3 text-sm font-semibold hover:opacity-90 hover:gap-3 transition-all">
                  Discover SriLin <ArrowRight size={16} />
                </Link>
                <Link to="/contact-us" className="inline-flex items-center gap-2 border border-[#75777e] text-[#0F172A] px-5 sm:px-6 py-3 text-sm font-semibold hover:bg-[#eceef0] transition-colors">
                  Talk to our team
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {certificationBadges.map((cert) => (
                  <span key={cert} className="inline-flex items-center gap-1.5 border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#334155] hover:border-[#9a7a3e]/40 transition-colors">
                    <ShieldCheck size={12} style={{ color: '#9a7a3e' }} /> {cert}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stat grid — counting numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 md:mt-16">
          {aboutStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <article className="relative group border border-[#E2E8F0] bg-white p-4 sm:p-6 overflow-hidden hover:border-[#c29f5d]/40 hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute top-0 left-0 w-0.5 h-full bg-[#c29f5d] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <strong className="block font-['JetBrains_Mono'] text-xl sm:text-2xl text-[#0F172A]">
                  <AnimatedNumber value={stat.value} />
                </strong>
                <span className="mt-1 block text-xs sm:text-sm text-[#64748b]">{stat.label}</span>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Core services strip */}
        <Reveal delay={150}>
          <div className="mt-4 flex flex-col gap-4 border border-[#E2E8F0] bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[#9a7a3e] text-xs font-bold uppercase tracking-widest">Core EMS Services</p>
              <h3 className="mt-1.5 font-['JetBrains_Mono'] font-semibold text-base sm:text-lg text-[#0F172A]">
                One-stop manufacturing support from design to box build.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {coreServices.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 border border-[#E2E8F0] bg-[#f7f9fb] px-3 py-1.5 text-xs sm:text-sm font-medium text-[#334155] hover:border-[#9a7a3e]/40 hover:bg-white transition-colors">
                  {s === 'SMT Mounting' || s === 'Embedded Design' ? <Cpu size={13} style={{ color: '#9a7a3e' }} /> : <Factory size={13} style={{ color: '#9a7a3e' }} />}
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

      </section>

      {/* ══ SECTION 03 — FEATURED SERVICES ═══════════════════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: '#f0f4f8' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#9a7a3e] text-xs font-bold uppercase tracking-widest">Featured Services</span>
              <span className="flex-1 h-px bg-[#E2E8F0] max-w-[60px]" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight"
                style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', maxWidth: 520 }}>
                Explore our top service capabilities.
              </h2>
              <Link to="/services" className="inline-flex items-center gap-2 text-[#9a7a3e] font-['JetBrains_Mono'] font-semibold text-sm shrink-0 hover:gap-3 transition-all">
                View all services <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          {services.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => {
                if (!service) return null;
                return (
                  <Reveal key={service._id} delay={idx * 60}>
                    <Link to={`/services/${slugify(service.title)}`} className="block h-full">
                      <article className="group border border-[#E2E8F0] bg-white overflow-hidden hover:border-[#c29f5d] hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 h-full flex flex-col justify-between">
                        <div className="relative overflow-hidden bg-[#eceef0] aspect-[4/3] w-full flex items-center justify-center p-6">
                          <img src={service.image?.url || '/image.png'} alt={service.title || 'Service'}
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/image.png'; }}
                            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: 'linear-gradient(to top,rgba(194, 159, 93,0.08),transparent)' }} />
                        </div>
                        <div className="p-6 flex items-center justify-between border-t border-[#E2E8F0]">
                          <h3 className="font-['JetBrains_Mono'] font-bold text-base sm:text-lg text-[#0F172A] leading-snug">{service.title || 'Untitled service'}</h3>
                          <ArrowUpRight size={18} className="shrink-0 text-[#E2E8F0] group-hover:text-[#9a7a3e] transition-colors" />
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreServices.map((svc, idx) => (
                <Reveal key={svc} delay={idx * 60}>
                  <Link to={`/services/${slugify(svc)}`} className="block h-full">
                    <article className="group flex items-center gap-5 border border-[#E2E8F0] bg-white p-8 sm:p-10 hover:border-[#c29f5d] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <span className="font-['JetBrains_Mono'] font-bold text-lg text-[#0F172A]">{svc}</span>
                      <ArrowRight size={18} className="ml-auto shrink-0 text-[#E2E8F0] group-hover:text-[#9a7a3e] group-hover:translate-x-1 transition-all" />
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ SECTION 04 — WHY CHOOSE ═══════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-28 overflow-hidden">
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#9a7a3e] text-xs font-bold uppercase tracking-widest">Why Choose SriLin</span>
            <span className="flex-1 h-px bg-[#E2E8F0] max-w-[60px]" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
            <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight"
              style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', maxWidth: 520 }}>
              Built for electronics teams that need precision, speed, and accountability.
            </h2>
            <Link to="/about-company" className="inline-flex items-center gap-2 text-[#9a7a3e] font-semibold text-sm shrink-0 hover:gap-3 transition-all">
              About us <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {whyChoose.map(({ icon: Icon, title, text }, idx) => (
            <Reveal key={title} delay={idx * 100}>
              <article className="group relative border border-[#E2E8F0] bg-white p-6 sm:p-8 hover:border-[#c29f5d] hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c29f5d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-start justify-between mb-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center bg-[#eceef0] group-hover:bg-teal-50 text-[#0F172A] transition-colors">
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className="font-['JetBrains_Mono'] font-semibold text-lg text-[#0F172A] mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-[#334155]">{text}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#9a7a3e] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                  Learn more <ArrowRight size={12} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ SECTION 05 — INDUSTRIES ═══════════════════════════════ */}
      <section className="bg-white py-16 md:py-28 relative overflow-hidden border-y border-[#E2E8F0]">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(194, 159, 93,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(194, 159, 93,0.02) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(194, 159, 93,0.04) 0%,transparent 70%)', transform: 'translate(30%,-30%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10 md:mb-14">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9a7a3e]">Industries Served</span>
                  <span className="flex-1 h-px bg-[#E2E8F0] max-w-[60px]" />
                </div>
                <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight"
                  style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', maxWidth: 480 }}>
                  Flexible electronics capability for modern industrial and product ecosystems.
                </h2>
              </div>
              <div className="shrink-0 border border-[#E2E8F0] bg-[#f7f9fb] px-6 py-5 flex flex-col gap-1 min-w-[180px]">
                <strong className="font-['JetBrains_Mono'] font-bold text-3xl text-[#0F172A]">8</strong>
                <span className="text-xs text-[#64748b]">Industry verticals</span>
                <span className="text-xs mt-1 text-[#9a7a3e]">Aerospace to Medical</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map(([industry, Icon], i) => (
              <Reveal key={industry} delay={i * 60}>
                <article className="group flex flex-col items-center justify-center text-center gap-4 border border-[#E2E8F0] bg-[#f7f9fb] p-6 sm:p-8 hover:border-[#c29f5d]/50 hover:bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default h-full">
                  <span className="inline-flex h-14 w-14 items-center justify-center bg-[#eceef0] group-hover:bg-[#c29f5d]/10 transition-colors rounded text-[#9a7a3e]">
                    <Icon size={28} />
                  </span>
                  <span className="text-[#0F172A] text-sm md:text-base font-semibold leading-snug">{industry}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══ CERTIFICATE CAROUSEL ══════════════════════════════════ */}
      <CertificateCarousel />


      {/* ══ CLIENTS MARQUEE ═══════════════════════════════════════ */}
      <section className="bg-[#eceef0] py-10 md:py-14 border-y border-[#E2E8F0] overflow-hidden">
        <Reveal>
          <p className="text-center text-[#9a7a3e] text-xs font-bold uppercase tracking-widest mb-6 px-4">Trusted by Leading Companies</p>
        </Reveal>
        <div className="space-y-4">
          <div className="flex gap-6 sm:gap-10 animate-[marquee-left_30s_linear_infinite] w-max">
            {rowA.map((client, i) => (
              <div key={`${client.companyName}-${i}`} className="flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 bg-white border border-[#E2E8F0] shrink-0 hover:border-[#9a7a3e]/30 transition-colors">
                {client.logo?.url && <img src={client.logo.url} alt={client.companyName} className="max-h-8 sm:max-h-10 max-w-[80%] object-contain" />}
              </div>
            ))}
          </div>
          <div className="flex gap-6 sm:gap-10 animate-[marquee-right_30s_linear_infinite] w-max">
            {rowB.map((client, i) => (
              <div key={`${client.companyName}-rev-${i}`} className="flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 bg-white border border-[#E2E8F0] shrink-0 hover:border-[#9a7a3e]/30 transition-colors">
                {client.logo?.url && <img src={client.logo.url} alt={client.companyName} className="max-h-8 sm:max-h-10 max-w-[80%] object-contain" />}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ══ SECTION 08 — TESTIMONIALS (AUTO CAROUSEL) ═══════════════ */}
      <TestimonialCarouselSection />
      {/* ══ FINAL CTA ════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-20">
        <Reveal>
          <div className="relative bg-[#0F172A] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(194, 159, 93,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(194, 159, 93,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(to bottom,transparent,#c29f5d,transparent)' }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse,rgba(194, 159, 93,0.08) 0%,transparent 70%)', filter: 'blur(32px)' }} />

            <div className="relative px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex flex-col gap-5 max-w-xl">
                  <span className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    style={{ color: '#c29f5d', border: '1px solid rgba(194, 159, 93,0.3)', background: 'rgba(194, 159, 93,0.08)' }}>
                    <Sparkles size={11} /> Start a Conversation
                  </span>
                  <h2 className="font-['JetBrains_Mono'] font-bold text-white leading-tight"
                    style={{ fontSize: 'clamp(1.5rem,4vw,2.75rem)' }}>
                    Ready to discuss your next electronics requirement?
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    From prototype to production — our team is ready to evaluate your requirements and recommend the right manufacturing approach.
                  </p>
                </div>
                <div className="flex flex-col gap-4 shrink-0">
                  <Link to="/contact-us"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold hover:opacity-90 hover:gap-3 transition-all"
                    style={{ background: '#c29f5d', color: '#0F172A' }}>
                    Contact SriLin <ArrowRight size={16} />
                  </Link>
                  <Link to="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
                    View Services
                  </Link>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {certificationBadges.slice(0, 2).map((cert) => (
                      <span key={cert} className="flex items-center gap-1.5 text-xs font-['JetBrains_Mono']" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        <ShieldCheck size={10} style={{ color: '#c29f5d' }} /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes marquee-left  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
        @keyframes marquee-right { from{transform:translateX(-50%)} to{transform:translateX(0)}    }
        @keyframes tickerScroll  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
      `}</style>
    </div>
  );
}
