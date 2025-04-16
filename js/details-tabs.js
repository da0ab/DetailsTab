function observeAttributeChanges(element, attribute, callback) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === attribute) {
                callback(mutation.target, mutation.attributeName);
            }
        });
    });
    observer.observe(element, { attributes: true });
}
function closeOtherDetails(current) {
    if (window.matchMedia('(max-width: 769px)').matches) {
        return;
    }
    current.closest('.details-tabs').querySelectorAll('details').forEach(item => {
        if (item !== current) {
            item.removeAttribute('open');
        }
    });
}
document.querySelectorAll('.details-tabs details').forEach(details => {
    observeAttributeChanges(details, 'open', (target) => {
        if (target.hasAttribute('open')) {
            closeOtherDetails(target);
        }
    });
});
function preventClosing(event) {
    if (!window.matchMedia('(max-width: 769px)').matches) {
        const details = event.target.parentElement;
        if (details.hasAttribute('open')) {
            event.preventDefault();
        }
    }
}
document.querySelectorAll('.details-tabs summary').forEach(tab => {
    tab.addEventListener('keydown', (event) => {
        if (event.keyCode === 32 || event.keyCode === 13) {
            preventClosing(event);
        }
    });
    tab.addEventListener('click', preventClosing);
});
function handleResponsiveDetails() {
    const isSmallScreen = window.matchMedia('(max-width: 769px)').matches;
    document.querySelectorAll('.details-tabs').forEach(detailsTabs => {
        const detailsElements = detailsTabs.querySelectorAll('details');

        if (isSmallScreen) {
            if (detailsTabs.classList.contains('phone-open')) {
                detailsElements.forEach(details => details.setAttribute('open', ''));
            } else if (detailsTabs.classList.contains('phone-close')) {
                detailsElements.forEach(details => details.removeAttribute('open'));
            }
        }
    });
}
window.addEventListener('load', handleResponsiveDetails);
window.addEventListener('resize', handleResponsiveDetails);
window.matchMedia('(max-width: 769px)').addEventListener('change', handleResponsiveDetails);
document.querySelectorAll('.details-tabs').forEach(detailsTabs => {
    const observer = new MutationObserver(handleResponsiveDetails);
    observer.observe(detailsTabs, { attributes: true, attributeFilter: ['class'] });
});

