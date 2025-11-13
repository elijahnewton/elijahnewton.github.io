// Progress tracking functionality
class ProgressTracker {
    constructor() {
        this.progressData = this.loadProgressData();
    }

    // Load progress data from localStorage
    loadProgressData() {
        const saved = localStorage.getItem('codementor-progress');
        return saved ? JSON.parse(saved) : {
            coursesCompleted: 3,
            currentStreak: 7,
            codeExercises: 24,
            skillLevel: 'Intermediate',
            pathProgress: {
                'c-programming-basics': 40,
                'web-development': 25
            }
        };
    }

    // Save progress data to localStorage
    saveProgressData() {
        localStorage.setItem('codementor-progress', JSON.stringify(this.progressData));
    }

    // Update progress for a specific path
    updatePathProgress(pathId, progress) {
        this.progressData.pathProgress[pathId] = progress;
        this.saveProgressData();
        this.updateProgressDisplay();
    }

    // Complete a lesson
    completeLesson(pathId, lessonId) {
        // Implementation for marking lesson as complete
        console.log(`Completed lesson ${lessonId} in path ${pathId}`);
    }

    // Update the progress display
    updateProgressDisplay() {
        const stats = document.getElementById('progress-stats');
        if (stats) {
            // Update progress stats if on progress page
        }
    }

    // Get overall progress
    getOverallProgress() {
        const paths = Object.values(this.progressData.pathProgress);
        return paths.length > 0 ? 
            paths.reduce((sum, progress) => sum + progress, 0) / paths.length : 0;
    }
}

// Initialize progress tracker
const progressTracker = new ProgressTracker();