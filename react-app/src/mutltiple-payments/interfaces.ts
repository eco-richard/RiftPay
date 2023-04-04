
export interface Loaner {
  loanerId: number,
  amount_loaned: number,
  amount_owed: number,
}

export interface Borrower {
  borrowerId: number,
  amount_owed: number,
}

export interface Repayment {
  loaner: Loaner,
  borrower: Borrower,
  amount: number,
}

export interface NonEqualPayments {
  userId: number,
  amount: number
}

export enum transactionType {
  EQUAL = 1,
  EXACT,
  PERCENT
}
