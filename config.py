# config.py

import os
import logging
from dotenv import load_dotenv
from logging.handlers import RotatingFileHandler
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

    ### Logování ###

    LOG_ENABLED = True

    ### Logging
    LOG_FILE = os.getenv("LOG_FILE", "app.log")
    LOG_LEVEL = logging.DEBUG
    LOG_FORMAT = "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
    LOG_DATEFMT = "%Y-%m-%d %H:%M:%S"


def setup_logging(config):

    if not config.get("LOG_ENABLED", False):
        logging.disable(logging.CRITICAL)
        return

    root = logging.getLogger()
    for h in list(root.handlers):
        root.removeHandler(h)

    log_dir = getattr(config, "LOG_DIR", "logs")
    os.makedirs(log_dir, exist_ok=True)

    # print(Fore.GREEN + f"[LOGGING] log_dir={log_dir}")
    # logging.info(f" \033[93m ### [LOGGING] log_dir={log_dir} ### \033[0m")

    # vymazat jen v reloader-child procesu (to je ten, co skutečně běží)
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true" or os.environ.get("FLASK_DEBUG") != "1":
        open(os.path.join(log_dir, "app.log"), "w", encoding="utf-8").close()
        open(os.path.join(log_dir, "performance.log"), "w", encoding="utf-8").close()

    mode = "a"

    default_formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(name)s - %(message)s")

    app_handler = RotatingFileHandler(
        os.path.join(log_dir, "app.log"),
        maxBytes=5_000_000,
        backupCount=3,
        encoding="utf-8",
        mode=mode,
    )
    app_handler.setLevel(logging.INFO)
    app_handler.setFormatter(default_formatter)

    # print(Fore.GREEN + "[LOGGING] app.log handler created")
    # logging.info(f" \033[93m ### [LOGGING] app.log handler created ### \033[0m")

    perf_handler = RotatingFileHandler(
        os.path.join(log_dir, "performance.log"),
        maxBytes=5_000_000,
        backupCount=3,
        encoding="utf-8",
        mode=mode,
    )
    perf_handler.setLevel(logging.INFO)
    perf_handler.setFormatter(default_formatter)

    # print(Fore.GREEN + "[LOGGING] performance.log handler created")
    # logging.info(f" \033[93m ### [LOGGING] performance.log handler created ### \033[0m")

    root.setLevel(logging.INFO)
    root.addHandler(app_handler)

    perf_logger = logging.getLogger("performance")
    perf_logger.setLevel(logging.INFO)
    perf_logger.addHandler(perf_handler)
    perf_logger.propagate = False

    # logging.getLogger("werkzeug").setLevel(logging.WARNING)
    # print(Fore.GREEN + "[LOGGING] werkzeug log level set to WARNING")
    # logging.info(f" \033[93m ### [LOGGING] werkzeug log level set to WARNING ### \033[0m")

def log_blank_line(logger_name: str = ""):
    """
    Zapíše čistý prázdný řádek do handlerů daného loggeru.
    logger_name="" znamená root logger (app.log).
    logger_name="performance" znamená performance.log.
    """
    logger = logging.getLogger(logger_name)
    for handler in logger.handlers:
        if hasattr(handler, "stream"):
            handler.stream.write("\n")
            handler.flush()