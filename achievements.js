// Achievements Page JavaScript

// Level system configuration
const levels = [
    { level: 1, name: 'Beginner', minPoints: 0, maxPoints: 500 },
    { level: 2, name: 'Learner', minPoints: 501, maxPoints: 1500 },
    { level: 3, name: 'Student', minPoints: 1501, maxPoints: 3000 },
    { level: 4, name: 'Scholar', minPoints: 3001, maxPoints: 5000 },
    { level: 5, name: 'Expert', minPoints: 5001, maxPoints: 8000 },
    { level: 6, name: 'Master', minPoints: 8000, maxPoints: Infinity }
];

// Load user data from localStorage
function loadUserData() {
    const defaultData = {
        points: 0,
        unlockedBadges: [],
        lessonsCompleted: 0,
        streak: 0,
        joinDate: new Date().toISOString()
    };
    
    const stored = localStorage.getItem('qaidahUserData');
    return stored ? JSON.parse(stored) : defaultData;
}

// Save user data to localStorage
function saveUserData(data) {
    localStorage.setItem('qaidahUserData', JSON.stringify(data));
}

// Get current level based on points
function getCurrentLevel(points) {
    for (let i = levels.length - 1; i >= 0; i--) {
        if (points >= levels[i].minPoints) {
            return levels[i];
        }
    }
    return levels[0];
}

// Update level display
function updateLevelDisplay() {
    const userData = loadUserData();
    const currentLevel = getCurrentLevel(userData.points);
    const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
    
    document.getElementById('currentLevel').textContent = currentLevel.level;
    document.getElementById('levelName').textContent = currentLevel.name;
    
    const pointsInLevel = userData.points - currentLevel.minPoints;
    const pointsNeeded = currentLevel.maxPoints - currentLevel.minPoints;
    const percentage = Math.min(100, (pointsInLevel / pointsNeeded) * 100);
    
    document.getElementById('levelProgress').textContent = 
        `${userData.points} / ${currentLevel.maxPoints} points`;
    
    if (nextLevel) {
        document.getElementById('nextLevel').textContent = 
            `Next: Level ${nextLevel.level} - ${nextLevel.name}`;
    } else {
        document.getElementById('nextLevel').textContent = 'Max Level Reached!';
    }
    
    document.getElementById('levelProgressBar').style.width = percentage + '%';
}

// Update badge count
function updateBadgeCount() {
    const userData = loadUserData();
    document.getElementById('totalBadges').textContent = userData.unlockedBadges.length;
    document.getElementById('totalPoints').textContent = userData.points.toLocaleString();
    
    // Update notification badge
    const notifCount = document.getElementById('notifCount');
    if (notifCount) {
        notifCount.textContent = userData.unlockedBadges.length;
    }
}

// Filter achievements by category
function filterAchievements(category) {
    const cards = document.querySelectorAll('.achievement-card');
    const tabs = document.querySelectorAll('.tab-btn');
    
    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Unlock a badge
function unlockBadge(badgeName, points) {
    const userData = loadUserData();
    
    if (!userData.unlockedBadges.includes(badgeName)) {
        userData.unlockedBadges.push(badgeName);
        userData.points += points;
        saveUserData(userData);
        
        // Find the badge card and update it
        const cards = document.querySelectorAll('.achievement-card');
        cards.forEach(card => {
            if (card.querySelector('.badge-name').textContent === badgeName) {
                card.classList.remove('locked');
                card.classList.add('unlocked', 'unlocking');
                
                const dateEl = card.querySelector('.badge-date');
                if (dateEl) {
                    dateEl.textContent = `Unlocked ${new Date().toLocaleDateString()}`;
                }
                
                // Show celebration
                showBadgeUnlockCelebration(badgeName, points);
            }
        });
        
        updateBadgeCount();
        updateLevelDisplay();
    }
}

// Show badge unlock celebration
function showBadgeUnlockCelebration(badgeName, points) {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        animation: badgePopup 0.5s ease-out;
    `;
    
    celebration.innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="margin-bottom: 0.5rem; color: #4F46E5;">Badge Unlocked!</h2>
        <p style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">${badgeName}</p>
        <p style="color: #10B981; font-weight: 700; font-size: 1.25rem;">+${points} points</p>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes badgePopup {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(celebration);
    
    // Add confetti effect
    createConfetti();
    
    setTimeout(() => {
        celebration.style.animation = 'badgePopup 0.3s ease-in reverse';
        setTimeout(() => {
            celebration.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            opacity: 1;
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${1 + Math.random()}s linear forwards;
        `;
        
        const style = document.createElement('style');
        const angle = (Math.random() * 360);
        const distance = 200 + Math.random() * 200;
        const rotation = Math.random() * 360;
        
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(
                        ${Math.cos(angle) * distance}px,
                        ${Math.sin(angle) * distance + 300}px
                    ) rotate(${rotation}deg);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
            style.remove();
        }, 1500);
    }
}

// Check and auto-unlock badges based on progress
function checkAutoUnlock() {
    const userData = loadUserData();
    
    // Check First Step badge
    if (userData.lessonsCompleted >= 1 && !userData.unlockedBadges.includes('First Step')) {
        unlockBadge('First Step', 20);
    }
    
    // Check 3-Day Streak
    if (userData.streak >= 3 && !userData.unlockedBadges.includes('3-Day Streak')) {
        unlockBadge('3-Day Streak', 25);
    }
    
    // Check 7-Day Streak
    if (userData.streak >= 7 && !userData.unlockedBadges.includes('7-Day Streak')) {
        unlockBadge('7-Day Streak', 50);
    }
    
    // Add more auto-unlock conditions here
}

// Initialize achievements page
function initAchievements() {
    updateLevelDisplay();
    updateBadgeCount();
    checkAutoUnlock();
    
    // Load unlocked badges from storage
    const userData = loadUserData();
    const cards = document.querySelectorAll('.achievement-card');
    
    cards.forEach(card => {
        const badgeName = card.querySelector('.badge-name').textContent;
        if (userData.unlockedBadges.includes(badgeName)) {
            card.classList.remove('locked');
            card.classList.add('unlocked');
            
            const dateEl = card.querySelector('.badge-date');
            if (dateEl) {
                dateEl.textContent = 'Previously unlocked';
            }
        }
    });
}

// Add click handlers for unlockable badges (for demo purposes)
document.addEventListener('DOMContentLoaded', () => {
    initAchievements();
    
    // Demo: Click on "First Step" to unlock it
    const firstStepCard = Array.from(document.querySelectorAll('.achievement-card')).find(
        card => card.querySelector('.badge-name').textContent === 'First Step'
    );
    
    if (firstStepCard) {
        firstStepCard.style.cursor = 'pointer';
        firstStepCard.addEventListener('click', () => {
            if (firstStepCard.classList.contains('unlocked')) {
                const userData = loadUserData();
                const badgeReward = parseInt(firstStepCard.querySelector('.badge-reward').textContent);
                unlockBadge('First Step', badgeReward);
            }
        });
    }
});

// Export functions for use in other pages
window.unlockBadge = unlockBadge;
window.loadUserData = loadUserData;
window.saveUserData = saveUserData;
window.filterAchievements = filterAchievements;

