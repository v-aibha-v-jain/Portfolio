import React, { useState } from 'react';
import gotoImage from '../assets/repos/goto.png';
import dsaImage from '../assets/repos/dsa.png';
import cliImage from '../assets/repos/cli.png';
import vaImage from '../assets/repos/va.png';
import agentImage from '../assets/repos/agent.png';
import ddsImage from '../assets/repos/dds.png';
import traffic from '../assets/repos/traffic.png';
import tt from '../assets/repos/tt.png';
import onebox from '../assets/repos/onebox.png';
import tracker from '../assets/repos/tracker.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Vehile traffic Monitoring and Analysis',
      description: 'University major project focused on monitoring and analyzing vehicle traffic using Agentic AI and computer vision techniques',
      image: traffic,
      categories: ['web', 'ui', 'ml', 'py'],
      links: [
        { url: 'https://traffic-monitoring-and-analysis.vercel.app/', icon: 'fas fa-external-link-alt', text: 'Live Demo' }
      ]
    },
    {
      id: 2,
      title: 'Browser Extension - Tracker',
      description: 'A browser new page extension that helps user track their daily progress and help them stay focused and productive throughout the day',
      image: tracker,
      categories: ['web', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/tracker-browser-newpage-ext', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 3,
      title: 'VA-task-executor',
      description: 'Desktop voice assistant that listens and executes commands (open app/file/folder/url, read files, etc.)',
      image: vaImage,
      categories: ['app', 'ml', 'py'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/VA-task-executor', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 4,
      title: 'drag_drop_swipe | draggrid',
      description: 'Open Source, Drag, Drop and Swipe node module',
      image: ddsImage,
      categories: ['js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/drag_drop_swipe.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 5,
      title: 'OneBox',
      description: 'An intelligent email management system with real-time IMAP sync, AI-powered categorization, RAG-based reply suggestions, and enterprise-grade search capabilities.',
      image: onebox,
      categories: ['web', 'js', 'ml', 'py'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/OneBox', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 6,
      title: 'CLIBrowser',
      description: 'Browser extension with a terminal-style interface',
      image: cliImage,
      categories: ['web', 'ui', 'js'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/clibrowser', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 7,
      title: 'GoTo',
      description: 'Browser extension for quick navigation and shortcuts',
      image: gotoImage,
      categories: ['opensource', 'web', 'ui', 'js'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/GoTo', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 8,
      title: 'DecodeDsa',
      description: 'Open source contribution, visualize DSA problems and solutions',
      image: dsaImage,
      categories: ['opensource', 'web', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/DecodeDsa', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 9,
      title: 'Agent-task-manager',
      description: 'MERN stack application with JWT authentication and automated CSV/Excel task processing',
      image: agentImage,
      categories: ['web', 'js', 'ui'],
      links: [
        { url: 'https://github.com/v-aibha-v-jain/agent-task-manager.git', icon: 'fab fa-github', text: 'GitHub' }
      ]
    },
    {
      id: 10,
      title: 'University Timetable Generator',
      description: 'AI-powered timetable generator for universities, optimizing class schedules based on various constraints and preferences',
      image: tt,
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
    { key: 'py', label: 'Python' },
    { key: 'ui', label: 'UI/UX' },
    { key: 'ml', label: 'AI-ML' },
    { key: 'opensource', label: 'Open Source Contribution' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="projects">
      <div className="container">
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
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="project-item"
              data-category={project.categories.join(' ')}
            >
              <div className="project-img">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-info">
                    <h4>{project.title}</h4>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;