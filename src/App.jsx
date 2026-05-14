import { useState, useEffect, useRef } from "react";
import "./App.css";
import logo from "./assets/logo.png";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { category: "Core",           items: ["HTML5 / CSS3", "JavaScript (ES6+)", "jQuery", "SASS / LESS", "Bootstrap"] },
  { category: "CMS & Platform", items: ["WordPress CMS", "Google AMP", "PWA Development", "WooCommerce"] },
  { category: "Frameworks",     items: ["React.js", "TypeScript", "Bootstrap", "UIKit", "Skeleton"] },
  { category: "Standards",      items: ["ADA / WCAG", "SEO Optimization", "Cross-browser", "Responsive Design"] },
  { category: "Tools",          items: ["Git / GitHub", "Figma", "Adobe XD", "Adobe Photoshop", "VS Code"] },
  { category: "Leadership",     items: ["Team Management", "Code Reviews", "Client Communication", "Mentoring"] },
];

const PROJECTS = [
  {
    title: "Old Point Bank",
    url: "https://www.oldpoint.com/",
    desc: "Full project handling from start to end. Built a fully responsive banking website using UIKit and CMS with a focus on performance and accessibility.",
    tags: ["UIKit", "Responsive", "CMS", "Full Project"],
    year: "2023",
    color: "#0f3460",
  },
  {
    title: "TiEcon",
    url: "https://www.tiecon.org/",
    desc: "Developed a fully responsive website for one of the world's largest entrepreneurship conferences using UIKit and CMS.",
    tags: ["UIKit", "Responsive", "CMS", "Full Project"],
    year: "2022",
    color: "#1a1a2e",
  },
  {
    title: "Nissan Mexico Dealership",
    url: "https://www.nissanlazarocardenas.com.mx/",
    desc: "Built a responsive automotive dealership website with full CMS integration and custom inventory management functionality.",
    tags: ["UIKit", "Responsive", "CMS", "Inventory"],
    year: "2022",
    color: "#16213e",
  },
  {
    title: "Shaadi By Marriott Bonvoy",
    url: "https://www.marriottindiaweddings.com/",
    desc: "Developed a luxury wedding platform for Marriott with a full reservation and booking engine, responsive design, and CMS.",
    tags: ["UIKit", "Booking Engine", "CMS", "Responsive"],
    year: "2021",
    color: "#0f3460",
  },
  {
    title: "Lonnie's Reno Club",
    url: "https://www.lonniesrenoclub.com/",
    desc: "Built a hospitality website with a full booking engine and CMS for a renowned entertainment and dining venue.",
    tags: ["UIKit", "Booking Engine", "CMS", "Responsive"],
    year: "2021",
    color: "#1a1a2e",
  },
  {
    title: "Velas Resort",
    url: "https://www.velasresorts.com.mx/",
    desc: "Developed a luxury resort website with booking engine, eCommerce, blog, and CMS — full end-to-end frontend development.",
    tags: ["UIKit", "Booking Engine", "CMS", "eCommerce", "Blog"],
    year: "2020",
    color: "#16213e",
  },
];

