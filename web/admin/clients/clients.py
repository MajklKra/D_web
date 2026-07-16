
from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for, current_app

from .blueprints import admin_clients_bp

from ...version import __version__

from vokativ import vokativ

import math
from math import ceil

from  web.share.s_print import s_print
from  web.share.db import db_connection, sqliteDB

# # # # # # # # # # # # # # # # # # #
#   Defaultní vykreslení /clients   #
# # # # # # # # # # # # # # # # # # #

# @admin_clients_bp.route('/')
# def clients():

    # """
    # První načtení stránky klientů.
    # """
    # s_print(f"URL: {request.url}", "green",0,0)
    # s_print("function clients() started ...", "green",0,0)
    # print("➡️ HX-Request header:", request.headers.get("HX-Request"))
    # s_print("➡️ HX-Request header:", "blue",0,0)

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # #  SQL_dotaz na všechny dostupné klienty podle oddělení #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # e_id = session.get("e_id")
    # tech = session.get("tech")
    # admin = session.get("admin")

    # if e_id > 0:
    #    e_deps = session.get("e_deps")

    # if e_id == 0 or tech == True or admin == True:

    #     page = request.args.get("page", 1, type=int)
    #     partial = request.args.get("partial")
    #     per_page = 50
    #     offset = (page - 1) * per_page
    #     total_records = db_connection(
    #         """
    #             SELECT COUNT(*)
    #             FROM Patients
    #         """,
    #         one_row=True)[0]
    #     total_pages = ceil(total_records / per_page)

    #     SQL_query_all_pacients_pages = '''

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
    #         JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         LEFT JOIN Beds ON Beds.BedID = Patients.BedID
    #         LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Patients.BedID = -1
    #         ORDER BY Surname, Name
    #         LIMIT %s OFFSET %s;

    #     '''
    #     SQL_query_all_pacients = '''

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
    #         JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         LEFT JOIN Beds ON Beds.BedID = Patients.BedID
    #         LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Patients.BedID = -1
    #         ORDER BY Surname, Name
    #     '''

    #     clients_per_page = db_connection(SQL_query_all_pacients_pages, (per_page, offset), one_row=False)
    #     clients_all_pacients = db_connection( SQL_query_all_pacients, (), one_row=False)

    #     clients_ids = [row[0] for row in clients_all_pacients]
    #     session["filtered_patient_ids"] = clients_ids

    # else:

    #     page = request.args.get("page", 1, type=int)
    #     partial = request.args.get("partial")
    #     per_page = 50
    #     offset = (page - 1) * per_page

    #     placeholders = ",".join(["%s"] * len(e_deps))

    #     SQL_query_deps_pages = f"""
    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Departments.DepartmentID IN ({placeholders})

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
    #         JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Departments.DepartmentID IN ({placeholders})

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         LEFT JOIN Beds ON Beds.BedID = Patients.BedID
    #         LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Patients.BedID = -1

    #         ORDER BY Surname, Name
    #         LIMIT %s OFFSET %s
    #     """
    #     params = tuple(e_deps) + tuple(e_deps) + (per_page, offset)

    #     SQL_query_deps = f"""

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Departments.DepartmentID IN ({placeholders})

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         JOIN Beds ON Beds.BedID = Patients.BedID
    #         JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
    #         JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
    #         JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
    #         JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Departments.DepartmentID IN ({placeholders})

    #         UNION ALL

    #         SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
    #         DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
    #         FROM Patients
    #         LEFT JOIN Beds ON Beds.BedID = Patients.BedID
    #         LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
    #         LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
    #         LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
    #         LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
    #         LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
    #         WHERE Patients.BedID = -1

    #         ORDER BY Surname, Name

    #     """

    #     params2 = tuple(e_deps) + tuple(e_deps)

    #     clients_per_page = db_connection(SQL_query_deps_pages,params,one_row=False)
    #     clients = db_connection(SQL_query_deps,params2,one_row=False)

    #     clients_ids = [row[0] for row in clients]
    #     session["filtered_patient_ids"] = clients_ids

    #     total_records =  len(clients_ids)
    #     total_pages = ceil(total_records / per_page)

    # print(" Výsledek SQL dotazů result_all_pacients delivered !!! ")

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    # #                   KONEC SQL DOTAZU                    #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    # view_data = default_data()

    # # HTMX stránkování – vrátí pouze tabulku a stránkování
    # if partial == "table":

    #     s_print("🔹 Posílám pouze tabulku:", "blue", 1, 1)

    #     return render_template(
    #         "clients_table_response.html",
    #         all_clients=clients_per_page,
    #         page=page,
    #         per_page=per_page,
    #         total_records=total_records,
    #         total_pages=total_pages,
    #         table_response=True,
    #     )

    # # Jiný HTMX požadavek – vrátí celý obsah stránky klientů
    # if request.headers.get("HX-Request"):

    #     s_print("🔹 Posílám clients_fragment:", "blue", 1, 1)

    #     return render_template(
    #         "clients_fragment.html",
    #         data=view_data,
    #         all_clients=clients_per_page,
    #         page=page,
    #         per_page=per_page,
    #         total_records=total_records,
    #         total_pages=total_pages,
    #         table_response=False,
    #     )

    # # Normální načtení celé stránky
    # s_print("🔹 Posílám CELOU stránku", "blue", 1, 1)

    # return render_template(
    #     "clients_full_page.html",
    #     data=view_data,
    #     all_clients=clients_per_page,
    #     page=page,
    #     per_page=per_page,
    #     total_records=total_records,
    #     total_pages=total_pages,
    #     table_response=False,
    # )

