
import logging
from colorama import Fore, Style, init
from config import Config
from config import log_blank_line



### Funkce zajistujici tisk  ###

def s_print(text, color, empty_rows_before, empty_rows_behind):

    log = Config.LOG_ENABLED

    if log:
        log_print(text, color, empty_rows_before, empty_rows_behind)

    match color:
        case "blue":

            if empty_rows_before != 0:
                emptyrowsbefore(empty_rows_before)

            print(Fore.BLUE + text)

            if empty_rows_behind != 0:
                emptyrowsbehind(empty_rows_behind)

        case "red":

            if empty_rows_before != 0:
                emptyrowsbefore(empty_rows_before)

            print(Fore.RED + text)

            if empty_rows_behind != 0:
                emptyrowsbehind(empty_rows_behind)

        case "yellow":

            if empty_rows_before != 0:
                emptyrowsbefore(empty_rows_before)

            print(Fore.YELLOW + text)

            if empty_rows_behind != 0:
                emptyrowsbehind(empty_rows_behind)

        case "white":

            if empty_rows_before != 0:
                emptyrowsbefore(empty_rows_before)

            print(Fore.WHITE + text)

            if empty_rows_behind != 0:
                emptyrowsbehind(empty_rows_behind)

        case "green":

            if empty_rows_before != 0:
                emptyrowsbefore(empty_rows_before)

            print(Fore.GREEN + text)

            if empty_rows_behind != 0:
                emptyrowsbehind(empty_rows_behind)



def emptyrowsbefore(rows_before):

    for i in range(rows_before):
        print()


def emptyrowsbehind(rows_behind):

    for i in range(rows_behind):
        print()


def log_print(text, color, empty_rows_before, empty_rows_behind):

    match color:
        case "blue":

            if empty_rows_before != 0:
                logsemptyrowsbefore(empty_rows_before)

            logging.info(f" \033[94m {text} \033[0m")

            if empty_rows_behind != 0:
                logsemptyrowsbehind(empty_rows_behind)

        case "red":

            if empty_rows_before != 0:
                logsemptyrowsbefore(empty_rows_before)

            logging.info(f" \033[91m {text} \033[0m")

            if empty_rows_behind != 0:
                logsemptyrowsbehind(empty_rows_behind)

        case "yellow":

            if empty_rows_before != 0:
                logsemptyrowsbefore(empty_rows_before)

            logging.info(f" \033[93m ### {text} ### \033[0m")

            if empty_rows_behind != 0:
                logsemptyrowsbehind(empty_rows_behind)

        case "white":

            if empty_rows_before != 0:
                logsemptyrowsbefore(empty_rows_before)

            logging.info(f" \033[97m {text} \033[0m")

            if empty_rows_behind != 0:
                logsemptyrowsbehind(empty_rows_behind)

        case "green":

            if empty_rows_before != 0:
                logsemptyrowsbefore(empty_rows_before)

            logging.info(f" \033[92m  {text} \033[0m")

            if empty_rows_behind != 0:
                logsemptyrowsbehind(empty_rows_behind)


def logsemptyrowsbefore(rows_before):

    for i in range(rows_before):
        log_blank_line()


def logsemptyrowsbehind(rows_behind):

    for i in range(rows_behind):
        log_blank_line()
