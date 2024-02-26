from dotenv import load_dotenv
import logging
from backend import create_app

load_dotenv()

logging.basicConfig(level=logging.DEBUG)

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
