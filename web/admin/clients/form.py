from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, HiddenField, SubmitField
from wtforms.validators import DataRequired, Length, Regexp

class ClientForm(FlaskForm):

    client_card_name = StringField(
        "Jméno",
        validators=[
            DataRequired(),
            Length(min=1, max=50),
            Regexp(
                r"^[A-Za-zÀ-ž '-]+$",
                message="Jméno obsahuje nepovolené znaky."
            )
        ]
    )

    client_card_surname = StringField(
        "Příjmení",
        validators=[
            DataRequired(),
            Length(min=1, max=50),
            Regexp(
                r"^[A-Za-zÀ-ž '-]+$",
                message="Příjmení obsahuje nepovolené znaky."
            )
        ]
    )

    # bed_id = HiddenField("BedID")
