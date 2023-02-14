from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    updater_id = db.Column(db.Integer)
    cost = db.Column(db.Float, nullable=False)
    creation_method = db.Column(db.String, nullable=False)
    description = db.Column(db.String(50), nullable=False)
    note = db.Column(db.String(250))
    image = db.Column(db.String(250))
    created_at = db.Column(db.String)
    updated_at = db.Column(db.String)

    owers = db.relationship("User", secondary="transaction_users", cascade="all, delete")
    loans = db.relationship("Loan", back_populates="transaction", cascade="all, delete-orphan")
    creator = db.relationship("User", back_populates="payer_transactions")
    comments = db.relationship("Comment", back_populates="transaction", cascade="all, delete-orphan")

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
            'owers': [list[ower.simple_user()] for ower in self.owers],
            'loans': [list[loan.to_dict()] for loan in self.loans],
        }

    # def add_owers(self, owers):
    #     for ower,balance in owers:
    #         self.
