import platform
import os
from flask import url_for, redirect
from web import create_app
from web.share.s_print import s_print
from config import Config

app = create_app()

@app.route("/")
def index():

    print('ULR /')

    return redirect(url_for('auth.login'))

if __name__ == '__main__':

    system = platform.system()

    if system == "Windows":

        # print(Fore.GREEN + "[RUN] OS Windows")
        s_print("[RUN] OS Windows", "green",1,0)

        # print(Fore.GREEN + f"[RUN] Starting Flask server pid={os.getpid()}")
        s_print(f"[RUN] Starting Flask server pid={os.getpid()}", "green",0,0)

        # print(Fore.GREEN + "[RUN] debug=True")
        s_print("[RUN] debug=True", "green",0,0)

        app.run(debug=True)

    elif system == "Linux":

        app.config.from_object("config.Config")

       # cert_path = '/home/codaco/web/certifikat/cert_codaco.crt'
        # key_path = '/home/codaco/web/certifikat/cert_codaco.key'
        # ssl_context = (cert_path, key_path)

        s_print("[RUN] OS Linux", "green",1,0)
        s_print(f"[RUN] Starting Flask server pid={os.getpid()}", "green",0,0)
        s_print(f"[RUN] host={Config.HOST_LINUX} port={Config.PORT_LINUX} debug=False ssl_context=ssl_context", "green",0,0)
        s_print("certificates in use", "green",0,0)
        s_print(f"{app.config["CERT_PATH"]}", "green",0,0)
        s_print(f"{app.config["KEY_PATH"]}", "green",0,0)

        ssl_context = (app.config["CERT_PATH"],app.config["KEY_PATH"])

        # app.run(host="0.0.0.0", port=443, ssl_context=ssl_context, debug=False)

        app.run(host=Config.HOST_LINUX, port=Config.PORT_LINUX, ssl_context=ssl_context, debug=False )

    else:

        app.run(host="0.0.0.0", port=443, ssl_context='adhoc', debug=True)


