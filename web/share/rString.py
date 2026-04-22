
# ************************  Funkce na generování PatienUniqueID ************************************

import string
import secrets

def generuj_user_unique_id(length=100):
    chars = string.ascii_letters + string.digits + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    return ''.join(secrets.choice(chars) for _ in range(length))

