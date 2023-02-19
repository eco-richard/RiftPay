from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Transaction
from app.forms.transaction_form import TransactionForm
import app.utilities as ut

balance_routes = Blueprint("balances", __name__)

@balance_routes.route("/total")
@login_required
def get_total_balance():
    """
    Get the total balance of the currently logged in user
    """
    return current_user.user_friends()

@balance_routes.route('/friend/<int:friend_id>')
@login_required
def get_friend_balance(friend_id):
    """
    Get the balance of the current user with a specific friend
    """
    friends_list = current_user.user_friends["friends"]
    friend = list(filter(lambda friend: friend.id == friend_id))[0]

    return friend

@balance_routes.route('/friend/<int:friend_id>', methods=["PUT"])
@login_required
def update_friend_balance(friend_id):
    """
    Update balance with a specific friend
    """
    # "Settle Up" is a transaction from one person to another

    form = TransactionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data
    if form.validate_on_submit():
        transaction = Transaction(
            creator_id=current_user.id,
            updater_id=None,
            cost=data["cost"],
            creation_method="PAYMENT",
            description=data["description"],
            note=data["note"],
            image=data["image"],
            created_at=data["created_at"],
            updated_at=data["updated_at"],
            payers=data["payers"],
            repayments=data["repayments"]
        )
        db.session.add(transaction)
        db.session.commit()
        transaction.add_repayment_users()
        return transaction.to_dict()

