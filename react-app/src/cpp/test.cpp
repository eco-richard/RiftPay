#include "multiple-payers.h"

void TEST_1();

int main() {
  TEST_1();
}

void TEST_1() {
  auto loaner1 = Loaner(1, 250);
  auto loaner2 = Loaner(2, 250);
  auto borrower1 = Borrower(3);
  auto borrower2 = Borrower(4);
  auto borrower3 = Borrower(5);

  auto transaction = Transaction(
    std::vector<Loaner>{loaner1, loaner2},
    std::vector<Borrower>{borrower1, borrower2, borrower3},
    EQUAL
  );

  std::cout << transaction.MakeOwedAmounts().CreateRepayments().ToString() << std::endl;
}
