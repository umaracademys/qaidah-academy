# 🕌 Qaidah Academy - Interactive Learning Platform

A beautiful, modern web application for teaching students to read Arabic and Quranic recitation through the Qaidah methodology.

## 📱 Features

### ✨ Current Features Implemented:
- **Student Dashboard** - Complete overview of learning progress
- **Interactive Lessons** - Step-by-step guided learning with Arabic letters
- **Progress Tracking** - Detailed analytics and statistics
- **Achievement System** - Badges, streaks, and gamification
- **Audio Controls** - Listen to pronunciation examples
- **Recording Feature** - Practice and record your own pronunciation
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Beautiful UI** - Modern, clean interface with smooth animations

### 📖 Pages Included:
1. **index.html** - Main dashboard with progress overview
2. **lesson.html** - Interactive lesson screen with Arabic letters
3. **progress.html** - Detailed progress and analytics page

## 🚀 How to View Your App

### Method 1: Open Directly in Browser (Easiest)

1. Navigate to the folder where the files are located:
   ```bash
   cd /tmp/qaidah-app
   ```

2. Open `index.html` in your web browser:
   - **On Mac:** Double-click `index.html` or run:
     ```bash
     open index.html
     ```
   - **On Linux:**
     ```bash
     xdg-open index.html
     ```
   - **On Windows:**
     ```bash
     start index.html
     ```

3. Or simply drag and drop `index.html` into your browser window!

### Method 2: Use a Local Server (Recommended for Full Experience)

For better performance and to simulate a real web environment:

**Using Python:**
```bash
cd /tmp/qaidah-app
python3 -m http.server 8000
```
Then open: http://localhost:8000

**Using Node.js (with npx):**
```bash
cd /tmp/qaidah-app
npx http-server -p 8000
```
Then open: http://localhost:8000

## 🎮 How to Use the App

### Dashboard (index.html)
- View your overall progress across all modules
- See your current streak and achievements
- Check today's goals and complete them
- View learning statistics and charts
- Click "Resume Lesson" to continue learning

### Lesson Page (lesson.html)
- **Listen to Audio:** Click the 🔊 Play Audio button
- **Control Speed:** Use Slower, Normal, or Repeat 3x buttons
- **Record Yourself:** Click the 🔴 Start Recording button
- **Navigate:** Use Next → to move to the next letter
- **Keyboard Shortcuts:**
  - `Space` - Play audio
  - `R` - Toggle recording
  - `→` (Right Arrow) - Next step

### Progress Page (progress.html)
- View detailed statistics on your learning
- See weekly activity charts
- Check skill assessments (Recognition, Pronunciation, Fluency, etc.)
- Track module completion
- View earned certificates and badges

## 🎨 Design Features

### Color Scheme:
- **Primary:** Indigo (#4F46E5) - Main actions and highlights
- **Secondary:** Green (#10B981) - Success and completed items
- **Danger:** Red (#EF4444) - Alerts and recording
- **Warning:** Amber (#F59E0B) - Tips and warnings

### Typography:
- **Inter** - Clean, modern sans-serif for UI
- **Amiri** - Beautiful Arabic font for letter display

### Animations:
- Smooth transitions on all interactive elements
- Progress bar animations
- Chart animations on page load
- Celebration effects for achievements

## 📂 File Structure

```
qaidah-app/
├── index.html              # Main dashboard
├── lesson.html             # Interactive lesson screen
├── progress.html           # Progress & analytics page
├── styles.css              # Main stylesheet
├── lesson.css              # Lesson-specific styles
├── progress.css            # Progress page styles
├── script.js               # Main JavaScript functionality
├── lesson-script.js        # Lesson page functionality
└── README.md               # This file
```

## 🔧 Customization

### To Add More Letters:
Edit the `lessonSteps` array in `lesson-script.js`:
```javascript
const lessonSteps = [
    { letter: 'سَ', pronunciation: 'SA', meaning: 'Seen with Fatha' },
    // Add more letters here
];
```

### To Change Colors:
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary: #4F46E5;
    --secondary: #10B981;
    /* Add your custom colors */
}
```

### To Add Real Audio:
Replace the simulated audio functions in `lesson-script.js`:
```javascript
function playAudio() {
    const audio = new Audio('audio/seen-fatha.mp3');
    audio.play();
}
```

## 🌟 Future Enhancements (Not Yet Implemented)

- Real audio files for each letter
- Actual speech recognition for pronunciation checking
- Backend database for saving progress
- Teacher dashboard
- Parent portal
- More lessons and modules
- Video tutorials
- Multiplayer features
- Mobile app versions (iOS/Android)

## 💡 Tips for Best Experience

1. **Use Chrome or Firefox** for best compatibility
2. **Enable microphone access** for recording features
3. **Use headphones** for better audio quality
4. **Full-screen mode** (F11) for immersive learning
5. **Bookmark the page** for easy access

## 🐛 Troubleshooting

### Audio Not Working?
- Make sure your browser allows audio playback
- Check your system volume
- Note: Currently using simulated audio (notifications only)

### Recording Not Working?
- Grant microphone permissions when prompted
- Check browser console for errors
- Currently simulated - shows recording UI

### Page Not Loading Correctly?
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Make sure all files are in the same folder

## 📱 Mobile Responsive

The app is fully responsive and works great on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🎯 Learning Path

The complete curriculum includes:
1. **Module 1:** Arabic Alphabet (18 lessons) ✅
2. **Module 2:** Short Vowels (15 lessons) 🔄
3. **Module 3:** Long Vowels (11 lessons) 🔒
4. **Module 4:** Sukoon & Rules (11 lessons) 🔒
5. **Module 5:** Advanced Rules (13 lessons) 🔒
6. **Module 6:** Practical Application (12 lessons) 🔒

## 🤝 Contributing

To extend this app:
1. Add new HTML pages for additional features
2. Create corresponding CSS files for styling
3. Add JavaScript for interactivity
4. Update navigation links in all pages
5. Test on multiple devices and browsers

## 📄 License

This is an educational project created for teaching Arabic/Quranic reading.
Feel free to use and modify for educational purposes.

## 🎉 Enjoy Learning!

Start your Qaidah journey today and master Arabic reading step by step!

**Quick Start:** Just open `index.html` in your browser and begin! 🚀

---

Created with ❤️ for students learning to read the Quran

