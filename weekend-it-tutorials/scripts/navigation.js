// Navigation and routing functionality
class NavigationManager {
    constructor() {
        this.currentSection = 'landing';
        this.previousSection = null;
        this.history = [];
        this.setupNavigation();
    }

    setupNavigation() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.section) {
                this.navigateTo(event.state.section, false);
            }
        });

        // Handle internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-internal]');
            if (link) {
                e.preventDefault();
                const targetSection = link.getAttribute('href').replace('#', '');
                this.navigateTo(targetSection);
            }
        });
    }

    navigateTo(section, addToHistory = true) {
        if (section === this.currentSection) return;

        this.previousSection = this.currentSection;
        this.currentSection = section;

        // Update browser history
        if (addToHistory) {
            this.history.push(section);
            window.history.pushState({ section }, '', `#${section}`);
        }

        this.hideAllSections();
        this.showSection(section);
        this.updateActiveStates(section);
        this.onSectionChange(section);
    }

    hideAllSections() {
        const sections = ['landing', 'classic', 'interactive'];
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                element.classList.add('hidden');
            }
        });
    }

    showSection(section) {
        const element = document.getElementById(section);
        if (element) {
            element.classList.remove('hidden');
            element.classList.add('fade-in');
            
            // Focus management for accessibility
            const mainHeading = element.querySelector('h1, h2, [role="heading"]');
            if (mainHeading) {
                mainHeading.setAttribute('tabindex', '-1');
                mainHeading.focus();
            }
        }
    }

    updateActiveStates(section) {
        // Update navigation active states
        const navItems = document.querySelectorAll('[data-nav-item]');
        navItems.forEach(item => {
            if (item.dataset.section === section) {
                item.classList.add('active', 'bg-primary-100', 'text-primary-700');
                item.classList.remove('text-gray-600');
            } else {
                item.classList.remove('active', 'bg-primary-100', 'text-primary-700');
                item.classList.add('text-gray-600');
            }
        });

        // Update mobile menu active state
        this.updateMobileMenuState(section);
    }

    updateMobileMenuState(section) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            const activeItems = mobileMenu.querySelectorAll('[data-section]');
            activeItems.forEach(item => {
                if (item.dataset.section === section) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }

    onSectionChange(section) {
        console.log(`Navigated to: ${section}`);
        
        // Section-specific initialization
        switch(section) {
            case 'classic':
                this.initializeClassicMode();
                break;
            case 'interactive':
                this.initializeInteractiveMode();
                break;
            case 'landing':
                this.initializeLandingPage();
                break;
        }

        // Analytics tracking (in a real app)
        this.trackPageView(section);
        
        // Update document title
        this.updateDocumentTitle(section);
    }

    initializeClassicMode() {
        // Load learning paths if not already loaded
        if (window.app && !document.querySelector('.learning-path')) {
            window.app.loadLearningPaths();
        }

        // Setup mobile sidebar
        this.setupMobileSidebar();
    }

    initializeInteractiveMode() {
        // Load resources if not already loaded
        if (window.app && document.getElementById('resources-container').children.length === 0) {
            window.app.loadInteractiveResources();
        }

        // Initialize search functionality
        this.setupSearch();
    }

    initializeLandingPage() {
        // Reset any modal states
        this.closeAllModals();
    }

    setupMobileSidebar() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                window.app.toggleSidebar();
            });
        }

        // Close sidebar when clicking on content (mobile)
        const contentArea = document.getElementById('classic-content');
        if (contentArea) {
            contentArea.addEventListener('click', () => {
                if (window.app.isSidebarOpen && window.innerWidth < 768) {
                    window.app.toggleSidebar();
                }
            });
        }
    }

    setupSearch() {
        const searchInput = document.querySelector('input[type="text"]');
        const categoryFilter = document.querySelector('select');
        
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value, categoryFilter?.value);
                }, 300);
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                const searchTerm = searchInput?.value || '';
                this.performSearch(searchTerm, e.target.value);
            });
        }
    }

    performSearch(query, category = 'All Categories') {
        if (!window.app) return;

        const resources = document.querySelectorAll('#resources-container > div');
        let visibleCount = 0;

        resources.forEach(resource => {
            const title = resource.querySelector('h3').textContent.toLowerCase();
            const description = resource.querySelector('p').textContent.toLowerCase();
            const resourceCategory = resource.querySelector('.badge').textContent;
            const searchTerm = query.toLowerCase();

            const matchesSearch = !query || title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = category === 'All Categories' || resourceCategory === category;

            if (matchesSearch && matchesCategory) {
                resource.classList.remove('hidden');
                visibleCount++;
            } else {
                resource.classList.add('hidden');
            }
        });

        // Show no results message
        this.showSearchResults(visibleCount, query);
    }

    showSearchResults(count, query) {
        let resultsMessage = document.getElementById('search-results-message');
        
        if (!resultsMessage) {
            resultsMessage = document.createElement('div');
            resultsMessage.id = 'search-results-message';
            resultsMessage.className = 'text-center py-4 text-gray-600';
            document.getElementById('resources-container').parentNode.insertBefore(resultsMessage, document.getElementById('resources-container'));
        }

        if (count === 0 && query) {
            resultsMessage.textContent = `No results found for "${query}". Try different keywords.`;
            resultsMessage.classList.remove('hidden');
        } else if (query) {
            resultsMessage.textContent = `Found ${count} result${count !== 1 ? 's' : ''} for "${query}"`;
            resultsMessage.classList.remove('hidden');
        } else {
            resultsMessage.classList.add('hidden');
        }
    }

    goBack() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current
            const previousSection = this.history.pop() || 'landing';
            this.navigateTo(previousSection, false);
        } else {
            this.navigateTo('landing');
        }
    }

    trackPageView(section) {
        // In a real application, you would send this to your analytics service
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: section,
                page_location: `${window.location.origin}/${section}`
            });
        }
    }

    updateDocumentTitle(section) {
        const titles = {
            'landing': 'CodeMentor Pro - Advanced Learning Platform',
            'classic': 'Structured Learning - CodeMentor Pro',
            'interactive': 'Interactive Resources - CodeMentor Pro'
        };
        
        document.title = titles[section] || titles.landing;
    }

    closeAllModals() {
        // Close any open modals or overlays
        const modals = document.querySelectorAll('.modal, [role="dialog"]');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Breadcrumb navigation
    generateBreadcrumbs(section, topic = null) {
        const breadcrumbs = [
            { name: 'Home', section: 'landing' },
            { name: this.getSectionName(section), section: section }
        ];

        if (topic) {
            breadcrumbs.push({ name: topic, section: null });
        }

        return breadcrumbs;
    }

    getSectionName(section) {
        const names = {
            'classic': 'Structured Learning',
            'interactive': 'Interactive Resources'
        };
        return names[section] || section;
    }

    // Mobile navigation menu
    createMobileMenu() {
        if (document.getElementById('mobile-menu')) return;

        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 grid grid-cols-3 gap-2 md:hidden z-40';
        
        mobileMenu.innerHTML = `
            <button data-section="landing" class="flex flex-col items-center p-2 rounded-lg text-gray-600 active:text-primary-700">
                <i class="fas fa-home mb-1"></i>
                <span class="text-xs">Home</span>
            </button>
            <button data-section="classic" class="flex flex-col items-center p-2 rounded-lg text-gray-600 active:text-primary-700">
                <i class="fas fa-sitemap mb-1"></i>
                <span class="text-xs">Learning</span>
            </button>
            <button data-section="interactive" class="flex flex-col items-center p-2 rounded-lg text-gray-600 active:text-primary-700">
                <i class="fas fa-play-circle mb-1"></i>
                <span class="text-xs">Resources</span>
            </button>
        `;

        document.body.appendChild(mobileMenu);

        // Add click handlers
        mobileMenu.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const section = button.dataset.section;
                this.navigateTo(section);
            });
        });
    }
}

// Initialize navigation manager
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
    
    // Create mobile menu for small screens
    if (window.innerWidth < 768) {
        window.navigationManager.createMobileMenu();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}