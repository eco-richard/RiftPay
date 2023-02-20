from app.models import db, Transaction, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_transactions():
    transaction1 = Transaction(
        creator_id=1,
        cost=100,
        creation_method='Equal',
        description='first transaction',
        image = 'https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png',
        created_at='2023-02-13',
        updated_at='2023-02-13',
        payers = '1/100',
        repayments = '1/1/25,1/2/25,1/3/25,1/4/25'
    )
    transaction2 = Transaction(
        creator_id=2,
        cost=100,
        creation_method='Equal',
        description='second transaction',
        image = 'https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png',
        created_at='2023-02-13',
        updated_at='2023-02-13',
        payers = '2/100',
        repayments = '2/2/25,2/3/25,2/4/25,2/5/25'
    )
    transaction3 = Transaction(
        creator_id=3,
        cost=100,
        creation_method='Equal',
        description='third transaction',
        image = 'https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png',
        created_at='2023-02-13',
        updated_at='2023-02-13',
        payers = '3/100',
        repayments = '3/3/25,3/4/25,3/5/25,3/6/25'
    )
    transaction4 = Transaction(
        creator_id=4,
        cost=100,
        creation_method='Equal',
        description='fourth transaction',
        image = 'https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png',
        created_at='2023-02-13',
        updated_at='2023-02-13',
        payers = '1/100',
        repayments = '1/1/25,1/6/25,1/7/25,1/8/25'
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