@admin_clients_bp.route('/')
def clients():

    """
    První načtení stránky klientů a HTMX stránkování.
    Všechna tabulková data získává přes loading_data().
    """

    s_print(f"URL: {request.url}", "green", 0, 0)
    s_print("function clients() started ...", "green", 0, 0)

    print("➡️ HX-Request:", request.headers.get("HX-Request"))

    # Výchozí filtry musí existovat ještě před prvním
    # zavoláním loading_data().
    # # session.setdefault("search", "")
    # # session.setdefault("SB1", "all")
    # # session.setdefault("SB2", "all")
    # # session.setdefault("SB3", "all")
    # # session.setdefault("SB4", "all")

    # nastav výchozí filtry.
    if not request.headers.get("HX-Request"):
        session["search"] = ""
        session["SB1"] = "all"
        session["SB2"] = "all"
        session["SB3"] = "all"
        session["SB4"] = "all"

    # Jediný společný zdroj dat pro tabulku.
    table_data = loading_data()

    clients_per_page = table_data["clients_per_page"]
    page = table_data["page"]
    per_page = table_data["per_page"]
    total_records = table_data["total_records"]
    total_pages = table_data["total_pages"]

    partial = request.args.get("partial")

    # HTMX stránkování:
    # vrátíme pouze tabulku a stránkování.
    if partial == "table":

        s_print("🔹 Posílám pouze tabulku a stránkování","blue",1,1)

        return render_template(
            "clients_table_response.html",
            all_clients=clients_per_page,
            page=page,
            per_page=per_page,
            total_records=total_records,
            total_pages=total_pages,
            table_response=True,
        )

    # Data potřebná pro zbytek stránky.
    view_data = default_data()

    # Pokud jde o normální načtení stránky (F5),

    # Načtení stránky klientů přes HTMX.
    if request.headers.get("HX-Request"):

        s_print("🔹 Posílám clients_fragment","blue",1,1)

        return render_template(
            "clients_fragment.html",
            data=view_data,
            all_clients=clients_per_page,
            page=page,
            per_page=per_page,
            total_records=total_records,
            total_pages=total_pages,
            table_response=False,
        )

    # Klasické otevření celé stránky v prohlížeči.
    s_print("🔹 Posílám celou stránku klientů","blue",1,1)

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

# # # # # # # # # # # # # # # # # # # #
#     Informace o všech klientech     #
# # # # # # # # # # # # # # # # # # # #

@admin_clients_bp.route("/api/all-patient-ids")
def all_patient_ids():

    patient_ids = session.get(
        "filtered_patient_ids",
        []
    )

    return jsonify({
        "patient_ids": patient_ids,
        "count": len(patient_ids)
    })

