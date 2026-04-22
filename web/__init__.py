from flask import Flask
from config import Config
from .version import __version__
from .auth.blueprints import auth_bp
from .admin.clients.blueprints import admin_clients_bp

def create_app():

    print('funkce create_app() ...')

    app = Flask(__name__)

    app.config.from_object(Config)  # přidáno

    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_clients_bp)

    # app.config["APP_VERSION"] = __version__

    for rule in app.url_map.iter_rules():
        print(rule, "->", rule.endpoint)

    return app

