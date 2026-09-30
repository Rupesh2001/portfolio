import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-top">
        <div className="brand-block">
          <div className="brand brand--footer">
            <span className="brand-mark">P</span>
            <span className="brand-name">PORTFOL.IO</span>
          </div>
          <p>
            A showcase of modern web engineering, focused on high-performance architecture and premium user experience.
          </p>
        </div>

        <div className="footer-col">
          <p className="eyebrow">Sitemap</p>
          <ul className="footer-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/work">Work Gallery</Link></li>
            <li><a href="/Rupesh_Mahat_CV.pdf" download>Download CV</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="eyebrow">Connect</p>
          <ul className="footer-list">
            <li><a href="mailto:rmmahat2010@gmail.com">Email</a></li>
            <li><a href="https://linkedin.com/in/rupesh-mahat" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/Rupesh2001" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Crafted with precision.</span>
      </div>
    </footer>
  );
}
