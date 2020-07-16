import { ExceptionCode } from "./Common/ExceptionCode";
import AccountsValidator from "./Validators/AccountsValidator";
import Coin from "./Models/Coin";
import { CoinType } from "./Constants/CoinType";

// This class is responsible to handle all financial calculation
export default class Accounts {
  private Amount: number;

  // Constructor set the default amount if required 
  public constructor(amount?: number) {
    if (amount == null) {
      this.Amount = 0;
    } else {
      this.Amount = amount;
    }
  }

  // Add amount for the valid coin and return total amount
  public AddAmount(coin: number): number {
    if (!AccountsValidator.IsValidCoin(coin)) {
         throw new Error(ExceptionCode.INVALID_COIN_INPUT);
    }
    
    this.Amount += coin;
    return this.Amount;
  }

  // Return the total amount
  public GetExistingBalance():number {
    return this.Amount;
  }

  // Deduct the amount of the product and return the remaining amount
  public DeductAmount(coin: number): number {
      if (coin > this.Amount) {
        throw new Error(ExceptionCode.NEGATIVE_COIN_INPUT);
      }
    
      this.Amount -= coin;
      return this.Amount;
  }

  // Check if sufficient ballance exist against given price
  public IsSufficientAmountAvailable(price: number): boolean {
    if (price > this.Amount) {
        return false;
     }
    return true;
  }

  // Check if the amount exchangeable after purchasing against given price 
  public IsAmountExchangeable(price: number): boolean {
    if (!this.IsSufficientAmountAvailable(price)) {
      throw new Error(ExceptionCode.NEGATIVE_BALANCE);
    }

    price = this.Amount - price;

    let coinCountArray = this.CalculateExchange(price);

    if (coinCountArray[3].CoinCount == 1) {
      return false;
    }

    return true;
  }

  // Return the balance in coins
  public GetRefund(): Array<Coin> {
    let coinCountArray = this.CalculateExchange(this.Amount);

    if (coinCountArray[3].CoinCount == 1) {
      throw new Error(ExceptionCode.INVALID_BALANCE_EXISTS);
    }

    this.Amount = 0;

    return coinCountArray;
  }

  // Calculate the returnable amount in coins
  private CalculateExchange(price: number): Array<Coin> {
    let nickels: number = 0;
    let dimes: number = 0;
    let quarters: number = 0;
    let spare: number = 0;

    let coinValue = Number.parseInt(CoinType.Quarters.toString());

    while (price >= coinValue) {
      quarters++;

      price -= coinValue;
    }

    coinValue = Number.parseInt(CoinType.Dimes.toString());

    while (price >= coinValue) {
      dimes++;

      price -= coinValue;
    }

    coinValue = Number.parseInt(CoinType.Nickels.toString());

    while (price >= coinValue) {
      nickels++;

      price -= coinValue;
    }

    // If the coin is not Quarters,Dimes or Nickels then it consider as spare 
    if (price != 0) {
      spare = 1;
    }

    let coinCountArray: Array<Coin> = new Array<Coin>(
      new Coin("Quarters", quarters),
      new Coin("Dimes", dimes),
      new Coin("Nickels", nickels),
      new Coin("Spare", spare)
    );

    return coinCountArray;
  }
}
