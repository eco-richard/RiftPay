from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Transaction
from app.forms.transaction_form import TransactionForm
import app.utilities as ut

import sys

transaction_routes = Blueprint("transactions", __name__)

@transaction_routes.route("/current")
@login_required
def get_transactions_current():
    """
    Query all the transactions of the currently logged in user
    """

    transactions = current_user.transactions
    return {"Transactions": [transaction.to_dict() for transaction in transactions]}


@transaction_routes.route("/friend/<int:friend_id>")
@login_required
def get_friend_transaction(friend_id):
    """
    Query all the transacations that the current user has with a given friend
    based on friend id
    """
    transactions = current_user.transactions
    friend = User.query.get(friend_id)

    if friend is None:
        return {"error": f"No friend found with id {friend_id}"}

    common_transactions = set(transactions).intersection(set(friend.transactions))

    return {"Transactions": [transaction.to_dict() for transaction in common_transactions]}

@transaction_routes.route("", methods=["POST"])
@login_required
def post_create_transaction():
    """
    Create a new transaction
    """
    form = TransactionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data
    if form.validate_on_submit():
        transaction = Transaction(
            creator_id=current_user.id,
            updater_id=None,
            cost=data["cost"],
            creation_method=data["creation_method"],
            description=data["description"],
            note=data["note"],
            image=data["image"],
            created_at=data["created_at"],
            updated_at=None,
            payers=data["payers"],
            repayments=data["repayments"]
        )
        db.session.add(transaction)
        db.session.commit()
        transaction.add_repayment_users()
        transaction.add_friends()
        db.session.commit()
        return transaction.to_dict()

    return {"errors": ut.validation_errors_to_error_messages(form.errors) }


@transaction_routes.route("/<int:transaction_id>", methods=["PUT"])
@login_required
def update_single_transaction(transaction_id):
    """
    Update the information on a transaction
    """
    transaction = Transaction.query.get_or_404(transaction_id)
    form = TransactionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    data = form.data
    if form.validate_on_submit():
        transaction.updater_id = current_user.id
        transaction.cost = data["cost"]
        transaction.description = data["description"]
        transaction.note = data["note"]
        transaction.image = data["image"]
        transaction.updated_at = data["updated_at"]
        transaction.payers=data["payers"]
        transaction.repayments=data["repayments"]

        db.session.commit()
        return transaction.to_dict()
    return {"errors": ut.validation_errors_to_error_messages(form.errors)}


@transaction_routes.route("/<int:transaction_id>")
@login_required
def get_single_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)

    if transaction is None:
        return {"error": f"No transaction found with id {transaction_id}"}

    return transaction.to_dict()

@transaction_routes.route("/<int:transaction_id>", methods=["DELETE"])
@login_required
def delete_single_transaction(transaction_id):
    transaction = Transaction.query.get_or_404(transaction_id)

    if transaction is None:
        return {"error": f"No transaction found with id {transaction_id}"}


    db.session.delete(transaction)
    db.session.commit()
    return {"success": "True", "status_code": 200}
