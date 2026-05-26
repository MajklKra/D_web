# blueprints.py

"""
Blueprint for equipment module
"""

from flask import Blueprint

# auth_bp = Blueprint('auth', __name__, url_prefix='/auth',template_folder='templates', static_folder='static')

equipment_bp = Blueprint('equip', __name__, url_prefix='/equip/',template_folder='templates', static_folder='static')