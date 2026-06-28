import { ArrowRight } from 'lucide-react';

const sections = [
  {
    title: 'Embedded Hardware Design Services',
    body: 'Srilin Electronics offers comprehensive Embedded Hardware Design Services focused on delivering high-quality, reliable, and performance-driven electronic solutions. Our approach combines strong design expertise with rigorous validation processes to ensure that every product meets industry standards and customer expectations. A key strength of Srilin lies in its emphasis on schematic design, design enhancements, ECAD layout services, unit testing, and functional testing with integrated EMS services, which play a critical role in the success of embedded systems.',
    image: '/embedded-hardware.jpg',
    alt: 'Embedded hardware design services',
  },
  {
    title: 'Design Enhancements',
    body: 'Srilin continuously improves hardware designs to achieve better performance, efficiency, and reliability. Design enhancements involve optimizing circuit layouts, selecting the most suitable components, and improving signal integrity and thermal management. The team evaluates existing designs to reduce power consumption, minimize noise, and enhance durability. These improvements ensure that the final product is technically robust, cost-effective, and scalable for production.',
  },
  {
    title: 'Unit Testing',
    body: 'Unit testing is performed at the individual component or module level to verify that each part of the hardware functions correctly. At Srilin, engineers test smaller sections of the design such as power modules, communication interfaces, and processor units before integrating them into the complete system. This early-stage testing helps identify and resolve issues quickly, reducing development time and preventing costly errors in later stages.',
  },
  {
    title: 'Functional Testing',
    body: 'Functional testing validates the complete hardware system against the required specifications and real-world operating conditions. Srilin conducts detailed testing to ensure that all components work together seamlessly and deliver the expected performance. This includes checking input/output operations, system responses, communication protocols, and overall system behavior. Functional testing ensures reliability, stability, and compliance with industry standards, making the product ready for deployment.',
    image: '/embedded-software.jpg',
    alt: 'Embedded software services',
  },
  {
    title: 'Embedded Software Services',
    body: 'Srilin Electronics provides advanced Embedded Software Services that complement its hardware design and manufacturing capabilities. The company focuses on developing reliable, scalable, and high-performance software solutions tailored for embedded systems across industries such as aerospace, defence, Space, AI, IOT, Industrial automation, and Medical, Railways, IT Hardware, Consumer Electronics, Automotive & EV & Telecom electronics. A key area of expertise includes LabVIEW test software and test application development, which ensure precise validation and control of electronic systems.',
  },
  {
    title: 'LabVIEW Test Software',
    body: 'Srilin specializes in developing test solutions using LabVIEW (Laboratory Virtual Instrument Engineering Workbench), a powerful platform from National Instruments. LabVIEW enables graphical programming for automated testing, data acquisition and system control. At Srilin, LabVIEW-based test software is designed to:',
    bullets: [
      'Automate complex testing procedures for electronic hardware',
      'Interface with instruments such as oscilloscopes, multimeters, and data acquisition systems',
      'Provide real-time data monitoring and analysis',
      'Improve accuracy and reduce manual intervention in testing processes',
    ],
  },
  {
    title: 'Test Applications',
    body: 'Srilin develops customized test applications to validate embedded systems under various operating conditions. These applications are tailored to meet specific product requirements and industry standards. Key features of Srilin’s test applications include:',
    bullets: [
      'Functional testing of embedded systems and subsystems',
      'Automated test sequences for production and validation',
      'User-friendly interfaces for operators and engineers',
      'Data logging, reporting, and diagnostics for quality analysis',
      'Integration with hardware platforms and communication protocols',
    ],
  },
];

export default function DesignEngineeringPage() {
  return (
    <section className="design-engineering-page">
      <div className="design-engineering-hero">
        <p className="public-eyebrow">Design & Engineering</p>
        <h1>Embedded hardware and software solutions built for reliable electronics manufacturing.</h1>
        <p>
          Srilin combines engineering depth, test discipline, and manufacturing awareness to help product teams build dependable embedded systems from concept through validation.
        </p>
      </div>

      <div className="design-engineering-content">
        {sections.map((section, index) => (
          <article className={`design-engineering-card ${section.image ? 'has-image' : 'no-image'}`} key={section.title}>
            {section.image ? (
              <div className="design-engineering-media">
                <img src={section.image} alt={section.alt || section.title} />
              </div>
            ) : null}
            <div className="design-engineering-copy">
              <div className="section-index">0{index + 1}</div>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets ? (
                <ul className="design-engineering-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}><ArrowRight size={16} />{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
