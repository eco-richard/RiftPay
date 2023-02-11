from .db import db, environment, SCHEMA, add_prefix_for_prod

class TransactionUser(db.Model):
    __tablename__ = "transaction_users"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owed_share = db.Column(db.Float(precision=2), nullable=False)
    paid_share = db.Column(db.Float(precision=2), nullable=False)
    net_balance = db.Column(db.Float(precision=2), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    transaction_id = db.Column(db.Integer, db.ForeignKey('transactions.id'), nullable=False)

    