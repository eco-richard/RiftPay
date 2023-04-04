import { Loaner } from "./interfaces";

export function getPaidTotal(loaners: Loaner[]) {
  let totalAmount = 0;
  loaners.forEach((loaner: Loaner) => {
    totalAmount += loaner.amount_loaned;
  })
  return totalAmount;
}
