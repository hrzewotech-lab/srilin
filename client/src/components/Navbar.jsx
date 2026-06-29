import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about-us/company',
    children: [
      { label: 'About Company', path: '/about-us/company' },
      { label: 'Our Team', path: '/about-us/team' },
      { label: 'Career', path: '/about-us/career' },
    ],
  },
  { label: 'Services', path: '/services' },
  { label: 'Design & Engineering', path: '/design-engineering' },
  {label:'Industries', path:'/industries'},
  { label: 'Products', path: '/products' },
  { label: 'Infrastructure & Machinery', path: '/infrastructure-machinery' },
  {
    label: 'Resources',
    path: '/resources/blog',
    children: [
      { label: 'Blog', path: '/resources/blog' },
      { label: 'FAQs', path: '/resources/faqs' },
    ],
  },
  { label: 'Contact Us', path: '/contact-us' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  useEffect(() => {
    setIsOpen(false);
    setExpandedMenu(null);
  }, [location.pathname]);

  const handleToggle = () => {
    setIsOpen((current) => {
      if (current) setExpandedMenu(null);
      return !current;
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedMenu(null);
  };

  const toggleSubmenu = (path) => {
    setExpandedMenu((current) => (current === path ? null : path));
  };

  return (
    <>
      <header className="site-header">
        <NavLink to="/" className="site-brand" onClick={closeMenu}>
          <img src="/srilin-white.png" alt="Srilin Electronics" width="112" height="64" />
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`site-nav ${isOpen ? 'open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => {
            const itemId = `submenu-${item.path.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isExpanded = expandedMenu === item.path;

            return (
              <div className={`site-nav-item ${hasChildren ? 'has-children' : ''}`} key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `site-nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                  {hasChildren && <ChevronDown className="nav-chevron-desktop" size={14} strokeWidth={3} />}
                </NavLink>

                {hasChildren && (
                  <>
                    <button
                      type="button"
                      className={`submenu-toggle ${isExpanded ? 'expanded' : ''}`}
                      aria-expanded={isExpanded}
                      aria-controls={itemId}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleSubmenu(item.path);
                      }}
                    >
                      <ChevronDown size={18} />
                    </button>
                    <div
                      id={itemId}
                      className={`site-dropdown ${isExpanded ? 'open' : ''}`}
                      aria-label={`${item.label} submenu`}
                    >
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => `site-dropdown-link ${isActive ? 'active' : ''}`}
                          onClick={closeMenu}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </header>
      <div className="site-header-spacer" aria-hidden="true" />
    </>
  );
}
