// Content loading and management system
class ContentLoader {
    // static async loadTopicContent(topicId) {
    //     try {
    //         // Show loading state
    //         this.showLoadingState();
            
    //         // Try to load from specific topic file first
    //         let topic;
    //         try {
    //             const response = await fetch(`content/topics/${topicId}.json`);
    //             topic = await response.json();
    //         } catch (error) {
    //             // Fallback: search in all topic files
    //             topic = await this.findTopicInAllFiles(topicId);
    //         }

    //         if (topic) {
    //             this.renderTopicContent(topic);
    //             this.trackTopicView(topicId);
    //         } else {
    //             throw new Error(`Topic ${topicId} not found`);
    //         }
    //     } catch (error) {
    //         console.error('Error loading topic:', error);
    //         this.showErrorState(topicId);
    //     } finally {
    //         this.hideLoadingState();
    //     }
    // }

    // Replace the loadTopicContent method with:
    static async loadTopicContent(topicId) {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Map topic IDs to their actual file names
            const topicFileMap = {
                'c-setup': 'c-setup',
                'c-variables': 'c-variables',
                'c-operators': 'c-operators',
                'c-control-flow': 'c-control-flow',
                'c-functions': 'c-functions',
                'c-arrays': 'c-arrays',
                'c-pointers': 'c-pointers',
                'c-structures': 'c-structures',
                'c-file-io': 'c-file-io',
                'c-project': 'c-project',
                'web-html': 'web-html',
                'web-css': 'web-css',
                'web-js': 'web-js',
                'web-dom': 'web-dom',
                'web-responsive': 'web-responsive',
                'web-apis': 'web-apis',
                'web-frameworks': 'web-frameworks',
                'web-project': 'web-project',
                'cyber-intro': 'cyber-intro',
                'cyber-threats': 'cyber-threats',
                'cyber-cryptography': 'cyber-cryptography',
                'cyber-network': 'cyber-network',
                'cyber-web-security': 'cyber-web-security',
                'cyber-ethics': 'cyber-ethics',
                'cyber-forensics': 'cyber-forensics'
            };
        
        const fileName = topicFileMap[topicId];
        if (!fileName) {
            throw new Error(`Topic ${topicId} not found in mapping`);
        }

        const response = await fetch(`content/topics/${fileName}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load topic: ${response.status}`);
        }
        
