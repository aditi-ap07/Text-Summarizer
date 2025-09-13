@echo off
echo Downloading Hugging Face Model...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python from https://python.org/
    pause
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
pip install torch transformers sentencepiece

REM Download model
echo Downloading BART model for summarization...
python -c "from transformers import AutoTokenizer, AutoModelForSeq2SeqLM; tokenizer = AutoTokenizer.from_pretrained('facebook/bart-large-cnn'); model = AutoModelForSeq2SeqLM.from_pretrained('facebook/bart-large-cnn'); print('Model downloaded successfully!')"

echo.
echo Model download completed! You can now run: start-server.bat
pause 