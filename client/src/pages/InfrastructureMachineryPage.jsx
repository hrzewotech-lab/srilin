import { ArrowRight, CheckCircle2, Cpu, Factory, Gauge, Layers, ScanLine, Wrench, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    summary:
      'Automated solder paste and glue printing for repeatable SMT production with closed-loop process control.',
    specs: ['48 x 48 mm to 610 x 610 mm panel size', '+/- 0.010 mm alignment accuracy, 6 sigma [CpK >= 2.0]', '6.0 second cycle time including loading, mark reading, alignment, and unloading'],
    details: [
      'Auto Paste Dispenser JAR type with solder roll diameter check function',
      'Dry + wet + vacuum stencil cleaning',
      'SPI closed-loop function',
      'Local verifier with handy barcode scanner',
      'Automatic width adjustment',
    ],
  },
  {
    title: '3D Solder Paste Inspection',
    eyebrow: 'Koh Young KY8080-L inline 3D SPI',
    image: '/machinery-img2.png',
    icon: ScanLine,
    summary:
      'Inline 3D SPI with printer closed-loop feedback, barcode reading, warp compensation, and statistical process control.',
    specs: ['50 x 50 mm to 510 x 510 mm PCB size', '15 um X/Y resolution with 0.37 um Z resolution', '< 1% measurement accuracy on calibration target'],
    details: [
      'Detects insufficient paste, excessive paste, missing paste, bridging, shape deformity, displacement, volume, height, XY position, and area',
      'Koh Young proprietary light projection unit for shadow-free inspection',
      '4M B/W digital camera',
      'SPC Plus software',
      'No PCB color sensitivity',
      'Supports minimum paste deposit up to 3.94 mils',
      'KSMART LINK closed-loop feedback from AOI to SPI',
    ],
  },
  {
    title: 'Pick and Place Machines',
    eyebrow: 'Fuji AIMEX IIIc',
    image: '/machinery-img3.png',
    icon: Cpu,
    summary:
      'Two-robot, two-module placement platform with high-speed output and broad component mounting capability.',
    specs: ['1,03,000 CPH capacity', '48 x 48 mm to 508 x 400 mm PCB handling', '0.025 mm mounter accuracy, Cpk >= 1.00 (3 sigma)'],
    details: [
      'PBGA, FBGA, Micro-BGA, CSP, ultra-fine pitch QFP, and QFN mounting',
      'Supports fine pitch components including 01005 and 0201',
      'Intelligent smart feeders from 4 mm to 72 mm and 3 vibratory stick feeders',
      'Tray unit for chip, IC, BGA, and other component mounting',
      'Built-in auto calibration and hybrid calibration',
      'CCD camera image processing',
      'Variable-pitch Fuji intelligent feeders for paper and emboss parts',
      'Three extra feeder carts for quick changeover',
      'Board-level traceability and free feeder allocation',
    ],
  },
  {
    title: 'Pick and Place Machine',
    eyebrow: 'Panasonic NPM-D3A',
    image: '/machinery-img4.png',
    icon: Gauge,
    summary:
      'High-capacity Panasonic mounting system for fine pitch placement, smart feeding, and traceable production.',
    specs: ['92,500 CPH capacity', '50 x 50 mm to 510 x 590 mm board handling', '0.025 mm mounter accuracy, Cpk >= 1.00 (3 sigma)'],
    details: [
      'Supports fine pitch components including 01005 and 0201',
      'Intelligent smart feeders from 4 mm to 32 mm',
      'Two extra feeder carts for quick changeover',
      'Built-in auto calibration and hybrid calibration',
      'CCD camera image processing',
      'Board-level traceability and free feeder allocation',
    ],
  },
  {
    title: 'Reflow Oven',
    eyebrow: 'JTR-1000N nitrogen-ready reflow oven',
    image: '/machinery-img5.png',
    icon: Zap,
    summary:
      'Nitrogen-ready reflow capability with thermal profiling, dual conveyor support, and production monitoring.',
    specs: ['10 top and bottom heating zones', '3 top and bottom cooling zones', 'KIC-X5 9-channel reflow profiler with carrier'],
    details: [
      'In-built thermal profiler',
      'Both mesh and chain conveyors inbuilt',
      'Automatic lubrication system including automatic chain oilers',
      'Board drop and board count sensor with animation',
      'Camera barcode reader',
    ],
  },
  {
    title: '3D Automated Optical Inspection',
    eyebrow: 'Koh Young ZENITH ALPHA HS+ inline 3D AOI',
    image: '/machinery-img6.png',
    icon: CheckCircle2,
    summary:
      'Inline 3D AOI for component, solder joint, polarity, coplanarity, and optical character verification.',
    specs: ['8M pixel 3D camera', 'Up to 490 x 510 mm board handling', '25 mm 3D height inspection capability'],
    details: [
      '3D inspection for missing, offset, billboarding, tombstone, coplanarity, solder joint defects, lifted leads, bridging, no-pops, and polarity',
      '2D wrong-part inspection using OCV/R and polarity checks',
      'Camera barcode reader',
      'OCV and OCR capability',
      '5-way 3D projector lighting system',
      'Auto programming and offline programming software',
      'KSMART LINK closed-loop feedback from AOI to SPI',
    ],
  },
  {
    title: 'Production Support Equipment',
    eyebrow: 'Utility, test, cleaning, and marking systems',
    image: '/machinery-img7.png',
    icon: Wrench,
    summary:
      'Supporting machinery and instruments for paste preparation, cleaning, welding, measurement, marking, and power validation.',
    specs: ['Solder paste mixer', 'Stencil cleaner', 'Laser marking and ultrasonic welding'],
    details: [
      '6 1/2 digit digital multimeter',
      'Oscilloscope',
      'Power supply',
      'Stencil cleaner',
      'Solder paste mixer',
    ],
  },
];

