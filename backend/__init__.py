from flask import Flask
from .config import DevelopmentConfig

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)

    return app
