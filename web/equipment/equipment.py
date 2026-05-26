from flask import Blueprint, render_template

from .blueprints import equipment_bp


@equipment_bp.route('/')
def diagnostics():


    return render_template("equipment_full_page.html")






