import React from 'react';

const Certificates = () => {
    const certificates = [
        {
            id: 1,
            title: 'UiPath RPA Credential',
            issuer: 'ICT Academy',
            credentialId: 'G-2025-G4592-0048',
            verifyUrl: 'https://verify.ictacademy.in/',
            icon: 'fas fa-robot',
            description: 'Robotic Process Automation certification demonstrating expertise in UiPath automation platform'
        },
        {
            id: 2,
            title: 'Blue Prism Associate Developer',
            issuer: 'Blue Prism & AICTE',
            credentialId: '7da9a939e9fcb83d6d5e28af068681df',
            verifyUrl: 'https://aictecert.eduskillsfoundation.org/pages/home/verify.php?cert=7da9a939e9fcb83d6d5e28af068681df',
            icon: 'fas fa-code',
            description: 'Associate Developer certification in Blue Prism RPA technology'
        },
        {
            id: 3,
            title: 'Red Hat System Administration',
            issuer: 'Red Hat',
            credentialId: '-',
            verifyUrl: 'https://www.linkedin.com/in/vaibhavjain-/details/certifications/1708786128754/single-media-viewer',
            icon: 'fab fa-redhat',
            description: 'System administration certification for Red Hat Enterprise Linux'
        },
        {
            id: 4,
            title: 'Google Cybersecurity',
            issuer: 'Google via Credly',
            credentialId: 'edc07055-e7dc-4345-81ab-2206c836c6a8',
            verifyUrl: 'https://www.credly.com/badges/edc07055-e7dc-4345-81ab-2206c836c6a8',
            icon: 'fas fa-shield-alt',
            description: 'Cybersecurity professional certificate demonstrating security fundamentals'
        },
        {
            id: 5,
            title: 'AWS Academy Cloud Foundations',
            issuer: 'Amazon Web Services via Credly',
            credentialId: '126a8bfe-0f3e-4803-9e0e-6890f1f34d5b',
            verifyUrl: 'https://www.credly.com/badges/126a8bfe-0f3e-4803-9e0e-6890f1f34d5b',
            icon: 'fab fa-aws',
            description: 'Cloud computing foundations certification covering AWS core services'
        },
        {
            id: 6,
            title: 'The Joy of Computing using Python',
            issuer: 'NPTEL',
            credentialId: 'NPTEL23CS108S33231421',
            verifyUrl: '#',
            icon: 'fab fa-python',
            description: 'Python programming certification from National Programme on Technology Enhanced Learning'
        }
    ];

    return (
        <section id="certificates" className="certificates">
            <div className="container">
                <div className="section-header">
                    <h2>Certifications</h2>
                    <div className="underline"></div>
                </div>
                <div className="certificates-grid">
                    {certificates.map(cert => (
                        <div key={cert.id} className="certificate-card">
                            <div className="certificate-icon">
                                <i className={cert.icon}></i>
                            </div>
                            <div className="certificate-content">
                                <h3>{cert.title}</h3>
                                <p className="certificate-issuer">{cert.issuer}</p>
                                <p className="certificate-description">{cert.description}</p>
                                <div className="certificate-credential">
                                    <span className="credential-label">Credential ID:</span>
                                    <span className="credential-id">{cert.credentialId}</span>
                                </div>
                                {cert.verifyUrl !== '#' && (
                                    <a
                                        href={cert.verifyUrl}
                                        className="btn-verify"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fas fa-external-link-alt"></i> Verify Certificate
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
