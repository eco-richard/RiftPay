from .db import db, environment, SCHEMA, add_prefix_for_prod

class Repayment(db.Model):
    __tablename__ = "repayment"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    to_id = db.Column(db.Integer)
    from_id = db.Column(db.Integer)
    amount = db.Column(db.Float(precision=2))
    transaction_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("transactions.id")))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

