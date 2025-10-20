// Lesson Data
const lessonSteps = [
    { letter: 'سَ', pronunciation: 'SA', meaning: 'Seen with Fatha' },
    { letter: 'شَ', pronunciation: 'SHA', meaning: 'Sheen with Fatha' },
    { letter: 'صَ', pronunciation: 'SA (emphatic)', meaning: 'Saad with Fatha' },
    { letter: 'ضَ', pronunciation: 'DA (emphatic)', meaning: 'Daad with Fatha' },
    { letter: 'طَ', pronunciation: 'TA (emphatic)', meaning: 'Taa with Fatha' },
    { letter: 'ظَ', pronunciation: 'DHA (emphatic)', meaning: 'DHaa with Fatha' }
];

let currentStepIndex = 2; // Starting at step 3 (index 2)
let isRecording = false;
let recordingStartTime = 0;
let recordingInterval = null;

// Play Audio
function playAudio() {
    // Simulate audio playback
    showNotification('🔊 Playing audio...', 'info');
    
    // In a real app, you would play actual audio file here
    // const audio = new Audio('audio/seen-fatha.mp3');
    // audio.play();
}

function playAudioSlow() {
    showNotification('🔊 Playing slower...', 'info');
}

function playAudioRepeat() {
    showNotification('🔊 Playing 3 times...', 'info');
    let count = 0;
    const interval = setInterval(() => {
        count++;
        playAudio();
        if (count >= 3) clearInterval(interval);
    }, 1500);
}

// Recording Functions
function toggleRecording() {
    const recordBtn = document.getElementById('recordBtn');
    const recordingStatus = document.getElementById('recordingStatus');
    const playbackControls = document.getElementById('playbackControls');
    
    if (!isRecording) {
        // Start recording
        isRecording = true;
        recordingStartTime = Date.now();
        recordBtn.classList.add('recording');
        recordBtn.innerHTML = '<span class="record-icon">⏹️</span> Stop Recording';
        
        // Update recording status
        recordingInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
            recordingStatus.textContent = `Recording... ${elapsed}s`;
        }, 100);
        
        showNotification('🎤 Recording started...', 'info');
    } else {
        // Stop recording
        isRecording = false;
        clearInterval(recordingInterval);
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<span class="record-icon">🔴</span> Start Recording';
        
        const duration = Math.floor((Date.now() - recordingStartTime) / 1000);
        recordingStatus.textContent = `Recording saved! Duration: ${duration}s`;
        playbackControls.style.display = 'flex';
        
        showNotification('✅ Recording saved!', 'success');
    }
}

function playRecording() {
    showNotification('▶️ Playing your recording...', 'info');
}

function deleteRecording() {
    const recordingStatus = document.getElementById('recordingStatus');
    const playbackControls = document.getElementById('playbackControls');
    
    recordingStatus.textContent = '';
    playbackControls.style.display = 'none';
    showNotification('🗑️ Recording deleted', 'info');
}

// Navigation Functions
function nextStep() {
    if (currentStepIndex < lessonSteps.length - 1) {
        currentStepIndex++;
        updateLesson();
        showNotification('✅ Great job! Moving to next letter...', 'success');
    } else {
        // Go to exercises
        window.location.href = 'exercise.html';
    }
}

function skipStep() {
    if (confirm('Are you sure you want to skip this step?')) {
        nextStep();
    }
}

function updateLesson() {
    const step = lessonSteps[currentStepIndex];
    
    // Update arabic letter
    document.getElementById('arabicLetter').textContent = step.letter;
    document.querySelector('.pronunciation').textContent = `(${step.pronunciation})`;
    
    // Update progress
    const progress = Math.round(((currentStepIndex + 1) / lessonSteps.length) * 100);
    document.getElementById('lessonProgress').style.width = progress + '%';
    document.querySelector('.lesson-progress-text').textContent = 
        `Letter ${currentStepIndex + 1} of ${lessonSteps.length} (${progress}%)`;
    
    // Update practice letters highlighting
    const letterItems = document.querySelectorAll('.letter-item');
    letterItems.forEach((item, index) => {
        item.classList.remove('active', 'completed');
        if (index < currentStepIndex) {
            item.classList.add('completed');
        } else if (index === currentStepIndex) {
            item.classList.add('active');
        }
    });
    
    // Reset recording section
    if (isRecording) {
        toggleRecording();
    }
    document.getElementById('recordingStatus').textContent = '';
    document.getElementById('playbackControls').style.display = 'none';
}

function showHelp() {
    alert(`📖 Lesson Help:\n\n` +
          `1. Listen to the audio pronunciation\n` +
          `2. Practice saying it out loud\n` +
          `3. Record yourself\n` +
          `4. Compare with the example\n` +
          `5. Move to next letter\n\n` +
          `Tip: Take your time and practice each letter multiple times!`);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 140px;
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
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextStep();
    } else if (e.key === ' ') {
        e.preventDefault();
        playAudio();
    } else if (e.key === 'r' || e.key === 'R') {
        toggleRecording();
    }
});

// Auto-save progress
window.addEventListener('beforeunload', () => {
    localStorage.setItem('lessonProgress', JSON.stringify({
        lessonId: 21,
        step: currentStepIndex,
        timestamp: Date.now()
    }));
});

// Load saved progress
window.addEventListener('load', () => {
    const saved = localStorage.getItem('lessonProgress');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.lessonId === 21 && Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
            // Resume from saved position if less than 24 hours old
            currentStepIndex = data.step;
            updateLesson();
        }
    }
});

