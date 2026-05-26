# blueprints.py

"""
Blueprint for admin clients module
"""

from flask import Blueprint

admin_employees_bp = Blueprint('admin_employees', __name__, url_prefix='/administration/employees',template_folder='templates', static_folder='static')