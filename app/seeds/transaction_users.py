from app.models import db, TransactionUsers, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_transaction_users():
    transaction_user1 = TransactionUsers(
        user_id = 2,
        transaction_id = 1,
        balance = 25
    )
    transaction_user2 = TransactionUsers(
        user_id = 3,
        transaction_id = 1,
        balance = 25
    )
    transaction_user3 = TransactionUsers(
        user_id = 4,
        transaction_id = 1,
        balance = 25
    )
    transaction_user4 = TransactionUsers(
        user_id = 5,
        transaction_id = 2,
        balance = 25
    )
    transaction_user5 = TransactionUsers(
        user_id = 6,
        transaction_id = 2,
        balance = 25
    )
    transaction_user6 = TransactionUsers(
        user_id = 7,
        transaction_id = 2,
        balance = 25
    )
    transaction_user7 = TransactionUsers(
        user_id = 6,
        transaction_id = 3,
        balance = 25
    )
    transaction_user8 = TransactionUsers(
        user_id = 7,
        transaction_id = 3,
        balance = 25
    )
    transaction_user9 = TransactionUsers(
        user_id = 8,
        transaction_id = 3,
        balance = 25
    )
    transaction_user10 = TransactionUsers(
        user_id = 7,
        transaction_id = 4,
        balance = 25
    )
    transaction_user11 = TransactionUsers(
        user_id = 8,
        transaction_id = 4,
        balance = 25
    )
    transaction_user12 = TransactionUsers(
        user_id = 3,
        transaction_id = 4,
        balance = 25
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
