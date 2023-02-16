from app.models import db, friends, User, environment, SCHEMA
from sqlalchemy import select
# Adds a demo user, you can add other users here if you want
def seed_friends():
    user1 = db.session.query(User).get(1)
    user2 = db.session.query(User).get(2)
    user3 = db.session.query(User).get(3)
    user4 = db.session.query(User).get(4)
    user5 = db.session.query(User).get(5)
    user6 = db.session.query(User).get(6)
    user7 = db.session.query(User).get(7)
    user8 = db.session.query(User).get(8)

    user1.friends.append(user2)
    user2.friends.append(user1)
    user1.friends.append(user3)
    user3.friends.append(user1)
    user1.friends.append(user4)
    user4.friends.append(user1)
    user2.friends.append(user5)
    user5.friends.append(user2)
    # user2.friends.append(user6)
    # user6.friends.append(user2)
    user2.friends.append(user7)
    user7.friends.append(user2)
    user3.friends.append(user6)
    user6.friends.append(user3)
    user3.friends.append(user7)
    user7.friends.append(user3)
    user3.friends.append(user8)
    user8.friends.append(user3)
    user4.friends.append(user1)
    user3.friends.append(user4)
    user4.friends.append(user7)
    user7.friends.append(user4)
    user4.friends.append(user8)
    user8.friends.append(user4)
    user1.friends.append(user6)
    user1.friends.append(user7)
    user1.friends.append(user8)
    user6.friends.append(user1)
    user7.friends.append(user1)
    user8.friends.append(user1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")

    db.session.commit()
