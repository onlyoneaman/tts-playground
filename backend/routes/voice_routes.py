from flask import Blueprint
from backend.helpers.api_helpers import CustomEncoder
import json
from supertts import SuperTTS

voice_bp = Blueprint('voices', __name__)

@voice_bp.route('/api/v1/voices', methods=['GET'])
def voices():
    supertts = SuperTTS()
    voices = []

    keys = ["openai", "azure"]

    for key in keys:
        items = supertts.voices(provider=key) or []
        voices.append({
            'name': key,
            'voices': items
        })

    response = {
        'voices': voices,
        'providers': keys
    }
    
    return json.dumps(response, cls=CustomEncoder)
