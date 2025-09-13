# SumAI - Intelligent Text Summarization

A modern web application that uses AI to generate personalized summaries of long text content with customizable tone, length, and purpose.

## ✨ Features

### 🎨 Modern Frontend
- **React 18** with Tailwind CSS
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Toggle between themes
- **File Upload** - Support for .txt and .pdf files
- **Real-time Processing** - Live summary generation

### 🤖 AI-Powered Backend
- **FastAPI** - Modern Python web framework
- **Facebook BART Model (Hugging Face Transformer)** - State-of-the-art text summarization
- **Customizable Output** - Tone, length, and purpose options
- **Error Handling** - Comprehensive error management

### 🎛️ Personalization Options
- **Tone**: Casual, Formal, Professional, Friendly
- **Length**: Short, Medium, Detailed
- **Purpose**: TL;DR, Key Points, Explainer

## 🚀 Quick Start

### Option 1: One-Click Start (Recommended)
```bash
start-sumai.bat
```

### Option 2: Manual Start

**1. Start Backend:**
```bash
cd Backend
start-simple.bat
```

**2. Start Frontend:**
```bash
cd Frontend/sumai
npm start
```

## 📋 Prerequisites

### Frontend Requirements
- Node.js (v14 or higher)
- npm or yarn

### Backend Requirements
- Python 3.8 or higher

## 🛠️ Setup Instructions

### 1. Backend Setup

```bash
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Start the server
start-simple.bat
```

### 2. Frontend Setup

```bash
cd Frontend/sumai

# Install dependencies
npm install

# Start the development server
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/docs

## 📡 API Endpoints

### POST `/summarize`
```json
{
  "text": "Your long text to summarize...",
  "tone": "casual|formal|professional|friendly",
  "length": "short|medium|detailed",
  "purpose": "tldr|keypoints|explainer"
}
```

## 🎯 Usage Examples

### Casual TL;DR Summary
- **Tone**: Casual
- **Length**: Short
- **Purpose**: TL;DR

### Formal Detailed Analysis
- **Tone**: Formal
- **Length**: Detailed
- **Purpose**: Explainer

## 🔧 Configuration

### CORS Settings
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🛡️ Error Handling

The application includes comprehensive error handling:
- **Input Validation** - Checks for empty text and length limits
- **Model Error Handling** - Handles summarization errors
- **Network Error Handling** - Connection issues between frontend and backend

## 📁 Project Structure

```
SumAI/
├── Backend/
│   ├── summ.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── start-simple.bat    # Backend startup script
│   └── README.md           # Backend documentation
├── Frontend/
│   └── sumai/
│       ├── src/            # React source code
│       ├── public/         # Static assets
│       ├── package.json    # Node.js dependencies
│       └── README.md       # Frontend documentation
└── start-sumai.bat         # Full application startup
```

## 🔍 Troubleshooting

### Backend Issues
1. **Python not found**: Install Python from [python.org](https://python.org)
2. **Missing dependencies**: Run `pip install -r requirements.txt`
3. **Server not starting**: Make sure start-simple.bat is present

### Frontend Issues
1. **Node.js not found**: Install Node.js from [nodejs.org](https://nodejs.org)
2. **Dependencies error**: Run `fix-dependencies.bat`
3. **Port already in use**: The app will automatically try port 3001

### Connection Issues
1. **Backend not responding**: Ensure backend is running on port 5000
2. **CORS errors**: Check that both servers are running

## 🚀 Production Deployment

### Frontend
```bash
cd Frontend/sumai
npm run build
```

### Backend
```bash
cd Backend
pip install gunicorn
gunicorn summ:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, FastAPI, Hugging Face BART Model** 