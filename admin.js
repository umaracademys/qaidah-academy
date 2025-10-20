// Admin Dashboard JavaScript

// Quick Actions
function addNewStudent() {
    const name = prompt('Enter student name:');
    if (name) {
        alert(`Student "${name}" added successfully!\nLogin credentials have been sent to their email.`);
    }
}

function addNewTeacher() {
    const name = prompt('Enter teacher name:');
    if (name) {
        alert(`Teacher "${name}" added successfully!\nLogin credentials have been sent to their email.`);
    }
}

function sendAnnouncement() {
    const message = prompt('Enter announcement message:');
    if (message) {
        alert(`Announcement sent to all students and teachers:\n\n${message}`);
    }
}

// Show/Hide Upload Tabs
function showUploadTab(tab) {
    // Hide all sections
    document.querySelectorAll('.upload-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.upload-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const sectionId = tab + '-upload';
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Reset Form
function resetForm() {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        document.getElementById('lessonForm').reset();
    }
}

// Save as Draft
function saveAsDraft() {
    const formData = new FormData(document.getElementById('lessonForm'));
    const data = Object.fromEntries(formData);
    
    // Store in localStorage
    const drafts = JSON.parse(localStorage.getItem('lessonDrafts') || '[]');
    drafts.push({
        ...data,
        savedAt: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('lessonDrafts', JSON.stringify(drafts));
    
    alert('✅ Lesson saved as draft!');
}

// Lesson Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const lessonForm = document.getElementById('lessonForm');
    if (lessonForm) {
        lessonForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const lessonData = Object.fromEntries(formData);
            
            // Store lesson
            const lessons = JSON.parse(localStorage.getItem('qaidahLessons') || '[]');
            lessons.push({
                ...lessonData,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                views: 0,
                completions: 0
            });
            localStorage.setItem('qaidahLessons', JSON.stringify(lessons));
            
            // Show success message
            showSuccessNotification('Lesson published successfully!');
            
            // Reset form
            this.reset();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Success Notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 1.5rem;">✅</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

