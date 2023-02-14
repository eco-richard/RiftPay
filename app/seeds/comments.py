from app.models import db, Comment, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        content = 'I made this!',
        commentor_id = 1,
        transaction_id = 1,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    comment2 = Comment(
        content = 'I made this!',
        commentor_id = 2,
        transaction_id = 2,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    comment3 = Comment(
        content = 'I made this!',
        commentor_id = 3,
        transaction_id = 3,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    comment4 = Comment(
        content = 'I made this!',
        commentor_id = 4,
        transaction_id = 4,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    comment5 = Comment(
        content = 'I made this!',
        commentor_id = 5,
        transaction_id = 5,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    comment6 = Comment(
        content = 'I made this!',
        commentor_id = 6,
        transaction_id = 6,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    comment7 = Comment(
        content = 'I made this!',
        commentor_id = 7,
        transaction_id = 7,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )
    comment8 = Comment(
        content = 'I made this!',
        commentor_id = 8,
        transaction_id = 8,
        created_at='02/13/2023',
        updated_at='02/13/2023'
    )

    all_comments = [comment1, comment2, comment3, comment4,
                    comment5, comment6, comment7, comment8]
    add_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
