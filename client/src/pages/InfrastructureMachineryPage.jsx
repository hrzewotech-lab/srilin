import { ArrowRight, CheckCircle2, Cpu, Factory, Gauge, Layers, ScanLine, Wrench, Zap } from 'lucide-react';

// --- DATA DEFINITIONS ---
const capabilityStats = [
  { value: '1,95,500+', label: 'Combined pick and place CPH capacity' },
  { value: '01005', label: 'Fine pitch component support' },
  { value: '10 zone', label: 'Nitrogen-ready reflow capability' },
  { value: '3D SPI + AOI', label: 'Closed-loop inspection coverage' },
];

const processFlow = [
  'Solder paste printing',
  '3D SPI verification',
  'High-speed placement',
  'Nitrogen-ready reflow',
  '3D AOI inspection',
  'Lab and utility support',
];

const equipment = [
  {
    title: 'Solder Paste Printer',
    eyebrow: 'Fuji GPX-CII',
    image: '/machinery-img1.png',
    icon: Layers,
    summary: 'Automated solder paste and glue printing for repeatable SMT production.',
    specs: ['48 x 48 mm to 610 x 610 mm', '+/- 0.010 mm accuracy', '6.0s cycle time'],
    details: ['Auto Paste Dispenser', 'Dry + wet + vacuum stencil cleaning', 'SPI closed-loop'],
  },
  {
    title: '3D Solder Paste Inspection',
    eyebrow: 'Koh Young KY8080-L',
    image: '/machinery-img2.png',
    icon: ScanLine,
    summary: 'Inline 3D SPI with printer closed-loop feedback and SPC.',
    specs: ['50 x 50 mm to 510 x 510 mm', '15 um X/Y resolution', '< 1% measurement accuracy'],
    details: ['Shadow-free inspection', '4M B/W digital camera', 'KSMART LINK'],
  },
  {
    title: 'Pick and Place Machines',
    eyebrow: 'Fuji AIMEX IIIc',
    image: '/machinery-img3.png',
    icon: Cpu,
    summary: 'Two-robot, two-module platform for high-speed output.',
    specs: ['1,03,000 CPH', '48 x 48 mm to 508 x 400 mm', '0.025 mm accuracy'],
    details: ['Supports 01005/0201', 'Intelligent smart feeders', 'Built-in auto calibration'],
  },
  {
    title: 'Pick and Place Machine',
    eyebrow: 'Panasonic NPM-D3A',
    image: '/machinery-img4.png',
    icon: Gauge,
    summary: 'High-capacity mounting system for fine pitch placement.',
    specs: ['92,500 CPH', '50 x 50 mm to 510 x 590 mm', '0.025 mm accuracy'],
    details: ['01005 support', 'Smart feeders', 'CCD camera image processing'],
  },
  {
    title: 'Reflow Oven',
    eyebrow: 'JTR-1000N',
    image: '/machinery-img5.png',
    icon: Zap,
    summary: 'Nitrogen-ready reflow with thermal profiling.',
    specs: ['10 top/bottom heating zones', '3 cooling zones', 'KIC-X5 9-channel profiler'],
    details: ['Automatic lubrication', 'Board count sensor', 'Camera barcode reader'],
  },
];

// --- MAIN COMPONENT ---
export default function InfrastructureMachineryPage() {
  return (
    <section className="bg-slate-50 py-16 px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Infrastructure & Machinery</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            PCB manufacturing facilities in Hyderabad, India.
          </h1>
          <p className="text-lg text-slate-600">
            SriLin's SMT infrastructure brings together automated printing, 3D inspection, and high-speed assembly.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Factory className="text-blue-600" /> SMT line flow</h2>
          <ol className="space-y-4">
            {processFlow.map((step, index) => (
              <li key={step} className="flex items-center gap-4 text-slate-700 font-medium">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Capabilities Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {capabilityStats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Alternating Machinery Stack */}
      <div id="machinery" className="max-w-7xl mx-auto space-y-12">
        {equipment.map((item, index) => {
          const Icon = item.icon;
          const isEven = index % 2 === 0;

          return (
            <div key={item.title} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden grid lg:grid-cols-12">
              {/* Image Container */}
              <div className={`lg:col-span-4 h-64 lg:h-auto bg-slate-200 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* Content Container */}
              <div className={`lg:col-span-8 p-8 md:p-12 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">{item.eyebrow}</span>
                  <Icon size={20} className="text-slate-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{item.title}</h2>
                <p className="text-slate-600 mb-8">{item.summary}</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {item.specs.map((spec) => (
                    <div key={spec} className="bg-slate-50 p-3 rounded-lg text-xs font-semibold text-slate-700">
                      {spec}
                    </div>
                  ))}
                </div>
                
                <ul className="grid md:grid-cols-2 gap-3">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle2 size={14} className="text-green-500" />
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}