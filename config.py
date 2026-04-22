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


