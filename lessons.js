// Lessons Library JavaScript

// Filter lessons by module
function filterModule(moduleNum) {
    const cards = document.querySelectorAll('.lesson-card');
    const tabs = document.querySelectorAll('.module-tab');
    
    // Update active tab
    tabs.forEach((tab, index) => {
        tab.classList.remove('active');
        if (index + 1 === moduleNum) {
            tab.classList.add('active');
        }
    });
    
    // Filter cards
    cards.forEach(card => {
        const cardModule = parseInt(card.dataset.module);
        if (cardModule === moduleNum) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open lesson detail
function openLesson(lessonId) {
    if (event.target.closest('.lesson-card').classList.contains('locked')) {
        alert('🔒 This lesson is locked. Complete previous lessons to unlock!');
        return;
    }
    window.location.href = `lesson-detail.html?id=${lessonId}`;
}

// Load more lessons
function loadMoreLessons() {
    alert('Loading more lessons... (Feature coming soon!)');
}

// Generate all lesson cards dynamically
function generateLessonCards() {
    const grid = document.getElementById('lessonsGrid');
    if (!grid || !window.lessonsDatabase) return;
    
    const userData = window.initializeUserData ? window.initializeUserData() : { lessonsCompleted: 0 };
    
    // Clear existing cards except the first 3
    const existingCards = grid.querySelectorAll('.lesson-card');
    if (existingCards.length > 3) {
        existingCards.forEach((card, index) => {
            if (index >= 3) card.remove();
        });
    }
    
    // Generate cards for all lessons
    window.lessonsDatabase.modules.forEach(module => {
        module.lessons.forEach((lesson, index) => {
            if (lesson.id <= 3) return; // Skip first 3 (already in HTML)
            
            const isUnlocked = lesson.id <= userData.lessonsCompleted + 1;
            const card = document.createElement('div');
            card.className = 'lesson-card' + (isUnlocked ? '' : ' locked');
            card.dataset.module = module.id;
            card.dataset.lesson = lesson.id;
            
            if (isUnlocked) {
                card.onclick = () => openLesson(lesson.id);
            }
            
            card.innerHTML = `
                <div class="lesson-status ${isUnlocked ? 'unlocked' : 'locked'}">
                    ${isUnlocked ? '▶️' : '🔒'}
                </div>
                <div class="lesson-number">Lesson ${lesson.id}</div>
                <div class="lesson-arabic">${lesson.arabicLetters ? lesson.arabicLetters.join(' ') : lesson.arabicText || '📖'}</div>
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-description">${lesson.objectives ? lesson.objectives[0] : 'Complete this lesson to progress'}</p>
                <div class="lesson-meta">
                    <span>⏱️ ${lesson.duration} min</span>
                    <span>🎯 ${lesson.points} pts</span>
                    <span>📊 ${module.name.includes('Alphabet') ? 'Beginner' : module.name.includes('Short') ? 'Intermediate' : 'Advanced'}</span>
                </div>
                <div class="lesson-features">
                    <span class="feature-tag">📊 Diagrams</span>
                    <span class="feature-tag">🎵 Audio</span>
                    <span class="feature-tag">🎯 Quiz</span>
                </div>
            `;
            
            grid.appendChild(card);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    generateLessonCards();
    filterModule(1); // Show Module 1 by default
});

