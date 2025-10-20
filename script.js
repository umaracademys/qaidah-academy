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
    if (typeof window.initializeUserData !== 'function') return;
    
    const userData = window.initializeUserData();
    
    // Update stats
    const streakEl = document.querySelector('.stat-item:nth-child(1) .stat-value');
    const levelEl = document.querySelector('.stat-item:nth-child(2) .stat-value');
    const pointsEl = document.querySelector('.stat-item:nth-child(3) .stat-value');
    
    if (streakEl) streakEl.textContent = userData.streak + ' Days';
    if (levelEl) levelEl.textContent = 'Level ' + userData.level;
    if (pointsEl) pointsEl.textContent = userData.points.toLocaleString();
    
    // Update progress
    const overallProgress = Math.round((userData.lessonsCompleted / userData.totalLessons) * 100);
    const progressFill = document.querySelector('.overall-progress .progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    if (progressFill) progressFill.style.width = overallProgress + '%';
    if (progressPercentage) progressPercentage.textContent = overallProgress + '%';
    
    // Update module progress if getModuleProgress exists
    if (typeof window.getModuleProgress === 'function') {
        for (let i = 1; i <= 4; i++) {
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
    
    // Update goals
    updateGoalsFromData(userData);
    
    // Update notification badge
    const notifBadge = document.querySelector('.notification-icon .badge');
    if (notifBadge) {
        notifBadge.textContent = userData.unlockedBadges.length;
    }
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
    // Load dashboard data first
    if (typeof window.initializeUserData === 'function') {
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

