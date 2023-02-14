from app.models import db, Loan, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_loans():
    loan1_2 = Loan(
        loaner_id = 1,
        debtor_id = 2,
        amount = 25,
        transaction_id = 1
    )
    loan1_3 = Loan(
        loaner_id = 1,
        debtor_id = 3,
        amount = 25,
        transaction_id = 1
    )
    loan1_4 = Loan(
        loaner_id = 1,
        debtor_id = 4,
        amount = 25,
        transaction_id = 1
    )
    loan2_1 = Loan(
        loaner_id = 2,
        debtor_id = 1,
        amount = -25,
        transaction_id = 1
    )
    loan3_1 = Loan(
        loaner_id = 3,
        debtor_id = 1,
        amount = -25,
        transaction_id = 1
    )
    loan4_1 = Loan(
        loaner_id = 4,
        debtor_id = 1,
        amount = -25,
        transaction_id = 1
    )
    loan2_5 = Loan(
        loaner_id = 2,
        debtor_id = 5,
        amount = 25,
        transaction_id = 2
    )
    loan2_11 = Loan(
        loaner_id = 2,
        debtor_id = 1,
        amount = 25,
        transaction_id = 2
    )
    loan2_7 = Loan(
        loaner_id = 2,
        debtor_id = 7,
        amount = 25,
        transaction_id = 2
    )
    loan5_2 = Loan(
        loaner_id = 5,
        debtor_id = 2,
        amount = -25,
        transaction_id = 2
    )
    loan6_2 = Loan(
        loaner_id = 6,
        debtor_id = 2,
        amount = -25,
        transaction_id = 2
    )
    loan7_2 = Loan(
        loaner_id = 7,
        debtor_id = 2,
        amount = -25,
        transaction_id = 2
    )
    loan3_6 = Loan(
        loaner_id = 3,
        debtor_id = 6,
        amount = 25,
        transaction_id = 3
    )
    loan3_7 = Loan(
        loaner_id = 3,
        debtor_id = 7,
        amount = 25,
        transaction_id = 3
    )
    loan3_8 = Loan(
        loaner_id = 3,
        debtor_id = 8,
        amount = 25,
        transaction_id = 3
    )
    loan6_3 = Loan(
        loaner_id = 6,
        debtor_id = 3,
        amount = -25,
        transaction_id = 3
    )
    loan7_3 = Loan(
        loaner_id = 7,
        debtor_id = 3,
        amount = -25,
        transaction_id = 3
    )
    loan8_3 = Loan(
        loaner_id = 8,
        debtor_id = 3,
        amount = -25,
        transaction_id = 3
    )
    loan4_7 = Loan(
        loaner_id = 4,
        debtor_id = 7,
        amount = 25,
        transaction_id = 4
    )
    loan4_8 = Loan(
        loaner_id = 4,
        debtor_id = 8,
        amount = 25,
        transaction_id = 4
    )
    loan4_3 = Loan(
        loaner_id = 4,
        debtor_id = 3,
        amount = 25,
        transaction_id = 4
    )
    loan7_4 = Loan(
        loaner_id = 7,
        debtor_id = 4,
        amount = -25,
        transaction_id = 4
    )
    loan8_4 = Loan(
        loaner_id = 8,
        debtor_id = 4,
        amount = -25,
        transaction_id = 4
    )
    loan3_4 = Loan(
        loaner_id = 3,
        debtor_id = 4,
        amount = -25,
        transaction_id = 4
    )

    all_loans = [loan1_2, loan1_3, loan1_4,
                loan4_1, loan3_1, loan2_11,
                loan2_5, loan2_1, loan2_7,
                loan5_2, loan6_2, loan7_2,
                loan3_6, loan3_7, loan3_8,
                loan6_3, loan7_3, loan8_3,
                loan4_3, loan4_7, loan4_8,
                loan3_4, loan7_4, loan8_4]
    add_loans = [db.session.add(loan) for loan in all_loans]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_loans():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.loans RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM loans")

    db.session.commit()
