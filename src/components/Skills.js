import React from 'react';

const Skills = () => {
  const languages = [
    { name: 'Java', icon: 'fab fa-java' },
    { name: 'Node.js', icon: 'fab fa-node-js' }
  ];

  const frameworks = [
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Express', icon: 'fas fa-server' },
    { name: 'Angular', icon: 'fab fa-angular' },
    { name: 'Vue', icon: 'fab fa-vuejs' },
    { name: 'Nuxt', icon: 'fas fa-layer-group' },
    { name: 'Astro', icon: 'fas fa-rocket' }
  ];

  const cmsAndBackend = [
    { name: 'Payload CMS', icon: 'fas fa-cube' },
    { name: 'REST APIs', icon: 'fas fa-exchange-alt' }
  ];

  const databases = [
    { name: 'SQL', icon: 'fas fa-database' },
    { name: 'MongoDB', icon: 'fas fa-leaf' },
    { name: 'Firestore', icon: 'fas fa-fire' },
    { name: 'Elasticsearch', icon: 'fas fa-search' }
  ];

  const cloudTools = [
    { name: 'AWS', icon: 'fab fa-aws' },
    { name: 'AWS Lambda', icon: 'fas fa-bolt' },
    { name: 'GCP', icon: 'fas fa-cloud' },
    { name: 'Vercel', icon: 'fas fa-rocket' },
    { name: 'Hostinger', icon: 'fas fa-globe' },
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'Docker', icon: 'fab fa-docker' },
    { name: 'Redis', icon: 'fas fa-database' }
  ];

  const automationAI = [
    { name: 'Beautiful Soup', icon: 'fas fa-spider' },
    { name: 'LLM Integration', icon: 'fas fa-brain' }
  ];

  const softSkills = [
    { name: 'Agile & Scrum', icon: 'fas fa-users' },
    { name: 'Development Lifecycle', icon: 'fas fa-project-diagram' },
    { name: 'Code Review', icon: 'fas fa-code-branch' },
    { name: 'Technical Documentation', icon: 'fas fa-file-alt' },
    { name: 'Debugging', icon: 'fas fa-bug' }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2>My Skills</h2>
          <div className="underline"></div>
        </div>
        <div className="skills-content">
          <div className="skill-category">
            <h3>Languages & Frameworks</h3>
            <div className="skills-grid">
              <div className="skills-row">
                <div className="skills-subsection">
                  <h4>Languages</h4>
                  <div className="skills-list">
                    {languages.map((skill, index) => (
                      <div key={index} className="skill-tag">
                        <i className={skill.icon}></i>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="skills-subsection">
                  <h4>Frameworks</h4>
                  <div className="skills-list">
                    {frameworks.map((skill, index) => (
                      <div key={index} className="skill-tag">
                        <i className={skill.icon}></i>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="skills-subsection">
                  <h4>CMS & Backend Tools</h4>
                  <div className="skills-list">
                    {cmsAndBackend.map((skill, index) => (
                      <div key={index} className="skill-tag">
                        <i className={skill.icon}></i>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Databases</h3>
            <div className="skills-grid">
              <div className="skills-list">
                {databases.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <i className={skill.icon}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Cloud & DevOps</h3>
            <div className="skills-grid">
              <div className="skills-list">
                {cloudTools.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <i className={skill.icon}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Automation & AI</h3>
            <div className="skills-grid">
              <div className="skills-list">
                {automationAI.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <i className={skill.icon}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Soft Skills</h3>
            <div className="skills-grid">
              <div className="skills-list">
                {softSkills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <i className={skill.icon}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;