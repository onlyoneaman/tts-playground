from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from dotenv import load_dotenv
from helpers.azure_tts import get_voices
from helpers.api_helpers import CustomEncoder
import json
import logging

load_dotenv()

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

CORS(app)

PORT = 5002

api = Blueprint('api', __name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'UP'}), 200

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

# Global error handler
@app.errorhandler(Exception)
def handle_exception(e):
    logging.error(f"Unhandled exception: {str(e)}")
    return jsonify({'error': 'An unexpected error occurred'}), 500

# Register the API Blueprint
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=PORT)
