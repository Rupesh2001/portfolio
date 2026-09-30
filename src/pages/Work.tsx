import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const filterOptions = ['All', 'Web apps', 'ERP', 'E-commerce', 'Restaurant/POS'] as const;

function Work() {
  return (
    <main className="container page-shell">
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
            <div className="card-meta">
              <span>[{project.category}]</span>
              <span>{project.slug}</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Work;
