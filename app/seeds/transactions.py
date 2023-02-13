from app.models import db, Transaction, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_transactions():
    transaction1 = Transaction(
        creator_id=1,
        cost=100,
        creation_method='equal',
        description='first transaction',
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    transaction2 = Transaction(
        creator_id=2,
        cost=100,
        creation_method='equal',
        description='second transaction',
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    transaction3 = Transaction(
        creator_id=3,
        cost=100,
        creation_method='equal',
        description='third transaction',
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    transaction4 = Transaction(
        creator_id=4,
        cost=100,
        creation_method='equal',
        description='fourth transaction',
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    

    all_transactions = [transaction1, transaction2, transaction3, transaction4]
    add_transactions = [db.session.add(transaction) for transaction in all_transactions]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
