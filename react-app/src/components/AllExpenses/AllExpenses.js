import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import "./AllExpenses.css"

function AllExpenses() {
    const user = useSelector((state) => state.session.user)

    if (!user) return <Redirect to="/"/>
    return (
        <div className="column-wrapper">
            <div className="left-column-container">
                <LeftSideNavigation />
            </div>
            <div className="middle-column-container">
                <div className='expenses-header-container'>
                    <div className="expenses-header-title-and-buttons">
                        <h1 className="expenses-header-title">All expenses</h1>
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
                    <h2 className="your-total-balance-label">YOUR TOTAL BALANCE</h2>
                    <div className='balance-info-container'>
                        <div className='balance-summary'>
                            you owe
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

export default AllExpenses;
