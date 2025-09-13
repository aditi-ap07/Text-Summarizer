# SumAI Frontend

A modern, responsive React application for intelligent text summarization with personalized options.

## ✨ Features

### 🎨 Modern Interface
- Clean, minimalist design with smooth animations
- Light/dark theme toggle
- Fully responsive layout for all devices
- Beautiful gradient effects and hover animations

### 📝 Input Options
- Large text area for pasting or typing long text
- File upload support for .txt and .pdf files
- Drag-and-drop file upload interface

### 🎛️ Personalization Options
- **Tone Selection**: Casual, Formal, Professional, Friendly
- **Length Control**: Short, Medium, Detailed summaries
- **Purpose**: TL;DR, Key Points, Explainer

### 📊 Output Features
- Styled summary display with proper formatting
- Copy to clipboard functionality
- Download summary as .txt file
- Loading spinner during generation

### 🌙 Theme Support
- Automatic light/dark mode toggle
- Smooth transitions between themes
- Custom scrollbar styling for both themes

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd Frontend/sumai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:

**Option A: Using npm directly**
```bash
npm start
```

**Option B: Using the provided scripts (if you encounter PowerShell execution policy issues)**
```bash
# PowerShell script
.\start-app.ps1

# Or batch file
start-app.bat
```

**Option C: Fix PowerShell execution policy**
```powershell
# Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🛠️ Technology Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefixing

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Primary blue gradient: `#3b82f6` to `#8b5cf6`
- Dark mode: Gray scale with proper contrast
- Light mode: Clean white and gray tones

### Animations
Custom animations are defined for:
- Fade-in effects
- Slide-up transitions
- Loading spinners
- Hover effects

## 🔧 Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

### File Structure

```
src/
├── App.js          # Main application component
├── App.css         # Custom styles and animations
├── index.js        # Application entry point
└── index.css       # Tailwind CSS imports
```

## 🔗 API Integration

The current implementation includes a mock API call. To integrate with a real backend:

1. Replace the `generateSummary` function in `App.js`
2. Update the API endpoint URL
3. Handle proper error states
4. Add authentication if required

## 🔧 Troubleshooting

### PowerShell Execution Policy Error
If you encounter "running scripts is disabled" error:

1. **Quick Fix**: Use the provided batch file:
   ```bash
   start-app.bat
   ```

2. **Permanent Fix**: Run PowerShell as Administrator and execute:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Tailwind CSS Not Loading
If styles are not applying correctly:

1. **Quick Fix**: Run the dependency fix script:
   ```bash
   # Windows
   fix-dependencies.bat
   
   # PowerShell
   .\fix-dependencies.ps1
   ```

2. **Manual Fix**: Remove and reinstall dependencies:
   ```bash
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```

3. Check that `tailwind.config.js` and `postcss.config.js` exist
4. Verify `@tailwind` directives are in `src/index.css`

### React Version Issues
The app uses React 18.2.0 for stability. If you encounter version conflicts:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### PostCSS/Tailwind CSS Error
If you see "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin":

1. **Quick Fix**: Run the dependency fix script:
   ```bash
   fix-dependencies.bat
   ```

2. **Manual Fix**: Clean install dependencies:
   ```bash
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```

### Port Already in Use
If port 3000 is already in use:

1. The app will automatically try port 3001
2. Or manually specify a port:
   ```bash
   PORT=3001 npm start
   ```

## 📄 License

This project is part of the SumAI application suite.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using React and Tailwind CSS
