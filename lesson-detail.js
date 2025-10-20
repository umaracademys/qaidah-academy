// Lesson Detail Page JavaScript

// Load lesson data and initialize diagrams
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are rendered
    setTimeout(() => {
        loadLessonData();
    }, 100);
});

function loadLessonData() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const lessonId = parseInt(urlParams.get('id')) || 1;
        
        // Load lesson from database
        if (window.lessonsDatabase) {
            const lesson = findLessonById(lessonId);
            if (lesson) {
                loadLessonContent(lesson);
                updateSidebar();
            } else {
                showLessonNotFound();
            }
        } else {
            console.log('Lessons database not loaded yet, retrying...');
            setTimeout(loadLessonData, 200);
        }
    } catch (error) {
        console.log('Error loading lesson data:', error);
        showLessonNotFound();
    }
}

function loadLessonContent(lesson) {
    // Update page title
    document.title = `Lesson ${lesson.id}: ${lesson.title} - Qaidah Academy`;
    
    // Update navigation title
    const titleElement = document.getElementById('lesson-title');
    if (titleElement) {
        titleElement.textContent = `Lesson ${lesson.id}: ${lesson.title}`;
    }
    
    // Update objectives
    const objectivesList = document.getElementById('objectives-list');
    if (objectivesList && lesson.objectives) {
        objectivesList.innerHTML = lesson.objectives.map(obj => `<li>✓ ${obj}</li>`).join('');
    }
    
    // Update lesson info
    updateLessonInfo(lesson);
    
    // Show diagram if available
    if (lesson.hasDiagram) {
        showDiagram(lesson);
    }
    
    // Load lesson content
    loadLessonMainContent(lesson);
    
    // Show appropriate buttons
    showLessonButtons(lesson);
}

function updateLessonInfo(lesson) {
    const duration = document.getElementById('lesson-duration');
    const points = document.getElementById('lesson-points');
    const difficulty = document.getElementById('lesson-difficulty');
    const tips = document.getElementById('lesson-tips');
    
    if (duration && lesson.duration) duration.textContent = `${lesson.duration} min`;
    if (points && lesson.points) points.textContent = `${lesson.points} pts`;
    if (difficulty) difficulty.textContent = getDifficultyLevel(lesson.id);
    if (tips && lesson.tips) tips.textContent = lesson.tips;
}

function getDifficultyLevel(lessonId) {
    if (lessonId <= 2) return 'Beginner';
    if (lessonId <= 6) return 'Easy';
    if (lessonId <= 14) return 'Medium';
    if (lessonId <= 20) return 'Intermediate';
    return 'Advanced';
}

