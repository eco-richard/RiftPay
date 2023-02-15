from .db import db, environment, SCHEMA, add_prefix_for_prod


friends = db.Table(
    "friends",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("friend_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.UniqueConstraint('user_id', 'friend_id', name='unique_friendships')
)

if environment == "production":
    friends.schema = SCHEMA
