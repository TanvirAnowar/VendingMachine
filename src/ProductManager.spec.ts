import { ExceptionCode } from "./Common/ExceptionCode";
import ProductManager from "./ProductManager";
import Product from "./Models/Product";
import {ProductType} from "./Constants/ProductType";

// Constructor - Success test for setting products and getting products
test("Valid Nickels provided", () => {
  
    let ProductInfoArray: Array<Product> = new Array<Product>(
      new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
      new Product("Chips", parseInt(ProductType.Chips.toString()), 3),
      new Product("Candy", parseInt(ProductType.Candy.toString()), 4)
    );

    let productManager = new ProductManager(ProductInfoArray);

  let products = productManager.GetProducts();
  expect(products.length).toBe(3);
});

//Get product information - Success test for getting individual product information
test("Fetch valid individual product information", () => {
  let ProductInfoArray: Array<Product> = new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", Number.parseInt(ProductType.Chips.toString()), 3),
    new Product("Candy", Number.parseInt(ProductType.Candy.toString()), 4)
  );

  let productManager = new ProductManager(ProductInfoArray);

  expect(productManager.GetProductInfoByName("Cola").ProductInStock).toBe(2);
  expect(productManager.GetProductInfoByName("Chips").ProductPrice).toBe(parseInt(ProductType.Chips.toString()));
  expect(productManager.GetProductInfoByName("Candy").ProductName).toBe("Candy");
});

//Get product information - Fail test Exception throw for querying individual product information
test("Throw exception for querying product information", () => {
  let ProductInfoArray: Array<Product> = new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", Number.parseInt(ProductType.Chips.toString()), 3),
    new Product("Candy", Number.parseInt(ProductType.Candy.toString()), 4)
  );
  
  try {
    let productManager = new ProductManager(ProductInfoArray);
    productManager.GetProductInfoByName("Soda");
  } catch (e) {
    expect(e.message).toBe(ExceptionCode.INVALID_PRODUCT_NAME);
  }
});

//Check product availability - Success test for checking product availability
test("Check product is available", () => {
  let ProductInfoArray: Array<Product> = new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", Number.parseInt(ProductType.Chips.toString()), 3),
    new Product("Candy", Number.parseInt(ProductType.Candy.toString()), 4)
  );

  let productManager = new ProductManager(ProductInfoArray);

  expect(productManager.IsProductAvailable("Cola")).toBe(true);
});

//Check product availability - Fail test for checking product availability
test("Check product is not available", () => {
  let ProductInfoArray: Array<Product> = new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", Number.parseInt(ProductType.Chips.toString()), 0),
    new Product("Candy", Number.parseInt(ProductType.Candy.toString()), 4)
  );

  let productManager = new ProductManager(ProductInfoArray);

  expect(productManager.IsProductAvailable("Chips")).toBe(false);
});

//Update product information - Success test for updating product's stock information
test("Decrease product's stock limit", () => {
  let ProductInfoArray: Array<Product> = new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", Number.parseInt(ProductType.Chips.toString()), 3),
    new Product("Candy", Number.parseInt(ProductType.Candy.toString()), 1)
  );

  let productManager = new ProductManager(ProductInfoArray);

  expect(productManager.UpdateProductStock("Candy")).toBe(true);
});

//Update product information - Fail test for updating product's stock information
test("Decrease product's stock limit failed", () => {
  let ProductInfoArray: Array<Product> = new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", Number.parseInt(ProductType.Chips.toString()), 0),
    new Product("Candy", Number.parseInt(ProductType.Candy.toString()), 4)
  );

  let productManager = new ProductManager(ProductInfoArray);

  expect(productManager.UpdateProductStock("Chips")).toBe(false);
});

//Update product information - Fail test throw exception for updating invalid product's information
test("Throw exception for querying product information", () => {
  let ProductInfoArray: Array<Product> = new Array<Product>(
    new Product("Cola", Number.parseInt(ProductType.Cola.toString()), 2),
    new Product("Chips", Number.parseInt(ProductType.Chips.toString()), 3),
    new Product("Candy", Number.parseInt(ProductType.Candy.toString()), 4)
  );
  
  try {
    let productManager = new ProductManager(ProductInfoArray);
    productManager.UpdateProductStock("Soda");
  } catch (e) {
    expect(e.message).toBe(ExceptionCode.INVALID_PRODUCT_NAME);
  }
});