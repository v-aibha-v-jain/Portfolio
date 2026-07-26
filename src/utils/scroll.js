export const scrollToElement = (targetId, options = {}) => {
    const element = document.getElementById(targetId);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest'
    });
};