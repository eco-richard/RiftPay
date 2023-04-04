import {
  Loaner, Borrower, Repayment, transactionType, NonEqualPayments
 } from "./interfaces";
import { getPaidTotal } from "./utilities";

class Transaction {
  loaners: Loaner[]
  borrowers: Borrower[]
  amount: number
  repayments: Repayment[]
  type: transactionType

  constructor(loaners: Loaner[], borrowers: Borrower[], type: transactionType) {
    this.loaners = loaners;
    this.borrowers = borrowers;
    this.amount = getPaidTotal(loaners);
    this.type = type
    this.repayments = [];
  }

  _equalPayments() {
    this.borrowers.forEach(borrower => {
      borrower.amount_owed = this.amount / (this.loaners.length + this.borrowers.length);
    })
    this.loaners.forEach(loaner => {
      loaner.amount_owed = this.amount / (this.loaners.length + this.borrowers.length);
    })
  }

  _exactPayments(payments: NonEqualPayments[]) {
    payments.forEach(payment => {
      const user = this.loaners.find(loaner => loaner.loanerId === payment.userId) ||
        this.borrowers.find(borrower => borrower.borrowerId === payment.userId);

      if (user === undefined) {
        return new Error("No user found for payment")
      }
      user.amount_owed = payment.amount;
    })
  }

  _percentPayments(payments: NonEqualPayments[]) {
    payments.forEach(payment => {
      const user = this.loaners.find(loaner => loaner.loanerId === payment.userId) ||
        this.borrowers.find(borrower => borrower.borrowerId === payment.userId);

      if (user === undefined) {
        return new Error("No user found for payment")
      }
      user.amount_owed = (this.amount * .01) * payment.amount;
    })
  }

  makeOwedAmounts(payments?: NonEqualPayments[]) {
    switch (this.type) {
      case transactionType.EQUAL:
        this._equalPayments();
        break;
      case transactionType.EXACT:
        if (payments === undefined) {
          return null;
          // return new Error("Payments not defined when creating owed amounts");
        }
        this._exactPayments(payments);
        break;
      case transactionType.PERCENT:
        if (payments === undefined) {
          return null;
          // return new Error("Payments not defined when creating owed amounts");
        }
        this._percentPayments(payments);
        break;
      default:
        return null;
        // return new Error("Undefined type")
    }
    return this;
  }

  createRepayments() {
    const paidBorrowers = new Set();
    for (const loaner of this.loaners) {
      let currentlyOwed = loaner.amount_loaned - loaner.amount_owed;
      for (const borrower of this.borrowers) {
        if (paidBorrowers.has(borrower)) {
          continue;
        }
        if (borrower.amount_owed <= currentlyOwed) {
          paidBorrowers.add(borrower);
          this.repayments.push({
            loaner,
            borrower,
            amount: borrower.amount_owed,
          })
          currentlyOwed -= borrower.amount_owed;
        } else {
          this.repayments.push({
            loaner,
            borrower,
            amount: currentlyOwed
          })
          borrower.amount_owed -= currentlyOwed;
          currentlyOwed = 0;
        }
        if (currentlyOwed === 0) {
          break;
        }
      }
    }
    return this;
  }

  repaymentsToString() {
    let repaymentsString = "";
    for (const repayment of this.repayments) {
      if (repayment === this.repayments[this.repayments.length - 1]) {
        const tmp = `${repayment.loaner.loanerId}/${repayment.borrower.borrowerId}/${repayment.amount}`;
        return repaymentsString += tmp;
      } else {
        const tmp = `${repayment.loaner.loanerId}/${repayment.borrower.borrowerId}/${repayment.amount}`;
        repaymentsString += tmp + "-";
      }
    }
    return repaymentsString;
  }
}

export default Transaction;
