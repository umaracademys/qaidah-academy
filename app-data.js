// Central data management for Qaidah Academy App

// Initialize or load user data
function initializeUserData() {
    const defaultData = {
        name: 'Student',
        email: '',
        points: 0,
        level: 1,
        streak: 0,
        lessonsCompleted: 0,
        totalLessons: 84,
        currentModule: 1,
        currentLesson: 1,
        unlockedBadges: [],
        completedModules: [],
        scores: [],
        timeSpent: 0, // in minutes
        joinDate: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        goals: {
            dailyLesson: false,
            practiceTime: false,
            dailyLogin: true, // Auto-checked on page load
            highScore: false
        }
    };
    
    const stored = localStorage.getItem('qaidahUserData');
    if (!stored) {
        localStorage.setItem('qaidahUserData', JSON.stringify(defaultData));
        return defaultData;
    }
    
    const data = JSON.parse(stored);
    // Update last active and daily login goal
    data.lastActive = new Date().toISOString();
    data.goals.dailyLogin = true;
    localStorage.setItem('qaidahUserData', JSON.stringify(data));
    
    return data;
}

// Update user data
function updateUserData(updates) {
    const current = initializeUserData();
    const updated = { ...current, ...updates };
    localStorage.setItem('qaidahUserData', JSON.stringify(updated));
    return updated;
}

// Complete a lesson
function completeLesson(lessonId, score) {
    const userData = initializeUserData();
    userData.lessonsCompleted++;
    userData.scores.push({ lessonId, score, date: new Date().toISOString() });
    userData.currentLesson++;
    userData.goals.dailyLesson = true;
    
    // Calculate average score
    const avgScore = userData.scores.reduce((sum, s) => sum + s.score, 0) / userData.scores.length;
    if (score >= 90) {
        userData.goals.highScore = true;
    }
    
    // Award points based on score
    const points = Math.round(score / 10) * 5;
    userData.points += points;
    
    updateUserData(userData);
    
    // Check for badge unlocks
    checkBadgeUnlocks();
    
    return userData;
}

// Check and unlock badges automatically
function checkBadgeUnlocks() {
    const userData = initializeUserData();
    
    // First Step - Complete first lesson
    if (userData.lessonsCompleted >= 1 && !userData.unlockedBadges.includes('First Step')) {
        unlockBadge('First Step', 20);
    }
    
    // 3-Day Streak
    if (userData.streak >= 3 && !userData.unlockedBadges.includes('3-Day Streak')) {
        unlockBadge('3-Day Streak', 25);
    }
    
    // 7-Day Streak
    if (userData.streak >= 7 && !userData.unlockedBadges.includes('7-Day Streak')) {
        unlockBadge('7-Day Streak', 50);
    }
    
    // Perfect Score
    const hasPerfectScore = userData.scores.some(s => s.score === 100);
    if (hasPerfectScore && !userData.unlockedBadges.includes('Perfect Score')) {
        unlockBadge('Perfect Score', 25);
    }
    
    // Alphabet Master - Complete Module 1 (18 lessons)
    if (userData.lessonsCompleted >= 18 && !userData.unlockedBadges.includes('Alphabet Master')) {
        unlockBadge('Alphabet Master', 100);
    }
}

// Calculate module progress
function getModuleProgress(moduleNumber) {
    const moduleLessons = {
        1: 18, // Alphabet
        2: 15, // Short Vowels
        3: 11, // Long Vowels
        4: 11, // Sukoon & Rules
        5: 13, // Advanced
        6: 12  // Practical
    };
    
    const userData = initializeUserData();
    const lessonsInModule = moduleLessons[moduleNumber] || 0;
    
    let startLesson = 0;
    for (let i = 1; i < moduleNumber; i++) {
        startLesson += moduleLessons[i];
    }
    
    const completedInModule = Math.min(
        Math.max(0, userData.lessonsCompleted - startLesson),
        lessonsInModule
    );
    
    return {
        completed: completedInModule,
        total: lessonsInModule,
        percentage: Math.round((completedInModule / lessonsInModule) * 100)
    };
}

// Reset user data (for testing)
function resetUserData() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem('qaidahUserData');
        window.location.reload();
    }
}

// Export functions
window.initializeUserData = initializeUserData;
window.updateUserData = updateUserData;
window.completeLesson = completeLesson;
window.getModuleProgress = getModuleProgress;
window.resetUserData = resetUserData;

