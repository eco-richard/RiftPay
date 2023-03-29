import './TransactionDetails.css';
import OpenModalButton from "../OpenModalButton";
import EditExpenseForm from '../EditExpenseForm';
import AllComments from '../Comments/AllComments';

function styleLoanerName(repayment) {
    return `${repayment.loaner.first_name} ${repayment.loaner.last_name[0]}.`
}

function styleDebtorName(repayment) {
    return `${repayment.debtor.first_name} ${repayment.debtor.last_name[0]}.`
}
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export default function TransactionDetails({transaction, monthIdx, day, friendId}) {
    // const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    console.log(transaction.payers)
    const payers = transaction.payers[0];
    const repayments = transaction.repayments;
    const creator = payers.payer.first_name + " " + payers.payer.last_name[0] + '.';
    const year = transaction.created_at.slice(0, 4);

    // Getting the updated user and date
    let updater;
    let updateDate;
    if (transaction.updater_id !== null) {
        updater = transaction.users.filter(user => user.id === transaction.updater_id)[0];
        const year = transaction.updated_at.slice(0, 4);
        const month = Number(transaction.updated_at.slice(5, 7));
        console.log('month', month)
        const day = transaction.updated_at.slice(8, 10);
        updateDate = `${MONTHS[month-1]} ${day}, ${year}`
    }
    const added = `Added by ${creator} on ${MONTHS[monthIdx]} ${day}, ${year}`
    const updated = `Last updated by ${updater?.first_name} ${updater?.last_name[0]}. on ${updateDate}`;

    // const updatedComponent = (
    //     <div className="trnsaction-details-header-added">
    //         {updated}
    //     </div>
    // )

    return (
        <div className='transaction-details-wrapper'>
            <div className='transaction-details-header'>
                <div className='transaction-details-image'>
                    <img src={transaction.image} alt="transaction" />
                </div>
                <div className='transaction-details-header-info'>
                    <div className='transaction-details-header-description'>
                        {transaction.description}
                    </div>
                    <div className='transaction-details-header-amount'>
                        ${transaction.cost.toFixed(2)}
                    </div>
                    <div className='transaction-details-header-added'>
                        {added}
                    </div>
                    {transaction.updater_id && (
                        <div className="transaction-details-header-updated">
                            {updated}
                        </div>
                    )}
                    <div className='transaction-details-header-update'>
                        <OpenModalButton
                            buttonText="Edit Transaction"

                            modalComponent={<EditExpenseForm transaction={transaction} friendId={friendId}/>}

                        />
                    </div>
                </div>
            </div>
            <div className="transaction-details-body-wrapper">
                <div className="left-column-wrapper">
                    <div className="transaction-details-body">
                        <div className='transaction-details-payers'>
                            {repayments.map(repayment =>
                                repayment.loaner.id === repayment.debtor.id ?
                                    <div className='transaction-details-payer-container transaction-detail-person-container'>
                                        <img className="transaction-detail-profile-picture" src={repayment.loaner.picture}></img>
                                        <div className="transaction-details-payer-information transaction-details-person-information">
                                            <strong>{styleDebtorName(repayment)}</strong> paid <strong>${payers.amount.toFixed(2)}</strong> and owes <strong>${repayment.amount.toFixed(2)}</strong>.
                                        </div>
                                    </div>
                                    :
                                    <div className='transaction-details-ower-container transaction-detail-person-container'>
                                        <img className="transaction-detail-profile-picture" src={repayment.loaner.picture}></img>
                                        <div className="transaction-details-ower-information transaction-details-person-information">
                                            <strong>{styleDebtorName(repayment)}</strong> owes <strong>${repayment.amount.toFixed(2)}</strong>.
                                        </div>
                                    </div>
                            )
                            }
                        </div>
                    </div>
                </div>
                <div className="right-column-wrapper">
                    <div className="transaction-details-comments">
                        <AllComments transaction_id={transaction.id} transactionNote={transaction.note} />
                    </div>
                </div>
            </div>
        </div>

    )
}
