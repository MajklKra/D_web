import platform
from flask import url_for, redirect
from web import create_app

app = create_app()

@app.route("/")
def index():

    print('ULR /')

    return redirect(url_for('auth.login'))

if __name__ == '__main__':

    system = platform.system()

    if system == "Windows":

        app.run(debug=True)

    elif system == "Linux":

        cert_path = '/home/codaco/web/certifikat/cert_codaco.crt'
        key_path = '/home/codaco/web/certifikat/cert_codaco.key'

        ssl_context = (cert_path, key_path)
        app.run(host="0.0.0.0", port=443, ssl_context=ssl_context, debug=False)

    else:

        app.run(host="0.0.0.0", port=443, ssl_context='adhoc', debug=True)


