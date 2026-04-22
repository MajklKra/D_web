# blueprints.py

"""
Blueprint for admin authorization module
"""

from flask import Blueprint

auth_bp = Blueprint('auth', __name__, url_prefix='/auth',template_folder='templates', static_folder='static')

