from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

class AddCommentForm(FlaskForm):
    content = StringField("content", validators=[DataRequired()])
    created_at = StringField("Created At")
    updated_at = StringField("Updated At")
