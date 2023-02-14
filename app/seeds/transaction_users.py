from app.models import db, TransactionUsers, environment, SCHEMA
from app.models import User, Transaction

# Adds a demo user, you can add other users here if you want
def seed_transaction_users():
    # Query all users
    user1 = db.session.query(User).get(1)
    user2 = db.session.query(User).get(2)
    user3 = db.session.query(User).get(3)
    user4 = db.session.query(User).get(4)
    user5 = db.session.query(User).get(5)
    user6 = db.session.query(User).get(6)
    user7 = db.session.query(User).get(7)
    user8 = db.session.query(User).get(9)

    # Query all transactions
    transaction1 = db.session.query(Transaction).get(1)
    transaction2 = db.session.query(Transaction).get(2)
    transaction3 = db.session.query(Transaction).get(3)
    transaction4 = db.session.query(Transaction).get(4)
    

    transaction_user1 = TransactionUsers(
        user = user2,
        transaction = transaction1,
        balance = 25
    )
    transaction_user2 = TransactionUsers(
        user = user3,
        transaction = transaction1,
        balance = 25
    )
    transaction_user3 = TransactionUsers(
        user = user4,
        transaction = transaction1,
        balance = 25
    )
    transaction_user4 = TransactionUsers(
        user = user5,
        transaction = transaction2,
        balance = 25
    )
    transaction_user5 = TransactionUsers(
        user = user1,
        transaction = transaction2,
        balance = 25
    )
    transaction_user6 = TransactionUsers(
        user = user7,
        transaction = transaction2,
        balance = 25
    )
    transaction_user7 = TransactionUsers(
        user = user6,
        transaction = transaction3,
        balance = 25
    )
    transaction_user8 = TransactionUsers(
        user = user7,
        transaction_id = transaction3,
        balance = 25
    )
    transaction_user9 = TransactionUsers(
        user = user8,
        transaction = transaction3,
        balance = 25
    )
    transaction_user10 = TransactionUsers(
        user = user7,
        transaction = transaction4,
        balance = 25
    )
    transaction_user11 = TransactionUsers(
        user = user8,
        transaction = transaction4,
        balance = 25
    )
    transaction_user12 = TransactionUsers(
        user = user3,
        transaction = transaction4,
        balance = 25
    )
    transaction_user13 = TransactionUsers(
        user = user1,
        transaction = transaction2
    )

    all_transaction_users = [transaction_user1, transaction_user2,
                            transaction_user3, transaction_user4,
                            transaction_user5, transaction_user6,
                            transaction_user7, transaction_user8,
                            transaction_user9, transaction_user10,
                            transaction_user11, transaction_user12]
    add_transaction_users = [db.session.add(transaction_user) for transaction_user in all_transaction_users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transaction_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transaction_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transaction_users")

    db.session.commit()
