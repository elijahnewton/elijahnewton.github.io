// Mobile-specific functionality and touch handlers
class MobileHandler {
    constructor() {
        this.isMobile = this.checkMobile();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.setupMobileFeatures();
    }

    checkMobile() {
        return window.innerWidth < 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    setupMobileFeatures() {
        if (!this.isMobile) return;

        this.setupTouchGestures();
        this.setupViewportMeta();
        this.setupMobileOptimizations();
        this.setupPullToRefresh();
        this.setupFastClick();
    }

    setupTouchGestures() {
        // Swipe gestures for navigation
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!this.touchStartX || !this.touchStartY) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = this.touchStartX - touchEndX;
            const diffY = this.touchStartY - touchEndY;

            // Only consider horizontal swipes with minimal vertical movement
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50 && Math.abs(diffY) < 100) {
                if (diffX > 0) {
                    // Swipe left - next
                    this.handleSwipeLeft();
                } else {
                    // Swipe right - previous
                    this.handleSwipeRight();
                }
            }

            this.touchStartX = 0;
            this.touchStartY = 0;
        }, { passive: true });

        // Double tap to zoom prevention
        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
            }
            lastTap = currentTime;
        }, { passive: false });
    }

    handleSwipeLeft() {
        // Navigate to next topic in classic mode
        if (window.app?.currentMode === 'classic' && window.app.currentTopic) {
            window.app.navigateToNextTopic();
        }
    }

    handleSwipeRight() {
        // Navigate to previous topic in classic mode
        if (window.app?.currentMode === 'classic' && window.app.currentTopic) {
            window.app.navigateToPreviousTopic();
        } else if (window.app?.currentMode !== 'landing') {
            // Go back to previous section or landing
            if (window.navigationManager) {
                window.navigationManager.goBack();
            }
        }
    }

    setupViewportMeta() {
        // Ensure viewport meta tag is properly set
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }

    setupMobileOptimizations() {
        // Add mobile-specific CSS class
        document.documentElement.classList.add('mobile-device');

        // Optimize images for mobile
        this.optimizeImages();

        // Adjust font sizes for better readability
        this.adjustTextSizes();

        // Improve touch targets
        this.improveTouchTargets();

        // Handle orientation changes
        this.setupOrientationHandler();
    }

    optimizeImages() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    adjustTextSizes() {
        // Increase base font size slightly for mobile
        if (window.innerWidth < 400) {
            document.documentElement.style.fontSize = '16px';
        }
    }

    improveTouchTargets() {
        // Ensure all interactive elements have adequate touch target size
        const touchElements = document.querySelectorAll('button, a, [role="button"], input, select');
        touchElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                el.style.minHeight = '44px';
                el.style.minWidth = '44px';
                el.style.padding = '12px 8px';
            }
        });
    }

    setupOrientationHandler() {
        window.addEventListener('orientationchange', () => {
            // Delay to allow orientation to complete
            setTimeout(() => {
                this.handleOrientationChange();
            }, 300);
        });

        // Initial call
        this.handleOrientationChange();
    }

    handleOrientationChange() {
        const isPortrait = window.innerHeight > window.innerWidth;
        
        if (isPortrait) {
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        } else {
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
            
            // Adjust layout for landscape
            this.adjustForLandscape();
        }

        // Notify other components of orientation change
        this.dispatchOrientationEvent(isPortrait);
    }

    adjustForLandscape() {
        // Specific adjustments for landscape mode
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('classic-content');
        
        if (sidebar && content) {
            // In landscape, we might want to adjust sidebar behavior
            sidebar.classList.add('landscape-sidebar');
        }
    }

    dispatchOrientationEvent(isPortrait) {
        const event = new CustomEvent('orientationchange', {
            detail: { isPortrait, orientation: isPortrait ? 'portrait' : 'landscape' }
        });
        document.dispatchEvent(event);
    }

    setupPullToRefresh() {
        // Prevent pull-to-refresh on mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) return;
            
            const touch = e.touches[0];
            const startY = touch.clientY;
            
            if (startY > 100) { // Only prevent if not at the very top
                e.preventDefault();
            }
        }, { passive: false });
    }

    setupFastClick() {
        // Remove 300ms delay on touch devices
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) return;
            
            const target = e.target;
            if (this.isTouchElement(target)) {
                target.classList.add('touch-active');
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const target = e.target;
            if (this.isTouchElement(target)) {
                target.classList.remove('touch-active');
            }
        }, { passive: true });
    }

    isTouchElement(element) {
        return element.matches('button, a, [role="button"], input, select, [onclick]');
    }

    // Mobile-specific utility methods
    showMobileKeyboard(element) {
        // Ensure element is visible and focused for keyboard
        if (element && this.isMobile) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
        }
    }

    hideMobileKeyboard() {
        // Blur active element to hide keyboard
        if (document.activeElement && this.isMobile) {
            document.activeElement.blur();
        }
    }

    vibrate(pattern = 50) {
        // Provide haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }

    // Network status monitoring for mobile
    setupNetworkMonitoring() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            connection.addEventListener('change', () => {
                this.handleNetworkChange(connection);
            });
            
            // Initial check
            this.handleNetworkChange(connection);
        }
    }

    handleNetworkChange(connection) {
        const isSlow = connection.saveData || 
                      connection.effectiveType === 'slow-2g' || 
                      connection.effectiveType === '2g';
        
        if (isSlow) {
            document.body.classList.add('slow-connection');
            this.enableDataSaverMode();
        } else {
            document.body.classList.remove('slow-connection');
            this.disableDataSaverMode();
        }
    }

    enableDataSaverMode() {
        // Reduce image quality, disable animations, etc.
        document.body.classList.add('data-saver');
        
        // Notify user
        this.showToast('Data saver mode enabled due to slow connection');
    }

    disableDataSaverMode() {
        document.body.classList.remove('data-saver');
    }

    showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 left-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-center z-50 transform translate-y-full transition-transform duration-300';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-full');
        });
        
        // Auto remove
        setTimeout(() => {
            toast.classList.add('translate-y-full');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Install Prompt for PWA
    setupPWAInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            
            // Show install button
            this.showInstallButton();
        });
        
        // Add install button handler
        document.addEventListener('click', (e) => {
            if (e.target.id === 'install-button' && deferredPrompt) {
                // Show the install prompt
                deferredPrompt.prompt();
                
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    } else {
                        console.log('User dismissed the install prompt');
                    }
                    deferredPrompt = null;
                    
                    // Hide install button
                    this.hideInstallButton();
                });
            }
        });
    }

    showInstallButton() {
        let installButton = document.getElementById('install-button');
        if (!installButton) {
            installButton = document.createElement('button');
            installButton.id = 'install-button';
            installButton.className = 'fixed bottom-20 right-4 bg-primary-500 text-white p-3 rounded-full shadow-lg z-40';
            installButton.innerHTML = '<i class="fas fa-download"></i>';
            installButton.title = 'Install App';
            document.body.appendChild(installButton);
        }
        installButton.classList.remove('hidden');
    }

    hideInstallButton() {
        const installButton = document.getElementById('install-button');
        if (installButton) {
            installButton.classList.add('hidden');
        }
    }
}

// Initialize mobile handler
document.addEventListener('DOMContentLoaded', () => {
    window.mobileHandler = new MobileHandler();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileHandler;
}