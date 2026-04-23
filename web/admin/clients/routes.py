from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for
from .blueprints import admin_clients_bp
# from vokativ import vokativ

@admin_clients_bp.route('/home')
def home():

    return "Vítej na pracovní ploše"