# # # # # # # # # # # # # #
#     Mazaní klienta      #
# # # # # # # # # # # # # #

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

# # # # # # # # # # # # # #
#   Vykreslení tabulky    #
# # # # # # # # # # # # # #

def render_clients_table():

    print(" render_clients_table() started ...  ")

    data=loading_data()

    clients_per_page = data["clients_per_page"]
    page = data["page"]
    per_page = data["per_page"]
    total_records = data["total_records"]
    total_pages = data["total_pages"]

    # return render_template("clients_table_response.html",all_clients=clients_per_page,page=page,per_page=per_page,total_records=total_records,total_pages=total_pages,table_response=True,)

    return render_template("clients_table_response.html",all_clients=clients_per_page,page=page,per_page=per_page,total_records=total_records,total_pages=total_pages,table_response=True,)


# # # # # # # # # # # #
#   Hromadné mazání   #
# # # # # # # # # # # #

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

        # current_app.logger.exception(
        #     "Chyba při hromadném mazání klientů: %s",
        #     error
        # )

        s_print(f"Chyba při hromadném mazání klientů: ({error})", "red",0,1)

        return "Vybrané klienty se nepodařilo odstranit.", 500

@admin_clients_bp.route("/current_data", methods=["POST"])
def current_data():

    print("Hello Mate, you have just reached the /current_data function ... ")

    data = request.get_json(silent=True) or {}

    search = str(data.get("search", "")).strip()
    clients_filter = str(data.get("clients", "all")).strip()
    department = str(data.get("department", "all")).strip()
    building = str(data.get("building", "all")).strip()
    source = str(data.get("source", "all")).strip()

    print("Vyhledávání:", search)
    print("Klienti:", clients_filter)
    print("Oddělení:", department)
    print("Budova:", building)
    print("Zdroj:", source)

    session["search"] = search
    session["SB1"] = clients_filter
    session["SB2"] = department
    session["SB3"] = building
    session["SB4"] = source

    # return jsonify({
    #     "success": True,
    #     "filters": {
    #         "search": search,
    #         "clients": clients_filter,
    #         "department": department,
    #         "building": building,
    #         "source": source
    #     }
    # })

    return render_clients_table()

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                       #
#  Načtení defaultních dat pro první otevření stránky / #
#                                                       #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

def default_data():

    """
    Data pro první načtení stránky "/"
    """

    s_print("function clients() started ...", "blue",0,0)

    ### Data supply ###

    salutation = session.get('e_name')
    salutation = vokativ(salutation).capitalize()

    s_print(salutation, "white",0,0)

    name = session.get('e_name')

    s_print(name, "white",0,0)

    surname = session.get('e_surname')

    s_print(surname, "white",0,1)

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

    ###  Úvodní SQL dotaz ###

    # # # # # # # # # # # # # # # # # # #
    #                                   #
    #  SQL dotaz seznam oddělení + IDs  #
    #                                   #
    # # # # # # # # # # # # # # # # # # #


    SQL_departments = '''

    SELECT      DepartmentID, Name
    FROM        Departments
    ORDER BY    Name

    '''

    result_departments = db_connection(SQL_departments, (), one_row=False)


    # # # # # # # # # # # # # # # # # # #
    #                                   #
    #  SQL dotaz seznam budov + IDs  #
    #                                   #
    # # # # # # # # # # # # # # # # # # #


    SQL_buildings = '''

    SELECT 	    BuildingID, Name
    FROM 		Buildings
    ORDER BY    Name

    '''

    result_buildings = db_connection(SQL_buildings, (), one_row=False)

    # # # # # # # # # # # # # # # # # # #
    #                                   #
    #  Konec SQL dotazu                 #
    #                                   #
    # # # # # # # # # # # # # # # # # # #

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
        "departments": result_departments,
        "buildings" : result_buildings,
        "e_deps" : deps,


        # Aktuální hodnoty filtrů
        "search": session.get("search", ""),
        "clients_filter": session.get("SB1", "all"),
        "department_filter": session.get("SB2", "all"),
        "building_filter": session.get("SB3", "all"),
        "source_filter": session.get("SB4", "all"),
    }

    return view_data

# # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                       #
#        Funkce pro načtení požadovaných dat            #
#        SQL queries                                    #
#                                                       #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# def loading_data():

#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     #  SQL_dotaz na všechny dostupné klienty podle oddělení #
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

#     e_id = session.get("e_id")
#     tech = session.get("tech")
#     admin = session.get("admin")

#     search = session.get("search")
#     accomodated = session.get("SB1")
#     department = session.get("SB2")
#     building = session.get("SB3")
#     source = session.get("SB4")

#     if e_id > 0:
#        e_deps = session.get("e_deps")

#     if e_id == 0 or tech == True or admin == True:

#         page = request.args.get("page", 1, type=int)
#         partial = request.args.get("partial")
#         per_page = 50
#         offset = (page - 1) * per_page
#         total_records = db_connection(
#             """
#                 SELECT COUNT(*)
#                 FROM Patients
#             """,
#             one_row=True)[0]
#         total_pages = ceil(total_records / per_page)

#         SQL_query_all_pacients_pages = '''

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
#             JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
#             FROM Patients
#             LEFT JOIN Beds ON Beds.BedID = Patients.BedID
#             LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Patients.BedID = -1
#             ORDER BY Surname, Name
#             LIMIT %s OFFSET %s;

#         '''
#         SQL_query_all_pacients = '''

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
#             JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient
#             FROM Patients
#             LEFT JOIN Beds ON Beds.BedID = Patients.BedID
#             LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Patients.BedID = -1
#             ORDER BY Surname, Name
#         '''

#         clients_per_page = db_connection(SQL_query_all_pacients_pages, (per_page, offset), one_row=False)
#         clients_all_pacients = db_connection( SQL_query_all_pacients, (), one_row=False)

#         clients_ids = [row[0] for row in clients_all_pacients]
#         session["filtered_patient_ids"] = clients_ids

#     else:

#         page = request.args.get("page", 1, type=int)
#         partial = request.args.get("partial")
#         per_page = 50
#         offset = (page - 1) * per_page

#         placeholders = ",".join(["%s"] * len(e_deps))

#         SQL_query_deps_pages = f"""
#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Departments.DepartmentID IN ({placeholders})

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
#             JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Departments.DepartmentID IN ({placeholders})

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
#             FROM Patients
#             LEFT JOIN Beds ON Beds.BedID = Patients.BedID
#             LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Patients.BedID = -1

#             ORDER BY Surname, Name
#             LIMIT %s OFFSET %s
#         """
#         params = tuple(e_deps) + tuple(e_deps) + (per_page, offset)

#         SQL_query_deps = f"""
#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Departments.DepartmentID IN ({placeholders})

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient
#             FROM Patients
#             JOIN Beds ON Beds.BedID = Patients.BedID
#             JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
#             JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
#             JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
#             JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Departments.DepartmentID IN ({placeholders})

#             UNION ALL

#             SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
#             DodsSubjectId, DodsBrokenClient
#             FROM Patients
#             LEFT JOIN Beds ON Beds.BedID = Patients.BedID
#             LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
#             LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
#             LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
#             LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
#             LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
#             WHERE Patients.BedID = -1

#             ORDER BY Surname, Name
#         """

#         params2 = tuple(e_deps) + tuple(e_deps)

#         clients_per_page = db_connection(SQL_query_deps_pages,params,one_row=False)
#         clients = db_connection(SQL_query_deps,params2,one_row=False)

#         clients_ids = [row[0] for row in clients]
#         session["filtered_patient_ids"] = clients_ids

#         total_records =  len(clients_ids)
#         total_pages = ceil(total_records / per_page)

#     print(" Výsledek SQL dotazů result_all_pacients delivered !!! ")

#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#     #                   KONEC SQL DOTAZU                    #
#     # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

#     loading_data = {
#         "clients_per_page":clients_per_page,
#         "clients_ids":clients_ids,
#         "page":page,
#         "per_page":per_page,
#         "total_records":total_records,
#         "total_pages":total_pages,
#     }

#     return loading_data



