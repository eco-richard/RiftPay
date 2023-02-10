from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin

class Bill(db.Model):
    __tablename__ = "bills"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    lender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    borrower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friendship_id = db.Column(db.Integer, db.ForeignKey('friendships.id'), nullable=False)
    amount = db.Column(db.Float(precision=2), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    note = db.Column(db.String(255))
    image = db.Column(db.String(255))
    created_at = db.Column(db.String(50), nullable=False)
    updated_at = db.Column(db.String(50), nullable=False)

    lender = db.relationship("Lender", back_populates="users")
    borrower = db.relationships("Borrower", back_populates="users")


