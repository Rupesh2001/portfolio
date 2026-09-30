import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import profilePhoto from '../../img/profile.jpg';
import studioPhoto from '../../img/aa.jpg';
import { profile, runHighlights } from '../data/profile';
import { selectedProjects } from '../data/projects';

const pageTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

function Home() {
  return (
    <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={pageTransition}>
      <section className="hero-shell">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">[ Quality assurance / web performance ]</p>
            <h1>
              Hi, I&apos;m <span>Rupesh Mahat</span>
            </h1>
            <p className="lede">
              I build and validate reliable digital products for businesses that need smooth workflows, clean releases, and strong user trust.
            </p>
            <div className="hero-actions">
              <a className="button-link" href="#work">View My Work</a>
              <a className="button-link button-link--ghost" href="/Rupesh_Mahat_CV.pdf" download>Download CV</a>
            </div>
            <ul className="meta-list">
              <li>Location: {profile.location}</li>
              <li>Stack: Selenium + Python + JMeter + Jira</li>
            </ul>
            <div className="hero-badges" aria-label="Focus areas">
              <span>Automation</span>
              <span>Regression</span>
              <span>API</span>
              <span>Manual QA</span>
            </div>
            <div className="hero-stats" aria-label="Quality highlights">
              {runHighlights.map((item) => (
                <div key={item.label} className="hero-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Rupesh Mahat profile portrait">
            <div className="portrait-shell">
              <img src={profilePhoto} alt="Rupesh Mahat portrait" />
            </div>
            <div className="mini-panel">
              <div>
                <span className="tiny-label">[LIVE]</span>
                <strong>Regression checks</strong>
              </div>
              <em>47/47</em>
            </div>
            <div className="studio-flag">
              <img src={studioPhoto} alt="QA studio environment" />
            </div>
          </div>
        </div>
      </section>

      <section className="container info-section" id="about">
        <div className="section-heading flex-heading">
          <p className="eyebrow">About me</p>
          <h2>Quality-first execution.</h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <p>{profile.profile}</p>
            <p>
              I support release quality across web systems, ERP workflows, POS platforms, and service products by combining manual validation with automation, API checks, and regression tracking.
            </p>
            <p>
              My work helps teams catch the right issues early, document them clearly, and move faster with more confidence in product quality.
            </p>
            <div className="social-row">
              <a href="https://linkedin.com/in/rupesh-mahat" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/Rupesh2001" target="_blank" rel="noreferrer">GitHub</a>
              <a href="mailto:rmmahat2010@gmail.com">Email</a>
            </div>
          </div>

          <div className="info-panel">
            <div className="info-panel-row">
              <span>Role</span>
              <strong>QA Engineer</strong>
            </div>
            <div className="info-panel-row">
              <span>Location</span>
              <strong>{profile.location}</strong>
            </div>
            <div className="info-panel-row">
              <span>Contact</span>
              <strong>rmmahat2010@gmail.com</strong>
            </div>
            <div className="info-panel-row">
              <span>Availability</span>
              <strong>Full-time / freelance</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="container info-section">
        <div className="section-heading">
          <p className="eyebrow">Quality workflow</p>
          <h2>How each release gets checked.</h2>
        </div>
        <div className="process-grid">
          <article className="process-card">
            <span className="card-index">01</span>
            <h3>Requirement analysis</h3>
            <p>I read the flow, identify edge cases, and map the user journey before automation begins.</p>
          </article>
          <article className="process-card">
            <span className="card-index">02</span>
            <h3>Coverage planning</h3>
            <p>Manual checks cover UX, transactions, and data integrity while automation protects repeated flows.</p>
          </article>
          <article className="process-card">
            <span className="card-index">03</span>
            <h3>Bug reporting</h3>
            <p>Defects are tracked with impact, priority, and reproduction detail so the team can resolve fast.</p>
          </article>
        </div>
      </section>

      <section className="container info-section">
        <div className="section-heading">
          <p className="eyebrow">Run log</p>
          <h2>Experience</h2>
        </div>

        <div className="timeline">
          {profile.experience.map((job) => (
            <article key={`${job.role}-${job.company}`} className="timeline-item">
              <div className="timeline-header">
                <span className="timeline-tag">[{job.period}]</span>
                <h3>{job.role}</h3>
              </div>
              <p className="company-line">{job.company} — {job.location}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container info-section">
        <div className="section-heading">
          <p className="eyebrow">Test matrix</p>
          <h2>Skills</h2>
        </div>
        <div className="skill-grid">
          {profile.skills.map((group) => (
            <div className="skill-card" key={group.label}>
              <p className="mini-label">[{group.label}]</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container info-section" id="work">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Featured projects</p>
            <h2>Release candidates.</h2>
          </div>
          <Link to="/work" className="text-link">Swipe to explore →</Link>
        </div>

        <div className="project-grid">
          {selectedProjects.map((project, index) => (
            <Link
              to={`/work/${project.slug}`}
              key={project.slug}
              className="project-card"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(11,17,23,0.25), rgba(11,17,23,0.9)), url(${index % 2 === 0 ? profilePhoto : studioPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
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
      </section>

      <section className="container info-section">
        <div className="section-heading">
          <p className="eyebrow">Training & education</p>
          <h2>Certifications and study notes.</h2>
        </div>
        <div className="two-col-boxes">
          <div className="stack-box">
            <h3>Training</h3>
            <ul>
              {profile.training.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="stack-box">
            <h3>Education</h3>
            <ul>
              {profile.education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="note">{profile.other}</p>
          </div>
        </div>
      </section>
    </motion.main>
  );
}

export default Home;
