// Ruchit Radadiya - Shopify Frontend Developer & Web Designer Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjectCards(portfolioProjects);
  setupFilters();
  setupSearch();
  setupCodeTabs();
  setupContactForm();
  setupMobileMenu();
  setupScrollSpy();
});

// Current Filter State
let currentFilter = 'all';
let searchQuery = '';

// Render Project Cards
function renderProjectCards(projects) {
  const container = document.getElementById('projects-grid');
  const countBadge = document.getElementById('project-count-badge');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No projects found</h3>
        <p class="text-slate-400 max-w-md mx-auto">Try adjusting your search query or filter tags to discover other live Shopify stores.</p>
        <button onclick="resetFilters()" class="mt-4 px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors">
          Reset All Filters
        </button>
      </div>
    `;
    if (countBadge) countBadge.textContent = '0 Projects';
    if (window.lucide) lucide.createIcons();
    return;
  }

  if (countBadge) {
    countBadge.textContent = `${projects.length} ${projects.length === 1 ? 'Project' : 'Live Projects'}`;
  }

  container.innerHTML = projects.map((p, idx) => {
    return `
      <article class="project-card glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-emerald-500/40 group relative" data-id="${p.id}">
        <!-- Top Browser Mockup Bar -->
        <div class="px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            <span class="ml-2 font-mono text-[11px] text-slate-400 flex items-center gap-1">
              <i data-lucide="lock" class="w-3 h-3 text-emerald-400"></i> ${p.displayUrl}
            </span>
          </div>
          <span class="flex items-center gap-1 font-semibold text-slate-300">
            <span>${p.flag}</span>
            <span class="hidden sm:inline">${p.region}</span>
          </span>
        </div>

        <!-- Card Header Banner -->
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-start justify-between gap-3 mb-3">
            <span class="badge-pill bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
              ${p.sector}
            </span>
            <span class="text-xs px-2.5 py-0.5 rounded-full font-medium ${p.status.includes('Progress') ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'}">
              ${p.status}
            </span>
          </div>

          <h3 class="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
            ${p.title}
          </h3>
          <p class="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
            ${p.category}
          </p>

          <p class="text-slate-300 text-sm leading-relaxed mb-4">
            ${p.description}
          </p>

          <!-- Core Feature Bullets -->
          <div class="mb-5 pt-3 border-t border-slate-800/80">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-emerald-400"></i> Key Deliverables:
            </p>
            <ul class="space-y-1.5 text-xs text-slate-300">
              ${p.keyFeatures.slice(0, 3).map(feat => `
                <li class="flex items-start gap-2">
                  <span class="text-emerald-400 font-bold">✓</span>
                  <span>${feat}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Tech Stack Tags -->
          <div class="mt-auto pt-4 flex flex-wrap gap-1.5">
            ${p.techStack.map(tech => `
              <span class="px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] font-medium text-slate-300 border border-slate-700/50">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Card Footer Actions -->
        <div class="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button onclick="openProjectModal('${p.id}')" class="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all flex items-center gap-1.5">
            <i data-lucide="info" class="w-3.5 h-3.5"></i> Details
          </button>

          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-shine px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-950 flex items-center gap-1.5">
            <span>Visit Live Store</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </article>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Setup Category & Region Filters
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-500');
        b.classList.add('bg-slate-800/60', 'text-slate-300', 'border-slate-700');
      });

      btn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-500');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300', 'border-slate-700');

      currentFilter = btn.dataset.filter;
      applyFilters();
    });
  });
}

// Setup Real-time Search
function setupSearch() {
  const searchInput = document.getElementById('project-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });
}

// Apply Filter & Search combined
function applyFilters() {
  let filtered = portfolioProjects;

  if (currentFilter === 'india') {
    filtered = filtered.filter(p => p.regionGroup === 'india');
  } else if (currentFilter === 'international') {
    filtered = filtered.filter(p => p.regionGroup === 'international');
  } else if (currentFilter === 'fashion') {
    filtered = filtered.filter(p => p.sector.includes('Fashion') || p.category.toLowerCase().includes('jewellery') || p.category.toLowerCase().includes('fashion'));
  } else if (currentFilter === 'home') {
    filtered = filtered.filter(p => p.sector.includes('Fragrance') || p.sector.includes('Tableware') || p.sector.includes('Stationery') || p.sector.includes('Kitchenware'));
  } else if (currentFilter === 'specialty') {
    filtered = filtered.filter(p => p.sector.includes('Wellness') || p.sector.includes('Eyewear') || p.sector.includes('Travel'));
  }

  if (searchQuery) {
    filtered = filtered.filter(p => {
      const matchTitle = p.title.toLowerCase().includes(searchQuery);
      const matchCat = p.category.toLowerCase().includes(searchQuery);
      const matchDesc = p.description.toLowerCase().includes(searchQuery);
      const matchRegion = p.region.toLowerCase().includes(searchQuery);
      const matchTech = p.techStack.some(t => t.toLowerCase().includes(searchQuery));
      return matchTitle || matchCat || matchDesc || matchRegion || matchTech;
    });
  }

  renderProjectCards(filtered);
}

function resetFilters() {
  currentFilter = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('project-search');
  if (searchInput) searchInput.value = '';

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    if (btn.dataset.filter === 'all') {
      btn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-500');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300', 'border-slate-700');
    } else {
      btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-500');
      btn.classList.add('bg-slate-800/60', 'text-slate-300', 'border-slate-700');
    }
  });

  renderProjectCards(portfolioProjects);
}

