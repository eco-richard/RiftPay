import { Loaner, Borrower, transactionType, NonEqualPayments } from "./interfaces";
import Transaction from "./transaction";

function test1() {

    const loaner1: Loaner = {
        loanerId: 1,
        amount_loaned: 250,
        amount_owed: 0,
    }
    const loaner2: Loaner = {
        loanerId: 2,
        amount_loaned: 250,
        amount_owed: 0,
    }
    const borrower3: Borrower = {
        borrowerId: 3,
        amount_owed: 0,
    }
    const borrower4: Borrower = {
        borrowerId: 4,
        amount_owed: 0,
    }
    const borrower5: Borrower = {
        borrowerId: 5,
        amount_owed: 0,
    }

    const transaction = new Transaction(
        [loaner1, loaner2],
        [borrower3, borrower4, borrower5],
        transactionType.EQUAL)

    const new_transaction = transaction.makeOwedAmounts();

    if (new_transaction !== null) {
        new_transaction.createRepayments();
    }
    const repayments = new_transaction?.repaymentsToString();

    console.log("REPAYMENTS: ", repayments);
}

function test2() {
    const loaner1: Loaner = {
        loanerId: 1,
        amount_loaned: 250,
        amount_owed: 0,
    }
    const loaner2: Loaner = {
        loanerId: 2,
        amount_loaned: 250,
        amount_owed: 0,
    }
    const borrower3: Borrower = {
        borrowerId: 3,
        amount_owed: 0,
    }
    const borrower4: Borrower = {
        borrowerId: 4,
        amount_owed: 0,
    }
    const borrower5: Borrower = {
        borrowerId: 5,
        amount_owed: 0,
    }

    const transaction = new Transaction(
        [loaner1, loaner2],
        [borrower3, borrower4, borrower5],
        transactionType.EXACT)

    const payments: NonEqualPayments[] = [
        { userId: 1, amount: 150},
        { userId: 2, amount: 100},
        { userId: 3, amount: 125},
        { userId: 4, amount: 70},
        { userId: 5, amount: 55}
    ]

    const new_transaction = transaction.makeOwedAmounts(payments);
    if (new_transaction !== null) {
        new_transaction.createRepayments();
    }
    const repayments = new_transaction?.repaymentsToString();

    console.log("REPAYMENTS: ", repayments);
}


function test3() {
    const loaner1: Loaner = {
        loanerId: 1,
        amount_loaned: 250,
        amount_owed: 0,
    }
    const loaner2: Loaner = {
        loanerId: 2,
        amount_loaned: 250,
        amount_owed: 0,
    }
    const borrower3: Borrower = {
        borrowerId: 3,
        amount_owed: 0,
    }
    const borrower4: Borrower = {
        borrowerId: 4,
        amount_owed: 0,
    }
    const borrower5: Borrower = {
        borrowerId: 5,
        amount_owed: 0,
    }

    const transaction = new Transaction(
        [loaner1, loaner2],
        [borrower3, borrower4, borrower5],
        transactionType.PERCENT)

    const payments: NonEqualPayments[] = [
        { userId: 1, amount: 15},
        { userId: 2, amount: 20},
        { userId: 3, amount: 5},
        { userId: 4, amount: 25},
        { userId: 5, amount: 35},
    ]

    const new_transaction = transaction.makeOwedAmounts(payments);
    if (new_transaction !== null) {
        new_transaction.createRepayments();
    }
    const repayments = new_transaction?.repaymentsToString();

    console.log("REPAYMENTS: ", repayments);
}


test1();
test2();
test3();