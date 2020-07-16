import { ExceptionCode } from "./Common/ExceptionCode";
import Accounts from "./Accounts";

// Constructor - Success test for Setting amount and getting amount
test("Exchangeable after purchase", () => {
  let accounts = new Accounts(10);

  expect(accounts.GetExistingBalance()).toBe(10);
});

// Coin validation and AddAmount- Success test
test("Valid Nickels provided", () => {
  let accounts = new Accounts();

  accounts.AddAmount(5);
  expect(accounts.GetExistingBalance()).toBe(5);
});

test("Valid Dimes provided", () => {
  let accounts = new Accounts();

  accounts.AddAmount(10);
  expect(accounts.GetExistingBalance()).toBe(10);
});

test("Valid Quarters provided", () => {
  let accounts = new Accounts();

  accounts.AddAmount(25);
  expect(accounts.GetExistingBalance()).toBe(25);
});

// Coin validation - Fail test
test("Invalid coin provided", () => {
  let accounts = new Accounts();

  try {
    accounts.AddAmount(50);
  } catch (e) {
    expect(e.message).toBe(ExceptionCode.INVALID_COIN_INPUT);
  }
});

test("Invalid negative number provided", () => {
  let accounts = new Accounts();

  try {
    accounts.AddAmount(-23);
    } catch (e) {
      expect(e.message).toBe(ExceptionCode.INVALID_COIN_INPUT);
    }
});

// Coin validation - Exception test
test("Throw exception for invalid coin provided", () => {
  let accounts = new Accounts();

  try {
    accounts.AddAmount(23.5);
  } catch (e) {
    expect(e.message).toBe(ExceptionCode.INVALID_COIN_INPUT);
  }
});

// Deduct amount - Success test
test("Deduct valid amount", () => {
  let accounts = new Accounts();

  accounts.AddAmount(10);
  accounts.DeductAmount(10);

  expect(accounts.GetExistingBalance()).toBe(0);
});

// Deduct amount - Invalid input exception test
test("Throw exception for deduct invalid amount", () => {
  let accounts = new Accounts();

  try {
    accounts.AddAmount(10);
    accounts.DeductAmount(25);
  } catch (e) {
    expect(e.message).toBe(ExceptionCode.NEGATIVE_COIN_INPUT);
  }
});

// Sufficient amount - Success check
test("Sufficient amount available", () => {
  let accounts = new Accounts();

  accounts.AddAmount(10);
  let availabilityStatus = accounts.IsSufficientAmountAvailable(10);

  expect(availabilityStatus).toBe(true);
});

// Sufficient amount - Fail check
test("Sufficient amount not available", () => {
  let accounts = new Accounts();

  accounts.AddAmount(10);
  let availabilityStatus = accounts.IsSufficientAmountAvailable(25);

  expect(availabilityStatus).toBe(false);
});

// Calculate Exchange - Success test for is exchangeable after product purchase
test("Exchangeable after purchase", () => {
  let accounts = new Accounts();

  accounts.AddAmount(25);
  accounts.AddAmount(25);
  accounts.AddAmount(10);
  accounts.AddAmount(5);

  let availabilityStatus = accounts.IsAmountExchangeable(25);

  expect(availabilityStatus).toBe(true);
});

// Calculate Exchange - fail test for is exchangeable after product purchase
test("Not exchangeable after purchase", () => {
  let accounts = new Accounts();

  accounts.AddAmount(25);
  accounts.AddAmount(10);
  let availabilityStatus = accounts.IsAmountExchangeable(31);

  expect(availabilityStatus).toBe(false);
});

// Calculate Exchange - fail test for invalid exchange check
test("Throw exception for invalid exchange check", () => {
  let accounts = new Accounts();

  try {
    accounts.AddAmount(10);
    accounts.IsAmountExchangeable(25);
  } catch (e) {
    expect(e.message).toBe(ExceptionCode.NEGATIVE_BALANCE);
  }
});

// Get Refund - success test
test("Exchangeable after purchase", () => {
  let accounts = new Accounts();

  accounts.AddAmount(25);
  accounts.AddAmount(25);
  accounts.AddAmount(10);
  accounts.AddAmount(5);

  let refundCoinCount = accounts.GetRefund();

  expect(refundCoinCount[0].CoinType).toBe("Quarters");
  expect(refundCoinCount[0].CoinCount).toBe(2);

  expect(refundCoinCount[1].CoinType).toBe("Dimes");
  expect(refundCoinCount[1].CoinCount).toBe(1);

  expect(refundCoinCount[2].CoinType).toBe("Nickels");
  expect(refundCoinCount[2].CoinCount).toBe(1);

  expect(refundCoinCount[3].CoinType).toBe("Spare");
  expect(refundCoinCount[3].CoinCount).toBe(0);

  expect(accounts.GetExistingBalance()).toBe(0);
});

// Get Refund - fail test for existing invalid balance
test("Throw exception for invalid balance", () => {
  let accounts = new Accounts(4);
  
  try {
    accounts.GetRefund();
  } catch (e) {
    expect(e.message).toBe(ExceptionCode.INVALID_BALANCE_EXISTS);
  }
});
