from flask import Flask
from .config import DevelopmentConfig
from routes.tts_routes import tts_bp
from routes.voice_routes import voice_bp
from routes.common_routes import health_bp
from flask_cors import CORS

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__, static_folder="outputs")

    app.register_blueprint(tts_bp)
    app.register_blueprint(voice_bp)
    app.register_blueprint(health_bp)

    CORS(app, resources={
        r"/*": {"origins": "*"}
    })

    return app
