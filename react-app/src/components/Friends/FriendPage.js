import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFriendThunk, loadSingleFriendThunk} from '../../store/friends';
import FriendSingleTransaction from './FriendSingleTransaction';
import OpenModalButton from '../OpenModalButton';
import AddExpenseForm from '../AddExpenseForm';
import SettleUpForm from '../SettleUpForm';
import { getFriendTransactions } from '../../store/transaction';

function FriendPage() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {friendId} = useParams()

    const user = useSelector((state) => state.session.user)
    const singleFriendObj = useSelector(state => state.friends.singleFriend)
    const singleFriend = singleFriendObj.user_friend
    const transactions = Object.values(useSelector(state => state.transaction.allTransactions));
    const transactionsLength = transactions.length;

    transactions.sort();
    transactions.reverse();


    useEffect(() => {
        dispatch(loadSingleFriendThunk(friendId))
        dispatch(getFriendTransactions(friendId))
    }, [dispatch, friendId])


    if (!singleFriend || !transactions) {
        return null
    }

    const friendBalance = singleFriend?.balance

    if (!user) return <Redirect to="/"/>

    const removeFriendHandleClick = async (e) => {
        if (window.confirm("Some of your expenses with this person may also involve other third parties. As a result, deleting this friend will not delete those expenses, and they will still be visible from the 'All expenses' screen. However, this friend should be removed from your list of friends successfully. Are you sure you want to remove this friend?")) {
            dispatch(removeFriendThunk(singleFriend.id)).then(history.push("/dashboard"))
        }
    }


    const friendName = `${singleFriend?.first_name[0].toUpperCase() + singleFriend?.first_name.slice(1)} ${singleFriend?.last_name[0].toUpperCase() + singleFriend?.last_name.slice(1)}`
    const firstName = `${singleFriend?.first_name[0].toUpperCase() + singleFriend?.first_name.slice(1)}`
    let rightBalanceComponent;
    //what renders if user has an aggregate debt to a friend
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
    //what renders if the friend has an aggregate debt to the user
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
    //what renders if there is not debt on either side
    else {
        rightBalanceComponent = (
            <div className='balance-summary'>
                    You are settled up
                </div>
        )
    }
    return (
        <div className="column-wrapper">
            <div className="middle-column-container">
                <div className='expenses-header-container'>
                    <div className="expenses-header-title-and-buttons">
                        <h1 className="expenses-header-title">{friendName}</h1>
                        <div className="expenses-header-buttons">
                            <div className='add-expense-button'>
                                <OpenModalButton
                                    buttonText="Add an Expense"
                                    modalComponent={<AddExpenseForm friendId={friendId}/>}
                                ></OpenModalButton>
                            </div>
                            <span className="button-seperator"></span>
                            <div className='dash-settle-up-button'>
                                <OpenModalButton
                                    buttonText="Settle Up"
                                    modalComponent={<SettleUpForm singleFriend={singleFriend} friendId={friendId}/>}
                                ></OpenModalButton>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='expenses-content-container'>
                    <div className="expense-bills-container">
                        {transactions.map(transaction => (
                            <FriendSingleTransaction transaction={transaction} singleFriend={singleFriend} friendId={friendId}/>
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
                </div>
            </div>
        </div>
    )
}

export default FriendPage;
