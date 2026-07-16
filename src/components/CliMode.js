import React, { useState, useRef, useEffect } from 'react';
import '../components/CliMode.css';
import portfolioData from '../data/portfolio.json';

const SECTIONS = ['about', 'experience', 'skills', 'education', 'projects', 'certifications', 'achievements', 'socials'];
const COMMANDS = ['help', 'ls', 'cd', 'cat', 'clear', 'exit'];

const formatObject = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    try { return JSON.stringify(obj, null, 2); } catch (e) { return String(obj); }
}

const CliMode = () => {
    const [active, setActive] = useState(false);
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const [cwd, setCwd] = useState('.');
    const inputRef = useRef(null);
    const historyRef = useRef(null);
    const [opening, setOpening] = useState(false);
    const shownInfoRef = useRef(false);

    useEffect(() => {
        if (active) {
            if (!shownInfoRef.current) {
                push({ type: 'info', text: 'Entered CLI mode. Type `help` for commands.' });
                shownInfoRef.current = true;
            }
            document.body.classList.add('hacker-theme');
            setOpening(false);
            setTimeout(() => inputRef.current?.focus(), 120);
        } else {
            document.body.classList.remove('hacker-theme');
            shownInfoRef.current = false;
        }
    }, [active]);

    const push = (line) => setHistory(prev => {
        if (line && line.type === 'info' && prev.length > 0) {
            const last = prev[prev.length - 1];
            if (last.type === 'info' && last.text === line.text) return prev;
        }
        return [...prev, line];
    });

    useEffect(() => {
        const el = historyRef.current;
        if (el) {
            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight;
            });
        }
    }, [history]);

    const runCommand = (raw) => {
        const cmd = raw.trim();
        if (!cmd) return;
        push({ type: 'cmd', text: cmd });

        const parts = cmd.split(/\s+/);
        const base = parts[0];
        const arg = parts[1];

        if (base === 'help') {
            push({ type: 'out', text: 'Commands: help, ls, cd, cat, clear, exit' });
            return;
        }

        if (base === 'clear') { setHistory([]); return; }

        if (base === 'exit') { setActive(false); setCwd('.'); setInput(''); return; }

        if (base === 'ls') {
            if (cwd === '.') {
                push({ type: 'out', text: SECTIONS.join('  ') });
            } else {
                switch (cwd) {
                    case 'about': push({ type: 'out', text: 'about.txt' }); break;
                    case 'skills': push({ type: 'out', text: portfolioData.skills.join(', ') }); break;
                    case 'experience': push({ type: 'out', text: portfolioData.experience.map((e, i) => `${i}. ${e.company}`).join('\n') }); break;
                    case 'projects': push({ type: 'out', text: portfolioData.projects.map((p, i) => `${i}. ${p.name}`).join('\n') }); break;
                    case 'education': push({ type: 'out', text: portfolioData.education.map((e, i) => `${i}. ${e.institution}`).join('\n') }); break;
                    case 'certifications': push({ type: 'out', text: portfolioData.certifications.map((c, i) => `${i}. ${c.name || c.Cred || c.CIN}`).join('\n') }); break;
                    case 'achievements': push({ type: 'out', text: portfolioData.achievements.map((a, i) => `${i}. ${a.title}`).join('\n') }); break;
                    case 'socials': push({ type: 'out', text: Object.entries(portfolioData.social_links || {}).map(([k, v]) => `${k}: ${v}`).join('\n') }); break;
                    default: push({ type: 'out', text: 'Nothing here.' });
                }
            }
            return;
        }

        if (base === 'cd') {
            if (!arg) { setCwd('.'); push({ type: 'out', text: 'At root.' }); return; }
            if (arg === '..') { setCwd('.'); push({ type: 'out', text: 'Back to /' }); return; }
            if (SECTIONS.includes(arg)) { setCwd(arg); push({ type: 'out', text: `Entered /${arg}` }); return; }
            push({ type: 'err', text: `cd: no such file or directory: ${arg}` });
            return;
        }

        if (base === 'cat') {
            if (!arg) { push({ type: 'err', text: 'cat: missing operand' }); return; }
            if (cwd === '.') {
                if (arg === 'about' || arg === 'about.txt') {
                    const b = portfolioData.basics || {};
                    push({ type: 'out', text: `Name: ${b.name}\nEmail: ${b.email}\nLocation: ${b.location?.city}, ${b.location?.country}\n\n${b.about}` });
                    return;
                }
                if (SECTIONS.includes(arg)) { setCwd(arg); push({ type: 'out', text: `Entered /${arg} (use ls and cat <index>)` }); return; }
                push({ type: 'err', text: `cat: ${arg}: No such file or directory` });
                return;
            } else {
                const sec = cwd;
                if (sec === 'about' && (arg === 'about.txt' || arg === 'about')) {
                    const b = portfolioData.basics || {};
                    push({ type: 'out', text: `Name: ${b.name}\nEmail: ${b.email}\nLocation: ${b.location?.city}, ${b.location?.country}\n\n${b.about}` });
                    return;
                }
                if (sec === 'skills') { push({ type: 'out', text: portfolioData.skills.join('\n') }); return; }
                const arr = portfolioData[sec];
                if (Array.isArray(arr)) {
                    const idx = Number(arg);
                    if (!Number.isNaN(idx) && arr[idx]) {
                        push({ type: 'out', text: formatObject(arr[idx]) });
                        return;
                    }
                    const cleaned = arg.replace(/\.txt$/i, '');
                    const found = arr.find(it => (it.name && it.name.toLowerCase().includes(cleaned.toLowerCase())) || (it.company && it.company.toLowerCase().includes(cleaned.toLowerCase())));
                    if (found) { push({ type: 'out', text: formatObject(found) }); return; }
                    push({ type: 'err', text: `cat: ${arg}: No such file or index` });
                    return;
                }
                push({ type: 'out', text: formatObject(arr) });
                return;
            }
        }

        push({ type: 'err', text: `Unknown command: ${base}` });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        runCommand(input);
        setInput('');
        setTimeout(() => inputRef.current?.focus(), 10);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const text = input.trim();
            const parts = text.split(/\s+/).filter(Boolean);
            const last = parts.length ? parts[parts.length - 1] : '';
            const candidates = [...COMMANDS, ...SECTIONS].filter(c => c.startsWith(last));
            if (candidates.length === 1) {
                const prefix = parts.slice(0, -1).join(' ');
                const newInput = (prefix ? prefix + ' ' : '') + candidates[0] + (parts.length === 1 ? ' ' : '');
                setInput(newInput);
            } else if (candidates.length > 1) {
                push({ type: 'out', text: candidates.join('  ') });
            }
        }
    };

    const promptStr = `vaibhav@portfolio:~/${cwd === '.' ? '' : cwd}$`;

    return (
        <div>
            {!active && (
                <button
                    className="cli-toggle"
                    title="Open CLI mode"
                    onClick={() => {
                        if (window.innerWidth < 780) return;
                        if (opening) return;
                        setOpening(true);
                        setActive(true);
                    }}
                    aria-disabled={opening}
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M4 6H20" stroke="#000" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M7 10L11 14L7 18" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}

            {active && (
                <div className="cli-overlay">
                    <div className="cli-window">
                        <div className="cli-header">
                            <div className="dots"><span></span><span></span><span></span></div>
                            <div className="cli-title">vaibhav@portfolio: ~/{cwd === '.' ? '' : cwd}</div>
                            <button className="cli-exit" onClick={() => { setActive(false); setCwd('.'); }}>Return</button>
                        </div>
                        <div className="cli-body" ref={historyRef} onClick={() => inputRef.current?.focus()}>
                            {history.map((h, i) => (
                                <pre key={i} className={`cli-line ${h.type}`}>
                                    {h.type === 'cmd' ? `${promptStr} ${h.text}` : h.text}
                                </pre>
                            ))}
                        </div>
                        <form className="cli-input" onSubmit={handleSubmit}>
                            <span className="prompt">{`vaibhav@portfolio:~/${cwd === '.' ? '' : cwd}$`}</span>
                            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} autoFocus />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CliMode;
