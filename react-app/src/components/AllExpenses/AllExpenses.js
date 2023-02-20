import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftSideNavigation from '../Navigation/LeftSideNavigation';
import { getAllTransactions } from '../../store/transaction';
import { Redirect } from 'react-router-dom';
import SingleTransaction from './SingleTransaction';
import OpenModalButton from '../OpenModalButton';
import AddExpenseForm from '../AddExpenseForm';
import SettleUpForm from '../SettleUpForm';
import { loadFriendsThunk } from "../../store/friends";
import "./AllExpenses.css"
// import { getBalances } from '../../store/balances';

function AllExpenses() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const transactions = Object.values(useSelector(state => state.transaction.allTransactions));
    const transactionsLength = transactions.length
    const friendsObj = useSelector((state) => state.friends.friends)
    const friends = Object.values(friendsObj)
    // const balances = useSelector(state => state.balance);

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

    const totalBalance = Math.abs(totalLoan - totalDebt)
    // console.log('totalDebt', totalDebt)
    // console.log('totalLoan', totalLoan)
    // console.log('totalBalance', totalBalance)
    // console.log('loaner friends:', loanerFriend)
    // console.log('debtor friends:', debtorFriend)
    useEffect(() => {
        dispatch(loadFriendsThunk())
    }, [transactionsLength])


    useEffect(() => {
        dispatch(getAllTransactions())
        // dispatch(getBalances())
    }, [dispatch])

    let colorVar;
    if (totalLoan > totalDebt) {
        colorVar = "rgb(91, 197, 167)"
    }
    else if (totalDebt > totalLoan) {
        colorVar = "rgb(255, 101, 47)"
    }
    else {
        colorVar = "rgb(91, 197, 167)"
    }

    const oweOrOwed = () => {
        if (totalLoan > totalDebt) {
            return 'you are owed'
        }
        else if (totalDebt > totalLoan) {
            return 'you owe'
        }
        else {
            return 'you are settled up'
        }
    }
    // console.log('colorVar:', colorVar)

    if (!user) {
        return (<Redirect to="/"/>)
    }
    let totalBalanceComponent;
    // if (balances.owes > balances.owed) {
    //     const total = balances.owes - balances.owed;
        totalBalanceComponent = (
            <div className="balance-info-container" style={{color: colorVar}}>
                <div className='balance-summary'>
                    {oweOrOwed()}
                </div>
                <div className='balance-info-container'>
                    ${totalBalance.toFixed(2)}
                </div>
            </div>
        )
    // } else {
    //     const total = balances.owed - balances.owes;
    //     totalBalanceComponent = (
    //         <div className="balance-info-container" style={{color: "rgb(91, 197, 167)"}}>
    //             <div className='balance-summary'>
    //                 you are owed
    //             </div>
    //             <div className='balance-summary-amount'>
    //                 ${total.toFixed(2)}
    //             </div>
    //         </div>
    //     )
    // }
    // if (Object.values(balances).length === 0) return null;
    if (transactions.length === 0) return null;

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
