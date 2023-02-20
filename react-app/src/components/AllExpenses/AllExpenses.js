import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import { getAllTransactions } from '../../store/transaction';
import { Redirect } from 'react-router-dom';
import SingleTransaction from './SingleTransaction';
import OpenModalButton from '../OpenModalButton';
import AddExpenseForm from '../AddExpenseForm';
import SettleUpForm from '../SettleUpForm';
import "./AllExpenses.css"
import { getBalances } from '../../store/balances';

function AllExpenses() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const transactions = Object.values(useSelector(state => state.transaction.allTransactions));
    const balances = useSelector(state => state.balance);
    const [calledTransactions, setCalledTransactions] = useState(false)

    useEffect(() => {
        dispatch(getAllTransactions())
        dispatch(getBalances())
        setCalledTransactions(true)
    }, [dispatch])

    if (!user) {
        return (<Redirect to="/"/>)
    }
    let totalBalanceComponent;
    if (balances.owes > balances.owed) {
        const total = balances.owes - balances.owed;
        totalBalanceComponent = (
            <div className="balance-info-container" style={{color: "rgb(255, 101, 47)"}}>
                <div className='balance-summary'>
                    you owe
                </div>
                <div className='balance-info-container'>
                    ${total.toFixed(2)}
                </div>
            </div>
        )
    } else {
        const total = balances.owed - balances.owes;
        totalBalanceComponent = (
            <div className="balance-info-container" style={{color: "rgb(91, 197, 167)"}}>
                <div className='balance-summary'>
                    you are owed
                </div>
                <div className='balance-summary-amount'>
                    ${total.toFixed(2)}
                </div>
            </div>
        )
    }
    if (Object.values(balances).length === 0) return null;
    console.log("console log 1")
    console.log(calledTransactions)
    if (transactions.length === 0 && !calledTransactions) return null;
    console.log("console log 2")

    transactions.reverse();
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
                    {transactions.map(transaction => (
                        <SingleTransaction transaction={transaction} />
                    ))}
                </div>
            </div>
            <div className="right-column-container">
                <div className="right-column-content">
                    <h2 className="your-total-balance-label">YOUR TOTAL BALANCE</h2>
                    {totalBalanceComponent}
                </div>
            </div>

        </div>
    )
}

export default AllExpenses;
