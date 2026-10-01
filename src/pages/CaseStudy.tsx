import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectCover } from '../components/ProjectCover';
import { projects } from '../data/projects';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'scope', label: 'Scope' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'scenarios', label: 'Scenarios' },
  { id: 'defects', label: 'Defects' },
  { id: 'tools', label: 'Tools' },
  { id: 'outcome', label: 'Outcome' },
] as const;

const SCROLL_OFFSET = -96;

function hostOf(link: string) {
  try {
    return new URL(link).host;
  } catch {
    return link;
  }
}

function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = index > -1 ? projects[index] : undefined;
  const [activeId, setActiveId] = useState<string>('overview');

  useEffect(() => {
    if (!project) return;
    const nodes = SECTIONS.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: '-100px 0px -55% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const anchor = window.location.hash.replace('#', '');
    if (!anchor) return;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(anchor);
      if (!target) return;
      if (window.__lenis) window.__lenis.scrollTo(target, { offset: SCROLL_OFFSET });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 160);

    return () => window.clearTimeout(timer);
  }, [project]);

  if (!project) {
    return (
      <main id="main" className="container page-shell not-found-shell">
        <p className="eyebrow">[ 404 ]</p>
        <h1>Report not found</h1>
        <p className="lede">
          No test report matches <code className="mono">{slug}</code>. It may have been renamed or removed.
        </p>
        <div className="hero-actions">
          <Link to="/work" className="button-link button-link--primary">
            Browse all reports
            <span className="button-link__arrow" aria-hidden="true">→</span>
          </Link>
          <Link to="/" className="button-link button-link--ghost">Return home</Link>
        </div>
      </main>
    );
  }

  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const passed = project.scenarioRows.filter((row) => row.status === 'PASS').length;
  const warned = project.scenarioRows.filter((row) => row.status === 'WARN').length;
  const totalDefects = project.defects.reduce((sum, defect) => sum + defect.value, 0);
  const secure = project.liveLink.startsWith('https://');

  const jumpTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(null, '', `#${id}`);
    setActiveId(id);
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: SCROLL_OFFSET });
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main id="main" className="container case-study-shell">
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/work">Work archive</Link></li>
          <li aria-current="page">{project.name}</li>
        </ol>
      </nav>

      <header className="case-study-header">
        <div className="case-study-header__top">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            Report / {project.category}
          </p>
          <Link to="/work" className="back-link">
            <span aria-hidden="true">←</span> All reports
          </Link>
        </div>

        <h1 className="case-study-title">{project.name}</h1>
        <p className="case-study-lede">{project.summary}</p>

        <div className="case-cover-wrap">
          <ProjectCover slug={project.slug} className="project-cover case-cover" />
        </div>

        <div className="case-meta">
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          {project.liveLink ? (
            <div className="live-link">
              <a
                className="button-link button-link--primary"
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live product
                <span className="button-link__arrow" aria-hidden="true">↗</span>
                <span className="visually-hidden">(opens in a new tab)</span>
              </a>
              <p className="live-link__meta">
                <span className="visually-hidden">Link address: </span>
                <span className={`live-link__state ${secure ? 'is-secure' : 'is-insecure'}`}>
                  {secure ? 'HTTPS' : 'HTTP'}
                </span>
                <span className="live-link__host">{hostOf(project.liveLink)}</span>
              </p>
            </div>
          ) : (
            <p className="status-note">
              <span aria-hidden="true">⊘</span> No public live URL for this report
            </p>
          )}
        </div>
      </header>

      <dl className="case-summary-panel">
        <div>
          <dt>Category</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>Modules</dt>
          <dd>{project.modules.length} in scope</dd>
        </div>
        <div>
          <dt>Scenarios</dt>
          <dd>{passed} pass{warned > 0 ? ` · ${warned} warn` : ''}</dd>
        </div>
        <div>
          <dt>Defects</dt>
          <dd>{totalDefects} logged</dd>
        </div>
      </dl>

      <div className="case-study-layout">
        <aside className="story-index">
          <p className="eyebrow">On this page</p>
          <nav aria-label="Report sections">
            <ul>
              {SECTIONS.map((section, order) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={jumpTo(section.id)}
                    className={activeId === section.id ? 'is-active' : undefined}
                    aria-current={activeId === section.id ? 'location' : undefined}
                  >
                    <span className="story-index__num">{String(order + 1).padStart(2, '0')}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="study-body">
          <section id="overview" className="study-section">
            <h2>Overview</h2>
            <p>{project.description}</p>
          </section>

          <section id="scope" className="study-section">
            <h2>Scope</h2>
            <ul className="check-list">
              {project.modules.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
          </section>

          <section id="coverage" className="study-section">
            <h2>Coverage</h2>
            <p className="section-note">
              Illustrative spread across modules, shown for report layout rather than measured values.
            </p>
            <div className="coverage-bars">
              {project.modules.map((module, order) => {
                const value = 72 + ((order * 7) % 27);
                return (
                  <div className="coverage-bar-row" key={module}>
                    <span className="bar-label">{module}</span>
                    <div
                      className="coverage-bar-track"
                      role="img"
                      aria-label={`${module}: ${value} percent`}
                    >
                      <div className="coverage-bar-fill" style={{ width: `${value}%` }} />
                    </div>
                    <span className="bar-value">{value}%</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="scenarios" className="study-section">
            <h2>Scenarios</h2>
            <div className="table-scroll">
              <table className="scenario-table">
                <caption>Test scenarios executed for {project.name}</caption>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Scenario</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {project.scenarioRows.map((row) => (
                    <tr key={row.id}>
                      <th scope="row" className="mono">{row.id}</th>
                      <td>{row.scenario}</td>
                      <td className="scenario-table__type">{row.type}</td>
                      <td>
                        <span className={`pill pill--${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="defects" className="study-section">
            <h2>Defects</h2>
            <p className="section-note">{totalDefects} defects logged by severity during the test cycle.</p>
            <div className="defect-bars">
              {project.defects.map((defect) => (
                <div className="defect-item" key={defect.label}>
                  <span className="bar-label">{defect.label}</span>
                  <div
                    className="defect-track"
                    role="img"
                    aria-label={`${defect.label} severity: ${defect.value} defects`}
                  >
                    <div className={`defect-fill defect-fill--${defect.tone}`} style={{ width: `${Math.min(defect.value * 15, 100)}%` }} />
                  </div>
                  <span className="bar-value">{defect.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="tools" className="study-section">
            <h2>Tools</h2>
            <div className="tag-row">
              {project.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </section>

          <section id="outcome" className="study-section">
            <h2>Outcome</h2>
            <p>{project.outcome}</p>
          </section>
        </article>
      </div>

      <nav className="case-pager" aria-label="Project navigation">
        {previous ? (
          <Link to={`/work/${previous.slug}`} className="case-pager__link case-pager__link--prev">
            <span className="case-pager__dir">
              <span aria-hidden="true">←</span> Previous report
            </span>
            <span className="case-pager__name">{previous.name}</span>
            <span className="case-pager__cat">{previous.category}</span>
          </Link>
        ) : (
          <span className="case-pager__spacer" />
        )}

        {next ? (
          <Link to={`/work/${next.slug}`} className="case-pager__link case-pager__link--next">
            <span className="case-pager__dir">
              Next report <span aria-hidden="true">→</span>
            </span>
            <span className="case-pager__name">{next.name}</span>
            <span className="case-pager__cat">{next.category}</span>
          </Link>
        ) : (
          <span className="case-pager__spacer" />
        )}
      </nav>
    </main>
  );
}

export default CaseStudy;
