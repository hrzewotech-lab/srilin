import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, CheckCircle2,
  Cpu, Factory, Layers3, MapPin, Quote, ShieldCheck,
  Smile, Sparkles, TrendingUp, Zap,
} from 'lucide-react';
import CertificateCarousel from '../components/CertificateCarousel';
import HeroCarousel from '../components/HeroCarousel';
import api from '../api/axios';

/* ════════════════════════════════════════════════════════════════
   STATIC DATA  — all original arrays unchanged
   ════════════════════════════════════════════════════════════════ */
const whyChoose = [
  { icon: Cpu,         title: 'Design-to-Manufacturing Thinking', text: 'Engineering support focused on reliable assemblies, practical sourcing, and production-ready decisions.' },
  { icon: Factory,     title: 'Organized Production Capability',  text: 'Structured workflows, inspection checkpoints, and machinery support for repeatable electronic builds.' },
  { icon: ShieldCheck, title: 'Quality-Focused Delivery',         text: 'Clear validation practices and disciplined documentation keep every requirement visible through delivery.' },
];
const industries = [
  ['Automotive', Factory], ['Aviation, Space & Defence', MapPin],
  ['IT Hardware & Consumer Electronics', Cpu], ['Telecom', Sparkles],
  ['Electric Vehicles', Zap], ['Railways', Building2],
  ['AI, IoT & Automation', Layers3], ['Medical Devices', ShieldCheck],
];
const testimonials = [
  { quote: 'SriLin gives us the confidence of an engineering partner, not just a vendor. Their team understands production realities early.', name: 'Procurement Head', company: 'Industrial Controls Company' },
  { quote: 'The project communication was clear, the build quality was consistent, and the delivery rhythm helped our launch stay on track.', name: 'Product Lead', company: 'Electronics Product Brand' },
];
const aboutStats       = [
  { value: '2017',    label: 'Established' },
  { value: '25,000',  label: 'Sqft current facility' },
  { value: '214,000', label: 'Sqft expansion space' },
  { value: 'ISO-8',   label: 'Cleanroom class' },
];
const certificationBadges = ['ISO9001:2015', 'AS9100D', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1'];
const coreServices        = ['Embedded Design','SMT Mounting','Product Integration','Testing','Box Build','Supply Chain Management'];
const defaultClientNames  = ['Aerospace OEMs','Automation Teams','EV Suppliers','Industrial Brands','IoT Innovators'];
const premiumStats = [
  { value: '98%',     label: 'On-time delivery',      detail: 'Precision production schedules with consistent delivery rhythm.' },
  { value: '4.9/5',   label: 'Customer satisfaction', detail: 'Trusted by engineers and procurement teams for clear collaboration.' },
  { value: '75+',     label: 'Global customers',      detail: 'Manufacturing partnerships across aerospace, industrial and commercial segments.' },
  { value: '12 days', label: 'Prototype lead time',   detail: 'Rapid prototype cycles that move designs from concept to review quickly.' },
];
const aboutHighlights = [
  { icon: MapPin,     title: 'Strategic Location',      meta: '15 minutes from airport cargo terminal', text: 'Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal.' },
  { icon: ShieldCheck,title: 'High Reliability Specialist',meta:'Aerospace, defence, automotive and more', text: 'AS9100D certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics.' },
  { icon: TrendingUp, title: 'Built to Scale',           meta: '8x expansion footprint on same campus',  text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility with dedicated clusters for strategic partners.' },
  { icon: Smile,      title: 'Customer Satisfaction',    meta: 'Flexible volumes and account ownership',  text: 'Dedicated account management, quick prototyping, and flexible production volumes tailored to exact requirements.' },
  { icon: BadgeCheck, title: 'Quality First Approach',   meta: '3D SPI, 3D AOI and X-ray systems',       text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems for dependable output.' },
];
const tickerItems  = ['AS9100D Certified','ISO 9001:2015','ANSI ESD S20.20 2021','IEC 61340 5.1','98% On-Time Delivery','75+ Global Customers','12-Day Prototype Cycle','ISO-8 Cleanroom Class','E-City EMC · Hyderabad','214,000 Sqft Expansion Ready'];
const quickFacts   = [
  { value: '2017',    label: 'Year Founded',     icon: Building2  },
  { value: '98%',     label: 'On-time Delivery', icon: TrendingUp },
  { value: '75+',     label: 'Global Customers', icon: Smile      },
  { value: '12 days', label: 'Prototype Cycle',  icon: Zap        },
];
const processSteps = [
  { step: '01', title: 'Design Review',    text: 'Manufacturability analysis of your files and BOM — flagging risk before a single component is ordered.', icon: Cpu         },
  { step: '02', title: 'Rapid Prototype',  text: 'SMT assembly, functional testing, and validation in as few as 12 days from approved drawings.',           icon: Zap         },
  { step: '03', title: 'Quality Inspect',  text: '3D SPI, 3D AOI, and X-ray inspection at every production stage — not only at final output.',              icon: ShieldCheck },
  { step: '04', title: 'On-Time Delivery', text: 'Proactive scheduling updates and 98% on-time performance across all production programs.',                  icon: TrendingUp  },
];

/* ════════════════════════════════════════════════════════════════
   ANIMATION UTILITIES
   ════════════════════════════════════════════════════════════════ */

/** Scroll-reveal wrapper — fades + slides up when entering viewport */
function Reveal({ children, delay = 0, y = 28, style = {}, className = '' }) {
  const ref      = useRef(null);
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
  const ref     = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el  = ref.current;
    if (!el) return;
    // Only animate values that START with a digit
    if (!/^\d/.test(String(value))) { setDisplay(value); return; }
    // Values with '/' (like 4.9/5) — skip animation
    if (String(value).includes('/')) { setDisplay(value); return; }

    const raw      = String(value).replace(/[^0-9.]/g, '');
    const num      = parseFloat(raw);
    if (isNaN(num)) { setDisplay(value); return; }

    const suffix   = String(value).replace(/^[\d,. ]+/, '');
    const hasComma = String(value).includes(',');
    const hasDecimal = String(value).replace(suffix, '').includes('.');
    const decimals = hasDecimal ? (String(value).replace(suffix,'').split('.')[1]?.length ?? 1) : 0;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        obs.unobserve(el);
        let t0 = null;
        const dur = 2000;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p     = Math.min((ts - t0) / dur, 1);
          const eased = 1 - (1 - p) ** 3;
          const cur   = eased * num;
          const fmt   = hasDecimal ? cur.toFixed(decimals) : (hasComma ? Math.floor(cur).toLocaleString() : Math.floor(cur).toString());
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

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  /* ── original backend fetching — unchanged ── */
  const [clients, setClients]     = useState([]);
  const [services, setServices]   = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res  = await api.get('/clients');
        const list = Array.isArray(res?.data?.clients) ? res.data.clients : [];
        setClients(list.filter((c) => c && c.isActive !== false));
      } catch (e) { console.error('Failed to load clients', e); }
    };
    const loadServices = async () => {
      try {
        const res  = await api.get('/services');
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

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <HeroCarousel />

      {/* ══ ANNOUNCEMENT TICKER ══════════════════════════════════ */}
      <div className="bg-[#0F172A] border-b border-white/5 overflow-hidden py-2.5">
        <div className="flex gap-0 w-max" style={{ animation: 'tickerScroll 40s linear infinite' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs font-mono font-semibold whitespace-nowrap"
              style={{ color: i % 2 === 0 ? '#00f1fe' : 'rgba(255,255,255,0.45)' }}>
              {item}<span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ══ QUICK FACTS STRIP ═════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E2E8F0]">
            {quickFacts.map(({ value, label, icon: Icon }, i) => (
              <Reveal key={label} delay={i * 80} style={{ display: 'contents' }}>
                <div className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-5 sm:py-6 hover:bg-[#f7f9fb] transition-colors">
                  <span className="shrink-0 inline-flex h-10 w-10 items-center justify-center bg-[#eceef0] group-hover:bg-teal-50 transition-colors" style={{ color: '#00696f' }}>
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
        <span className="absolute -top-4 -left-4 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-[#0F172A] opacity-[0.03]"
          style={{ fontSize: 'clamp(6rem,18vw,14rem)', lineHeight: 1 }}>01</span>

        <Reveal>
          <div className="flex items-center gap-3 mb-10 md:mb-14">
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00696f] uppercase tracking-widest">About Company</span>
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
                  style={{ background: 'linear-gradient(to top,rgba(0,241,254,0.08),transparent)' }} />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-[#0F172A]/90 text-white text-xs font-['JetBrains_Mono'] px-3 py-2 border border-white/10">
                  <Building2 size={14} style={{ color: '#00f1fe' }} /> E-City EMC, Hyderabad
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-['JetBrains_Mono']"
                  style={{ background: 'rgba(0,241,254,0.1)', color: '#00f1fe', border: '1px solid rgba(0,241,254,0.3)' }}>
                  AS9100D Certified
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#00f1fe]/15 pointer-events-none" />
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
                {['Design-to-delivery in one location','Aerospace-grade quality systems','Flexible volumes — prototype to high-volume'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#334155]">
                    <CheckCircle2 size={15} style={{ color: '#00696f', flexShrink: 0 }} /> {item}
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
                  <span key={cert} className="inline-flex items-center gap-1.5 border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#334155] hover:border-[#00696f]/40 transition-colors">
                    <ShieldCheck size={12} style={{ color: '#00696f' }} /> {cert}
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
              <article className="relative group border border-[#E2E8F0] bg-white p-4 sm:p-6 overflow-hidden hover:border-[#00f1fe]/40 hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute top-0 left-0 w-0.5 h-full bg-[#00f1fe] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
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
              <p className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Core EMS Services</p>
              <h3 className="mt-1.5 font-['JetBrains_Mono'] font-semibold text-base sm:text-lg text-[#0F172A]">
                One-stop manufacturing support from design to box build.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {coreServices.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 border border-[#E2E8F0] bg-[#f7f9fb] px-3 py-1.5 text-xs sm:text-sm font-medium text-[#334155] hover:border-[#00696f]/40 hover:bg-white transition-colors">
                  {s === 'SMT Mounting' || s === 'Embedded Design' ? <Cpu size={13} style={{ color: '#00696f' }} /> : <Factory size={13} style={{ color: '#00696f' }} />}
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* About highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {aboutHighlights.map(({ icon: Icon, title, meta, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <article className="group relative border border-[#E2E8F0] bg-white p-5 sm:p-6 hover:border-[#00f1fe]/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right,rgba(0,241,254,0.06),transparent)' }} />
                <span className="inline-flex h-10 w-10 items-center justify-center bg-[#eceef0] group-hover:bg-teal-50 transition-colors mb-3" style={{ color: '#00696f' }}>
                  <Icon size={20} />
                </span>
                <h4 className="font-['JetBrains_Mono'] font-semibold text-sm sm:text-base text-[#0F172A]">{title}</h4>
                <p className="mt-1 text-xs font-semibold" style={{ color: '#00696f' }}>{meta}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#334155]">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ CLIENTS MARQUEE ═══════════════════════════════════════ */}
      <section className="bg-[#eceef0] py-10 md:py-14 border-y border-[#E2E8F0] overflow-hidden">
        <Reveal>
          <p className="text-center text-[#00696f] text-xs font-bold uppercase tracking-widest mb-6 px-4">Trusted by Leading Companies</p>
        </Reveal>
        <div className="space-y-4">
          <div className="flex gap-6 sm:gap-10 animate-[marquee-left_30s_linear_infinite] w-max">
            {rowA.map((client, i) => (
              <div key={`${client.companyName}-${i}`} className="flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 bg-white border border-[#E2E8F0] shrink-0 hover:border-[#00696f]/30 transition-colors">
                {client.logo?.url && <img src={client.logo.url} alt={client.companyName} className="max-h-8 sm:max-h-10 max-w-[80%] object-contain" />}
              </div>
            ))}
          </div>
          <div className="flex gap-6 sm:gap-10 animate-[marquee-right_30s_linear_infinite] w-max">
            {rowB.map((client, i) => (
              <div key={`${client.companyName}-rev-${i}`} className="flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 bg-white border border-[#E2E8F0] shrink-0 hover:border-[#00696f]/30 transition-colors">
                {client.logo?.url && <img src={client.logo.url} alt={client.companyName} className="max-h-8 sm:max-h-10 max-w-[80%] object-contain" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 02 — HOW WE WORK ══════════════════════════════ */}
      <section className="relative bg-[#0F172A] py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,241,254,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,241,254,0.03) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(0,241,254,0.06) 0%,transparent 70%)', filter: 'blur(40px)' }} />
        <span className="absolute -top-6 right-0 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-white opacity-[0.025]"
          style={{ fontSize: 'clamp(6rem,18vw,14rem)', lineHeight: 1 }}>02</span>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-widest" style={{ color: '#00f1fe' }}>How We Work</span>
              <span className="flex-1 h-px max-w-[60px]" style={{ background: 'rgba(0,241,254,0.2)' }} />
            </div>
            <h2 className="font-['JetBrains_Mono'] font-bold text-white leading-tight mb-12 md:mb-16"
              style={{ fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', maxWidth: 600 }}>
              A disciplined 4-step process from design review to reliable delivery.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {processSteps.map(({ step, title, text, icon: Icon }, idx) => (
              <Reveal key={step} delay={idx * 120}>
                <article className="group relative bg-[#0F172A] p-6 sm:p-8 hover:bg-white/5 transition-colors duration-300 h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="font-['JetBrains_Mono'] font-bold text-xs" style={{ color: '#00f1fe' }}>{step}</span>
                    <div className="flex-1 h-px mt-2" style={{ background: 'rgba(0,241,254,0.2)' }} />
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center mb-4 border border-white/10 group-hover:border-[#00f1fe]/30 transition-colors" style={{ color: '#00f1fe' }}>
                    <Icon size={18} />
                  </span>
                  <h3 className="font-['JetBrains_Mono'] font-semibold text-white text-base mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 03 — FEATURED SERVICES ═══════════════════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: '#f0f4f8' }}>
        <span className="absolute -top-4 right-0 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-[#0F172A] opacity-[0.03]"
          style={{ fontSize: 'clamp(6rem,18vw,14rem)', lineHeight: 1 }}>03</span>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Featured Services</span>
              <span className="flex-1 h-px bg-[#E2E8F0] max-w-[60px]" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight"
                style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', maxWidth: 520 }}>
                Explore our top service capabilities.
              </h2>
              <Link to="/services" className="inline-flex items-center gap-2 text-[#00696f] font-['JetBrains_Mono'] font-semibold text-sm shrink-0 hover:gap-3 transition-all">
                View all services <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          {services.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service, idx) => {
                if (!service) return null;
                return (
                  <Reveal key={service._id} delay={idx * 60}>
                    <article className="group border border-[#E2E8F0] bg-white overflow-hidden hover:border-[#00f1fe] hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 h-full">
                      <div className="relative overflow-hidden bg-[#eceef0]" style={{ aspectRatio: '16/9' }}>
                        <div className="absolute top-3 left-3 z-10 font-['JetBrains_Mono'] text-[10px] font-bold text-white/60">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <img src={service.image?.url || '/image.png'} alt={service.title || 'Service'}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/image.png'; }}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: 'linear-gradient(to top,rgba(0,241,254,0.08),transparent)' }} />
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <h3 className="font-['JetBrains_Mono'] font-semibold text-sm text-[#0F172A] leading-snug">{service.title || 'Untitled service'}</h3>
                        <ArrowUpRight size={14} className="shrink-0 text-[#E2E8F0] group-hover:text-[#00696f] transition-colors" />
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coreServices.map((svc, idx) => (
                <Reveal key={svc} delay={idx * 60}>
                  <article className="group flex items-center gap-4 border border-[#E2E8F0] bg-white p-5 hover:border-[#00f1fe] hover:-translate-y-0.5 transition-all duration-300">
                    <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00696f] shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-['JetBrains_Mono'] font-semibold text-sm text-[#0F172A]">{svc}</span>
                    <ArrowRight size={14} className="ml-auto shrink-0 text-[#E2E8F0] group-hover:text-[#00696f] group-hover:translate-x-1 transition-all" />
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ SECTION 04 — WHY CHOOSE ═══════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-28 overflow-hidden">
        <span className="absolute -top-4 -right-4 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-[#0F172A] opacity-[0.03]"
          style={{ fontSize: 'clamp(6rem,18vw,14rem)', lineHeight: 1 }}>04</span>
        <Reveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Why Choose SriLin</span>
            <span className="flex-1 h-px bg-[#E2E8F0] max-w-[60px]" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
            <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight"
              style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', maxWidth: 520 }}>
              Built for electronics teams that need precision, speed, and accountability.
            </h2>
            <Link to="/about-company" className="inline-flex items-center gap-2 text-[#00696f] font-semibold text-sm shrink-0 hover:gap-3 transition-all">
              About us <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {whyChoose.map(({ icon: Icon, title, text }, idx) => (
            <Reveal key={title} delay={idx * 100}>
              <article className="group relative border border-[#E2E8F0] bg-white p-6 sm:p-8 hover:border-[#00f1fe] hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00f1fe] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-start justify-between mb-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center bg-[#eceef0] group-hover:bg-teal-50 text-[#0F172A] transition-colors">
                    <Icon size={22} />
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#E2E8F0] group-hover:text-[#00f1fe] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-['JetBrains_Mono'] font-semibold text-lg text-[#0F172A] mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-[#334155]">{text}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#00696f] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                  Learn more <ArrowRight size={12} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ SECTION 05 — INDUSTRIES ═══════════════════════════════ */}
      <section className="bg-[#0F172A] py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,241,254,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,241,254,0.03) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(0,241,254,0.06) 0%,transparent 70%)', transform: 'translate(30%,-30%)' }} />
        <span className="absolute -bottom-6 left-0 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-white opacity-[0.025]"
          style={{ fontSize: 'clamp(6rem,18vw,14rem)', lineHeight: 1 }}>05</span>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10 md:mb-14">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00f1fe' }}>Industries Served</span>
                  <span className="flex-1 h-px max-w-[60px]" style={{ background: 'rgba(0,241,254,0.2)' }} />
                </div>
                <h2 className="font-['JetBrains_Mono'] font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', maxWidth: 480 }}>
                  Flexible electronics capability for modern industrial and product ecosystems.
                </h2>
              </div>
              <div className="shrink-0 border border-white/10 bg-white/5 px-6 py-5 flex flex-col gap-1 min-w-[180px]">
                <strong className="font-['JetBrains_Mono'] font-bold text-3xl text-white">8</strong>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Industry verticals</span>
                <span className="text-xs mt-1" style={{ color: '#00f1fe' }}>Aerospace to Medical</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {industries.map(([industry, Icon], i) => (
              <Reveal key={industry} delay={i * 60}>
                <article className="group flex flex-col items-start gap-3 border border-white/10 bg-white/5 p-4 sm:p-5 hover:border-[#00f1fe]/50 hover:bg-white/10 transition-all duration-300 cursor-default h-full">
                  <span className="inline-flex h-9 w-9 items-center justify-center bg-white/10 group-hover:bg-[#00f1fe]/10 transition-colors" style={{ color: '#00f1fe' }}>
                    <Icon size={18} />
                  </span>
                  <span className="text-white text-sm font-medium leading-snug">{industry}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 06 — PERFORMANCE STATS (counting) ════════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <span className="absolute -top-4 right-0 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-[#0F172A] opacity-[0.03]"
          style={{ fontSize: 'clamp(6rem,18vw,14rem)', lineHeight: 1 }}>06</span>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <Reveal className="lg:w-72 shrink-0 mb-10 lg:mb-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Performance Metrics</span>
                <span className="flex-1 h-px bg-[#E2E8F0] max-w-[40px]" />
              </div>
              <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight mb-5"
                style={{ fontSize: 'clamp(1.4rem,3vw,2rem)' }}>
                Numbers that prove reliability, speed, and quality.
              </h2>
              <Link to="/about-company" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00696f] hover:gap-3 transition-all">
                Our story <ArrowRight size={14} />
              </Link>
            </Reveal>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {premiumStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <article className="group relative border border-[#E2E8F0] bg-white p-6 sm:p-8 overflow-hidden hover:border-[#00f1fe]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 h-full">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg,rgba(0,105,111,0.04) 0%,transparent 60%)' }} />
                    <span className="block text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#00696f' }}>{stat.label}</span>
                    <div className="font-['JetBrains_Mono'] font-bold text-[#0F172A]"
                      style={{ fontSize: 'clamp(2rem,5vw,3rem)', lineHeight: 1 }}>
                      <AnimatedNumber value={stat.value} />
                    </div>
                    <p className="mt-3 text-sm text-[#334155] leading-relaxed">{stat.detail}</p>
                    <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#00f1fe] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATE CAROUSEL ══════════════════════════════════ */}
      <CertificateCarousel />

      {/* ══ SECTION 08 — TESTIMONIALS ════════════════════════════ */}
      <section className="relative py-16 md:py-28 overflow-hidden" style={{ background: '#f0f4f8' }}>
        <span className="absolute -top-4 -left-4 select-none pointer-events-none font-['JetBrains_Mono'] font-bold text-[#0F172A] opacity-[0.03]"
          style={{ fontSize: 'clamp(6rem,18vw,14rem)', lineHeight: 1 }}>08</span>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Client Testimonials</span>
              <span className="flex-1 h-px bg-[#E2E8F0] max-w-[60px]" />
            </div>
            <h2 className="font-['JetBrains_Mono'] font-bold text-[#0F172A] leading-tight mb-10 md:mb-14"
              style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', maxWidth: 540 }}>
              Clear communication, dependable execution, and production-aware support.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <article className="group relative border border-[#E2E8F0] bg-white p-7 sm:p-10 hover:border-[#00696f]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: 'radial-gradient(circle at top right,rgba(0,241,254,0.06),transparent)' }} />
                  <div className="font-['JetBrains_Mono'] font-bold leading-none select-none mb-4"
                    style={{ fontSize: '5rem', color: '#00696f', opacity: 0.12, lineHeight: 0.8 }}>"</div>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-[#334155] mb-6">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-[#E2E8F0]">
                    <div className="flex items-center justify-center w-10 h-10 font-bold text-sm text-white font-['JetBrains_Mono'] shrink-0"
                      style={{ background: 'linear-gradient(135deg,#00696f,#0F172A)' }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <strong className="block font-['JetBrains_Mono'] text-[#0F172A] text-sm">{t.name}</strong>
                      <span className="mt-0.5 block text-xs text-[#64748b]">{t.company}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-20">
        <Reveal>
          <div className="relative bg-[#0F172A] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(0,241,254,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,241,254,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(to bottom,transparent,#00f1fe,transparent)' }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse,rgba(0,241,254,0.08) 0%,transparent 70%)', filter: 'blur(32px)' }} />

            <div className="relative px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex flex-col gap-5 max-w-xl">
                  <span className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    style={{ color: '#00f1fe', border: '1px solid rgba(0,241,254,0.3)', background: 'rgba(0,241,254,0.08)' }}>
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
                    style={{ background: '#00f1fe', color: '#0F172A' }}>
                    Contact SriLin <ArrowRight size={16} />
                  </Link>
                  <Link to="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
                    View Services
                  </Link>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {certificationBadges.slice(0, 2).map((cert) => (
                      <span key={cert} className="flex items-center gap-1.5 text-xs font-['JetBrains_Mono']" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        <ShieldCheck size={10} style={{ color: '#00f1fe' }} /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ FLOATING QUOTE BUTTON ════════════════════════════════ */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        <Link to="/contact-us"
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold transition-all hover:opacity-90"
          style={{ background: '#00f1fe', color: '#0F172A', boxShadow: '0 4px 20px rgba(0,241,254,0.3)' }}>
          <Sparkles size={14} /> Request Quote
        </Link>
      </div>

      <style>{`
        @keyframes marquee-left  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
        @keyframes marquee-right { from{transform:translateX(-50%)} to{transform:translateX(0)}    }
        @keyframes tickerScroll  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
      `}</style>
    </div>
  );
}