# def loading_data():

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #  SQL_dotaz na všechny dostupné klienty podle oddělení #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    e_id = session.get("e_id")
    tech = session.get("tech")
    admin = session.get("admin")

    search = session.get("search")
    accomodated = session.get("SB1")
    department = session.get("SB2")
    building = session.get("SB3")
    source = session.get("SB4")

    option1 = False
    option2 = False
    option3 = False

    if e_id > 0:
       e_deps = session.get("e_deps")

    if accomodated == "without-bed":
       option3 = True

    elif e_id == 0 or tech == True or admin == True:
       option1 = True

    elif e_id > 0 or tech != True or admin != True:
       option2 = True



    # Varianta 1 - všichni klienti v databázi
    # if e_id == 0 or tech == True or admin == True:

    if option1:

        SQL_query_all_pacients_pages = '''

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
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
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
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


    # Varianta2 - moji klienti + klienti bez postelí
    # elif e_id > 0 or tech != True or admin != True:
    elif option2:

        SQL_query_deps_pages = f"""
            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Departments.DepartmentID IN ({placeholders})

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
            JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Departments.DepartmentID IN ({placeholders})

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1

            ORDER BY Surname, Name;

        """

    # Varianta3 - jen klienti bez postele
    elif option3:

        page = request.args.get("page", 1, type=int)
        partial = request.args.get("partial")
        per_page = 50
        offset = (page - 1) * per_page

        ### SQL dotaz číslo 1 ###

        search = search.strip()

        search_like = f"%{search}%"

        SQL_query_withoutbeds_pages = '''

            SELECT PatientID, Surname, Patients.Name, Buildings.Name AS Building, Departments.Name AS Department, Rooms.RoomNumber, Beds.BedNumber, CygnusClientId, CygnusBrokenClient, DodsSubjectId,
            DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1 AND CONCAT_WS(' ', Surname, Patients.Name) LIKE %s
        '''

        params = [search_like]

        if source == "cygnus":
            SQL_query_withoutbeds_pages += """
            AND CygnusClientId IS NOT NULL
            AND CygnusBrokenClient = 0
            """

        elif source == "dods":
            SQL_query_withoutbeds_pages += """
                AND DodsSubjectId IS NOT NULL
                AND DodsBrokenClient = 0
            """

        elif source == "all":
            SQL_query_withoutbeds_pages += """
                AND (
                    (CygnusClientId IS NOT NULL AND CygnusBrokenClient = 0)
                    OR
                    (DodsSubjectId IS NOT NULL AND DodsBrokenClient = 0)
                )
            """

        SQL_query_withoutbeds_pages += """
        ORDER BY Surname, Patients.Name
        LIMIT %s OFFSET %s
        """

        params.extend([per_page, offset])
        clients_per_page = db_connection(SQL_query_withoutbeds_pages,tuple(params), one_row=False)

        SQL_query_withoutbeds = '''

            SELECT PatientID, Surname, Patients.Name, Buildings.Name AS Building, Departments.Name AS Department, Rooms.RoomNumber, Beds.BedNumber, CygnusClientId, CygnusBrokenClient, DodsSubjectId,
            DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1 AND CONCAT_WS(' ', Surname, Patients.Name) LIKE %s
        '''

        params = [search_like]

        if source == "cygnus":
            SQL_query_withoutbeds += """
            AND CygnusClientId IS NOT NULL
            AND CygnusBrokenClient = 0
            """

        elif source == "dods":
            SQL_query_withoutbeds += """
                AND DodsSubjectId IS NOT NULL
                AND DodsBrokenClient = 0
            """

        elif source == "all":
            SQL_query_withoutbeds += """
                AND (
                    (CygnusClientId IS NOT NULL AND CygnusBrokenClient = 0)
                    OR
                    (DodsSubjectId IS NOT NULL AND DodsBrokenClient = 0)
                )
            """

        SQL_query_withoutbeds += """
        ORDER BY Surname, Patients.Name
        """

        clients = db_connection(SQL_query_withoutbeds,tuple(params), one_row=False)

        clients_ids = [row[0] for row in clients]
        session["filtered_patient_ids"] = clients_ids

        total_records =  len(clients_ids)
        total_pages = ceil(total_records / per_page)

    print(" Výsledek SQL dotazů result_all_pacients delivered !!! ")

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                   KONEC SQL DOTAZU                    #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    loading_data = {
        "clients_per_page":clients_per_page,
        "clients_ids":clients_ids,
        "page":page,
        "per_page":per_page,
        "total_records":total_records,
        "total_pages":total_pages,
    }

    return loading_data


def loading_data():

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #  SQL_dotaz na všechny dostupné klienty podle oddělení #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

    e_id = session.get("e_id")
    tech = session.get("tech")
    admin = session.get("admin")

    search = session.get("search")
    accomodated = session.get("SB1")
    department = session.get("SB2")
    building = session.get("SB3")
    source = session.get("SB4")

    if e_id > 0:
       e_deps = session.get("e_deps")

    option1 = False
    option2 = False
    option3 = False

    if e_id > 0:
       e_deps = session.get("e_deps")

    if accomodated == "without-bed":
       option3 = True

    elif e_id == 0 or tech == True or admin == True:
       option1 = True

    elif e_id > 0 or tech != True or admin != True:
       option2 = True


    # Varianta 1 - všichni klienti v databázi
    # if e_id == 0 or tech == True or admin == True

    if option1:

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
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
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
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
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
        SQL_query_all_pacients = '''

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
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
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1
            ORDER BY Surname, Name
        '''

        clients_per_page = db_connection(SQL_query_all_pacients_pages, (per_page, offset), one_row=False)
        clients_all_pacients = db_connection( SQL_query_all_pacients, (), one_row=False)

        clients_ids = [row[0] for row in clients_all_pacients]
        session["filtered_patient_ids"] = clients_ids


        loading_data = {
            "clients_per_page":clients_per_page,
            "clients_ids":clients_ids,
            "page":page,
            "per_page":per_page,
            "total_records":total_records,
            "total_pages":total_pages,
        }

    # Varianta2 - moji klienti + klienti bez postelí
    # elif e_id > 0 or tech != True or admin != True:
    elif option2:

        page = request.args.get("page", 1, type=int)
        partial = request.args.get("partial")
        per_page = 50
        offset = (page - 1) * per_page

        placeholders = ",".join(["%s"] * len(e_deps))

        SQL_query_deps_pages = f"""
            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Departments.DepartmentID IN ({placeholders})

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
            JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Departments.DepartmentID IN ({placeholders})

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1

            ORDER BY Surname, Name
            LIMIT %s OFFSET %s
        """
        params = tuple(e_deps) + tuple(e_deps) + (per_page, offset)

        SQL_query_deps = f"""

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Departments.DepartmentID IN ({placeholders})

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            JOIN Beds ON Beds.BedID = Patients.BedID
            JOIN SubRooms ON SubRooms.SubRoomID = Beds.SubRoomID
            JOIN Rooms ON Rooms.RoomID = SubRooms.RoomID
            JOIN Departments_Rooms ON Departments_Rooms.RoomID = Rooms.RoomID
            JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            JOIN Floors ON Floors.FloorID = Rooms.FloorID
            JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Departments.DepartmentID IN ({placeholders})

            UNION ALL

            SELECT PatientID, Surname, Buildings.`Name` AS Building, Patients.NAME, Departments.`Name` AS Department, Rooms.RoomNumber , Beds.BedNumber, CygnusClientId, CygnusBrokenClient,
            DodsSubjectId, DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1

            ORDER BY Surname, Name

        """

        params2 = tuple(e_deps) + tuple(e_deps)

        clients_per_page = db_connection(SQL_query_deps_pages,params,one_row=False)
        clients = db_connection(SQL_query_deps,params2,one_row=False)

        clients_ids = [row[0] for row in clients]
        session["filtered_patient_ids"] = clients_ids

        total_records =  len(clients_ids)
        total_pages = ceil(total_records / per_page)


        loading_data = {
            "clients_per_page":clients_per_page,
            "clients_ids":clients_ids,
            "page":page,
            "per_page":per_page,
            "total_records":total_records,
            "total_pages":total_pages,
        }

    # Varianta3 - klienti bez postelí.
    elif option3:

        page = request.args.get("page", 1, type=int)
        partial = request.args.get("partial")
        per_page = 50
        offset = (page - 1) * per_page

        ### SQL dotaz číslo 1 ###

        search = search.strip()

        search_like = f"%{search}%"

        SQL_query_withoutbeds_pages = '''

            SELECT PatientID, Surname, Buildings.Name AS Building, Patients.Name, Departments.Name AS Department, Rooms.RoomNumber, Beds.BedNumber, CygnusClientId, CygnusBrokenClient, DodsSubjectId,
            DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1 AND CONCAT_WS(' ', Surname, Patients.Name) LIKE %s
        '''

        params = [search_like]

        if source == "Cygnus":
            SQL_query_withoutbeds_pages += """
            AND CygnusClientId IS NOT NULL
            AND CygnusBrokenClient = 0
            """

        elif source == "Dods":
            SQL_query_withoutbeds_pages += """
                AND DodsSubjectId IS NOT NULL
                AND DodsBrokenClient = 0
            """

        # elif source == "all":
        #     SQL_query_withoutbeds_pages += """
        #         AND (
        #             (CygnusClientId IS NOT NULL AND CygnusBrokenClient = 0)
        #             OR
        #             (DodsSubjectId IS NOT NULL AND DodsBrokenClient = 0)
        #         )
        #     """

        SQL_query_withoutbeds_pages += """
        ORDER BY Surname, Patients.Name
        LIMIT %s OFFSET %s
        """

        params.extend([per_page, offset])
        clients_per_page = db_connection(SQL_query_withoutbeds_pages,tuple(params), one_row=False)

        SQL_query_withoutbeds = '''

            SELECT PatientID, Surname, Buildings.Name AS Building, Patients.Name, Departments.Name AS Department, Rooms.RoomNumber, Beds.BedNumber, CygnusClientId, CygnusBrokenClient, DodsSubjectId,
            DodsBrokenClient, Buildings.BuildingID, Departments.DepartmentID
            FROM Patients
            LEFT JOIN Beds ON Beds.BedID = Patients.BedID
            LEFT JOIN Departments_Rooms ON Departments_Rooms.RoomID = Beds.RoomID
            LEFT JOIN Departments ON Departments.DepartmentID = Departments_Rooms.DepartmentID
            LEFT JOIN Rooms ON Rooms.RoomID = Departments_Rooms.RoomID
            LEFT JOIN Floors ON Floors.FloorID = Rooms.FloorID
            LEFT JOIN Buildings ON Buildings.BuildingID = Floors.BuildingID
            WHERE Patients.BedID = -1 AND CONCAT_WS(' ', Surname, Patients.Name) LIKE %s
        '''

        params = [search_like]

        if source == "Cygnus":
            SQL_query_withoutbeds += """
            AND CygnusClientId IS NOT NULL
            AND CygnusBrokenClient = 0
            """

        elif source == "Dods":
            SQL_query_withoutbeds += """
                AND DodsSubjectId IS NOT NULL
                AND DodsBrokenClient = 0
            """

        # elif source == "all":
        #     SQL_query_withoutbeds += """
        #         AND (
        #             (CygnusClientId IS NOT NULL AND CygnusBrokenClient = 0)
        #             OR
        #             (DodsSubjectId IS NOT NULL AND DodsBrokenClient = 0)
        #         )
        #     """

        SQL_query_withoutbeds += """
        ORDER BY Surname, Patients.Name
        """

        clients = db_connection(SQL_query_withoutbeds,tuple(params), one_row=False)

        clients_ids = [row[0] for row in clients]
        session["filtered_patient_ids"] = clients_ids

        total_records =  len(clients_ids)
        total_pages = ceil(total_records / per_page)

        print(" Výsledek SQL dotazů result_all_pacients delivered !!! ")

        # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
        #                   KONEC SQL DOTAZU                    #
        # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

        loading_data = {
            "clients_per_page":clients_per_page,
            "clients_ids":clients_ids,
            "page":page,
            "per_page":per_page,
            "total_records":total_records,
            "total_pages":total_pages,
        }

    return loading_data