from flask import Blueprint, jsonify, request, session
from app.forms import AddFriendForm
from flask_login import login_required, current_user
from app.models import User, friends, db
from app.utilities import validation_errors_to_error_messages


friend_routes = Blueprint('friends', __name__)


@friend_routes.route('/')
@login_required
def all_friends():
    """
    Query for all friends by a logged in user id and returns them in a list of user dictionaries
    """
    user_friends = [{"first_name": friend.first_name.title(), "last_name": friend.last_name.title(), "id": friend.id} for friend in current_user.friends]
    return {'user_friends': user_friends}

@friend_routes.route('/<int:friendId>')
@login_required
def single_friends(friendId):
    """
    Query for all friends by a logged in user id and returns them in a list of user dictionaries
    """
    friend = User.query.get(friendId)
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

@friend_routes.route('', methods=["POST"])
@login_required
def add_friend():
    """
    Add a friend for the user
    """

    form = AddFriendForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    # print(f"\n\n\n\n\n form.data:", form.data)
    if form.validate_on_submit():
        user = db.session.execute(db.select(User).filter_by(email=form.data["email"])).scalar_one()
        current_user.friends.append(user);
        user.friends.append(current_user)
        db.session.commit()
        user2 = User.query.get(form.data["email"])
        print(f"\n\n\n\n user2.to_dict()", user2)
        print(f"\n\n\n\n user.to_dict()", user.to_dict())
        return {"user": user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


    # friend = User.query.get(friendId)
    # print(f"\n\n\n{request.form}\n\n\n")
    # print(f"\n\n\n{request.data}\n\n\n")

    # return {'New_Friend': friend.simple_user()}