// Project Details Modal
function openProjectModal(projectId) {
  const project = portfolioProjects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-body-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <!-- Modal Header -->
    <div class="relative p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r ${project.color} text-white">
      <div class="flex items-center gap-2 mb-2">
        <span class="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
          ${project.flag} ${project.region}
        </span>
        <span class="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-semibold">
          ${project.sector}
        </span>
      </div>
      <h2 class="text-3xl font-extrabold mb-1">${project.title}</h2>
      <p class="text-sm opacity-90 font-medium">${project.category}</p>
    </div>

    <!-- Modal Body -->
    <div class="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Storefront Overview</h4>
        <p class="text-slate-300 leading-relaxed text-sm">${project.description}</p>
      </div>

      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">Shopify Technical Implementations & Custom Sections</h4>
        <ul class="space-y-2.5">
          ${project.keyFeatures.map(item => `
            <li class="flex items-start gap-2.5 text-sm text-slate-200">
              <span class="text-emerald-400 font-bold mt-0.5">✔</span>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Technologies & Tools Utilized</h4>
        <div class="flex flex-wrap gap-2">
          ${project.techStack.map(t => `
            <span class="px-3 py-1 rounded-lg bg-slate-800 text-xs font-medium text-emerald-300 border border-slate-700">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400 block">Live URL</span>
          <span class="font-mono text-sm text-white font-semibold">${project.displayUrl}</span>
        </div>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn-shine px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-1.5">
          <span>Open Live Store</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal when clicking on the backdrop or pressing Escape
document.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
  const inqModal = document.getElementById('inquiry-modal');
  if (e.target === inqModal) {
    closeInquiryModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeInquiryModal();
  }
});

// Code Snippet Tabs
const codeSnippets = {
  liquid: `{% comment %}
  Custom Shopify OS 2.0 Feature Section
  Author: Ruchit Radadiya (Shopify Frontend Developer)
{% endcomment %}

<div class="custom-benefit-grid section-{{ section.id }}">
  <div class="container mx-auto px-4">
    {% if section.settings.heading != blank %}
      <h2 class="section-title text-center">{{ section.settings.heading | escape }}</h2>
    {% endif %}

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {% for block in section.blocks %}
        <div class="benefit-card p-6 rounded-xl" {{ block.shopify_attributes }}>
          {% if block.settings.icon_svg != blank %}
            <div class="benefit-icon mb-4">{{ block.settings.icon_svg }}</div>
          {% endif %}
          <h3 class="text-lg font-bold mb-2">{{ block.settings.title | escape }}</h3>
          <p class="text-sm text-gray-600">{{ block.settings.description }}</p>
        </div>
      {% endfor %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Custom Benefit Grid",
  "tag": "section",
  "class": "shopify-section-benefit-grid",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Why Choose Our Craft"
    }
  ],
  "blocks": [
    {
      "type": "benefit",
      "name": "Benefit Card",
      "settings": [
        { "type": "text", "id": "title", "label": "Title", "default": "Handcrafted Quality" },
        { "type": "textarea", "id": "description", "label": "Description", "default": "Artisanally forged with pure metals." },
        { "type": "html", "id": "icon_svg", "label": "SVG Icon" }
      ]
    }
  ],
  "presets": [
    {
      "name": "Custom Benefit Grid",
      "blocks": [
        { "type": "benefit" },
        { "type": "benefit" },
        { "type": "benefit" }
      ]
    }
  ]
}
{% endschema %}`,

  ajax: `// Seamless Shopify Cart Drawer & Real-time Update
// Developed by Ruchit Radadiya

async function handleAddToCart(formData) {
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Failed to add item to bag');
    }

    const item = await response.json();
    
    // Refresh Cart State & Open Slide-Out Drawer
    await updateCartDrawerUI();
    openCartDrawer();
    
    showToast(\`\${item.title} added to your bag!\`);
  } catch (error) {
    console.error('Cart Error:', error);
    showToast('Could not add item to bag. Please try again.', 'error');
  }
}

async function updateCartDrawerUI() {
  const cartRes = await fetch('/cart.js');
  const cart = await cartRes.json();
  
  // Update cart badge counts across header
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.textContent = cart.item_count;
    badge.classList.toggle('hidden', cart.item_count === 0);
  });
}`,

  customizer: `{% comment %}
  Made-to-Order & Bridal Inquire Logic
  Crafted for Custom Jewelry & Apparel Work
{% endcomment %}

{% if product.tags contains 'made-to-order' %}
  <div class="made-to-order-badge p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
    <span class="flex items-center gap-2 text-xs font-semibold text-amber-300">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Artisan Made-to-Order: Crafted in 14-21 Business Days
    </span>
  </div>

  <div class="custom-properties space-y-3 mb-4">
    <label class="block text-xs font-semibold text-slate-300">Custom Engraving / Sizing Note</label>
    <input 
      type="text" 
      name="properties[Custom Customization]" 
      form="{{ 'product-form-' | append: section.id }}"
      placeholder="e.g. Ring Size 7 or Custom Monogram"
      class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
    />
  </div>
{% endif %}`
};

function setupCodeTabs() {
  const tabs = document.querySelectorAll('.code-tab-btn');
  const codeDisplay = document.getElementById('code-snippet-display');
  const codeFileName = document.getElementById('code-filename');
  if (!codeDisplay) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
        t.classList.add('bg-transparent', 'text-slate-400', 'border-transparent');
      });

      tab.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
      tab.classList.remove('bg-transparent', 'text-slate-400', 'border-transparent');

      const snippetType = tab.dataset.code;
      codeDisplay.textContent = codeSnippets[snippetType] || '';
      if (codeFileName) {
        if (snippetType === 'liquid') codeFileName.textContent = 'sections/custom-benefit-grid.liquid';
        else if (snippetType === 'ajax') codeFileName.textContent = 'assets/ajax-cart-drawer.js';
        else if (snippetType === 'customizer') codeFileName.textContent = 'snippets/made-to-order-logic.liquid';
      }
    });
  });
}

