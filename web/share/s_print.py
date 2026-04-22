
from colorama import Fore, Style, init



### Funkce zajistujici tisk  ###

def s_print(text, color, empty_rows_before, empty_rows_behind):

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