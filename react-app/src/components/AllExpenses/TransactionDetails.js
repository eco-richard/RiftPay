import './TransactionDetails.css'

function styleLoanerName(repayment) {
    return `${repayment.loaner.first_name} ${repayment.loaner.last_name[0]}.`
}

function styleDebtorName(repayment) {
    return `${repayment.debtor.first_name} ${repayment.debtor.last_name[0]}.`
}
export const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function TransactionDetails({transaction, monthIdx, day}) {
    // const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const payers = transaction.payers[0];
    const repayments = transaction.repayments;
    const creator = payers.payer.first_name + " " + payers.payer.last_name[0] + '.';
    const year = transaction.created_at.slice(0, 4);

    const added = `Added by ${creator} on ${MONTHS[monthIdx]} ${day}, ${year}`


    return (
    <div className='transaction-details-wrapper'>
        <div className='transaction-details-header'>
            <div className='transaction-details-image'>
                <img src={transaction.image} alt="transaction"/>
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
                <div className='transaction-details-header-update'>
                    <button>Update</button>
                </div>
            </div>
        </div>
        <div className="transaction-details-body">
            <div className='transaction-details-payers'>
                {repayments.map(repayment => 
                    repayment.loaner.id === repayment.debtor.id ? 
                    <div className='transaction-details-payer'>
                        {styleDebtorName(repayment)} paid ${payers.amount} and owes ${repayment.amount}.
                    </div>
                     : 
                    <div className='transaction-details-ower'>
                        {styleDebtorName(repayment)} owes ${repayment.amount}.
                    </div>
                    )
                }
            </div>
            <div className="transaction-details-comments">
            </div>
        </div>
    </div>
    )
}