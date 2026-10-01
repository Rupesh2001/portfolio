import { Link, NavLink, useLocation } from 'react-router-dom';

const routes = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Projects' },
];

type HeaderProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const { pathname } = useLocation();

  const goContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Rupesh Mahat home">
          <span className="brand-mark">RM</span>
          <span className="brand-name">RUPESH.QA</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation" key={pathname}>
          {routes.map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              end={r.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              onClick={(e) => (e.currentTarget as HTMLElement).blur()}
            >
              {r.label}
            </NavLink>
          ))}
          <button type="button" className="nav-link nav-link--button" onClick={goContact}>
            Contact
          </button>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'light'}
          >
            <span className="theme-toggle__icon" aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
            <span className="theme-toggle__label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <a className="button-link inline-link" href="/Rupesh_Mahat_CV.pdf" download>
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
