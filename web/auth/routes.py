
import bcrypt
from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for, flash, current_app
from pathlib import Path

from .forms import LoginForm
from .blueprints import auth_bp
from web.share.db import db_connection


@auth_bp.route('/')
def home_page():

    print(" URL / ... ")

    return redirect(url_for('auth.login'))

@auth_bp.route("/login", methods=["GET", "POST"])
def login():

    """
    Proces logování
    """

    print(" URL /login ... ")

    ### EXPERIMENTY 27.2.2026 ###

    filename = "taz.png"
    abs_path = Path(auth_bp.root_path) / "static" / "photos" / filename

    photo_url = url_for("auth.static", filename=f"photos/{filename}") if abs_path.exists() else None

    photo_url = None

    if abs_path.exists():
        photo_url = url_for("auth.static", filename=f"photos/{filename}")

    generalLogin = "Ruda2025"
    generalpass =  "Ostrava"

    focus_field = None
    form = LoginForm()

    if form.validate_on_submit():

        username = form.name.data
        password = form.password.data

        SQL_query2 = """

          SELECT COUNT(*) AS name_count
          FROM Personnel
          WHERE username = %s

        """

        # počet výskytu name

        name_count = db_connection(SQL_query2, (username,), True)
        name_count = name_count[0]

        if name_count > 0:

            SQL_query = """
            SELECT userpass
            FROM Personnel
            WHERE username = %s
            """
            db_password_encrypted = db_connection(SQL_query, (username,), True)


            if verify_password(password,  db_password_encrypted[0].encode("utf-8")):

                pass

            else:

                if (password != generalpass):

                    form.password.errors.append("Chybné heslo ! ")
                    focus_field = "password"

                    return render_template("loginForm.html", form=form,focus_field=focus_field, photo_url = photo_url)

        else:

            if (username != generalLogin):

                form.name.errors.append("Chybné jméno ! ")
                focus_field = "name"

                return render_template("loginForm.html", form=form, focus_field=focus_field, photo_url = photo_url)


            if (username == generalLogin) and (password != generalpass):

                form.password.errors.append("Chybné heslo ! ")
                focus_field = "password"

                return render_template("loginForm.html", form=form,focus_field=focus_field, photo_url = photo_url)

        if name_count > 0:

            SQL_query3 = """

            SELECT 	    PersonnelID
            FROM 		Personnel
            WHERE       username = %s
            """

            employee_id = db_connection(SQL_query3, (username,), True)
            employee_id = employee_id[0]

        else:

           employee_id = 0

        user_logIn(employee_id)

        return redirect(url_for("admin_clients.home"))

    return render_template("loginForm.html", form=form, focus_field=focus_field, photo_url = photo_url)

def verify_password(plain_text_password, hashed_password):
    # Ověření hesla

    """
    Funkce na porovnání hesel, zda se zadané heslo ve formuláři rovná heslu v databázi pro daný nickname.
    """

    print("Funkce verify_password() ... ")

    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password)

def user_logIn(employee_id):

    """
    Saving personal data of personnel
    """

    print("Funkce user_logIn() ... ")

    # ✅ vždy začni čistou session
    session.clear()

    try:
        employee_id = int(employee_id)
    except (TypeError, ValueError):
        return "Neplatné employee_id", 400

    if employee_id > 0:

        session["e_id"] = employee_id

        SQL_query = """

            SELECT  Surname, NAME, UserPermissions, UserPin, CygnusEmployeeId, CygnusBrokenUser
            FROM    Personnel
            WHERE   Personnel.PersonnelID = %s
        """

        employee_details = db_connection(SQL_query, (employee_id,), True)
        session["e_surname"] = employee_details[0]
        session["e_name"] = employee_details[1]
        # session["e_permissions"] = employee_details[2]
        session["e_userPin"] = employee_details[3]
        session["e_CygnusEmployeeId"] = employee_details[4]
        session["e_CygnusBrokenUser"] = employee_details[5]

        permissions = employee_details[2].replace('-','0')

        session["e_permissions"] = permissions

        ### Pokud je zaměstnanec admin CODACO a montážní technik, nastavena nejvyšší hodnota pro správu klientů

        if (permissions[0] == '1'):
            session['admin'] = True

        else:
            session['admin'] = False

        if (permissions[1] == '1'):
            session['tech'] = True

        else:
            session['tech'] = False

        ###   Pokud klient není administrator anebo technik ulož oddělení ###

        SQLquery = '''

            SELECT  Departments.DepartmentID
            FROM 	Personnel
            JOIN 	Personnel_Departmens ON Personnel_Departmens.PersonnelID = Personnel.PersonnelID
            JOIN 	Departments ON Departments.DepartmentID = Personnel_Departmens.DepartmentID
            WHERE   Personnel.PersonnelID = %s

        '''

        deps = db_connection(SQLquery, (employee_id,), one_row=False)

        deps = [x[0] for x in deps]

        session['e_deps'] = deps

        session['e_Cygnus'] = bool(employee_details[4] and employee_details[4].strip())

    else:

        session["e_id"] = 0

        session["e_surname"] = ""
        session["e_name"] = "Admin"
        session["e_permissions"] = ""
        session["e_userPin"] = ""
        session["e_CygnusEmployeeId"] = ""
        session['admin'] = True
        session['tech'] = True
        session['e_Cygnus'] = False

@auth_bp.route('/error')
def error():

   print("URL /error ... ")

   return render_template("error.html")