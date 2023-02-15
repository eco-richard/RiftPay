from app.models import db, friends, User, environment, SCHEMA, Transaction
from sqlalchemy import select

def seed_transaction_users():
    user1 = db.session.query(User).get(1)
    user2 = db.session.query(User).get(2)
    user3 = db.session.query(User).get(3)
    user4 = db.session.query(User).get(4)
    user5 = db.session.query(User).get(5)
    user6 = db.session.query(User).get(6)
    user7 = db.session.query(User).get(7)
    user8 = db.session.query(User).get(8)

    transaction1 = db.session.query(Transaction).get(1)
    transaction2 = db.session.query(Transaction).get(2)
    transaction3 = db.session.query(Transaction).get(3)
    transaction4 = db.session.query(Transaction).get(4)

    transaction1.users.append(user1)
    transaction1.users.append(user2)
    transaction1.users.append(user3)
    transaction1.users.append(user4)

    transaction2.users.append(user2)
    transaction2.users.append(user3)
    transaction2.users.append(user4)
    transaction2.users.append(user5)

    transaction3.users.append(user3)
    transaction3.users.append(user4)
    transaction3.users.append(user5)
    transaction3.users.append(user6)

    transaction4.users.append(user1)
    transaction4.users.append(user6)
    transaction4.users.append(user7)
    transaction4.users.append(user8)

    user1.transactions.append(transaction1)
    user1.transactions.append(transaction4)

    user2.transactions.append(transaction1)
    user2.transactions.append(transaction2)

    user3.transactions.append(transaction1)
    user3.transactions.append(transaction2)
    user3.transactions.append(transaction3)

    user4.transactions.append(transaction1)
    user4.transactions.append(transaction2)
    user4.transactions.append(transaction3)

    user5.transactions.append(transaction2)
    user5.transactions.append(transaction3)

    user6.transactions.append(transaction3)
    user6.transactions.append(transaction4)

    user7.transactions.append(transaction4)

    user8.transactions.append(transaction4)

    db.session.commit()


def undo_transaction_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transaction_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transaction_users")

    db.session.commit()
