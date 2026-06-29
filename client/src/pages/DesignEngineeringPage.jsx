import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FlaskConical,
  Layers,
  Microscope,
  MonitorDot,
  Pencil,
  Zap,
} from 'lucide-react';

// --- DATA ---
const sections = [
  {
    title: 'Embedded Hardware Design Services',
    eyebrow: 'Core Offering',
    icon: Cpu,
    tag: 'Hardware Design',
    image: '/embedded-hardware.jpg',
    alt: 'Embedded hardware design services',
    body: 'Srilin Electronics delivers high-quality, reliable, and performance-driven electronic solutions through comprehensive embedded hardware design. Our approach combines deep design expertise with rigorous validation — spanning schematic design, ECAD layout, unit testing, and functional testing — tightly integrated with EMS services to ensure every product meets industry standards.',
  },
  {
    title: 'Design Enhancements',
    eyebrow: 'Optimisation',
    icon: Pencil,
    tag: 'Circuit Refinement',
    body: 'We continuously improve hardware designs to achieve better performance, efficiency, and reliability. Enhancement work covers circuit layout optimisation, component selection, signal integrity improvements, and thermal management — reducing power consumption, minimising noise, and ensuring the final assembly is technically robust, cost-effective, and production-ready.',
  },
  {
    title: 'Unit Testing',
    eyebrow: 'Module-Level Validation',
    icon: Microscope,
    tag: 'Early-Stage QA',
    body: 'Unit testing is performed at the individual component or module level to verify correct function before full integration. Srilin engineers isolate and test power modules, communication interfaces, and processor units independently — catching and resolving issues early, reducing development cycles, and preventing costly errors downstream.',
  },
  {
    title: 'Functional Testing',
    eyebrow: 'System-Level Validation',
    icon: FlaskConical,
    tag: 'End-to-End QA',
    image: '/embedded-software.jpg',
    alt: 'Embedded software and functional testing',
    body: 'Functional testing validates the complete hardware system against real-world operating conditions and required specifications. Our process covers I/O operations, system responses, communication protocols, and overall system behaviour — confirming reliability, stability, and compliance before the product reaches deployment.',
  },
  {
    title: 'Embedded Software Services',
    eyebrow: 'Software Division',
    icon: MonitorDot,
    tag: 'Firmware & SW',
    body: 'Srilin provides advanced embedded software services that complement hardware design and manufacturing. We develop reliable, scalable, and high-performance firmware for aerospace, defence, space, AI/IoT, industrial automation, medical, railways, IT hardware, consumer electronics, automotive, EV, and telecom electronics. A key pillar is LabVIEW-based test software and custom test application development.',
  },
  {
    title: 'LabVIEW Test Software',
    eyebrow: 'National Instruments Platform',
    icon: Layers,
    tag: 'Automated Testing',
    body: 'Srilin specialises in LabVIEW-based test solutions — enabling graphical programming for automated testing, data acquisition, and system control. Our LabVIEW capability delivers:',
    bullets: [
      'Automated complex test procedures for electronic hardware',
      'Instrument interfacing — oscilloscopes, multimeters, DAQ systems',
      'Real-time data monitoring and analysis dashboards',
      'Improved accuracy with reduced manual intervention',
    ],
  },
  {
    title: 'Test Applications',
    eyebrow: 'Custom Development',
    icon: Zap,
    tag: 'Validation SW',
    body: 'Srilin builds tailored test applications that validate embedded systems across operating conditions and industry standards. Our test application suite provides:',
    bullets: [
      'Functional testing of embedded systems and subsystems',
      'Automated test sequences for production and validation lines',
      'Operator-friendly interfaces for engineers and technicians',
      'Data logging, reporting, and diagnostics for quality analysis',
      'Full integration with hardware platforms and communication protocols',
    ],
  },
];

