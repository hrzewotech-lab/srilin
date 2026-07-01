import {
  BadgeCheck,
  Building2,
  CheckCircle2 as CheckCircleIcon,
  Cpu,
  Factory,
  MapPin,
  ShieldCheck,
  Smile,
  TrendingUp,
} from 'lucide-react';

const aboutStats = [
  { value: '2017', label: 'Established', icon: BadgeCheck },
  { value: '25,000', label: 'Sqft current facility', icon: Building2 },
  { value: '214,000', label: 'Sqft expansion space', icon: TrendingUp },
  { value: '18+', label: 'Years in EMS', icon: ShieldCheck },
];

const featuredStat = {
  value: 'ISO-8',
  label: 'Cleanroom class',
  description:
    'Class 100000 manufacturing in a certified ESD-safe cleanroom with aerospace and defence traceability.',
  icon: ShieldCheck,
};

const certificationBadges = [
  'ISO9001:2015',
  'AS9100D',
  'ANSI ESD S20.20 2021',
  'IEC 61340 5.1',
];

const aboutServices = [
  'Embedded Design',
  'SMT Mounting',
  'Product Integration',
  'Testing',
  'Box Build',
  'Supply Chain Management',
];

const aboutHighlights = [
  {
    icon: MapPin,
    title: 'Strategic Location',
    meta: '15 minutes from airport cargo terminal',
    text: "Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal. The facility sits in Hyderabad's southern manufacturing corridor, one of India's primary hubs for aerospace and defence electronics production.",
  },
  {
    icon: ShieldCheck,
    title: 'High Reliability Specialist',
    meta: 'Aerospace, defence, automotive and more',
    text: 'AS9100D certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics. Srilin operates in sectors where product failure carries critical consequences. Every board is traceable from component to shipment.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    meta: '8x expansion footprint on same campus',
    text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility. 8x the current footprint on the same campus. No greenfield construction required. Dedicated production clusters can be established for strategic partners.',
  },
  {
    icon: Smile,
    title: 'Customer Satisfaction',
    meta: 'Flexible volumes and account ownership',
    text: 'Dedicated account management, quick prototyping, and flexible production volumes tailored to your exact requirements.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality First Approach',
    meta: '3D SPI, 3D AOI and X-ray systems',
    text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems. Mounter accuracy 0.025mm, CpK >= 1.00 (3 sigma).',
  },
];

