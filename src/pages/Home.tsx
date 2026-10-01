import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroPortrait } from '../components/HeroPortrait';
import { ProjectCover } from '../components/ProjectCover';
import { emphasis } from '../lib/emphasis';
import { profile, runHighlights } from '../data/profile';
import { selectedProjects } from '../data/projects';
import { CoverageField, StaticField } from '../three/CoverageField';
import { useCan3D } from '../three/useCan3D';

const toolItems = ['Selenium', 'Python', 'Postman', 'JMeter', 'Jira', 'Trello', 'Git', 'MySQL', 'PostgreSQL'];
const focusAreas = ['Automation', 'Regression', 'API testing', 'Manual QA'];

const EASE = [0.22, 1, 0.36, 1] as const;

function Home({ ready = true }: { ready?: boolean }) {
  const can3D = useCan3D();
  const reduce = useReducedMotion();

  const group: Variants = reduce
    ? { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.075, delayChildren: 0.12 } } };

  const rise: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

  return (
    <main id="main" className="home-page">
      <section className="hero-shell">
        <div className="hero-stage" aria-hidden="true">
          {ready && can3D ? <CoverageField active /> : <StaticField className="static-field" />}
        </div>
        <div className="hero-veil" aria-hidden="true" />

        <div className="container hero-grid">
          <motion.div className="hero-copy" variants={group} initial="hidden" animate={ready ? 'show' : 'hidden'}>
            <motion.p className="eyebrow" variants={rise}>
              <span className="eyebrow__dot" aria-hidden="true" />
              § 01 / QA &amp; AUTOMATION
            </motion.p>

            <motion.h1 className="hero-title" variants={rise}>
              <span className="hero-title__line">Rupesh</span>
              <span className="hero-title__line">
                <em className="hero-title__accent">
                  Mahat
                  <motion.i
                    className="hero-title__rule"
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: ready ? 1 : 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                  />
                </em>
              </span>
            </motion.h1>

            <motion.p className="hero-subtitle" variants={rise}>
              Quality Assurance &amp; Automation Engineer
            </motion.p>

            <motion.p className="lede" variants={rise}>
              I find the bugs in ERP, POS and e-commerce systems before customers do.
            </motion.p>

            <motion.div className="hero-actions" variants={rise}>
              <a className="button-link button-link--primary" href="#work">
                View test reports
                <span className="button-link__arrow" aria-hidden="true">→</span>
              </a>
              <a className="button-link button-link--ghost" href="/Rupesh_Mahat_CV.pdf" download>
                Download CV
              </a>
            </motion.div>

            <motion.ul className="meta-list" variants={rise}>
              <li>{profile.location}</li>
              <li>Selenium · Python · JMeter · Jira</li>
            </motion.ul>

            <motion.div className="tool-marquee" variants={rise}>
              <ul className="tool-track" aria-label="Core tools">
                {toolItems.map((item) => (
                  <li key={item} className="tool-chip">
                    <span className="tool-icon" aria-hidden="true">◆</span>
                    {item}
                  </li>
                ))}
                {toolItems.map((item) => (
                  <li key={`${item}-dup`} className="tool-chip" aria-hidden="true">
                    <span className="tool-icon" aria-hidden="true">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.ul className="hero-badges" variants={rise} aria-label="Focus areas">
              {focusAreas.map((area) => (
                <li key={area} className="hero-badge">
                  <span className="hero-badge__dot" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </motion.ul>

            <motion.dl className="hero-stats" variants={rise} aria-label="Quality highlights">
              {runHighlights.map((item) => (
                <div key={item.label} className="hero-stat">
                  <dt className="hero-stat__label">{item.label}</dt>
                  <dd className="hero-stat__value">{item.value}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div className="hero-visual" variants={group} initial="hidden" animate={ready ? 'show' : 'hidden'}>
            <HeroPortrait />

            <div className="field-legend">
              <p className="field-legend__title">Coverage field</p>
              <ul className="field-legend__list">
                <li><span className="swatch swatch--pass" aria-hidden="true" />Pass</li>
                <li><span className="swatch swatch--defect" aria-hidden="true" />Defect</li>
                <li><span className="swatch swatch--idle" aria-hidden="true" />Idle</li>
              </ul>
              <p className="field-legend__hint">Sweep the pointer across the field to flag a regression.</p>
            </div>
          </motion.div>
        </div>

        <motion.a
          className="scroll-cue"
          href="#about"
          initial={false}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
        >
          <span className="scroll-cue__rail" aria-hidden="true" />
          <span className="scroll-cue__label">Scroll</span>
        </motion.a>
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
                <span className="timeline-tag">{job.period}</span>
                <h3>{job.role}</h3>
              </div>
              <p className="company-line"><strong>{job.company}</strong> · {job.location}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{emphasis(bullet)}</li>
                ))}
              </ul>
              {job.stack && (
                <div className="tag-row">
                  {job.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              )}
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
            <h2>Selected test reports.</h2>
          </div>
          <Link to="/work" className="text-link">Swipe to explore →</Link>
        </div>

        <div className="project-grid">
          {selectedProjects.map((project) => (
            <Link to={`/work/${project.slug}`} key={project.slug} className="project-card">
              <ProjectCover slug={project.slug} />
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
    </main>
  );
}

export default Home;
