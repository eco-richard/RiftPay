from flask import Blueprint, jsonify, request, session
# from app.forms import xxx
from flask_login import login_required, current_user
from app.models import User, Comment, friends, db
from app.utilities import validation_errors_to_error_messages
from app.forms import AddCommentForm
from datetime import date
from pprint import pprint

comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/<int:transaction_id>")
@login_required
def all_comments(transaction_id):
    """
    Query for all comments by a transactions id
    """
    comments = db.session.execute(db.select(Comment).filter_by(transaction_id=transaction_id).join(User, User.id == Comment.commentor_id)).all()
    comments_test = [comment[0].to_dict() for comment in comments]
    for comment in comments_test:
        user = User.query.get(comment["commentor_id"])
        comment['user'] = user.to_dict()
    print(f"\n\n\n{comments_test}\n\n\n")
    return {"comments": [comment for comment in comments_test]}
    # return {"comments": [comment[0].to_dict() for comment in comments]}

@comment_routes.route("/<int:transaction_id>", methods=["POST"])
@login_required
def add_comment(transaction_id):
    """
    Add a comment to an existing transaction
    """

    form = AddCommentForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment=Comment(
            content=form.data["content"],
            commentor_id=current_user.id,
            transaction_id=transaction_id,
            created_at=form.data["created_at"],
            updated_at=form.data["updated_at"]
        )



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
