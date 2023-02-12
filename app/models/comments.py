from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    commentor_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    transaction_id = db.Column(db.Integer, db.ForeignKey("transactions.id"))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    commentor = db.relationship("User", back_populates="comments")
    transaction = db.relationship("Transaction", back_populates="comments")
