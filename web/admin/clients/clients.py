

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for, current_app

from .blueprints import admin_clients_bp
from ...version import __version__
from vokativ import vokativ

import math
from math import ceil

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

    ###  Stránkování ###

    page = request.args.get("page", 1, type=int)
    partial = request.args.get("partial")
    per_page = 50
    offset = (page - 1) * per_page

    total_records = db_connection(
        """
            SELECT COUNT(*)
            FROM Patients
        """,
        one_row=True)[0]

    total_pages = ceil(total_records / per_page)

    SQL_query_all_pacients_pages = '''

        SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
        DodsSubjectId, DodsBrokenClient
        FROM Patients
        JOIN Beds ON Beds.BedID = Patients.BedID
        JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
        JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
        JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
        JOIN Floors ON Floors.FloorID = Rooms.FloorID
        JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID


        UNION ALL

        SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
        DodsSubjectId, DodsBrokenClient
        FROM Patients
        JOIN Beds ON Beds.BedID = Patients.BedID
        JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
        JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
        JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
        JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
        JOIN Floors ON Floors.FloorID = Rooms.FloorID
        JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

        UNION ALL

        SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
        DodsSubjectId, DodsBrokenClient
        FROM Patients
        LEFT JOIN Beds ON Beds.BedID = Patients.BedID
        LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
        LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
        LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
        LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
        LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
        WHERE Patients.BedID = -1
        ORDER BY Surname, Name
        LIMIT %s OFFSET %s;

    '''

    clients_per_page = db_connection(SQL_query_all_pacients_pages, (per_page, offset), one_row=False)

    ###  Stránkování ###

    # HTMX stránkování – vrátí pouze tabulku a stránkování
    if partial == "table":

        s_print("🔹 Posílám pouze tabulku:", "blue", 1, 1)

        return render_template(
            "clients_table_response.html",
            all_clients=clients_per_page,
            page=page,
            per_page=per_page,
            total_records=total_records,
            total_pages=total_pages,
            table_response=True,
        )


    # Jiný HTMX požadavek – vrátí celý obsah stránky klientů
    if request.headers.get("HX-Request"):

        s_print("🔹 Posílám clients_fragment:", "blue", 1, 1)

        return render_template(
            "clients_fragment.html",
            all_clients=clients_per_page,
            page=page,
            per_page=per_page,
            total_records=total_records,
            total_pages=total_pages,
            table_response=False,
        )


    # Normální načtení celé stránky
    s_print("🔹 Posílám CELOU stránku", "blue", 1, 1)

    return render_template(
        "clients_full_page.html",
        data=view_data,
        all_clients=clients_per_page,
        page=page,
        per_page=per_page,
        total_records=total_records,
        total_pages=total_pages,
        table_response=False,
    )

@admin_clients_bp.route("/api/all-patient-ids")
def all_patient_ids():

    rows = db_connection(
        """
        SELECT PatientID
        FROM Patients
        ORDER BY PatientID
        """,
        (),
        one_row=False
    )

    patient_ids = [str(row[0]) for row in rows]

    return jsonify({
        "patient_ids": patient_ids,
        "count": len(patient_ids)
    })


#### Dnešní experimenty  13.7.2026 ####

@admin_clients_bp.route( "/delete/<int:patient_id>", methods=["POST"])
def delete_client(patient_id):

    print ("delete_client function")

    try:
        db_connection(
            """
            DELETE FROM Patients
            WHERE PatientID = %s
            """,
            (patient_id,)
        )

        return render_clients_table()

    except Exception as error:

        # current_app.logger.exception("Chyba při mazání klienta %s",patient_id)

        s_print(f"Chyba při mazání klienta {patient_id}", "blue", 1,1)

        return "Klienta se nepodařilo odstranit.", 500

def render_clients_table():

    page = request.args.get("page", 1, type=int)
    per_page = 50

    total_records = db_connection(
        """
        SELECT COUNT(*)
        FROM Patients
        """,
        (),
        one_row=True
    )[0]

    total_pages = max(1,math.ceil(total_records / per_page))

    page = min(page, total_pages)

    offset = (page - 1) * per_page

    SQL_query_all_pacients_pages = '''

        SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
        DodsSubjectId, DodsBrokenClient
        FROM Patients
        JOIN Beds ON Beds.BedID = Patients.BedID
        JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
        JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
        JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
        JOIN Floors ON Floors.FloorID = Rooms.FloorID
        JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

        UNION ALL

        SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
        DodsSubjectId, DodsBrokenClient
        FROM Patients
        JOIN Beds ON Beds.BedID = Patients.BedID
        JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
        JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
        JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
        JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
        JOIN Floors ON Floors.FloorID = Rooms.FloorID
        JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

        UNION ALL

        SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
        DodsSubjectId, DodsBrokenClient
        FROM Patients
        LEFT JOIN Beds ON Beds.BedID = Patients.BedID
        LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
        LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
        LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
        LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
        LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
        WHERE Patients.BedID = -1
        ORDER BY Surname, Name
        LIMIT %s OFFSET %s;

    '''

    clients_per_page = db_connection(SQL_query_all_pacients_pages, (per_page, offset), one_row=False)

    return render_template(
                "clients_table_response.html",
                all_clients=clients_per_page,
                page=page,
                per_page=per_page,
                total_records=total_records,
                total_pages=total_pages,
                table_response=True,
            )

### Hromadné mazání ###

@admin_clients_bp.route("/delete-selected", methods=["POST"])
def delete_selected_clients():


    print(" /delete-selected function ")


    try:
        data = request.get_json(silent=True) or {}

        patient_ids = data.get("patient_ids", [])

        if not isinstance(patient_ids, list):
            return "Neplatný seznam klientů.", 400

        patient_ids = [
            int(patient_id)
            for patient_id in patient_ids
            if str(patient_id).isdigit()
        ]

        patient_ids = list(set(patient_ids))

        if len(patient_ids) < 2:
            return "Vyberte alespoň dva klienty.", 400

        placeholders = ",".join(
            ["%s"] * len(patient_ids)
        )

        SQL_query = f"""
            DELETE FROM Patients
            WHERE PatientID IN ({placeholders})
        """

        db_connection(
            SQL_query,
            tuple(patient_ids)
        )

        return render_clients_table()

    except Exception as error:

        current_app.logger.exception(
            "Chyba při hromadném mazání klientů: %s",
            error
        )

        return "Vybrané klienty se nepodařilo odstranit.", 500