// Lesson Detail Page JavaScript

// Play Audio
function playAudio(letterId) {
    showNotification(`🔊 Playing pronunciation for: ${letterId}`, 'info');
    // In production, load actual audio file:
    // const audio = new Audio(`audio/${letterId}.mp3`);
    // audio.play();
}

// Check Quiz Answer
function checkAnswer(button, isCorrect) {
    const feedback = document.getElementById('quizFeedback');
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable all options
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    if (isCorrect) {
        button.classList.add('correct');
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = `
            <strong>✅ Correct!</strong><br>
            Excellent! The letter ب (Ba) has ONE dot BELOW the curve. You earned +5 points!
        `;
        
        // Award points
        if (window.updateUserData) {
            const userData = window.initializeUserData();
            userData.points += 5;
            window.updateUserData(userData);
        }
        
        showNotification('✅ Correct answer! +5 points', 'success');
    } else {
        button.classList.add('incorrect');
        feedback.className = 'quiz-feedback show incorrect';
        feedback.innerHTML = `
            <strong>❌ Incorrect</strong><br>
            The correct answer is ب (Ba). Remember: Ba has 1 dot below, Ta has 2 dots above, Tha has 3 dots above.
        `;
        showNotification('Try again! Review the diagrams above.', 'error');
    }
}

// Complete Lesson
function completeLesson() {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = parseInt(urlParams.get('id')) || 1;
    
    if (confirm('Complete this lesson and take the final quiz?')) {
        // Award completion points
        if (window.completeLesson) {
            window.completeLesson(lessonId, 95); // 95% score
        }
        
        showNotification('🎉 Lesson completed! +50 points earned!', 'success');
        
        // Redirect to next lesson or lessons library
        setTimeout(() => {
            const nextLesson = lessonId + 1;
            if (nextLesson <= 84) {
                window.location.href = `lesson-detail.html?id=${nextLesson}`;
            } else {
                window.location.href = 'achievements.html';
            }
        }, 2000);
    }
}

// Download PDF
function downloadPDF() {
    showNotification('📄 Generating PDF... (Feature coming soon!)', 'info');
}

// Print Lesson
function printLesson() {
    window.print();
}

// Watch Video
function watchVideo() {
    showNotification('🎥 Loading video tutorial... (Coming soon!)', 'info');
}

// Show Help
function showHelp() {
    alert(`📖 Lesson Help:\n\n` +
          `1. Study the diagrams carefully\n` +
          `2. Listen to pronunciation (click 🔊)\n` +
          `3. Practice writing each letter\n` +
          `4. Take the quick check quiz\n` +
          `5. Complete lesson for points\n\n` +
          `Tip: Review diagrams multiple times for better understanding!`);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#4F46E5'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load lesson data dynamically
function loadLessonData() {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = parseInt(urlParams.get('id')) || 1;
    
    if (window.lessonsDatabase) {
        // Find lesson in database
        let lessonData = null;
        window.lessonsDatabase.modules.forEach(module => {
            const lesson = module.lessons.find(l => l.id === lessonId);
            if (lesson) {
                lessonData = { ...lesson, moduleName: module.name };
            }
        });
        
        if (lessonData) {
            // Update page title
            document.title = `Lesson ${lessonId}: ${lessonData.title} - Qaidah Academy`;
            
            // Update lesson title in nav
            const titleEl = document.querySelector('.lesson-title');
            if (titleEl) {
                titleEl.textContent = `Lesson ${lessonId}: ${lessonData.title}`;
            }
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadLessonData();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        completeLesson();
    }
});

