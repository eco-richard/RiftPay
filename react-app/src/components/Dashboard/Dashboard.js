import React, { useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBalances, getFriendBalance } from '../../store/balances';   
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import OweYouFriendBill from '../FriendBill/OweYouFriendBill';
import YouOweFriendBill from '../FriendBill/YouOweFriendBill';
import "./Dashboard.css"

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const balances = useSelector(state => state.balance)

    let totalBalanceComponent;
    if (balances.owes > balances.owed) {
        const total = balances.owes - balances.owed;
        totalBalanceComponent = (
            <div className='dashboard-balance-amounts' style={{color: "rgb(255, 101, 47)"}}>
                -${total.toFixed(2)}
            </div>
        )
    } else {
        const total = balances.owed - balances.owes;
        totalBalanceComponent = (
            <div className='dashboard-balance-amounts' style={{color: "rgb(91, 197, 167)"}}>
                ${total.toFixed(2)}
            </div>
        )
    }
    useEffect(() => {
        dispatch(getBalances()); 
        // dispatch(getFriendBalance()); 
    }, [dispatch])

    if (Object.values(balances) === 0) return null;

    const youOweFriends = [];
    const owesYouFriends = [];
    for (const friend of Object.values(balances.friends)) { 
        if (friend.balance > 0) {
            if (friend.id == user.id) {
                continue;
            }
            owesYouFriends.push(friend)
        } else if (friend.balance < 0) {
            youOweFriends.push(friend);
        }
    }
 
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
                            <button className="expense-button">Add an expense</button>
                            <span className="button-seperator"></span>
                            <button>Settle Up</button>
                        </div>
                    </div>
                    <div className="dashboard-balances-header-container">
                        <div className='total-balance-container'>
                            <div className="dashboard-balance-labels">
                                total balance
                            </div>
                            {totalBalanceComponent}
                        </div>
                        <div className='you-owe-container'>
                            <div className="dashboard-balance-labels">
                                you owe
                            </div>
                            <div className='dashboard-owe-amounts' style={{color: "rgb(255, 101, 47)"}}>${balances.owes.toFixed(2)}</div>
                        </div>
                        <div className='you-are-owed-container'>
                            <div className="dashboard-balance-labels">
                                you are owed
                            </div>
                            <div className='dashboard-owed-amounts' style={{color: "rgb(91, 197, 167)"}}>${balances.owed.toFixed(2)}</div>
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
                            {youOweFriends.map(friend => (
                                <YouOweFriendBill friend={friend} />
                            ))}
                        </div>
                        <div className="bills-you-are-owed-container">
                            {owesYouFriends.map(friend => (
                                <OweYouFriendBill friend={friend} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-column-container">
                <div className="right-column-content">
                    <h3>RIFTPAY ON THE GO</h3>
                    <div>Riftpay for Android and IOS coming soon!</div>
                    <div>Developers needed!!!</div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;
