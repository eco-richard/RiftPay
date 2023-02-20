import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import { removeFriendThunk, loadSingleFriendThunk, loadFriendsThunk } from '../../store/friends';
import SingleTransaction from '../AllExpenses/SingleTransaction'
import FriendSingleTransaction from './FriendSingleTransaction';
import OpenModalButton from '../OpenModalButton';
import AddExpenseForm from '../AddExpenseForm';
import SettleUpForm from '../SettleUpForm';
import { getFriendTransactions } from '../../store/transaction';
import { getBalances } from '../../store/balances';

function FriendPage() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {friendId} = useParams()

    const user = useSelector((state) => state.session.user)
    const singleFriend = useSelector(state => state.friends.singleFriend)
    const transactions = Object.values(useSelector(state => state.transaction.allTransactions));
    const balances = useSelector(state => state.balance);
    console.log("BALANCE: ", balances);
    const friendBalance = balances.friends[friendId]?.balance;
    console.log("Friend Balance:", friendBalance);
    console.log("TRANSACTIONS:", transactions)
    transactions.sort();
    transactions.reverse();
    // transactions.sort((transaction1, transaction2) => {
    //     return Number(transaction1.created_at.slice(8)) > Number(transaction2.created_at.slice(8));
    // })

    useEffect(() => {
        dispatch(loadSingleFriendThunk(friendId))
        dispatch(getFriendTransactions(friendId))
        dispatch(getBalances())
    },[dispatch, friendId])

    if (!user) return <Redirect to="/"/>
    if (Object.values(singleFriend).length === 0 || transactions.length === 0) return null
    if (Object.values(balances).length === 0) return null;

    const removeFriendHandleClick = async (e) => {
        if (window.confirm("Are you sure you want to remove this friend?")) {
            dispatch(removeFriendThunk(singleFriend.id)).then(history.push("/dashboard"))
        }
    }
    const friendName = `${singleFriend.first_name[0].toUpperCase() + singleFriend.first_name.slice(1)} ${singleFriend.last_name[0].toUpperCase() + singleFriend.last_name.slice(1)}`
    const firstName = `${singleFriend.first_name[0].toUpperCase() + singleFriend.first_name.slice(1)}`
    let rightBalanceComponent;
    if (friendBalance > 0) {
        rightBalanceComponent = (
            <>
            <h2 className="your-total-balance-label">YOUR BALANCE</h2>
            <div className='balance-info-container' style={{color: "rgb(91, 197, 167)"}}>
                <div className='balance-summary'>
                    {firstName} owes you
                </div>
                <div className='balance-summary-amount'>
                    ${friendBalance.toFixed(2)}
                </div>
            </div>
            </>
        )
    } else if (friendBalance < 0) {
        rightBalanceComponent = (
            <>
            <h2 className="your-total-balance-label">YOUR BALANCE</h2>
            <div className='balance-info-container' style={{color: "rgb(255, 101, 47)"}}>
                <div className='balance-summary'>
                    you owe {firstName}
                </div>
                <div className='balance-summary-amount'>
                    ${Math.abs(friendBalance).toFixed(2)}
                </div>
            </div>
            </>
        )
    }
    return (
        <div className="column-wrapper">
            <div className="left-column-container">
                <LeftSideNavigation />
            </div>
            <div className="middle-column-container">
                <div className='expenses-header-container'>
                    <div className="expenses-header-title-and-buttons">
                        <h1 className="expenses-header-title">{friendName}</h1>
                        <div className="expenses-header-buttons">
                            <OpenModalButton
                                className="add-expense-button"
                                buttonText="Add an Expense"
                                modalComponent={<AddExpenseForm />}
                            ></OpenModalButton>
                            <span className="button-seperator"></span>
                            <OpenModalButton
                                className="dash-settle-up-button"
                                buttonText="Settle Up"
                                modalComponent={<SettleUpForm />}
                            ></OpenModalButton>
                        </div>
                    </div>

                </div>
                <div className='expenses-content-container'>
                    <div className="expense-bills-container">
                        {transactions.map(transaction => (
                            <FriendSingleTransaction transaction={transaction}/>
                        ))}
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
                    {rightBalanceComponent}
                    {/* <h2 className="your-total-balance-label">YOUR BALANCE</h2>
                    <div className='balance-info-container'>
                        <div className='balance-summary'>
                            you owe Friend Name
                        </div>
                        <div className='balance-summary-amount'>
                            $145.00
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default FriendPage;
