// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Toggle User Menu
function toggleUserMenu() {
    const options = ['View Profile', 'Settings', 'Help', 'Logout'];
    alert('User menu - ' + options.join(', '));
}

// Show Notifications
function showNotifications() {
    const userData = window.initializeUserData ? window.initializeUserData() : null;
    const badges = userData ? userData.unlockedBadges.length : 0;
    
    let notifications = 'Notifications:\n';
    if (badges > 0) {
        notifications += `• You have ${badges} badge(s)!\n`;
    }
    notifications += '• Start learning to earn rewards\n';
    notifications += '• Complete daily goals for bonus points';
    
    alert(notifications);
}

// Load dashboard data dynamically
function loadDashboardData() {
    try {
        if (typeof window.initializeUserData !== 'function') return;
        
        const userData = window.initializeUserData();
        
        // Update stats
        const streakEl = document.querySelector('.stat-item:nth-child(1) .stat-value');
        const levelEl = document.querySelector('.stat-item:nth-child(2) .stat-value');
        const pointsEl = document.querySelector('.stat-item:nth-child(3) .stat-value');
        
        if (streakEl && userData.streak !== undefined) streakEl.textContent = userData.streak + ' Days';
        if (levelEl && userData.level !== undefined) levelEl.textContent = 'Level ' + userData.level;
        if (pointsEl && userData.points !== undefined) pointsEl.textContent = userData.points.toLocaleString();
    
    // Update progress
    const overallProgress = Math.round((userData.lessonsCompleted / userData.totalLessons) * 100);
    const progressFill = document.querySelector('.overall-progress .progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    if (progressFill) progressFill.style.width = overallProgress + '%';
    if (progressPercentage) progressPercentage.textContent = overallProgress + '%';
    
    // Update module progress if getModuleProgress exists
    if (typeof window.getModuleProgress === 'function') {
        for (let i = 1; i <= 6; i++) {
            const progress = window.getModuleProgress(i);
            const moduleItem = document.querySelectorAll('.module-item')[i - 1];
            if (moduleItem) {
                const fill = moduleItem.querySelector('.progress-fill');
                const percentage = moduleItem.querySelector('.module-percentage');
                if (fill) fill.style.width = progress.percentage + '%';
                if (percentage) percentage.textContent = progress.percentage + '%';
                
                // Update status
                moduleItem.classList.remove('completed', 'active', 'locked');
                if (progress.percentage === 100) {
                    moduleItem.classList.add('completed');
                    moduleItem.querySelector('.module-icon').textContent = '✓';
                } else if (progress.percentage > 0) {
                    moduleItem.classList.add('active');
                    moduleItem.querySelector('.module-icon').textContent = '⚡';
                } else {
                    moduleItem.classList.add('locked');
                    moduleItem.querySelector('.module-icon').textContent = '🔒';
                }
            }
        }
    }
    
    // Update continue learning section
    updateContinueLearning(userData);
    
    // Update achievements
    updateAchievements(userData);
    
    // Update study stats
    updateStudyStats(userData);
    
    // Update goals
    updateGoalsFromData(userData);
    
        // Update notification badge
        const notifBadge = document.querySelector('.notification-icon .badge');
        if (notifBadge && userData.unlockedBadges) {
            notifBadge.textContent = userData.unlockedBadges.length;
        }
    } catch (error) {
        console.log('Error loading dashboard data:', error);
    }
}

// Update continue learning section
function updateContinueLearning(userData) {
    // Only run on dashboard page
    if (!document.getElementById('current-lesson-title')) {
        return;
    }
    
    const lessonTitle = document.getElementById('current-lesson-title');
    const lessonDesc = document.getElementById('current-lesson-desc');
    const progressText = document.getElementById('lesson-progress-text');
    const timeRemaining = document.getElementById('lesson-time-remaining');
    const progressBar = document.getElementById('lesson-progress-bar');
    const resumeBtn = document.getElementById('resume-lesson-btn');
    
    // Check if all required elements exist
    if (!lessonTitle || !lessonDesc || !progressText || !timeRemaining || !progressBar || !resumeBtn) {
        console.log('Continue learning elements not found, skipping update');
        return;
    }
    
    if (userData.lessonsCompleted === 0) {
        // First lesson
        lessonTitle.textContent = 'Lesson 1: Mouth Anatomy & Letter Origins';
        lessonDesc.textContent = 'Start with understanding how Arabic sounds are made';
        progressText.textContent = 'Ready to start';
        timeRemaining.textContent = '~20 mins';
        progressBar.style.width = '0%';
        resumeBtn.textContent = 'Start Learning →';
        resumeBtn.onclick = () => window.location.href = 'lesson-detail.html?id=1';
    } else if (userData.lessonsCompleted < userData.totalLessons) {
        // Next lesson
        const nextLesson = userData.lessonsCompleted + 1;
        lessonTitle.textContent = `Lesson ${nextLesson}: Next Lesson`;
        lessonDesc.textContent = 'Continue your learning journey';
        progressText.textContent = 'Ready to continue';
        timeRemaining.textContent = '~20 mins';
        progressBar.style.width = '0%';
        resumeBtn.textContent = 'Continue Learning →';
        resumeBtn.onclick = () => window.location.href = `lesson-detail.html?id=${nextLesson}`;
    } else {
        // All lessons completed
        lessonTitle.textContent = 'Congratulations! 🎉';
        lessonDesc.textContent = 'You have completed all lessons!';
        progressText.textContent = '100% Complete';
        timeRemaining.textContent = 'Review mode';
        progressBar.style.width = '100%';
        resumeBtn.textContent = 'Review Lessons →';
        resumeBtn.onclick = () => window.location.href = 'lessons.html';
    }
}

// Update achievements section
function updateAchievements(userData) {
    const achievementsGrid = document.getElementById('achievements-grid');
    if (!achievementsGrid) return;
    
    const allBadges = [
        { id: 'first-step', name: 'First Step', desc: 'Complete your first lesson', icon: '🚀', unlocked: userData.lessonsCompleted >= 1 },
        { id: '3-day-streak', name: '3-Day Streak', desc: 'Learn for 3 days in a row', icon: '🔥', unlocked: userData.streak >= 3 },
        { id: '7-day-streak', name: '7-Day Streak', desc: 'Learn for 7 days in a row', icon: '⭐', unlocked: userData.streak >= 7 },
        { id: 'perfect-score', name: 'Perfect Score', desc: 'Get 100% on any lesson', icon: '💯', unlocked: userData.scores.some(s => s.score === 100) },
        { id: 'alphabet-master', name: 'Alphabet Master', desc: 'Complete Module 1', icon: '🏆', unlocked: userData.lessonsCompleted >= 2 },
        { id: 'letters-master', name: 'Letters Master', desc: 'Complete all letter modules', icon: '📚', unlocked: userData.lessonsCompleted >= 14 },
        { id: 'vowel-expert', name: 'Vowel Expert', desc: 'Complete all modules', icon: '📖', unlocked: userData.lessonsCompleted >= 24 }
    ];
    
    // Show only unlocked badges and next 2 locked ones
    const unlockedBadges = allBadges.filter(b => b.unlocked);
    const lockedBadges = allBadges.filter(b => !b.unlocked).slice(0, 2);
    const displayBadges = [...unlockedBadges, ...lockedBadges].slice(0, 4);
    
    achievementsGrid.innerHTML = displayBadges.map(badge => `
        <div class="achievement-badge ${badge.unlocked ? '' : 'locked'}">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-desc">${badge.desc}</div>
        </div>
    `).join('');
}

// Update study stats
function updateStudyStats(userData) {
    // Update time spent
    const timeSpentEl = document.getElementById('time-spent');
    if (timeSpentEl) {
        const hours = Math.floor(userData.timeSpent / 60);
        const minutes = userData.timeSpent % 60;
        if (hours > 0) {
            timeSpentEl.textContent = `${hours}h ${minutes}m`;
        } else {
            timeSpentEl.textContent = `${minutes}m`;
        }
    }
    
    // Update lessons completed
    const lessonsCompletedEl = document.getElementById('lessons-completed');
    if (lessonsCompletedEl) {
        lessonsCompletedEl.textContent = userData.lessonsCompleted;
    }
    
    // Update average score
    const avgScoreEl = document.getElementById('avg-score');
    if (avgScoreEl) {
        if (userData.scores.length > 0) {
            const avgScore = Math.round(userData.scores.reduce((sum, s) => sum + s.score, 0) / userData.scores.length);
            avgScoreEl.textContent = `${avgScore}%`;
        } else {
            avgScoreEl.textContent = '0%';
        }
    }
    
    // Update weekly chart
    updateWeeklyChart(userData);
}

// Update weekly chart
function updateWeeklyChart(userData) {
    const chartContainer = document.getElementById('weekly-chart');
    if (!chartContainer) return;
    
    // Generate random data for demo (in real app, this would come from actual study data)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const heights = [30, 60, 40, 75, 55, 20, 90].map(h => Math.min(h, userData.lessonsCompleted * 10));
    
    chartContainer.innerHTML = days.map((day, index) => `
        <div class="bar-container">
            <div class="bar" style="height: ${heights[index]}%"></div>
            <span class="bar-label">${day}</span>
        </div>
    `).join('');
}

// Start next lesson
function startNextLesson() {
    const userData = window.initializeUserData();
    const nextLesson = userData.lessonsCompleted + 1;
    window.location.href = `lesson-detail.html?id=${nextLesson}`;
}

// Update goals from user data
function updateGoalsFromData(userData) {
    const checkboxes = document.querySelectorAll('.goal-item input[type="checkbox"]');
    if (checkboxes.length >= 4) {
        checkboxes[0].checked = userData.goals.dailyLesson;
        checkboxes[1].checked = userData.goals.practiceTime;
        checkboxes[2].checked = userData.goals.dailyLogin;
        checkboxes[3].checked = userData.goals.highScore;
        
        // Update visual state
        checkboxes.forEach((checkbox, index) => {
            const goalItem = checkbox.closest('.goal-item');
            if (checkbox.checked) {
                goalItem.classList.add('completed');
            } else {
                goalItem.classList.remove('completed');
            }
        });
    }
    
    updateGoalsProgress();
}

// Animate progress bars on page load
window.addEventListener('load', () => {
    // Only load dashboard data on dashboard page
    if (document.getElementById('current-lesson-title') && typeof window.initializeUserData === 'function') {
        loadDashboardData();
    }
    
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });

    // Animate chart bars
    const chartBars = document.querySelectorAll('.bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = height;
        }, 200 + (index * 50));
    });
});

// Goals checkbox handling
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.goal-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const goalItem = e.target.closest('.goal-item');
            if (e.target.checked) {
                goalItem.classList.add('completed');
                // Show celebration animation
                showCelebration();
            } else {
                goalItem.classList.remove('completed');
            }
            updateGoalsProgress();
        });
    });
});

function updateGoalsProgress() {
    const checkboxes = document.querySelectorAll('.goal-item input[type="checkbox"]');
    const checked = document.querySelectorAll('.goal-item input[type="checkbox"]:checked').length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);
    
    const summaryText = document.querySelector('.goals-summary span:first-child');
    const percentageText = document.querySelector('.goals-percentage');
    
    if (summaryText && percentageText) {
        summaryText.textContent = `Completed: ${checked}/${total}`;
        percentageText.textContent = `${percentage}%`;
    }
}

function showCelebration() {
    // Simple celebration effect
    const celebration = document.createElement('div');
    celebration.textContent = '🎉';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        animation: celebrate 0.5s ease-out;
        pointer-events: none;
        z-index: 10000;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrate {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
        style.remove();
    }, 500);
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (window.innerWidth <= 1024 && 
        sidebar && 
        sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !menuIcon.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

