import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion, AnimatePresence, useScroll, useSpring, useTransform,
  useInView, useReducedMotion, animate,
} from "framer-motion";
import { PROFILE, STATS, SKILLS, PROJECTS, EXPERIENCE, TESTIMONIAL, RESUME, CLIENTS, SERVICES, EDUCATION } from "./data.js";
import { SOCIALS } from "./config.js";
import ContactForm from "./ContactForm.jsx";

const NAV = [
  ["about", "About"],
  ["skills", "Skills"],
  ["work", "Work"],
  ["experience", "Experience"],
  ["resume", "Resume"],
  ["contact", "Contact"],
];

/* ---------- Nav + scroll progress ---------- */
function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <header className="nav">
      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
      <a href="#top" className="brand">Mikdadali<span>.</span></a>
      <nav aria-label="Primary">
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "true" : undefined}>
            {label}
            {active === id && <motion.i layoutId="nav-dot" className="nav-dot" />}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ---------- Hero: a lamp that lights the headline ---------- */
function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const idle = useRef(true);
  const timer = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) { el?.style.setProperty("--r", "200vmax"); return; }
    let raf, t = 0;
    const tick = () => {
      if (idle.current) {
        t += 0.006;
        el.style.setProperty("--mx", `${50 + Math.sin(t) * 34}%`);
        el.style.setProperty("--my", `${46 + Math.sin(t * 1.7) * 14}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onMove = (e) => {
    if (reduce) return;
    const b = ref.current.getBoundingClientRect();
    idle.current = false;
    ref.current.style.setProperty("--mx", `${((e.clientX - b.left) / b.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - b.top) / b.height) * 100}%`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => (idle.current = true), 1800);
  };

  const words = PROFILE.headline.split(" ");
  return (
    <section id="top" className="hero" ref={ref} onPointerMove={onMove}>
      <div className="stars" aria-hidden="true" />
      <div className="hero-inner">
        <motion.p className="hero-role" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {PROFILE.role}
        </motion.p>
        <h1 className="hero-title" aria-label={PROFILE.headline}>
          <span className="layer dim" aria-hidden="true">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="w">{w}</span>{" "}
              </Fragment>
            ))}
          </span>
          <span className="layer lit" aria-hidden="true">
            {words.map((w, i) => (
              <Fragment key={i}>
                <motion.span className="w" initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
                  {w}
                </motion.span>{" "}
              </Fragment>
            ))}
          </span>
        </h1>
        <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          {PROFILE.intro}
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <a className="btn btn-lamp" href="#contact">Start a project</a>
          <a className="btn btn-ghost-dark" href="#work">See my work</a>
        </motion.div>
      </div>
      <Lighthouse />
    </section>
  );
}

function Lighthouse() {
  return (
    <svg className="lighthouse" viewBox="0 0 120 260" aria-hidden="true">
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <path d="M44 250 L52 90 H68 L76 250Z" fill="#E8EEF3" />
        <path d="M49 150 L51 120 H69 L71 150Z M46 210 L48 182 H72 L74 210Z" fill="#C9473D" />
        <rect x="46" y="82" width="28" height="9" rx="2" fill="#12304A" />
        <rect x="50" y="56" width="20" height="26" fill="#FFB938" className="lamp-glass" />
        <path d="M46 56 L60 36 L74 56Z" fill="#12304A" />
        <rect x="30" y="248" width="60" height="8" rx="3" fill="#12304A" />
      </motion.g>
    </svg>
  );
}

/* ---------- helpers ---------- */
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const reduce = useReducedMotion();
  const M = motion[Tag];
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </M>
  );
}

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about-grid">
        <Reveal>
          <h2>Ten years of making the web work for everyone</h2>
          <p className="lead">
            I build for hospitality, automotive, and finance brands where speed, accessibility, and polish all matter at once.
            I lead a team of five, write ADA/WCAG 2.1 compliance into every delivery, and ship AMP and PWA experiences that stay fast.
          </p>
        </Reveal>
        <dl className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat">
              <dt>{s.label}</dt>
              <dd><CountUp to={s.value} suffix={s.suffix} /></dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Client strip ---------- */
function ClientStrip() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <section className="strip" aria-label="Brands I have built for">
      <p className="strip-label">Brands I've built for</p>
      <div className="strip-track" aria-hidden="true">
        <ul>
          {items.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
      <ul className="sr-only">{CLIENTS.map((c) => <li key={c}>{c}</li>)}</ul>
    </section>
  );
}

/* ---------- Services + Lighthouse gauge ---------- */
function Gauge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const C = 2 * Math.PI * 52;
  return (
    <div className="gauge" ref={ref}>
      <svg viewBox="0 0 120 120" role="img" aria-label="Lighthouse performance score: 98 out of 100">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#ffffff22" strokeWidth="9" />
        <motion.circle cx="60" cy="60" r="52" fill="none" stroke="var(--lamp)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={inView ? { strokeDashoffset: C * 0.02 } : {}}
          transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }} transform="rotate(-90 60 60)" />
      </svg>
      <span className="gauge-num"><CountUp to={98} suffix="" /></span>
      <p>Lighthouse performance score</p>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <Reveal><h2>What I can build for you</h2></Reveal>
        <div className="services-grid">
          <Reveal className="gauge-card"><Gauge /></Reveal>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i + 1) * 0.08} className="service">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Back to top ---------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#top" className="to-top" aria-label="Back to top" initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.8 }} whileHover={{ y: -4 }}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 19V5m0 0l-6 6m6-6l6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const groups = Object.keys(SKILLS);
  const [g, setG] = useState(groups[0]);
  return (
    <section id="skills" className="section tint">
      <div className="wrap">
        <Reveal><h2>Technical skills</h2></Reveal>
        <div className="tabs" role="tablist" aria-label="Skill groups">
          {groups.map((k) => (
            <button key={k} role="tab" id={`tab-${k}`} aria-selected={g === k} aria-controls="skill-panel" className={g === k ? "on" : ""} onClick={() => setG(k)}>
              {g === k && <motion.span layoutId="tab-bg" className="tab-bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span>{k}</span>
            </button>
          ))}
        </div>
        <div id="skill-panel" role="tabpanel" aria-labelledby={`tab-${g}`} className="skill-panel">
          <AnimatePresence mode="wait">
            <motion.ul key={g} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {SKILLS[g].map((s, i) => (
                <motion.li key={s} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 22 }} whileHover={{ y: -4 }}>
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects: expanding rows ---------- */
function Projects() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal><h2>Featured projects</h2></Reveal>
        <ul className="projects">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={p.title} delay={i * 0.06} className={`project ${isOpen ? "open" : ""}`}>
                <button className="project-head" aria-expanded={isOpen} aria-controls={`proj-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="project-year">{p.year || "—"}</span>
                  <span className="project-title">{p.title}</span>
                  <span className="plus" aria-hidden="true">
                    <motion.svg viewBox="0 0 24 24" width="20" height="20" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                      <path d="M12 4v16M4 12h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </motion.svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`proj-${i}`} className="project-body" initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
                      <div className="project-inner">
                        <p>{p.text}</p>
                        {p.url && (
                          <a className="visit" href={p.url} target="_blank" rel="noreferrer">
                            Visit {new URL(p.url).hostname.replace("www.", "")}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                        <ul className="tags">
                          {p.tags.map((t, k) => (
                            <motion.li key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.05 }}>{t}</motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Experience: line draws as you scroll ---------- */
function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="experience" className="section tint">
      <div className="wrap">
        <Reveal><h2>Work experience</h2></Reveal>
        <div className="timeline" ref={ref}>
          <div className="rail" aria-hidden="true"><motion.div className="rail-fill" style={{ height: h }} /></div>
          {EXPERIENCE.map((x) => (
            <Reveal key={x.role + x.company} className="job">
              <span className="job-dot" aria-hidden="true" />
              <h3>{x.role}</h3>
              <p className="job-meta">{x.company} · {x.period}</p>
              <ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="edu">
          <h3>Education</h3>
          <p>{EDUCATION}</p>
        </Reveal>
        <Reveal className="quote">
          <blockquote>
            <p>“{TESTIMONIAL.quote}”</p>
            <footer>{TESTIMONIAL.who}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Resume ---------- */
function Resume() {
  const href = `${import.meta.env.BASE_URL}${RESUME.file}`;
  return (
    <section id="resume" className="section resume">
      <div className="wrap resume-card">
        <Reveal className="resume-text">
          <h2>Take my resume with you</h2>
          <p className="lead">{RESUME.summary}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.a className="btn btn-lamp btn-xl" href={href} download whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M12 3v12m0 0l-5-5m5 5l5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download resume (PDF)
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap contact-grid">
        <Reveal>
          <h2>Let's build something that works for everyone</h2>
          <p className="lead">Tell me what you're working on. I'll reply with next steps.</p>
          <p className="contact-more">
            I'm a Sr. Frontend Developer Level 2 with 10+ years of experience building accessible, fast websites for
            hospitality, automotive, finance, and healthcare brands. Whether you need a new site, an ADA/WCAG
            accessibility review, an AMP or PWA build, or an experienced hand to lead your frontend team, I'd like to hear about it.
          </p>
          <p className="contact-more">
            To get a useful reply quickly, include what you're building, your timeline, and a link to your current site if you have one.
          </p>
          <p className="where">Ahmedabad, India</p>
          <p className="links">
            <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={SOCIALS.github} target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="card-form"><ContactForm /></Reveal>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <ClientStrip />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Mikdadali Momin. All rights reserved.</p>
      </footer>
      <BackToTop />
    </>
  );
}
