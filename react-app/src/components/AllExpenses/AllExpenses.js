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

    const totalBalance = Math.abs(totalLoan - totalDebt)


    useEffect(() => {
        dispatch(getAllTransactions())
        dispatch(loadFriendsThunk())

    }, [dispatch])


    //what color the balance number renders as depending on if the user owes money or is owed money in total
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

    if (!user) {
        return (<Redirect to="/"/>)
    }
    let totalBalanceComponent;

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

    if (transactions.length === 0) return null;

    transactions.reverse();

    return (
        <div className="column-wrapper">
            <div className="middle-column-container">
                <div className='expenses-header-container'>
                    <div className="expenses-header-title-and-buttons">
                        <h1 className="expenses-header-title">All expenses</h1>
                        <div className="expenses-header-buttons">
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
