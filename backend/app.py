from flask import Flask, request, jsonify

app = Flask(__name__)

PORT = 5002

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/tts', methods=['GET'])
def tts():
    text = request.args.get('text')  # Get the text from query parameters
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Placeholder for TTS logic. Replace this with actual TTS processing.
    # For example, calling Google's Text-to-Speech API and returning the audio file or URL.
    tts_response = f"Processed TTS for: {text}"

    return jsonify({'message': tts_response})

if __name__ == '__main__':
    app.run(debug=True, port=PORT)
