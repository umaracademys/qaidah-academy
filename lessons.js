// Lessons Library JavaScript - Book 1 Curriculum

let currentModule = 1;

// Initialize lessons page
document.addEventListener('DOMContentLoaded', function() {
    generateModuleTabs();
    loadModuleLessons(1);
});

// Generate module tabs dynamically
function generateModuleTabs() {
    const tabsContainer = document.getElementById('moduleTabs');
    if (!tabsContainer || !window.lessonsDatabase) return;
    
    const modules = window.lessonsDatabase.modules;
    
    tabsContainer.innerHTML = modules.map((module, index) => `
        <button class="module-tab ${index === 0 ? 'active' : ''}" onclick="loadModuleLessons(${module.id})">
            <span class="tab-number">${module.id}</span>
            <span class="tab-name">${module.name}</span>
        </button>
    `).join('');
}

// Load lessons for a specific module
function loadModuleLessons(moduleId) {
    const grid = document.getElementById('lessonsGrid');
    const noLessonsMessage = document.getElementById('noLessonsMessage');
    
    if (!grid || !window.lessonsDatabase) return;
    
    currentModule = moduleId;
    const module = window.lessonsDatabase.modules.find(m => m.id === moduleId);
    
    if (!module) {
        grid.innerHTML = '';
        noLessonsMessage.style.display = 'block';
        return;
    }
    
    noLessonsMessage.style.display = 'none';
    
    const userData = window.initializeUserData ? window.initializeUserData() : { lessonsCompleted: 0 };
    
    // Generate lesson cards for this module
    grid.innerHTML = module.lessons.map(lesson => {
        const isUnlocked = lesson.id <= userData.lessonsCompleted + 1;
        const isCompleted = lesson.id <= userData.lessonsCompleted;
        
        return `
            <div class="lesson-card ${isUnlocked ? 'unlocked' : 'locked'}" 
                 data-module="${moduleId}" 
                 data-lesson="${lesson.id}" 
                 onclick="openLesson(${lesson.id})">
                <div class="lesson-status ${isCompleted ? 'completed' : (isUnlocked ? 'unlocked' : 'locked')}">
                    ${isCompleted ? '✅' : (isUnlocked ? '▶️' : '🔒')}
                </div>
                <div class="lesson-number">Lesson ${lesson.id}</div>
                <div class="lesson-arabic">${lesson.arabicLetters.join(' ')}</div>
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-description">${lesson.tips}</p>
                <div class="lesson-meta">
                    <span>⏱️ ${lesson.duration} min</span>
                    <span>🎯 ${lesson.points} pts</span>
                    <span>📊 ${getDifficultyLevel(lesson.id)}</span>
                </div>
                <div class="lesson-features">
                    ${lesson.hasDiagram ? '<span class="feature-tag">📊 Interactive</span>' : ''}
                    <span class="feature-tag">🎵 Audio</span>
                    <span class="feature-tag">🎯 Quiz</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Update active tab
    updateActiveTab(moduleId);
}

// Update active module tab
function updateActiveTab(moduleId) {
    const tabs = document.querySelectorAll('.module-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.onclick.toString().includes(`loadModuleLessons(${moduleId})`)) {
            tab.classList.add('active');
        }
    });
}

// Get difficulty level based on lesson number
function getDifficultyLevel(lessonId) {
    if (lessonId <= 2) return 'Beginner';
    if (lessonId <= 6) return 'Easy';
    if (lessonId <= 14) return 'Medium';
    if (lessonId <= 20) return 'Intermediate';
    return 'Advanced';
}

// Open lesson detail
function openLesson(lessonId) {
    const card = event.target.closest('.lesson-card');
    if (card.classList.contains('locked')) {
        alert('🔒 This lesson is locked. Complete previous lessons to unlock!');
        return;
    }
    window.location.href = `lesson-detail.html?id=${lessonId}`;
}

// Filter lessons (for compatibility)
function filterLessons(type) {
    if (type === 'all') {
        loadModuleLessons(1);
    }
}

// Filter by module (for compatibility)
function filterModule(moduleNum) {
    loadModuleLessons(moduleNum);
}

// Load more lessons (for compatibility)
function loadMoreLessons() {
    // This function is kept for compatibility but not needed with the new structure
    console.log('All lessons are already loaded');
}

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