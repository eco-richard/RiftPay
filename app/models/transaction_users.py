from .db import db, environment, SCHEMA, add_prefix_for_prod

class TransactionUsers(db.Model):
    __tablename__ = "transaction_users"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # primary_key=True
    transaction_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("transactions.id")))
    # primary_key=True
    balance = db.Column(db.Float(precision=2))

    transaction = db.relationship("Transaction", backref = db.backref("transaction_users"), cascade="all, delete")
    user = db.relationship("User", backref=db.backref("transaction_users", cascade="all, delete"))
