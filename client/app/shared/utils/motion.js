const REVEAL_SELECTOR = [
  'section',
  '.hero',
  '.home-section',
  '.news-item',
  '.news-detail',
  '.proposal-card',
  '.proposal-card-home',
  '.proposals-hero',
  '.proposals-transparency',
  '.about-card',
  '.about-section',
  '.about-gallery-slide',
  '.wiki-infobox',
  '.wiki-toc',
  '.wiki-sec',
  '.sv-product-row',
  '.sv-config-panel',
  '.join-aside-card',
  '.contact-card',
  '.announcement',
  'blockquote',
].join(',');

const STAGGER_CONTAINER_SELECTOR = [
  '.news-grid',
  '.proposals-grid-home',
  '.proposals-list',
  '.about-grid',
  '.about-ventures-grid',
  '.about-commission-grid',
  '.poll-stats-grid',
  '.sv-product-list',
  '.tags-filter',
  '.proposals-filters',
  '.contact-social-grid',
].join(',');

const INTERACTIVE_GROUP_SELECTOR = [
  '.news-item',
  '.proposal-card',
  '.proposal-card-home',
  '.about-card',
  '.sv-product-row',
  '.contact-social-item',
  '.wiki-toc',
].join(',');

const DEFAULT_OPTIONS = {
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.12,
  replay: false,
  staggerStep: 90,
  maxDelay: 360,
};

export class MotionController {
  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.revealObserver = null;
    this.mutationObserver = null;
    this.observed = new WeakSet();
    this.raf = 0;
  }

  init(root = document) {
    this.createObserver();
    this.refresh(root);
    this.watchContent();
  }

  refresh(root = document) {
    window.cancelAnimationFrame(this.raf);

    this.raf = window.requestAnimationFrame(() => {
      this.applyStagger(root);
      this.prepareInteractiveGroups(root);
      this.prepareReveal(root);
    });
  }

  dispose() {
    window.cancelAnimationFrame(this.raf);
    this.revealObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  createObserver() {
    this.revealObserver?.disconnect();

    if (!('IntersectionObserver' in window) || this.prefersReducedMotion.matches) {
      this.revealObserver = null;
      return;
    }

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          el.classList.add('reveal-in');
          el.classList.remove('reveal-out');

          if (!this.options.replay && el.dataset.revealReplay !== 'true') {
            this.revealObserver.unobserve(el);
          }

          return;
        }

        if (this.options.replay || el.dataset.revealReplay === 'true') {
          el.classList.remove('reveal-in');
          el.classList.add('reveal-out');
        }
      });
    }, {
      root: null,
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold,
    });
  }

  prepareReveal(root) {
    const elements = this.query(root, REVEAL_SELECTOR)
      .filter((el) => !el.closest('[data-motion="off"]'));

    elements.forEach((el) => {
      if (this.observed.has(el)) return;

      this.observed.add(el);
      el.classList.add('reveal-ready');

      if (!this.revealObserver) {
        el.classList.add('reveal-in');
        return;
      }

      this.revealObserver.observe(el);
    });
  }

  applyStagger(root) {
    this.query(root, STAGGER_CONTAINER_SELECTOR).forEach((container) => {
      const items = this.getStaggerItems(container);

      items.forEach((item, index) => {
        const delay = Math.min(index * this.options.staggerStep, this.options.maxDelay);
        item.style.setProperty('--reveal-delay', `${delay}ms`);
        item.classList.add('stagger-item');
      });
    });
  }

  prepareInteractiveGroups(root) {
    this.query(root, INTERACTIVE_GROUP_SELECTOR).forEach((el) => {
      el.classList.add('motion-group');
    });
  }

  getStaggerItems(container) {
    const explicitItems = [...container.querySelectorAll(':scope > .stagger-item')];

    if (explicitItems.length) {
      return explicitItems;
    }

    return [...container.children].filter((child) => {
      if (!(child instanceof HTMLElement)) return false;
      if (child.hidden) return false;

      return child.matches([
        'article',
        '.card',
        '.news-item',
        '.proposal-card',
        '.proposal-card-home',
        '.about-card',
        '.sv-product-row',
        '.tag',
        'button',
        'a',
      ].join(','));
    });
  }

  watchContent() {
    if (this.mutationObserver) return;

    const content = document.getElementById('content');
    if (!content || !('MutationObserver' in window)) return;

    this.mutationObserver = new MutationObserver((mutations) => {
      if (!mutations.some((mutation) => mutation.addedNodes.length)) return;
      this.refresh(content);
    });

    this.mutationObserver.observe(content, {
      childList: true,
      subtree: true,
    });
  }

  query(root, selector) {
    const base = root instanceof Element || root instanceof Document ? root : document;
    const matches = base instanceof Element && base.matches(selector) ? [base] : [];

    return [...matches, ...base.querySelectorAll(selector)]
      .filter((el) => el instanceof HTMLElement);
  }
}
