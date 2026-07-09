

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for

from .blueprints import admin_clients_bp
from ...version import __version__
from vokativ import vokativ

from  web.share.s_print import s_print
from  web.share.db import db_connection, sqliteDB

@admin_clients_bp.route('/')
def clients():

    """
    První načtení stránky klientů.
    """
    s_print(f"URL: {request.url}", "green",0,0)
    s_print("function clients() started ...", "green",0,0)
    print("➡️ HX-Request header:", request.headers.get("HX-Request"))
    s_print("➡️ HX-Request header:", "blue",0,0)

    # name = session.get('e_name')
    # s_print(f"name: {name}", "blue",0,0)
    # surname = session.get('e_surname')
    # s_print(f"name: {surname}", "blue",0,0)

    ### Data supply ###

    salutation = session.get('e_name')
    salutation = vokativ(salutation).capitalize()

    s_print(salutation, "white",0,0)

    name = session.get('e_name')

    s_print(name, "white",0,0)

    surname = session.get('e_surname')

    s_print(surname, "white",0,1)

    # temp = round(weather())

    data = {

        "labels": ["start", "2021", "2022", "2023", "2024", "2025", "end"],
        "values": [100, 123, 79, 163, 37, 150, 150],

    }

    percent = 25

    percent2 = 75

    percent3 = 75

    deps = session.get("e_deps")

    first_login = session.get("first_login")

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



    ###  Úvodní SQL dotaz ###

    SQL_query_all_pacients = '''

    SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, DodsSubjectId
    FROM Patients
    JOIN Beds ON Beds.BedID = Patients.BedID
    JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    JOIN Floors ON Floors.FloorID = Rooms.FloorID
    JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

    UNION ALL

    SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.`Name`, Departments.`Name` AS Department, Rooms.RoomNumber, Beds.BedNumber, CygnusClientId, DodsSubjectId
    FROM Patients
    JOIN Beds ON Beds.BedID = Patients.BedID
    JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
    JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
    JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
    JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    JOIN Floors ON Floors.FloorID = Rooms.FloorID
    JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

    UNION ALL

    SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, DodsSubjectId
    FROM Patients
    LEFT JOIN Beds ON Beds.BedID = Patients.BedID
    LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
    LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

    WHERE Patients.BedID = -1
    ORDER BY Surname, Name;

    '''

    result_all_pacients = db_connection(SQL_query_all_pacients, (), one_row=False)

    print("Výsledek SQL dotazů result_all_pacients delivered !!! ")

    ###  Úvodní SQL dotaz ###


    # HTMX request? -> vrať jen obsah
    if request.headers.get("HX-Request"):
        s_print("🔹 Posílám JEN fragment:", "blue",1,1)
        return render_template("clients_fragment.html", all_clients=result_all_pacients)

    s_print("🔹 Posílám CELOU stránku", "blue",1,1)
    return render_template("clients_full_page.html", data=view_data, all_clients=result_all_pacients)