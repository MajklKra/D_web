
import vokativ
import requests

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for
from .blueprints import admin_clients_bp
from vokativ import vokativ
from ...version import __version__

from  web.share.s_print import s_print

from  web.share.db import db_connection

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

    data = {

        "labels": ["start", "2021", "2022", "2023", "2024", "2025", "end"],
        "values": [100, 123, 79, 163, 37, 150, 150],

    }

    percent = 25

    percent2 = 75

    percent3 = 75

    deps = session.get("e_deps")

    ### SQL dotaz pro počet pacientů na mém oddělení ###

    if not deps:
        result = []
        patientsCount = 0
    else:

        placeholders = ",".join(["%s"] * len(deps))

        SQL_query = f'''

            SELECT COUNT(*) AS patients_count
            FROM
            (

                SELECT Patients.PatientID, Patients.Surname, Patients.`Name` AS PatientName, Buildings.BuildingID, Buildings.`Name` AS BuildingName, Floors.FloorID, Floors.`Name` AS FloorName,
                Departments.DepartmentID, Departments.`Name` AS DepartmentName, Departments.NamePrefix, Rooms.RoomID, Rooms.RoomName, Rooms.RoomNumber,
                NULL AS SubRoomID, NULL AS SubRoomName, NULL AS SubRoomNumber, Beds.BedID, Beds.BedName, Beds.BedNumber
                FROM Patients
                JOIN Beds ON Beds.BedID = Patients.BedID
                JOIN Rooms ON Rooms.RoomID = Beds.RoomID
                JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
                JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
                JOIN Floors ON Floors.FloorID = Rooms.FloorID
                JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

                UNION ALL

                SELECT Patients.PatientID, Patients.Surname, Patients.`Name`AS PatientName ,  Buildings.BuildingID, Buildings.`Name` AS BuildingName, Floors.FloorID, Floors.`Name` AS FloorName,
                Departments.DepartmentID, Departments.`Name` AS DepartmentName, Departments.NamePrefix, Rooms.RoomID, Rooms.RoomName, Rooms.RoomNumber,
                SubRooms.SubRoomID, SubRooms.SubRoomName, SubRooms.SubRoomNumber, Beds.BedID, Beds.BedName, Beds.BedNumber
                FROM Patients
                JOIN Beds ON Beds.BedID = Patients.BedID
                JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
                JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
                JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
                JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
                JOIN Floors ON Floors.FloorID = Rooms.FloorID
                JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

            ) AS x
            WHERE 		x.DepartmentID IN ({placeholders})

        '''

        result = db_connection(SQL_query, deps, one_row=False)


        patientsCount = result[0][0]



    ### Dotaz počet volných postelí ###

    if not deps:
        result = []
        bedsCount = 0
    else:

        SQL_query2 = f'''

                WITH combined AS
                (
                    -- Rooms-level
                    SELECT
                        r.RoomID,
                        r.RoomNumber,
                        d.NAME       AS DeptName,
                        d.NamePrefix,
                        r.RoomName,
                        CAST(NULL AS INT) AS SubRoomID,
                        COUNT(b.BedID) AS pocet_posteli,
                        SUM(CASE WHEN b.BedID IS NOT NULL AND p.BedID IS NULL THEN 1 ELSE 0 END) AS volne_postele
                    FROM Rooms r
                    JOIN Departments_Rooms dr ON dr.RoomID = r.RoomID
                    JOIN Departments d ON d.DepartmentID = dr.DepartmentID
                    LEFT JOIN Beds b ON b.RoomID = r.RoomID
                    LEFT JOIN Patients p ON p.BedID = b.BedID  -- např. AND p.IsActive = 1
                    WHERE d.DepartmentID IN ({placeholders})
                    GROUP BY r.RoomID, r.RoomNumber, d.NAME, d.NamePrefix, r.RoomName

                    UNION ALL

                    -- SubRooms-level
                    SELECT
                        r.RoomID,
                        r.RoomNumber,
                        d.NAME       AS DeptName,
                        d.NamePrefix,
                        r.RoomName,
                        sr.SubRoomID,
                        COUNT(b.BedID) AS pocet_posteli,
                        SUM(CASE WHEN b.BedID IS NOT NULL AND p.BedID IS NULL THEN 1 ELSE 0 END) AS volne_postele
                    FROM SubRooms sr
                    JOIN Rooms r ON r.RoomID = sr.RoomID
                    JOIN Departments_Rooms dr ON dr.RoomID = r.RoomID
                    JOIN Departments d ON d.DepartmentID = dr.DepartmentID
                    LEFT JOIN Beds b ON b.SubRoomID = sr.SubRoomID
                    LEFT JOIN Patients p ON p.BedID = b.BedID  -- např. AND p.IsActive = 1
                    WHERE d.DepartmentID IN ({placeholders})
                    GROUP BY r.RoomID, r.RoomNumber, d.NAME, d.NamePrefix, r.RoomName, sr.SubRoomID
                )

                SELECT SUM(volne_postele) AS volne_postele
                FROM combined

            '''

        result2 = db_connection(SQL_query2, deps + deps, one_row=False)

        bedsCount = result[0][0]

    view_data = {
        "name": name,
        "surname": surname,
        "salutation": salutation,
        "version": __version__,
        "first_login": first_login,
        "chart_data": data,
        "percent": percent,
        "percent2": percent2,
        "percent3": percent3,
        "patients_count": patientsCount,
        "beds_count": bedsCount,
    }

    # return render_template('base.html', name = name, surname = surname, salutation = salutation, version = __version__, first_login = first_login, chart_data=data, percent=percent, percent2=percent2, percent3=percent3)
    return render_template('base.html', data=view_data)

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





