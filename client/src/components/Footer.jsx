import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { slugify } from '../utils/slugify';

const footerLinks = [
  ['About Us', '/about-us/company'],
  ['Our Team', '/about-us/team'],
  ['Career', '/about-us/career'],
  ['Design & Engineering', '/design-engineering'],
  ['Industries', '/industries'],
  ['Products', '/products'],
  ['Resources', '/resources/blog'],
];

export default function Footer() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let isMounted = true;
    api.get('/services')
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res?.data?.services) ? res.data.services : [];
          setServices(list.filter((s) => s && s.isActive !== false));
        }
      })
      .catch((err) => console.error('Footer services fetch failed:', err));
    return () => { isMounted = false; };
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <span className="footer-logo"><img src="/srilin-white.png" alt="Srilin Electronics" /></span>
          
          <small>
            Electronics design, product support, infrastructure, and manufacturing capability for
            modern business requirements.
          </small>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 mt-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#c9c9cf] hover:text-[#c29f5d] transition-colors" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#c9c9cf] hover:text-[#c29f5d] transition-colors" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#c9c9cf] hover:text-[#c29f5d] transition-colors" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#c9c9cf] hover:text-[#c29f5d] transition-colors" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          {footerLinks.slice(0, 3).map(([label, path]) => (
            <Link key={path} to={path}>{label}</Link>
          ))}
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          {services.slice(0, 5).map((service) => (
            <Link key={service._id} to={`/services/${slugify(service.title)}`}>
              {service.title}
            </Link>
          ))}
          {services.length > 5 && (
            <Link to="/services" className="font-semibold text-[#c29f5d] hover:text-white transition-colors">
              All Services →
            </Link>
          )}
          {services.length === 0 && (
            <>
              <Link to="/services/embedded-design">Embedded Design</Link>
              <Link to="/services/pcba-capabilities">PCBA Capabilities</Link>
              <Link to="/services/testing-services">Testing Services</Link>
            </>
          )}
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          {footerLinks.slice(3).map(([label, path]) => (
            <Link key={path} to={path}>{label}</Link>
          ))}
          <Link to="/infrastructure-machinery">Infrastructure & Machinery</Link>
        </div>

        <div className="footer-column footer-contact">
          <h4>Contact</h4>
          <p>+91 73850 69999</p>
          <p>info@srilinelectronics.com</p>
          <p>PLOT: S-1/P/D, E-City EMC, Raviryala Village, Maheshwaram Mandal, Ranga Reddy District, Telangana - 501359</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Srilin Electronics Private Limited. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
