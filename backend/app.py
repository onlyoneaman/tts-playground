from flask import Flask, request, jsonify
from dotenv import load_dotenv
from helpers.azure_tts import get_voices
import json
from azure.cognitiveservices.speech import SynthesisVoiceGender, SynthesisVoiceType

load_dotenv()

app = Flask(__name__)

PORT = 5002

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/voices', methods=['GET'])
def voices():
    voices_response = get_voices()

    if not voices_response:
        return jsonify({'error': 'Failed to retrieve voices'}), 500
    
    total_items = len(voices_response)
    response = {
        'total': total_items,
        'items': voices_response
    }
    return json.dumps(response, cls=CustomEncoder)

@app.route('/tts', methods=['GET'])
def tts():
    text = request.args.get('text')  # Get the text from query parameters
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Placeholder for TTS logic. Replace this with actual TTS processing.
    # For example, calling Google's Text-to-Speech API and returning the audio file or URL.
    tts_response = f"Processed TTS for: {text}"

    return jsonify({'message': tts_response})

class CustomEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, SynthesisVoiceGender):
            return o.name
        if isinstance(o, SynthesisVoiceType):
            return o.name
        return json.JSONEncoder.default(self, o)

if __name__ == '__main__':
    app.run(debug=True, port=PORT)
