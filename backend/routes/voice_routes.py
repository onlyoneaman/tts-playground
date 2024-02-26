from flask import Blueprint, jsonify
from backend.helpers.azure_tts import get_voices
from backend.helpers.api_helpers import CustomEncoder
import json
import supertts

voice_bp = Blueprint('voices', __name__)

@voice_bp.route('/api/v1/voices', methods=['GET'])
def voices():
    voices = supertts.voices()

    # voices = get_voices()
    # if not voices:
    #     return jsonify({'error': 'Failed to retrieve voices'}), 500
    
    response = {
        'items': voices,
        'total': len(voices)
    }
    
    return json.dumps(response, cls=CustomEncoder)
