// Admin Upload JavaScript

// Handle File Selection
function handleFileSelect(event, type) {
    const files = event.target.files;
    if (!files.length) return;
    
    const previewId = type === 'audio' ? 'audioPreview' : 
                     type === 'video' ? 'videoPreview' : 'imagesPreview';
    const preview = document.getElementById(previewId);
    
    preview.innerHTML = '';
    preview.classList.add('active');
    
    Array.from(files).forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-preview-item';
        
        const fileInfo = document.createElement('div');
        fileInfo.innerHTML = `
            <div class="file-name">${file.name}</div>
            <div class="file-size">${formatFileSize(file.size)}</div>
        `;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file';
        removeBtn.textContent = '✕';
        removeBtn.onclick = () => {
            item.remove();
            if (!preview.children.length) {
                preview.classList.remove('active');
            }
        };
        
        item.appendChild(fileInfo);
        item.appendChild(removeBtn);
        preview.appendChild(item);
        
        // Create preview for images
        if (type === 'images' && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = 'width: 60px; height: 60px; object-fit: cover; border-radius: 6px; margin-right: 1rem;';
                fileInfo.insertBefore(img, fileInfo.firstChild);
            };
            reader.readAsDataURL(file);
        }
        
        // Create audio player for audio files
        if (type === 'audio' && file.type.startsWith('audio/')) {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.style.cssText = 'width: 100%; margin-top: 0.5rem;';
            audio.src = URL.createObjectURL(file);
            item.appendChild(audio);
        }
        
        // Create video player for video files
        if (type === 'video' && file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.controls = true;
            video.style.cssText = 'width: 100%; max-height: 300px; margin-top: 0.5rem; border-radius: 8px;';
            video.src = URL.createObjectURL(file);
            item.appendChild(video);
        }
    });
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Select Upload Method (for video)
function selectUploadMethod(method) {
    const form = document.getElementById('videoUploadForm');
    form.style.display = 'block';
    
    if (method === 'file') {
        form.innerHTML = `
            <h4>📁 Upload Video File</h4>
            <div class="form-group">
                <label>Video Title *</label>
                <input type="text" name="videoTitle" placeholder="Enter video title" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="videoDescription" rows="3" placeholder="Brief description..."></textarea>
            </div>
            <div class="form-group">
                <label>Video File *</label>
                <div class="file-upload-area">
                    <input type="file" accept="video/*" onchange="handleFileSelect(event, 'video')">
                    <div class="upload-placeholder">
                        <div class="upload-icon">🎥</div>
                        <div>Drop video file here or click to browse</div>
                        <div class="upload-hint">Supported: MP4, WebM (Max: 100MB)</div>
                    </div>
                    <div id="videoFilePreview" class="file-preview"></div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Category</label>
                    <select name="category">
                        <option value="tutorial">Tutorial</option>
                        <option value="pronunciation">Pronunciation</option>
                        <option value="tajweed">Tajweed</option>
                        <option value="practice">Practice</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Related Lesson (Optional)</label>
                    <input type="number" name="relatedLesson" placeholder="Lesson number" min="1" max="84">
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="cancelUpload()">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="uploadVideo()">Upload Video</button>
            </div>
        `;
    } else if (method === 'youtube') {
        form.innerHTML = `
            <h4>📺 Add YouTube Video</h4>
            <div class="form-group">
                <label>Video Title *</label>
                <input type="text" name="videoTitle" placeholder="Enter video title" required>
            </div>
            <div class="form-group">
                <label>YouTube URL *</label>
                <input type="url" name="youtubeUrl" placeholder="https://youtube.com/watch?v=..." required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="videoDescription" rows="3" placeholder="Brief description..."></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Category</label>
                    <select name="category">
                        <option value="tutorial">Tutorial</option>
                        <option value="pronunciation">Pronunciation</option>
                        <option value="tajweed">Tajweed</option>
                        <option value="practice">Practice</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Related Lesson (Optional)</label>
                    <input type="number" name="relatedLesson" placeholder="Lesson number" min="1" max="84">
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="cancelUpload()">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="addYouTubeVideo()">Add Video</button>
            </div>
        `;
    } else if (method === 'record') {
        form.innerHTML = `
            <h4>🎬 Record Video</h4>
            <div class="video-recorder">
                <video id="recordPreview" autoplay muted style="width: 100%; max-height: 400px; background: #000; border-radius: 12px; margin-bottom: 1rem;"></video>
                <div style="text-align: center;">
                    <button type="button" class="btn btn-primary" onclick="startRecording()">🔴 Start Recording</button>
                    <button type="button" class="btn btn-secondary" onclick="stopRecording()" disabled id="stopRecBtn">⏹️ Stop</button>
                    <button type="button" class="btn btn-secondary" onclick="cancelUpload()">Cancel</button>
                </div>
            </div>
        `;
        initializeCamera();
    }
}

// Initialize Camera
async function initializeCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const video = document.getElementById('recordPreview');
        video.srcObject = stream;
    } catch (err) {
        alert('Could not access camera: ' + err.message);
    }
}

// Recording functionality
let mediaRecorder;
let recordedChunks = [];

function startRecording() {
    const video = document.getElementById('recordPreview');
    const stream = video.srcObject;
    
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];
    
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };
    
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        video.src = url;
        video.srcObject = null;
        video.controls = true;
        
        alert('Recording complete! You can now download or upload it.');
    };
    
    mediaRecorder.start();
    document.getElementById('stopRecBtn').disabled = false;
    event.target.disabled = true;
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('stopRecBtn').disabled = true;
}

// Upload Video
function uploadVideo() {
    showSuccessNotification('Video uploaded successfully!');
    cancelUpload();
}

// Add YouTube Video
function addYouTubeVideo() {
    showSuccessNotification('YouTube video added successfully!');
    cancelUpload();
}

// Cancel Upload
function cancelUpload() {
    document.getElementById('videoUploadForm').style.display = 'none';
    document.getElementById('videoUploadForm').innerHTML = '';
}

// Success Notification (imported from admin.js)
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

