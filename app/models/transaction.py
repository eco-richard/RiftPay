from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    updater_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    cost = db.Column(db.Float(precision=2), nullable=False)
    creation_methdod = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    note = db.Column(db.String(500))
    image = db.Column(db.String(255))
    created_at = db.Column(db.String(50), nullable=False)
    updated_at = db.Column(db.String(50), nullable=False)

