from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from app.models.transaction import Transaction

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route("/current")
@login_required
def get_current():
    """
    Query for all transactions of the currently logged in user
    """
    transactions = db.session.execute(
        db.select(Transaction).filter_by(creatorId=current_user.get_id()))
    
@transaction_routes.route("/<int:transactionId>")
@login_required
def get_single_transaction(transactionId):
    """
    Query for a single transaction based on the transaction id
    """
    transaction = db.session.execute(
        db.select(Transaction).filter_by(id=transactionId)
    )
    return transaction.to_dict()
