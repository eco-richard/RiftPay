from flask import Blueprint, jsonify, request, session
# from app.forms import xxx
from flask_login import login_required, current_user
from app.models import User, Comment, friends, db
from app.utilities import validation_errors_to_error_messages
from app.forms import AddCommentForm
from datetime import date

comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/<int:expense_id>")
@login_required
def all_comments(expense_id):
    """
    Query for all comments by a logged in user id
    """
    comments = db.select(Comment).filter_by("expense_id")

@comment_routes.route("/<int:expense_id>", methods=["POST"])
@login_required
def add_comment(expense_id):
    """
    Add a comment to an existing transaction
    """

    form = AddCommentForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(content = form.data["content"], commentor_id = current_user.id, transaction_id = expense_id)



@comment_routes.route("/<int:commentId>", methods=["POST"])
@login_required
def update_comment():
    """
    Edit a specific comment of a transaction
    """


@comment_routes.route("/<int:commentId>", methods=["DELETE"])
@login_required
def remove_comment():
    """
    Delete a specific comment of a transaction
    """
