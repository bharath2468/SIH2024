from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from typing import Optional
from pydantic import BaseModel
from PIL import Image
import uvicorn
import io
import base64
from sample import Model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
model = Model()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],  # Or specify the Express server origin, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class ResponseModel(BaseModel):
    response: str

def get_image_from_bytes(image_bytes) -> Image.Image:
    try:
        image_data = base64.b64decode(image_bytes)
        img = io.BytesIO(image_data)
        image = Image.open(img)
        #image.verify()  # Verify that this is an actual image
        print("6")
        return image
    except Exception as e:
        raise ValueError("Invalid image file") from e

@app.post("/predict/", response_model=ResponseModel)
async def predict(
    text: Optional[str] = Form(None),  # Text is optional now
    file: Optional[str] = Form(None)  # File is optional now
):
    try:
        response_text = ""
        # Check if text is provided
        if text:
            print("1")
            response_text = model.get_response(user_input=text, image_description='')

        # Check if an image is provided
        if file:
            print("2")
            if file.startswith('data:image'):
                print("3")
                base64_string = file.split(",")[1]
            #print(base64_string)
            print("4")
            image = get_image_from_bytes(base64_string)
            print("5")
            response_text = model.image_caption(user_input='', img_data=image)
        
        # If neither text nor image is provided, return an error
        if not text and not file:
            return JSONResponse(content={"error": "No input provided. Please provide text or an image."}, status_code=400)

        # Assuming your model takes both text and image if present
        if text and file:
            img_data = await file.read()
            image = get_image_from_bytes(img_data)
            response_text = model.image_caption(user_input=text, img_data=image)

        return {"response": response_text}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)


