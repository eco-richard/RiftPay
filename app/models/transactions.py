from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import transaction_users

class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer)
    updater_id = db.Column(db.Integer)
    cost = db.Column(db.Float, nullable=False)
    creation_method = db.Column(db.String, nullable=False)
    description = db.Column(db.String(50), nullable=False)
    note = db.Column(db.String(250))
    image = db.Column(db.String(250))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)
    payers = db.Column(db.String(5000))
    repayments = db.Column(db.String(5000))

    comments = db.relationship("Comment", back_populates="transaction", cascade="all, delete-orphan")
    users = db.relationship("User", secondary=transaction_users, back_populates="transactions")

    # def create_loans(self):
    #     if self.creation_method == "EQUAL":
    #         split_amount = self.cost / len(self.payers)
    #         for user in payers:
    #             loan = Loan(
    #                 loaner_id = self.creator_id,
    #                 debtor_id = user.id,
    #                 amount = split_amount,
    #                 transaction_id = self.id,
    #                 created_at = self.created_at,
    #                 updated_at = self.updated_at,
    #             )
    #             db.session.add(loan)
    #         db.session.commit()


    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'updater_id': self.updater_id,
            'cost': self.cost,
            'creation_method': self.creation_method,
            'description': self.description,
            'note': self.note,
            'image': self.image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'users': [user.simple_user() for user in self.users],
            'payers': self.payers.split(','),
            'repayments': self.repayments.split(',')
        }
