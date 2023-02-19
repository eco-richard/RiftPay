from flask_wtf import FlaskForm
from flask_login import current_user
import wtforms as wtf
from wtforms.validators import DataRequired
from app.models import Transaction

class TransactionForm(FlaskForm):
    cost = wtf.DecimalField("Cost", validators=[DataRequired()])
    creation_method = wtf.SelectField("Creation Method",
        choices=["Equal", "Unequal", "Payment"],
        validators=[DataRequired()]
    )
    description = wtf.StringField("Description", validators=[DataRequired()])
    note = wtf.StringField("Note")
    image = wtf.StringField("Image")
    created_at = wtf.StringField("Created At", validators=[DataRequired()])
    updated_at = wtf.StringField("Updated At")
    payers = wtf.StringField("Payers", validators=[DataRequired()])
    repayments = wtf.StringField("Repayments", validators=[DataRequired()])
