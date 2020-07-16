export default class Product {
  ProductName: string;
  ProductPrice: number;
  ProductInStock: number;

  constructor(productName: string, productPrice: number, productInStock: number) {
    this.ProductName = productName;
    this.ProductPrice = productPrice;
    this.ProductInStock = productInStock;
  }
}
