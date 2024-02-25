from azure.cognitiveservices.speech import SynthesisVoiceGender, SynthesisVoiceType
import json

class CustomEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, SynthesisVoiceGender):
            return o.name
        if isinstance(o, SynthesisVoiceType):
            return o.name
        return json.JSONEncoder.default(self, o)
