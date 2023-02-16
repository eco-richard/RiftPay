from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .join_tables import friends, transaction_users, group_users
from sqlalchemy import or_

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    picture = db.Column(db.String(1000))
    hashed_password = db.Column(db.String(255), nullable=False)

    friends = db.relationship(
        "User",
        secondary=friends,
        primaryjoin=(friends.c.user_id == id),
        secondaryjoin=(friends.c.friend_id == id),
        backref=db.backref("friend", lazy="dynamic"),
        lazy="dynamic",
        cascade="all, delete"
    )

    comments = db.relationship("Comment", back_populates="commentor", cascade="all, delete-orphan")
    # loans = db.relationship("Loan", back_populates="loaner", cascade="all, delete-orphan")

    # payer_transactions = db.relationship("Transaction", back_populates="creator")
    transactions = db.relationship("Transaction", secondary=transaction_users, back_populates="users")
    groups = db.relationship("Group", secondary=group_users, back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_friends(self):
        friend_list = [friend.simple_user() for friend in self.friends]
        transactions_repayments = [transaction.structure_repayments() for transaction in self.transactions]
        balances = []
        for friend in friend_list:
            sum = 0
            user_debts = transactions_repayments.filter(or_(loaner_id = friend.id, debtor_id = self.id))
            for debt in user_debts:
                sum -= int(debt)
            user_loans = transactions_repayments.filter(or_(loaner_id = self.id, debtor_id = friend.id))
            for loan in user_loans:
                sum += int(loan)
            friend['balance'] = sum
            balances.append(friend)
        return balances

    def simple_user(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'picture': self.picture
        }

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.first_name,
            'email': self.email,
            'picture': self.picture,
            'friends': self.get_friends(),
            # 'comments': [list[comment.to_dict()] for comment in self.comments],
            # 'payer_transactions': [payer_transaction.to_dict() for payer_transaction in self.payer_transactions],
            'transactions': [transaction.to_dict() for transaction in self.transactions],
            'groups': [group.to_dict() for group in self.groups]
        }
