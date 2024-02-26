from flask import Blueprint, request, jsonify, send_file
from supertts import SuperTTS
import os
from datetime import datetime

tts_bp = Blueprint('tts', __name__)

output_dir = 'outputs'

def save_audio(response, filename):
    """
    Saves the audio response to a file.

    :param response: The audio response from tts.tts().
    :param filename: The filename to save the audio to.
    """
    # Check if the response is already in bytes format (e.g., Azure's response)
    if isinstance(response, bytes):
        audio_data = response
    # Check if the response is from OpenAI and needs additional handling
    elif hasattr(response, 'read'):
        # This assumes the response object has a read() method to get bytes
        audio_data = response.read()
    # Add more checks here if there are other types of responses
    else:
        raise TypeError("Unsupported response type for saving audio.")

    # Save the extracted audio data to a file
    with open(filename, 'wb') as f:
        f.write(audio_data)

@tts_bp.route('/api/v1/tts', methods=['GET'])
def tts():
    try:
        tts = SuperTTS()

        text = request.args.get('text')
        provider = request.args.get('provider') or 'openai'
        model = request.args.get('model')
        voice = request.args.get('voice')
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        epoch_timestamp = datetime.now().strftime("%s")
        filename = f"{output_dir}/output_{epoch_timestamp}.mp3"
        full_path = os.path.join("http://127.0.0.1:5000", filename)

        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        cached = False

        if not cached:
            response = tts.tts(
                text, 
                provider=provider,
                model = model, 
                voice=voice
            )
            save_audio(response, filename)

        return jsonify({
            "filename": full_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
