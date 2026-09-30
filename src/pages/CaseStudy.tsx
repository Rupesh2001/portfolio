import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((entry) => entry.slug === slug);

  useEffect(() => {
    if (project) {
      const anchor = window.location.hash.replace('#', '');
      if (anchor) {
        const target = document.getElementById(anchor);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [project, slug]);

  if (!project) {
    return (
      <main className="container page-shell">
        <h1>404 - EXPECTED PAGE, RECEIVED NOTHING</h1>
        <Link to="/work" className="button-link">Back to work</Link>
      </main>
    );
  }

  return (
    <main className="container case-study-shell">
      <div className="case-study-header">
        <p className="eyebrow">[ report / {project.slug} ]</p>
        <h1>{project.name}</h1>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.liveLink ? (
          <a className="button-link" href={project.liveLink} target="_blank" rel="noreferrer">
            Open live product
          </a>
        ) : (
          <span className="status-note">[INSECURE LINK] Live site unavailable or non-HTTPS</span>
        )}
      </div>

      <div className="case-summary-panel">
        <div>
          <span className="tiny-label">Primary objective</span>
          <p>{project.description}</p>
        </div>
        <div>
          <span className="tiny-label">Test strategy</span>
          <p>Mapped critical user paths, validated edge cases, and checked data integrity across both happy and failure flows.</p>
        </div>
      </div>

      <div className="case-study-layout">
        <aside className="story-index">
          <p className="eyebrow">Sections</p>
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#scope">Scope</a></li>
            <li><a href="#coverage">Coverage</a></li>
            <li><a href="#scenarios">Scenarios</a></li>
            <li><a href="#defects">Defects</a></li>
            <li><a href="#tools">Tools</a></li>
            <li><a href="#outcome">Outcome</a></li>
          </ul>
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
            <div className="coverage-bars" aria-label="Project coverage">
              {project.modules.map((module, index) => (
                <div className="coverage-bar-row" key={module}>
                  <span>{module}</span>
                  <div className="coverage-bar-track">
                    <div className="coverage-bar-fill" style={{ width: `${72 + (index * 7) % 27}%` }} />
                  </div>
                  <strong>{72 + (index * 7) % 27}%</strong>
                </div>
              ))}
            </div>
          </section>

          <section id="scenarios" className="study-section">
            <h2>Scenarios</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Scenario</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {project.scenarioRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.scenario}</td>
                    <td>{row.type}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section id="defects" className="study-section">
            <h2>Defects</h2>
            <div className="defect-bars">
              {project.defects.map((defect) => (
                <div className="defect-item" key={defect.label}>
                  <span>{defect.label}</span>
                  <div className="defect-track">
                    <div className={`defect-fill defect-fill--${defect.tone}`} style={{ width: `${Math.min(defect.value * 15, 100)}%` }} />
                  </div>
                  <strong>{defect.value}</strong>
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
    </main>
  );
}

export default CaseStudy;
