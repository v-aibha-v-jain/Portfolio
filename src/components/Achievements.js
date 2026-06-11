import React from 'react';
import workData from '../data/work.json';

const Achievements = () => {
    const draggridItem = workData.timeline.find((item) => item.title === 'Drag_drop_swipe');

    const achievements = [
        {
            title: 'Kodikon 3.0 | National Level Hackathon, PES University',
            description: 'Participated in a 24-hour national-level hackathon; ranked in the top 40 teams out of hundreds of participants.',
            tags: ['Hackathon', 'AI/ML', 'Competition']
        },
        {
            title: 'Hack-A-City 2.0 | City Engineering College, Bangalore',
            description: 'Competed in an AI/ML-focused hackathon; achieving a top 10 finish among 200+ teams across Karnataka.',
            tags: ['Hackathon', 'AI/ML', 'Competition']
        },
        {
            title: 'Publication - draggrid npm module',
            description: draggridItem?.description || 'Published a dependency-free drag, drop, and swipe module on npm.',
            tags: draggridItem?.tags || ['npm', 'Open Source'],
            link: draggridItem?.link?.[0]?.['npm package']
        },
        {
            title: 'DigitalOcean Open Source Recognition (2024–2025)',
            description: 'Received goodies from DigitalOcean for being a top open-source contributor for two consecutive years.',
            tags: ['Open Source', 'Community']
        }
    ];

    return (
        <section id="achievements" className="achievements">
            <div className="container">
                <div className="section-header">
                    <h2>Achievements</h2>
                    <div className="underline"></div>
                </div>
                <div className="achievement-grid">
                    {achievements.map((item) => (
                        <div key={item.title} className="achievement-card">
                            <div className="achievement-header">
                                <h3>{item.title}</h3>
                                {item.link && (
                                    <a className="achievement-link" href={item.link} target="_blank" rel="noreferrer">
                                        View
                                    </a>
                                )}
                            </div>
                            <p className="achievement-description">{item.description}</p>
                            {item.tags?.length > 0 && (
                                <div className="achievement-tags">
                                    {item.tags.map((tag) => (
                                        <span key={`${item.title}-${tag}`} className="achievement-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
