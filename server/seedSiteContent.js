require('dotenv').config();
const mongoose = require('mongoose');
const SiteContent = require('./models/SiteContent');
const { connectDB, dbStorage } = require('./config/db');

const seedData = [
  // HomePage Data
  {
    key: 'home_hero_title',
    page: 'HomePage',
    label: 'Hero Title',
    type: 'string',
    value: 'Engineered for Performance. Built for Reliability.'
  },
  {
    key: 'home_why_choose',
    page: 'HomePage',
    label: 'Why Choose Us (Array)',
    type: 'json',
    value: [
      { icon: 'MapPin', title: 'Strategic Location', meta: '15 minutes from airport cargo terminal', text: 'Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal. The facility sits in Hyderabad\'s southern manufacturing corridor, one of India\'s primary hubs for aerospace and defence electronics production.' },
      { icon: 'ShieldCheck', title: 'High Reliability Specialist', meta: 'Aerospace, defence, automotive and more', text: 'AS910OD certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics. Srilin operates in sectors where product failure carries critical consequences. Every board is traceable from component to shipment.' },
      { icon: 'TrendingUp', title: 'Built to Scale', meta: '8x expansion footprint on same campus', text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility. 8x the current footprint on the same campus. No greenfield construction required. Dedicated production clusters can be established for strategic partners.' },
      { icon: 'Smile', title: 'Customer Satisfaction', meta: 'Flexible volumes and account ownership', text: 'Dedicated account management, quick prototyping, and flexible production volumes tailored to your exact requirements.' },
      { icon: 'BadgeCheck', title: 'Quality First Approach', meta: '3D SPI, 3D AOI and X-ray systems', text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems. Mounter accuracy 0.025mm, CpK ≥ 1.00 (3σ).' }
    ]
  },
  {
    key: 'home_about_stats',
    page: 'HomePage',
    label: 'About Stats',
    type: 'json',
    value: [
      { value: '149+', label: 'Clients Served' },
      { value: '347+', label: 'Projects Delivered' },
      { value: '9+', label: 'Years of Excellence' }
    ]
  },
  {
    key: 'home_ticker_items',
    page: 'HomePage',
    label: 'Ticker Items',
    type: 'json',
    value: ['AS9100D Certified', 'ISO 9001:2015', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1', '98% On-Time Delivery', '75+ Global Customers', '12-Day Prototype Cycle', 'ISO-8 Cleanroom Class', 'E-City EMC · Hyderabad', '214,000 Sqft Expansion Ready']
  },
  {
    key: 'home_industries',
    page: 'HomePage',
    label: 'Industries Served',
    type: 'json',
    value: [
      { name: 'Automotive', icon: 'Car' },
      { name: 'Aviation, Space & Defence', icon: 'Plane' },
      { name: 'IT Hardware & Consumer Electronics', icon: 'Cpu' },
      { name: 'Telecom', icon: 'Wifi' },
      { name: 'Electric Vehicles', icon: 'BatteryCharging' },
      { name: 'Railways', icon: 'Train' },
      { name: 'AI, IoT & Automation', icon: 'Bot' },
      { name: 'Medical Devices', icon: 'Activity' }
    ]
  },
  {
    key: 'home_about_title',
    page: 'HomePage',
    label: 'About Section Title',
    type: 'string',
    value: 'Srilin Electronics\nPrivate Limited'
  },
  {
    key: 'home_about_paragraph1',
    page: 'HomePage',
    label: 'About Paragraph 1',
    type: 'text',
    value: 'Srilin Electronics Pvt Ltd is an ISO9001:2015, AS9100D, ANSI ESD S20.20 2021 & IEC 61340 5.1 certified Premier Electronics System Design & Manufacturing Services (ESDM/EMS) company located in E-city EMC (Formerly Fabcity), Hyderabad, India. The company was established in 2017 to help the developing interest of Electronic Assembling in India. Our one-stop-solution electronics manufacturing services (EMS) factory incorporates quick prototyping, mid-range volume production to high volume production.'
  },
  {
    key: 'home_about_paragraph2',
    page: 'HomePage',
    label: 'About Paragraph 2',
    type: 'text',
    value: 'We provide Embedded Design, SMT Mounting, product integration, Testing & box build services. Our products are manufactured using Robust and advanced SMT machinery in Class 100000(ISO-8) Cleanroom to meet world wide quality standards. We also provide comprehensive supply chain management.we offer our administrations to a wide range of customers for their product development and support them in convertibility and scalability of manufacturing. SRILIN has been the favoured worth maker for its clients through imaginative and effective Electronic System Assembling.'
  },
  {
    key: 'home_about_bullets',
    page: 'HomePage',
    label: 'About Bullets',
    type: 'json',
    value: ['Design-to-delivery in one location', 'Aerospace-grade quality systems', 'Flexible volumes — prototype to high-volume']
  },
  {
    key: 'home_testimonials',
    page: 'HomePage',
    label: 'Client Testimonials List',
    type: 'json',
    value: [
      {
        quote: "Their engineering team caught a critical thermal issue during DFM that saved us weeks of rework. Flawless execution.",
        name: "Rahul M.",
        company: "Lead Hardware Engineer, Aerospace Systems"
      },
      {
        quote: "We scaled from 500 units to 10,000 without a single drop in yield rate. Srilin is a true manufacturing partner.",
        name: "Sarah V.",
        company: "VP Operations, MedTech Innovators"
      }
    ]
  },
  {
    key: 'home_testimonials_title',
    page: 'HomePage',
    label: 'Testimonials Heading',
    type: 'string',
    value: 'Clear communication, dependable execution, and production-aware support.'
  },
  {
    key: 'home_services_title',
    page: 'HomePage',
    label: 'Featured Services Heading',
    type: 'string',
    value: 'Explore our top service capabilities.'
  },
  {
    key: 'home_industries_title',
    page: 'HomePage',
    label: 'Industries Heading',
    type: 'string',
    value: 'Flexible electronics capability for modern industrial and product ecosystems.'
  },
  {
    key: 'home_why_choose_title',
    page: 'HomePage',
    label: 'Why Choose SriLin Heading',
    type: 'string',
    value: 'Built for electronics teams that need precision, speed, and accountability.'
  },
  {
    key: 'home_cta_title',
    page: 'HomePage',
    label: 'Final CTA Title',
    type: 'string',
    value: 'Ready to discuss your next electronics requirement?'
  },
  {
    key: 'home_cta_subtext',
    page: 'HomePage',
    label: 'Final CTA Subtext',
    type: 'string',
    value: 'From prototype to production — our team is ready to evaluate your requirements and recommend the right manufacturing approach.'
  },
  {
    key: 'home_certifications',
    page: 'HomePage',
    label: 'Certifications',
    type: 'json',
    value: [
      { quote: 'The seamless integration of Srilin team efforts with FICOSA’s requirements has been instrumental in achieving high-quality outcomes. Their responsiveness, technical expertise, and proactive approach have significantly enhanced the  collaboration. Srilin stands out as a model of professionalism, innovation and quality in the electronics manufacturing domain. ', name: 'Aravind', company: 'Technical Director, Ficosa' },
      { quote: "Pixcellence greatly appreciates Srilin Team's unwavering commitment to delivering high-quality PCBAs, reliable on-time shipments, competitive BOM pricing and open communication. Your meticulous attention to detail and stringent quality control have significantly reduced defects and enhanced our operational efficiency. ", name: 'Huzaifa Najmi', company: 'President & CEO, Pixcellence Technologies' },
      { quote: 'Working with Srilin Electronics has been a seamless experience. Their quality, reliability, and prompt support have consistently exceeded our expectations. Srilin is a trusted and talented EMS partner for any who chooses to engage their Electronics Manufacturing services. ', name: 'C S Rao', company: 'Chairman, Quadgen Wireless' }
    ]
  },
  {
    key: 'home_certifications',
    page: 'HomePage',
    label: 'Certification Badges',
    type: 'json',
    value: ['ISO9001:2015', 'AS9100D', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1']
  },
  
  // AboutCompanyPage Data
  {
    key: 'about_hero_title',
    page: 'AboutCompanyPage',
    label: 'Hero Title',
    type: 'string',
    value: 'Srilin Electronics\nPrivate Limited'
  },
  {
    key: 'about_hero_subtext',
    page: 'AboutCompanyPage',
    label: 'Hero Subtext',
    type: 'text',
    value: 'Premier ESDM/EMS services with certified quality systems, scalable production, and reliable manufacturing support from design to box build.'
  },
  {
    key: 'about_paragraphs',
    page: 'AboutCompanyPage',
    label: 'About Paragraphs',
    type: 'json',
    value: [
      'Srilin Electronics Pvt Ltd is an ISO9001:2015, AS9100D, ANSI ESD S20.20 2021 & IEC 61340 5.1 certified Premier Electronics System Design & Manufacturing Services (ESDM/EMS) company located in E-city EMC (Formerly Fabcity), Hyderabad, India. The company was established in 2017 to help the developing interest of Electronic Assembling in India. Our one-stop-solution electronics manufacturing services (EMS) factory incorporates quick prototyping, mid-range volume production to high volume production.',
      'We provide Embedded Design, SMT Mounting, product integration, Testing & box build services. Our products are manufactured using Robust and advanced SMT machinery in Class 100000(ISO-8) Cleanroom to meet world wide quality standards. We also provide comprehensive supply chain management.we offer our administrations to a wide range of customers for their product development and support them in convertibility and scalability of manufacturing. SRILIN has been the favoured worth maker for its clients through imaginative and effective Electronic System Assembling.'
    ]
  },
  {
    key: 'about_certifications',
    page: 'AboutCompanyPage',
    label: 'Certifications',
    type: 'json',
    value: ['ISO9001:2015', 'AS9100D', 'ANSI ESD S20.20 2021', 'IEC 61340 5.1']
  },
  {
    key: 'about_stats',
    page: 'AboutCompanyPage',
    label: 'Stats',
    type: 'json',
    value: [
      { value: '2017', label: 'Established', icon: 'BadgeCheck' },
      { value: '25,000', label: 'Sqft current facility', icon: 'Building2' },
      { value: '214,000', label: 'Sqft expansion space', icon: 'TrendingUp' },
      { value: '9+', label: 'Years ', icon: 'ShieldCheck' }
    ]
  },
  {
    key: 'about_featured_stat',
    page: 'AboutCompanyPage',
    label: 'Featured Stat',
    type: 'json',
    value: {
      value: 'ISO-8',
      label: 'Cleanroom class',
      description: 'Class 100000 manufacturing in a certified ESD-safe cleanroom with aerospace and defence traceability.',
      icon: 'ShieldCheck'
    }
  },
  {
    key: 'about_services',
    page: 'AboutCompanyPage',
    label: 'Core Services',
    type: 'json',
    value: [
      'Embedded Design',
      'SMT Mounting',
      'Product Integration',
      'Testing',
      'Box Build',
      'Supply Chain Management'
    ]
  },
  {
    key: 'about_highlights',
    page: 'AboutCompanyPage',
    label: 'Highlights',
    type: 'json',
    value: [
      { icon: 'MapPin', title: 'Strategic Location', meta: '15 minutes from airport cargo terminal', text: "Located at Fabcity (E-City EMC), Hyderabad. 15 minutes from Rajiv Gandhi International Airport and cargo terminal. The facility sits in Hyderabad's southern manufacturing corridor, one of India's primary hubs for aerospace and defence electronics production." },
      { icon: 'ShieldCheck', title: 'High Reliability Specialist', meta: 'Aerospace, defence, automotive and more', text: 'AS9100D certified with active production across Aerospace, Defence, Automotive, IT Hardware, Telecom, Medtech and Consumer Electronics. Srilin operates in sectors where product failure carries critical consequences. Every board is traceable from component to shipment.' },
      { icon: 'TrendingUp', title: 'Built to Scale', meta: '8x expansion footprint on same campus', text: '214,000 sqft of expansion space adjacent to the current 25,000 sqft facility. 8x the current footprint on the same campus. No greenfield construction required. Dedicated production clusters can be established for strategic partners.' },
      { icon: 'Smile', title: 'Customer Satisfaction', meta: 'Flexible volumes and account ownership', text: 'Dedicated account management, quick prototyping, and flexible production volumes tailored to your exact requirements.' },
      { icon: 'BadgeCheck', title: 'Quality First Approach', meta: '3D SPI, 3D AOI and X-ray systems', text: 'Multi-stage inspection with 3D SPI, 3D AOI, and X-ray systems. Mounter accuracy 0.025mm, CpK >= 1.00 (3 sigma).' }
    ]
  },
  
  // ContactPage Data
  {
    key: 'contact_cards',
    page: 'ContactPage',
    label: 'Contact Information Cards',
    type: 'json',
    value: [
      {
        icon: 'Mail',
        title: 'Email',
        value: 'sales@srilinelectronics.com',
        sub: 'We reply within one business day',
        href: 'mailto:sales@srilinelectronics.com'
      },
      {
        icon: 'MapPin',
        title: 'Address',
        value: 'PLOT: S-1/P/D, E-City EMC',
        sub: 'Raviryala, Maheshwaram, Ranga Reddy, Telangana – 501359',
        href: 'https://www.google.com/maps/search/?api=1&query=SRILIN+ELECTRONICS+PRIVATE+LIMITED'
      }
    ]
  },
  {
    key: 'contact_whatsapp',
    page: 'Global',
    label: 'WhatsApp Number',
    type: 'string',
    value: '917385069999'
  },
  
  // DesignEngineeringPage Data
  {
    key: 'design_engineering_hero_title',
    page: 'DesignEngineeringPage',
    label: 'Hero Title',
    type: 'string',
    value: 'Embedded Systems. Built to Last.'
  },
  {
    key: 'design_engineering_sections',
    page: 'DesignEngineeringPage',
    label: 'Content Sections',
    type: 'json',
    value: [
      {
        title: 'Embedded Hardware Design Services',
        eyebrow: 'Core Offering',
        icon: 'Cpu',
        tag: 'Hardware Design',
        image: '/embedded-hardware.jpg',
        alt: 'Embedded hardware design services',
        body: 'Srilin Electronics offers comprehensive Embedded Hardware Design Services focused on delivering high-quality, reliable, and performance-driven electronic solutions. Our approach combines strong design expertise with rigorous validation processes to ensure that every product meets industry standards and customer expectations. A key strength of Srilin lies in its emphasis on schematic design, design enhancements, ECAD layout services, unit testing, and functional testing with integrated EMS services, which play a critical role in the success of embedded systems.',
      },
      {
        title: 'Design Enhancements',
        eyebrow: 'Optimisation',
        icon: 'Pencil',
        tag: 'Circuit Refinement',
        body: 'Srilin continuously improves hardware designs to achieve better performance, efficiency, and reliability. Design enhancements involve optimizing circuit layouts, selecting the most suitable components, and improving signal integrity and thermal management. The team evaluates existing designs to reduce power consumption, minimize noise, and enhance durability. These improvements ensure that the final product is technically robust, cost-effective, and scalable for production.',
      },
      {
        title: 'Unit Testing',
        eyebrow: 'Module-Level Validation',
        icon: 'Microscope',
        tag: 'Early-Stage QA',
        body: 'Unit testing is performed at the individual component or module level to verify that each part of the hardware functions correctly. At Srilin, engineers test smaller sections of the design such as power modules, communication interfaces, and processor units before integrating them into the complete system. This early-stage testing helps identify and resolve issues quickly, reducing development time and preventing costly errors in later stages.',
      },
      {
        title: 'Functional Testing',
        eyebrow: 'System-Level Validation',
        icon: 'FlaskConical',
        tag: 'End-to-End QA',
        body: 'Functional testing validates the complete hardware system against the required specifications and real-world operating conditions. Srilin conducts detailed testing to ensure that all components work together seamlessly and deliver the expected performance. This includes checking input/output operations, system responses, communication protocols, and overall system behavior. Functional testing ensures reliability, stability, and compliance with industry standards, making the product ready for deployment.',
      },
      {
        title: 'Embedded Software Services',
        eyebrow: 'Software Division',
        icon: 'MonitorDot',
        tag: 'Firmware & SW',
        image: '/embedded-software.jpg',
        alt: 'Embedded software and functional testing',
        body: 'Srilin Electronics provides advanced Embedded Software Services that complement its hardware design and manufacturing capabilities. The company focuses on developing reliable, scalable, and high-performance software solutions tailored for embedded systems across industries such as aerospace, defence, Space, AI, IOT, Industrial automation, and Medical, Railways, IT Hardware, Consumer Electronics, Automotive & EV & Telecom electronics. A key area of expertise includes LabVIEW test software and test application development, which ensure precise validation and control of electronic systems.',
      },
      {
        title: 'LabVIEW Test Software',
        eyebrow: 'National Instruments Platform',
        icon: 'Layers',
        tag: 'Automated Testing',
        body: 'Srilin specializes in developing test solutions using LabVIEW (Laboratory Virtual Instrument Engineering Workbench), a powerful platform from National Instruments. LabVIEW enables graphical programming for automated testing, data acquisition and system control. At Srilin, LabVIEW-based test software is designed to:',
        bullets: [
          'Automate complex testing procedures for electronic hardware',
          'Interface with instruments such as oscilloscopes, multimeters, and data acquisition systems',
          'Provide real-time data monitoring and analysis',
          'Improve accuracy and reduce manual intervention in testing processes',
          'These solutions are widely used in production environments and R&D labs to ensure consistent quality and faster testing cycles.',
        ],
      },
      {
        title: 'Test Applications',
        eyebrow: 'Custom Development',
        icon: 'Zap',
        tag: 'Validation SW',
        body: 'Srilin develops customized test applications to validate embedded systems under various operating conditions. These applications are tailored to meet specific product requirements and industry standards. Key features of Srilin’s test applications include:',
        bullets: [
          'Functional testing of embedded systems and subsystems',
          'Automated test sequences for production and validation ',
          'User-friendly interfaces for operators and engineers',
          'Data logging, reporting, and diagnostics for quality analysis',
          'Integration with hardware platforms and communication protocols',
          'These applications help identify defects early, ensure system reliability, and support compliance with stringent industry requirements.',
        ],
      }
    ]
  },
  
  // InfrastructureMachineryPage Data
  {
    key: 'infrastructure_equipment',
    page: 'InfrastructureMachineryPage',
    label: 'Main Equipment',
    type: 'json',
    value: [
      {
        title: 'Solder Paste Printer',
        eyebrow: 'Fuji GPX-CII',
        image: '/machinery-img6.png',
        icon: 'Layers',
        category: 'Printing Stage',
        tag: 'Solder Paste Printer - Printed circuit board manufacturing India',
        summary: 'Fuji - GPX-CII Automated Solder Paste/Glue Printer.',
        details: [
          'Applicable panel size 48 x 48mm to 610 x 610mm.',
          'Alignment Accuracy: ± 0.010mm, 6 sigma [CpK>=2.0]',
          'Wet Printer Accuracy: ± 0.018mm, 6 sigma [CpK>=2.0]',
          'Printer Cycle time: 6.0 seconds (including panel loading, unloading, mark reading, mask alignment)',
          'Auto Paste Dispenser JAR type with Solder Roll Dia Check function.',
          'Stencil Cleaning: Dry + Wet + Vacuum.',
          'SPI Closed loop function.',
          'Local Verifier - with Handy Barcode Scanner.',
          'Automatic width adjustment.',
        ],
      },
      {
        title: '3D Solder Paste Inspection',
        eyebrow: 'Koh Young KY8080-L',
        image: '/machinery-img5.png',
        icon: 'ScanLine',
        category: 'Verification Stage',
        tag: '3D Solder Paste Inspection - EMS company India',
        summary: 'Koh Young inline 3D SPI– KY8080-L.',
        details: [
          'Printer Closed Loop Feedback.',
          'Camera Barcode reader.',
          'PCB Warp Compensation: Z Tracking.',
          'Detects Insufficient Paste, Excessive Paste, Missing‐Paste, Bridging, Shape Deformity, Paste Displacement, Volume, Height, XY Position, Area.',
          'Koh Young proprietary light projection unit for shadow free effect.',
          '4M B/W Digital Camera, 15um X/Y‐resolution (20/25um configurable from factory).',
          '0.37um Z resolution.',
          'SPC Plus software (Statistical Process Control).',
          'Applicable PCB Size 50mmx50mm to 510mmx510mm.',
          'No PCB color sensitivity.',
          'Min. Paste deposit supported up to 3.94 mils.',
          'Measurement Accuracy: < 1% on Calibration Target.',
          'Measurement Accuracy: < 3% on PCB.',
          'Measurement repeatability: < 10% on 01005 deposits @ 6 sigma [with 50% tolerance].',
          'KSMART LINK Software - Closed loop feedback from AOI to SPI.',
        ],
      },
      {
        title: 'Pick and Place Machines',
        eyebrow: 'Fuji AIMEX IIIc',
        image: '/machinery-img1.png',
        icon: 'Cpu',
        category: 'Placement Stage',
        tag: 'Pick and Place Machines - PCB Assembly services India',
        summary: 'Fuji- AIMEX IIIc – 2 Robot x 2 Modules with a capacity of 1,03,000 CPH.',
        details: [
          '48 x 48mm to 508mm x 400mm PCB handling capability.',
          'PBGA, FBGA, Micro-BGA, CSP, Ultra-fine pitch QFP & QFN mounting capability.',
          'Mounter accuracy of 0.025 mm, Cpk >= 1.00 (3 sigma).',
          'Supports Fine pitch components (01005 & 0201)',
          'Intelligent smart feeders (4mm to 72mm & 3 vibratory stick feeders).',
          'Fuji- AIMEX IIIc with Tray unit for chip & IC/BGA/other components mounting.',
          'Built‐in Auto Calibration and Hybrid calibration ensures placement accuracy to best level.',
          'Image processing is through CCD camera.',
          'FUJI Intelligent Feeders are of Variable pitch, electrically driven, Common for Paper & Emboss, Common for parts from 0402 mm (01005”) to 3225mm (1210”) parts size.',
          'Three Extra feeder carts for quick change over.',
          'Board level Traceability.',
          'Free Feeder Allocation.',
        ],
      },
      {
        title: 'Pick and Place Machine',
        eyebrow: 'Panasonic NPM-D3A',
        image: '/machinery-img4.png',
        icon: 'Cpu',
        category: 'Placement Stage',
        tag: 'Pick and Place Machine - SMT circuit board assembly',
        summary: 'Panasonic NPM-D3A Pick and Place Machine with 92500 CPH.',
        details: [
          'Board handling capacity of 50mm × 50mm ~ 510mm × 590mm.',
          'Mounter accuracy of 0.025 mm, Cpk >= 1.00 (3 sigma).',
          'Supports Fine pitch components (01005 & 0201).',
          'Intelligent smart feeders (4mm to 32mm).',
          'Two Extra feeder carts for quick change over.',
          'Built-in Auto Calibration and Hybrid calibration ensures placement accuracy to best level.',
          'Image processing is through CCD camera.',
          'Board level Traceability.',
          'Free Feeder Allocation.',
        ],
      },
      {
        title: 'Reflow Oven',
        eyebrow: 'JTR-1000N',
        image: '/machinery-img3.png',
        icon: 'Zap',
        category: 'Soldering Stage',
        tag: 'Reflow Oven - PCB design and manufacturing service',
        summary: 'JTR-1000N Reflow Oven with Nitrogen Ready.',
        details: [
          'Heating zones 10 Top and Bottom.',
          'Cooling Zones 3 Top and Bottom .',
          'In-built Thermal Profiler.',
          'Both Mesh & Chain Conveyors inbuilt.',
          'Automatic Lubrication System (Including Automatic chain oilers).',
          'Board Drop / Board Count Sensor with Animation.',
          'Reflow Profiler KIC –X5 9 channel with Carrier available.',
          'Camera Barcode Reader',
        ],
      },
      {
        title: '3D Automated Optical Inspection (AOI)',
        eyebrow: 'Koh Young ZENITH ALPHA HS+',
        image: '/machinery-img2.png',
        icon: 'ScanLine',
        category: 'Inspection Stage',
        tag: '3D Automated Optical Inspection AOI - Electronic product assembly India',
        summary: 'Koh Young Inline 3D Automated Optical inspection (AOI) ZENITH ALPHAHS+.',
        details: [
          '3D Inspection: Missing, Offset, Billboarding, Tombstone, Coplanarity, Solder Joint (insufficient, excessive), Lifted Leads, Bridging, "No‐Pops" Polarity.',
          '2D Inspection: "Wrong Part" using Optical Character Verification (OCV/R), Polarity.',
          'Camera Barcode Reader.',
          '8M Pixel 3D Camera.',
          'Maximum board handling capability of up to 490 x 510mm.',
          'OCV & OCR capability.',
          '25mm 3D Height Inspection capability.',
          '5 Way 3D Projector Lighting System.',
          'Auto Programming option & Offline programming software.',
          'KSMART LINK Software - Closed loop feedback from AOI to SPI.',
        ],
      }
    ]
  },
  {
    key: 'infrastructure_auxiliary',
    page: 'InfrastructureMachineryPage',
    label: 'Auxiliary Equipment',
    type: 'json',
    value: [
      {
        name: 'Solder Paste Mixer',
        tag: 'Solder Paste Mixer',
        description: 'Ensures homogeneous paste viscosity and temperature stabilization prior to printing.',
        image: '/solder-paste-mixture.png',
        icon: 'RefreshCw',
      },
      {
        name: 'Stencil Cleaner',
        tag: 'Stencil Cleaner',
        description: 'High-performance cleaner utilizing dry, wet, and vacuum filtration to ensure residue-free stencils.',
        image: '/stencil-cleaner.png',
        icon: 'Droplet',
      },
      {
        name: '6 1/2 Digital Multimeter',
        tag: '6 1/2 Digital Multimeter',
        description: 'High-precision electrical measurement for engineering verification and Quality Assurance testing.',
        image: '/digital-multimeter.png',
        icon: 'Binary',
      },
      {
        name: 'Ultrasonic Welding Machine',
        tag: 'Ultrasonic Welding Machine',
        description: 'Precision ultrasonic welding system for enclosures and connectors.',
        image: '/ultrasonic-welding-machine.png',
        icon: 'Wrench',
      },
      {
        name: 'Oscilloscope',
        tag: 'Oscilloscope',
        description: 'High-bandwidth digital storage oscilloscope for signal integrity checks and troubleshooting.',
        image: '/oscilloscope.png',
        icon: 'Activity',
      },
      {
        name: 'Laser Marking',
        tag: 'Laser marking',
        description: 'Automated laser engraving for permanent PCB serial numbers and tracking codes.',
        image: '/laser-marking.png',
        icon: 'Tag',
      },
      {
        name: 'Power Supply',
        tag: 'Power Supply',
        description: 'Programmable DC power sources for comprehensive functional testing.',
        image: '/power-supply.png',
        icon: 'Power',
      }
    ]
  },
  {
    key: 'infrastructure_benchmarks',
    page: 'InfrastructureMachineryPage',
    label: 'Benchmark Rows',
    type: 'json',
    value: [
      {
        metric: 'Placement/Alignment Accuracy',
        values: ['±0.025 mm (Cpk >= 1.00)', '±0.025 mm (Cpk >= 1.00)', '±15 µm XY / 0.37 µm Z', '±0.010 mm Alignment'],
      },
      {
        metric: 'Throughput CPH',
        values: ['1,03,000 CPH', '92,500 CPH', 'N/A (Inline Inspection)', '6.0s Cycle Time'],
      },
      {
        metric: 'Inspection Type',
        values: ['CCD Vision Auto-Calibration', 'CCD Vision Auto-Calibration', '3D Shadow-Free AOI', '3D SPI / Closed-Loop Feedback'],
      },
      {
        metric: 'Smallest Component & Limits',
        values: ['01005 / 0201 support', '01005 / 0201 support', '25mm 3D Height Inspection', '3.94 mils Paste deposit'],
      }
    ]
  }
];

const seedDB = async () => {
  try {
    const { client, db } = await connectDB();
    console.log('MongoDB Connected for Seeding');

    dbStorage.run({ db }, async () => {
      try {
        for (const item of seedData) {
          const exists = await SiteContent.findOne({ key: item.key });
          if (!exists) {
            await SiteContent.create(item);
            console.log(`Seeded: ${item.key}`);
          } else {
            console.log(`Skipped (already exists): ${item.key}`);
          }
        }
        console.log('Seeding Complete!');
        process.exit(0);
      } catch (err) {
        console.error('Error during run:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
