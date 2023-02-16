from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import group_users

class Group(db.Model):
    __tablename__ = "groups"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    avatar = db.Column(db.String(1000))
    picture = db.Column(db.String(1000))
    group_type = db.Column(db.String(50))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    # members = db.relationship("User", secondary=group_users, back_populates="groups")
    # transactions = db.relationship("Transaction", back_populates="group", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'avatar': self.avatar,
            'picture': self.picture,
            'group_type': self.group_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'members': [member.simple_user() for member in self.members],
            # 'repayments': [transaction.structure_repayments() for transaction in self.transactions]
            # above will have to aggregate the repayments into total balance for each member of group in group transactions
            # aggregated and original debts?
        }
