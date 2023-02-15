from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

friend_routes = Blueprint('friends', __name__)


@friend_routes.route('/')
@login_required
def all_friends():
    """
    Query for all friends by a logged in user id and returns them in a list of user dictionaries
    """
    user_friends = [[friend.first_name.title(), friend.last_name.title()] for friend in current_user.friends]
    return {'user_friends': user_friends}


@friend_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
