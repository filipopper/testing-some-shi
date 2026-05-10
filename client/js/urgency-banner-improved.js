/**
 * ═══════════════════════════════════════════════════════════════
 * URGENCY BANNER v2.0 — Enhanced Customization Manager
 * Features: Custom colors, background photos, animations, variants
 * ═══════════════════════════════════════════════════════════════
 */

class UrgencyBannerManager {
  constructor(options = {}) {
    this.banner = document.getElementById('urgency-banner');
    this.closeButton = document.getElementById('urgency-close');
    this.storageKey = options.storageKey || 'urgency-dismissed-oct2026';
    
    if (!this.banner) {
      console.warn('Urgency banner element not found');
      return;
    }
    
    this.init();
  }
  
  /**
   * Initialize the banner
   */
  init() {
    // Check if banner was previously dismissed
    if (this.isDismissed()) {
      this.hide(false); // Hide without animation
      return;
    }
    
    // Wire up close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.dismiss());
    }
    
    // Close on ESC key (accessibility)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible()) {
        this.dismiss();
      }
    });
  }
  
  /**
   * Check if banner was dismissed
   */
  isDismissed() {
    try {
      return sessionStorage.getItem(this.storageKey) === '1';
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Check if banner is visible
   */
  isVisible() {
    return this.banner && 
           this.banner.style.display !== 'none' && 
           !this.banner.classList.contains('dismissing');
  }
  
  /**
   * Dismiss the banner with animation
   */
  dismiss() {
    if (!this.banner) return;
    
    // Add dismissing class for animation
    this.banner.classList.add('dismissing');
    
    // Set initial max-height for smooth transition
    this.banner.style.maxHeight = `${this.banner.scrollHeight}px`;
    
    // Trigger reflow
    this.banner.offsetHeight;
    
    // Apply final styles
    requestAnimationFrame(() => {
      this.banner.style.transition = 'max-height 0.35s ease, opacity 0.35s ease, transform 0.35s ease';
      this.banner.style.maxHeight = '0';
      this.banner.style.opacity = '0';
      
      // Remove from DOM after animation
      setTimeout(() => {
        this.banner.remove();
      }, 360);
    });
    
    // Save dismissal state
    try {
      sessionStorage.setItem(this.storageKey, '1');
    } catch (e) {
      console.warn('Could not save banner dismissal state');
    }
  }
  
  /**
   * Hide banner without animation
   */
  hide(animate = true) {
    if (!this.banner) return;
    
    if (animate) {
      this.dismiss();
    } else {
      this.banner.style.display = 'none';
    }
  }
  
  /**
   * Show banner
   */
  show() {
    if (!this.banner) return;
    
    this.banner.style.display = '';
    this.banner.classList.remove('dismissing');
    
    // Reset dismissal state
    try {
      sessionStorage.removeItem(this.storageKey);
    } catch (e) {
      console.warn('Could not remove banner dismissal state');
    }
  }
  
  /**
   * Customize banner colors
   * @param {Object} colors - Color configuration
   * @param {string} colors.background - Background color
   * @param {string} colors.border - Border color
   * @param {string} colors.accent - Accent color for icon
   * @param {string} colors.text - Text color
   * @param {string} colors.strong - Strong text color (title)
   */
  setColors(colors = {}) {
    if (!this.banner) return;
    
    const style = this.banner.style;
    
    if (colors.background) {
      style.setProperty('--ub-bg', colors.background);
    }
    if (colors.border) {
      style.setProperty('--ub-border', colors.border);
    }
    if (colors.accent) {
      style.setProperty('--ub-accent', colors.accent);
    }
    if (colors.text) {
      style.setProperty('--ub-text', colors.text);
    }
    if (colors.strong) {
      style.setProperty('--ub-strong', colors.strong);
    }
    
    return this;
  }
  
  /**
   * Set background photo
   * @param {string} url - Image URL
   * @param {number} opacity - Photo overlay opacity (0-1)
   */
  setBackgroundPhoto(url, opacity = 0.15) {
    if (!this.banner) return;
    
    this.banner.style.setProperty('--ub-photo', `url(${url})`);
    this.banner.style.setProperty('--ub-photo-opacity', opacity.toString());
    this.banner.setAttribute('data-has-photo', 'true');
    
    return this;
  }
  
  /**
   * Remove background photo
   */
  removeBackgroundPhoto() {
    if (!this.banner) return;
    
    this.banner.style.setProperty('--ub-photo', 'none');
    this.banner.removeAttribute('data-has-photo');
    
    return this;
  }
  
  /**
   * Set animation type
   * @param {string} type - Animation type: 'none', 'gradient', 'shimmer'
   */
  setAnimation(type = 'none') {
    if (!this.banner) return;
    
    // Remove existing animation attributes
    this.banner.removeAttribute('data-animation');
    
    if (type !== 'none') {
      this.banner.setAttribute('data-animation', type);
    }
    
    return this;
  }
  
  /**
   * Set gradient colors for gradient animation
   * @param {string} color1 - First gradient color
   * @param {string} color2 - Second gradient color
   * @param {string} color3 - Third gradient color
   */
  setGradientColors(color1, color2, color3) {
    if (!this.banner) return;
    
    this.banner.style.setProperty('--ub-gradient-1', color1);
    this.banner.style.setProperty('--ub-gradient-2', color2);
    this.banner.style.setProperty('--ub-gradient-3', color3);
    
    return this;
  }
  
  /**
   * Set icon variant
   * @param {string} variant - 'default', 'success', 'warning', 'danger', 'info'
   */
  setIconVariant(variant = 'default') {
    const icon = this.banner?.querySelector('.urgency-icon');
    if (!icon) return;
    
    // Remove existing variants
    icon.removeAttribute('data-variant');
    
    if (variant !== 'default') {
      icon.setAttribute('data-variant', variant);
    }
    
    return this;
  }
  
  /**
   * Set CTA button variant
   * @param {string} variant - 'default', 'primary', 'secondary'
   */
  setCtaVariant(variant = 'default') {
    const cta = this.banner?.querySelector('.urgency-cta');
    if (!cta) return;
    
    // Remove existing variants
    cta.removeAttribute('data-variant');
    
    if (variant !== 'default') {
      cta.setAttribute('data-variant', variant);
    }
    
    return this;
  }
  
  /**
   * Update banner content
   * @param {Object} content - Content configuration
   * @param {string} content.title - Banner title
   * @param {string} content.body - Banner body text
   * @param {string} content.ctaText - CTA button text
   * @param {string} content.ctaUrl - CTA button URL
   * @param {string} content.icon - Icon class (Remix Icon)
   */
  setContent(content = {}) {
    if (!this.banner) return;
    
    if (content.title) {
      const title = this.banner.querySelector('.urgency-title');
      if (title) title.textContent = content.title;
    }
    
    if (content.body) {
      const body = this.banner.querySelector('.urgency-body');
      if (body) body.textContent = content.body;
    }
    
    if (content.ctaText) {
      const cta = this.banner.querySelector('.urgency-cta');
      if (cta) {
        const textNode = Array.from(cta.childNodes)
          .find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
          textNode.textContent = content.ctaText;
        }
      }
    }
    
    if (content.ctaUrl) {
      const cta = this.banner.querySelector('.urgency-cta');
      if (cta) cta.setAttribute('href', content.ctaUrl);
    }
    
    if (content.icon) {
      const icon = this.banner.querySelector('.urgency-icon i');
      if (icon) {
        icon.className = content.icon;
      }
    }
    
    return this;
  }
  
  /**
   * Preset configurations for common use cases
   */
  static presets = {
    election: (manager) => {
      return manager
        .setColors({
          background: '#62162f',
          border: '#96305a',
          accent: '#ca678e'
        })
        .setIconVariant('warning')
        .setAnimation('gradient')
        .setGradientColors('#62162f', '#96305a', '#ba577e');
    },
    
    success: (manager) => {
      return manager
        .setColors({
          background: '#145a40',
          border: '#228e67',
          accent: '#4db891'
        })
        .setIconVariant('success')
        .setCtaVariant('secondary');
    },
    
    urgent: (manager) => {
      return manager
        .setColors({
          background: '#991b1b',
          border: '#dc2626',
          accent: '#fca5a5'
        })
        .setIconVariant('danger')
        .setAnimation('shimmer');
    },
    
    info: (manager) => {
      return manager
        .setColors({
          background: '#1e40af',
          border: '#3b82f6',
          accent: '#93c5fd'
        })
        .setIconVariant('info');
    }
  };
  
  /**
   * Apply a preset configuration
   * @param {string} presetName - Name of the preset
   */
  applyPreset(presetName) {
    const preset = UrgencyBannerManager.presets[presetName];
    if (preset && typeof preset === 'function') {
      return preset(this);
    }
    console.warn(`Preset "${presetName}" not found`);
    return this;
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.urgencyBanner = new UrgencyBannerManager();
  });
} else {
  window.urgencyBanner = new UrgencyBannerManager();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UrgencyBannerManager;
}
