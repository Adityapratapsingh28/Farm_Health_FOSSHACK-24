from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import pickle
from typing import List
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

MODEL = tf.keras.models.load_model("../potato-disease/models/1")
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

# Load sentiment analysis model
with open("api/best_model.sav", 'rb') as f:
    sentiment_model = pickle.load(f)

class SummarizedReviewResponse(BaseModel):
    summary: str

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = MODEL.predict(img_batch)
    
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

@app.post("/generate_review", response_model=SummarizedReviewResponse)
async def generate_review():
    try:
        # Placeholder summarization logic
        summarized_review = "I bought 5 kg home garden ordered Nice clean bit high priced product potting mix plants r growing fast healthy blooming every day Happy hv purchased Thank Amazon Ugaoo Though product This second time one packet mix torn quantity less Utmost care monitoring required packing orders disappointed regarding The media could loaded Good qualityAap sabhi le sakte ho Quality Quantity Rate Excellent WAS A GOOD MIXTURE EASY TO USE AND HAVE GOT GOOD RESULTS Good Its mixture"
        
        return SummarizedReviewResponse(summary=summarized_review)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)