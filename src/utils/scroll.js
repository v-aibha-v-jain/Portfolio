export const scrollToElement = (targetId, options = {}) => {
    const element = document.getElementById(targetId);

    if (!element) {
        return;
    }

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(element, {
            offset: options.offset ?? 0,
            duration: options.duration ?? 1.4,
            lerp: options.lerp ?? 0.08
        });
        return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};