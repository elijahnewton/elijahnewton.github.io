// Main application initialization
class CodeMentorApp {
    constructor() {
        this.currentMode = 'landing';
        this.currentTopic = null;
        this.userProgress = this.loadProgress();
        this.isSidebarOpen = false;
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadInitialData();
        this.updateProgressDisplay();
        this.setupMobileHandler();
    }

    setupEventListeners() {
        // Progress button toggle
        document.getElementById('progress-btn')?.addEventListener('click', () => {
            this.toggleProgressStats();
        });

        // Search functionality
        const searchInput = document.querySelector('input[type="text"]');
        searchInput?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Category filter
        const categoryFilter = document.querySelector('select');
        categoryFilter?.addEventListener('change', (e) => {
            this.handleCategoryFilter(e.target.value);
        });

        // Close sidebar when clicking on overlay (mobile)
        document.addEventListener('click', (e) => {
            if (this.isSidebarOpen && !e.target.closest('#sidebar') && !e.target.closest('#sidebar-toggle')) {
                this.toggleSidebar();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    loadInitialData() {
        // Load learning paths for classic mode
        if (document.getElementById('learning-paths-container')) {
            this.loadLearningPaths();
        }

        // Load resources for interactive mode
        if (document.getElementById('resources-container')) {
            this.loadInteractiveResources();
        }
    }

    // async loadLearningPaths() {
    //     try {
    //         const response = await fetch('content/topics/learning-paths.json');
    //         const learningPaths = await response.json();
    //         this.renderLearningPaths(learningPaths);
    //     } catch (error) {
    //         console.error('Error loading learning paths:', error);
    //         this.showError('Failed to load learning paths. Please try again.');
    //     }
    // }

    // In the loadLearningPaths method, replace with:
    async loadLearningPaths() {
        try {
            // Load individual learning path files
            const pathFiles = [
                'content/topics/c-programming.json',
                'content/topics/web-development.json', 
                'content/topics/cyber-security.json',
                'content/topics/data-structures.json',
                'content/topics/python-programming.json'
            ];

            const learningPaths = [];

            for (const file of pathFiles) {
                try {
                    const response = await fetch(file);
                    const pathData = await response.json();
                    learningPaths.push(pathData);
                } catch (error) {
                    console.warn(`Failed to load ${file}:`, error);
                }
            }

            this.renderLearningPaths(learningPaths);
        } catch (error) {
            console.error('Error loading learning paths:', error);
            this.showError('Failed to load learning paths. Please try again.');
        }
    }

    renderLearningPaths(learningPaths) {
        const container = document.getElementById('learning-paths-container');
        if (!container) return;

        container.innerHTML = learningPaths.map(path => `
            <div class="learning-path" data-path="${path.id}">
                <div class="flex items-center justify-between cursor-pointer p-3 rounded-lg ${path.color} text-white shadow">
                    <span class="font-semibold text-sm md:text-base">${path.icon} ${path.title}</span>
                    <i class="fas fa-chevron-down transition-transform"></i>
                </div>
                <ul class="mt-2 space-y-1 hidden">
                    ${path.topics.map(topic => `
                        <li>
                            <button onclick="window.app.showTopic('${topic.id}')" 
                                    class="w-full text-left py-2 px-4 hover:bg-${path.color.replace('bg-', '').split('-')[0]}-100 rounded transition-colors flex items-center text-sm">
                                <span class="w-2 h-2 bg-${path.color.replace('bg-', '').split('-')[0]}-400 rounded-full mr-3"></span>
                                ${topic.title}
                                ${topic.completed ? '<i class="fas fa-check text-green-500 ml-auto"></i>' : ''}
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        this.setupLearningPathAccordions();
    }

    setupLearningPathAccordions() {
        document.querySelectorAll('.learning-path').forEach(path => {
            const header = path.querySelector('div');
            header.addEventListener('click', () => {
                const ul = header.nextElementSibling;
                const icon = header.querySelector('i');
                
                ul.classList.toggle('hidden');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
                icon.classList.toggle('rotate-180');
            });
        });
    }

    async loadInteractiveResources() {
        try {
            const response = await fetch('content/resources/interactive-resources.json');
            const resources = await response.json();
            this.renderInteractiveResources(resources);
        } catch (error) {
            console.error('Error loading resources:', error);
            this.showError('Failed to load resources. Please try again.');
        }
    }

    renderInteractiveResources(resources) {
        const container = document.getElementById('resources-container');
        if (!container) return;

        container.innerHTML = resources.map(resource => `
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div class="bg-gradient-to-r ${resource.gradient} p-4 text-white">
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-sm md:text-base">${resource.title}</h3>
                        <span class="badge badge-${resource.level.toLowerCase()} text-xs">${resource.level}</span>
                    </div>
                    <p class="text-white text-opacity-90 text-xs mt-2">${resource.description}</p>
                </div>
                <div class="p-3 md:p-4">
                    <div class="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                        ${resource.links.map(link => `
                            <a href="#" class="resource-link group" data-type="${link.type}" onclick="app.handleResourceClick('${link.type}', '${resource.id}')">
                                <i class="${link.icon} mr-1 md:mr-2"></i>${link.label}
                            </a>
                        `).join('')}
                    </div>
                    <div class="flex justify-between items-center text-xs text-gray-500">
                        <span>${resource.duration}</span>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span>${resource.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async showTopic(topicId) {
        try {
            // Close sidebar on mobile after topic selection
            if (window.innerWidth < 768) {
                this.toggleSidebar();
            }

            this.currentTopic = topicId;
            
            // Mark topic as started in progress
            this.userProgress.startedTopics.add(topicId);
            this.saveProgress();
            
            // Load topic content
            const response = await fetch(`content/topics/${topicId}.json`);
            const topic = await response.json();
            this.renderTopicContent(topic);
        } catch (error) {
            console.error('Error loading topic:', error);
            this.showError('Failed to load topic content. Please try again.');
        }
    }

    renderTopicContent(topic) {
        const container = document.getElementById('classic-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl md:text-2xl font-bold text-primary-800">${topic.icon} ${topic.title}</h3>
                        <span class="badge badge-${topic.level.toLowerCase()}">${topic.level}</span>
                    </div>
                    
                    <div class="prose max-w-none">
                        ${topic.content}
                    </div>

                    ${topic.codeExample ? `
                        <div class="code-block mt-4">
                            <div class="code-header">
                                <span>${topic.codeLanguage || 'code'}</span>
                                <button class="copy-btn" onclick="app.copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                            <pre><code>${topic.codeExample}</code></pre>
                        </div>
                    ` : ''}

                    ${topic.exercise ? `
                        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
                            <h5 class="font-semibold text-green-800 mb-2">✅ Practice Exercise</h5>
                            <p class="text-green-700">${topic.exercise}</p>
                        </div>
                    ` : ''}
                </div>

                <div class="flex justify-between mt-6 pt-4 border-t border-gray-200">
                    <button onclick="app.navigateToPreviousTopic()" class="bg-primary-500 hover:bg-primary-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors flex items-center text-sm">
                        <i class="fas fa-arrow-left mr-2"></i>Previous Lesson
                    </button>
                    <button onclick="app.completeTopic('${topic.id}')" class="bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors flex items-center text-sm">
                        Mark Complete<i class="fas fa-check ml-2"></i>
                    </button>
                    <button onclick="app.navigateToNextTopic()" class="bg-primary-500 hover:bg-primary-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors flex items-center text-sm">
                        Next Lesson<i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        `;
    }

    handleResourceClick(type, resourceId) {
        const actions = {
            video: () => this.openVideo(resourceId),
            notes: () => this.downloadNotes(resourceId),
            code: () => this.openCodeTemplate(resourceId),
            slides: () => this.openSlides(resourceId)
        };

        if (actions[type]) {
            actions[type]();
        }
    }

    openVideo(resourceId) {
        alert(`🎥 Opening video tutorial for ${resourceId}`);
        // In real implementation, this would open a video player
    }

    downloadNotes(resourceId) {
        alert(`📄 Downloading study notes for ${resourceId}`);
        // In real implementation, this would trigger a download
    }

    openCodeTemplate(resourceId) {
        alert(`💻 Loading code template for ${resourceId}`);
        // In real implementation, this would open a code editor
    }

    openSlides(resourceId) {
        alert(`📊 Opening presentation for ${resourceId}`);
        // In real implementation, this would open a slides viewer
    }

    copyCode(button) {
        const codeBlock = button.closest('.code-block').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
            this.showError('Failed to copy code to clipboard');
        });
    }

    completeTopic(topicId) {
        this.userProgress.completedTopics.add(topicId);
        this.saveProgress();
        this.updateProgressDisplay();
        
        // Show completion message
        this.showSuccess('Topic marked as complete! 🎉');
        
        // Update UI to show completion status
        const topicButton = document.querySelector(`[onclick*="${topicId}"]`);
        if (topicButton) {
            if (!topicButton.querySelector('.fa-check')) {
                topicButton.innerHTML += '<i class="fas fa-check text-green-500 ml-auto"></i>';
            }
        }
    }

    toggleProgressStats() {
        const progressStats = document.getElementById('progress-stats');
        progressStats.classList.toggle('hidden');
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        this.isSidebarOpen = !this.isSidebarOpen;
        
        if (this.isSidebarOpen) {
            sidebar.classList.remove('-translate-x-full');
        } else {
            sidebar.classList.add('-translate-x-full');
        }
    }

    handleSearch(query) {
        console.log('Searching for:', query);
        // Implement search functionality
    }

    handleCategoryFilter(category) {
        console.log('Filtering by category:', category);
        // Implement category filtering
    }

    handleKeyboardShortcuts(event) {
        // Escape key closes sidebar
        if (event.key === 'Escape' && this.isSidebarOpen) {
            this.toggleSidebar();
        }
        
        // Ctrl+K for search (when not in input)
        if (event.ctrlKey && event.key === 'k' && !event.target.matches('input, textarea')) {
            event.preventDefault();
            document.querySelector('input[type="text"]')?.focus();
        }
    }

    navigateToPreviousTopic() {
        // Implement navigation to previous topic
        this.showInfo('Navigating to previous topic...');
    }

    navigateToNextTopic() {
        // Implement navigation to next topic
        this.showInfo('Navigating to next topic...');
    }

    startExercise(topicId) {
        alert(`Starting exercise for ${topicId}. This would open a code editor or exercise interface.`);
        // trackEvent is not implemented; in a real app, integrate analytics here
    }

    loadProgress() {
        const saved = localStorage.getItem('codeMentorProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            // Convert arrays to Sets for easier management
            progress.startedTopics = new Set(progress.startedTopics || []);
            progress.completedTopics = new Set(progress.completedTopics || []);
            return progress;
        }
        
        return this.getDefaultProgress();
    }

    getDefaultProgress() {
        return {
            startedTopics: new Set(),
            completedTopics: new Set(),
            quizScores: {},
            timeSpent: {},
            lastActive: new Date().toISOString()
        };
    }

    saveProgress() {
        const progressToSave = {
            ...this.userProgress,
            startedTopics: Array.from(this.userProgress.startedTopics),
            completedTopics: Array.from(this.userProgress.completedTopics)
        };
        localStorage.setItem('codeMentorProgress', JSON.stringify(progressToSave));
    }

    updateProgressDisplay() {
        const completionPercentage = Math.round(
            (this.userProgress.completedTopics.size / 15) * 100
        );
        
        // Update progress bars
        document.querySelectorAll('.progress-percentage').forEach(el => {
            el.textContent = `${completionPercentage}%`;
        });
        
        // Update progress bar widths
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = `${completionPercentage}%`;
        });
    }

    setupMobileHandler() {
        // Check if mobile and initialize mobile-specific handlers
        if (window.innerWidth < 768) {
            this.isMobile = true;
            this.setupMobileGestures();
        }
    }

    setupMobileGestures() {
        // Swipe gestures for mobile navigation
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Horizontal swipe (min 50px)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next topic
                    this.navigateToNextTopic();
                } else {
                    // Swipe right - previous topic
                    this.navigateToPreviousTopic();
                }
            }

            startX = 0;
            startY = 0;
        });
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.getElementById('app-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const types = {
            error: { bg: 'bg-red-500', icon: 'fas fa-exclamation-circle' },
            success: { bg: 'bg-green-500', icon: 'fas fa-check-circle' },
            info: { bg: 'bg-blue-500', icon: 'fas fa-info-circle' }
        };

        const { bg, icon } = types[type] || types.info;

        const notification = document.createElement('div');
        notification.id = 'app-notification';
        notification.className = `fixed top-4 right-4 ${bg} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="${icon}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.remove('translate-x-full');
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
function chooseMode(mode) {
    if (!window.app) return;
    
    window.app.currentMode = mode;
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('classic').classList.add('hidden');
    document.getElementById('interactive').classList.add('hidden');
    document.getElementById(mode).classList.remove('hidden');

    // Load data for the selected mode
    if (mode === 'classic') {
        window.app.loadLearningPaths();
    } else if (mode === 'interactive') {
        window.app.loadInteractiveResources();
    }
}

function goToLanding() {
    if (!window.app) return;
    
    window.app.currentMode = 'landing';
    document.getElementById('landing').classList.remove('hidden');
    document.getElementById('classic').classList.add('hidden');
    document.getElementById('interactive').classList.add('hidden');
}

function toggleSidebar() {
    if (window.app) {
        window.app.toggleSidebar();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CodeMentorApp();
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CodeMentorApp, chooseMode, goToLanding };
}