function loadLessonMainContent(lesson) {
    const contentContainer = document.getElementById('lesson-content');
    if (!contentContainer) return;
    
    let content = '';
    
    // Add Arabic letters display
    if (lesson.arabicLetters && lesson.arabicLetters.length > 0) {
        content += `
            <div class="card letter-section">
                <div class="card-header">
                    <h3>📝 Arabic Letters</h3>
                </div>
                <div class="card-body">
                    <div class="letters-display">
                        ${lesson.arabicLetters.map(letter => `
                            <div class="letter-card">
                                <div class="arabic-letter-big">${letter}</div>
                                <div class="letter-name">${getLetterName(letter)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Add pronunciation section
    if (lesson.pronunciation && lesson.pronunciation.length > 0) {
        content += `
            <div class="card pronunciation-section">
                <div class="card-header">
                    <h3>🔊 Pronunciation</h3>
                </div>
                <div class="card-body">
                    <div class="pronunciation-list">
                        ${lesson.pronunciation.map(pron => `
                            <div class="pronunciation-item">
                                <span class="pronunciation-text">${pron}</span>
                                <button class="audio-btn" onclick="playAudio('${pron}')">🔊</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Add practice section if available
    if (lesson.content && lesson.content.practiceGrid) {
        content += `
            <div class="card practice-section">
                <div class="card-header">
                    <h3>🎯 Practice</h3>
                </div>
                <div class="card-body">
                    <h4>${lesson.content.practiceGrid.title}</h4>
                    <p class="practice-instructions">${lesson.content.practiceGrid.instructions}</p>
                    <div class="practice-grid">
                        ${lesson.content.practiceGrid.grid.map((row, rowIndex) => `
                            <div class="grid-row">
                                ${row.map((cell, colIndex) => {
                                    const focusLetter = lesson.content.practiceGrid.focusLetters[rowIndex][colIndex];
                                    return `
                                        <div class="grid-cell ${focusLetter ? 'focus-letter' : ''}" 
                                             style="${focusLetter ? `color: #FF6B6B; font-weight: bold;` : ''}">
                                            ${cell}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    contentContainer.innerHTML = content;
}

function getLetterName(letter) {
    const letterNames = {
        'ا': 'Alif', 'ب': 'Ba', 'ت': 'Ta', 'ث': 'Tha',
        'ج': 'Jeem', 'ح': 'Haa', 'خ': 'Khaa', 'د': 'Dal',
        'ذ': 'Dhal', 'ر': 'Ra', 'ز': 'Zay', 'س': 'Seen',
        'ش': 'Sheen', 'ص': 'Sad', 'ض': 'Dad', 'ط': 'Ta',
        'ظ': 'Za', 'ع': 'Ain', 'غ': 'Ghain', 'ف': 'Fa',
        'ق': 'Qaf', 'ك': 'Kaf', 'ل': 'Lam', 'م': 'Meem',
        'ن': 'Noon', 'ه': 'Ha', 'و': 'Waw', 'ي': 'Ya'
    };
    return letterNames[letter] || letter;
}

function showLessonButtons(lesson) {
    const completeBtn = document.getElementById('complete-lesson-btn');
    const nextBtn = document.getElementById('next-lesson-btn');
    
    if (completeBtn) {
        completeBtn.style.display = 'inline-block';
    }
    
    // Show next lesson button if not the last lesson
    if (nextBtn && lesson.id < 24) {
        nextBtn.style.display = 'inline-block';
    }
}

function showLessonNotFound() {
    const contentContainer = document.getElementById('lesson-content');
    if (contentContainer) {
        contentContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="error-message">
                        <h3>❌ Lesson Not Found</h3>
                        <p>The lesson you're looking for doesn't exist.</p>
                        <button class="btn btn-primary" onclick="window.location.href='lessons.html'">
                            Back to Lessons
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateSidebar() {
    try {
        const userData = window.initializeUserData ? window.initializeUserData() : { lessonsCompleted: 0, streak: 0, points: 0 };
        
        const lessonsCompleted = document.getElementById('lessons-completed');
        const currentStreak = document.getElementById('current-streak');
        const totalPoints = document.getElementById('total-points');
        
        if (lessonsCompleted && userData.lessonsCompleted !== undefined) {
            lessonsCompleted.textContent = userData.lessonsCompleted;
        }
        if (currentStreak && userData.streak !== undefined) {
            currentStreak.textContent = `${userData.streak} days`;
        }
        if (totalPoints && userData.points !== undefined) {
            totalPoints.textContent = userData.points;
        }
    } catch (error) {
        console.log('Error updating sidebar:', error);
    }
}

function goToNextLesson() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentLessonId = parseInt(urlParams.get('id')) || 1;
    const nextLessonId = currentLessonId + 1;
    
    if (nextLessonId <= 24) {
        window.location.href = `lesson-detail.html?id=${nextLessonId}`;
    }
}

function findLessonById(lessonId) {
    if (!window.lessonsDatabase) return null;
    
    for (const module of window.lessonsDatabase.modules) {
        for (const lesson of module.lessons) {
            if (lesson.id === lessonId) {
                return lesson;
            }
        }
    }
    return null;
}

function showDiagram(lesson) {
    const diagramSection = document.getElementById('diagram-section');
    const diagramTitle = document.getElementById('diagram-title');
    const diagramContainer = document.getElementById('diagram-container');
    
    if (!diagramSection || !diagramTitle || !diagramContainer) return;
    
    diagramTitle.textContent = lesson.content?.mouthDiagram?.title || lesson.content?.lipShapes ? 'Lip Letters Practice' : 'Interactive Diagram';
    diagramSection.style.display = 'block';
    
    if (lesson.diagramType === 'mouth_anatomy') {
        renderMouthAnatomyDiagram(lesson, diagramContainer);
    } else if (lesson.diagramType === 'lip_letters') {
        renderLipLettersDiagram(lesson, diagramContainer);
    }
}

function renderMouthAnatomyDiagram(lesson, container) {
    const mouthData = lesson.content.mouthDiagram;
    
    container.innerHTML = `
        <div class="mouth-diagram-container">
            <p class="diagram-description">${mouthData.description}</p>
            <div class="mouth-diagram">
                <svg viewBox="0 0 400 500" class="mouth-svg">
                    <!-- Head outline -->
                    <ellipse cx="200" cy="250" rx="120" ry="160" fill="#FFE4B5" stroke="#D2B48C" stroke-width="2"/>
                    
                    <!-- Hair -->
                    <path d="M 100 120 Q 200 80 300 120" fill="#8B4513" stroke="none"/>
                    
                    <!-- Eyes -->
                    <circle cx="160" cy="200" r="15" fill="white" stroke="#333"/>
                    <circle cx="240" cy="200" r="15" fill="white" stroke="#333"/>
                    <circle cx="160" cy="200" r="8" fill="#333"/>
                    <circle cx="240" cy="200" r="8" fill="#333"/>
                    
                    <!-- Nose -->
                    <ellipse cx="200" cy="230" rx="8" ry="12" fill="#FFE4B5" stroke="#D2B48C"/>
                    
                    <!-- Mouth area -->
                    <ellipse cx="200" cy="300" rx="60" ry="40" fill="#FFB6C1" stroke="#FF69B4" stroke-width="2"/>
                    
                    <!-- Interactive areas -->
                    <g class="interactive-areas">
                        <!-- Lips area -->
                        <ellipse cx="200" cy="300" rx="60" ry="40" fill="rgba(255,107,107,0.3)" stroke="#FF6B6B" stroke-width="2" 
                                class="mouth-area" data-area="lips" onclick="showAreaInfo('lips')"/>
                        
                        <!-- Teeth area -->
                        <rect x="170" y="280" width="60" height="20" fill="rgba(78,205,196,0.3)" stroke="#4ECDC4" stroke-width="2" 
                              class="mouth-area" data-area="teeth" onclick="showAreaInfo('teeth')"/>
                        
                        <!-- Tongue tip area -->
                        <ellipse cx="200" cy="320" rx="20" ry="15" fill="rgba(69,183,209,0.3)" stroke="#45B7D1" stroke-width="2" 
                                class="mouth-area" data-area="tongue_tip" onclick="showAreaInfo('tongue_tip')"/>
                        
                        <!-- Tongue middle area -->
                        <ellipse cx="200" cy="340" rx="30" ry="20" fill="rgba(150,206,180,0.3)" stroke="#96CEB4" stroke-width="2" 
                                class="mouth-area" data-area="tongue_middle" onclick="showAreaInfo('tongue_middle')"/>
                        
                        <!-- Tongue back area -->
                        <ellipse cx="200" cy="360" rx="25" ry="15" fill="rgba(255,234,167,0.3)" stroke="#FFEAA7" stroke-width="2" 
                                class="mouth-area" data-area="tongue_back" onclick="showAreaInfo('tongue_back')"/>
                        
                        <!-- Throat area -->
                        <ellipse cx="200" cy="380" rx="35" ry="25" fill="rgba(221,160,221,0.3)" stroke="#DDA0DD" stroke-width="2" 
                                class="mouth-area" data-area="throat" onclick="showAreaInfo('throat')"/>
                    </g>
                    
                    <!-- Labels -->
                    <text x="200" y="150" text-anchor="middle" class="diagram-title">Arabic Letter Origins</text>
                    <text x="200" y="170" text-anchor="middle" class="diagram-subtitle">Click on colored areas to learn more</text>
                </svg>
            </div>
            
            <div class="area-info" id="area-info">
                <h4>Click on a colored area above to learn about the letters produced there!</h4>
            </div>
        </div>
    `;
}

function renderLipLettersDiagram(lesson, container) {
    const lipShapes = lesson.content.lipShapes;
    const practiceGrid = lesson.content.practiceGrid;
    
    container.innerHTML = `
        <div class="lip-letters-container">
            <h4>${lesson.content.introduction}</h4>
            
            <!-- Lip Shapes Section -->
            <div class="lip-shapes-section">
                <h5>Lip Positions for Each Letter:</h5>
                <div class="lip-shapes-grid">
                    ${lipShapes.map(shape => `
                        <div class="lip-shape-card" style="border-color: ${shape.color}">
                            <div class="letter-display" style="color: ${shape.color}">
                                <div class="arabic-letter-big">${shape.letter}</div>
                                <div class="letter-name">${shape.name}</div>
                                <div class="letter-sound">Sound: "${shape.sound}"</div>
                            </div>
                            <div class="lip-position">
                                <strong>Lip Position:</strong> ${shape.lipPosition}
                            </div>
                            <div class="lip-description">
                                ${shape.description}
                            </div>
                            <button class="practice-btn" onclick="practiceLetter('${shape.letter}')">
                                Practice ${shape.letter}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Practice Grid Section -->
            <div class="practice-grid-section">
                <h5>${practiceGrid.title}</h5>
                <p class="grid-instructions">${practiceGrid.instructions}</p>
                <div class="practice-grid">
                    ${practiceGrid.grid.map((row, rowIndex) => `
                        <div class="grid-row">
                            ${row.map((cell, colIndex) => {
                                const focusLetter = practiceGrid.focusLetters[rowIndex][colIndex];
                                return `
                                    <div class="grid-cell ${focusLetter ? 'focus-letter' : ''}" 
                                         style="${focusLetter ? `color: #FF6B6B; font-weight: bold;` : ''}">
                                        ${cell}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showAreaInfo(areaId) {
    const lesson = findLessonById(parseInt(new URLSearchParams(window.location.search).get('id')) || 1);
    if (!lesson || !lesson.content.mouthDiagram) return;
    
    const area = lesson.content.mouthDiagram.areas.find(a => a.id === areaId);
    if (!area) return;
    
    const areaInfo = document.getElementById('area-info');
    areaInfo.innerHTML = `
        <h4 style="color: ${area.color}">${area.name}</h4>
        <p><strong>Letters produced here:</strong> ${area.letters.join(', ')}</p>
        <p><strong>Description:</strong> ${area.description}</p>
        <div class="letters-display">
            ${area.letters.map(letter => `
                <span class="letter-badge" style="background-color: ${area.color}20; color: ${area.color}; border-color: ${area.color}">
                    ${letter}
                </span>
            `).join('')}
        </div>
    `;
}

function practiceLetter(letter) {
    showNotification(`🔊 Practicing letter: ${letter}`, 'info');
    // In production, play actual audio
}

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

