#include <cstdint>
#include <algorithm>
#include <iostream>
#include <ranges>
#include <vector>
#include <unordered_set>

struct Loaner {
  uint32_t loaner_id;
  uint32_t amount_loaned;
  uint32_t amount_owed;
  Loaner(uint32_t id, uint32_t al, uint32_t ao = 0) : loaner_id(id), amount_loaned(al), amount_owed(ao) {}
};

struct Borrower {
  uint32_t borrower_id;
  uint32_t amount_owed;
  Borrower(uint32_t id, uint32_t ao = 0) : borrower_id(id), amount_owed(ao) {}
};

struct Repayment {
  Loaner loaner;
  Borrower borrower;
  uint32_t amount;
  Repayment(Loaner l, Borrower b, uint32_t a) : loaner(l), borrower(b), amount(a) {}
};

struct NonEqualPayments {
  uint32_t user_id;
  uint32_t amount;
};

enum TransactionType {EQUAL = 1, EXACT, PERCENT};

class Transaction {
  public:
    Transaction() = delete;
    Transaction(const Transaction& t) = delete;
    Transaction(Transaction&& t) = delete;
    void operator=(const Transaction& t) = delete;
    void operator=(Transaction&& t) = delete;

    Transaction(std::vector<Loaner>&& l, std::vector<Borrower>&& b, TransactionType t) :
      loaners(l), borrowers(b), type(t), amount(get_paid_total(l)) {}

    Transaction& MakeOwedAmounts() {
      if (type == EQUAL) {
        equal_payments();
      }
      return *this;
    }

    Transaction& MakeOwedAmounts(std::vector<NonEqualPayments>& payments) {
      if (type == EQUAL) {
        equal_payments();
      } else if (type == EXACT) {
        if (payments.size() == 0) {
          throw std::exeception("No Payments Given");
        }
        exact_payments(payments);
      } else if (type == PERCENT) {
        if (payments.size() == 0) {
          throw std::exception("No Payments Given");
        }
        percent_payments(payments);
      }

      return *this;
    }

    Transaction& CreateRepayments() {
      std::unordered_set<Borrower> paid_borrowers;
      for (auto& loaner : loaners) {
        uint32_t current_owed = loaner.amount_loaned - loaner.amount_owed;
        for (auto& borrower : borrowers) {
          if (paid_borrowers.find(borrower) == paid_borrowers.end()) {
            continue;
          }
          if (borrower.amount_owed <= current_owed) {
            paid_borrowers.insert(borrower);
            repayments.push_back()
          }
        }
      }
    }
  private:
    uint32_t get_paid_total(std::vector<Loaner>& loaners) {
      uint32_t total = 0;

      std::for_each(loaners.begin(), loaners.end(), [&](Loaner loaner) {
        total += loaner.amount_loaned;
      });

      return total;
    }

    void equal_payments() {
      int size_of_transaction = loaners.size() + borrowers.size();
      for (std::size_t i = 0; i < borrowers.size() || i < loaners.size(); ++i) {
        if (i < borrowers.size()) {
          borrowers[i].amount_owed = amount / size_of_transaction;
        }
        if (i < loaners.size()) {
          loaners[i].amount_owed = amount / size_of_transaction;
        }
      }
    }

    void exact_payments(std::vector<NonEqualPayments> payments) {
      std::for_each(payments.begin(), payments.end(), [&](auto payment) {
        std::optional<Loaner> loaner = std::find_if(loaners.begin(), loaners.end(), [&](auto loaner) { return loaner.loaner_id == payment.user_id};);
        std::optional<Borrower> borrower = std::find_if(borrowers.begin(), borrowers.end(), [&](auto borrower) { return borrower.borrower_id == payment.user_id};);
        if (!loaner && !borrower) {
          throw std::exception("No user found");
        }
        if (loaner) {
          loaner->amount_owed = payment.amount;
        } else if (borrower) {
          borrower->amount_owed = payment.amount;
        }
      });
    }

    void percent_payments(std::vector<NonEqualPayments> payments) {
      std::for_each(payments.begin(), payments.end(), [&](auto payment) {
        std::optional<Loaner> loaner = std::find_if(loaners.begin(), loaners.end(), [&](auto loaner) { return loaner.loaner_id == payment.user_id};);
        std::optional<Borrower> borrower = std::find_if(borrowers.begin(), borrowers.end(), [&](auto borrower) { return borrower.borrower_id == payment.user_id};);
        if (!loaner && !borrower) {
          throw std::exception("No user found");
        }
        if (loaner) {
          loaner->amount_owed = (amount * 0.01) * payment.amount;
        } else if (borrower) {
          borrower->amount_owed = (amount * 0.01) * payment.amount;
        }
      });
    }

  private:
    std::vector<Loaner> loaners;
    std::vector<Borrower> borrowers;
    uint32_t amount;
    std::vector<Repayment*> repayments;
    TransactionType type;

};

int main(int argc, char** argv) {
  std::cout << "hello\n";

  return 0;
}