export default function InfrastructureMachineryPage() {
  return (
    <section className="infrastructure-page">
      <div className="infrastructure-hero">
        <div className="infrastructure-hero-copy">
          <p className="public-eyebrow">Infrastructure & Machinery</p>
          <h1>PCB manufacturing facilities for electronics manufacturing services in Hyderabad, India.</h1>
          <p>
            SriLin's SMT infrastructure brings together automated printing, 3D solder paste inspection, high-speed pick and place, nitrogen-ready reflow, 3D AOI, and lab support for dependable printed circuit board manufacturing.
          </p>
          <div className="infrastructure-actions">
            <Link className="public-cta" to="/contact-us">
              Discuss a build
              <ArrowRight size={18} />
            </Link>
            <a className="secondary-link" href="#machinery">
              View machinery
            </a>
          </div>
        </div>

        <div className="infrastructure-hero-panel" aria-label="PCB manufacturing process flow">
          <div className="infrastructure-panel-header">
            <Factory size={24} />
            <span>SMT line flow</span>
          </div>
          <ol className="process-flow">
            {processFlow.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="infrastructure-stats" id="capabilities">
        {capabilityStats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="machinery-intro" id="machinery">
        <p className="public-eyebrow">PCB Assembly Services India</p>
        <h2>Machine capability across the complete SMT production path.</h2>
        <p>
          Each production stage is supported by dedicated equipment for placement accuracy, inspection repeatability, traceability, and fast changeover.
        </p>
      </div>

      <div className="machinery-stack">
        {equipment.map((item, index) => {
          const Icon = item.icon;

          return (
            <article className="machinery-card" key={item.title + item.eyebrow}>
              <div className="machinery-media">
                <img src={item.image} alt={`${item.title} - ${item.eyebrow}`} />
              </div>
              <div className="machinery-copy">
                <div className="machinery-card-topline">
                  <span className="machinery-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="machinery-icon"><Icon size={18} /></span>
                </div>
                <p className="machinery-eyebrow">{item.eyebrow}</p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>

                <div className="machinery-specs">
                  {item.specs.map((spec) => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>

                <ul className="machinery-detail-list">
                  {item.details.map((detail) => (
                    <li key={detail}>
                      <CheckCircle2 size={16} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
