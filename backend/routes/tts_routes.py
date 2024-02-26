from flask import Blueprint, request, jsonify, send_file
import supertts
import os
from datetime import datetime

tts_bp = Blueprint('tts', __name__)

output_dir = 'outputs'

@tts_bp.route('/api/v1/tts', methods=['GET'])
def tts():
    text = request.args.get('text')
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
        response = supertts.tts(text, model = model, voice=voice)
        response.stream_to_file(filename)

    return jsonify({
        "filename": full_path
    }), 200
