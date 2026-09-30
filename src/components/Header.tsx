import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Projects' },
  { to: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Rupesh Mahat home">
          <span className="brand-mark">P</span>
          <span className="brand-name">PORTFOL.IO</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a className="button-link inline-link" href="/Rupesh_Mahat_CV.pdf" download>
          Open for Hire
        </a>
      </div>
    </header>
  );
}