        const topic = await response.json();
        this.renderTopicContent(topic);
        this.trackTopicView(topicId);
        
    } catch (error) {
        console.error('Error loading topic:', error);
        this.showErrorState(topicId);
    } finally {
        this.hideLoadingState();
    }
}

    static async findTopicInAllFiles(topicId) {
        const topicFiles = [
            'content/topics/c-programming.json',
            'content/topics/web-development.json',
            'content/topics/cyber-security.json',
            'content/topics/data-structures.json',
            'content/topics/python-programming.json'
        ];

        for (const file of topicFiles) {
            try {
                const response = await fetch(file);
                const data = await response.json();
                
                if (data.topics) {
                    const topic = data.topics.find(t => t.id === topicId);
                    if (topic) return topic;
                }
            } catch (error) {
                console.warn(`Failed to load ${file}:`, error);
            }
        }
        return null;
    }

    static renderTopicContent(topic) {
        const container = document.getElementById('classic-content');
        
        container.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <!-- Breadcrumbs -->
                <nav class="breadcrumbs mb-4 text-sm text-gray-600">
                    <a href="#" onclick="goToLanding()" class="hover:text-primary-600">Home</a>
                    <span class="mx-2">/</span>
                    <a href="#" onclick="chooseMode('classic')" class="hover:text-primary-600">Structured Learning</a>
                    <span class="mx-2">/</span>
                    <span class="text-primary-700 font-medium">${topic.title}</span>
                </nav>

                <!-- Topic Content -->
                <div class="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold text-primary-800">${topic.icon} ${topic.title}</h3>
                            <p class="text-gray-600 text-sm mt-1">${topic.description || ''}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="badge badge-${topic.level.toLowerCase()}">${topic.level}</span>
                            ${topic.estimatedTime ? `
                                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    <i class="fas fa-clock mr-1"></i>${topic.estimatedTime}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${topic.objectives ? `
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                            <h4 class="font-semibold text-blue-800 mb-2">🎯 Learning Objectives</h4>
                            <ul class="list-disc list-inside text-blue-700 space-y-1">
                                ${topic.objectives.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    <div class="prose max-w-none">
                        ${topic.content}
                    </div>

                    ${topic.codeExample ? `
                        <div class="code-block mt-6">
                            <div class="code-header">
                                <span>${topic.codeLanguage || 'c'}</span>
                                <button class="copy-btn" onclick="app.copyCode(this)">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                            <pre><code class="language-${topic.codeLanguage || 'c'}">${this.escapeHtml(topic.codeExample)}</code></pre>
                        </div>
                    ` : ''}

                    ${topic.notes ? `
                        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                            <h5 class="font-semibold text-yellow-800 mb-2">💡 Important Notes</h5>
                            <div class="text-yellow-700">${topic.notes}</div>
                        </div>
                    ` : ''}

                    ${topic.exercise ? `
                        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
                            <h5 class="font-semibold text-green-800 mb-2">✅ Practice Exercise</h5>
                            <p class="text-green-700 mb-3">${topic.exercise.description}</p>
                            ${topic.exercise.requirements ? `
                                <ul class="list-disc list-inside text-green-700 mb-3">
                                    ${topic.exercise.requirements.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                            ` : ''}
                            <button onclick="app.startExercise('${topic.id}')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                                <i class="fas fa-play mr-2"></i>Start Exercise
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- Topic Navigation -->
                <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <button onclick="app.navigateToPreviousTopic()" class="bg-primary-500 hover:bg-primary-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="fas fa-arrow-left mr-2"></i>Previous
                    </button>
                    
                    <div class="flex items-center space-x-4">
                        <button onclick="app.toggleBookmark('${topic.id}')" class="text-gray-500 hover:text-yellow-500 transition-colors">
                            <i class="far fa-bookmark"></i>
                        </button>
                        <button onclick="app.completeTopic('${topic.id}')" class="bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors flex items-center text-sm">
                            ${app.userProgress.completedTopics.has(topic.id) ? 'Completed' : 'Mark Complete'} 
                            <i class="fas fa-check ml-2"></i>
                        </button>
                    </div>

                    <button onclick="app.navigateToNextTopic()" class="bg-primary-500 hover:bg-primary-600 text-white px-4 md:px-6 py-2 rounded-lg transition-colors flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                        Next<i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>

                <!-- Related Topics -->
                ${topic.relatedTopics ? `
                    <div class="mt-8">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4">📚 Related Topics</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            ${topic.relatedTopics.map(related => `
                                <button onclick="app.showTopic('${related.id}')" class="text-left p-3 bg-gray-50 hover:bg-primary-50 rounded-lg border border-gray-200 transition-colors">
                                    <div class="font-medium text-primary-700">${related.title}</div>
                                    <div class="text-sm text-gray-600 mt-1">${related.description}</div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        // Update progress indicator
        this.updateTopicProgress(topic.id);
    }

    static updateTopicProgress(topicId) {
        const progress = app.userProgress;
        const isCompleted = progress.completedTopics.has(topicId);
        const isStarted = progress.startedTopics.has(topicId);

        // Update completion status in UI
        const completeButton = document.querySelector('button[onclick*="completeTopic"]');
        if (completeButton && isCompleted) {
            completeButton.innerHTML = 'Completed <i class="fas fa-check ml-2"></i>';
            completeButton.classList.add('bg-green-600');
            completeButton.classList.remove('bg-green-500', 'hover:bg-green-600');
        }
    }

    static showLoadingState() {
        const container = document.getElementById('classic-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto text-center py-12">
                <div class="loading mx-auto mb-4"></div>
                <p class="text-gray-600">Loading topic content...</p>
            </div>
        `;
    }

    static hideLoadingState() {
        // Loading state is replaced by actual content
    }

    static showErrorState(topicId) {
        const container = document.getElementById('classic-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Content Not Available</h3>
                <p class="text-gray-600 mb-6">We couldn't load the topic "${topicId}". It might be under development.</p>
                <button onclick="goToLanding()" class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Return to Home
                </button>
            </div>
        `;
    }

    static escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    static trackTopicView(topicId) {
        // In a real app, send to analytics
        console.log('Topic viewed:', topicId);
        
        // Update last accessed
        if (app.userProgress) {
            app.userProgress.lastAccessed = new Date().toISOString();
            app.userProgress.lastTopic = topicId;
            app.saveProgress();
        }
    }

    // Resource loading for interactive mode
    static async loadInteractiveResources(category = 'all') {
        try {
            const response = await fetch('content/resources/interactive-resources.json');
            const resources = await response.json();
            
            let filteredResources = resources;
            if (category !== 'all') {
                filteredResources = resources.filter(resource => 
                    resource.category === category || resource.tags.includes(category)
                );
            }
            
            this.renderInteractiveResources(filteredResources);
        } catch (error) {
            console.error('Error loading interactive resources:', error);
            this.showResourcesError();
        }
    }

    static renderInteractiveResources(resources) {
        const container = document.getElementById('resources-container');
        
        if (resources.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">No resources found for this category.</p>
                </div>
            `;
            return;
        }

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
                            <button onclick="app.handleResourceClick('${link.type}', '${resource.id}')" 
                                    class="resource-link group" data-type="${link.type}">
                                <i class="${link.icon} mr-1 md:mr-2"></i>${link.label}
                            </button>
                        `).join('')}
                    </div>
                    <div class="flex justify-between items-center text-xs text-gray-500">
                        <span>${resource.duration}</span>
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-400 mr-1"></i>
                            <span>${resource.rating}</span>
                            <span class="mx-1">•</span>
                            <i class="fas fa-download mr-1"></i>
                            <span>${resource.downloads || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    static showResourcesError() {
        const container = document.getElementById('resources-container');
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-wifi text-4xl text-red-300 mb-4"></i>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Connection Error</h3>
                <p class="text-gray-600 mb-4">Failed to load resources. Please check your connection.</p>
                <button onclick="ContentLoader.loadInteractiveResources()" class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Try Again
                </button>
            </div>
        `;
    }

    // Load external content (videos, presentations, etc.)
    static async loadExternalContent(url, type) {
        try {
            // Show loading state
            this.showExternalContentLoading();
            
            // In a real app, this would fetch and process external content
            // For now, we'll simulate loading
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.renderExternalContent(url, type);
        } catch (error) {
            console.error('Error loading external content:', error);
            this.showExternalContentError(url, type);
        }
    }

    static showExternalContentLoading() {
        // Show loading modal or overlay
        console.log('Loading external content...');
    }

    static renderExternalContent(url, type) {
        // Render different content based on type
        switch(type) {
            case 'video':
                this.renderVideoPlayer(url);
                break;
            case 'slides':
                this.renderSlidesViewer(url);
                break;
            case 'code':
                this.renderCodeEditor(url);
                break;
            default:
                window.open(url, '_blank');
        }
    }

    static renderVideoPlayer(url) {
        // Create video player modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg w-full max-w-4xl">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="text-lg font-semibold">Video Tutorial</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="p-4">
                    <div class="aspect-w-16 aspect-h-9 bg-gray-900 rounded">
                        <div class="flex items-center justify-center h-64 text-white">
                            <i class="fas fa-play-circle text-4xl mr-3"></i>
                            Video Player Placeholder
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 mt-4">Video URL: ${url}</p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    static renderSlidesViewer(url) {
        // Similar implementation for slides
        console.log('Opening slides:', url);
        window.open(url, '_blank');
    }

    static renderCodeEditor(url) {
        // Similar implementation for code editor
        console.log('Opening code template:', url);
        window.open(url, '_blank');
    }

    static showExternalContentError(url, type) {
        alert(`Failed to load ${type} from ${url}. Please try again or contact support.`);
    }
}

// Make ContentLoader available globally
window.ContentLoader = ContentLoader;