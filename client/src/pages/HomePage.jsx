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

const coreServices = [
  'Embedded Design',
  'SMT Mounting',
  'Product Integration',
  'Testing',
  'Box Build',
  'Supply Chain Management',
];

const defaultClientNames = [
  'Aerospace OEMs',
  'Automation Teams',
  'EV Suppliers',
  'Industrial Brands',
  'IoT Innovators',
];

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
        const list = Array.isArray(res?.data?.clients) ? res.data.clients : [];
        setClients(list.filter((client) => client && client.isActive !== false));
      } catch (error) {
        console.error('Failed to load clients', error);
      }
    };

    const loadServices = async () => {
      try {
        const res = await api.get('/services');
        const list = Array.isArray(res?.data?.services) ? res.data.services : [];
        setServices(list.filter((service) => service && service.isActive !== false).slice(0, 8));
      } catch (error) {
        console.error('Failed to load services', error);
      }
    };

    loadClients();
    loadServices();
  }, []);

  const logoClients = clients.filter((c) => c?.logo?.url).length
    ? clients.filter((c) => c?.logo?.url)
    : defaultClientNames.map((companyName) => ({ companyName, logo: { url: '/image.png' } }));

  const rowA = [...logoClients, ...logoClients];
  const rowB = [...logoClients.slice().reverse(), ...logoClients.slice().reverse()];

  return (
    <div className="home-page bg-[#f7f9fb] font-['Inter'] min-h-screen overflow-x-hidden pb-16">
      <HeroCarousel />

      {/* ABOUT COMPANY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          <div className="relative overflow-hidden border border-[#E2E8F0] bg-[#0F172A]">
            <img
              src="/about-us2.png"
              alt="SriLin electronics manufacturing facility"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              className="w-full h-64 sm:h-80 lg:h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-[#0F172A]/90 text-white text-xs sm:text-sm font-['JetBrains_Mono'] px-3 py-2 border border-white/10">
              <Building2 size={16} className="text-[#00f1fe]" /> E-City EMC, Hyderabad
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[#00696f] text-xs font-bold uppercase tracking-widest">About Company</p>
            <h2 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] leading-tight">
              Srilin Electronics Private Limited
            </h2>
            <p className="text-[#334155] text-base sm:text-lg leading-relaxed">
              Srilin Electronics Pvt Ltd is an ISO9001:2015, AS9100D, ANSI ESD S20.20 2021 & IEC 61340 5.1
              certified premier electronics system design and manufacturing services company located in
              E-City EMC, Hyderabad. Our one-stop electronics manufacturing services factory integrates
              quick prototyping, mid-range production, and high-volume manufacturing with disciplined
              execution.
            </p>
            <p className="text-[#334155] text-base sm:text-lg leading-relaxed">
              We provide embedded design, SMT mounting, product integration, testing, box build, and
              comprehensive supply chain support to help clients scale with confidence and production
              flexibility.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                to="/about-company"
                className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-5 sm:px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Discover SriLin <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 border border-[#75777e] text-[#0F172A] px-5 sm:px-6 py-3 text-sm font-semibold hover:bg-[#eceef0] transition-colors"
              >
                Talk to our team
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mt-4" aria-label="Srilin certifications">
              {certificationBadges.map((certification) => (
                <span
                  key={certification}
                  className="inline-flex items-center gap-1.5 border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-[#334155]"
                >
                  <ShieldCheck size={14} className="text-[#00696f]" />
                  {certification}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 md:mt-14">
          {aboutStats.map((stat) => (
            <article key={stat.label} className="border border-[#E2E8F0] bg-white p-4 sm:p-5">
              <strong className="block font-['JetBrains_Mono'] text-xl sm:text-2xl text-[#0F172A]">
                {stat.value}
              </strong>
              <span className="mt-1 block text-xs sm:text-sm text-[#44474d]">{stat.label}</span>
            </article>
          ))}
        </div>

        {/* Core services panel */}
        <div className="mt-6 flex flex-col gap-5 border border-[#E2E8F0] bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Core EMS Services</p>
            <h3 className="mt-2 font-['JetBrains_Mono'] font-semibold text-lg sm:text-xl text-[#0F172A]">
              One-stop electronics manufacturing support from design to box build.
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {coreServices.map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-1.5 border border-[#E2E8F0] bg-[#f7f9fb] px-3 py-1.5 text-xs sm:text-sm font-medium text-[#334155]"
              >
                {service === 'SMT Mounting' || service === 'Embedded Design' ? (
                  <Cpu size={14} className="text-[#00696f]" />
                ) : (
                  <Factory size={14} className="text-[#00696f]" />
                )}
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* About highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6">
          {aboutHighlights.map(({ icon: Icon, title, meta, text }) => (
            <article key={title} className="border border-[#E2E8F0] bg-white p-5 sm:p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center bg-[#eceef0] text-[#00696f] mb-3">
                <Icon size={20} />
              </span>
              <h4 className="font-['JetBrains_Mono'] font-semibold text-base sm:text-lg text-[#0F172A]">
                {title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-[#00696f]">{meta}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#334155]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TRUSTED CLIENTS MARQUEE */}
      <section className="bg-[#eceef0] py-12 md:py-16 border-y border-[#E2E8F0] overflow-hidden">
        <p className="text-center text-[#00696f] text-xs font-bold uppercase tracking-widest mb-6 px-4">
          Trusted by Leading Companies
        </p>
        <div className="space-y-4">
          <div className="flex gap-6 sm:gap-10 animate-[marquee-left_30s_linear_infinite] w-max">
            {rowA.map((client, index) => (
              <div
                key={`${client.companyName}-${index}`}
                className="flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 bg-white border border-[#E2E8F0] shrink-0"
              >
                {client.logo?.url && (
                  <img
                    src={client.logo.url}
                    alt={client.companyName}
                    className="max-h-8 sm:max-h-10 max-w-[80%] object-contain"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-6 sm:gap-10 animate-[marquee-right_30s_linear_infinite] w-max">
            {rowB.map((client, index) => (
              <div
                key={`${client.companyName}-rev-${index}`}
                className="flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 bg-white border border-[#E2E8F0] shrink-0"
              >
                {client.logo?.url && (
                  <img
                    src={client.logo.url}
                    alt={client.companyName}
                    className="max-h-8 sm:max-h-10 max-w-[80%] object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        `}</style>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Why Choose SriLin</p>
          <h2 className="mt-2 font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl text-[#0F172A] leading-tight">
            Built for electronics teams that need precision, speed, and accountability.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8 md:mt-10">
          {whyChoose.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="border border-[#E2E8F0] bg-white p-6 hover:border-[#00f1fe] transition-colors duration-300"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center bg-[#eceef0] text-[#0F172A]">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-['JetBrains_Mono'] font-semibold text-lg sm:text-xl text-[#0F172A]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#334155]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <p className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Featured Services</p>
            <h2 className="mt-2 font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl text-[#0F172A] leading-tight max-w-2xl">
              Explore our top service capabilities with fast access to the full services page.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#00696f] font-['JetBrains_Mono'] font-semibold text-sm shrink-0 hover:gap-3 transition-all"
          >
            View all services <ArrowRight size={16} />
          </Link>
        </div>

        {services.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {services.map((service) => {
              if (!service) return null;
              return (
                <article
                  key={service._id}
                  className="group border border-[#E2E8F0] bg-white overflow-hidden hover:border-[#00f1fe] transition-colors duration-300"
                >
                  <div className="h-36 sm:h-40 overflow-hidden bg-[#eceef0]">
                    <img
                      src={service.image?.url || '/image.png'}
                      alt={service.title || 'Service'}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/image.png';
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-['JetBrains_Mono'] font-semibold text-sm sm:text-base text-[#0F172A] leading-snug">
                      {service.title || 'Untitled service'}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#E2E8F0] p-10 text-center text-[#44474d]">
            No featured services available right now.
          </div>
        )}
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#0F172A] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-2xl">
            <p className="text-[#00f1fe] text-xs font-bold uppercase tracking-widest">Industries Served</p>
            <h2 className="mt-2 font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl text-white leading-tight">
              Flexible electronics capability for modern industrial and product ecosystems.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 md:mt-10">
            {industries.map(([industry, Icon]) => (
              <article
                key={industry}
                className="flex flex-col items-start gap-3 border border-white/10 bg-white/5 p-4 sm:p-5 hover:border-[#00f1fe]/50 transition-colors"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center bg-white/10 text-[#00f1fe]">
                  <Icon size={20} />
                </span>
                <span className="text-white text-sm font-medium leading-snug">{industry}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CertificateCarousel />

      {/* PREMIUM STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Performance metrics</p>
          <h2 className="mt-2 font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl text-[#0F172A] leading-tight">
            Premium operational numbers that demonstrate reliability, speed, and quality.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 md:mt-10">
          {premiumStats.map((stat) => (
            <article key={stat.label} className="border border-[#E2E8F0] bg-white p-5 sm:p-6 text-center">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#00696f]">
                {stat.label}
              </span>
              <strong className="block font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl text-[#0F172A] mt-2">
                {stat.value}
              </strong>
              <p className="mt-2 text-sm text-[#334155] leading-relaxed">{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#eceef0] py-16 md:py-24 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#00696f] text-xs font-bold uppercase tracking-widest">Client Testimonials</p>
            <h2 className="mt-2 font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl text-[#0F172A] leading-tight">
              Clear communication, dependable execution, and production-aware support.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-8 md:mt-10">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="border border-[#E2E8F0] bg-white p-6 sm:p-8">
                <Quote size={26} className="text-[#00696f]" />
                <p className="mt-4 text-base leading-relaxed text-[#334155]">{testimonial.quote}</p>
                <div className="mt-5">
                  <strong className="block font-['JetBrains_Mono'] text-[#0F172A]">{testimonial.name}</strong>
                  <span className="mt-1 block text-sm text-[#44474d]">{testimonial.company}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-20">
        <div className="bg-[#0F172A] border border-white/10 px-6 sm:px-10 py-10 sm:py-14 flex flex-col items-center text-center gap-5">
          <Sparkles size={26} className="text-[#00f1fe]" />
          <h2 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight max-w-2xl">
            Ready to discuss your next electronics requirement?
          </h2>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 bg-[#00f1fe] text-[#0F172A] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Contact SriLin <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}