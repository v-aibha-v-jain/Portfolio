import React, { useEffect, useMemo, useRef, useState } from 'react';

const getProjectSlug = (repo) => repo
  .trim()
  .replace(/^\/+|\/+$/g, '')
  .replace(/\s+/g, '-');

const getSocialifyImageUrl = (repo, isDarkTheme) => {
  const slug = getProjectSlug(repo);
  const theme = isDarkTheme ? 'Light' : 'Dark';
  const pattern = isDarkTheme ? 'Overlapping Hexagons' : 'Circuit Board';

  return `https://socialify.git.ci/v-aibha-v-jain/${encodeURIComponent(slug)}/image?description=1&font=Inter&forks=1&issues=1&language=1&name=1&refresh=1&owner=1&pattern=${encodeURIComponent(pattern)}&stargazers=1&theme=${theme}`;
};

const projects = [
  {
    id: 1,
    repo: 'Traffic-Monitoring-and-Analysis-System',
    title: 'Vehile traffic Monitoring and Analysis',
    description: 'University major project focused on monitoring and analyzing vehicle traffic using Agentic AI and computer vision techniques',
    categories: ['web', 'ui', 'ml', 'py'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/Traffic-Monitoring-and-Analysis-System', icon: 'fab fa-github', text: 'GitHub' }
    ]
  },
  {
    id: 2,
    repo: 'tracker-browser-newpage-ext',
    title: 'Browser Extension - Tracker',
    description: 'A browser new page extension that helps user track their daily progress and help them stay focused and productive throughout the day',
    categories: ['web', 'js', 'ui', 'opensource'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/tracker-browser-newpage-ext', icon: 'fab fa-github', text: 'GitHub' }
    ]
  },
  {
    id: 3,
    repo: 'portfolio-api',
    title: 'Portfolio - API',
    description: 'A REST API for managing and displaying portfolio projects and experiences',
    categories: ['java'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/portfolio-api', icon: 'fab fa-github', text: 'GitHub' }
    ]
  },
  {
    id: 4,
    repo: 'VA-task-executor',
    title: 'VA-task-executor',
    description: 'Desktop voice assistant that listens and executes commands (open app/file/folder/url, read files, etc.)',
    categories: ['app', 'ml', 'py'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/VA-task-executor', icon: 'fab fa-github', text: 'GitHub' }
    ]
  },
  {
    id: 5,
    repo: 'drag_drop_swipe',
    title: 'drag_drop_swipe | draggrid',
    description: 'Open Source, Drag, Drop and Swipe node module',
    categories: ['js', 'ui', 'opensource'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/drag_drop_swipe.git', icon: 'fab fa-github', text: 'GitHub' }
    ]
  },
  {
    id: 6,
    repo: 'OneBox',
    title: 'OneBox',
    description: 'An intelligent email management system with real-time IMAP sync, AI-powered categorization, RAG-based reply suggestions, and enterprise-grade search capabilities.',
    categories: ['web', 'js', 'ml', 'py'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/OneBox', icon: 'fab fa-github', text: 'GitHub' }
    ]
  },
  {
    id: 7,
    repo: 'clibrowser',
    title: 'CLIBrowser',
    description: 'Browser extension with a terminal-style interface',
    categories: ['web', 'ui', 'js', 'opensource'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/clibrowser', icon: 'fab fa-github', text: 'GitHub' }
    ]
  },
  {
    id: 8,
    repo: 'TimeTable-generator-MiniProject',
    title: 'University Timetable Generator',
    description: 'AI-powered timetable generator for universities, optimizing class schedules based on various constraints and preferences',
    categories: ['web', 'js', 'ui', 'ml', 'py'],
    links: [
      { url: 'https://github.com/v-aibha-v-jain/TimeTable-generator-MiniProject', icon: 'fab fa-github', text: 'GitHub' }
    ]
  }
];

