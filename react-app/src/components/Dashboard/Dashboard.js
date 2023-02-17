import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import "./Dashboard.css"

function Dashboard() {
    const user = useSelector((state) => state.session.user)

    if (!user) return <Redirect to="/"/>

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
                            <div className='dashboard-balance-amounts'>
                                $balance_amount
                            </div>
                        </div>
                        <div className='you-owe-container'>
                            <div className="dashboard-balance-labels">
                                you owe
                            </div>
                            <div className='dashboard-owe-amounts' style={{color: "rgb(255, 101, 47)"}}>$owe_amount</div>
                        </div>
                        <div className='you-are-owed-container'>
                            <div className="dashboard-balance-labels">
                                you are owed
                            </div>
                            <div className='dashboard-owed-amounts' style={{color: "rgb(91, 197, 167)"}}>$owed_amount</div>
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
                            <div className="individual-bill-container">
                                <div className="user_icon">*user_icon*</div>
                                <div className="name-amount-container">
                                    <div className="bill-name-container">Paul Fixler</div>
                                    <div className="amount-you-owe-container" style={{color: "rgb(255, 101, 47)"}}>you owe $30.00</div>
                                </div>
                            </div>
                        </div>
                        <div className="bills-you-are-owed-container">
                        <div className="individual-bill-container">
                                <div className="user_icon">*user_icon*</div>
                                <div className="name-amount-container">
                                    <div className="bill-name-container">Christian Lee</div>
                                    <div className="amount-you-are-owed-container" style={{color: "rgb(91, 197, 167)"}}>owes you $140.00</div>
                                </div>
                            </div>
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