export default function AboutCompanyPage() {
  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center">
        <img
          src="/about-us2.png"
          alt="SriLin electronics manufacturing services graphic"
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
          <div className="max-w-2xl border-l-2 border-[#166b7f] pl-5 md:pl-6">
            <p className="text-[#166b7f] text-xs font-semibold uppercase tracking-widest mb-3 md:mb-4">
              About Company
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Srilin Electronics Private Limited
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              Premier ESDM/EMS services with certified quality systems, scalable production,
              and reliable manufacturing support from design to box build.
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#166b7f]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircleIcon />
                ISO & AS9 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#166b7f]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <Building2 size={13} />
                E-City EMC, Hyderabad
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#166b7f]/60 via-[#166b7f]/10 to-transparent" />
      </section>

      {/* INTRO + CERTS */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          <div className="lg:col-span-2">
            <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#166b7f] pl-4">
              About Srilin
            </h2>
            <p className="text-[#44474d] mt-4 leading-relaxed">
              Srilin Electronics Pvt Ltd is an ISO9001:2015, AS9100D, ANSI ESD S20.20 2021 &
              IEC 61340 5.1 certified Premier Electronics System Design & Manufacturing Services
              (ESDM/EMS) company located in E-city EMC (Formerly Fabcity), Hyderabad, India.
              Established in 2017, we support quick prototyping, mid-volume production, and
              high-volume manufacturing.
            </p>
            <p className="text-[#44474d] mt-4 leading-relaxed">
              We provide Embedded Design, SMT Mounting, Product Integration, Testing, Box Build,
              and Supply Chain Management services. Our products are manufactured using robust SMT
              machinery in a Class 100000 (ISO-8) cleanroom to meet worldwide quality standards.
            </p>

            <div className="mt-6 flex flex-wrap gap-3" aria-label="Srilin certifications">
              {certificationBadges.map((certification) => (
                <span
                  key={certification}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#E2E8F0] text-sm text-[#0F172A] shadow-sm"
                >
                  <ShieldCheck size={16} className="text-[#0F172A]" />
                  <span className="font-semibold">{certification}</span>
                </span>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            <img
              src="/about-us2.png"
              alt="Srilin electronics manufacturing facility"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#eceef0] text-[#0F172A]">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] uppercase tracking-widest">Location</p>
                  <p className="font-semibold text-sm text-[#0F172A]">E-City EMC, Hyderabad</p>
                </div>
              </div>
              <p className="text-sm text-[#44474d] leading-relaxed">
                15 minutes from Rajiv Gandhi International Airport and cargo terminal. Positioned in
                Hyderabad&apos;s manufacturing corridor for aerospace and defence electronics.
              </p>
            </div>
          </aside>
        </div>

        {/* STATS + SERVICES */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] mb-16">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <article
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#166b7f] hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <strong className="block text-2xl font-['JetBrains_Mono'] text-[#0F172A] leading-tight">
                          {stat.value}
                        </strong>
                        <span className="mt-2 block text-sm text-[#64748b] leading-snug">
                          {stat.label}
                        </span>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ecfeff] text-[#0F766E] shadow-sm">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
              <img
                src="/about-us2.png"
                alt="Srilin electronics manufacturing facility"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <article className="rounded-3xl border border-[#E2E8F0] bg-[#f8fafc] p-6 shadow-sm">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#94A3B8]">
                    Featured Stat
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-[#0F172A]">
                    <strong className="text-5xl font-['JetBrains_Mono'] leading-none">
                      {featuredStat.value}
                    </strong>
                    <div className="rounded-2xl bg-[#ecfeff] p-3 text-[#0F766E] shadow-sm">
                      {(() => {
                        const FeaturedIcon = featuredStat.icon;
                        return <FeaturedIcon size={24} strokeWidth={1.8} />;
                      })()}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-[#475569]">{featuredStat.label}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#475569]">
                {featuredStat.description}
              </p>
            </article>

            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">
                  Core EMS Services
                </p>
                <h3 className="font-['JetBrains_Mono'] font-semibold text-lg text-[#0F172A] mb-4 leading-snug">
                  One-stop electronics manufacturing support from design to box build.
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {aboutServices.map((service) => (
                    <span
                      key={service}
                      className="flex items-center gap-3 px-3 py-2 border border-[#E2E8F0] bg-[#f7f9fb] text-sm text-[#0F172A]"
                    >
                      <span className="w-8 h-8 flex items-center justify-center bg-[#eceef0] text-[#0F172A] shrink-0">
                        {service === 'SMT Mounting' || service === 'Embedded Design' ? (
                          <Cpu size={16} />
                        ) : (
                          <Factory size={16} />
                        )}
                      </span>
                      <span>{service}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
              Why Choose Srilin
            </p>
            <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] mt-2">
              Reliable manufacturing capability with strategic scale and quality discipline.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutHighlights.map(({ icon: Icon, title, meta, text }) => (
              <article
                key={title}
                className="group bg-white border border-[#E2E8F0] p-6 flex flex-col gap-4 hover:border-[#166b7f] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 flex items-center justify-center bg-[#eceef0] text-[#0F172A] group-hover:bg-[#166b7f]/10 group-hover:text-[#00696f] transition-colors shrink-0">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-['JetBrains_Mono'] font-semibold text-base text-[#0F172A] leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-1">{meta}</p>
                  </div>
                </div>
                <p className="text-sm text-[#44474d] leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0F172A] relative overflow-hidden py-14 md:py-16">
        <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#166b7f]/40 to-transparent hidden md:block" />
        <div className="absolute right-16 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#166b7f]/20 to-transparent hidden md:block" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-white mb-3">
              Interested in partnering or visiting?
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Contact our sales and operations team to discuss capacity, audits, or a plant tour.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="mailto:info@srilinelectronics.com"
              className="inline-flex items-center justify-center gap-2 bg-[#166b7f] text-[#0F172A] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Building2 size={15} />
              Contact Sales
            </a>
            <a
              href="/careers"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              View Careers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}