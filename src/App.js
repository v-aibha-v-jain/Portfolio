import { useState, useEffect } from 'react';
import './home.css';
import profileImage from './assets/images/profile.webp';
import portfolioData from './data/portfolio.json';
import workData from './data/work.json';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/* ─────────────────────────────────
   Constants
───────────────────────────────── */
const socialLinks = [
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/vaibhavjain-/' },
  { label: 'GitHub',   icon: 'fa-brands fa-github',      href: 'https://github.com/v-aibha-v-jain' },
  { label: 'Email',    icon: 'fa-solid fa-envelope',     href: 'mailto:vaibhavjain.vjv@gmail.com' },
  { label: 'Coffee',   icon: 'fa-solid fa-mug-hot',      href: 'https://www.buymeacoffee.com/vaibhavjain' },
];

const navLinks = ['About', 'Work', 'Contact'];
//const navLinks = ['About', 'Work', 'others', 'Contact'];

function fmtYear(d) { return new Date(d).getFullYear(); }

/* ─────────────────────────────────
   Shared InnerLayout component
   Renders: left clickable nav + right animated panel
───────────────────────────────── */
function InnerLayout({ pageLabel, pageTitle, sections, defaultSection }) {
  const [active, setActive] = useState(defaultSection || sections[0].id);
  const activeSec = sections.find((s) => s.id === active);

  return (
    <div className="inner-layout">
      {/* ── Left nav ── */}
      <aside className="inner-nav">
        <div className="inner-nav-header">
          <span className="inner-nav-page-label">{pageLabel}</span>
          <span className="inner-nav-page-title">{pageTitle}</span>
        </div>
        <div className="inner-nav-items">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`inner-nav-item ${active === s.id ? 'active' : ''}`}
              onClick={() => setActive(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
            >
              {s.label}
              <span className="material-symbols-outlined nav-arrow">arrow_forward</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ── Right content ── */}
      <div className="inner-content">
        {sections.map((s) => (
          <div
            key={s.id}
            className={`content-section content-section-${s.id} ${active === s.id ? 'active' : ''}`}
          >
            {s.content}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   HOME
───────────────────────────────── */
function HomePage() {
  return (
    <div className="home-page">
      <div className="home-intro">
        <div>
          <div className="home-eyebrow">
            <span className="home-eyebrow-text">sudo pacman -s life</span>
          </div>
          <h1 className="home-name">Vaibhav Jain</h1>
          <p className="home-tagline">
            I'm an IT fella who loves playing games, building things, and exploring the web.
          </p>
          <div className="home-location">
            <span className="material-symbols-outlined">location_on</span>
            Bangalore, Karnataka, India.
          </div>
        </div>
        <div className="home-socials">
          {socialLinks.map((s) => (
            <a key={s.label} className="social-link" href={s.href}
               aria-label={s.label}
               target={s.href.startsWith('http') ? '_blank' : undefined}
               rel={s.href.startsWith('http') ? 'noreferrer' : undefined}>
              <i className={s.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div className="home-portrait-col">
        <img className="home-portrait" src={profileImage} alt="Vaibhav Jain" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   ABOUT — section content pieces
───────────────────────────────── */
function BioContent() {
  const { basics } = portfolioData;
  return (
    <>
      <div>
        <div className="section-label" style={{ marginBottom: 6 }}>Product Engineer</div>
        <div className="content-heading" style={{ fontSize: 'clamp(30px,3.6vw,48px)' }}>
          Vaibhav Jain
        </div>
      </div>
      <p className="about-bio-text">{basics.about}</p>
      <div className="about-stat-row">
        {[
          { value: basics.total_exp_years, label: 'Experience' },
          { value: basics.location.city,  label: 'Based In' },
          { value: '20+',                 label: 'Projects Shipped' },
          { value: '6',                   label: 'Certifications' },
        ].map((st) => (
          <div className="about-stat" key={st.label}>
            <span className="about-stat-value">{st.value}</span>
            <span className="about-stat-label">{st.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ExperienceContent() {
  const { experience } = portfolioData;
  return (
    <>
      <div className="content-heading">Experience</div>
      <div className="exp-list">
        {experience.map((e, i) => (
          <div className="exp-card" key={i}>
            <div className="exp-meta">
              <span className="exp-company">{e.company}</span>
              <span className="exp-duration">{e.duration}</span>
            </div>
            <div className="exp-role">{e.role}</div>
            <ul className="exp-bullets">
              {e.responsibilities
                .filter((r) => !r.startsWith('http'))
                .map((r, ri) => <li key={ri}>{r}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsContent() {
  const { skills } = portfolioData;
  return (
    <>
      <div className="content-heading">Skills & Tools</div>
      <div className="skills-list">
        {skills.map((group) => (
          <div className="skill-group" key={group.category}>
            <div className="skill-category">{group.category}</div>
            <div className="skills-grid">
              {group.items.map((skill) => (
                <span className="skill-tag" key={`${group.category}-${skill}`}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationContent() {
  const { education } = portfolioData;
  return (
    <>
      <div className="content-heading">Education</div>
      <div className="edu-list">
        {education.map((e, i) => (
          <div className="edu-card" key={i}>
            <div className="edu-inst">{e.institution}</div>
            <div className="edu-degree">{e.degree}</div>
            <div className="edu-score">{e.duration} · {e.score}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function AchievementsContent() {
  const { achievements } = portfolioData;
  return (
    <>
      <div className="content-heading">Achievements</div>
      <div className="achievement-list">
        {achievements.map((a, i) => (
          <div className="achievement-item" key={i}>
            <span className="achievement-num">0{i + 1}</span>
            <div>
              <div className="achievement-title">{a.title}</div>
              <div className="achievement-desc">{a.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AboutPage() {
  const sections = [
    { id: 'bio',          label: 'Bio',         content: <BioContent /> },
    { id: 'experience',   label: 'Experience',  content: <ExperienceContent /> },
    { id: 'skills',       label: 'Skills',      content: <SkillsContent /> },
    { id: 'education',    label: 'Education',   content: <EducationContent /> },
    { id: 'achievements', label: 'Achievements',content: <AchievementsContent /> },
  ];
  return <InnerLayout pageLabel="02 / Portfolio" pageTitle="About" sections={sections} />;
}

/* ─────────────────────────────────
   WORK — paginated 2×2 grid
───────────────────────────────── */
function WorkPage() {
  const [filter, setFilter]   = useState('Exp');
  const filters = ['Exp', 'Project', 'Certificate'];
  const items = workData.timeline;

  const filtered = items.filter((w) => w.type?.toLowerCase() === filter.toLowerCase());

  const changeFilter = (f) => {
    setFilter(f);
  };

  return (
    <div className="work-page">
      {/* Header */}
      <div className="work-header">
        <div className="work-header-left">
          <div className="section-label">Production Archive · 2021-Present</div>
          <div className="work-page-title">Selected Work</div>
        </div>
        <div className="work-filters">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => changeFilter(f)}
            >
              {f === 'Exp' ? 'Experience' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="work-grid-area">
        <div className="work-grid">
          {filtered.map((item, i) => (
            <div
              className="work-card"
              key={`${filter}-${i}`}
            >
              <div className="work-card-header">
                <div className="work-card-meta">
                  <span className="work-type-badge">{item.type} · {item.company}</span>
                  <span className="work-card-title">{item.title}</span>
                </div>
                <span className="work-date-badge">{fmtYear(item.startDate)}</span>
              </div>

              <p className="work-card-description">{item.description}</p>

              {item.tags?.length > 0 && (
                <div className="work-tags">
                  {item.tags.slice(0, 4).map((t) => (
                    <span className="work-tag" key={t}>{t}</span>
                  ))}
                </div>
              )}

              {item.link?.length > 0 && (
                <div className="work-card-links">
                  {item.link.flatMap((obj) =>
                    Object.entries(obj).map(([label, url]) => (
                      <a
                        key={label}
                        className="work-link"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {label}
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </a>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   OTHERS — section content pieces
───────────────────────────────── */
function GamingContent() {
  const games = [
    { name: 'Elden Ring',          studio: 'FromSoftware' },
    { name: 'Factorio: Space Age', studio: 'Wube Software' },
    { name: 'Cyberpunk 2077',      studio: 'CD PROJEKT RED' },
    { name: 'Valorant',            studio: 'Riot Games' },
  ];
  return (
    <>
      <div className="content-heading">Gaming & Play</div>
      <div className="hobby-card">
        <div className="hobby-card-header">
          <span className="material-symbols-outlined hobby-icon">sports_esports</span>
          <span className="hobby-card-title">Current Rotation</span>
        </div>
        <div className="game-list">
          {games.map((g) => (
            <div className="game-row" key={g.name}>
              <span className="game-name">{g.name}</span>
              <span className="game-studio">{g.studio}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hobby-card">
        <div className="hobby-card-header">
          <span className="material-symbols-outlined hobby-icon">emoji_events</span>
          <span className="hobby-card-title">DigitalOcean & Chicago Codex</span>
        </div>
        <div className="hobby-card-body">
          Open Source Recognition for two consecutive years (2024-2025). Recognised with goodies for open-source contributions.
        </div>
      </div>
    </>
  );
}

function SetupContent() {
  return (
    <>
      <div className="content-heading">Setup & Lab</div>
      <div className="hobby-card">
        <div className="hobby-card-header">
          <span className="material-symbols-outlined hobby-icon">memory</span>
          <span className="hobby-card-title">Workstation</span>
        </div>
        <div className="hobby-card-body">
          Custom SFF build · AMD Ryzen 7800X3D · RTX 4080 Super FE · Custom EPDM water loop · 9.95L chassis.
          Neovim + Ghostty + Tmux workflow managed via Nix-Darwin.
        </div>
      </div>
      <div className="hobby-card">
        <div className="hobby-card-header">
          <span className="material-symbols-outlined hobby-icon">keyboard</span>
          <span className="hobby-card-title">Peripherals</span>
        </div>
        <div className="hobby-card-body">
          Geonworks F1-8X V2 · Lubed Cherry MX Browns · GMK Sandstorm keycaps. Sennheiser HD 600 + Schiit Modi+/Magni+ for marathon coding sessions.
        </div>
      </div>
      <div className="hobby-card">
        <div className="hobby-card-header">
          <span className="material-symbols-outlined hobby-icon">router</span>
          <span className="hobby-card-title">Home Lab</span>
        </div>
        <div className="hobby-card-body">
          Dual Intel NUC nodes running Proxmox VE · local DNS sinkhole · WireGuard mesh · automated ZFS snapshot offsite. 99.98% 30-day uptime.
        </div>
      </div>
    </>
  );
}

function CertificationsContent() {
  const { certifications } = portfolioData;
  return (
    <>
      <div className="content-heading">Certifications</div>
      <div className="cert-list">
        {certifications.map((c, i) => (
          <div className="cert-item" key={i}>
            <div>
              <div className="cert-name">{c.name}</div>
              {c.description && <div className="cert-desc">{c.description}</div>}
              {c.CIN  && <div className="cert-desc">CIN: {c.CIN}</div>}
              {c.Cred && <div className="cert-desc">Cred: {c.Cred}</div>}
            </div>
            {c.link && (
              <a className="cert-link" href={c.link} target="_blank" rel="noreferrer" aria-label="View">
                <span className="material-symbols-outlined">open_in_new</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function HackathonsContent() {
  const events = [
    { name: 'Hack-A-City 2.0',         desc: 'Top 10 / 200+ teams · City Engineering College · AI/ML focused hackathon across Karnataka.' },
    { name: 'Kodikon 3.0',             desc: 'Top 40 · 24h National Hackathon · PES University. Hundreds of participants.' },
    { name: 'Smart India Hackathon 2023', desc: 'Represented college. Built web scraping & research data processing app.' },
  ];
  return (
    <>
      <div className="content-heading">Hackathons</div>
      <div className="hackathon-list">
        {events.map((e) => (
          <div className="hackathon-item" key={e.name}>
            <div className="hackathon-name">{e.name}</div>
            <div className="hackathon-desc">{e.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ReadingContent() {
  const books = [
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann',  status: 'Re-reading' },
    { title: 'A Philosophy of Software Design',       author: 'John Ousterhout',   status: 'Active' },
    { title: 'The Design of Everyday Things',         author: 'Don Norman',        status: 'Reference' },
    { title: 'Exhalation: Stories',                  author: 'Ted Chiang',        status: 'Finished' },
  ];
  return (
    <>
      <div className="content-heading">Reading List</div>
      <div className="reading-list">
        {books.map((b) => (
          <div className="reading-item" key={b.title}>
            <div>
              <div className="reading-title">{b.title}</div>
              <div className="reading-author">{b.author}</div>
            </div>
            <span className="reading-status">{b.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function OthersPage() {
  const sections = [
    { id: 'gaming',        label: 'Gaming & Play',    content: <GamingContent /> },
    { id: 'setup',         label: 'Setup & Lab',      content: <SetupContent /> },
    { id: 'certifications',label: 'Certifications',   content: <CertificationsContent /> },
    { id: 'hackathons',    label: 'Hackathons',       content: <HackathonsContent /> },
    { id: 'reading',       label: 'Reading List',     content: <ReadingContent /> },
  ];
  return <InnerLayout pageLabel="04 / Portfolio" pageTitle="Others" sections={sections} />;
}

/* ─────────────────────────────────
   CONTACT
───────────────────────────────── */
function ContactPage() {
  const [clock, setClock]   = useState('--:--:--');
  const [form, setForm]     = useState({ name: '', email: '', topic: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const tick = () => {
      try {
        const fmt = new Intl.DateTimeFormat([], {
          timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        });
        setClock(fmt.format(new Date()));
      } catch { setClock(new Date().toLocaleTimeString()); }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSubmitError('');

    const subject = {
      consulting: 'Architecture Consulting / Freelance',
      fulltime: 'Full-time Engineering Role',
      collab: 'Open Source / Collaboration',
      gaming: 'Tech / Gaming Chat',
      general: 'Just Saying Hi',
    }[form.topic];

    try {
      await addDoc(collection(db, 'contacts'), {
        name: form.name.trim(),
        email: form.email.trim(),
        subject,
        message: form.message.trim(),
        timestamp: serverTimestamp(),
      });
      setSent(true);
      setForm({ name: '', email: '', topic: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error('Unable to save contact message:', error);
      setSubmitError('Unable to transmit your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const socials = portfolioData.social_links;

  return (
    <div className="contact-page">
      {/* ── Left ── */}
      <div className="contact-left">
        <div>
          <div className="section-label" style={{ marginBottom: 4 }}>Direct Transmission</div>
          <div className="contact-page-title">Let's<br />Connect</div>
          <p className="contact-tagline" style={{ marginTop: 6 }}>
            Engineering talk, collaborations, or just a gaming session — always open.
          </p>
        </div>

        {/* Clock */}
        <div className="clock-widget">
          <div className="section-label" style={{ marginBottom: 2 }}>Bangalore Time · IST</div>
          <div className="clock-display">{clock}</div>
          <div className="clock-sub">
            <span className="clock-label">Active: 10AM - 11PM IST</span>
            <span className="clock-label" style={{ color: 'var(--outline)' }}>UTC+5:30</span>
          </div>
        </div>

        {/* Details */}
        <div className="contact-details">
          <div className="contact-detail-row">
            <div className="contact-detail-icon">
              <span className="material-symbols-outlined">alternate_email</span>
            </div>
            <div>
              <div className="contact-detail-label">Email</div>
              <div className="contact-detail-value">vaibhavjain.vjv@gmail.com</div>
            </div>
          </div>
          <div className="contact-detail-row">
            <div className="contact-detail-icon">
              <span className="material-symbols-outlined">pin_drop</span>
            </div>
            <div>
              <div className="contact-detail-label">Location</div>
              <div className="contact-detail-value">Bangalore, India</div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div>
          <div className="section-label" style={{ marginBottom: 8 }}>Public Networks</div>
          <div className="contact-social-grid">
            {[
              { name: 'GitHub',    handle: '/v-aibha-v-jain', href: socials.github },
              { name: 'LinkedIn',  handle: '/vaibhavjain-',   href: socials.linkedin },
              { name: 'Instagram', handle: '@whybhaw', href: socials.instagram },
              { name: 'WhatsApp',  handle: 'whybhav_jain',  href: socials.whatsapp },
            ].map((s) => (
              <a key={s.name} className="contact-social-card" href={s.href} target="_blank" rel="noreferrer">
                <div>
                  <div className="contact-social-name">{s.name}</div>
                  <div className="contact-social-handle">{s.handle}</div>
                </div>
                <span className="material-symbols-outlined">arrow_outward</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right — Form ── */}
      <div className="contact-right">
        <div>
          <div className="section-label" style={{ marginBottom: 4 }}>Transmission Form</div>
          <div className="contact-form-section-label">Initiate Dialogue</div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="c-name">Your Name *</label>
              <input id="c-name" className="form-input" type="text"
                placeholder="e.g. Ada Lovelace" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="c-email">Email *</label>
              <input id="c-email" className="form-input" type="email"
                placeholder="name@domain.com" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="c-topic">Topic *</label>
            <select id="c-topic" className="form-select" required
              value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
              <option value="" disabled>Select a topic...</option>
              <option value="consulting">Architecture Consulting / Freelance</option>
              <option value="fulltime">Full-time Engineering Role</option>
              <option value="collab">Open Source / Collaboration</option>
              <option value="gaming">Tech / Gaming Chat</option>
              <option value="general">Just Saying Hi</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="c-msg">Message *</label>
            <textarea id="c-msg" className="form-textarea" rows={4}
              placeholder="Quick rundown of what's on your mind..."
              required
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>

          <div className="submit-row">
            <button className="submit-btn" type="submit" disabled={sending}>
              {sending ? 'Transmitting...' : 'Send Message'}
              {!sending && <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>}
            </button>
            {sent && (
              <div className="form-success">
                <span className="material-symbols-outlined" style={{ fontSize: 17 }}>check_circle</span>
                Transmission Received
              </div>
            )}
            {submitError && <div className="form-error" role="alert">{submitError}</div>}
          </div>
        </form>

        <div className="contact-faq">
          {[
            { label: 'Office Hours', text: 'Available Mon–Fri across EMEA & APAC-friendly time slots.' },
            { label: 'Response Time', text: 'Avg response under 24h. Urgent queries same day.' },
          ].map((f) => (
            <div key={f.label} className="contact-faq-item">
              <div className="contact-faq-label">{f.label}</div>
              <p className="contact-faq-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   ROOT APP
───────────────────────────────── */
function App() {
  const [activePage, setActivePage] = useState('home');

  const pages = {
    home:    <HomePage />,
    about:   <AboutPage />,
    work:    <WorkPage />,
    others:  <OthersPage />,
    contact: <ContactPage />,
  };

  return (
    <main className="portfolio-shell">
      <div className="portfolio-frame">
        <div className="page-container">
          {Object.entries(pages).map(([key, component]) => (
            <div key={key} className={`page ${activePage === key ? 'active' : ''}`}>
              {component}
            </div>
          ))}
        </div>

        <nav className="nav-dock" aria-label="Main navigation">
          {navLinks.map((link) => {
            const key = link.toLowerCase();
            return (
              <a
                key={key}
                className={activePage === key ? 'active' : ''}
                onClick={() => setActivePage(key)}
                aria-current={activePage === key ? 'page' : undefined}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActivePage(key)}
              >
                {link}
              </a>
            );
          })}
        </nav>
      </div>
    </main>
  );
}

export default App;
