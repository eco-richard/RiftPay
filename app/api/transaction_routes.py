# from flask import Blueprint, jsonify
# from flask_login import login_required, current_user
# from app.models import db, User, Transaction, Loan
# from app.forms.transaction_form import TransactionForm

# import sys

# transaction_routes = Blueprint("transactions", __name__)

# def destructure_row(row_object):
#     final_rows = list()
#     for item in row_object:
#         obj, *_ = item
#         final_rows.append(obj)
#     return final_rows


# @transaction_routes.route("/current")
# @login_required
# def get_transactions_current():
#     """
#     Query all the transactions of the currently logged in user
#     """

#     transactions_ids = {loan.transaction_id for loan in current_user.loans}
#     transactions = list(db.session.execute(
#         db.select(Transaction).filter(Transaction.id.in_(list(transactions_ids)))
#         ))
#     final_transactions = list()
#     for transaction in transactions:
#         transaction_item, *_ = transaction
#         final_transactions.append(transaction_item)

#     return {"Transactions": [transaction.to_dict() for transaction in final_transactions]}

# @transaction_routes.route("/friend/<int:friend_id>")
# @login_required
# def get_friend_transaction(friend_id):
#     """
#     Query all the transacations that the current user has with a given friend
#     based on friend id
#     """

#     # Getting loans where the current user and friend have an
#     # interaction (each loan has a recipricol loan)
#     common_loans = db.session.execute(
#         db.select(Loan)
#             .filter(db.and_(Loan.loaner_id == current_user.id,
#                         Loan.debtor_id == friend_id))
#     )

#     # Destructing tuples to work
#     common_loans = destructure_row(common_loans)

#     # Adding all the transaction ids from the loans
#     # to query the relavent transactions
#     transactions_ids = list()
#     for loan in common_loans:
#         transactions_ids.append(loan.transaction_id)

#     # Querying to get all transactions where the users are involved
#     transactions = list(db.session.execute(
#         db.select(Transaction)
#             .filter(Transaction.id.in_(list(transactions_ids)))
#         ))
#     transactions = destructure_row(transactions)

#     # Converting to dictionary to add the loans to each transaction
#     transactions_dictionary = [transaction.to_dict() for transaction in transactions]

#     for i in range(len(transactions_dictionary)):
#         transactions_dictionary[i]["Relavent_Loan"] = common_loans[i].to_dict()

#     return {"Transactions": transactions_dictionary}

# @transaction_routes.route("", methods=["POST"])
# @login_required
# def post_create_transaction():
#     """
#     Create a new transaction
#     """
#     form = TransactionForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     data = form.data
#     if form.validate_on_submit():
#         transaction = Transaction(
#             creator_id=current_user.id,
#             updater_id=current_user.id,
#             cost=data["cost"],
#             creation_method=data["creation_method"],
#             description=data["description"],
#             note=data["note"],
#             image=data["image"],
#             created_at=data["created_at"],
#             updated_at=data["updated_at"]
#         )
#         db.session.add(transaction)
#         db.session.commit()
#         for friend in data["payers"]:
#             loan = Loan(
#                 loaner = current_user,
#                 debtor_id = friend.id,
#                 amount = data["cost"]/len(data["payers"]),
#                 transaction_id = transaction.id,
#                 created_at=data["created_at"],
#                 updated_at=data["updated_at"]
#             )

# @transaction_routes.route("/<int:transaction_id>", methods=["PUT"])
# @login_required
# def update_single_transaction(transaction_id):
#     """
#     Update the information on a transaction
#     """
#     transaction = Transaction.query.get_or_404(transaction_id)
#     form = TransactionForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     data = form.data
#     if form.validate_on_submit():
#         transaction.updater_id = current_user.id
#         transaction.cost = data["cost"]
#         transaction.description = data["description"]
#         transaction.note = data["note"]
#         transaction.image = data["image"]
#         transaction.updated_at = data["updated_at"]

#     db.session.commit()


# @transaction_routes.route("/<int:transaction_id>")
# @login_required
# def get_single_transaction(transaction_id):
#     transaction = Transaction.query.get(transaction_id)

#     if transaction is None:
#         return {"error": f"No transaction found with id {transaction_id}"}

#     return transaction.to_dict()

# @transaction_routes.route("/<int:transaction_id>", methods=["DELETE"])
# @login_required
# def delete_single_transaction(transaction_id):
#     transaction = Transaction.query.get(transaction_id)

#     if transaction is None:
#         return {"error": f"No transaction found with id {transaction_id}"}


#     db.session.delete(transaction)
#     db.session.commit()
#     return {"success": "True", "status_code": 200}

