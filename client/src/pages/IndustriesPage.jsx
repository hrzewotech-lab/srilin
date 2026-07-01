import { Link } from 'react-router-dom';
import {
  Factory,
  MapPin,
  Cpu,
  Sparkles,
  Zap,
  Building2,
  Layers3,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const industries = [
  {
    name: 'Automotive',
    icon: Factory,
    description:
      'EV battery management, ADAS sensor suites, and infotainment assembly. Compliant with IATF 16949 quality management standards.',
    tag: 'Zero-Defect Goal',
  },
  {
    name: 'Aviation, Space & Defence',
    icon: MapPin,
    description:
      'High-reliability PCBA for avionics, flight control systems, and engine management. Strict adherence to AS9100D and vibration-resistance specs.',
    tag: 'NADCAP Accredited',
  },
  {
    name: 'IT Hardware & Consumer Electronics',
    icon: Cpu,
    description:
      'High-mix, high-volume SMT assembly for computing peripherals and consumer-grade devices, balancing speed with quality control.',
    tag: 'High-Mix Capable',
  },
  {
    name: 'Telecom',
    icon: Sparkles,
    description:
      'Next-gen 5G infrastructure, satellite comms, and base station assemblies. Specialized in high-frequency RF substrate handling.',
    tag: 'RF Optimization',
  },
  {
    name: 'Electric Vehicles',
    icon: Zap,
    description:
      'Battery pack electronics, charging infrastructure, and power control modules engineered for thermal stress and high-current reliability.',
    tag: 'Thermal-Rated',
  },
  {
    name: 'Railways',
    icon: Building2,
    description:
      'Signaling systems, onboard control units, and rolling stock electronics built to meet long-lifecycle and harsh-environment standards.',
    tag: 'EN 50155 Aligned',
  },
  {
    name: 'AI, IoT & Automation',
    icon: Layers3,
    description:
      'Rapid prototyping for edge computing nodes, AI accelerators, and industrial IoT sensors with complex chip-on-board requirements.',
    tag: 'Rapid Scale-Up',
  },
  {
    name: 'Medical Devices',
    icon: ShieldCheck,
    description:
      'Life-saving diagnostic equipment and surgical robotics. Clean-room SMT lines certified to ISO 13485 with full traceability.',
    tag: 'Traceability V4.0',
  },
];

const benchmarkRows = [
  {
    metric: 'IPC Standard',
    values: ['Class 3 (Critical)', 'Class 2/3 (Life-critical)', 'Class 2 (Dedicated)'],
  },
  {
    metric: 'AOI Frequency',
    values: ['100% Post-Reflow', '100% Multi-Stage', 'Batch Statistical'],
  },
  {
    metric: 'Cleanliness',
    values: ['Ionic Contam. Test', 'Class 10k Cleanroom', 'Standard ESD-Safe'],
  },
  {
    metric: 'Traceability',
    values: ['Individual Serial', 'Lot & Comp. Level', 'Batch ID Track'],
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">
      {/* HERO */}
      <section
        className="relative w-full overflow-hidden bg-[#0F172A]
                   min-h-[340px] sm:min-h-[380px] md:min-h-[420px]
                   flex items-center"
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
          alt="Precision circuit board manufacturing"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlays for legibility */}
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
              Market Verticals
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Global Precision.
              <br />
              Industry Standards.
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              Providing mission-critical EMS and ESDM services across sectors where
              reliability isn't just an option — it's the foundation of every circuit.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#166b7f]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> AS9100D Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#166b7f]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> IATF 16949
              </span>
            </div>
          </div>
        </div>

        {/* Bottom edge accent line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#166b7f]/60 via-[#166b7f]/10 to-transparent" />
      </section>

      {/* SPEC STRIP */}
      <div className="bg-[#0F172A] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/50 text-[10px] sm:text-[11px] tracking-wide text-center sm:text-left">
            ISO 13485:2016 &nbsp;•&nbsp; IPC-A-610 CLASS 3 &nbsp;•&nbsp; MIL-PRF-31032 &nbsp;•&nbsp; ESD S20.20
          </p>
          <p className="text-[#166b7f] font-['JetBrains_Mono'] text-xs tracking-widest text-center sm:text-right">
            SRILIN_SPEC_99.9
          </p>
        </div>
      </div>

      {/* INDUSTRY CARDS */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="mb-10">
          <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#166b7f] pl-4">
            Specialized EMS Solutions
          </h2>
          <p className="text-[#44474d] mt-3 max-w-2xl">
            Our technical clean-room environments are optimized for the specific
            regulatory and performance demands of eight core global industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map(({ name, icon: Icon, description, tag }) => (
            <div
              key={name}
              className="group bg-white border border-[#E2E8F0] p-6 flex flex-col gap-4 hover:border-[#166b7f] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-[#eceef0] text-[#0F172A] group-hover:bg-[#166b7f]/10 group-hover:text-[#00696f] transition-colors">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-['JetBrains_Mono'] font-semibold text-lg text-[#0F172A] mb-2 leading-snug">
                  {name}
                </h3>
                <p className="text-sm text-[#44474d] leading-relaxed">{description}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
                <span className="inline-block bg-[#0F172A] text-[#166b7f] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1">
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENCHMARK TABLE */}
      <section className="bg-[#eceef0] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="text-[#00696f] text-xs font-semibold uppercase tracking-widest mb-2">
              The Manufacturing Edge
            </p>
            <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A]">
              Clinical Standards Benchmarks
            </h2>
          </div>

          <div className="overflow-x-auto bg-white border border-[#E2E8F0]">
            <table className="w-full text-left text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[#0F172A] text-white uppercase text-xs">
                  <th className="p-4 font-semibold">Metric Category</th>
                  <th className="p-4 font-semibold">Aviation / Defense</th>
                  <th className="p-4 font-semibold">Medical Grade</th>
                  <th className="p-4 font-semibold">Industrial IoT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {benchmarkRows.map((row, i) => (
                  <tr key={row.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fb]'}>
                    <td className="p-4 font-semibold text-[#0F172A] whitespace-nowrap">
                      {row.metric}
                    </td>
                    {row.values.map((v, idx) => (
                      <td key={idx} className="p-4 text-[#44474d] whitespace-nowrap">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
              Ready for a technical deep-dive?
            </h3>
            <p className="text-white/60 text-sm md:text-base">
              Connect with our engineering team to review your BOM and industry-specific
              compliance requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-[#166b7f] text-[#0F172A] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Request Technical Quote <ArrowRight size={16} />
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Download Capability Matrix
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}