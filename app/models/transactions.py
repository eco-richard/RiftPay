from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    updator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    cost = db.Column(db.Float, nullable=False)
    creation_method = db.Column(db.String, nullable=False)
    description = db.Column(db.String(50))
    note = db.Column(db.String(250))
    image = db.Column(db.String(250))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    owers = db.relationship("User", secondary="transaction_users")