import { NotificationCode } from './Common/NotificationCode';
import OrderManager from "./OrderManager";
import ProductManager  from "./ProductManager";
import Product  from "./Models/Product";
import {ProductType} from "./Constants/ProductType"
import Accounts from "./Accounts";

// Insert Coin - Success test for Insert coin functionality
test("Given coin accepted", () => {

  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts,productManager);
 
  orderManager.InsertCoin(25); 
  orderManager.InsertCoin(5);

  expect(orderManager.Accounts.GetExistingBalance()).toBe(30);
  expect(orderManager.Coins[3]).toBeUndefined();
  expect(orderManager.Notification).toBe("Total Amount : $"+"0.30");
});

// Insert Coin - Fail test for Insert coin functionality
test("Given coin is not accepted", () => {

  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts,productManager);
 
  orderManager.InsertCoin(50);
 
  expect(orderManager.Accounts.GetExistingBalance()).toBe(0);
  expect(orderManager.Coins[3].CoinCount).toBe(1);
  expect(orderManager.Notification).toBe(NotificationCode.INVALID_COIN_INPUT);
});


// Process Order - Success test for valid order
test("Order processed successfully", () => {

  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts,productManager);
 
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(10);

  orderManager.ProcessOrder("Chips");
 
  expect(orderManager.Accounts.GetExistingBalance()).toBe(0);
  expect(orderManager.ProductManager.GetProductInfoByName("Chips").ProductInStock).toBe(2);
  expect(orderManager.Notification).toBe(NotificationCode.PRODUCT_DISPATCH_SUCCESS);
});

// Process Order - Success test for correct coin return
test("Correct coin returned after order processed successfully", () => {

  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts,productManager);
 
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(10);

  orderManager.ProcessOrder("Chips");

  expect(orderManager.Coins[0].CoinCount).toBe(0);
  expect(orderManager.Coins[1].CoinCount).toBe(1);
  expect(orderManager.Coins[2].CoinCount).toBe(0);
  expect(orderManager.Coins[3].CoinCount).toBe(0);

});


// Process Order - Fail test for out of stock
test("Order processing failed due to stock limitation", () => {

  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts,productManager);
 
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);

  orderManager.ProcessOrder("Candy");
 
  expect(orderManager.Accounts.GetExistingBalance()).toBe(75);
  expect(orderManager.ProductManager.GetProductInfoByName("Candy").ProductInStock).toBe(0);
  expect(orderManager.Notification).toBe(NotificationCode.PRODUCT_UNAVAILABLE);

});

// Process Order - Fail test for insufficient balance
test("Order processing failed due to insufficient balance", () => {

  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts,productManager);
 
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);

  orderManager.ProcessOrder("Cola");
 
  expect(orderManager.Accounts.GetExistingBalance()).toBe(75);
  expect(orderManager.ProductManager.GetProductInfoByName("Cola").ProductInStock).toBe(2);
  expect(orderManager.Notification).toBe(NotificationCode.SUFFICIENT_BALANCE_UNAVAILABLE);

});

// Process Order - Fail test due to lack of exchangeable coins
test("Order processing failed due to exchangeable coins", () => {

  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts,productManager);
 
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);

  orderManager.ProcessOrder("Cola");
 
  expect(orderManager.Accounts.GetExistingBalance()).toBe(75);
  expect(orderManager.ProductManager.GetProductInfoByName("Cola").ProductInStock).toBe(2);
  expect(orderManager.Notification).toBe(NotificationCode.SUFFICIENT_BALANCE_UNAVAILABLE);

});

// Return Coin - Success test for return all coins for not purchasing any product
test("Return all coins for not purchasing any product", () => {
  let productManager = new ProductManager(ProductInitializer());

  let accounts = new Accounts();

  let orderManager = new OrderManager(accounts, productManager);

  orderManager.InsertCoin(25);
  orderManager.InsertCoin(25);
  orderManager.InsertCoin(10);

  orderManager.ReturnCoin();
  
  expect(orderManager.Coins[0].CoinCount).toBe(2);
  expect(orderManager.Coins[1].CoinCount).toBe(1);
  expect(orderManager.Coins[2].CoinCount).toBe(0);
  expect(orderManager.Coins[3].CoinCount).toBe(0);
  
  expect(orderManager.Accounts.GetExistingBalance()).toBe(0);

  expect(orderManager.Notification).toBe(NotificationCode.INSERT_COIN);

});

function ProductInitializer():Array<Product>{
    
    return new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", parseInt(ProductType.Chips.toString()), 3),
    new Product("Candy", parseInt(ProductType.Candy.toString()), 0)
  );
}