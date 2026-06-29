import { Link } from 'react-router-dom';
import {
  Layers,
  ScanLine,
  Cpu,
  Gauge,
  Zap,
  Factory,
  CheckCircle2,
  ArrowRight,
  Wrench,
} from 'lucide-react';

// --- DATA ---
const capabilityStats = [
  { value: '1,95,500+', label: 'Combined pick & place CPH capacity' },
  { value: '01005', label: 'Fine-pitch component support' },
  { value: '10-Zone', label: 'Nitrogen-ready reflow oven' },
  { value: '3D SPI + AOI', label: 'Closed-loop inspection coverage' },
];

const processFlow = [
  { step: '01', label: 'Solder paste printing' },
  { step: '02', label: '3D SPI verification' },
  { step: '03', label: 'High-speed placement' },
  { step: '04', label: 'Nitrogen-ready reflow' },
  { step: '05', label: '3D AOI inspection' },
  { step: '06', label: 'Lab & utility support' },
];

const equipment = [
  {
    title: 'Solder Paste Printer',
    eyebrow: 'Fuji GPX-CII',
    image: '/machinery-img1.png',
    icon: Layers,
    tag: 'Paste Printing',
    summary: 'Automated solder paste and glue printing for repeatable SMT production with closed-loop SPI feedback.',
    specs: ['48×48 mm to 610×610 mm', '±0.010 mm accuracy', '6.0s cycle time'],
    details: ['Auto paste dispenser', 'Dry + wet + vacuum stencil cleaning', 'SPI closed-loop feedback'],
  },
  {
    title: '3D Solder Paste Inspection',
    eyebrow: 'Koh Young KY8080-L',
    image: '/machinery-img2.png',
    icon: ScanLine,
    tag: '3D Inspection',
    summary: 'Inline 3D SPI with real-time printer feedback loop and full statistical process control integration.',
    specs: ['50×50 mm to 510×510 mm', '15 µm X/Y resolution', '<1% measurement accuracy'],
    details: ['Shadow-free multi-angle inspection', '4M B/W digital camera array', 'KSMART LINK integration'],
  },
  {
    title: 'Pick and Place Machine',
    eyebrow: 'Fuji AIMEX IIIc',
    image: '/machinery-img3.png',
    icon: Cpu,
    tag: 'High-Speed SMT',
    summary: 'Dual-robot, dual-module platform engineered for maximum throughput on high-mix production lines.',
    specs: ['1,03,000 CPH output', '48×48 mm to 508×400 mm', '0.025 mm placement accuracy'],
    details: ['01005 / 0201 support', 'Intelligent smart feeders', 'Built-in auto calibration'],
  },
  {
    title: 'Pick and Place Machine',
    eyebrow: 'Panasonic NPM-D3A',
    image: '/machinery-img4.png',
    icon: Gauge,
    tag: 'Fine-Pitch SMT',
    summary: 'High-capacity mounting system with advanced CCD vision for precision fine-pitch component placement.',
    specs: ['92,500 CPH output', '50×50 mm to 510×590 mm', '0.025 mm placement accuracy'],
    details: ['01005 chip support', 'Smart feeder compatibility', 'CCD camera image processing'],
  },
  {
    title: 'Reflow Oven',
    eyebrow: 'JTR-1000N',
    image: '/machinery-img5.png',
    icon: Zap,
    tag: 'Nitrogen Reflow',
    summary: 'Nitrogen-atmosphere reflow oven with precision thermal profiling for lead-free and mixed-alloy assemblies.',
    specs: ['10 top/bottom heating zones', '3 active cooling zones', 'KIC-X5 9-channel profiler'],
    details: ['Automatic lubrication system', 'Board count sensor', 'Camera barcode traceability'],
  },
];

const benchmarkRows = [
  {
    metric: 'Placement Accuracy',
    values: ['±0.025 mm (Fuji)', '±0.025 mm (Panasonic)', '±0.010 mm (Printer)'],
  },
  {
    metric: 'Throughput CPH',
    values: ['1,03,000 (AIMEX IIIc)', '92,500 (NPM-D3A)', '1,95,500+ Combined'],
  },
  {
    metric: 'Inspection Type',
    values: ['3D Shadow-Free AOI', '3D SPI Inline', 'Closed-Loop SPC'],
  },
  {
    metric: 'Smallest Component',
    values: ['01005 Imperial', '0201 Metric', '±15 µm Resolution'],
  },
];

