// ===================================
// Configuration & Initialization
// ===================================

let config = null;
let formSubmitted = false;

// Load config on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    initializeTheme();
    await loadConfig();
    validateConfig();
    populatePage();
    initializeForm();
    initializeNavigation();
    captureUTMParameters();
    setReferrer();
  } catch (error) {
    console.error('Error initializing page:', error);
    showError('Failed to load page configuration. Please refresh the page.');
    initializeTheme();
    initializeNavigation();
  }
});

// ===================================
// Config Loading & Validation
// ===================================

async function loadConfig() {
  try {
    const response = await fetch('config.json');
    if (!response.ok) {
      throw new Error('Failed to load config.json');
    }
    config = await response.json();
  } catch (error) {
    console.error('Error loading config:', error);
    throw error;
  }
}

function validateConfig() {
  const required = ['businessName', 'formAction', 'formFields', 'whatsapp'];
  const missing = required.filter(field => !config[field]);
  
  if (missing.length > 0) {
    console.error('Missing required config fields:', missing);
    throw new Error(`Config validation failed. Missing: ${missing.join(', ')}`);
  }
  
  // Validate form fields
  const requiredFormFields = ['name', 'email'];
  const missingFormFields = requiredFormFields.filter(field => !config.formFields[field]);
  
  if (missingFormFields.length > 0) {
    console.error('Missing required form field mappings:', missingFormFields);
    throw new Error(`Form field validation failed. Missing: ${missingFormFields.join(', ')}`);
  }
  
  console.log('✅ Config validation passed');
}

// ===================================
// Page Population
// ===================================

function populatePage() {
  // Apply custom colors if provided
  if (config.colors) {
    applyCustomColors();
  }
  
  // SEO & Meta tags
  if (config.seo) {
    document.title = config.seo.title || config.businessName;
    setMetaTag('description', config.seo.description);
    setMetaTag('keywords', config.seo.keywords);
    setMetaTag('og:title', config.seo.title);
    setMetaTag('og:description', config.seo.description);
    setMetaTag('og:image', config.seo.ogImage);
    setMetaTag('twitter:title', config.seo.title);
    setMetaTag('twitter:description', config.seo.description);
    setMetaTag('twitter:image', config.seo.ogImage);
  } else {
    document.title = config.businessName;
  }
  
  // Hero section
  setText('heroTitle', config.heroHeadline);
  setText('heroSubtitle', config.heroSubheadline);
  setText('heroCTA', config.heroCTA);
  setImage('heroImage', config.heroImage, 'Hero image');
  
  // Navigation
  setText('navCTA', config.heroCTA);
  
  // Services
  populateServices();
  
  // Contact info
  setText('contactEmail', config.email);
  const whatsappLink = `https://wa.me/${config.whatsapp}`;
  setLink('contactWhatsApp', whatsappLink, 'WhatsApp');
  setLink('modalWhatsApp', whatsappLink, 'Message on WhatsApp');
  
  // Footer
  setText('footerTagline', config.tagline);
  setText('footerBusiness', config.businessName);
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  if (config.social) {
    populateSocialLinks();
  }
}

function applyCustomColors() {
  const root = document.documentElement;
  const colors = config.colors;
  
  if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
  if (colors.primaryDark) root.style.setProperty('--color-primary-dark', colors.primaryDark);
  if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
  if (colors.accentDark) root.style.setProperty('--color-accent-dark', colors.accentDark);
  if (colors.text) root.style.setProperty('--color-text', colors.text);
  if (colors.textLight) root.style.setProperty('--color-text-light', colors.textLight);
  if (colors.background) root.style.setProperty('--color-background', colors.background);
  if (colors.backgroundLight) root.style.setProperty('--color-background-light', colors.backgroundLight);
}

function populateServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  servicesGrid.innerHTML = '';
  
  config.services.forEach((service, index) => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="service-icon">
        <img src="${service.icon}" alt="${service.title} icon">
      </div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    
    servicesGrid.appendChild(card);
  });
}

