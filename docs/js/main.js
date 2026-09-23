/**
 * Neural HUD Telemetry - Main JavaScript
 * Georgi Danchev CV Website
 */

// Mobile Navigation Toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('nav-overlay');
  
  if (mobileNav && hamburger) {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open');
    if (overlay) {
      overlay.classList.toggle('hidden');
    }
    // Prevent body scroll when nav is open
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }
}

// Close mobile nav when clicking overlay
function closeMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('nav-overlay');
  
  if (mobileNav) {
    mobileNav.classList.remove('open');
  }
  if (hamburger) {
    hamburger.classList.remove('open');
  }
  if (overlay) {
    overlay.classList.add('hidden');
  }
  document.body.style.overflow = '';
}

// Skills Matrix Filter Function
function filterMatrix(category, btn) {
  const cards = document.querySelectorAll('.cluster-card');
  const buttons = document.querySelectorAll('.matrix-filter-btn');
  
  // Update active button state
  buttons.forEach(b => {
    b.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
    b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
  });
  
  if (btn) {
    btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
    btn.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
  }
  
  // Filter cards
  cards.forEach(card => {
    const cardCluster = card.dataset.cluster;
    if (category === 'all' || cardCluster === category) {
      card.classList.remove('hidden');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.classList.add('hidden');
    }
  });
}

// HUD Deck Toggle (Collapsible sections)
function initHudDeck() {
  const hudItems = document.querySelectorAll('.hud-item');
  
  hudItems.forEach(item => {
    const trigger = item.querySelector('.hud-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.dataset.open === 'true';
        item.dataset.open = (!isOpen).toString();
      });
    }
  });
}

// Highlight current page in navigation
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Check if this is the current page
      const isActive = currentPath.endsWith(href) || 
                       (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/docs/')));
      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

// Update page indicators
function updatePageIndicators() {
  const indicators = document.querySelectorAll('.page-indicator');
  const currentPath = window.location.pathname;
  
  const pageMap = {
    'index.html': 0,
    'projects.html': 1,
    'experience.html': 2,
    'skills.html': 3,
    'contact.html': 4
  };
  
  let currentIndex = 0;
  for (const [page, index] of Object.entries(pageMap)) {
    if (currentPath.endsWith(page)) {
      currentIndex = index;
      break;
    }
  }
  
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('active', 'bg-primary');
      indicator.classList.remove('bg-surface-container-highest');
    } else {
      indicator.classList.remove('active', 'bg-primary');
      indicator.classList.add('bg-surface-container-highest');
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  highlightCurrentPage();
  updatePageIndicators();
  initHudDeck();
  
  // Close mobile nav on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileNav();
    }
  });
  
  // Close mobile nav when window is resized to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      closeMobileNav();
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
