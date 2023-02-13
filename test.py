from app.models import db
from app.models.user import User
from app.models.friends import friends
from app import app
# from flask_sqlalchemy import inspect

with app.app_context():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    print(user1)
    user1.friends.append(user2)


    db.session.commit()
    print([friend.first_name for friend in user1.friends])
