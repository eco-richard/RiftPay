import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadFriendsThunk } from '../../store/friends';
import OpenModalButton from "../OpenModalButton";
import AddFriendFormModal from "../AddFriendFormModal";
import "./FriendsList.css"

function FriendsList({friends}) {

    const dispatch = useDispatch()

    // const [flag, setFlag] = useState(true)

    const current_user = useSelector(state => state.session.user)
    // const friends = useSelector(state => state.friends.friends)
    const friendsArr = Object.values(friends)

    // useEffect(() => {
    //     if (flag) {
    //         dispatch(loadFriendsThunk())
    //         setFlag(false);
    //       }
    // }, [dispatch, current_user, flag, friendsArr])

    if (Object.keys(friends).length === 0) {
        <div className="friends-list-and-header-container">
        <div className="friends-header-container">
            <div className='friends-label'>FRIENDS</div>
            <>
                <OpenModalButton
                    buttonText="Add"
                    modalComponent={<AddFriendFormModal />}
                />
            </>
        </div>
    </div>
    }

    if (!current_user) return <Redirect to="/"/>

    return (
        <div className="friends-list-and-header-container">
            <div className="friends-header-container">
                <div className='friends-label'>FRIENDS</div>
                <>
                    <OpenModalButton
                        buttonText="Add"
                        modalComponent={<AddFriendFormModal />}
                    />
                </>
            </div>
            <div className='friends-list-container'>
                {friendsArr.map(friend => (
                    <div>
                        <NavLink to={`/friends/${friend.id}`} style={{ color: "rgb(145, 145, 153)" }}>{`${friend.first_name} ${friend.last_name}`}</NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FriendsList;
