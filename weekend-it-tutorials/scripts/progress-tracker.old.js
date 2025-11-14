// Progress tracking and user analytics system
class ProgressTracker {
    constructor() {
        this.userId = this.getOrCreateUserId();
        this.progress = this.loadProgress();
        this.initializeTracking();
    }

    getOrCreateUserId() {
        let userId = localStorage.getItem('codeMentorUserId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('codeMentorUserId', userId);
        }
        return userId;
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem(`codeMentorProgress_${this.userId}`);
            if (saved) {
                const progress = JSON.parse(saved);
                // Convert arrays back to Sets
                progress.startedTopics = new Set(progress.startedTopics || []);
                progress.completedTopics = new Set(progress.completedTopics || []);
                progress.bookmarkedTopics = new Set(progress.bookmarkedTopics || []);
                return progress;
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
        
        return this.getDefaultProgress();
    }

    getDefaultProgress() {
        return {
            startedTopics: new Set(),
            completedTopics: new Set(),
            bookmarkedTopics: new Set(),
            quizScores: {},
            timeSpent: {},
            streak: {
                current: 0,
                longest: 0,
                lastActivity: null
            },
            achievements: new Set(),
            lastActive: new Date().toISOString(),
            totalLearningTime: 0,
            sessionStart: null
        };
    }

    saveProgress() {
        try {
            const progressToSave = {
                ...this.progress,
                startedTopics: Array.from(this.progress.startedTopics),
                completedTopics: Array.from(this.progress.completedTopics),
                bookmarkedTopics: Array.from(this.progress.bookmarkedTopics),
                achievements: Array.from(this.progress.achievements)
            };
            
            localStorage.setItem(`codeMentorProgress_${this.userId}`, JSON.stringify(progressToSave));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    initializeTracking() {
        // Start session timer
        this.startSession();
        
        // Track page visibility for accurate time tracking
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseSession();
            } else {
                this.resumeSession();
            }
        });

        // Track beforeunload to save final session time
        window.addEventListener('beforeunload', () => {
            this.endSession();
        });

        // Update streak daily
        this.updateStreak();
    }

    startSession() {
        this.progress.sessionStart = new Date().toISOString();
        this.saveProgress();
    }

    pauseSession() {
        if (this.progress.sessionStart) {
            const sessionTime = Date.now() - new Date(this.progress.sessionStart).getTime();
            this.progress.totalLearningTime += sessionTime;
            this.progress.sessionStart = null;
            this.saveProgress();
        }
    }

    resumeSession() {
        if (!this.progress.sessionStart) {
            this.progress.sessionStart = new Date().toISOString();
            this.saveProgress();
        }
    }

    endSession() {
        this.pauseSession();
        this.progress.lastActive = new Date().toISOString();
        this.saveProgress();
    }

    startTopic(topicId) {
        this.progress.startedTopics.add(topicId);
        
        // Track start time for this topic
        this.progress.timeSpent[topicId] = this.progress.timeSpent[topicId] || {
            total: 0,
            sessions: []
        };
        
        this.progress.timeSpent[topicId].sessions.push({
            start: new Date().toISOString(),
            end: null
        });
        
        this.saveProgress();
        this.trackEvent('topic_start', { topicId });
    }

    completeTopic(topicId) {
        this.progress.completedTopics.add(topicId);
        
        // End current session for this topic
        const topicSessions = this.progress.timeSpent[topicId]?.sessions;
        if (topicSessions && topicSessions.length > 0) {
            const lastSession = topicSessions[topicSessions.length - 1];
            if (!lastSession.end) {
                lastSession.end = new Date().toISOString();
                const sessionTime = new Date(lastSession.end) - new Date(lastSession.start);
                this.progress.timeSpent[topicId].total += sessionTime;
            }
        }
        
        this.checkAchievements();
        this.updateStreak();
        this.saveProgress();
        this.trackEvent('topic_complete', { topicId });
    }

    toggleBookmark(topicId) {
        if (this.progress.bookmarkedTopics.has(topicId)) {
            this.progress.bookmarkedTopics.delete(topicId);
            this.trackEvent('bookmark_remove', { topicId });
        } else {
            this.progress.bookmarkedTopics.add(topicId);
            this.trackEvent('bookmark_add', { topicId });
        }
        this.saveProgress();
    }

    recordQuizScore(topicId, score, total, timeSpent) {
        this.progress.quizScores[topicId] = {
            score,
            total,
            percentage: Math.round((score / total) * 100),
            date: new Date().toISOString(),
            timeSpent
        };
        
        this.checkQuizAchievements(topicId, score, total);
        this.saveProgress();
        this.trackEvent('quiz_complete', { topicId, score, total, percentage: Math.round((score / total) * 100) });
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.progress.streak.lastActivity;
        
        if (!lastActivity) {
            // First activity
            this.progress.streak.current = 1;
            this.progress.streak.lastActivity = today;
        } else {
            const lastActivityDate = new Date(lastActivity);
            const todayDate = new Date(today);
            const diffTime = todayDate - lastActivityDate;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            
            if (diffDays === 1) {
                // Consecutive day
                this.progress.streak.current++;
            } else if (diffDays > 1) {
                // Broken streak
                this.progress.streak.current = 1;
            }
            // Same day - no change
            
            this.progress.streak.lastActivity = today;
        }
        
        // Update longest streak
        if (this.progress.streak.current > this.progress.streak.longest) {
            this.progress.streak.longest = this.progress.streak.current;
        }
        
        this.saveProgress();
    }

