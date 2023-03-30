from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    commentor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    transaction_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("transactions.id")))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    commentor = db.relationship("User", back_populates="comments")
    transaction = db.relationship("Transaction", back_populates="comments")


    def to_dict(self):
        return {
        'id': self.id,
        'content': self.content,
        'commentor_id': self.commentor_id,
        'transaction_id': self.transaction_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
        }
