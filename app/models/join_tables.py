from .db import db, environment, SCHEMA, add_prefix_for_prod


friends = db.Table(
    "friends",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("friend_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)

transaction_users = db.Table(
    "transaction_users",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("transaction_id", db.Integer, db.ForeignKey(add_prefix_for_prod("transactions.id")))
)

group_users = db.Table(
    "group_users",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("group_id", db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")))
)

if environment == "production":
    friends.schema = SCHEMA
    transaction_users.schema = SCHEMA
    group_users.schema = SCHEMA
