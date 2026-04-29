
import vokativ

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for
from .blueprints import admin_clients_bp
from vokativ import vokativ

@admin_clients_bp.route('/home')
def home():

    salutation = session.get('e_name')

    salutation = vokativ(salutation).capitalize()

    name = session.get('e_name')
    surname = session.get('e_surname')

    return render_template('base.html', name = name, surname = surname, salutation = salutation)


# @admin_clients_bp.route('/logout')
# def logout():

#     print(" 👽 Hello stranger you have sucessfully entered the /logout function so be warmly welcome ! ")

#     session.clear()

#     return redirect(url_for("auth.login"))
