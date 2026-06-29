import { Link } from 'react-router-dom';

const footerLinks = [
  ['About Us', '/about-us'],
  ['Services', '/services'],
  ['Design & Engineering', '/design-engineering'],
  ['Industries', '/industries'],
  ['Products', '/products'],
  ['Resources', '/resources'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <span className="footer-logo"><img src="/srilin-white.png" alt="Srilin Electronics" /></span>
          
          <small>
            Electronics design, product support, infrastructure, and manufacturing capability for
            modern business requirements.
          </small>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          {footerLinks.slice(0, 3).map(([label, path]) => (
            <Link key={path} to={path}>{label}</Link>
          ))}
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
