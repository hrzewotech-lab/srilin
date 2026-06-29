import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about-us',
    children: [
      { label: 'About Company', path: '/about-us/company' },
      { label: 'Our Team', path: '/about-us/team' },
      { label: 'Career', path: '/about-us/career' },
    ],
  },
  { label: 'Services', path: '/services' },
  { label: 'Design & Engineering', path: '/design-engineering' },

  { label: 'Products', path: '/products' },
  { label: 'Infrastructure & Machinery', path: '/infrastructure-machinery' },
  {
    label: 'Resources',
    path: '/resources',
    children: [
      { label: 'Blog', path: '/resources/blog' },
      { label: 'FAQs', path: '/resources/faqs' },
    ],
  },
  { label: 'Contact Us', path: '/contact-us' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <NavLink to="/" className="site-brand" onClick={() => setIsOpen(false)}>
        <img src="/SrilinLogo_NSG.png" alt="Srilin Electronics" width="112" height="64" />
      </NavLink>

      <button
        type="button"
        className="nav-toggle"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`site-nav ${isOpen ? 'open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <div className="site-nav-item" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `site-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span>{item.label}</span>
              {(item.children || item.hasMenu) && <ChevronDown size={14} strokeWidth={3} />}
            </NavLink>
            {item.children && (
              <div className="site-dropdown" aria-label={`${item.label} submenu`}>
                {item.children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    className={({ isActive }) => `site-dropdown-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
