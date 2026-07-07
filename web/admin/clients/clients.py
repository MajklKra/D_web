

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for

from .blueprints import admin_clients_bp
from ...version import __version__

from  web.share.s_print import s_print

@admin_clients_bp.route('/')
def clients():

    """
    První načtení stránky klientů.
    """

    s_print(f"URL: {request.url}", "green",0,0)
    s_print("function clients() started ...", "green",0,0)
    print("➡️ HX-Request header:", request.headers.get("HX-Request"))
    s_print("➡️ HX-Request header:", "blue",0,0)

    name = session.get('e_name')
    s_print(f"name: {name}", "blue",0,0)
    surname = session.get('e_surname')
    s_print(f"name: {surname}", "blue",0,0)

    # HTMX request? -> vrať jen obsah
    if request.headers.get("HX-Request"):
        s_print("🔹 Posílám JEN fragment:", "blue",1,1)
        return render_template("clients_fragment.html")

    s_print("🔹 Posílám CELOU stránku", "blue",1,1)
    return render_template("clients_full_page.html")