function copyCodeSnippet() {
  const codeDisplay = document.getElementById('code-snippet-display');
  if (!codeDisplay) return;
  navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
    showToast('Code snippet copied to clipboard!');
  });
}

// Contact Form & Multi-Channel Dispatch
let activeInquiryData = null;

function getFormData() {
  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const serviceSelect = document.getElementById('service-type');
  const messageInput = document.getElementById('sender-message');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const service = serviceSelect ? serviceSelect.value : 'Shopify Store Build';
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name || !email || !message) {
    showToast('Please fill in your name, email, and project details!', 'error');
    if (!name && nameInput) nameInput.focus();
    else if (!email && emailInput) emailInput.focus();
    else if (!message && messageInput) messageInput.focus();
    return null;
  }

  const subject = `Shopify Project Inquiry: ${service} (from ${name})`;
  const formattedText = `Hi Ruchit,\n\nMy name is ${name} (${email}).\n\nI am reaching out regarding: ${service}\n\nProject Requirements:\n${message}\n\nLooking forward to speaking soon!`;

  return { name, email, service, message, subject, formattedText };
}

function sendViaWhatsApp() {
  const data = getFormData();
  if (!data) return;
  activeInquiryData = data;
  dispatchWhatsApp();
}

function sendViaGmail() {
  const data = getFormData();
  if (!data) return;
  activeInquiryData = data;
  dispatchGmail();
}

function copyFormMessage() {
  const data = getFormData();
  if (!data) return;
  copyToClipboard(data.formattedText, 'Inquiry text');
}

function dispatchWhatsApp() {
  const data = activeInquiryData || getFormData();
  if (!data) return;
  const waUrl = `https://wa.me/917490810349?text=${encodeURIComponent(data.formattedText)}`;
  window.open(waUrl, '_blank');
  showToast('Opening WhatsApp with your project brief!');
  closeInquiryModal();
}

function dispatchGmail() {
  const data = activeInquiryData || getFormData();
  if (!data) return;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ruchitradadiya123@gmail.com&su=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.formattedText)}`;
  window.open(gmailUrl, '_blank');
  showToast('Opening Gmail compose in new tab!');
  closeInquiryModal();
}

function dispatchMailto() {
  const data = activeInquiryData || getFormData();
  if (!data) return;
  window.location.href = `mailto:ruchitradadiya123@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.formattedText)}`;
  showToast('Opening your default mail app...');
  closeInquiryModal();
}

function openInquirySuccessModal(data) {
  activeInquiryData = data;
  const modal = document.getElementById('inquiry-modal');
  const preview = document.getElementById('modal-inquiry-preview');
  if (!modal || !preview) return;

  preview.textContent = data.formattedText;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Automatically copy text to clipboard as safety backup
  navigator.clipboard.writeText(data.formattedText).catch(() => {});
  if (window.lucide) lucide.createIcons();
}

function closeInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    if (!data) return;
    openInquirySuccessModal(data);
  });
}

function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}

// Toast Alert
let toastTimer = null;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Theme Switcher (Dark / Light)
function initTheme() {
  const savedTheme = localStorage.getItem('rr_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('rr_portfolio_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-toggle-icon');
  if (!themeIcon) return;
  if (theme === 'light') {
    themeIcon.setAttribute('data-lucide', 'moon');
  } else {
    themeIcon.setAttribute('data-lucide', 'sun');
  }
  if (window.lucide) lucide.createIcons();
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(l => {
    l.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}

// Scroll Spy for Nav Links
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-emerald-400', 'font-semibold');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-emerald-400', 'font-semibold');
      }
    });
  });
}
