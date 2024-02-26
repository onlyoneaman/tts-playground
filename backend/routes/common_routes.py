from flask import jsonify, Blueprint

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'UP'}), 200

