import { useState } from "react";
import { useSelector } from "react-redux";
import './SingleTransaction.css'

export default function SingleTransaction({transaction}) {
    const user = useSelector(state => state.session.user)
    const [renderDelete, setRenderDelete] = useState("single-expense-delete-hidden")

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

    const month = MONTHS[Number(transaction.created_at.split("-")[1])-1]
    const day = transaction.created_at.split("-")[2];
    const payer = transaction.payers[0]
    const singleRepayment = transaction.repayments.filter((repayment) => repayment.debtor.id === user.id)[0];

    let lentNameFull = "";
    let lentAmount;
    let payerName = "";
    if (payer.payer.id === user.id) {
        payerName = "you"
        lentNameFull = "you lent";
        lentAmount = payer.amount - singleRepayment.amount

    } else {
        payerName = payer.payer.first_name + payer.payer.last_name[0] + '.';
        lentNameFull = payer.payer.first_name + payer.payer.last_name[0] + ". lent you";
        lentAmount = singleRepayment.amount;
    }

    return (
        <div className="single-expense-container"
        onMouseOver={(e) => setRenderDelete("single-expense-delete-button")}
        onMouseLeave={(e) => setRenderDelete("single-expense-delete-hidden")}
        >

            <div className="single-expense-left">
                <div className="single-expense-date">
                    <div className="single-expense-month">
                        <p>{month}</p>
                    </div>
                    <div className="single-expense-day">
                        <p>{day}</p>
                    </div>
                </div>
                <div className="single-expense-image">
                    <img src={transaction.image} alt="transaction"/>
                </div>
                <div className="single-expense-name-desc">
                    <div className="single-expense-desc">
                        <p>{transaction.description}</p>
                    </div>
                    <div className="single-expense-groupname">
                    </div>
                </div>
            </div>
            <div className="single-expense-right">
                <div className="single-expense-payer">
                    <div className="single-expense-payer-name">
                        {payerName} paid
                    </div>
                    <div className="single-expense-payer-amount">
                        ${payer.amount.toFixed(2)}
                    </div>
                </div>
                <div className="single-expense-loaner">
                    <div className="single-expense-loaner-name">
                        {lentNameFull}
                    </div>
                    <div className="single-expense-loaner-amount">
                        ${lentAmount.toFixed(2)}
                    </div>
                </div>
                <div className={renderDelete}>
                    X
                </div>
            </div>
        </div>
    );
}