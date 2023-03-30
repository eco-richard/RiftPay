import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBalances, getFriendBalance } from '../../store/balances';
import OpenModalButton from '../OpenModalButton';
import SettleUpForm from '../SettleUpForm';
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import OweYouFriendBill from '../FriendBill/OweYouFriendBill';
import YouOweFriendBill from '../FriendBill/YouOweFriendBill';
import AddExpenseForm from '../AddExpenseForm';
import RightSideNavigation from '../Navigation/RightSideNavigation';

import "./Dashboard.css"
import { loadFriendsThunk } from '../../store/friends';

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const friendsObj = useSelector((state) => state.friends.friends)
    const friends = Object.values(friendsObj)
    const friendsLength = friends.length

    //variables for tracking balance

    //total amount owed to user
    let totalLoan = 0;

    //total amount user owes
    let totalDebt = 0;
    //which friends owe user
    let loanerFriend = [];

    //which friends user owes
    let debtorFriend = [];

    let placeholderFriend = []

    //assigning friends to either loaner or debtor status depending on if they owe or are owed by user
    for (let i = 0; i < friends.length; i++) {
        if (friends[i].balance > 0) {
            totalLoan += parseInt(friends[i].balance)
            loanerFriend.push(friends[i])
        }
        else if (friends[i].balance < 0){
            totalDebt -= parseInt(friends[i].balance)
            debtorFriend.push(friends[i])
        }
        else {
            placeholderFriend.push(friends[i])
        }
    }

    const totalBalance = totalLoan - totalDebt


    //what color the balance number renders as depending on if the user owes money or is owed money in total
    let colorVar;
    if (totalBalance > 0) {
        colorVar = "rgb(91, 197, 167)"
    }
    else if (totalBalance < 0) {
        colorVar = "rgb(255, 101, 47)"
    }
    else {
        colorVar = "rgb(91, 197, 167)"
    }


    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [dispatch])



    if (!user) return <Redirect to="/"/>;

    return (
        <div className="column-wrapper">
            <div className="middle-column-container">
                <div className='dashboard-header-container'>
                    <div className="dashboard-header-title-and-buttons">
                        <h1 className="dashboard-header-title">Dashboard</h1>
                        <div className="dashboard-header-buttons">
                            <div className='add-expense-button'>
                                <OpenModalButton
                                    buttonText="Add an Expense"
                                    modalComponent={<AddExpenseForm />}
                                ></OpenModalButton>
                            </div>
                            <span className="button-seperator"></span>
                            <div className='dash-settle-up-button'>
                                <OpenModalButton
                                    buttonText="Settle Up"
                                    modalComponent={<SettleUpForm />}
                                ></OpenModalButton>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-balances-header-container">
                        <div className='total-balance-container'>
                            <div className="dashboard-balance-labels">
                                total balance
                            </div>
                            <div className='dashboard-balance-amounts' style={{color: colorVar}}>${totalBalance.toFixed(2)}</div>
                        </div>
                        <div className='you-owe-container'>
                            <div className="dashboard-balance-labels">
                                you owe
                            </div>
                            <div className='dashboard-owe-amounts' style={{color: "rgb(255, 101, 47)"}}>${totalDebt.toFixed(2)}</div>
                        </div>
                        <div className='you-are-owed-container'>
                            <div className="dashboard-balance-labels">
                                you are owed
                            </div>
                            <div className='dashboard-owed-amounts' style={{color: "rgb(91, 197, 167)"}}>${totalLoan.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-content-container'>
                    <div className='owe-and-owed-bar-container'>
                        <div className="you-owe-bar-container">
                            <h3>YOU OWE</h3>
                        </div>
                        <div className='you-are-owed-bar-container'>
                            <h3>YOU ARE OWED</h3>
                        </div>
                    </div>
                    <div className="dashboard-bills-container">
                        <div className="bills-you-owe-container">
                            {debtorFriend.map(friend => (
                                <YouOweFriendBill friend={friend} />
                            ))}
                        </div>
                        <div className="bills-you-are-owed-container">
                            {loanerFriend.map(friend => (
                                <OweYouFriendBill friend={friend} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-column-container">
                <RightSideNavigation />
            </div>

        </div>
    )
}

export default Dashboard;