const filters = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'app', label: 'App' },
  { key: 'js', label: 'JavaScript' },
  { key: 'java', label: 'Java' },
  { key: 'py', label: 'Python' },
  { key: 'ui', label: 'UI/UX' },
  { key: 'ml', label: 'AI-ML' },
  { key: 'opensource', label: 'Open Source Contribution' }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragCurrentXRef = useRef(0);
  const isPointerActiveRef = useRef(false);

  const filteredProjects = useMemo(() => (
    activeFilter === 'all'
      ? projects
      : projects.filter(project => project.categories.includes(activeFilter))
  ), [activeFilter]);

  const clampedActiveIndex = Math.min(activeIndex, Math.max(filteredProjects.length - 1, 0));
  const activeSlideOffset = clampedActiveIndex * 100;
  const swipeProgress = Math.max(-1, Math.min(1, dragOffset / 180));

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.body.classList.contains('dark-theme'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setDragOffset(0);
    setIsDragging(false);
  }, [filteredProjects]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!isPointerActiveRef.current) {
        return;
      }

      dragCurrentXRef.current = event.clientX;
      setDragOffset(dragCurrentXRef.current - dragStartXRef.current);
    };

    const handlePointerUp = () => {
      if (!isPointerActiveRef.current) {
        return;
      }

      const deltaX = dragCurrentXRef.current - dragStartXRef.current;
      const threshold = 60;

      if (deltaX <= -threshold) {
        setActiveIndex(currentIndex => Math.min(currentIndex + 1, filteredProjects.length - 1));
      } else if (deltaX >= threshold) {
        setActiveIndex(currentIndex => Math.max(currentIndex - 1, 0));
      }

      isPointerActiveRef.current = false;
      setIsDragging(false);
      setDragOffset(0);
      dragStartXRef.current = 0;
      dragCurrentXRef.current = 0;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [filteredProjects.length]);

  const handlePointerDown = (event) => {
    if (filteredProjects.length <= 1) {
      return;
    }

    isPointerActiveRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragCurrentXRef.current = event.clientX;
  };

  const slideTransform = `translate3d(calc(-${activeSlideOffset}% + ${dragOffset}px), 0, 0)`;

  return (
    <section
      id="projects"
      className="projects"
    >
      <div className="container projects-scroll-shell">
        <div className="section-header">
          <h2>My Projects</h2>
          <div className="underline"></div>
        </div>
        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div
          className={`projects-carousel-viewport ${isDragging ? 'dragging' : ''}`}
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerLeave={() => {
            if (isPointerActiveRef.current) {
              isPointerActiveRef.current = false;
              setIsDragging(false);
              setDragOffset(0);
            }
          }}
        >
          <div
            className="projects-grid"
            ref={trackRef}
            style={{ transform: slideTransform }}
          >
            {filteredProjects.map((project, index) => {
              const distance = Math.abs(index - clampedActiveIndex);
              const isActive = index === clampedActiveIndex;
              const offsetDirection = index - clampedActiveIndex;
              const swipeShift = isActive ? swipeProgress * -18 : 0;
              const translateY = isActive ? swipeShift : Math.max(0, 18 - (distance * 8));
              const scale = isActive ? 1.04 : Math.max(0.88, 0.96 - (distance * 0.05));
              const opacity = isActive ? 1 : Math.max(0.45, 0.8 - (distance * 0.18));

              return (
                <div
                  key={project.id}
                  className="project-item"
                  data-active={isActive ? 'true' : 'false'}
                  data-direction={offsetDirection > 0 ? 'next' : offsetDirection < 0 ? 'prev' : 'current'}
                  data-category={project.categories.join(' ')}
                  style={{
                    '--project-card-translate-y': `${translateY}px`,
                    '--project-card-scale': scale,
                    '--project-card-opacity': opacity
                  }}
                >
                  <div className="project-img">
                    <img src={getSocialifyImageUrl(project.repo, isDarkTheme)} alt={project.title} />
                    <div className="project-overlay">
                      <div className="project-info">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="project-links">
                          {project.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              className="btn-small"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.icon && <i className={link.icon}></i>} {link.text}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {filteredProjects.length > 1 && (
          <div className="projects-carousel-controls">
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => setActiveIndex(currentIndex => Math.max(currentIndex - 1, 0))}
              disabled={clampedActiveIndex === 0}
              aria-label="Previous project"
            >
              ‹
            </button>
            <div className="projects-dots" aria-label="Project navigation">
              {filteredProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={`project-dot ${clampedActiveIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show project ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="carousel-arrow"
              onClick={() => setActiveIndex(currentIndex => Math.min(currentIndex + 1, filteredProjects.length - 1))}
              disabled={clampedActiveIndex === filteredProjects.length - 1}
              aria-label="Next project"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;