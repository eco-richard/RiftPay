import React, { useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import { removeFriendThunk, loadSingleFriendThunk } from '../../store/friends';

function FriendPage() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {friendId} = useParams()

    const singleFriend = useSelector(state => state.friends.singleFriend)

    useEffect(() => {
        dispatch(loadSingleFriendThunk(friendId))
    },[dispatch])



    const removeFriendHandleClick = async (e) => {
        if (window.confirm("Are you sure you want to remove this friend?")) {
            dispatch(removeFriendThunk(singleFriend.id)).then(history.push("/dashboard"))
        }
    }

    return (
        <div className="column-wrapper">
            <div className="left-column-container">
                <LeftSideNavigation />
            </div>
            <div className="middle-column-container">
                <div className='expenses-header-container'>
                    <div className="expenses-header-title-and-buttons">
                        <h1 className="expenses-header-title">Friend Name</h1>
                        <div className="expenses-header-buttons">
                            <button className="expense-button">Add an expense</button>
                            <span className="button-seperator"></span>
                            <button>Settle Up</button>
                        </div>
                    </div>

                </div>
                <div className='expenses-content-container'>
                    <div className="expense-bills-container">
                    </div>
                </div>
            </div>
            <div className="right-column-container">
                <div className="right-column-content">
                    <div className="remove-friend-button-container">
                        <button className="remove-friend-button" style={{marginTop: "18.72px"}} onClick={removeFriendHandleClick}>
                            Remove This Friend
                        </button>
                    </div>
                    <h2 className="your-total-balance-label">YOUR BALANCE</h2>
                    <div className='balance-info-container'>
                        <div className='balance-summary'>
                            you owe Friend Name
                        </div>
                        <div className='balance-summary-amount'>
                            $145.00
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FriendPage;
