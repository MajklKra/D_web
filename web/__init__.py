from flask import Flask
from config import Config, setup_logging
from .version import __version__
from .auth.blueprints import auth_bp
from .admin.clients.blueprints import admin_clients_bp
from  web.share.s_print import s_print

def create_app():

    """
        Creates and configurates na instance of app
    """

    app = Flask(__name__)

    app.config.from_object(Config)  # přidáno

    setup_logging(app.config)

    s_print('Function create_app() ...', "blue",1,0)
    s_print(f"LOG_ENABLED: {app.config['LOG_ENABLED']}", "green", 1, 0)

    app.register_blueprint(auth_bp)
    s_print('bluprint registration -> auth_bp', "green",0,0)
    app.register_blueprint(admin_clients_bp)
    s_print('bluprint registration -> admin_clients_bp', "green",0,0)

    # app.config["APP_VERSION"] = __version__

    for rule in app.url_map.iter_rules():
        # print(rule, "->", rule.endpoint)
        s_print(f'{rule} -> {rule.endpoint}', "green",0,0)

    return app

