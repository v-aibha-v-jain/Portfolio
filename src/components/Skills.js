import React from 'react';

const Skills = () => {
  const languages = [
    { name: 'Java', icon: 'fab fa-java' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'JavaScript', icon: 'fab fa-js-square' },
    { name: 'PHP', icon: 'fab fa-php' }
  ];

  const frameworks = [
    { name: 'Node', icon: 'fab fa-node-js' },
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Express', icon: 'fas fa-server' },
    { name: 'Angular', icon: 'fab fa-angular' }
  ];

  const databases = [
    { name: 'SQL', icon: 'fas fa-database' },
    { name: 'PostgreSQL', icon: 'fas fa-database' },
    { name: 'MongoDB', icon: 'fas fa-leaf' },
    { name: 'FireStore', icon: 'fas fa-fire' }
  ];

  const cloudTools = [
    { name: 'AWS', icon: 'fab fa-aws' },
    { name: 'Firebase', icon: 'fas fa-fire-alt' },
    { name: 'Vercel', icon: 'fas fa-rocket' },
    { name: 'Hostinger', icon: 'fas fa-globe' },
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'Docker', icon: 'fab fa-docker' }
  ];

  const automationAI = [
    { name: 'Selenium', icon: 'fas fa-cogs' },
    { name: 'BeautifulSoup', icon: 'fas fa-spider' },
    { name: 'UiPath', icon: 'fas fa-robot' },
    { name: 'Blue Prism', icon: 'fas fa-robot' },
    { name: 'LLM', icon: 'fas fa-brain' }
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
            <h3>Cloud & Tools</h3>
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
        </div>
      </div>
    </section>
  );
};

export default Skills;