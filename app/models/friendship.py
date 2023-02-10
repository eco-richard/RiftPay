from .db import db, environment, SCHEMA, add_prefix_for_prod

class Friendship(db.Model):
    __tablename__ = "friendships"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    balance = db.Column(db.Float(precision=2), nullable=False)

    user1 = db.relationship("User1", back_populates="users")
    user2 = db.relationship("User2", back_populates="users")