export default function DesignEngineeringPage() {
  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden bg-[#0F172A]
                   min-h-[340px] sm:min-h-[380px] md:min-h-[420px]
                   flex items-center"
      >
        <img
          src="/embedded-software.jpg"
          alt="Precision circuit board engineering"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F172A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-0">
          <div className="max-w-2xl border-l-2 border-[#00f1fe] pl-5 md:pl-6">
            <p className="text-[#00f1fe] text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4">
              Design &amp; Engineering
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Embedded Systems.
              <br />
              Built to Last.
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              Srilin combines engineering depth, test discipline, and manufacturing awareness
              to help product teams build dependable embedded systems — from concept through
              full production validation.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> Hardware Design
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> LabVIEW Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> Functional Testing
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#00f1fe]/60 via-[#00f1fe]/10 to-transparent" />
      </section>

      {/* ── SPEC STRIP ── */}
      <div className="bg-[#0F172A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/50 text-[10px] sm:text-[11px] tracking-wide text-center sm:text-left">
            Schematic Design &nbsp;•&nbsp; ECAD Layout &nbsp;•&nbsp; LabVIEW Test &nbsp;•&nbsp; Firmware Development &nbsp;•&nbsp; System Validation
          </p>
          <p className="text-[#00f1fe] font-['JetBrains_Mono'] text-xs tracking-widest text-center sm:text-right">
            SRILIN_ENG_DESIGN_V3
          </p>
        </div>
      </div>

      {/* ── SECTIONS ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20 space-y-6">

        {sections.map(({ title, eyebrow, icon: Icon, tag, image, alt, body, bullets }, index) => {
          const isEven = index % 2 === 0;
          const hasImage = !!image;

          return (
            <article
              key={title}
              className={`group bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#00f1fe] hover:shadow-lg transition-all duration-300 ${
                hasImage ? 'grid grid-cols-1 lg:grid-cols-12' : 'grid grid-cols-1'
              }`}
            >
              {/* Image panel (only for sections with images) */}
              {hasImage && (
                <div
                  className={`lg:col-span-4 h-56 lg:h-auto bg-[#0F172A] overflow-hidden ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={image}
                    alt={alt || title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              )}

              {/* Content panel */}
              <div
                className={`flex flex-col gap-5 p-7 md:p-10 ${
                  hasImage
                    ? `lg:col-span-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`
                    : ''
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[#00696f] text-[10px] font-semibold uppercase tracking-widest mb-1">
                      {eyebrow}
                    </p>
                    <h2 className="font-['JetBrains_Mono'] font-bold text-xl md:text-2xl text-[#0F172A] leading-snug">
                      {title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-['JetBrains_Mono'] text-[#E2E8F0] text-2xl font-bold select-none hidden sm:block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center bg-[#eceef0] text-[#0F172A] group-hover:bg-[#00f1fe]/10 group-hover:text-[#00696f] transition-colors">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <p className="text-sm text-[#44474d] leading-relaxed">{body}</p>

                {/* Bullets */}
                {bullets && (
                  <ul className={`grid gap-2.5 ${hasImage ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#44474d]">
                        <ArrowRight
                          size={14}
                          className="text-[#00696f] shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tag */}
                <div className="pt-2 border-t border-[#E2E8F0] mt-auto">
                  <span className="inline-block bg-[#0F172A] text-[#00f1fe] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                    {tag}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── CTA ── */}
      <section className="bg-[#0F172A] relative overflow-hidden py-14 md:py-16">
        <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00f1fe]/40 to-transparent hidden md:block" />
        <div className="absolute right-16 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00f1fe]/20 to-transparent hidden md:block" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-white mb-3">
              Have a design challenge?
            </h3>
            <p className="text-white/60 text-sm md:text-base">
              Talk to our embedded engineering team about your schematic, layout, firmware,
              or test requirements — we'll map out a validation plan from day one.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-[#00f1fe] text-[#0F172A] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start a Design Brief <ArrowRight size={16} />
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              View Engineering Capabilities
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}