const EXPERIENCE = [
  {
    role: "Sr. Frontend Developer",
    company: "Milestone Inc., Ahmedabad",
    period: "2018 – Present",
    points: [
      "Developing fully functional websites for Hospitality, Automotive, and Finance sectors using the latest frontend technologies",
      "Building Google AMP pages and ADA compliance websites with fully responsive layouts",
      "Leading frontend team of 5 developers on enterprise-scale web projects",
      "Architecting accessible, AMP-optimized, and PWA-ready web experiences",
      "Implementing ADA/WCAG 2.1 compliance across all client deliverables",
      "Mentoring junior developers and conducting weekly code reviews",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Ebusinessguru (Hrimtech Solution), Ahmedabad",
    period: "2017 – 2018",
    points: [
      "Built eCommerce stores using Magento 1.9 and dynamic websites using WordPress",
      "Handled client communication for eBay templates and storefront projects",
      "Improved page speed scores by an average of 55% across all projects",
      "Collaborated with UI/UX designers for pixel-perfect implementations",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Softshil Infotech, Anand",
    period: "2015 – 2017",
    points: [
      "Created designs using Adobe Photoshop and converted them into fully functional websites",
      "Worked on ASP.Net with MVC and built an eCommerce store using nopCommerce",
      "Developed responsive HTML5/CSS3 layouts for SME clients",
      "Integrated third-party APIs and payment gateways",
    ],
  },
];

const EDUCATION = [
  {
    degree: "BE in Information Technology",
    school: "SVMIT, Bharuch",
    year: "2011",
  },
  {
    degree: "HSC",
    school: "D.N High School, Anand",
    year: "2007",
  },
  {
    degree: "SSC",
    school: "St. Xavier's High School, Anand",
    year: "2005",
  },
];

/* ── Hooks ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Sub-components ── */
function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TypewriterText({ texts }) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!deleting && char < texts[idx].length) {
        setChar(c => c + 1);
      } else if (!deleting && char === texts[idx].length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && char > 0) {
        setChar(c => c - 1);
      } else if (deleting && char === 0) {
        setDeleting(false);
        setIdx(i => (i + 1) % texts.length);
      }
    }, deleting ? 45 : 90);
    return () => clearTimeout(t);
  });

  return (
    <span className="typewriter-cursor">
      {texts[idx].slice(0, char)}
    </span>
  );
}

