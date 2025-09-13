import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState('casual');
  const [length, setLength] = useState('medium');
  const [purpose, setPurpose] = useState('tldr');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fileInputRef = useRef(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      if (fileName.endsWith('.txt')) {
        // Handle text files
        const reader = new FileReader();
        reader.onload = (e) => {
          setText(e.target.result);
        };
        reader.onerror = () => {
          alert('Error reading text file. Please try again.');
        };
        reader.readAsText(file);
      } else if (fileName.endsWith('.pdf')) {
        // Handle PDF files - show message for now
        alert('PDF support is coming soon! For now, please use .txt files or paste the text directly.');
        // Reset file input
        event.target.value = '';
      } else {
        alert('Please select a .txt or .pdf file.');
        event.target.value = '';
      }
    }
  };

  // Generate summary using the backend API
  const generateSummary = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          tone: tone,
          length: length,
          purpose: purpose
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      let errorMessage = 'Error: Unable to generate summary. ';
      
      if (error.message.includes('fetch')) {
        errorMessage += 'Please check if the backend server is running on http://localhost:5000';
      } else if (error.message.includes('500')) {
        errorMessage += 'Backend server error. Please check if your OpenAI API key is configured.';
      } else if (error.message.includes('400')) {
        errorMessage += 'Invalid request. Please check your input.';
      } else {
        errorMessage += error.message;
      }
      
      setSummary(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy summary to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  // Download summary as text file
  const downloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SumAI</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>About</a>
              <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>How It Works</a>
              <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Contact</a>
            </nav>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Input Text</h2>
              
              {/* File Upload */}
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.pdf"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current.click()}
                  className={`w-full p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white bg-gray-800' 
                      : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900 bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">📁</div>
                    <div className="font-medium">Click to upload or drag and drop</div>
                    <div className="text-sm opacity-75 mt-1">Supports .txt files (PDF coming soon)</div>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your long text here..."
                className={`w-full h-64 p-4 border rounded-lg resize-none transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              />
            </div>

            {/* Personalization Options */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Personalization</h3>
              
              {/* Tone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Length</label>
                <div className="grid grid-cols-3 gap-3">
                  {['short', 'medium', 'detailed'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setLength(option)}
                      className={`p-3 rounded-lg border transition-colors ${
                        length === option
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : isDarkMode
                            ? 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Purpose</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                >
                  <option value="tldr">TL;DR</option>
                  <option value="keypoints">Key Points</option>
                  <option value="explainer">Explainer</option>
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateSummary}
                disabled={!text.trim() || isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
                  !text.trim() || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Summary...
                  </div>
                ) : (
                  'Generate Summary'
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Summary</h2>
            
            {summary ? (
              <div className="animate-fade-in">
                <div className={`p-6 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={copyToClipboard}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                    }`}
                  >
                    📋 Copy to Clipboard
                  </button>
                  <button
                    onClick={downloadSummary}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                    }`}
                  >
                    💾 Download as .txt
                  </button>
                </div>
              </div>
            ) : (
              <div className={`p-8 rounded-lg border-2 border-dashed text-center ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-400' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                <div className="text-4xl mb-4">📝</div>
                <p>Your summary will appear here after generation</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