export default function InfrastructureMachineryPage() {
  return (
    <div className="bg-[#f7f9fb] font-['Inter'] min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden bg-[#0F172A]
                   min-h-[340px] sm:min-h-[380px] md:min-h-[420px]
                   flex items-center"
      >
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
          alt="SMT pick and place machinery in operation"
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
              Infrastructure &amp; Machinery
            </p>
            <h1 className="font-['JetBrains_Mono'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3 md:mb-4">
              Precision Hardware.
              <br />
              Zero Compromise.
            </h1>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-5 md:mb-6 max-w-lg">
              SriLin's SMT line in Hyderabad combines automated printing, inline 3D inspection,
              and high-speed assembly — engineered for Class 3 reliability from the ground up.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> IPC-A-610 Class 3
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> ESD S20.20 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-[#00f1fe]/30 text-[#74f5ff] text-xs font-semibold px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle2 size={14} /> ISO 13485:2016
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
            Fuji AIMEX IIIc &nbsp;•&nbsp; Panasonic NPM-D3A &nbsp;•&nbsp; Koh Young KY8080-L &nbsp;•&nbsp; JTR-1000N
          </p>
          <p className="text-[#00f1fe] font-['JetBrains_Mono'] text-xs tracking-widest text-center sm:text-right">
            SRILIN_SMT_HYD_V2
          </p>
        </div>
      </div>

      {/* ── STATS + SMT FLOW ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Capability Stats */}
          <div>
            <div className="mb-8">
              <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#00f1fe] pl-4">
                Line Capabilities
              </h2>
              <p className="text-[#44474d] mt-3">
                Key performance metrics across SriLin's fully-integrated SMT production floor.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {capabilityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-[#E2E8F0] p-5 hover:border-[#00f1fe] transition-colors duration-200"
                >
                  <p className="font-['JetBrains_Mono'] font-bold text-xl text-[#00696f] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-[#44474d] uppercase tracking-wider leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SMT Flow */}
          <div className="bg-[#0F172A] p-7 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Factory size={18} className="text-[#00f1fe]" strokeWidth={1.8} />
              <p className="font-['JetBrains_Mono'] font-semibold text-sm text-[#00f1fe] uppercase tracking-widest">
                SMT Line Flow
              </p>
            </div>
            <ol className="space-y-3">
              {processFlow.map(({ step, label }, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="font-['JetBrains_Mono'] text-[#00f1fe] text-xs font-semibold w-6 shrink-0">
                    {step}
                  </span>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="h-px flex-1 bg-white/10"
                      style={{ opacity: i === processFlow.length - 1 ? 0 : 1 }}
                    />
                  </div>
                  <span className="text-white/85 text-sm font-medium text-right">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-white/40 text-[11px] uppercase tracking-widest">
                Closed-loop &nbsp;•&nbsp; Fully automated &nbsp;•&nbsp; IPC Class 3
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── MACHINERY CARDS ── */}
      <section className="bg-[#eceef0] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-10">
            <p className="text-[#00696f] text-xs font-semibold uppercase tracking-widest mb-2">
              Equipment Overview
            </p>
            <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A] border-l-4 border-[#00f1fe] pl-4">
              Machinery on the Floor
            </h2>
            <p className="text-[#44474d] mt-3 max-w-2xl">
              Every machine in SriLin's SMT line is selected for precision, throughput, and long-term
              reliability across high-mix and high-volume production environments.
            </p>
          </div>

          <div className="space-y-6">
            {equipment.map(({ title, eyebrow, image, icon: Icon, tag, summary, specs, details }, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={title + eyebrow}
                  className="group bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#00f1fe] hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Image */}
                  <div
                    className={`lg:col-span-4 h-52 lg:h-auto bg-[#0F172A] overflow-hidden ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`lg:col-span-8 p-7 md:p-10 flex flex-col gap-5 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[#00696f] text-[10px] font-semibold uppercase tracking-widest mb-1">
                          {eyebrow}
                        </p>
                        <h3 className="font-['JetBrains_Mono'] font-bold text-xl md:text-2xl text-[#0F172A] leading-snug">
                          {title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#eceef0] text-[#0F172A] group-hover:bg-[#00f1fe]/10 group-hover:text-[#00696f] transition-colors">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                    </div>

                    <p className="text-sm text-[#44474d] leading-relaxed">{summary}</p>

                    {/* Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {specs.map((spec) => (
                        <div
                          key={spec}
                          className="bg-[#f7f9fb] border border-[#E2E8F0] px-3 py-2.5"
                        >
                          <p className="font-['JetBrains_Mono'] text-xs font-semibold text-[#0F172A]">
                            {spec}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Details + Tag */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-1 border-t border-[#E2E8F0]">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                        {details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm text-[#44474d]">
                            <CheckCircle2 size={13} className="text-[#00696f] shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-block bg-[#0F172A] text-[#00f1fe] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 shrink-0">
                        {tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENCHMARK TABLE ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-[#00696f] text-xs font-semibold uppercase tracking-widest mb-2">
            Technical Benchmarks
          </p>
          <h2 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-[#0F172A]">
            Machine Performance at a Glance
          </h2>
        </div>

        <div className="overflow-x-auto bg-white border border-[#E2E8F0]">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead>
              <tr className="bg-[#0F172A] text-white uppercase text-xs">
                <th className="p-4 font-semibold">Metric</th>
                <th className="p-4 font-semibold">Fuji AIMEX IIIc</th>
                <th className="p-4 font-semibold">Panasonic NPM-D3A</th>
                <th className="p-4 font-semibold">Koh Young / Fuji Printer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {benchmarkRows.map((row, i) => (
                <tr key={row.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fb]'}>
                  <td className="p-4 font-semibold text-[#0F172A] whitespace-nowrap">
                    {row.metric}
                  </td>
                  {row.values.map((v, idx) => (
                    <td key={idx} className="p-4 text-[#44474d] whitespace-nowrap font-['JetBrains_Mono'] text-xs">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0F172A] relative overflow-hidden py-14 md:py-16">
        <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00f1fe]/40 to-transparent hidden md:block" />
        <div className="absolute right-16 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00f1fe]/20 to-transparent hidden md:block" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="font-['JetBrains_Mono'] font-bold text-2xl md:text-3xl text-white mb-3">
              Want a facility walkthrough?
            </h3>
            <p className="text-white/60 text-sm md:text-base">
              Our engineering team can walk you through machine capabilities, line throughput,
              and compliance readiness for your specific assembly requirements.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-[#00f1fe] text-[#0F172A] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Schedule a Site Visit <ArrowRight size={16} />
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Download Equipment Specs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}