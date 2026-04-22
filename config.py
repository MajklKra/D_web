# config.py

import os
from dotenv import load_dotenv
from web.version import __version__

load_dotenv()

class Config:

    # -- Secret key --
    SECRET_KEY = os.getenv("SECRET_KEY")  # bez fallbacku, pokud chceš tvrdou kontrolu

    if not SECRET_KEY:
        raise RuntimeError("SECRET_KEY musí být nastavený v env!")

    # -- Verze aplikace --

    APP_VERSION = __version__

    # -- Certifikáty --
    CERT_PATH = os.getenv("CERT_PATH")
    KEY_PATH = os.getenv("KEY_PATH")

    if not CERT_PATH or not KEY_PATH:
        raise RuntimeError("CERT_PATH a KEY_PATH musí být nastavené v env!")


    # Linux nastavení

    HOST_LINUX = os.getenv("HOST_LINUX")
    PORT_LINUX = int(os.getenv("PORT_LINUX", 443))


