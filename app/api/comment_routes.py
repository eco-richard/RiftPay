from flask import Blueprint, jsonify, request, session
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
    num_comments = len(comments_test)
    for comment in comments_test:
        user = User.query.get(comment["commentor_id"])
        comment['user'] = user.to_dict()



    return {"comments": [comment for comment in comments_test],
            "num_comments": num_comments}


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
        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route("/<int:comment_id>", methods=["PUT"])
@login_required
def update_comment(comment_id):
    """
    Edit a specific comment of a transaction
    """

    comment = Comment.query.get(comment_id)

    form = AddCommentForm()
    form ['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        comment_content = form.data["content"]

        comment.content=form.data["content"]

        comment.updated_at=form.data["updated_at"]


        db.session.commit()

        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@comment_routes.route("/<int:comment_id>", methods=["DELETE"])
@login_required
def remove_comment(comment_id):
    """
    Delete a specific comment of a transaction
    """

    comment = Comment.query.get(comment_id)

    if comment is None:
        return {"error": f"No comment found with id {comment_id}"}

    db.session.delete(comment)
    db.session.commit()
    return {"success": "True", "status_code": 200}
