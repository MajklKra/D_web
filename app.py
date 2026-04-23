import platform
import os
from flask import url_for, redirect
from web import create_app
from web.share.s_print import s_print
from config import Config

app = create_app()

@app.route("/")
def index():

    s_print("URL / ", "blue",1,1)

    return redirect(url_for('auth.login'))

if __name__ == '__main__':

    system = platform.system()

    if system == "Windows":

        s_print("[RUN] OS Windows", "green",1,0)
        s_print(f"[RUN] Starting Flask server pid={os.getpid()}", "green",0,0)
        s_print("[RUN] debug=True", "green",0,0)

        app.run(debug=True)

    elif system == "Linux":

        app.config.from_object("config.Config")

        s_print("[RUN] OS Linux", "green",1,0)
        s_print(f"[RUN] Starting Flask server pid={os.getpid()}", "green",0,0)
        s_print(f"[RUN] host={Config.HOST_LINUX} port={Config.PORT_LINUX} debug=False ssl_context=ssl_context", "green",0,0)
        s_print("certificates in use", "green",0,0)
        s_print(f"{app.config["CERT_PATH"]}", "green",0,0)
        s_print(f"{app.config["KEY_PATH"]}", "green",0,0)

        ssl_context = (app.config["CERT_PATH"],app.config["KEY_PATH"])

        app.run(host=Config.HOST_LINUX, port=Config.PORT_LINUX, ssl_context=ssl_context, debug=False )

    else:

        app.run(host="0.0.0.0", port=443, ssl_context='adhoc', debug=True)


