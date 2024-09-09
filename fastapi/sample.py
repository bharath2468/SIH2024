# sample.py
from transformers import BlipProcessor, BlipForConditionalGeneration
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms import Ollama
import concurrent.futures
import warnings
import gc

warnings.simplefilter(action="ignore", category=FutureWarning)

class Model:

    def __init__(self) -> None:
        self.img_processor = BlipProcessor.from_pretrained(
            "Salesforce/blip-image-captioning-large"
        )
        self.img_model = BlipForConditionalGeneration.from_pretrained(
            "Salesforce/blip-image-captioning-large"
        ).to("cuda")
        self.llm = Ollama(model="llama3.1")
        self.prompt_template = ChatPromptTemplate.from_template(
            "You are a helpful assistant who responds based on the image more precisely. Here is the description of that image: '{image_description}'. {question} Please respond concisely, not more than 3 lines."
        )
        self.executor = concurrent.futures.ThreadPoolExecutor()

    def image_caption(self, user_input, img_data):
        inputs = self.img_processor(
            img_data, return_tensors="pt", clean_up_tokenization_spaces=True
        ).to("cuda")
        print("Image model started! ")
        caption_ids = self.img_model.generate(**inputs, max_new_tokens=50)
        image_description = self.img_processor.decode(
            caption_ids[0], skip_special_tokens=True
        )
        print("Image model Completed")
        if user_input=='':
            return image_description
        response = self.get_response(user_input, image_description)
        print(response)
        return response

    def get_response(self, user_input, image_description):
        prompt = self.prompt_template.format_prompt(
            image_description=image_description, question=user_input
        )
        print("LLM Started!")
        response = self.llm.invoke(prompt.to_string())
        #response = "HWat happended"
        print("LLM Completed")
        return response
