import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { category: "Core", items: ["HTML5 / CSS3", "JavaScript (ES6+)", "jQuery", "SASS / LESS", "Bootstrap"] },
  { category: "CMS & Platform", items: ["WordPress CMS", "Google AMP", "PWA Development", "WooCommerce"] },
  { category: "Frameworks", items: ["React.js", "TypeScript", "Next.js", "REST APIs"] },
  { category: "Standards", items: ["ADA / WCAG", "SEO Optimization", "Cross-browser", "Responsive Design"] },
  { category: "Tools", items: ["Git / GitHub", "Figma", "VS Code", "Webpack / Vite"] },
  { category: "Leadership", items: ["Team Management", "Code Reviews", "Agile / Scrum", "Mentoring"] },
];

const PROJECTS = [
  {
    title: "E-Commerce PWA",
    desc: "Built a Progressive Web App for a retail client with offline mode, push notifications, and 98/100 Lighthouse score. Boosted mobile conversions by 40%.",
    tags: ["PWA", "JavaScript", "SASS", "WooCommerce"],
    year: "2024",
    color: "#1a1a2e",
  },
  {
    title: "AMP News Portal",
    desc: "Developed a Google AMP-powered news portal with sub-second load times and full WCAG 2.1 AA accessibility compliance for 500K+ monthly readers.",
    tags: ["Google AMP", "WordPress", "ADA/WCAG", "SEO"],
    year: "2023",
    color: "#0f3460",
  },
  {
    title: "Component Design System",
    desc: "Architected a scalable frontend design system using React and TypeScript with Storybook documentation, used across 6 product teams.",
    tags: ["React", "TypeScript", "SASS", "Storybook"],
    year: "2023",
    color: "#16213e",
  },
  {
    title: "Multi-brand CMS Platform",
    desc: "Led a team of 4 developers to build a headless WordPress CMS serving 12 brand websites from a single codebase with custom Gutenberg blocks.",
    tags: ["WordPress", "Headless CMS", "JavaScript", "REST API"],
    year: "2022",
    color: "#1a1a2e",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Agency, Ahmedabad",
    period: "2020 – Present",
    points: [
      "Leading frontend team of 5 developers on enterprise-scale web projects",
      "Architecting accessible, AMP-optimized, and PWA-ready web experiences",
      "Implementing ADA/WCAG 2.1 compliance across all client deliverables",
      "Mentoring junior developers and conducting weekly code reviews",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Digital Studio, Ahmedabad",
    period: "2017 – 2020",
    points: [
      "Built 30+ custom WordPress themes with Bootstrap and SASS",
      "Improved page speed scores by average 55% across all projects",
      "Collaborated with UI/UX designers to pixel-perfect implementations",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Web Solutions, Gujarat",
    period: "2015 – 2017",
    points: [
      "Developed responsive HTML5/CSS3 layouts for SME clients",
      "Integrated third-party APIs and payment gateways",
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

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
    <span style={{ borderRight: "2px solid #e8c96a", paddingRight: 2 }}>
      {texts[idx].slice(0, char)}
    </span>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

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

  const handleForm = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0a0a0f", color: "#e8e6df", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0a0f; } ::-webkit-scrollbar-thumb { background: #e8c96a; border-radius: 2px; }
        .nav-link { cursor: pointer; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #9e9c96; transition: color 0.25s; padding: 4px 0; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #e8c96a; transition: width 0.3s; }
        .nav-link:hover, .nav-link.active { color: #e8c96a; } .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .skill-pill { display: inline-block; background: rgba(232,201,106,0.08); border: 1px solid rgba(232,201,106,0.2); color: #c8b87a; border-radius: 20px; padding: 5px 14px; font-size: 13px; margin: 4px; transition: all 0.25s; }
        .skill-pill:hover { background: rgba(232,201,106,0.18); border-color: #e8c96a; color: #e8c96a; transform: translateY(-1px); }
        .proj-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; transition: all 0.35s; cursor: default; position: relative; overflow: hidden; }
        .proj-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #e8c96a, transparent); opacity: 0; transition: opacity 0.35s; }
        .proj-card:hover { transform: translateY(-4px); border-color: rgba(232,201,106,0.25); background: rgba(255,255,255,0.055); }
        .proj-card:hover::before { opacity: 1; }
        .tag { display: inline-block; background: rgba(255,255,255,0.06); color: #9e9c96; border-radius: 6px; padding: 3px 10px; font-size: 11px; margin: 3px 2px; letter-spacing: 0.04em; }
        .exp-card { border-left: 2px solid rgba(232,201,106,0.3); padding-left: 24px; margin-bottom: 40px; position: relative; }
        .exp-card::before { content: ''; width: 10px; height: 10px; background: #e8c96a; border-radius: 50%; position: absolute; left: -6px; top: 4px; box-shadow: 0 0 12px rgba(232,201,106,0.5); }
        .contact-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px 16px; color: #e8e6df; font-size: 15px; outline: none; transition: border-color 0.25s; font-family: inherit; }
        .contact-input:focus { border-color: rgba(232,201,106,0.5); }
        .send-btn { background: #e8c96a; color: #0a0a0f; font-weight: 700; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; border: none; border-radius: 10px; padding: 14px 36px; cursor: pointer; transition: all 0.25s; }
        .send-btn:hover { background: #f0d47e; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(232,201,106,0.3); }
        .section-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(28px, 5vw, 44px); font-weight: 900; letter-spacing: -0.02em; color: #e8e6df; }
        .gold { color: #e8c96a; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(232,201,106,0.1); border: 1px solid rgba(232,201,106,0.25); border-radius: 20px; padding: 6px 16px; font-size: 13px; color: #c8b87a; letter-spacing: 0.04em; margin-bottom: 28px; }
        .glow-dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 8px #4ade80; animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%,100% { opacity:1; box-shadow: 0 0 8px #4ade80; } 50% { opacity:0.6; box-shadow: 0 0 16px #4ade80; } }
        .floating { animation: float 5s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .grid-bg { position: fixed; inset: 0; background-image: linear-gradient(rgba(232,201,106,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,201,106,0.03) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; z-index: 0; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 900; color: #e8c96a; line-height: 1; }
        .stat-label { font-size: 13px; color: #9e9c96; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 4px; }
        @media (max-width: 640px) { .hero-grid { flex-direction: column !important; } .stats-row { grid-template-columns: repeat(2, 1fr) !important; } .proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="grid-bg" />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s", background: scrolled ? "rgba(10,10,15,0.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", padding: "0 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div onClick={() => scrollTo("about")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e8c96a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#0a0a0f" }}>MA</div>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", color: "#e8e6df" }}>Mikdad Ali</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <span key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollTo(l)}>{l}</span>
            ))}
            <a href="mailto:ali.momin@email.com" style={{ background: "#e8c96a", color: "#0a0a0f", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 8, padding: "8px 20px", textDecoration: "none", transition: "all 0.25s" }}>Hire Me</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 5vw 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 60, justifyContent: "space-between" }}>
            <div style={{ flex: 1, maxWidth: 580 }}>
              <AnimatedSection>
                <div className="hero-badge"><div className="glow-dot" /> Available for new opportunities</div>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 20 }}>
                  Mikdad Ali <br /><span className="gold">Momin</span>
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "#9e9c96", marginBottom: 24, lineHeight: 1.6 }}>
                  <TypewriterText texts={["Senior Frontend Developer", "10+ Years of Experience", "Team Lead & Mentor", "ADA/WCAG Specialist", "PWA & AMP Expert"]} />
                </p>
              </AnimatedSection>
              <AnimatedSection delay={300}>
                <p style={{ fontSize: 16, color: "#7a7872", lineHeight: 1.8, marginBottom: 36 }}>
                  Based in <span style={{ color: "#c8b87a" }}>Ahmedabad, India</span> · Seeking Lead Frontend roles in <span style={{ color: "#c8b87a" }}>Dubai & internationally</span>. Crafting accessible, performant, and visually compelling web experiences for a decade.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={400}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <button onClick={() => scrollTo("Projects")} className="send-btn" style={{ borderRadius: 10 }}>View Projects</button>
                  <button onClick={() => scrollTo("Contact")} style={{ background: "transparent", border: "1px solid rgba(232,201,106,0.35)", color: "#e8c96a", fontWeight: 600, fontSize: 15, borderRadius: 10, padding: "13px 28px", cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.25s" }}>Get In Touch</button>
                </div>
              </AnimatedSection>
            </div>
            <div className="floating" style={{ flexShrink: 0 }}>
              <div style={{ width: 280, height: 280, borderRadius: "50%", background: "linear-gradient(135deg, rgba(232,201,106,0.12), rgba(232,201,106,0.03))", border: "1px solid rgba(232,201,106,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 220, height: 220, borderRadius: "50%", background: "linear-gradient(135deg, #1a1610, #0d0d16)", border: "1px solid rgba(232,201,106,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, color: "#e8c96a", lineHeight: 1 }}>10+</div>
                  <div style={{ fontSize: 12, color: "#9e9c96", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>Years of Code</div>
                </div>
                {/* orbit dots */}
                {[0,60,120,180,240,300].map((deg, i) => (
                  <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: i % 2 === 0 ? "#e8c96a" : "rgba(232,201,106,0.3)", top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`, boxShadow: i % 2 === 0 ? "0 0 8px #e8c96a" : "none" }} />
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <AnimatedSection delay={500}>
            <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 72, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 48 }}>
              {[["30+", "Projects Delivered"], ["10+", "Years Experience"], ["5+", "Team Members Led"], ["98", "Lighthouse Score"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8c96a", marginBottom: 12 }}>What I Know</p>
            <h2 className="section-title" style={{ marginBottom: 56 }}>Technical <span className="gold">Skills</span></h2>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {SKILLS.map((s, i) => (
              <AnimatedSection key={s.category} delay={i * 80}>
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px", height: "100%" }}>
                  <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#e8c96a", marginBottom: 16, fontWeight: 600 }}>{s.category}</div>
                  <div>{s.items.map(item => <span key={item} className="skill-pill">{item}</span>)}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "80px 5vw", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8c96a", marginBottom: 12 }}>What I've Built</p>
            <h2 className="section-title" style={{ marginBottom: 56 }}>Featured <span className="gold">Projects</span></h2>
          </AnimatedSection>
          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 100}>
                <div className="proj-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: p.color, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⬡</div>
                    <span style={{ fontSize: 12, color: "#5a5854", letterSpacing: "0.06em" }}>{p.year}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#e8e6df" }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#7a7872", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                  <div>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "80px 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8c96a", marginBottom: 12 }}>My Journey</p>
            <h2 className="section-title" style={{ marginBottom: 56 }}>Work <span className="gold">Experience</span></h2>
          </AnimatedSection>
          <div style={{ maxWidth: 720 }}>
            {EXPERIENCE.map((e, i) => (
              <AnimatedSection key={e.role} delay={i * 120}>
                <div className="exp-card">
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 19, fontWeight: 700, color: "#e8e6df" }}>{e.role}</h3>
                    <span style={{ fontSize: 13, color: "#e8c96a", background: "rgba(232,201,106,0.08)", borderRadius: 6, padding: "2px 10px" }}>{e.period}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#9e9c96", marginBottom: 16, fontStyle: "italic" }}>{e.company}</p>
                  <ul style={{ paddingLeft: 18 }}>
                    {e.points.map((pt, j) => (
                      <li key={j} style={{ fontSize: 14, color: "#7a7872", lineHeight: 1.75, marginBottom: 6 }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 5vw 100px", position: "relative", zIndex: 1, background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <AnimatedSection>
            <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8c96a", marginBottom: 12 }}>Let's Talk</p>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Get In <span className="gold">Touch</span></h2>
            <p style={{ color: "#7a7872", lineHeight: 1.8, marginBottom: 48 }}>
              Open to Lead Frontend Developer roles in Dubai and internationally. Visa sponsorship welcome. Let's build something extraordinary together.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div style={{ display: "flex", gap: 20, marginBottom: 48, flexWrap: "wrap" }}>
              {[["📍", "Ahmedabad, India"], ["✉️", "ali.momin@email.com"], ["💼", "Open to Relocation"]].map(([ico, txt]) => (
                <div key={txt} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 16px", fontSize: 14, color: "#9e9c96" }}>
                  <span>{ico}</span>{txt}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <p style={{ fontSize: 18, color: "#e8c96a", fontWeight: 600 }}>Message sent! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleForm}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "#9e9c96", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>NAME</label>
                    <input className="contact-input" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "#9e9c96", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>EMAIL</label>
                    <input className="contact-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, color: "#9e9c96", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>MESSAGE</label>
                  <textarea className="contact-input" rows={5} placeholder="Tell me about the role or project..." style={{ resize: "vertical" }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                </div>
                <button type="submit" className="send-btn">Send Message →</button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: 13, color: "#5a5854" }}>© 2025 Mikdad Ali Momin · Senior Frontend Developer</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["LinkedIn", "GitHub", "Behance"].map(s => (
            <span key={s} style={{ fontSize: 13, color: "#9e9c96", cursor: "pointer", letterSpacing: "0.04em", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = "#e8c96a"} onMouseOut={e => e.target.style.color = "#9e9c96"}>{s}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
