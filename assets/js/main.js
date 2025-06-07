// Main JavaScript for the research paper page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize fade-in animations
    setTimeout(initFadeInAnimation, 500);
    
    // Initialize video functionality
    initVideoFunctionality();
});

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// Add fade-in animation for content
function initFadeInAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.abstract-section, .video-grid-section, .method-section, .archive__item');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize video functionality
function initVideoFunctionality() {
    const videos = document.querySelectorAll('video[data-video-id]');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const playPauseButtons = document.querySelectorAll('.video-play-pause-btn');
    
    // Track manually controlled videos to prevent auto-restart conflicts
    const manuallyControlledVideos = new Set();
    
    // Setup video ended event listeners for 2-second pause loop
    videos.forEach(video => {
        video.addEventListener('ended', function() {
            updatePlayPauseButton(video, false);
            
            setTimeout(() => {
                if (isVideoVisible(video) && !manuallyControlledVideos.has(video)) {
                    video.currentTime = 0;
                    video.play().catch(e => {
                        console.log('Autoplay prevented:', e);
                    });
                }
            }, 2000);
        });
        
        // Update button state when video plays/pauses
        video.addEventListener('play', function() {
            updatePlayPauseButton(video, true);
        });
        
        video.addEventListener('pause', function() {
            updatePlayPauseButton(video, false);
        });
        
        // Ensure video can autoplay when visible
        video.addEventListener('canplaythrough', function() {
            if (isVideoVisible(video) && !manuallyControlledVideos.has(video)) {
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            }
        });
        
        // Keyboard support for focused videos
        video.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                toggleVideoPlayback(video);
            }
        });
    });
    
    // Setup play/pause button functionality
    playPauseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const video = this.closest('.video-container-with-controls').querySelector('video');
            if (video) {
                toggleVideoPlayback(video);
                // Mark as manually controlled temporarily
                manuallyControlledVideos.add(video);
                // Remove manual control flag after 5 seconds of inactivity
                setTimeout(() => {
                    manuallyControlledVideos.delete(video);
                }, 5000);
            }
        });
    });
    
    // Handle radio button changes to restart videos
    radioInputs.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Clear manual control flags when switching videos
                manuallyControlledVideos.clear();
                
                setTimeout(() => {
                    const activeVideoItem = getActiveVideoItem(this);
                    if (activeVideoItem) {
                        const video = activeVideoItem.querySelector('video');
                        if (video) {
                            video.currentTime = 0;
                            video.play().catch(e => {
                                console.log('Autoplay prevented:', e);
                            });
                        }
                    }
                }, 100);
            }
        });
    });
    
    // Observer for when videos come into viewport
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target.querySelector('video');
                if (video && isVideoVisible(video)) {
                    // Clear manual control when video comes into view
                    manuallyControlledVideos.delete(video);
                    video.currentTime = 0;
                    video.play().catch(e => {
                        console.log('Autoplay prevented:', e);
                    });
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe video items instead of videos directly
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        videoObserver.observe(item);
    });
}

// Check if video is currently visible (not hidden by CSS)
function isVideoVisible(video) {
    const videoItem = video.closest('.video-item');
    if (!videoItem) return false;
    
    const computedStyle = window.getComputedStyle(videoItem);
    return computedStyle.display !== 'none';
}

// Get the active video item for a given radio button
function getActiveVideoItem(radio) {
    const section = radio.closest('.video-grid-section');
    if (!section) return null;
    
    const videoGrid = section.querySelector('.video-grid');
    if (!videoGrid) return null;
    
    // Determine which video should be active based on radio button
    const radioName = radio.name;
    const radioId = radio.id;
    
    let index = 0;
    if (radioId.includes('1')) index = 0;
    else if (radioId.includes('2')) index = 1;
    else if (radioId.includes('3')) index = 2;
    
    const videoItems = videoGrid.querySelectorAll('.video-item');
    return videoItems[index] || null;
}

// Toggle video playback (play/pause)
function toggleVideoPlayback(video) {
    if (video.paused) {
        video.play().catch(e => {
            console.log('Play prevented:', e);
        });
    } else {
        video.pause();
    }
}

// Update play/pause button icon and state
function updatePlayPauseButton(video, isPlaying) {
    const container = video.closest('.video-container-with-controls');
    if (!container) return;
    
    const button = container.querySelector('.video-play-pause-btn');
    const icon = button.querySelector('i');
    
    if (isPlaying) {
        icon.className = 'fas fa-pause';
        button.classList.add('playing');
        button.setAttribute('aria-label', 'Pause video');
    } else {
        icon.className = 'fas fa-play';
        button.classList.remove('playing');
        button.setAttribute('aria-label', 'Play video');
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