    checkAchievements() {
        const achievements = this.progress.achievements;
        const completedCount = this.progress.completedTopics.size;
        
        // Topic completion achievements
        if (completedCount >= 1 && !achievements.has('first_topic')) {
            achievements.add('first_topic');
            this.unlockAchievement('first_topic');
        }
        
        if (completedCount >= 5 && !achievements.has('fast_learner')) {
            achievements.add('fast_learner');
            this.unlockAchievement('fast_learner');
        }
        
        if (completedCount >= 10 && !achievements.has('dedicated_learner')) {
            achievements.add('dedicated_learner');
            this.unlockAchievement('dedicated_learner');
        }
        
        // Streak achievements
        if (this.progress.streak.current >= 7 && !achievements.has('weekly_commitment')) {
            achievements.add('weekly_commitment');
            this.unlockAchievement('weekly_commitment');
        }
    }

    checkQuizAchievements(topicId, score, total) {
        const achievements = this.progress.achievements;
        const percentage = (score / total) * 100;
        
        if (percentage >= 90 && !achievements.has('quiz_master')) {
            achievements.add('quiz_master');
            this.unlockAchievement('quiz_master');
        }
        
        if (percentage === 100 && !achievements.has('perfectionist')) {
            achievements.add('perfectionist');
            this.unlockAchievement('perfectionist');
        }
    }

    unlockAchievement(achievementId) {
        const achievementNames = {
            'first_topic': 'First Steps',
            'fast_learner': 'Fast Learner',
            'dedicated_learner': 'Dedicated Learner',
            'weekly_commitment': 'Weekly Commitment',
            'quiz_master': 'Quiz Master',
            'perfectionist': 'Perfectionist'
        };
        
        const name = achievementNames[achievementId] || achievementId;
        this.showAchievementNotification(name);
        this.trackEvent('achievement_unlock', { achievementId, name });
    }

    showAchievementNotification(achievementName) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-trophy"></i>
                <div>
                    <div class="font-semibold">Achievement Unlocked!</div>
                    <div class="text-sm">${achievementName}</div>
                </div>
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

    getCompletionStats() {
        const totalTopics = 25; // This should come from your content structure
        const completed = this.progress.completedTopics.size;
        const inProgress = this.progress.startedTopics.size - completed;
        const notStarted = totalTopics - completed - inProgress;
        
        return {
            totalTopics,
            completed,
            inProgress,
            notStarted,
            completionPercentage: Math.round((completed / totalTopics) * 100)
        };
    }

    getLearningTimeStats() {
        const totalTime = this.progress.totalLearningTime;
        const hours = Math.floor(totalTime / (1000 * 60 * 60));
        const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
        
        return {
            totalHours: hours,
            totalMinutes: minutes,
            formatted: `${hours}h ${minutes}m`
        };
    }

    getTopicTimeSpent(topicId) {
        const topicTime = this.progress.timeSpent[topicId];
        if (!topicTime) return { total: 0, formatted: '0m' };
        
        const minutes = Math.floor(topicTime.total / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        return {
            total: topicTime.total,
            formatted: hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes}m`
        };
    }

    generateProgressReport() {
        const stats = this.getCompletionStats();
        const timeStats = this.getLearningTimeStats();
        const streak = this.progress.streak;
        
        return {
            userId: this.userId,
            ...stats,
            ...timeStats,
            currentStreak: streak.current,
            longestStreak: streak.longest,
            achievements: this.progress.achievements.size,
            lastActive: this.progress.lastActive
        };
    }

    exportProgress() {
        const report = this.generateProgressReport();
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `codementor-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
            this.progress = this.getDefaultProgress();
            this.saveProgress();
            location.reload();
        }
    }

    trackEvent(eventName, properties = {}) {
        // In a real application, send to analytics service
        const event = {
            event: eventName,
            userId: this.userId,
            timestamp: new Date().toISOString(),
            ...properties
        };
        
        console.log('Tracking event:', event);
        
        // Example: Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }

    // Method to update progress display in UI
    updateProgressDisplay() {
        const stats = this.getCompletionStats();
        const timeStats = this.getLearningTimeStats();
        
        // Update progress bars
        document.querySelectorAll('.progress-percentage').forEach(el => {
            el.textContent = `${stats.completionPercentage}%`;
        });
        
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = `${stats.completionPercentage}%`;
        });
        
        // Update streak display
        document.querySelectorAll('.streak-count').forEach(el => {
            el.textContent = this.progress.streak.current;
        });
        
        // Update completed topics count
        document.querySelectorAll('.completed-count').forEach(el => {
            el.textContent = stats.completed;
        });
        
        // Update learning time
        document.querySelectorAll('.learning-time').forEach(el => {
            el.textContent = timeStats.formatted;
        });
    }
}

// Initialize progress tracker
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
    
    // Update progress display every minute
    setInterval(() => {
        window.progressTracker.updateProgressDisplay();
    }, 60000);
    
    // Initial update
    window.progressTracker.updateProgressDisplay();
});