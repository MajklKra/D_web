
import vokativ
import requests

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for
from .blueprints import admin_clients_bp
from vokativ import vokativ
from ...version import __version__

from  web.share.s_print import s_print


@admin_clients_bp.route('/home')
def home():

    s_print(f"URL: {request.url}", "green",0,0)

    salutation = session.get('e_name')
    salutation = vokativ(salutation).capitalize()

    s_print(salutation, "white",0,0)

    name = session.get('e_name')

    s_print(name, "white",0,0)

    surname = session.get('e_surname')

    s_print(surname, "white",0,1)

    # temp = round(weather())

    first_login = session.get("first_login")

    # r = requests.get("https://svatkyapi.cz/api/day")

    # data = r.json()

    # print(data)

    data = {

        "labels": ["start", "2021", "2022", "2023", "2024", "2025", "end"],
        "values": [123, 123, 79, 163, 37, 150, 180],
    }

    return render_template('base.html', name = name, surname = surname, salutation = salutation, version = __version__, first_login = first_login, chart_data=data)


@admin_clients_bp.route('/logout')
def logout():

    s_print(f"URL: {request.url}", "green",0,1)
    s_print("👽 Hello stranger you have sucessfully entered the /logout function so be warmly welcome ! ", "white",0,0)

    session.clear()

    return redirect(url_for("auth.login"))


@admin_clients_bp.route('/weather')
def weather():

    # This part of app gets weather data from OpenWeather API

    s_print(f"URL: {request.url}", "green",0,0)
    s_print("Mate, welcome to the OpenWeatherMap forecast.", "white",0,0)

    city = "Valasske Mezirici"
    api_key = "859db4eec845ba1f4b14778e59ef1fa6"

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={api_key}&units=metric&lang=cz"
    )

    s_print(f"city: {city}", "white",0,0)

    response = requests.get(url)

    if response.status_code != 200:

        s_print(f" error: {response.status_code}", "red",0,0)

        return jsonify(response.json()), response.status_code

    data = response.json()

    weather_data = {
        "city": data["name"],
        "temp": data["main"]["temp"],
        "description": data["weather"][0]["description"]
    }

    temp =  data["main"]["temp"]

    s_print(f"actual temperature: {temp}", "white",0,1)

    return jsonify({
        "temp": temp
    })





