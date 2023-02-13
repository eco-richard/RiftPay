from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='smith', email='demo@aa.io', password='password')
    marnie = User(
        first_name='marnie', last_name='jones', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='bobbie', last_name='williams', email='bobbie@aa.io', password='password')
    john = User(
        first_name='john', last_name='westbrook', email='bobbie@aa.io', password='password')
    sarah = User(
        first_name='sarah', last_name='kim', email='bobbie@aa.io', password='password')
    richard = User(
        first_name='richard', last_name='diaz', email='bobbie@aa.io', password='password')
    kevin = User(
        first_name='kevin', last_name='ong', email='bobbie@aa.io', password='password')
    christian = User(
        first_name='christian', last_name='lee', email='bobbie@aa.io', password='password')
    paul = User(
        first_name='paul', last_name='fixler', email='bobbie@aa.io', password='password')
    sean = User(
        first_name='sean', last_name='connor', email='bobbie@aa.io', password='password')


    all_users = [demo, marnie, bobbie, john, sarah,
                richard, kevin, christian, paul, sean]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
