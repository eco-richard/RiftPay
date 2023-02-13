from app.models import db, user_transactions, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_user_transactions():
    user_transaction1 = user_transactions(
        user_id = 2,
        transaction_id = 1,
        balance = 25
    )
    user_transaction2 = user_transactions(
        user_id = 3,
        transaction_id = 1,
        balance = 25
    )
    user_transaction3 = user_transactions(
        user_id = 4,
        transaction_id = 1,
        balance = 25
    )
    user_transaction4 = user_transactions(
        user_id = 5,
        transaction_id = 2,
        balance = 25
    )
    user_transaction5 = user_transactions(
        user_id = 6,
        transaction_id = 2,
        balance = 25
    )
    user_transaction6 = user_transactions(
        user_id = 7,
        transaction_id = 2,
        balance = 25
    )
    user_transaction7 = user_transactions(
        user_id = 6,
        transaction_id = 3,
        balance = 25
    )
    user_transaction8 = user_transactions(
        user_id = 7,
        transaction_id = 3,
        balance = 25
    )
    user_transaction9 = user_transactions(
        user_id = 8,
        transaction_id = 3,
        balance = 25
    )
    user_transaction10 = user_transactions(
        user_id = 7,
        transaction_id = 4,
        balance = 25
    )
    user_transaction11 = user_transactions(
        user_id = 8,
        transaction_id = 4,
        balance = 25
    )
    user_transaction12 = user_transactions(
        user_id = 3,
        transaction_id = 4,
        balance = 25
    )

    all_user_transactions = [user_transaction1, user_transaction2,
                            user_transaction3, user_transaction4,
                            user_transaction5, user_transaction6,
                            user_transaction7, user_transaction8,
                            user_transaction9, user_transaction10,
                            user_transaction11, user_transaction12]
    add_user_transactions = [db.session.add(user_transaction) for user_transaction in all_user_transactions]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_transactions")

    db.session.commit()
