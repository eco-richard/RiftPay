from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import User, friends


friend_routes = Blueprint('friends', __name__)


@friend_routes.route('/')
@login_required
def all_friends():
    """
    Query for all friends by a logged in user id and returns them in a list of user dictionaries
    """
    user_friends = [[friend.first_name.title(), friend.last_name.title(), friend.id] for friend in current_user.friends]
    return {'user_friends': user_friends}


@friend_routes.route('/<int:friendId>')
@login_required
def remove_friend(friendId):
    """
    Delete a friend from the database
    """

    friend_id = request.args.get('friendId', type=int)
    friendship_query = friends.query.get.filter(friends.user_id.is_(current_user.id)).filter(friends.friend_id.is_(friend_id))
    return friend_id