function populateSocialLinks() {
  const socialContainer = document.getElementById('footerSocial');
  socialContainer.innerHTML = '';
  
  const socialIcons = {
    linkedin: '<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
  };
  
  Object.keys(config.social).forEach(platform => {
    if (config.social[platform] && socialIcons[platform]) {
      const link = document.createElement('a');
      link.href = config.social[platform];
      link.className = 'social-link';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', platform);
      link.innerHTML = socialIcons[platform];
      socialContainer.appendChild(link);
    }
  });
}

// ===================================
// Form Handling
// ===================================

function initializeForm() {
  const form = document.getElementById('leadForm');
  
  // Set form action
  form.action = config.formAction;
  
  // Map form field names to Google Form entry IDs
  document.getElementById('name').name = config.formFields.name;
  document.getElementById('email').name = config.formFields.email;
  
  if (config.formFields.phone) {
    document.getElementById('phone').name = config.formFields.phone;
  }
  
  if (config.formFields.message) {
    document.getElementById('message').name = config.formFields.message;
  }
  
  // Handle form submission
  form.addEventListener('submit', handleFormSubmit);
  
  // Monitor iframe for successful submission
  const iframe = document.getElementById('hidden_iframe');
  iframe.addEventListener('load', () => {
    if (formSubmitted) {
      window.location.href = 'thankyou.html';
    }
  });
  
  // Fallback: if form doesn't redirect within 3 seconds, show modal
  form.addEventListener('submit', () => {
    setTimeout(() => {
      if (!formSubmitted) {
        console.warn('Form submission timeout - showing fallback');
        showFallbackModal();
      }
    }, 3000);
  });
}

function handleFormSubmit(e) {
  formSubmitted = true;
  console.log('Form submitted successfully');
}

function showFallbackModal() {
  const modal = document.getElementById('fallbackModal');
  modal.classList.add('active');
}

function closeFallbackModal() {
  const modal = document.getElementById('fallbackModal');
  modal.classList.remove('active');
}

// Make closeFallbackModal available globally
window.closeFallbackModal = closeFallbackModal;

// ===================================
// UTM & Tracking
// ===================================

function captureUTMParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || 
                   urlParams.get('source') || 
                   urlParams.get('ref') || 
                   'direct';
  
  const utmField = document.getElementById('utmSource');
  if (utmField) {
    utmField.value = utmSource;
  }
  
  console.log('UTM Source captured:', utmSource);
}

function setReferrer() {
  const referrerField = document.getElementById('referrerField');
  if (referrerField) {
    referrerField.value = document.referrer || 'direct';
  }
}

// ===================================
// Theme Toggle
// ===================================

function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme preference or default to system preference, fallback to dark
  let theme = localStorage.getItem('theme');
  
  if (!theme) {
    // Try to detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light';
    } else {
      // Default to dark if can't detect
      theme = 'dark';
    }
  }
  
  // Apply theme
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ===================================
// Navigation
// ===================================

function initializeNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// ===================================
// Utility Functions
// ===================================

function setText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element && text) {
    element.textContent = text;
  }
}

function setImage(elementId, src, alt) {
  const element = document.getElementById(elementId);
  if (element && src) {
    element.src = src;
    if (alt) element.alt = alt;
  }
}

function setLink(elementId, href, text) {
  const element = document.getElementById(elementId);
  if (element && href) {
    element.href = href;
    if (text) element.textContent = text;
  }
}

function setMetaTag(name, content) {
  if (!content) return;
  
  let selector = `meta[name="${name}"]`;
  if (name.startsWith('og:') || name.startsWith('twitter:')) {
    selector = `meta[property="${name}"]`;
  }
  
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #f44336;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
  `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// ===================================
// Analytics Hook (Optional)
// ===================================

// If you want to add analytics tracking, add it here
function trackEvent(eventName, eventData) {
  console.log('Event tracked:', eventName, eventData);
  
  // Example: Google Analytics
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', eventName, eventData);
  // }
  
  // Example: Custom webhook
  // fetch('YOUR_WEBHOOK_URL', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ event: eventName, data: eventData })
  // });
}

// Track form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', () => {
      trackEvent('form_submission', {
        source: document.getElementById('utmSource')?.value || 'unknown',
        referrer: document.getElementById('referrerField')?.value || 'unknown'
      });
    });
  }
});

