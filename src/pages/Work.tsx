import { Link } from 'react-router-dom';
import { ProjectCover } from '../components/ProjectCover';
import { projects } from '../data/projects';

const filterOptions = ['All', 'Web apps', 'ERP', 'E-commerce', 'Restaurant/POS'] as const;

function Work() {
  return (
    <main id="main" className="container page-shell">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Work archive</p>
          <h1>Test reports</h1>
        </div>
      </div>

      <div className="filter-row" aria-label="Project filters">
        {filterOptions.map((filter) => (
          <button key={filter} className="chip" type="button">
            {filter}
          </button>
        ))}
      </div>

      <div className="project-grid work-grid">
        {projects.map((project) => (
          <Link to={`/work/${project.slug}`} key={project.slug} className="project-card project-card--archive">
            <ProjectCover slug={project.slug} className="project-cover project-cover--archive" />
            <div className="project-overlay">
              <div className="card-meta">
                <span>[{project.category}]</span>
                <span>{project.slug}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Work;
