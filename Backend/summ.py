# backend/summarization_api.py

from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import logging
import torch
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import re

# Load environment variables
load_dotenv()

app = FastAPI(title="SumAI API", description="AI-powered text summarization API using Hugging Face")

# Enable logging
logging.basicConfig(level=logging.INFO)

# Global variables for model and tokenizer
summarizer = None
tokenizer = None
model = None

def load_model():
    """Load the summarization model"""
    global summarizer, tokenizer, model
    
    try:
        logging.info("Loading summarization model...")
        
        # Use a smaller, faster model for summarization
        model_name = "facebook/bart-large-cnn"  # Good for summarization
        
        # Load tokenizer and model
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        
        # Create summarization pipeline
        summarizer = pipeline(
            "summarization",
            model=model,
            tokenizer=tokenizer,
            device=0 if torch.cuda.is_available() else -1  # Use GPU if available
        )
        
        logging.info("Model loaded successfully!")
        return True
        
    except Exception as e:
        logging.error(f"Failed to load model: {e}")
        return False

def adjust_summary_length(summary: str, length: str) -> str:
    """Adjust summary length based on user preference"""
    sentences = re.split(r'[.!?]+', summary)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    if length == "short":
        return '. '.join(sentences[:2]) + '.'
    elif length == "medium":
        return '. '.join(sentences[:4]) + '.'
    else:  # detailed
        return summary

def apply_tone_style(summary: str, tone: str) -> str:
    """Apply tone-specific styling to the summary"""
    if tone == "casual":
        return f"Here's the gist: {summary}"
    elif tone == "formal":
        return f"In summary: {summary}"
    elif tone == "professional":
        return f"Executive Summary: {summary}"
    elif tone == "friendly":
        return f"Here's what I found: {summary}"
    else:
        return summary

def format_for_purpose(summary: str, purpose: str) -> str:
    """Format summary based on purpose"""
    if purpose == "tldr":
        return f"TL;DR: {summary}"
    elif purpose == "keypoints":
        sentences = re.split(r'[.!?]+', summary)
        sentences = [s.strip() for s in sentences if s.strip()]
        points = [f"• {sentence}." for sentence in sentences if sentence]
        return "Key Points:\n" + "\n".join(points)
    else:  # explainer
        # For explainer, return in paragraph format
        sentences = re.split(r'[.!?]+', summary)
        sentences = [s.strip().capitalize() for s in sentences if s.strip()]
        paragraph = '. '.join(sentences) + '.'
        return f"Explainer:\n{paragraph}"

        
        if len(sentences) > 1:
            detailed_summary = f"Detailed Summary:\n\n"
            for i, sentence in enumerate(sentences, 1):
                if sentence:
                    detailed_summary += f"{i}. {sentence}.\n\n"
            return detailed_summary.rstrip()
        else:
            return f"Detailed Summary:\n\n{summary}"

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    load_model()

@app.get("/")
async def root():
    return {"message": "SumAI API is running with Hugging Face", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": summarizer is not None,
        "device": "GPU" if torch.cuda.is_available() else "CPU",
        "message": "SumAI API is ready to generate summaries"
    }

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummarizationRequest(BaseModel):
    text: str
    tone: str  # "casual" or "formal"
    length: str  # "short", "medium", or "detailed"
    purpose: str  # "tldr", "highlights", or "explainer"

@app.post("/summarize")
async def summarize(req: SummarizationRequest):
    # Check if model is loaded
    if not summarizer:
        raise HTTPException(status_code=500, detail="Summarization model not loaded")
    
    # Validate input
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Input text is empty")
    if len(req.text) > 10000:
        raise HTTPException(status_code=413, detail="Input text too long")

    logging.info(f"Request: tone={req.tone}, length={req.length}, purpose={req.purpose}")

    try:
        # Adjust model parameters based on length preference
        if req.length == "short":
            max_len = 80
            min_len = 20
        elif req.length == "medium":
            max_len = 150
            min_len = 50
        else:  # detailed
            max_len = 250
            min_len = 100
        
        # Generate base summary using the model with appropriate length
        result = summarizer(req.text, max_length=max_len, min_length=min_len, do_sample=False)
        base_summary = result[0]['summary_text']
        
        # Apply tone styling
        styled_summary = apply_tone_style(base_summary, req.tone)
        
        # Format for purpose
        final_summary = format_for_purpose(styled_summary, req.purpose)
        
        return {"summary": final_summary}

    except Exception as e:
        logging.error(f"Summarization failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
