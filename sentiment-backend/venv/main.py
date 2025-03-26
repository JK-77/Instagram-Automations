from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline

# Initialize FastAPI
app = FastAPI()

# Initialize Hugging Face sentiment analysis pipeline
# This model returns "POSITIVE" or "NEGATIVE" along with a confidence score.
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Sample data to store comments
sample_comments = []

# Define request body
class CommentRequest(BaseModel):
    product_id: str
    text: str

@app.post("/analyze-comment/")
async def analyze_comment(request: CommentRequest):
    try:
        # Analyze sentiment using Hugging Face pipeline
        result = sentiment_pipeline(request.text)[0]  # returns a list with one dict
        label = result["label"]  # "POSITIVE" or "NEGATIVE"
        score = result["score"]  # confidence score (e.g., 0.99)

        # Optional: If the text is a question, you might want to classify it as neutral.
        # Uncomment the following lines to do so:
        # if "?" in request.text:
        #     sentiment = "neutral"
        # else:

        # Custom logic to potentially classify as neutral if confidence is not high:
        # Since this model is binary, its confidence scores are usually high.
        # But if you want to treat borderline cases as neutral, you could do:
        if "?" in request.text:
            sentiment = "neutral"
        elif abs(score - 0.5) < 0.1:  # if score is within 0.1 of 0.5 (i.e., uncertain)
            sentiment = "neutral"
        else:
            sentiment = "positive" if label.upper() == "POSITIVE" else "negative"

        # Store the comment in the sample data
        sample_comments.append({
            "product_id": request.product_id,
            "text": request.text,
            "sentiment": sentiment
        })

        return {"text": request.text, "sentiment": sentiment}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")

@app.get("/sentiment-stats/")
async def get_sentiment_stats():
    try:
        positive_count = sum(1 for comment in sample_comments if comment['sentiment'] == 'positive')
        negative_count = sum(1 for comment in sample_comments if comment['sentiment'] == 'negative')
        neutral_count  = sum(1 for comment in sample_comments if comment['sentiment'] == 'neutral')

        return {"positive": positive_count, "negative": negative_count, "neutral": neutral_count}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
