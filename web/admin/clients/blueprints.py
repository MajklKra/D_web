# blueprints.py

"""
Blueprint for admin clients module
"""

from flask import Blueprint

admin_clients_bp = Blueprint('admin_clients', __name__, url_prefix='/administration/clients',template_folder='templates', static_folder='static')

