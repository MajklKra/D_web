

from flask import Blueprint, request, session, render_template, redirect, jsonify, json, url_for

from .blueprints import admin_clients_bp
from ...version import __version__

from  web.share.s_print import s_print

@admin_clients_bp.route('/')

def clients():

    """
        První načtení stránky klientů.
    """

    return render_template("clients_full_page.html")