/* ── Main Component ── */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [form, setForm]           = useState({ name: "", email: "", message: "" });
  const [sent, setSent]           = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveNav(id);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5772a458-0ab5-46f2-811c-27a423d68888",
          name:    form.name,
          email:   form.email,
          message: form.message,
          subject: `Someone loved your work — new message from ${form.name}`,
          replyto: form.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="portfolio-root">
      <div className="grid-bg" />

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("about")}>
            <img src={logo} alt="MikdadAli Logo" className="nav-logo-image"/>
          </div>
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <span
                key={l}
                className={`nav-link${activeNav === l ? " active" : ""}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </span>
            ))}
            <a href="mailto:mikdad.momin121@gmail.com" className="nav-hire-btn">
              Hire Me
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" className="hero-section">
        <div className="hero-inner">
          <div className="hero-grid">
            <div className="hero-content">
              <AnimatedSection>
                <div className="hero-badge">
                  <div className="glow-dot" />
                  Available for new opportunities
                </div>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <h1 className="hero-title">
                  Mikdad Ali <br />
                  <span className="gold">Momin</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <p className="hero-typewriter">
                  <TypewriterText
                    texts={[
                      "Sr. Frontend Developer",
                      "10+ Years of Experience",
                      "ADA / WCAG Specialist",
                      "Google AMP & PWA Expert",
                      "UI Wireframe Architect",
                      "Team Lead & Mentor",
                    ]}
                  />
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <p className="hero-description">
                  Based in <span className="hero-highlight">Sarkhej, Ahmedabad</span> — Frontend Developer with 10+ years of experience building accessible, high-performance, and visually engaging web experiences for Hospitality, Automotive, and Finance sectors. Passionate about AMP, PWA, ADA compliance, and delivering pixel-perfect responsive interfaces.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="hero-cta">
                  <button onClick={() => scrollTo("Projects")} className="send-btn">
                    View Projects
                  </button>
                  <button onClick={() => scrollTo("Contact")} className="btn-outline">
                    Get In Touch
                  </button>
                </div>
              </AnimatedSection>
            </div>

            {/* Orbit graphic */}
            <div className="hero-graphic floating">
              <div className="orbit-outer">
                <div className="orbit-inner">
                  <div className="orbit-years">10+</div>
                  <div className="orbit-label">Years of Code</div>
                </div>
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={i}
                    className="orbit-dot"
                    style={{
                      background: i % 2 === 0 ? "#e8c96a" : "rgba(232,201,106,0.3)",
                      transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`,
                      boxShadow: i % 2 === 0 ? "0 0 8px #e8c96a" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <AnimatedSection delay={500}>
            <div className="stats-row">
              {[
                ["10+", "Years Experience"],
                ["50+", "Projects Delivered"],
                ["3",   "Companies"],
                ["98",  "Lighthouse Score"],
              ].map(([n, l]) => (
                <div key={l} className="stat-item">
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="skills-section">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">What I Know</p>
            <h2 className="section-title" style={{ marginBottom: 56 }}>
              Technical <span className="gold">Skills</span>
            </h2>
          </AnimatedSection>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <AnimatedSection key={s.category} delay={i * 80}>
                <div className="skill-card">
                  <div className="skill-card-category">{s.category}</div>
                  <div>
                    {s.items.map(item => (
                      <span key={item} className="skill-pill">{item}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="projects-section">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">What I've Built</p>
            <h2 className="section-title" style={{ marginBottom: 56 }}>
              Featured <span className="gold">Projects</span>
            </h2>
          </AnimatedSection>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 100}>
                <div className="proj-card">
                  <div className="proj-card-header">
                    <div className="proj-icon" style={{ background: p.color }}>⬡</div>
                    <span className="proj-year">{p.year}</span>
                  </div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-link">
                      View Live →
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="experience-section">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">My Journey</p>
            <h2 className="section-title" style={{ marginBottom: 56 }}>
              Work <span className="gold">Experience</span>
            </h2>
          </AnimatedSection>
          <div className="exp-list">
            {EXPERIENCE.map((e, i) => (
              <AnimatedSection key={e.company} delay={i * 120}>
                <div className="exp-card">
                  <div className="exp-card-header">
                    <h3 className="exp-role">{e.role}</h3>
                    <span className="exp-period">{e.period}</span>
                  </div>
                  <p className="exp-company">{e.company}</p>
                  <ul className="exp-points">
                    {e.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Education */}
          <AnimatedSection delay={200}>
            <p className="section-label" style={{ marginTop: 72 }}>Academic Background</p>
            <h2 className="section-title" style={{ marginBottom: 40 }}>
              <span className="gold">Education</span>
            </h2>
          </AnimatedSection>
          <div className="edu-grid">
            {EDUCATION.map((ed, i) => (
              <AnimatedSection key={ed.degree} delay={i * 100}>
                <div className="edu-card">
                  <div className="edu-year">{ed.year}</div>
                  <div className="edu-degree">{ed.degree}</div>
                  <div className="edu-school">{ed.school}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

{/* ── CV DOWNLOAD ── */}
<section className="cv-section">
  <div className="section-inner">
    <AnimatedSection>
      <div className="cv-card">
        <div className="cv-card-left">
          <div className="cv-icon">📄</div>
          <div>
            <h2 class="section-title">My <span class="gold">Resume / CV</span></h2>
            <p className="cv-subtitle">Sr. Frontend Developer · 10+ Years Experience · Ahmedabad, India</p>
            <div className="cv-tags">
              {["HTML5", "CSS3", "JavaScript", "React", "AMP", "PWA", "WordPress", "ADA/WCAG"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
         <a href="/mikdad-ali-momin-cv.pdf"
          download="Mikdad-Ali-Momin-CV.pdf"
          className="cv-download-btn"
        >
          <span className="cv-download-icon">↓</span>
          Download CV
        </a>
      </div>
    </AnimatedSection>
  </div>
</section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">Let's Talk</p>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Get In <span className="gold">Touch</span>
            </h2>
            <p className="contact-intro">
              Open to Senior Frontend Developer roles locally and internationally. Let's build something extraordinary together.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="contact-info-row">
              {[
                ["📍", "Sarkhej, Ahmedabad"],
                ["✉️", "mikdad.momin121@gmail.com"],
                ["📞", "+91-98983 91472"],
                ["💼", "Open to Opportunities"],
              ].map(([ico, txt]) => (
                <div key={txt} className="contact-info-item">
                  <span>{ico}</span>{txt}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            {sent ? (
              <div className="success-msg">
                <div className="success-icon">✅</div>
                <p className="success-text">Message sent! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleForm}>
                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      className="contact-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      className="contact-input"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="form-group form-message-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="contact-input contact-textarea"
                    rows={5}
                    placeholder="Tell me about the role or project..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="send-btn">
                  Send Message →
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p className="footer-copy">© {new Date().getFullYear()} Mikdad Ali Momin · Sr. Frontend Developer</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/mikdadali" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://github.com/mikdadali" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://upwork.com/freelancers/mikdadalimomin" target="_blank" rel="noopener noreferrer" className="footer-link">Upwork</a>
        </div>
      </footer>
    </div>
  );
}
