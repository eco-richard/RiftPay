from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Transaction, Loan

import sys

transaction_routes = Blueprint("transactions", __name__)

@transaction_routes.route("/current")
@login_required
def get_transactions_current():
    """
    Query all the transactions of the currently logged in user
    """

    transactions_ids = {loan.transaction_id for loan in current_user.loans}
    transactions = list(db.session.execute(
        db.select(Transaction).filter(Transaction.id.in_(list(transactions_ids)))
        ))
    final_transactions = list()
    for transaction in transactions:
        transaction_item, *_ = transaction
        final_transactions.append(transaction_item)

    return {"Transactions": [transaction.to_dict() for transaction in final_transactions]}

@transaction_routes.route("/friend/<int:friendId>")
@login_required
def get_friend_transaction(friendId):
    """
    Query all the transacations that the current user has with a given friend
    based on friend id
    """
    common_loans = db.session.execute(
        db.select(Loan)
            .filter(and_(Loan.loaner_id == current_user.id, 
                        Loan.debtor_id == friendId))        
    )


    print("Common Loans: ", common_loans, file=sys.stderr)
    transactions_ids = {loan.transaction_id for loan in current_user.loans}
    transactions = list(db.session.execute(
        db.select(Transaction)
            .filter(Transaction.id.in_(list(transactions_ids)))
            .filter()
        ))


@transaction_routes.route("<int:transactionId>")
@login_required
def get_single_transaction(transactionId):
    pass
