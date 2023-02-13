from app.models import db, friends, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_friends():
    friends1_2 = friends(
        user_id = 1,
        friend_id = 2
    )
    friends2_1 = friends(
        user_id = 2,
        friend_id = 1
    )
    friends1_3 = friends(
        user_id = 1,
        friend_id = 3
    )
    friends3_1 = friends(
        user_id = 3,
        friend_id = 1
    )
    friends1_4 = friends(
        user_id = 1,
        friend_id = 4
    )
    friends4_1 = friends(
        user_id = 4,
        friend_id = 1
    )
    friends2_5 = friends(
        user_id = 2,
        friend_id = 5
    )
    friends2_6 = friends(
        user_id = 2,
        friend_id = 6
    )
    friends2_7 = friends(
        user_id = 2,
        friend_id = 7
    )
    friends5_2 = friends(
        user_id = 5,
        friend_id = 2
    )
    friends6_2 = friends(
        user_id = 6,
        friend_id = 2
    )
    friends7_2 = friends(
        user_id = 7,
        friend_id = 2
    )
    friends3_6 = friends(
        user_id = 3,
        friend_id = 6
    )
    friends3_7 = friends(
        user_id = 3,
        friend_id = 7
    )
    friends3_8 = friends(
        user_id = 3,
        friend_id = 8
    )
    friends6_3 = friends(
        user_id = 6,
        friend_id = 3
    )
    friends7_3 = friends(
        user_id = 7,
        friend_id = 3
    )
    friends8_3 = friends(
        user_id = 8,
        friend_id = 3
    )
    friends4_7 = friends(
        user_id = 4,
        friend_id = 7
    )
    friends4_8 = friends(
        user_id = 4,
        friend_id = 8
    )
    friends4_3 = friends(
        user_id = 4,
        friend_id = 3
    )
    friends7_4 = friends(
        user_id = 7,
        friend_id = 4
    )
    friends8_4 = friends(
        user_id = 8,
        friend_id = 4
    )
    friends3_4 = friends(
        user_id = 3,
        friend_id = 4
    )

    all_friends = [friends1_2, friends1_3, friends1_4,
                friends4_1, friends3_1, friends2_1,
                friends2_5, friends2_6, friends2_7,
                friends5_2, friends6_2, friends7_2,
                friends3_6, friends3_7, friends3_8,
                friends6_3, friends7_3, friends8_3,
                friends4_3, friends4_7, friends4_8,
                friends3_4, friends7_4, friends8_4]
    add_friends = [db.session.add(friends) for friends in all_friends]
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
