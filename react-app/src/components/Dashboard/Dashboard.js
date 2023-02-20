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

import "./Dashboard.css"
import { loadFriendsThunk } from '../../store/friends';

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const friendsObj = useSelector((state) => state.friends.friends)
    const friends = Object.values(friendsObj)
    const friendsLength = friends.length
    // const [totalLoan, setTotalLoan] = useState(0)
    // const [totalDebt, setTotalDebt] = useState(0)
    // const [totalLoan, setTotalLoan] = useState(0)
    console.log('friends in dashbaord:', friends)

    let totalLoan = 0;
    let totalDebt = 0;
    let loanerFriend = [];
    let debtorFriend = [];
    let placeholderFriend = []

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
    // console.log('totalDebt', totalDebt)
    // console.log('totalLoan', totalLoan)
    // console.log('totalBalance', totalBalance)
    // console.log('loaner friends:', loanerFriend)
    // console.log('debtor friends:', debtorFriend)
    // const balances = useSelector(state => state.balance)

    // let totalBalanceComponent;
    // if (balances.owes > balances.owed) {
    //     const total = balances.owes - balances.owed;
    //     totalBalanceComponent = (
    //         <div className='dashboard-balance-amounts' style={{color: "rgb(255, 101, 47)"}}>
    //             -${total.toFixed(2)}
    //         </div>
    //     )
    // } else {
    //     const total = balances.owed - balances.owes;
    //     totalBalanceComponent = (
    //         <div className='dashboard-balance-amounts' style={{color: "rgb(91, 197, 167)"}}>
    //             ${total.toFixed(2)}
    //         </div>
    //     )
    // }
    useEffect(() => {
        dispatch(loadFriendsThunk());
        // dispatch(getBalances());
        // dispatch(getFriendBalance());
        // dispatch to get all transactions here?
    }, [dispatch, friendsLength])

    if (!user) return <Redirect to="/"/>;

    // if (Object.values(balances) === 0) return null;

    // const youOweFriends = [];
    // const owesYouFriends = [];
    // for (const friend of Object.values(balances.friends)) {
    //     if (friend.balance > 0) {
    //         if (friend.id === user.id) {
    //             continue;
    //         }
    //         owesYouFriends.push(friend)
    //     } else if (friend.balance < 0) {
    //         youOweFriends.push(friend);
    //     }
    // }

    if (!user) return <Redirect to="/"/>;

    return (
        <div className="column-wrapper">
            <div className="left-column-container">
                <LeftSideNavigation />
            </div>
            <div className="middle-column-container">
                <div className='dashboard-header-container'>
                    <div className="dashboard-header-title-and-buttons">
                        <h1 className="dashboard-header-title">Dashboard</h1>
                        <div className="dashboard-header-buttons">
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
                <div className="right-column-content">
                    <h2 style={{color: "#999"}}>RIFTPAY ON THE GO</h2>
                    <div>Riftpay for Android and IOS coming soon!</div>
                    <div>Developers needed!!!</div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;
