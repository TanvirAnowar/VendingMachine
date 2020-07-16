import { ExceptionCode } from "./Common/ExceptionCode";
import { NotificationCode } from "./Common/NotificationCode";
import Accounts from "./Accounts";
import ProductManager from "./ProductManager";
import Coin from "./Models/Coin";

// This class if responsible for managing orders
export default class OrderManager {
  Accounts: Accounts;
  ProductManager: ProductManager;
  Notification: string;
  Coins: Array<Coin>;

  // Injecting Accounts and ProductManager class through constructor
  public constructor(accounts: Accounts, productManager: ProductManager) {
    this.Accounts = accounts;
    this.ProductManager = productManager;
    this.Coins = new Array<Coin>();
    this.Notification = NotificationCode.INSERT_COIN;
  }

  // This method process the order and set notification status based on order status
  public ProcessOrder(productName: string): void {
    try {
          // Check if product stock is available
          if (!this.ProductManager.IsProductAvailable(productName)) {
            this.Notification = NotificationCode.PRODUCT_UNAVAILABLE;
            return;
          }

          let product = this.ProductManager.GetProductInfoByName(productName);
          
          // Check if balance is sufficient
          if (!this.Accounts.IsSufficientAmountAvailable(product.ProductPrice)) {
            this.Notification = NotificationCode.SUFFICIENT_BALANCE_UNAVAILABLE;
            return;
          }

          // Check if the balance is returnable in coins
          if (!this.Accounts.IsAmountExchangeable(product.ProductPrice)) {
            this.Notification = NotificationCode.UNAVAILABLE_EXCHANGE;
            return;
          }

          let balance = this.Accounts.DeductAmount(product.ProductPrice);

          this.Coins = this.Accounts.GetRefund();

          this.ProductManager.UpdateProductStock(productName);

          this.Notification = NotificationCode.PRODUCT_DISPATCH_SUCCESS;

        } catch (e) {

          // For invalid coin it set returnable Coin (Spare) to 1 
          if (e.message == ExceptionCode.INVALID_COIN_INPUT) {
            this.Coins = new Array<Coin>(
              new Coin("Quarters", 0),
              new Coin("Dimes", 0),
              new Coin("Nickels", 0),
              new Coin("Spare", 1)
            );

             this.Notification = NotificationCode.INVALID_COIN_INPUT;
          }

      this.Notification = NotificationCode.SYSTEM_ERROR;
    }
  }

  // Add coin into the system and show the balance in currency format
  public InsertCoin(coin: number): void {
    try {
      let balance = this.Accounts.AddAmount(coin);

      let balanceInCurrencyFormat = parseFloat((balance / 100).toString()).toFixed(2);

      this.Notification = "Total Amount : $" + balanceInCurrencyFormat.toString();

    } catch (e) {

      if (e.message == ExceptionCode.INVALID_COIN_INPUT) {
        this.Coins = new Array<Coin>(
          new Coin("Quarters", 0),
          new Coin("Dimes", 0),
          new Coin("Nickels", 0),
          new Coin("Spare", 1)
        );

        this.Notification = NotificationCode.INVALID_COIN_INPUT;
      }
    }
  }

  // Return Balance in Coins 
  public ReturnCoin(): void{
    try{
      this.Coins = this.Accounts.GetRefund();

      this.Notification = NotificationCode.INSERT_COIN;      
    }catch(e){
      this.Notification = NotificationCode.SYSTEM_ERROR;      
    }
  }
}
