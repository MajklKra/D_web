
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, Regexp, AnyOf, ValidationError, EqualTo

class LoginForm(FlaskForm):
    name = StringField(
        "Přihlášovací jméno",
        validators=[
            DataRequired(message="Zadej jméno"),
            Length(min=3,message="Jméno musí mít nejméně 3 znaky.")
        ]
    )

    password = PasswordField(
        "Heslo",
        validators=[
            DataRequired(message="Zadej heslo"),
            Length(min=6, message="Heslo musí mít alespoň 6 znaků.")
        ]
    )

    language = SelectField(
    "Jazyk",
        choices=[
            ("", "Jazyk"),
            ("cs", "Čeština"),
            ("en", "English"),
            ("de", "Deutsch"),
        ],
        validators=[
            DataRequired(message="Vyber jazyk"),
            AnyOf(["cs", "en", "de"])
        ]
    )

    submit = SubmitField("Přihlásit")
