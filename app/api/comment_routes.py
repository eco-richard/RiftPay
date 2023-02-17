from flask import Blueprint, jsonify, request, session
# from app.forms import xxx
from flask_login import login_required, current_user
from app.models import User, Comment, friends, db
from app.utilities import validation_errors_to_error_messages

comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/<int:expense_id>")
@login_required
def all_comments(expense_id):
    """
    Query for all comments by a logged in user id
    """
    comments = db.select(Comment).filter_by("expense_id")

@comment_routes.route("/<int:commentId>", methods=["DELETE"])
@login_required
def remove_comment():
    """
    Delete a specific comment of a transaction
    """


