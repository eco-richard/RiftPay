import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import TransactionDetails from "../AllExpenses/TransactionDetails";
import { deleteTransaction } from "../../store/transaction";
import { loadSingleFriendThunk } from "../../store/friends";

export default function FriendSingleTransaction({transaction, singleFriend, friendId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [renderDelete, setRenderDelete] = useState("single-expense-delete-hidden")

    //state variable tracking if transaction is clicked-if it is transaction details will be displayed
    const [isClicked, setIsClicked] = useState(false);


    const deleteTransactionFunction = async (transaction, friendId) => {
        window.confirm("Are you sure you want to delete this expense? This will completely remove this expense for ALL people involved, not just you.")
        await dispatch(deleteTransaction(transaction))
            .then(dispatch(loadSingleFriendThunk(friendId)))
            // .then(setIsClicked(false))
    }

    const transactionRecipent = "https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png";
    const MONTHS = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
    ]

    if (!user) return <Redirect to="/"/>;

    //information displayed in tranaction details
    const monthIdx = Number(transaction.created_at.split("-")[1])-1
    const month = MONTHS[monthIdx]
    const day = transaction.created_at.split("-")[2];
    const payer = transaction.payers[0]

    const singleRepayment = transaction.repayments?.filter((repayment) => (repayment?.debtor.id === user.id && repayment?.loaner.id === singleFriend?.id) || (repayment.debtor.id === singleFriend?.id && repayment?.loaner.id === user.id))[0];


    let lentNameFull = "";
    let lentAmount;
    let payerName = "";
    let loanerAmountClassName
    if (payer.payer.id === user.id) {
        payerName = "you"
        lentAmount = singleRepayment?.amount
        loanerAmountClassName = "single-expense-loaner-amount-lender"
        //displayed if user is a net lender in transaction
        if (transaction.repayments.length === 2) {
            lentNameFull = `you lent ${transaction.users[1].first_name} ${transaction.users[1].last_name[0]}`
        }
        else {
            lentNameFull = "you lent";
        }

    } else {
        //displayed if user is a net debtor in transaction
        payerName = payer.payer.first_name + " " + payer.payer.last_name[0] + '.';
        lentNameFull = payer.payer.first_name + payer.payer.last_name[0] + ". lent you";
        lentAmount = singleRepayment?.amount;
        loanerAmountClassName = "single-expense-loaner-amount-lendee"
    }
    if (lentAmount == undefined){
        return null;
    }

    if (!singleRepayment) {
        return null
    }

    return (
        <>
        <div className="single-expense-container"
        onMouseOver={(e) => setRenderDelete("single-expense-delete-button")}
        onMouseLeave={(e) => setRenderDelete("single-expense-delete-hidden")}
        onClick={(e) => setIsClicked(!isClicked)}
        >

            <div className="single-expense-left">
                <div className="single-expense-date">
                    <div className="single-expense-month">
                        {month}
                    </div>
                    <div className="single-expense-day">
                        {day}
                    </div>
                </div>
                <div className="single-expense-image">
                    <img src={transactionRecipent} alt=""/>
                </div>
                <div className="single-expense-name-desc">
                    <div className="single-expense-desc">
                        {transaction.description}
                    </div>
                    {/* <div className="single-expense-groupname"> */}
                    {/* </div> */}
                </div>
            </div>
            <div className="single-expense-right">
                <div className="single-expense-payer">
                    <div className="single-expense-payer-name">
                        {payerName} paid
                    </div>
                    <div className="single-expense-payer-amount">
                        ${payer?.amount.toFixed(2)}
                    </div>
                </div>
                <div className="single-expense-loaner">
                    <div className="single-expense-loaner-name">
                        {lentNameFull}
                    </div>
                    <div className={loanerAmountClassName}>
                        ${lentAmount.toFixed(2)}
                    </div>
                </div>
                <div className={renderDelete}>
                    <button onClick={() =>deleteTransactionFunction(transaction, friendId)}>X</button>
                </div>
            </div>
        </div>
        {isClicked ? (<TransactionDetails transaction={transaction} monthIdx={monthIdx} day={day} friendId={friendId} setIsClicked={setIsClicked}/>) : null}
        </>
    );
}
