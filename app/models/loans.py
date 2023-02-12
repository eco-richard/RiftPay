from .db import db, environment, SCHEMA, add_prefix_for_prod

class Loan(db.Model):
    __tablename__ = "loans"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    loaner_id = db.Column(db.Integer)
    debtor_id = db.Column(db.integer)
    amount = db.Column(db.Float(precision=2))
    transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    loaner = db.relationship("User", back_populates="loans")
    transaction = db.relationship("Transaction", back_populates="loans")
