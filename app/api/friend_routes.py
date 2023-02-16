from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import User, friends, db


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
def single_friends(friendId):
    """
    Query for all friends by a logged in user id and returns them in a list of user dictionaries
    """
    friend = User.query.get(friendId)
    print(f"\n\n\nfriend: {friend}\n\n\n")
    return {"Single_Friend": friend.to_dict()}

@friend_routes.route('/<int:friendId>', methods=["DELETE"])
@login_required
def remove_friend(friendId):
    """
    Delete a friend from the database
    """

    friend = User.query.get(friendId)

    current_user.friends.remove(friend);
    friend.friends.remove(current_user)
    db.session.commit()

    return {'Response': "Successfully Deleted"}
