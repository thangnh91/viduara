// ============================================
// LUMINA Prototype - Shared Navigation & Demo
// ============================================

// Demo state
const demoState = {
  scenario: 'marketing', // 'se' | 'medical' | 'marketing'
  role: 'learner', // 'learner' | 'designer' | 'persona_writer' | 'engineer' | 'operator' | 'super_admin' | 'parent'
  user: {
    name: 'Minh Nguyen',
    grade: 'Grade 12',
    location: 'Hà Nội'
  }
};

// Helpers
function navigateTo(screen) {
  window.location.href = `${screen}.html`;
}

function navigateHome() {
  window.location.href = '../index.html';
}

// Demo Banner Component
function renderDemoBanner(currentScreen) {
  // Skip on index
  if (currentScreen === 'index') return;

  const banner = document.createElement('div');
  banner.className = 'demo-banner';
  banner.id = 'lumina-demo-banner';
  banner.innerHTML = `
    <span><strong>Demo:</strong> ${currentScreen}</span>
    <span style="opacity: 0.5;">|</span>
    <span style="font-size: 11px;">Scenario:</span>
    <div class="demo-chip ${demoState.scenario === 'se' ? 'active' : ''}" onclick="switchScenario('se')">SE</div>
    <div class="demo-chip ${demoState.scenario === 'marketing' ? 'active' : ''}" onclick="switchScenario('marketing')">Marketing</div>
    <div class="demo-chip ${demoState.scenario === 'medical' ? 'active' : ''}" onclick="switchScenario('medical')">Medical</div>
    <a href="../index.html" style="color: var(--lumina-300); text-decoration: underline; font-size: 11px; margin-left: 8px;">↑ Back to Index</a>
    <button class="demo-close" onclick="closeDemoBanner()">×</button>
  `;
  document.body.appendChild(banner);
}

function switchScenario(scenario) {
  demoState.scenario = scenario;
  // Notify all listeners
  if (typeof window.onScenarioChange === 'function') {
    window.onScenarioChange(scenario);
  }
  // Update banner active state
  document.querySelectorAll('.demo-chip').forEach(chip => {
    chip.classList.remove('active');
  });
  event.target.classList.add('active');

  // Show toast
  showToast(`Đã chuyển sang ${scenarioLabel(scenario)} scenario`);
}

function scenarioLabel(s) {
  return { se: 'Software Engineering', medical: 'Medical', marketing: 'Marketing' }[s] || s;
}

function closeDemoBanner() {
  const banner = document.getElementById('lumina-demo-banner');
  if (banner) banner.remove();
}

// Toast
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--ink-900);
    color: var(--paper-100);
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 13px;
    z-index: 9999;
    animation: fade-up 300ms ease;
    box-shadow: var(--shadow-lg);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 300ms';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Header builder
function buildHeader(options = {}) {
  const {
    breadcrumb = ['Home'],
    rightActions = ['notification', 'avatar']
  } = options;

  const breadcrumbHTML = breadcrumb.map((item, idx) => {
    const isLast = idx === breadcrumb.length - 1;
    if (isLast) {
      return `<span class="breadcrumb-current">${item}</span>`;
    }
    return `<a href="#">${item}</a><span class="breadcrumb-sep">›</span>`;
  }).join('');

  const actionsHTML = rightActions.map(action => {
    if (action === 'notification') {
      return `<div class="icon-btn" title="Notifications">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0"/>
        </svg>
      </div>`;
    }
    if (action === 'avatar') {
      return `<div class="avatar">${demoState.user.name.split(' ').map(s => s[0]).join('')}</div>`;
    }
    return '';
  }).join('');

  return `
    <header class="lumina-header">
      <div style="display: flex; align-items: center; gap: 24px;">
        <a href="../index.html" class="logo-mark">
          <div class="logo-glyph">
            <svg viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#0A0E1A" stroke-width="1.5"/>
              <circle cx="14" cy="14" r="4" fill="#DFA319"/>
            </svg>
          </div>
          LUMINA
        </a>
        <nav class="breadcrumb">${breadcrumbHTML}</nav>
      </div>
      <div class="header-actions">${actionsHTML}</div>
    </header>
  `;
}

// Auto-init demo banner on every page
document.addEventListener('DOMContentLoaded', () => {
  // Get current screen name from filename
  const path = window.location.pathname;
  const fileName = path.split('/').pop().replace('.html', '');

  if (fileName !== 'index' && fileName) {
    renderDemoBanner(fileName);
  }
});
