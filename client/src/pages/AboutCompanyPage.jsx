import { BadgeCheck, Building2, Cpu, Factory, MapPin, ShieldCheck, Smile, TrendingUp } from 'lucide-react';

const aboutStats = [
  { value: '2017', label: 'Established' },
  { value: '25,000', label: 'Sqft current facility' },
  { value: '214,000', label: 'Sqft expansion space' },
  { value: 'ISO-8', label: 'Cleanroom class' },
];

const certificationBadges = ['ISO9001:2015', 'AS9100D', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1'];

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
    <section className="about-company-page">
      <div className="about-company-hero">
        <div className="about-company-media">
          <div className="about-company-visual">
            <img src="/about-us2.png" alt="SriLin electronics manufacturing services graphic" />
            <div className="about-company-badge">
              <Building2 size={20} />
              <span>E-City EMC, Hyderabad</span>
            </div>
          </div>
        </div>
        <div className="about-company-copy">
          <p className="public-eyebrow">About Company</p>
          <h1>Srilin Electronics Private Limited</h1>
          <p>
            Srilin Electronics Pvt Ltd is an ISO9001:2015, AS9100D, ANSI ESD S20.20 2021 & IEC 61340 5.1 certified Premier Electronics System Design & Manufacturing Services (ESDM/EMS) company located in E-city EMC (Formerly Fabcity), Hyderabad, India. The company was established in 2017 to help the developing interest of Electronic Assembling in India. Our one-stop-solution electronics manufacturing services (EMS) factory incorporates quick prototyping, mid-range volume production to high volume production.
          </p>
          <p>
            We provide Embedded Design, SMT Mounting, Product Integration, Testing & Box Build services. Our products are manufactured using Robust and advanced SMT machinery in Class 100000 (ISO-8) Cleanroom to meet worldwide quality standards. We also provide comprehensive supply chain management. We offer our services to a wide range of customers for their product development and support them in manufacturing scalability and production flexibility. SRILIN has been the preferred value partner for its clients through innovative and efficient electronic system assembly.
          </p>
          <div className="about-cert-list" aria-label="Srilin certifications">
            {certificationBadges.map((certification) => (
              <span key={certification}>
                <ShieldCheck size={16} />
                {certification}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="about-data-section">
        <div className="about-stat-grid">
          {aboutStats.map((stat) => (
            <article className="about-stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
        <div className="about-service-panel">
          <div>
            <p className="section-kicker">Core EMS Services</p>
            <h2>One-stop electronics manufacturing support from design to box build.</h2>
          </div>
          <div className="about-service-list">
            {aboutServices.map((service) => (
              <span key={service}>
                {service === 'SMT Mounting' || service === 'Embedded Design' ? <Cpu size={17} /> : <Factory size={17} />}
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="about-why-section">
        <div className="section-heading centered">
          <p className="section-kicker">Why Choose Srilin</p>
          <h2>Reliable manufacturing capability with strategic scale and quality discipline.</h2>
        </div>
        <div className="about-highlight-grid">
          {aboutHighlights.map(({ icon: Icon, title, text }) => (
            <article className="about-highlight-card" key={title}>
              <span><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
