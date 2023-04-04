from .db import db, environment, SCHEMA, add_prefix_for_prod
from .join_tables import transaction_users
from app.models import User
import sys
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



    def structure_payers(self):
        payers_list = self.payers.split(',')
        final_payers = []
        for payer in payers_list:
            payer_id, amount = payer.split('/')
            payer = User.query.get(int(payer_id))
            final_payers.append({
                "payer": payer.simple_user(),
                "amount": round(float(amount), 2)
            })
        return final_payers


    def structure_repayments(self):
        # 1. 1/1/25,1/2/25,1/3/25
        # 2. ['1/1/25', '1/2/25', '1/3/25']
        # 3. ['[1], [1], [25]']
        repayments_list = self.repayments.split(',')
        final_repayments = []
        for repayment in repayments_list:
            loaner_id, debtor_id, amount = repayment.split('/')
            loaner = User.query.get(int(loaner_id))
            debtor = User.query.get(int(debtor_id))
            final_repayments.append({
                "loaner": loaner.simple_user(),
                "debtor": debtor.simple_user(),
                "amount": round(float(amount), 2)
            })
        return final_repayments


    def add_repayment_users(self):
        repayments = self.structure_repayments()
        current_users = []
        old_users = []
        for repayment in repayments:
            user_id = repayment["debtor"]["id"]
            user = User.query.get(user_id)
            current_users.append(user)
            user.transactions.append(self)
            self.users.append(user)
            db.session.commit()
        for user in self.users:
            old_users.append(user)
        orphan_payers = [user for user in old_users if user not in current_users]
        for payer in orphan_payers:
            self.users.remove(payer)

    def add_friends(self):
        """
        When participants are added to a transaction, they all
        automatically become friends
        """
        for user in self.users:
            for friend in self.users:
                if friend in user.friends or user == friend:
                    continue
                else:
                    user.friends.append(friend)
                    friend.friends.append(user)


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
            'payers': self.structure_payers(),
            'repayments': self.structure_repayments()
        }
