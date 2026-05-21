
import vokativ
import requests

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for
from .blueprints import admin_clients_bp
from vokativ import vokativ
from ...version import __version__


@admin_clients_bp.route('/home')
def home():

    salutation = session.get('e_name')

    salutation = vokativ(salutation).capitalize()

    name = session.get('e_name')
    surname = session.get('e_surname')

    # temp = round(weather())

    return render_template('base.html', name = name, surname = surname, salutation = salutation, version = __version__)


@admin_clients_bp.route('/logout')
def logout():

    print(" 👽 Hello stranger you have sucessfully entered the /logout function so be warmly welcome ! ")

    session.clear()

    return redirect(url_for("auth.login"))


@admin_clients_bp.route('/weather')
def weather():

    # This part of app gets weather data from OpenWeather API

    print("Mate, welcome to the OpenWeather API forecast.")

    city = "Valasske Mezirici"
    api_key = "859db4eec845ba1f4b14778e59ef1fa6"

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={api_key}&units=metric&lang=cz"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return jsonify(response.json()), response.status_code

    data = response.json()

    weather_data = {
        "city": data["name"],
        "temp": data["main"]["temp"],
        "description": data["weather"][0]["description"]
    }

    temp =  data["main"]["temp"]

    # return jsonify(weather_data)

    # return temp

    return jsonify({
        "temp": temp
    })






