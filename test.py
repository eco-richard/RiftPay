from app.models import User

from app import app
# from flask_sqlalchemy import inspect

with app.app_context():
    user1 = User.query.get(1)

    user1.user_friends()