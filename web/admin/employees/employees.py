from flask import Blueprint, render_template

from .blueprints import admin_employees_bp


@admin_employees_bp.route('/')
def employees():


    return render_template("employees_full_page.html")






